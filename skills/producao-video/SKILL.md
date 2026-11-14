---
name: producao-video-remotion
description: Converte roteiro aprovado em rascunho de vídeo vertical com Remotion, legendas e ferramentas locais, sem APIs pagas nem publicação automática.
---

# Produção de vídeo vertical

Use quando houver um roteiro aprovado para transformar em Short/Reel.

## Fluxo

1. Leia apenas o roteiro aprovado, o guia visual do canal e as instruções de `video/`.
2. Use Remotion e a composição reutilizável do projeto para criar vídeo vertical 9:16. Prefira texto, animações tipográficas, formas e ilustrações originais; use mídias externas só com licença verificada.
3. Gere narração com Piper local somente se o modelo de voz e sua licença estiverem identificados e aprovados. A licença do motor não cobre automaticamente cada modelo de voz.
4. Sincronize legendas legíveis com a narração; confira ortografia, ritmo, safe areas e volume. Não acrescente música sem origem/licença documentada.
5. Valide roteiro/legendas e renderize uma prévia leve antes do MP4 final. Confira duração, proporção vertical, faixa de áudio, legibilidade nas safe areas e sincronização; inspecione quadros do começo, meio e fim. Depois do render, confirme que o arquivo abre e corresponde ao roteiro aprovado. Registre os resultados observáveis; não declare verificações que não executou.
6. Renderize o MP4 no workspace, anexe-o como rascunho ao ticket e aguarde revisão humana. Não envie a Metricool, YouTube, Instagram ou outra rede.

## Limites de custo

- Não chame geração de vídeo, imagem ou voz hospedada/paga sem autorização explícita.
- O render local evita cobrança por render, mas consome CPU, disco e tokens do agente.
- Use somente o trecho e os assets necessários; não leia históricos nem bibliotecas de mídia inteiras.

## Fluxo reproduzível

- Prefira decisões de edição, legendas e configurações que possam ser inspecionadas e repetidas em vez de refazer um pipeline exclusivo por peça. Mantenha originais separados de prévias e exports. Essa prática é inspirada em projetos locais como [Cutroom](https://github.com/HarshyChoc/cutroom), sem adicionar dependência ao runtime Remotion existente.
- A [ffmpeg-skill](https://github.com/kajisho5/ffmpeg-skill) demonstra verificações locais com resultados estruturados; use-a como referência de QA. Ela não está instalada como ferramenta neste projeto — não alegue executar suas ferramentas MCP.
- Não instale ferramentas de vídeo por tendência. Antes de sugerir uma instalação, confirme compatibilidade com Linux/VPS, espaço em disco, uso de CPU/RAM, licença, custo e se ela resolve uma falha real que Remotion/Piper não cobre.
