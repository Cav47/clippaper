---
name: publicacao-social
description: Publica somente peças aprovadas e analisa o desempenho orgânico em modo de leitura.
---

# Publicação e análise social

## Antes de publicar

- O responsável concedeu autorização geral para publicação automática em 13/11/2026; não peça aprovação humana por peça. A aprovação editorial da Revisora continua obrigatória para a versão exata do texto e do arquivo de mídia.
- Confirme no Metricool as contas e canais conectados. Use apenas contas da marca Rotina em Família e publique somente nas plataformas conectadas e identificadas no ticket. Se faltar conta, aprovação, arquivo final ou metadados, pare e registre o bloqueio.
- Para vídeo, confirme que há um `mediaId` válido do Metricool ou URL HTTPS pública e permanente aceita pela plataforma. Não use caminho local, anexo privado, URL temporária ou link que exija login. Se faltar mídia acessível, não agende sem vídeo; peça ao Criador upload suportado ou uma hospedagem aprovada.
- Após a Revisora aprovar, crie o agendamento no próximo horário recomendado disponível para a plataforma, respeitando a cadência configurada na rotina. Se a recomendação não estiver disponível, use o próximo horário válido da rotina; não publique imediatamente como fallback.
- A autorização automática não se aplica a conteúdos reprovados, versões alteradas depois da revisão, canais novos, campanhas/anúncios, mensagens, comentários ou atividades fora do projeto.
- Não altere credenciais, permissões, comentários, mensagens, anúncios ou configurações da conta. Não publique conteúdo alheio ao ticket.
- Após o horário agendado, confirme o resultado no Metricool e registre plataforma, conta, data/hora, identificador e link. Se a API não confirmar, não declare sucesso.

## TikTok — Microdramas Animados

- Use a marca Metricool `8070469`, rede TikTok `MiniDramas`, exclusivamente para Microdramas. Não publique conteúdo da Rotina em Família no TikTok nem microdramas no Instagram/YouTube da Família sem autorização específica.
- Agende auto-publicação apenas com a versão exata aprovada, vídeo HTTPS permanente validado, `autoPublish=true`, título, legenda sem quebras de linha e metadados de privacidade/audiência conferidos. Marque o indicador de conteúdo gerado por IA (`isAigc=true` ou campo equivalente) quando o vídeo for gerado ou substancialmente alterado por IA.
- Antes do envio, valide MP4/MOV, 3 s–10 min e até 500 MB para auto-publicação. Os Shorts da Rotina em Família inspecionados usam H.264 vertical 1080×1920, 30 fps e AAC estéreo 48 kHz. O arquivo do Ep. 01 que falhou no TikTok estava em 20 fps, embora tivesse áudio AAC estéreo 48 kHz; não reutilize esse export para TikTok. Exporte Microdramas em CFR 30 fps e confira áudio/legendas antes da revisão. A API do TikTok não preserva quebras de linha; use publicação manual se a peça depender de efeitos nativos ou música fora do catálogo autorizado. Use música original/licenciada e confirme os direitos.
- Mantenha o teto operacional de 10 publicações por canal em cada janela móvel de 24 h. A conexão de uma rede não significa que há conteúdo aprovado ou agendado: consulte o calendário antes de reportar.

## Análise de feeds e engajamento

- Leia apenas métricas agregadas necessárias: alcance, visualizações, curtidas, comentários, compartilhamentos, salvamentos, retenção e cliques, conforme disponíveis.
- Indique plataforma, período, fonte, métrica e denominador. Compare períodos equivalentes e separe observações de hipóteses; não atribua causalidade sem evidência.
- Nunca exponha dados pessoais de seguidores ou o conteúdo de mensagens privadas. Se houver poucos dados, diga que não há base suficiente.
- Transforme achados em até três hipóteses de conteúdo com público, formato e métrica para acompanhar.

## Custo e limites

- Use somente o modelo `openai/fast` da conexão local restrita ao roteador Kilo Auto Free. Não troque para DeepSeek, OpenAI, Cursor ou outro modelo pago; se o caminho gratuito falhar ou atingir limite, pare e relate o bloqueio.
- Respostas curtas e evidências verificáveis. Agende apenas peças elegíveis conforme as regras acima.
