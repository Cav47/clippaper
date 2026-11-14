import { createServer } from 'node:http';
import { readFileSync, writeFileSync } from 'node:fs';

const upstream = 'http://127.0.0.1:8000';
const allowedPaths = new Set(['/v1/chat/completions', '/v1/models', '/status']);

// Explicit allowlist of verified free/keyless LLMF routes.
// Do not add paid or billing-backed model IDs here.
const freeModels = [
  'kilo-gateway/kilo-auto/free',
  'llm7/codestral-latest',
  'chatjimmy/llama3.1-8B',
  'llm7/gpt-oss:20b',
  'pollinations/openai',
  'kilo-gateway/kilo-auto/small',
];
let nextFreeModel = 0;
let activeRoute = null;
const modelCooldowns = new Map();
const routeTelemetry = new Map();
const routeStatePath = new URL('./.llmf-route-state.json', import.meta.url);
try {
  const saved = JSON.parse(readFileSync(routeStatePath, 'utf8'));
  if (freeModels.includes(saved.activeRoute)) activeRoute = saved.activeRoute;
  for (const model of freeModels) {
    const item = saved.routes?.[model];
    if (!item) continue;
    routeTelemetry.set(model, item.telemetry ?? {});
    if (Number(item.cooldownUntil) > Date.now()) modelCooldowns.set(model, Number(item.cooldownUntil));
  }
} catch {
  // A missing/invalid local status cache is not an inference failure.
}
function persistRouteState() {
  try {
    writeFileSync(routeStatePath, JSON.stringify({
      activeRoute,
      routes: Object.fromEntries(freeModels.map((model) => [model, {
        cooldownUntil: modelCooldowns.get(model) ?? null,
        telemetry: routeTelemetry.get(model) ?? {},
      }])),
    }) + '\n', { mode: 0o600 });
  } catch (error) {
    console.log('[llmf-proxy] route status cache unavailable=' + String(error?.code ?? 'write_error'));
  }
}
const apiKeyPath = process.env.LLMF_API_KEY_FILE ?? new URL('./.llmf-api-key', import.meta.url);
let upstreamApiKey = '';
try {
  upstreamApiKey = readFileSync(apiKeyPath, 'utf8').trim();
} catch {
  // The internal key is optional only when the local LLMF server is unauthenticated.
}

function retryDelayMs(status, headers) {
  const retryAfter = headers?.get('retry-after');
  if (retryAfter) {
    const seconds = Number(retryAfter);
    if (Number.isFinite(seconds) && seconds >= 0) return Math.min(seconds * 1000, 6 * 60 * 60 * 1000);
    const date = Date.parse(retryAfter);
    if (Number.isFinite(date)) return Math.min(Math.max(1000, date - Date.now()), 6 * 60 * 60 * 1000);
  }
  if (status === 401 || status === 403) return 60 * 60 * 1000;
  if (status === 404) return 30 * 60 * 1000;
  if (status === 429) return 60 * 1000;
  return 30 * 1000;
}

function isRetryableStatus(status) {
  return status === 401 || status === 403 || status === 404 || status === 429 || status >= 500;
}

const server = createServer(async (request, response) => {
  if (!allowedPaths.has(request.url) || !['GET', 'POST'].includes(request.method)) {
    response.writeHead(404).end();
    return;
  }

  if (request.url === '/status' && request.method === 'GET') {
    const now = Date.now();
    response.writeHead(200, { 'content-type': 'application/json', 'cache-control': 'no-store' });
    response.end(JSON.stringify({
      checkedAt: new Date(now).toISOString(),
      modelAlias: 'openai/fast',
      activeRoute,
      routing: 'round-robin-free-only',
      routes: freeModels.map((model) => ({
        model,
        cooldownUntil: modelCooldowns.get(model) && modelCooldowns.get(model) > now
          ? new Date(modelCooldowns.get(model)).toISOString()
          : null,
        ...(routeTelemetry.get(model) ?? {}),
      })),
    }));
    return;
  }

  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  let body = Buffer.concat(chunks);
  let payload = null;
  let streaming = false;
  if (request.url === '/v1/models' && request.method === 'GET') {
    response.writeHead(200, { 'content-type': 'application/json' });
    response.end(JSON.stringify({
      object: 'list',
      data: [{ id: 'fast', object: 'model', created: 0, owned_by: 'llmf-free-rotation' }],
    }));
    return;
  }

  if (request.url === '/v1/chat/completions' && body.length) {
    try {
      payload = JSON.parse(body.toString('utf8'));
      if (payload.model !== 'fast' && payload.model !== 'openai/fast') {
        response.writeHead(400, { 'content-type': 'application/json' });
        response.end(JSON.stringify({ error: { message: 'Only the free fast model alias is allowed.' } }));
        return;
      }
      streaming = payload.stream === true;
      payload.stream = false; // LLMF providers return normalized JSON; this proxy converts it to SSE.
    } catch {
      response.writeHead(400).end();
      return;
    }
  }

  const startedAt = Date.now();
  const requestTimeoutMs = 45_000;
  let lastFailure = null;
  let availableModels = 0;
  console.log('[llmf-proxy] ' + request.method + ' ' + request.url + ' model=fast-free-rotation stream=' + streaming + ' bytes=' + body.length);

  response.on('close', () => {
    // Each upstream attempt has its own timeout and AbortController.
  });

  const attemptedModels = new Set();
  for (let offset = 0; offset < freeModels.length; offset++) {
    let index = -1;
    for (let scan = 0; scan < freeModels.length; scan++) {
      const candidateIndex = (nextFreeModel + scan) % freeModels.length;
      const candidateModel = freeModels[candidateIndex];
      if (attemptedModels.has(candidateModel)) continue;
      if ((modelCooldowns.get(candidateModel) ?? 0) > Date.now()) continue;
      index = candidateIndex;
      nextFreeModel = (candidateIndex + 1) % freeModels.length;
      break;
    }
    if (index < 0) break;
    const model = freeModels[index];
    attemptedModels.add(model);
    availableModels++;

    const attemptPayload = payload ? { ...payload, model } : null;
    const attemptBody = request.method === 'POST' ? Buffer.from(JSON.stringify(attemptPayload)) : undefined;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), requestTimeoutMs);
    try {
      const headers = { 'content-type': 'application/json' };
      if (upstreamApiKey) headers.authorization = 'Bearer ' + upstreamApiKey;
      const result = await fetch(new URL(request.url, upstream), {
        method: request.method,
        headers,
        body: attemptBody,
        signal: controller.signal,
      });

      if (result.ok) {
        modelCooldowns.delete(model);
        activeRoute = model;
        routeTelemetry.set(model, { lastStatus: result.status, lastSuccessAt: new Date().toISOString() });
        persistRouteState();
        console.log('[llmf-proxy] free route=' + model + ' status=' + result.status + ' after=' + (Date.now() - startedAt) + 'ms');
        if (streaming) {
          const completion = await result.json();
          const choice = completion.choices?.[0] ?? {};
          const message = choice.message ?? {};
          const base = {
            id: completion.id ?? 'chatcmpl-' + Date.now(),
            object: 'chat.completion.chunk',
            created: completion.created ?? Math.floor(Date.now() / 1000),
            model: completion.model ?? model,
          };
          response.writeHead(200, {
            'content-type': 'text/event-stream',
            'cache-control': 'no-cache',
            connection: 'keep-alive',
            'x-accel-buffering': 'no',
          });
          const send = (delta, finishReason = null) => {
            response.write('data: ' + JSON.stringify({
              ...base,
              choices: [{ index: 0, delta, finish_reason: finishReason }],
            }) + '\n\n');
          };
          send({ role: 'assistant' });
          if (message.content) send({ content: message.content });
          if (Array.isArray(message.tool_calls) && message.tool_calls.length) {
            send({
              tool_calls: message.tool_calls.map((call, callIndex) => ({
                index: callIndex,
                id: call.id ?? 'call_' + callIndex,
                type: call.type ?? 'function',
                function: {
                  name: call.function?.name ?? '',
                  arguments: call.function?.arguments ?? '{}',
                },
              })),
            });
          }
          send({}, choice.finish_reason ?? (message.tool_calls?.length ? 'tool_calls' : 'stop'));
          response.end('data: [DONE]\n\n');
        } else {
          response.writeHead(result.status, {
            'content-type': result.headers.get('content-type') ?? 'application/json',
          });
          for await (const chunk of result.body) response.write(chunk);
          response.end();
        }
        return;
      }

      const errorBody = await result.text();
      if (!isRetryableStatus(result.status)) {
        response.writeHead(result.status, {
          'content-type': result.headers.get('content-type') ?? 'application/json',
        });
        response.end(errorBody);
        return;
      }

      modelCooldowns.set(model, Date.now() + retryDelayMs(result.status, result.headers));
      routeTelemetry.set(model, { lastStatus: result.status, lastFailureAt: new Date().toISOString() });
      persistRouteState();
      lastFailure = { model, status: result.status, body: errorBody };
      console.log('[llmf-proxy] free route cooldown=' + model + ' status=' + result.status);
    } catch (error) {
      modelCooldowns.set(model, Date.now() + retryDelayMs(503));
      routeTelemetry.set(model, { lastStatus: 503, lastFailureAt: new Date().toISOString() });
      persistRouteState();
      lastFailure = { model, status: 503, body: String(error?.name ?? 'upstream_unavailable') };
      console.log('[llmf-proxy] free route unavailable=' + model);
    } finally {
      clearTimeout(timeout);
    }
  }

  const retryAt = Math.min(...freeModels.map((model) => modelCooldowns.get(model) ?? Date.now()));
  const retryAfter = Math.max(1, Math.ceil((retryAt - Date.now()) / 1000));
  const status = availableModels === 0 || lastFailure ? 503 : 502;
  console.log('[llmf-proxy] no free route available; tried=' + availableModels + ' retryAfter=' + retryAfter + 's elapsed=' + (Date.now() - startedAt) + 'ms; last=' + (lastFailure?.model ?? 'cooldown'));
  response.writeHead(status, {
    'content-type': 'application/json',
    'retry-after': String(retryAfter),
  });
  response.end(JSON.stringify({
    error: {
      message: 'All configured free model routes are temporarily unavailable.',
      type: 'upstream_error',
      code: 'free_routes_unavailable',
    },
  }));
});

server.listen(8001, '127.0.0.1');

