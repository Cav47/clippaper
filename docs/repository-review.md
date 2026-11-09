# Revisão dos repositórios e skills

## Day Trader

O upstream contém 11 skills para descoberta de ações, notícias, análise financeira, entradas/saídas, dimensionamento e limites de risco. Os scripts Python usam endpoints públicos de dados de mercado/filings e escrevem arquivos locais sob `trader/`. Dados gratuitos podem atrasar ou falhar. A descrição upstream apresenta as ferramentas como educacionais, não aconselhamento financeiro.

As cópias em `.agents/skills/trader-*` são as versões adaptadas para Codex. As descrições foram encurtadas para reduzir metadados de contexto. A invocação implícita está desabilitada. `trader-broker` foi limitado a tickets e logs locais; não conecta a corretora e não submete, cancela ou altera ordens. Nenhuma chave de corretora é necessária ou permitida por esse fluxo.

## Grill Me

`grill-me` encaminha para a skill de apoio `grilling`, que faz perguntas estruturadas em rodadas. Ambas estão disponíveis como skills locais do projeto.

## Code Review Graph

Ferramenta MCP local para construir contexto/grafo do repositório. A instalação upstream pode modificar configurações de agentes, hooks e regras. O submódulo é somente referência: não executei instaladores nem ativei sua integração. O projeto declara Python 3.10+.

## Ponytail

Conjunto de instruções/skills para agentes com hooks de ciclo de vida. O processo de instalação pede confiança explícita nos hooks. O submódulo não é ativado; não copiamos regras globais e não registramos hooks.

## Segurança e verificação

- As revisões estão fixadas no arquivo `external/README.md`.
- Nenhum instalador, hook, servidor MCP, teste ou comando dos projetos externos foi executado durante a análise estática.
- Não inclua credenciais em arquivos versionados. Configure chaves de API no gestor de segredos da aplicação local.
- Os scripts financeiros só devem ser chamados explicitamente e seus resultados são informativos; eles não escolhem ações pelo usuário.
