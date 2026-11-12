import { createServer } from 'node:http';

const upstream = 'http://127.0.0.1:8000';
const allowedPaths = new Set(['/v1/chat/completions', '/v1/models']);

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
      if (typeof payload.model !== 'string' || !payload.model.startsWith('openai/')) {
        response.writeHead(400).end();
        return;
      }
      const model = payload.model.slice('openai/'.length);
      payload.model = model === 'fast' ? 'llm7/codestral-latest' : model;
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
    const result = await fetch(new URL(request.url, upstream), {
      method: request.method,
      headers: { 'content-type': 'application/json' },
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
