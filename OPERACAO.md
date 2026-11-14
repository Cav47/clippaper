# Operação e publicação

## CEO e fluxo de aprovação operacional

Há dois CEOs de nicho, “CEO — Rotina em Família” e “CEO — Microdramas Animados”, cada um com sua equipe. A Diretora de Conteúdo e Fila Compartilhada coordena as rotinas dos dois nichos e impede ciclos simultâneos; cada CEO valida e conduz a execução do próprio projeto. O CEO revisa a fila aberta, valida prioridade, escopo, responsável e dependências, encaminha tarefas claras e acompanha bloqueios. Essa aprovação operacional libera uma tarefa para delegação; não substitui aprovações formais do board, autorização de gastos, revisão editorial exata nem confirmação de contas para publicação. O CEO usa apenas `openai/fast` na rota gratuita; não pode publicar, trocar credenciais, assumir custos ou contornar revisão.

A skill `ceo-operacao-governanca` e as instruções `agents/ceo.md` definem esse papel. A primeira triagem executiva está registrada na ROT-29. A Diretora de Conteúdo coordena duas rotinas alternadas: Rotina em Família no minuto :00 e Microdramas Animados no minuto :30, ambas no fuso America/Sao_Paulo. Cada nicho tem CEO e agentes próprios; uma execução não começa enquanto houver ciclo ativo do outro nicho. ROT-6 e ROT-9 continuam bloqueadas por falhas anteriores de runner; não as reexecutar sem resolução comprovada.

## Cadência automatizada

A empresa agenda ciclos de produção a cada 30 minutos, alternando Rotina em Família e Microdramas Animados. A Diretora verifica os projetos e mantém apenas um ciclo ativo por vez; atrasos são pulados/coalescidos. Ambas usam a rota gratuita. A publicação automática de Rotina em Família é limitada a 10 peças por canal em cada janela móvel de 24 horas, com revisão editorial exata. Microdramas Animados não tem canal próprio e mantém tudo em rascunho; não usar as contas de Rotina em Família. A configuração efetiva fica no banco do Paperclip e precisa ser exportada para a VPS.

## Entrega atual

A Diretora delega produção ao Criador e revisão à Revisora; a Analista agenda somente após aprovação editorial da versão exata e confirmação dos canais. A publicação automática continua autorizada apenas nesse fluxo e em contas conectadas. ROT-21 foi agendada no Metricool com publicação automática para YouTube Shorts e Instagram Reels; confira o status final no Planner antes de declarar que publicou. ROT-28 teve revisão editorial aprovada. A mídia foi hospedada em um GitHub Release público e importada pelo Metricool. ROT-30 agendou o Instagram Reels para 14/11/2026 às 10h e o YouTube Short às 16h (America/Los_Angeles), ambos com `autoPublish=true` e estado `PENDING` na última conferência. IDs e links estão em `BLOQUEIO-AGENDAMENTO-ROT-30.md`; confirmar resultado após o horário antes de declarar que publicou.

## Como os Shorts e posts serão publicados

1. Pesquisar pauta e continuidade; o agente Criador produz roteiro, legenda e vídeo/post no workspace.
2. A Revisora aprova ou bloqueia o texto e o arquivo exatos. Qualquer alteração posterior exige revisão da versão atualizada.
3. Para cada vídeo, o Criador também entrega URL HTTPS pública permanente ou `mediaId` Metricool e registra no ticket. Use upload direto suportado pelo Metricool ou armazenamento durável já conectado e aprovado. Se nenhum estiver disponível, anexe o MP4 e bloqueie o agendamento; não use links locais, temporários ou permissões públicas improvisadas.
4. Depois da aprovação e com mídia acessível, a Analista confirma no Metricool as contas conectadas da marca e cria o agendamento no próximo horário recomendado e dentro da cadência da rotina. Não pede aprovação humana individual novamente.
5. Verificar o calendário do Metricool e, após o horário, confirmar a publicação na plataforma; registrar conta, horário, identificador e link. Se a API não confirmar, reportar bloqueio, não declarar sucesso.

As rotinas ativas da Diretora alternam a cada meia hora: Rotina em Família no minuto :00 e Microdramas no minuto :30, em America/Sao_Paulo. Cada CEO lidera seu fluxo e sua equipe; a Diretora coordena a fila comum e só permite uma execução por vez. Microdramas produz drafts, sem agendar ou publicar até haver canais próprios. Rotina em Família mantém revisão exata e teto de 10 publicações por canal em 24 horas.

Para ROT-30, o repositório GitHub público foi usado como hospedagem permanente de origem; o Metricool importou os arquivos e passou a servir as mídias pela própria CDN. Para novos vídeos, repetir esse fluxo apenas depois da revisão editorial exata e registrar a URL permanente e os IDs retornados no ticket.

## Estabilidade do Paperclip

Os heartbeats de intervalo estão desativados nos cinco agentes; `wakeOnDemand` continua ligado para tarefas atribuídas. Assim, a rotina e as subtarefas acordam os agentes sem iniciar execuções vazias. Os limites dos agentes estão em 600 segundos para reduzir interrupções em pesquisa, revisão e renderização. A versão local é `2026.1106.0`. Nela, o Runner apresenta uma falha conhecida ao recuperar uma sessão OpenCode cujo turno ativo sumiu; não repetir tickets bloqueados por esse erro. Mitigações locais não substituem correção upstream: [issue 15889 do Paperclip](https://github.com/paperclipai/paperclip/issues/15889).

## Skills e custo de tokens

As skills próprias de texto, tradução/localização, produção de vídeo e economia de tokens estão em `skills/` e são carregadas quando relevantes. As skills oficiais de Remotion e a atribuição à Diretora residem também na biblioteca/banco do Paperclip; `skills/SOURCES.md` registra a origem e como reproduzi-las. RTK está instalado localmente e filtra saídas de comandos OpenCode; isso economiza parte dos tokens de entrada, não substitui a escolha do modelo nem reduz toda a conta.

## Meta, orçamento e gate operacional

A meta da empresa no Paperclip é R$ 10.000 de MRR até 30/06/2027, vinculada ao projeto Canal e Conteúdo Web. Acompanhar receita recorrente efetivamente recebida, clientes pagantes, churn e fontes; não contar visualizações, projeções ou receita pontual como MRR. O orçamento autorizado de IA é R$ 0/mês. Como `budgetMonthlyCents: 0` no Paperclip desativa o limite, o proxy local aceita apenas `openai/fast` e o encaminha para `kilo-gateway/kilo-auto/free`, sem fallback pago. Se a cota grátis estiver indisponível, os tickets devem parar. As conexões pagas permanecem configuradas para uso futuro somente depois da autorização de créditos. A equipe foi reativada nessa rota gratuita.

Foram adicionadas as skills `gate-de-conclusao-paperclip` (delegação e evidência antes de concluir tarefas), `insights-de-audiencia` (leitura de métricas e hipóteses) e `publicacao-social` (publicação após aprovação e análise de métricas agregadas). Skills e meta estão no banco local Paperclip e devem ser exportadas junto com a empresa ao migrar para VPS.

## VPS e Git

Versionar código, instruções, roteiros e documentação. Não versionar chaves, senhas, tokens, cookies, banco de dados ou backups. A configuração da rotina, conexões, meta, skills instaladas e estado operacional do Paperclip residem no banco e precisam de backup/exportação e migração separados para a VPS. Na VPS, recriar segredos localmente, configurar Paperclip/LLMF/proxy como serviços persistentes e validar o agendador antes de liberar novas execuções. O repositório local está vinculado a `Cav47/clippaper`; o GitHub CLI está autenticado como `Cav47` pelo Keychain e `main` sincronizada com `origin/main`.

## Skills e ferramentas externas avaliadas em 13/11/2026

Foram importadas para a biblioteca da empresa Paperclip, fixadas em revisões específicas e atribuídas aos agentes pertinentes: NVIDIA Skill Inspector (CEO), Ponytail (CEO), Agent Reach (CEO, Diretora, Pesquisador, Criador e Analista) e Humanizer (Diretora, Criador e Revisor). O Paperclip materializa cada skill selecionada no próximo turno do agente. As skills externas não selecionadas não são carregadas por esses agentes.

Na máquina local também estão SkillSpector 2.12.0 e Agent Reach 1.6.1 em CLI, além do Insomnia 13.4.0 em `~/Applications/Insomnia.app`. Não foram configurados logins, cookies, chaves ou sessões para Agent Reach/Insomnia. Use Agent Reach só para leitura pública; não inicialize sessões autenticadas nem reutilize cookies do Chrome.

Foram avaliadas, mas não instaladas, as solicitações lemo-opuscar, rea, hallmark, last 30 days, scrapling, diagram-design, taste-skill, impeccable, ui-ux-pro-max, OpenViking, Ternary Bonsai, GLM-5.3-Flash, Unsloth Studio e Pizza Bot. Motivos e resultado da triagem estão em `skills/SOURCES.md`: alertas críticos/incompletos, bloqueio de importação do próprio Paperclip, falta de necessidade na arquitetura atual ou falta de necessidade na arquitetura atual ou exigência de servidor GPU de grande porte para GLM-5.3-Flash. Hallmark e Scrapling foram recusadas pela análise de segurança. Não contornar bloqueios do scanner ou do Paperclip.

## Novo nicho em planejamento

O Paperclip contém o projeto ativo **Microdramas Animados Originais**, dentro da mesma organização Rotina em Família, liderado pelo CEO de Microdramas e com equipe dedicada. A organização duplicada `80f16ecf-54f8-4b29-89cf-d75f8d522ee6` foi pausada para evitar duplicação. O piloto tem intenção editorial 13+ e produz somente rascunhos, ainda sem canais próprios. Cada peça exige avaliação individual de audiência real e configuração Made for Kids quando aplicável; o rótulo 13+ não contorna regras.

A produção a cada 30 minutos foi ativada em rotinas alternadas entre os dois projetos da mesma organização. Isso é cadência de produção de rascunhos, não obrigação de publicar a cada meia hora. Apenas Rotina em Família usa os canais conectados; seu teto é de 10 itens autoagendados por canal em 24 horas. Microdramas fica em rascunho até dispor de canais próprios e autorização. Toda peça passa por revisão de audiência, segurança, qualidade, metadata e direitos antes de eventual publicação.
