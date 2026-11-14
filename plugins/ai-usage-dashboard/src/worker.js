import { definePlugin, runWorker } from "@paperclipai/plugin-sdk";

const cache = new Map();
const CACHE_MS = 30_000;
const FREE_ROUTES = [
  { model: "kilo-gateway/kilo-auto/free", provider: "Kilo", quota: "Gratuita; saldo/reset não expostos pela rota" },
  { model: "kilo-gateway/kilo-auto/small", provider: "Kilo", quota: "Gratuita; saldo/reset não expostos pela rota" },
  { model: "llm7/codestral-latest", provider: "LLM7", quota: "Gratuita/keyless; saldo/reset não publicados" },
  { model: "llm7/gpt-oss:20b", provider: "LLM7", quota: "Gratuita/keyless; saldo/reset não publicados" },
  { model: "chatjimmy/llama3.1-8B", provider: "ChatJimmy", quota: "Gratuita/keyless; saldo/reset não publicados" },
  { model: "pollinations/openai", provider: "Pollinations", quota: "Anônima; limite conhecido de 1 solicitação/15 s; reset individual não publicado" },
];

async function mapLimit(items, concurrency, fn) {
  const out = new Array(items.length);
  let cursor = 0;
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (cursor < items.length) {
      const i = cursor++;
      try { out[i] = await fn(items[i]); } catch { out[i] = null; }
    }
  }));
  return out;
}

const plugin = definePlugin({
  async setup(ctx) {
    ctx.data.register("ai-usage", async ({ companyId } = {}) => {
      if (!companyId) throw new Error("Selecione uma organização do Paperclip.");
      const cached = cache.get(companyId);
      if (cached && Date.now() - cached.at < CACHE_MS) return cached.data;

      const [company, agents, firstPage, proxy] = await Promise.all([
        ctx.companies.get(companyId),
        ctx.agents.list({ companyId, limit: 100, offset: 0 }),
        ctx.issues.list({ companyId, limit: 100, offset: 0 }),
        fetch("http://127.0.0.1:8001/status", { signal: AbortSignal.timeout(2500) })
          .then((r) => r.ok ? r.json() : null).catch(() => null),
      ]);

      let issues = firstPage;
      if (firstPage.length === 100) {
        const second = await ctx.issues.list({ companyId, limit: 100, offset: 100 });
        issues = [...firstPage, ...second];
      }

      const costs = await mapLimit(issues, 8, async (issue) => {
        const summary = await ctx.issues.summaries.getOrchestration({
          issueId: issue.id, companyId, includeSubtree: false,
        });
        return summary && summary.costs ? summary.costs : null;
      });
      const usage = costs.filter(Boolean).reduce((sum, row) => ({
        inputTokens: sum.inputTokens + Number(row.inputTokens || 0),
        cachedInputTokens: sum.cachedInputTokens + Number(row.cachedInputTokens || 0),
        outputTokens: sum.outputTokens + Number(row.outputTokens || 0),
        costCents: sum.costCents + Number(row.costCents || 0),
        issuesScanned: sum.issuesScanned + 1,
      }), { inputTokens: 0, cachedInputTokens: 0, outputTokens: 0, costCents: 0, issuesScanned: 0 });

      const routeByName = new Map((proxy && proxy.routes ? proxy.routes : []).map((r) => [r.model, r]));
      const routes = FREE_ROUTES.map((route) => Object.assign({}, route, routeByName.get(route.model) || {}));
      const data = {
        organization: company && company.name ? company.name : "Paperclip",
        checkedAt: new Date().toISOString(),
        modelAlias: proxy && proxy.modelAlias ? proxy.modelAlias : "openai/fast",
        activeRoute: proxy && proxy.activeRoute ? proxy.activeRoute : null,
        routing: proxy && proxy.routing ? proxy.routing : "proxy indisponível",
        proxyAvailable: Boolean(proxy),
        usage,
        issueCount: issues.length,
        hasMoreIssues: issues.length >= 200,
        agents: agents.map((agent) => {
          const cfg = agent.adapterConfig || {};
          const runtime = agent.runtimeConfig || {};
          return {
            name: agent.name,
            status: agent.status,
            model: cfg.model || runtime.model || cfg.modelId || runtime.modelId || "openai/fast",
            adapter: agent.adapterType,
          };
        }),
        routes,
        quotaNotice: "Saldo de tokens/créditos e data de renovação não são expostos pelo endpoint gratuito desses provedores. O painel mostra uso registrado e cooldowns observados, sem estimar saldo.",
      };
      cache.set(companyId, { at: Date.now(), data });
      return data;
    });
  },
  async onHealth() { return { status: "ok" }; },
});
export default plugin;
runWorker(plugin, import.meta.url);
