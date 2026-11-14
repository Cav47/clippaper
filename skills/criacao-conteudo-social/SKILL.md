---
name: criacao-conteudo-social
description: Produz roteiros, posts curtos e vídeos verticais originais para Rotina em Família, mantendo a continuidade das histórias e a qualidade visual e sonora.
---

# Criação de conteúdo social

- Antes de criar, leia o brief, os roteiros existentes e `SERIE-MARA-THEO-CINCO-MINUTOS.md`. Preserve personagens, linha narrativa, tom, paleta e acontecimentos já publicados; cada peça também precisa fazer sentido para quem chega pela primeira vez.
- Use `pesquisa-tendencias-curtas` na atualização semanal e `roteiro-social` para adaptar o texto à plataforma. Pesquise fatos em fontes primárias e mantenha fontes/URLs junto do rascunho. Não copie fala, roteiro, áudio, edição, personagem ou identidade visual de outros criadores.
- Para vídeos, aplique as skills oficiais `remotion-best-practices`, `remotion-markup`, `remotion-captions` e `remotion-render`; produza vertical 1080×1920, com gancho imediato, uma mini-história, uma ação útil, texto legível e CTA gentil.
- Reaproveite a composição Remotion local e os assets vetoriais próprios. Narração pode ser gerada localmente pelo Piper com a voz licenciada no `video/VOICE-MODEL.md`; música pode ser sintetizada localmente. Confira licença de cada modelo/asset e misture a música abaixo da voz.
- Prefira ferramentas locais sem cobrança por chamada: Remotion do projeto, Piper local e scripts existentes. Não use geração externa de imagens/vídeos/voz, planos pagos, créditos Canva/Runway/fal, APIs pagas ou faixas comerciais. Se a ferramenta local falhar, bloqueie o item e relate a dependência; não troque por serviço tarifado.
- Crie exatamente os arquivos pedidos pelo ticket, em diretórios do workspace. Releia o roteiro, confira o MP4 renderizado, duração, áudio presente, sincronização, cortes, legibilidade no formato móvel e legenda/arquivo correspondentes. Não declare um arquivo pronto sem confirmar que existe e abrir a versão renderizada.
- Entregue o roteiro, a legenda, a fonte das imagens/áudio quando aplicável e o MP4 no ticket Paperclip. Encaminhe a versão final à Revisora. Se houver alteração após a revisão, peça revisão da nova versão antes de liberar para publicação.
- Para cada vídeo, entregue também um link HTTPS público permanente ou um `mediaId` do Metricool. Prefira upload direto pelo Metricool quando a conexão autorizada aceitar o arquivo; se precisar de URL, use apenas armazenamento durável já conectado e aprovado. Teste que o link abre o arquivo correto e registre URL, nome e tamanho no ticket.
- Caminhos locais, anexos privados do Paperclip e links temporários não são URLs públicas. Não use hospedagem anônima, não publique em Git nem torne Drive/pastas públicas. Se faltar destino autorizado, mantenha o arquivo anexado e bloqueie publicação com a dependência explícita; nunca fabrique URL.
- Você cria e finaliza peças; não agenda nem publica. Depois da revisão editorial aprovar o arquivo e legenda exatos, entregue à Diretora e à Analista para publicação automática conforme a skill `publicacao-social`.
- Use somente `openai/fast` por meio do proxy Paperclip. A rota de IA é openai/fast → proxy local 127.0.0.1:8001/v1 → allowlist gratuita round-robin/cooldown (Kilo Auto Free/Small, LLM7 Codestral/GPT-OSS, ChatJimmy Llama 3.1 8B, Pollinations OpenAI). Não habilite fallback genérico nem pago; se todas falharem, 503/Retry-After e aguarde a próxima cadência.


## Padrão adicional de acabamento e aprendizado

Antes de entregar ao Revisor, aplique `qualidade-video-curto`: avalie gancho, encenação dos personagens, continuidade, clareza visual em celular, voz/música, sincronismo e o MP4 final reproduzido. Para cada publicação confirmada, entregue ao Analista os indicadores e a fonte necessários para leitura comparável em 24h e 7d. Não altere o gate de revisão/publicação nem use métrica isolada como promessa de alcance.
