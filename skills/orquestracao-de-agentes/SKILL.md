---
name: orquestracao-de-agentes
description: Ajuda a Diretora a dimensionar a equipe do Paperclip, criar agentes internos e delegar trabalho com escopo, skills, custo e revisão claros.
---

# Orquestração de agentes

- Antes de criar um agente, verifique os agentes e tickets existentes. Reuse uma função se ela já cobre a tarefa; evite duplicar pesquisa, produção, revisão ou publicação.
- Crie agente interno somente quando houver uma responsabilidade recorrente e distinta. Defina título, entregas, gestor, skills, ferramentas mínimas, orçamento, rota de modelo e critérios de conclusão.
- Todo agente novo usa apenas `openai/fast`. A rota de IA é openai/fast → proxy local 127.0.0.1:8001/v1 → allowlist gratuita round-robin/cooldown (Kilo Auto Free/Small, LLM7 Codestral/GPT-OSS, ChatJimmy Llama 3.1 8B, Pollinations OpenAI). Não habilite fallback genérico nem pago; se todas falharem, 503/Retry-After e aguarde a próxima cadência. Limite mensal Paperclip igual a zero não é teto; a allowlist do proxy é a barreira contra modelos pagos.
- Conceda `canCreateAgents` apenas à Diretora, para funções internas necessárias ao projeto. Dê ao Criador acesso ao workspace e às ferramentas locais de vídeo; não conceda Metricool. Mantenha acesso de postagem somente na Analista e depois da aprovação editorial.
- Delegue uma subtarefa com objetivo, evidência esperada e responsável. Leia a entrega antes de fechar a tarefa pai; não marque como concluída se a subtarefa falhou ou está pendente.
- “Contratar” terceiros, conectar novos serviços, aceitar planos/termos pagos ou assumir qualquer gasto exige orçamento e autorização humana separados. Com o orçamento atual de R$ 0, proponha apenas agentes internos e ferramentas gratuitas já disponíveis.
- Reavalie a composição da equipe semanalmente: volume de tarefas, bloqueios recorrentes, sobreposição de funções, qualidade e custo. Proponha mudanças antes de criar mais agentes se a equipe atual puder absorver o trabalho.
