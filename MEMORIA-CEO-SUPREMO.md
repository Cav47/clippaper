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

## Cota gratuita — 2026-11-14
- Runs ROT-109 e ROT-110 falharam antes de gerar conteúdo: a rota única autorizada kilo-gateway/kilo-auto/free respondeu HTTP 429 (“Sign up for free… or come back later”).
- Sem fallback pago. Rotinas Família :00 e Microdramas :30 pausadas; tickets bloqueados com monitor removido para impedir nova tentativa. Não reabrir até cota/acesso gratuito voltar e o usuário confirmar.
- Causa é limite/acesso do provedor, não Metricool nem credenciais de publicação. Próximo passo: usuário regularizar a cota gratuita ou aguardar reset; então verificar saúde antes de retomar.

## Roteamento gratuito — decisão 2026-11-14
- A cota do Codex/chat desta conversa não é uma credencial/API transferível para a VPS. Não solicitar nem guardar senha/token para tentar copiá-la.
- Todas as 13 configurações de agente seguem model openai/fast e conexão f8b44e1d; sua rota só aceita openai/fast → kilo-gateway/kilo-auto/free. O gateway respondeu 429.
- A conexão alternativa chamada LLMF local gratuito (5e865a3c) usa endpoint local 8000/v1 e respondeu 401 sem autenticação; não redirecionar agentes a ela sem validar uma conexão real, gratuita e funcional. A rota atual usa 8001/v1 e anuncia apenas fast, mas o upstream gratuito está em limite.
- CEO Supremo pode verificar health/status e modelos sem custo; só pode trocar uma execução para outra conexão já configurada, confirmada gratuita e saudável. Se não houver rota livre válida, pausar e registrar; nunca escolher uma rota paga.
- ROT-104 permanece aprovado e autoagendado no Metricool para IG em 15/11/2026 10:00 e YouTube em 15/11/2026 16:00 (America/Sao_Paulo), ambos PENDING/autoPublish=true. Não declarar publicado antes do estado Publicado. Nenhuma outra peça vira publicação sem aprovação editorial exata.

## Publicação validada no Metricool — 2026-11-14
- Microdrama Sinal de Tinta — Ep. 01 foi publicado em 14/11 às 12:15 em ambas as redes, sob autorização específica do usuário para usar as contas da Rotina em Família nesta peça: Instagram https://www.instagram.com/reel/DfugaxZAR_4/ e YouTube https://www.youtube.com/shorts/36U0AO8B_DI (Metricool id 428071508). Esta autorização é específica deste Ep. 01; Microdramas futuros continuam rascunhos até aprovação/canais próprios.
- ROT-104 (Família), aprovação exata ROT-105, permanece PENDING/autoPublish=true: Instagram 15/11 às 10:00 (id 428196682) e YouTube 15/11 às 16:00 (id 428196681), fuso America/Sao_Paulo. Não alterar agenda sem instrução específica nem declarar publicado antes da confirmação.
