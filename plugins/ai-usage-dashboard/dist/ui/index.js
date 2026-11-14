// src/ui.js
import React, { createElement as h } from "react";
import { usePluginData, useHostContext } from "@paperclipai/plugin-sdk/ui";
var styles = {
  page: { maxWidth: 1160, margin: "0 auto", padding: 28, color: "var(--foreground, #e9edf5)", fontFamily: "Inter, system-ui, sans-serif" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, marginBottom: 24 },
  eyebrow: { color: "#70d4be", fontSize: 12, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase" },
  title: { fontSize: 30, lineHeight: 1.1, margin: "8px 0" },
  muted: { color: "var(--muted-foreground, #9ba6b8)", fontSize: 13, lineHeight: 1.5 },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12, marginBottom: 22 },
  card: { border: "1px solid var(--border, #303846)", borderRadius: 14, padding: 18, background: "var(--card, #171d27)" },
  label: { fontSize: 12, color: "#aeb9ca", marginBottom: 8 },
  value: { fontSize: 25, fontWeight: 750, fontVariantNumeric: "tabular-nums" },
  section: { fontSize: 17, margin: "24px 0 12px" },
  tableWrap: { overflowX: "auto", border: "1px solid var(--border, #303846)", borderRadius: 14 },
  table: { borderCollapse: "collapse", width: "100%", minWidth: 720, fontSize: 13 },
  th: { textAlign: "left", color: "#aeb9ca", fontWeight: 600, padding: "12px 14px", borderBottom: "1px solid #303846" },
  td: { padding: "12px 14px", borderBottom: "1px solid #252d39", verticalAlign: "top" },
  pill: { display: "inline-block", borderRadius: 999, padding: "4px 9px", background: "#20362f", color: "#80e0c7", fontSize: 11, fontWeight: 700 },
  button: { background: "#183f3a", border: "1px solid #33766a", borderRadius: 9, color: "#dff8f2", padding: "9px 13px", fontWeight: 650, cursor: "pointer" },
  warning: { border: "1px solid #66562b", background: "#2a261b", borderRadius: 12, color: "#ead8a2", padding: 14, fontSize: 13, lineHeight: 1.5, marginTop: 18 }
};
var fmt = (n) => new Intl.NumberFormat("pt-BR").format(Number(n || 0));
var when = (value) => value ? new Date(value).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }) : "\u2014";
var stateFor = (route) => route.cooldownUntil && new Date(route.cooldownUntil) > /* @__PURE__ */ new Date() ? "Em cooldown" : route.lastStatus === 200 ? "Respondeu OK" : route.lastStatus ? "Erro HTTP " + route.lastStatus : "Sem teste recente";
function AiUsagePage() {
  const context = useHostContext();
  const { data, loading, error, refresh } = usePluginData("ai-usage", { companyId: context.companyId });
  if (loading && !data) return h("div", { style: styles.page }, "Carregando dados do Paperclip\u2026");
  if (error) return h("div", { style: styles.page }, "Erro ao consultar o uso: " + error.message);
  if (!data) return h("div", { style: styles.page }, "Nenhuma organiza\xE7\xE3o selecionada.");
  const total = data.usage.inputTokens + data.usage.outputTokens;
  return h(
    "main",
    { style: styles.page },
    h(
      "header",
      { style: styles.header },
      h(
        "div",
        null,
        h("div", { style: styles.eyebrow }, "Opera\xE7\xE3o \xB7 or\xE7amento R$ 0"),
        h("h1", { style: styles.title }, "Uso de IA"),
        h("div", { style: styles.muted }, data.organization + " \xB7 atualizado " + when(data.checkedAt))
      ),
      h("button", { style: styles.button, onClick: () => refresh() }, "Atualizar")
    ),
    h(
      "section",
      { style: styles.grid },
      metric("\xDAltimo LLM usado", data.activeRoute || "Aguardando chamada", data.modelAlias + " \xB7 rota\xE7\xE3o gratuita"),
      metric("Tokens registrados", fmt(total), fmt(data.usage.inputTokens) + " entrada \xB7 " + fmt(data.usage.outputTokens) + " sa\xEDda"),
      metric("Cache de entrada", fmt(data.usage.cachedInputTokens), "Tokens em cache registrados no Paperclip"),
      metric("Custo registrado", "R$ " + (data.usage.costCents / 100).toFixed(2).replace(".", ","), data.usage.issuesScanned + " tarefas consultadas no Paperclip")
    ),
    h("h2", { style: styles.section }, "Rotas gratuitas dispon\xEDveis"),
    h("div", { style: styles.tableWrap }, h(
      "table",
      { style: styles.table },
      h("thead", null, h("tr", null, ...["Provedor / modelo", "Estado observado", "\xDAltimo sucesso", "Cooldown at\xE9", "Cota restante / renova\xE7\xE3o"].map((x) => h("th", { style: styles.th, key: x }, x)))),
      h("tbody", null, ...data.routes.map((route) => h(
        "tr",
        { key: route.model },
        h("td", { style: styles.td }, h("strong", null, route.provider), h("div", { style: styles.muted }, route.model)),
        h("td", { style: styles.td }, h("span", { style: styles.pill }, stateFor(route)), route.lastStatus ? h("div", { style: styles.muted }, "HTTP " + route.lastStatus) : null),
        h("td", { style: styles.td }, when(route.lastSuccessAt)),
        h("td", { style: styles.td }, when(route.cooldownUntil)),
        h("td", { style: styles.td }, route.quota)
      )))
    )),
    h("h2", { style: styles.section }, "Agentes (" + data.agents.length + ")"),
    h("div", { style: styles.tableWrap }, h(
      "table",
      { style: styles.table },
      h("thead", null, h("tr", null, ...["Agente", "Estado", "Modelo", "Runtime"].map((x) => h("th", { style: styles.th, key: x }, x)))),
      h("tbody", null, ...data.agents.map((agent) => h(
        "tr",
        { key: agent.name },
        h("td", { style: styles.td }, agent.name),
        h("td", { style: styles.td }, agent.status),
        h("td", { style: styles.td }, agent.model),
        h("td", { style: styles.td }, agent.adapter)
      )))
    )),
    h("div", { style: styles.warning }, data.quotaNotice),
    h("p", { style: { ...styles.muted, marginTop: 14 } }, "Tokens exibidos s\xE3o os eventos que o Paperclip registrou nas " + data.issueCount + " tarefas consultadas. " + (data.hasMoreIssues ? "Existem mais tarefas; a lista exibida pode n\xE3o cobrir todo o hist\xF3rico. " : "") + "O saldo externo de cada provedor n\xE3o \xE9 sincronizado nem estimado.")
  );
}
function metric(label, value, hint) {
  return h(
    "article",
    { style: styles.card },
    h("div", { style: styles.label }, label),
    h("div", { style: styles.value }, value),
    h("div", { style: { ...styles.muted, marginTop: 6 } }, hint)
  );
}
export {
  AiUsagePage
};
