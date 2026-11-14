# Memória do CEO Supremo

Skill canônica: company/memoria-operacional-supremo. Nunca registrar segredos. Atualizar após incidentes com causa, ação, evidência e validação.

## Snapshot inicial — 2026-11-14
- Empresa/projetos, equipes, fila serial, cadência :00 Família / :30 Microdramas, custo zero e publicação após revisão exata constam na skill.
- Paperclip: https://paperclip.apexgol.com.br; mídia aprovada: https://media.apexgol.com.br/m/*.mp4. App 3100; Caddy media 3101.
- Conexão Metricool MCP 761c64dd-49ee-49b2-8b89-5a389a40dfcc instalada no escopo da empresa; 9 ações autorizadas, com escopo empresarial. CEO Supremo e Analista têm acesso efetivo.
- getBrandSettings e getScheduledPosts confirmaram marca 8070469, Instagram cav470609, YouTube UCewElO68XOz1f4Gf7FWxSuA e fuso America/Sao_Paulo.
- ROT-104 aprovado ROT-105; mídia permanente validada e SHA constam na skill. Agendado com autoPublish=true (PENDING): Instagram Reel 15/11/2026 às 10:00, id 428196682; YouTube Short 15/11/2026 às 16:00, id 428196681. Confirmação independente de getScheduledPosts em 14/11; ainda não publicado. ROT-106/ROT-108 devem registrar a recuperação e não criar duplicatas.

## Incidente 2026-11-14 — Metricool MCP disponível na VPS
- Causa encontrada: conexão saudável, porém a instalação de ferramentas Metricool estava atribuída a seis agentes e faltava disponibilização efetiva ao CEO Supremo; a mensagem de erro “sem ferramentas” era de escopo no Paperclip, não prova de falha de credenciais.
- Ação: conexão 761c64dd-49ee-49b2-8b89-5a389a40dfcc instalada no escopo da empresa. CEO Supremo verifica com acesso efetivo a 9 ações; perfil instalado não revela segredos.
- Evidência: `getBrandSettings` e `getScheduledPosts` concluíram leituras reais; marca 8070469, contas Instagram cav470609 e YouTube UCewElO68XOz1f4Gf7FWxSuA; fuso `America/Sao_Paulo`.
- Segurança: publicação requer revisão exata, mídia pública aprovada, calendário/limite <=10 por canal/24h e confirmação do estado retornado. Nunca repetir criação sem dedupe. ROT-104/ROT-105 aprovados; ROT-106 segue sem confirmação de publicação até concluir consulta e agendamento.
- Próxima verificação: se agente não enxergar Metricool, inspecionar `GET /api/companies/{companyId}/tools/profiles/effective/agents/{agentId}`, instalação e audit do gateway; não pedir credencial ao usuário por chat. Atualizar esta memória quando ROT-106 terminar.

## Identidade visual de Rotina em Família — 2026-11-14
- Marca implementada no projeto: “Rotina em Família”; assinatura “Pequenos passos. Mais presença.”; paleta verde petróleo/creme/coral/dourado.
- Guia, bios, nome de exibição sugeridos, avatar, capa do YouTube, peça quadrada e capa vertical estão em brand/rotina-em-familia/.
- O usuário autorizou alteração pública de nome, bio e avatar. Ainda não alterados: catálogo Metricool não tem ferramenta de edição de perfil; busca Composio retornou grant_audience_denied. Para concluir publicação da identidade, usar conexão autenticada Meta/Instagram e YouTube com a conta certa; preservar handles até disponibilidade verificada. Não inventar conclusão.
- A skill identidade-visual-rotina-familia foi vinculada ao CEO Supremo e aos seis agentes do projeto Família; não usar em Microdramas.

## Incidente de fila serial — 2026-11-14
- Causa comprovada: ROT-103 e ROT-109 eram dois tickets de monitor de despachante Microdramas em in_progress. Cada um contava o outro como trabalho editorial ativo; ROT-110, da Família, também esperava. Não havia ticket de entrega em andamento. Isso criou um deadlock de monitores, não uma falha de provedor.
- Resolução: preservar comentários/histórico, encerrar ROT-103 e ROT-109 como tickets de espera duplicados/obsoletos, atualizar as rotinas ativas Família (:00) e Microdramas (:30) para ignorarem despachantes cujo último run terminou e contarem apenas tickets/run de entrega realmente ativos. ROT-110 foi reavaliado; monitor executou novo run. Verifique o estado ao vivo antes de afirmar que a produção começou.
- Nunca deixar monitores de dois despachantes bloquearem uns aos outros. Antes de agir, distinguir ticket de entrega de issue de controle/monitor; preservar as cadências 0 * * * * e 30 * * * * em America/Sao_Paulo.

## Conexões e escopo — 2026-11-14
- O usuário autorizou expandir o acesso sem revelar segredos. Concessão Composio ativa agora inclui o usuário autenticado atual e local-board; nenhuma senha/token foi copiada para memória.
- Metricool e Composio reportam conexão/health active/ok. Isto não significa OAuth de publicação de perfil. A autorização do toolkit YouTube foi iniciada e retornou authorization_required; ainda falta completar o consentimento Google no navegador. Não armazenar nem registrar link temporário de OAuth.
- Metricool não oferece ações de alterar perfil; catálogo Composio atual não oferece ação de escrita Instagram. Não afirmar nome/bio/avatar alterados até confirmar escrita nas plataformas. Manter handles e perfis atuais; os assets visuais estão prontos e versão final precisa de OAuth válido.

## Incidente e recuperação de quota gratuita — 2026-11-14
- ROT-109 e ROT-110 falharam antes de gerar conteúdo quando a rota única Kilo respondeu HTTP 429. Permanecem bloqueados, preservados e sem repetição.
- Foi implantado no VPS um proxy local OpenAI-compatible com allowlist gratuita/keyless, round-robin, cooldown por status/timeout e 503/Retry-After se toda a capacidade gratuita estiver indisponível. Sem fallback pago.
- Todas as 13 configurações de agente permanecem em `openai/fast` e usam a conexão local atual apontada para `127.0.0.1:8001/v1`; não é preciso reconfigurar agentes individualmente.
- `llmf` é servido localmente em `127.0.0.1:8000` com `--no-fallback`. O proxy só admite a allowlist abaixo e não delega a seleção genérica do LLMF.

## Rotação gratuita — configuração e operação (14 nov 2026)
- O orçamento de IA é R$ 0. Todas as configurações dos agentes continuam em `openai/fast`; o proxy local `127.0.0.1:8001/v1` distribui a alias `fast` exclusivamente por estas rotas gratuitas/keyless: `kilo-gateway/kilo-auto/free`, `kilo-gateway/kilo-auto/small`, `llm7/codestral-latest`, `llm7/gpt-oss:20b`, `chatjimmy/llama3.1-8B` e `pollinations/openai`.
- O proxy escolhe as rotas em round-robin, pula provedores em cooldown e aplica cooldown após 401/403, 404, 429, 5xx ou timeout; registra apenas rota/status/latência, nunca prompts, respostas ou credenciais. Não habilitar fallback genérico do LLMF, porque pode incluir rotas pagas/limitadas. Não incluir serviços com cobrança, cartão obrigatório ou quota paga nesta allowlist.
- Provas operacionais em 14/11/2026: respostas 200 de `llm7/codestral-latest`, `pollinations/openai` e `kilo-gateway/kilo-auto/small`; o Kilo `free`, LLM7 GPT-OSS e ChatJimmy também tiveram falhas intermitentes, aplicando cooldown e tentando a próxima rota. A disponibilidade muda por provedor.
- Se nenhuma rota gratuita responder, o proxy retorna 503 e Retry-After; o trabalho pode ficar bloqueado até quota/capacidade retornar. Não há como garantir trabalho de inferência sem ao menos uma quota gratuita disponível. As rotinas novas seguem Família :00 e Microdramas :30 em `America/Sao_Paulo`, orçamento zero e sem fallback pago.
- Rotinas ativas verificadas: Família `1f074a2c-a78c-4500-a248-972d3f0358d0`, Microdramas `60943aaa-518c-4d0f-8d42-2bc4735fc9de`. Execuções antigas ROT-109/ROT-110 continuam bloqueadas e não devem ser reabertas; a próxima cadência cria novas execuções.

## Cota gratuita Codex
- A quota da conversa/Codex não é uma credencial API transferível para a VPS. Não solicitar nem guardar segredo para tentar copiá-la.
- Fontes verificadas em documentação oficial: Gemini API free tier (limites por modelo/projeto e aviso de uso de dados), Groq (rate limits por organização/modelo), OpenRouter `:free` (limites diários/por minuto), Cerebras (free tier de avaliação), Cloudflare Workers AI (franquia diária com conta/token), Hugging Face (crédito mensal pequeno) e Mistral (API requer ativação de billing). Nenhum destes novos conectores foi ativado porque exige conta/chave/grant que não existe na VPS; não inventar credenciais nem selecionar opção que possa cobrar.
- A rotação efetivamente instalada usa apenas as rotas gratuitas/keyless do proxy local acima. Se uma rota ficar 429/5xx/timeout, aguarde o cooldown e use a próxima. Se todas falharem, a execução pausa; não há quota ilimitada garantida.
- Próximo run agendado é uma tarefa nova e não reabre tickets bloqueados. Publicações continuam dependendo de revisão exata já registrada e das regras de canal/mídia.

## Publicação validada no Metricool — 2026-11-14
- Microdrama Sinal de Tinta — Ep. 01 foi publicado em 14/11 às 12:15 em ambas as redes, sob autorização específica do usuário para usar as contas da Rotina em Família nesta peça: Instagram https://www.instagram.com/reel/DfugaxZAR_4/ e YouTube https://www.youtube.com/shorts/36U0AO8B_DI (Metricool id 428071508). Esta autorização foi específica para a publicação inicial em IG/YT; Microdramas futuros devem seguir para TikTok MiniDramas após revisão exata, sem usar IG/YT da Família sem nova autorização específica.
- ROT-104 (Família), aprovação exata ROT-105, permanece PENDING/autoPublish=true: Instagram 15/11 às 10:00 (id 428196682) e YouTube 15/11 às 16:00 (id 428196681), fuso America/Sao_Paulo. Não alterar agenda sem instrução específica nem declarar publicado antes da confirmação.

## TikTok MiniDramas — estado verificado em 14/11/2026
- A conexão Metricool da marca `8070469` está ativa e `getBrandSettings` confirma TikTok `MiniDramas`, Instagram `cav470609` e YouTube `UCewElO68XOz1f4Gf7FWxSuA`, fuso `America/Sao_Paulo`. O CEO de Microdramas, Diretora e Analista têm acesso às ferramentas Metricool concedidas.
- Destino operacional: novos Microdramas somente TikTok `MiniDramas`; não reutilizar IG/YT da Rotina em Família sem autorização específica do item/rede. Revisão exata, URL permanente, classificação de audiência e rotulagem AIGC quando aplicável continuam obrigatórias.
- Consulta do calendário 14/11: ROT-104 segue pendente em IG 15/11 10:00 e YT 15/11 16:00 BRT; nenhum post TikTok publicado ou agendado. O Ep. 01 Sinal de Tinta permanece publicado em IG/YT em 14/11 por autorização específica já dada; não inferir autorização para outros episódios.
- Metricool permite auto-publicação TikTok de vídeo com até 500 MB e 3 s–10 min; API não suporta quebras de linha e efeitos/música nativos podem exigir publicação manual. Ver skill `publicacao-social` e confirmar a documentação do Metricool antes de alterações de API.
- Diagnóstico da tentativa Metricool id 428294085: TikTok retornou: the video file format did not meet the frame rate specifications, mínimo 23 FPS e máximo 60 FPS. O MP4 público tinha 1080×1920, H.264, 20 fps, 40 s, 1.61 MB e AAC estéreo 48 kHz; Instagram/YouTube do mesmo job foram publicados. Não há retries automáticos nem outro agendamento TikTok; corrigido o pipeline para exportar/validar CFR 30 fps e bloquear mídia TikTok abaixo de 23 fps antes de hospedagem. Uma nova versão precisa passar pela revisão exata antes de qualquer novo agendamento.

## Escopo atualizado: Microdramas em todas as redes — 2026-11-14
- O usuário encerrou Rotina em Família como nicho editorial e autorizou Microdramas nas contas Metricool 8070469: Instagram cav470609, YouTube UCewElO68XOz1f4Gf7FWxSuA e TikTok MiniDramas.
- Projeto Canal e Conteúdo Web cancelado; despachante Família pausado; agentes Família pausados. Microdramas é o único projeto editorial ativo, despachante no minuto :30 de cada hora, America/Sao_Paulo. Não reativar rotinas duplicadas.
- Sinal de Tinta Ep. 01 consta publicado em Instagram/YouTube. A versão CFR 30 consta agendada no TikTok para 15/11 às 10:00 BRT, Metricool 428322087, PENDING/autoPublish=true na última consulta; não repetir. Esta atualização não teve consulta Metricool ao vivo.
- Futuras peças: aprovar a versão exata, confirmar conta/horário/mídia/classificação/direitos e limite de 10 por canal/24h; adaptar formato e metadados por rede, sem duplicar.

## Falha de execução OpenCode — 2026-11-14
- ROT-116 bloqueou antes de iniciar produção com “selected AI account is unavailable”. Evidência adicional: OpenCode não listava o alias openai/fast; o arquivo opencode.local.json não era carregado automaticamente. O endpoint do proxy local anunciou o modelo fast.
- Correção local: criado /home/paperclip/.config/opencode/opencode.json, compatível com a versão instalada do OpenCode, apontando exclusivamente para a rotação gratuita em 127.0.0.1:8001/v1. Configuração protegida em modo 0600, legível pelo usuário paperclip e fora do Git. Recarregado OpenCode.
- Verificação: openai/fast aparece em opencode models e respondeu OK via execução normal. Proxy LLMF e Paperclip ativos; /api/health retorna 200. A rotina Microdramas mantém próxima execução às 18:30 BRT. O bloqueio antigo não foi repetido; a próxima cadência criará um novo ciclo.
