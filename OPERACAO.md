# Operação e publicação

## Até domingo

A rotina da Diretora está habilitada diariamente às 9h no fuso America/Sao_Paulo até domingo. No domingo, restaurar o gatilho para segunda-feira às 9h em America/Los_Angeles, evitando execuções diárias durante a viagem. A configuração efetiva fica no banco do Paperclip; este arquivo registra o procedimento e não substitui backup/migração desse banco.

## Entrega atual

A Diretora delega produção ao agente Criador de Conteúdo, que salva roteiro, legenda e mídia no workspace. Cada peça deve passar pela Revisora antes da publicação. O responsável autorizou publicação automática depois da aprovação editorial da versão exata, sem nova aprovação humana por peça. A primeira edição ilustrada e narrada está em ROT-24 como referência; não publicar até que a Revisora aprove essa edição exata. Nenhum conteúdo foi publicado.

## Como os Shorts e posts serão publicados

1. Pesquisar pauta e continuidade; o agente Criador produz roteiro, legenda e vídeo/post no workspace.
2. A Revisora aprova ou bloqueia o texto e o arquivo exatos. Qualquer alteração posterior exige revisão da versão atualizada.
3. Para cada vídeo, o Criador também entrega URL HTTPS pública permanente ou `mediaId` Metricool e registra no ticket. Use upload direto suportado pelo Metricool ou armazenamento durável já conectado e aprovado. Se nenhum estiver disponível, anexe o MP4 e bloqueie o agendamento; não use links locais, temporários ou permissões públicas improvisadas.
4. Depois da aprovação e com mídia acessível, a Analista confirma no Metricool as contas conectadas da marca e cria o agendamento no próximo horário recomendado e dentro da cadência da rotina. Não pede aprovação humana individual novamente.
5. Verificar o calendário do Metricool e, após o horário, confirmar a publicação na plataforma; registrar conta, horário, identificador e link. Se a API não confirmar, reportar bloqueio, não declarar sucesso.

A primeira edição está no ROT-24 e a revisão anterior do ROT-22 não cobre a versão ilustrada anexada ao ROT-24. Não publicar a versão antiga. O ROT-21 só pode prosseguir quando a Revisora tiver aprovado a edição ilustrada atual e Metricool confirmar o canal conectado.

Ainda não há hospedagem pública permanente conectada ao projeto, e o anexo local não é uma URL utilizável pelo Metricool. Para liberar esse passo, conecte uma hospedagem durável autorizada para os MP4s ou habilite upload de mídia do Metricool pela integração atual.

## Skills e custo de tokens

As skills próprias de texto, tradução/localização, produção de vídeo e economia de tokens estão em `skills/` e são carregadas quando relevantes. As skills oficiais de Remotion e a atribuição à Diretora residem também na biblioteca/banco do Paperclip; `skills/SOURCES.md` registra a origem e como reproduzi-las. RTK está instalado localmente e filtra saídas de comandos OpenCode; isso economiza parte dos tokens de entrada, não substitui a escolha do modelo nem reduz toda a conta.

## Meta, orçamento e gate operacional

A meta da empresa no Paperclip é R$ 10.000 de MRR até 30/06/2027, vinculada ao projeto Canal e Conteúdo Web. Acompanhar receita recorrente efetivamente recebida, clientes pagantes, churn e fontes; não contar visualizações, projeções ou receita pontual como MRR. O orçamento autorizado de IA é R$ 0/mês. Como `budgetMonthlyCents: 0` no Paperclip desativa o limite, o proxy local aceita apenas `openai/fast` e o encaminha para `kilo-gateway/kilo-auto/free`, sem fallback pago. Se a cota grátis estiver indisponível, os tickets devem parar. As conexões pagas permanecem configuradas para uso futuro somente depois da autorização de créditos. A equipe foi reativada nessa rota gratuita.

Foram adicionadas as skills `gate-de-conclusao-paperclip` (delegação e evidência antes de concluir tarefas), `insights-de-audiencia` (leitura de métricas e hipóteses) e `publicacao-social` (publicação após aprovação e análise de métricas agregadas). Skills e meta estão no banco local Paperclip e devem ser exportadas junto com a empresa ao migrar para VPS.

## VPS e Git

Versionar código, instruções, roteiros e documentação. Não versionar chaves, senhas, tokens, cookies, banco de dados ou backups. A configuração da rotina, conexões, meta, skills instaladas e estado operacional do Paperclip residem no banco e precisam de backup/exportação e migração separados para a VPS. Na VPS, recriar segredos localmente, configurar Paperclip/LLMF/proxy como serviços persistentes e validar o agendador antes de liberar novas execuções. O repositório local já está vinculado a `Cav47/clippaper`, mas a autenticação GitHub não está disponível nesta sessão; por isso, commits locais ainda precisam ser enviados quando a autenticação for resolvida.
