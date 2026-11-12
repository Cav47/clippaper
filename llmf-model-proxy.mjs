import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';

const upstream = 'http://127.0.0.1:8000';
const allowedPaths = new Set(['/v1/chat/completions', '/v1/models']);
const apiKeyPath = new URL('./.llmf-api-key', import.meta.url);
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
  if (request.url === '/v1/chat/completions' && body.length) {
    try {
      const payload = JSON.parse(body.toString('utf8'));
      if (
        typeof payload.model !== 'string' ||
        (payload.model !== 'fast' && !payload.model.startsWith('openai/'))
      ) {
        response.writeHead(400).end();
        return;
      }
      const model = payload.model === 'fast'
        ? 'fast'
        : payload.model.slice('openai/'.length);
      // `fast` is the Paperclip model ID. Route it through LLMF's tool-capable
      // ranked alias so provider fallback remains available to agent tools.
      payload.model = model === 'fast' ? 'best' : model;
      modelName = payload.model;
      streaming = payload.stream === true;
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
    response.writeHead(result.status, {
      'content-type': result.headers.get('content-type') ?? 'application/json',
    });
    for await (const chunk of result.body) response.write(chunk);
    response.end();
  } catch {
    if (!response.destroyed && !response.headersSent) response.writeHead(502).end();
    else if (!response.destroyed) response.end();
  } finally {
    clearTimeout(timeout);
    console.log(`[llmf-proxy] ${controller.signal.aborted ? 'aborted' : 'closed'} after ${Date.now() - startedAt}ms`);
  }
});

server.listen(8001, '127.0.0.1');
