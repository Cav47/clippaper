# Operação e publicação

## Até domingo

A rotina da Diretora está habilitada diariamente às 9h, no fuso America/Los_Angeles. O acompanhamento do Paperclip deve confirmar servidor, agendador, execução e entrega. No domingo, restaurar o gatilho para segunda-feira às 9h, evitando execuções diárias durante a viagem. A configuração efetiva fica no banco do Paperclip; este arquivo registra o procedimento e não substitui backup/migração desse banco.

## Entrega atual

A Diretora produz roteiros e legendas como arquivos Markdown no workspace. Cada arquivo precisa estar anexado ao ticket como rascunho e passar por revisão humana. O roteiro `SHORT-SEMANA-2026-11-12.md` é a primeira entrega verificada. Nenhum conteúdo foi publicado.

## Como os Shorts e posts serão publicados

1. Revisar e aprovar roteiro, legenda e afirmações factuais.
2. Produzir e revisar o vídeo vertical final (MP4) com imagens, narração, legendas na tela e trilha com direitos de uso. O primeiro preview local do template Remotion 1080×1920 foi renderizado e conferido no começo, meio e fim: `video/out/SHORT-2026-11-12-preview.mp4`. É tipográfico e silencioso, sem cenas fotorrealistas, voz ou música, e não está pronto para publicação. Piper TTS 1.8.0 está instalado em ambiente isolado; nenhum modelo de voz foi baixado.
3. Para um Short do YouTube ou Reel do Instagram, anexar o vídeo final e preencher os metadados exigidos da plataforma. Para post estático, preparar imagem/carrossel e texto próprios.
4. Usar Metricool para enviar à fila de revisão/agendamento somente após aprovação humana e confirmação das contas/canais pretendidos.
5. Verificar o resultado no calendário do Metricool e, após o horário, confirmar a publicação na plataforma.

A integração com Metricool não significa que existe postagem automática configurada: nenhuma tarefa atual envia publicações.

## Skills e custo de tokens

As skills próprias de texto, tradução/localização, produção de vídeo e economia de tokens estão em `skills/` e são carregadas quando relevantes. As skills oficiais de Remotion e a atribuição à Diretora residem também na biblioteca/banco do Paperclip; `skills/SOURCES.md` registra a origem e como reproduzi-las. RTK está instalado localmente e filtra saídas de comandos OpenCode; isso economiza parte dos tokens de entrada, não substitui a escolha do modelo nem reduz toda a conta.

## Meta, orçamento e gate operacional

A meta da empresa no Paperclip é R$ 10.000 de MRR até 30/06/2027, vinculada ao projeto Canal e Conteúdo Web. Acompanhar receita recorrente efetivamente recebida, clientes pagantes, churn e fontes; não contar visualizações, projeções ou receita pontual como MRR. O orçamento autorizado de IA é R$ 0/mês. Como `budgetMonthlyCents: 0` no Paperclip desativa o limite, não representa gasto zero, os agentes e o gatilho diário foram pausados até a existência de um modelo local gratuito comprovado ou uma nova decisão de orçamento. A conexão LLMF/OpenAI atual é classificada como API tarifada e não informa custo por execução.

Foram adicionadas as skills `gate-de-conclusao-paperclip` (delegação e evidência antes de concluir tarefas) e `insights-de-audiencia` (leitura de métricas e hipóteses sem alterar contas nem publicar). A primeira deve ser usada pela Diretora, Pesquisador e Revisor; a segunda pela Diretora e Pesquisador. Skills e meta estão no banco local Paperclip e devem ser exportadas junto com a empresa ao migrar para VPS.

## VPS e Git

Versionar código, instruções, roteiros e documentação. Não versionar chaves, senhas, tokens, cookies, banco de dados ou backups. A configuração da rotina, conexões, meta, skills instaladas e estado operacional do Paperclip residem no banco e precisam de backup/exportação e migração separados para a VPS. Na VPS, recriar segredos localmente, configurar Paperclip/LLMF/proxy como serviços persistentes e validar o agendador antes de liberar novas execuções. O repositório local já está vinculado a `Cav47/clippaper`, mas a autenticação GitHub não está disponível nesta sessão; por isso, commits locais ainda precisam ser enviados quando a autenticação for resolvida.
