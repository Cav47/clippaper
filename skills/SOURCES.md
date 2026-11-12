# Skills do Paperclip

## Skills mantidas no projeto

Essas quatro instruções estão versionadas no Git e são descobertas pelo Paperclip no workspace:

- `roteiro-social`: textos e roteiros em português brasileiro para o canal.
- `traducao-localizacao`: tradução e adaptação cultural para idioma/região de destino.
- `producao-video`: geração de rascunhos com a composição Remotion; sem publicação.
- `economia-tokens`: leitura seletiva e saídas curtas sem perder evidência ou segurança.

## Skills de vídeo de terceiros

Fonte oficial: [`remotion-dev/skills`](https://github.com/remotion-dev/skills), branch `main`. Skills importadas para a biblioteca da empresa Paperclip: `remotion-best-practices`, `remotion-create`, `remotion-markup`, `remotion-captions` e `remotion-render`. Versão importada: Remotion Skills `4.0.543`. Atualização automática desativada para evitar mudanças de instrução sem revisão; atualizar manualmente pela tela Skills do Paperclip.

A atribuição às agentes e fontes remotas da biblioteca ficam no banco do Paperclip; exportar/importar a empresa ao migrar para VPS. Esta lista registra a intenção versionada, não substitui essa exportação.

## Redução de saída de comandos

RTK (`rtk-ai/rtk`) já está instalado nesta máquina (`rtk 1.2.0`) e o plugin oficial OpenCode está em `~/.config/opencode/plugins/rtk.ts`. O OpenCode instalado é `1.18.34`, dentro da faixa de compatibilidade documentada. O plugin atua sobre saídas de comandos shell; não reduz tokens de toda chamada, do texto gerado ou do conteúdo do vídeo. Para a VPS, instalar RTK separadamente no usuário que executa OpenCode e ativar a integração para essa versão.

A verificação inicial do RTK registrou uma execução (`rtk git status`): economia estimada de 1 token (3,4%) nessa saída curta. Isso não mede o custo geral do agente; é apenas a linha de base da ferramenta.
