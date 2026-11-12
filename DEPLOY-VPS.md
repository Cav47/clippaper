# Preparação da VPS — Rotina em Família

Este documento prepara a migração; não provisiona servidor nem transfere o Paperclip. A instância atual continua no Mac.

## Estado conhecido

- Repositório: [`Cav47/clippaper`](https://github.com/Cav47/clippaper), branch `main` (público).
- Paperclip local verificado em `2026.1106.0`; os dados operacionais vivem fora deste repositório.
- O agente usa `openai/fast` por meio do proxy Node local em `127.0.0.1:8001`, que encaminha para LLMF em `127.0.0.1:8000`.
- O projeto já tem rascunhos editoriais; ainda não tem pipeline de vídeo nem publicação automática.
- A chave `.llmf-api-key` é local e ignorada pelo Git. Nunca copiar segredos, banco, exportações ou backups para este repositório público.

## Decisões antes de contratar/configurar

1. Escolher VPS Linux, domínio e orçamento. As instruções oficiais atuais usam Ubuntu LTS e sugerem 1 vCPU/2 GB como ponto de partida; produção com agente, banco, proxy e arquivos pode precisar de mais recursos.
2. Escolher o acesso: Paperclip autenticado com URL pública e HTTPS, ou autenticado em rede privada via VPN/Tailscale. Não expor a instância `local_trusted` na internet.
3. Confirmar como o modelo funcionará no Linux. O LLMF atual está no Mac. Antes de migrar, comprovar que existe uma instalação Linux do LLMF que possa ficar como serviço; se não existir, escolher um endpoint compatível com OpenAI e chamadas de ferramentas. Não presumir que o aplicativo desktop FreeLLMAPI possa ser instalado ou executado na VPS.
4. Escolher banco e armazenamento persistente. Para implantação durável, planejar PostgreSQL persistente/gerenciado e cópias externas do banco e dos arquivos.
5. Decidir se a VPS só fará pull do repositório público ou também enviará alterações. Pull público não requer credencial; push requer chave SSH restrita ou token de escrita guardado fora do Git.

## Arquitetura prevista

```text
Internet → domínio + HTTPS → proxy reverso → Paperclip autenticado
                                            ├─ PostgreSQL persistente
                                            ├─ armazenamento persistente de anexos
                                            ├─ workspace Git clonado em disco persistente
                                            └─ proxy LLMF (127.0.0.1:8001)
                                                   └─ provedor de modelo (127.0.0.1:8000 ou API escolhida)
```

Manter Paperclip, proxy de modelo e serviço de modelo na mesma máquina/rede privada, se o modelo exigir o endpoint local. Não abrir as portas `3100`, `8000` ou `8001` para a internet. A configuração do agente deve usar o proxy por loopback quando ambos estiverem no mesmo host.

## Migração da empresa

Usar o fluxo de exportação/importação de empresa suportado pelo Paperclip para levar empresa, agentes, projetos, tarefas, rotinas, anexos e configurações portáveis. Revisar a exportação antes de transferir e guardá-la em local privado; ela não pertence ao repositório público.

A exportação de empresa não substitui um backup completo da instância. Para recuperação exata da instância, preservar separadamente o banco e o diretório de dados, incluindo o arquivo mestre de criptografia configurado pelo Paperclip. Proteger essa cópia como credencial de alto valor; sem a chave correspondente, segredos criptografados não podem ser recuperados. Manter também cópias persistentes dos arquivos de agentes e anexos.

Após importar na VPS:

- conferir empresa, agentes, projetos, tickets, anexos, rotinas, fuso e próximo horário;
- recriar ou reconectar credenciais na tela de segredos/conexões do Paperclip; não presumir que OAuth, Metricool, GitHub ou tokens do provedor sejam portáveis;
- clonar `main` em um diretório persistente e atualizar o workspace do projeto para esse caminho Linux. O caminho atual do Mac não existe na VPS;
- validar as instruções e o modelo do agente, sem deixar URLs `localhost` apontando para serviços que não existem no host;
- manter a rotina pausada até login, conexão do modelo, workspace, backup e anexo terem sido verificados.

## Sequência de implantação

1. Provisionar Linux atualizado, usuário de serviço sem privilégios, SSH por chave e firewall restrito.
2. Configurar domínio e DNS; instalar Paperclip na versão escolhida, modo de implantação autenticado, HTTPS e banco/armazenamento persistentes.
3. Criar login administrativo e confirmar que a porta do Paperclip só é alcançada por HTTPS/proxy reverso ou VPN.
4. Instalar o modelo/proxy como serviços persistentes, com restart automático. Gerar uma nova chave local para o LLMF na VPS, permissões restritas e referência via arquivo/segredos. Não reutilizar nem versionar `.llmf-api-key` do Mac.
5. Clonar o repositório, importar a empresa e apontar o workspace para o clone persistente.
6. Reconectar os serviços e credenciais necessários diretamente no Paperclip. Nunca colocar tokens em arquivos versionados, logs ou comandos salvos no histórico.
7. Rodar o diagnóstico oficial do Paperclip, confirmar `/api/health`, login, backup recente, acesso ao workspace e chamada de ferramenta do agente.
8. Fazer uma execução controlada que crie um roteiro, leia-o de volta e anexe-o ao ticket. Confirmar que nenhum post foi enviado.
9. Reiniciar Paperclip e serviços do modelo; conferir que dados, anexos, agente, rotinas e conexões continuam disponíveis. Só então habilitar o agendador.

## Pronto para operar quando

- Paperclip exige autenticação e HTTPS; portas internas não estão expostas.
- Banco, anexos, arquivos persistentes e chave de criptografia têm backup recuperável fora do Git.
- O modelo responde com chamadas de ferramenta após reinício do serviço.
- O workspace aponta para o clone persistente de `main`; alterações editoriais são commitadas e sincronizadas.
- Importação preservou tickets e rotina; o teste controlado foi anexado como rascunho.
- Conexões que precisam de reautorização estão saudáveis. Nenhuma publicação automática foi ligada.

## Referências oficiais

- [Instalação e configuração de servidor/VPS](https://docs.paperclip.ing/guides/getting-started/installation/)
- [Modos de implantação](https://docs.paperclip.ing/reference/deploy/deployment-modes/)
- [Banco de dados e limites dos backups](https://docs.paperclip.ing/reference/deploy/database/)
- [Segredos e chave mestre](https://docs.paperclip.ing/reference/deploy/secrets/)
- [Exportação/importação de empresa](https://docs.paperclip.ing/guides/power/export-import/)
- [Implantação VPS e persistência](https://docs.paperclip.ing/how-to/deploy-to-vps-or-fly/)
