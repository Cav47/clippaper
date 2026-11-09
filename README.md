# clippaper

Repositório de skills Codex e referências de código instaladas/avaliadas para este workspace.

## Skills Codex

As 13 skills em `.agents/skills/` ficam disponíveis ao abrir este repositório no Codex. Para reduzir contexto e manter ações explícitas, as skills financeiras não são invocadas automaticamente. Use `$trader-scanner`, `$trader-news`, `$trader-entry` ou outra skill quando necessário. O `trader-broker` deste pacote só prepara e registra tickets locais; ele não conecta a corretoras nem envia ordens.

Os scripts do Day Trader podem escrever dados de mercado e estado em `trader/`; essa pasta fica fora do Git. Consulte `docs/repository-review.md` antes de ativar integrações externas.

## Repositórios de referência

Os projetos upstream ficam como submódulos em `external/`. Para carregá-los após clonar este repositório:

```sh
git submodule update --init --recursive
```

Nenhum hook ou servidor de terceiros é ativado automaticamente.

## Credenciais

Não salve chaves de API neste repositório. Configure credenciais no gestor de segredos do serviço que as utiliza; mantenha arquivos `.env` locais fora do Git.
