# Operação e publicação

## Até domingo

A rotina da Diretora está habilitada diariamente às 9h, no fuso America/Los_Angeles. O acompanhamento do Paperclip deve confirmar servidor, agendador, execução e entrega. No domingo, restaurar o gatilho para segunda-feira às 9h, evitando execuções diárias durante a viagem. A configuração efetiva fica no banco do Paperclip; este arquivo registra o procedimento e não substitui backup/migração desse banco.

## Entrega atual

A Diretora produz roteiros e legendas como arquivos Markdown no workspace. Cada arquivo precisa estar anexado ao ticket como rascunho e passar por revisão humana. O roteiro `SHORT-SEMANA-2026-11-12.md` é a primeira entrega verificada. Nenhum conteúdo foi publicado.

## Como os Shorts e posts serão publicados

1. Revisar e aprovar roteiro, legenda e afirmações factuais.
2. Produzir e revisar o vídeo vertical final (MP4) com imagens, narração, legendas na tela e trilha com direitos de uso. O projeto possui um template Remotion vertical 1080×1920, mas ainda não foi renderizado nem validado como MP4. Piper TTS 1.8.0 está instalado em ambiente isolado local; nenhum modelo de voz foi baixado. O renderizador produz vídeo tipográfico, não cenas fotorrealistas; roteiro sozinho não pode ser enviado como Short/Reel.
3. Para um Short do YouTube ou Reel do Instagram, anexar o vídeo final e preencher os metadados exigidos da plataforma. Para post estático, preparar imagem/carrossel e texto próprios.
4. Usar Metricool para enviar à fila de revisão/agendamento somente após aprovação humana e confirmação das contas/canais pretendidos.
5. Verificar o resultado no calendário do Metricool e, após o horário, confirmar a publicação na plataforma.

A integração com Metricool não significa que existe postagem automática configurada: nenhuma tarefa atual envia publicações.

## Skills e custo de tokens

As skills próprias de texto, tradução/localização, produção de vídeo e economia de tokens estão em `skills/` e são carregadas quando relevantes. As skills oficiais de Remotion e a atribuição à Diretora residem também na biblioteca/banco do Paperclip; `skills/SOURCES.md` registra a origem e como reproduzi-las. RTK está instalado localmente e filtra saídas de comandos OpenCode; isso economiza parte dos tokens de entrada, não substitui a escolha do modelo nem reduz toda a conta.

## VPS e Git

Versionar código, instruções, roteiros e documentação. Não versionar chaves, senhas, tokens, cookies, banco de dados ou backups. A configuração da rotina, conexões e estado operacional do Paperclip residem no banco e precisam de backup e migração separados para a VPS. Na VPS, recriar segredos localmente, configurar Paperclip/LLMF/proxy como serviços persistentes e validar o agendador antes de liberar novas execuções.
