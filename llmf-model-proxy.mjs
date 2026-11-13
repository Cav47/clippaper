import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';

const upstream = 'http://127.0.0.1:8000';
const allowedPaths = new Set(['/v1/chat/completions', '/v1/models']);
// Paperclip agents use the single `fast` alias. Keep this proxy strictly on
// Kilo's no-credit free router; reject arbitrary model overrides so a paid
// model cannot be selected through this connection.
const freeModel = 'kilo-gateway/kilo-auto/free';
const apiKeyPath = process.env.LLMF_API_KEY_FILE ?? new URL('./.llmf-api-key', import.meta.url);
let upstreamApiKey = '';
try {
  upstreamApiKey = readFileSync(apiKeyPath, 'utf8').trim();
} catch {
  // The key is optional while running against an unauthenticated local LLMF server.
}

const server = createServer(async (request, response) => {
  if (!allowedPaths.has(request.url) || !['GET', 'POST'].includes(request.method)) {
    response.writeHead(404).end();
    return;
  }

  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  let body = Buffer.concat(chunks);
  let modelName = '';
  let streaming = false;
  if (request.url === '/v1/models' && request.method === 'GET') {
    response.writeHead(200, { 'content-type': 'application/json' });
    response.end(JSON.stringify({
      object: 'list',
      data: [{ id: 'fast', object: 'model', created: 0, owned_by: 'kilo-free' }],
    }));
    return;
  }
  if (request.url === '/v1/chat/completions' && body.length) {
    try {
      const payload = JSON.parse(body.toString('utf8'));
      if (payload.model !== 'fast' && payload.model !== 'openai/fast') {
        response.writeHead(400).end();
        return;
      }
      payload.model = freeModel;
      modelName = payload.model;
      streaming = payload.stream === true;
      // LLMF's provider stream adapter drops tool-call deltas. Request one
      // regular completion, then turn it into the OpenAI-compatible SSE chunks
      // Paperclip's native runner expects.
      if (streaming) payload.stream = false;
      body = Buffer.from(JSON.stringify(payload));
    } catch {
      response.writeHead(400).end();
      return;
    }
  }

  const controller = new AbortController();
  const startedAt = Date.now();
  const timeout = setTimeout(() => controller.abort(), 180_000);
  console.log(`[llmf-proxy] ${request.method} ${request.url} model=${modelName || '-'} stream=${streaming} bytes=${body.length}`);
  response.on('close', () => {
    if (!response.writableEnded) controller.abort();
  });

  try {
    const headers = { 'content-type': 'application/json' };
    if (upstreamApiKey) headers.authorization = `Bearer ${upstreamApiKey}`;
    const result = await fetch(new URL(request.url, upstream), {
      method: request.method,
      headers,
      body: request.method === 'POST' ? body : undefined,
      signal: controller.signal,
    });
    console.log(`[llmf-proxy] upstream ${result.status} after ${Date.now() - startedAt}ms`);
    if (streaming && result.ok) {
      const completion = await result.json();
      const choice = completion.choices?.[0] ?? {};
      const message = choice.message ?? {};
      const base = {
        id: completion.id ?? `chatcmpl-${Date.now()}`,
        object: 'chat.completion.chunk',
        created: completion.created ?? Math.floor(Date.now() / 1000),
        model: completion.model ?? modelName,
      };
      response.writeHead(200, {
        'content-type': 'text/event-stream',
        'cache-control': 'no-cache',
        connection: 'keep-alive',
        'x-accel-buffering': 'no',
      });
      const send = (delta, finishReason = null) => {
        response.write(`data: ${JSON.stringify({
          ...base,
          choices: [{ index: 0, delta, finish_reason: finishReason }],
        })}\n\n`);
      };
      send({ role: 'assistant' });
      if (message.content) send({ content: message.content });
      if (Array.isArray(message.tool_calls) && message.tool_calls.length) {
        send({
          tool_calls: message.tool_calls.map((call, index) => ({
            index,
            id: call.id ?? `call_${index}`,
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
  } catch {
    if (!response.destroyed && !response.headersSent) response.writeHead(502).end();
    else if (!response.destroyed) response.end();
  } finally {
    clearTimeout(timeout);
    console.log(`[llmf-proxy] ${controller.signal.aborted ? 'aborted' : 'closed'} after ${Date.now() - startedAt}ms`);
  }
});

server.listen(8001, '127.0.0.1');
