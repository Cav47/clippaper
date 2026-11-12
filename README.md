# Rotina em Família

Projeto editorial para adultos responsáveis por famílias, com conteúdo prático em português brasileiro sobre rotina, hábitos, estudo, telas e comunicação familiar.

## Como funciona hoje

- A Diretora de conteúdo prepara um roteiro curto por semana no Paperclip.
- Os roteiros ficam como rascunhos para revisão humana; nenhuma publicação é automática.
- O agendamento semanal da rotina está configurado para segunda-feira, às 9h (horário de Los Angeles).
- A rotina pode pesquisar fontes quando necessário e deve guardar links para afirmações factuais.
- Os arquivos `BRIEF.md`, `PILOTO-7-DIAS.md` e `SHORT-*.md` descrevem pauta, critérios e rascunhos.

## Vídeo e publicação

O fluxo atual entrega roteiro e legenda, não um arquivo de vídeo pronto. A edição/renderização do Short e a revisão final ainda precisam acontecer antes da postagem. Metricool está conectado ao Paperclip, mas a rotina semanal não agenda nem publica conteúdo.

## Privacidade e segurança

Nunca adicione chaves, senhas, cookies, tokens ou arquivos de banco de dados ao Git. Configure credenciais no gerenciador de segredos do ambiente. Exemplos de configuração podem ser guardados como `.env.example`, sempre sem valores reais.

## Preparação para VPS

Antes da migração, será preciso provisionar a VPS, instalar e validar o Paperclip, configurar domínio/TLS e armazenamento persistente, migrar o backup do banco, configurar segredos fora do Git e testar o agendador após reiniciar. Este repositório guarda os materiais e código do projeto; não contém sozinho o banco de dados, as conexões de contas nem a configuração local do Paperclip.
