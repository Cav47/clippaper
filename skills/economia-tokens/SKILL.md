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
