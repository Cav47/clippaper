# Rotina em Família

Projeto editorial para adultos responsáveis por famílias, com conteúdo prático em português brasileiro sobre rotina, hábitos, estudo, telas e comunicação familiar.

## Como funciona hoje

- Até domingo, a Diretora de conteúdo prepara um rascunho por dia às 9h (horário de Los Angeles); no domingo, o agendamento volta a ser semanal.
- Os roteiros ficam como rascunhos para revisão humana; nenhuma publicação é automática.
- Após o período de validação, a rotina fica agendada para segunda-feira, às 9h (horário de Los Angeles).
- A rotina pode pesquisar fontes quando necessário e deve guardar links para afirmações factuais.
- A Diretora usa o modelo Paperclip `openai/fast`; o proxy local o encaminha ao alias LLMF `best`, que mantém a seleção e o fallback de provedores.
- Os arquivos `BRIEF.md`, `PILOTO-7-DIAS.md` e `SHORT-*.md` descrevem pauta, critérios e rascunhos.
- Skills próprias ficam em `skills/`; as fontes oficiais e atribuições estão em `skills/SOURCES.md`.

## Vídeo e publicação

O projeto agora inclui um template Remotion vertical 1080×1920 e skills de roteiro, vídeo, tradução/localização e economia de tokens. O Piper TTS 1.8.0 está num ambiente Python local ignorado pelo Git; nenhum modelo de voz foi baixado e nenhum MP4 foi renderizado ainda. Metricool está conectado, mas nenhuma rotina agenda ou publica conteúdo.

## Privacidade e segurança

Nunca adicione chaves, senhas, cookies, tokens ou arquivos de banco de dados ao Git. Configure credenciais no gerenciador de segredos do ambiente. O arquivo local `.llmf-api-key` é gerado no próprio ambiente, tem permissão restrita e é ignorado pelo Git; nunca copie esse valor para este repositório. Exemplos de configuração podem ser guardados como `.env.example`, sempre sem valores reais.

## Preparação para VPS

O plano de migração, decisões pendentes, transferência da empresa, segurança e critérios de prontidão estão em [DEPLOY-VPS.md](DEPLOY-VPS.md). Antes da migração, será preciso provisionar a VPS, configurar domínio/TLS e armazenamento persistente, migrar os dados e testar o agendador após reiniciar. Este repositório guarda os materiais, instruções e código do projeto; não contém sozinho o banco de dados, as conexões de contas nem as chaves locais do Paperclip/LLMF. Na VPS, recrie `.llmf-api-key`, inicie o LLMF com `--api-keys-file` apontando para esse arquivo e execute `llmf-model-proxy.mjs` como serviço local antes de habilitar o agendador.
