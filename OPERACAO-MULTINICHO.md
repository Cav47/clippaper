# Operação de dois nichos no Paperclip

## Organização e fila

Os dois nichos rodam na organização **Rotina em Família** (`e2ad4eb9-65c1-4ce1-9c9e-38c14c56caef`). O piloto duplicado **Microdramas Animados** (`80f16ecf-54f8-4b29-89cf-d75f8d522ee6`) fica pausado, com projeto planejado e rotina desativada; não usar essa cópia.

A produção alterna a cada 30 minutos, em `America/Sao_Paulo`:

| Horário | Nicho | Projeto | CEO |
|---|---|---|---|
| minuto `:00` de cada hora | Rotina em Família | `06da83ac-d46f-4d36-bd0b-b3991d0a004b` | CEO — Rotina em Família |
| minuto `:30` de cada hora | Microdramas Animados | `1a61acff-600b-44a4-be63-609852269c94` | CEO — Microdramas Animados |

As rotinas usam uma fila serializada. A Diretora de Conteúdo e Fila Compartilhada recebe os ciclos e verifica se há pesquisa, roteiro, criação, renderização ou revisão ativa em qualquer dos projetos. Se houver, espera a conclusão antes de iniciar o outro nicho. Cada agente tem no máximo uma execução concorrente. Não criar ciclos duplicados nem repetir tarefas bloqueadas.

## Equipes

**Rotina em Família:** CEO — Rotina em Família; Diretora de Conteúdo e Fila Compartilhada; Pesquisador de Pautas; Criador de Conteúdo; Revisor de Conteúdo; Analista de Redes.

**Microdramas Animados:** CEO — Microdramas Animados (`841b1ae2-6c0c-4116-9a95-e6923502bb38`); Diretora de Microdramas (`b360589a-e8f8-4bdd-9894-217abfaee112`); Pesquisador de Microdramas (`ba43d50b-dea2-4a22-9781-f2a068f8ed33`); Criador de Animação (`014febc9-0987-43d4-b5dd-b9ef8f31f2f9`); Revisor Editorial de Microdramas (`3448362d-4865-48f5-843e-26d4ca7fdfa0`); Analista de Microdramas (`f30a3176-cbe0-4a70-8388-23f99fcc4688`).

Os agentes de cada equipe compartilham a conexão de IA gratuita já autorizada na organização: modelo `openai/fast` via `kilo-gateway/kilo-auto/free`. Sem fallback pago; em falta de cota, pausar o ciclo afetado.

## Canais, aprovação e teto

Somente Rotina em Família usa a conexão Metricool instalada: marca `8070469`, Instagram `cav470609`, YouTube `UCewElO68XOz1f4Gf7FWxSuA`. Microdramas Animados não tem canais próprios e deve manter todas as peças como rascunho; não usar nem agendar nas contas de Rotina em Família.

A publicação de Rotina em Família só ocorre depois da aprovação editorial da versão exata, validação da mídia durável e conferência do calendário/limite de 10 por canal em 24 horas. A cadência é de **produção** a cada 30 minutos; microdramas permanecem rascunhos até ter canais próprios.

## Proteção do nicho de microdramas

Produzir conteúdo infantil/familiar original. Definir a faixa etária por série e aplicar corretamente Made for Kids quando o conteúdo for dirigido a crianças, inclusive audiência mista quando aplicável. O CEO e a Diretora mantêm conhecimento dos padrões oficiais de segurança e qualidade do YouTube e das proteções 13+ do Instagram. Isso orienta conformidade, não garante imunidade a revisão/remover nem permite contornar moderação.
