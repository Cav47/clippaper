// src/manifest.js
var manifest_default = {
  id: "rotina.ai-usage",
  apiVersion: 1,
  version: "0.1.0",
  displayName: "Uso de IA",
  description: "Uso de tokens registrado no Paperclip, rota LLM ativa, cooldowns e cotas gratuitas publicadas.",
  author: "Rotina em Fam\xEDlia",
  categories: ["ui"],
  minimumHostVersion: "2026.1106.0",
  capabilities: ["companies.read", "agents.read", "issues.read", "issues.orchestration.read", "http.outbound", "ui.page.register"],
  entrypoints: {
    worker: "./dist/worker.js",
    ui: "./dist/ui"
  },
  ui: {
    slots: [
      { type: "page", id: "ai-usage", displayName: "Uso de IA", exportName: "AiUsagePage", routePath: "ai-usage", order: 80 }
    ]
  }
};
export {
  manifest_default as default
};
