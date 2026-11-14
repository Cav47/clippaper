---
name: economia-tokens
description: Reduz leituras, saídas de ferramentas e respostas desnecessárias sem omitir evidências, fatos ou requisitos de segurança.
---

# Economia de tokens no Paperclip

Use em tarefas com logs, históricos, listas ou arquivos longos.

- Comece pelo pedido e identifique a evidência mínima necessária. Leia arquivos específicos e intervalos relevantes; evite varrer o workspace inteiro.
- Use `rg` com termos precisos e limite a saída. Para estado, prefira campos resumidos em vez de JSON integral.
- Se `rtk` estiver disponível, deixe o plugin OpenCode comprimir saídas de comandos suportados; use a saída completa quando ela for necessária para validar uma decisão.
- Resuma para uso interno sem perder IDs, erros, números, citações ou próximos passos verificáveis. Não comprima o conteúdo final solicitado nem dados de segurança.
- Faça chamadas independentes em lote quando possível; não repita uma chamada que falhou com os mesmos dados.
- Faça uma resposta final concisa. Não omita alertas, bloqueios ou aprovação humana para economizar tokens.

## Rotação de IA gratuita no Paperclip

- Agentes usam `openai/fast`; não mude o modelo por agente. O proxy local em `127.0.0.1:8001/v1` já faz rotação round-robin entre Kilo Auto Free/Small, LLM7 Codestral/GPT-OSS, ChatJimmy Llama 3.1 8B e Pollinations OpenAI.
- O proxy aplica cooldown após limite/erro e retorna 503 + Retry-After quando nenhuma rota livre está disponível. Não acione fallback genérico, modelo pago ou conta com cobrança.
- Se uma execução parar, registre rota/status sem prompt ou chave, preserve o ticket bloqueado e deixe a próxima cadência tentar uma execução nova. Nunca reabra automaticamente um ticket antigo bloqueado.
