# Painel de Uso de IA do Paperclip

Plugin interno para a instância https://paperclip.apexgol.com.br.

A página Uso de IA em https://paperclip.apexgol.com.br/ROT/ai-usage mostra:

- Modelo solicitado openai/fast e última rota gratuita que respondeu.
- Tokens de entrada/saída/cache e custos registrados pelos eventos por tarefa no Paperclip.
- Estado recente e cooldown observável de seis rotas gratuitas/keyless.
- Estado e modelo configurado dos agentes da organização.
- Créditos restantes e datas de renovação somente quando um provedor os expuser; hoje esses endpoints gratuitos não informam esses valores.

O saldo externo não pode ser inferido do número de tokens utilizados. Quando indisponível pela API do provedor, o painel mostra essa limitação claramente em vez de estimar.

O worker consulta o Paperclip pelo SDK com companies.read, agents.read, issues.read, issues.orchestration.read; lê somente /status do proxy local. Não lê tokens de provedor, não altera agentes nem faz chamadas de inferência. Cache de 30 segundos para evitar consultas excessivas.

## Rotas exibidas

Kilo Auto Free/Small, LLM7 Codestral/GPT-OSS 20B, ChatJimmy Llama 3.1 8B e Pollinations OpenAI. A quota pode mudar; estado de execução e cooldown são telemetria local, não garantia de créditos disponíveis.

## Operação

- src/ contém o código-fonte; dist/ contém bundles servidos pelo Paperclip.
- node build.mjs reconstrói bundles usando o esbuild instalado junto à versão local do Paperclip.
- O node_modules/@paperclipai/plugin-sdk da VPS é um link local e não entra no Git; ao reinstalar noutra VPS, vincule o SDK da mesma versão ao plugin antes de ativar.
- O plugin foi instalado como recurso local da instância e está ready; GET /api/plugins/ui-contributions confirmou a página.

## Fontes de cotas

- Gemini: https://ai.google.dev/gemini-api/docs/rate-limits
- Groq: https://console.groq.com/docs/rate-limits
- OpenRouter: https://openrouter.ai/collections/free-models
- Cerebras: https://inference-docs.cerebras.ai/support/pricing
- Cloudflare Workers AI: https://developers.cloudflare.com/workers-ai/platform/pricing/
- Hugging Face: https://huggingface.co/docs/inference-providers/pricing
- Mistral: https://docs.mistral.ai/admin/billing-usage/usage-limits
