# Skills do Paperclip

## Skills mantidas no projeto

Essas onze instruções estão versionadas no Git e são descobertas pelo Paperclip no workspace:

- `roteiro-social`: textos e roteiros em português brasileiro para o canal.
- `traducao-localizacao`: tradução e adaptação cultural para idioma/região de destino.
- `producao-video`: geração de rascunhos com a composição Remotion; sem publicação.
- `economia-tokens`: leitura seletiva e saídas curtas sem perder evidência ou segurança.
- `gate-de-conclusao-paperclip`: exige responsáveis corretos, subtarefas concluídas e evidência do artefato antes de fechar tarefas pai.
- `insights-de-audiencia`: análise somente leitura de métricas e hipóteses editoriais com período, fonte e limites claros.
- `pesquisa-tendencias-curtas`: atualização semanal com fontes oficiais, exemplos públicos verificáveis e hipóteses originais sem cópia.
- `publicacao-social`: publicação com autorização e revisão registradas, seguida de análise de métricas agregadas.
- `criacao-conteudo-social`: roteiros, posts e vídeos verticais originais com produção local, revisão e continuidade narrativa.
- `orquestracao-de-agentes`: desenho de equipe, delegação e criação de agentes internos com custo e permissões controlados.
- `ceo-operacao-governanca`: estratégia, triagem da fila, delegação operacional e limites de governança do CEO.

As skills locais são instruções operacionais; não instalam dependências nem ampliam permissões de integrações.

## Skills de vídeo de terceiros

Fonte oficial: [`remotion-dev/skills`](https://github.com/remotion-dev/skills), branch `main`. Skills importadas para a biblioteca da empresa Paperclip: `remotion-best-practices`, `remotion-create`, `remotion-markup`, `remotion-captions` e `remotion-render`. Versão importada: Remotion Skills `4.0.543`. Atualização automática desativada para evitar mudanças de instrução sem revisão; atualizar manualmente pela tela Skills do Paperclip.

A atribuição às agentes e fontes remotas da biblioteca ficam no banco do Paperclip; exportar/importar a empresa ao migrar para VPS. Esta lista registra a intenção versionada, não substitui essa exportação.

## Redução de saída de comandos

RTK (`rtk-ai/rtk`) já está instalado nesta máquina (`rtk 1.2.0`) e o plugin oficial OpenCode está em `~/.config/opencode/plugins/rtk.ts`. O OpenCode instalado é `1.18.34`, dentro da faixa de compatibilidade documentada. O plugin atua sobre saídas de comandos shell; não reduz tokens de toda chamada, do texto gerado ou do conteúdo do vídeo. Para a VPS, instalar RTK separadamente no usuário que executa OpenCode e ativar a integração para essa versão.

A verificação inicial do RTK registrou uma execução (`rtk git status`): economia estimada de 1 token (3,4%) nessa saída curta. Isso não mede o custo geral do agente; é apenas a linha de base da ferramenta.

## Skills externas avaliadas em 2026-11-13

Importadas como skills da empresa Paperclip, com revisões fixadas e atualização automática desativada:

- `skill-inspector` — NVIDIA/skillspector; guia de inspeção de skills. A CLI SkillSpector 2.12.0 também está instalada localmente para escaneamento estático sem chamada de LLM.
- `agent-reach` — Panniantong/Agent-Reach; CLI 1.6.1 instalada. Skill atribuída a CEO, Diretora, Pesquisador, Criador e Analista. A configuração de canais/sessões não foi inicializada; não importar cookies/sessões do Chrome nem iniciar login.
- `ponytail` — DietrichGebert/ponytail; atribuída ao CEO.
- `humanizer` — blader/humanizer; atribuída à Diretora, Criador e Revisor. A triagem encontrou alertas médios e foi feita revisão manual dos falsos positivos antes de importar.

As atribuições efetivas são registradas no banco do Paperclip; os objetos selecionados estão marcados para materialização no próximo turno do agente. O CLI da SkillSpector e o Agent Reach são instalações locais desta máquina, separadas das skills da empresa.

### Avaliadas, sem instalação

- `hallmark` (BuilderIO): rejeitada pela inspeção de segurança crítica.
- `scrapling` (D4Vinci): rejeitada pela inspeção crítica/incompleta e por exigir um coletor web com permissões de rede mais amplas que as necessárias.
- `lemo-opuscar`: não instalada; script de setup continha comando de limpeza encadeado de alto risco, é voltada ao Claude e redundante com Remotion.
- `rea` (reverse-engineer-anything): não instalada; instalador via `npx` sem pin e integração não necessária à operação atual.
- `last 30 days`: não instalada; inspeção parcial apontou leitura de `.env`/credenciais e instalação de CLIs, enquanto a empresa já tem pesquisa de tendências e Agent Reach.
- `diagram-design`: não instalada; o Paperclip bloqueou a importação ao detectar padrão de busca/execução remota em referência. Não contornar essa proteção.
- `taste-skill`, `impeccable` e `ui-ux-pro-max`: não instaladas; inspeções incompletas dos arquivos referenciados e não há agente de interface no organograma atual.
- `openviking`: não instalado; servidor de memória separado duplicaria a memória baseada em arquivos já existente.
- `ternary bonsai` e `glm-5.3-flash`: modelos, não skills; não compatíveis com o Mac Intel/rota gratuita fixada atual.
- `unsloth studio`: ambiente separado para modelos locais/treino, sem necessidade operacional e incompatível com a rota atual.
- `pizza bot`: aplicação externa de tarefas que duplicaria o Paperclip.

O Insomnia 13.4.0 foi instalado em `~/Applications/Insomnia.app` como cliente desktop de API; não é uma skill nem foi conectado a credenciais ou workspaces. Instalações locais de aplicativos/CLIs não são levadas para a VPS pelo Git.
