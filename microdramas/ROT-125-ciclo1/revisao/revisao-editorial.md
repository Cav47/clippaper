# ROT-125, revisão do vídeo (Janela Fechada)

**Arquivo analisado:** `microdramas/ROT-125-ciclo1/render/janula-fechada.mp4`  
**SHA-256:** `509654296cbfeba4d427428ac3392b395fd64b9ce2d1e8a0c3a20ea259690a81` (verificado)  
**Estado:** gate técnica/editorial aprovada para o arquivo exato; agendamento automático não concluído (ver bloqueio).

## Verificação técnica
- Vídeo: 1080×1920, H.264, CFR 30/1 fps, duração ~30.016s.
- Áudio: AAC, 48 kHz, estéreo.
- Decodificação/playback validável pelo arquivo; pico citado anteriormente -7,2 dB, sem clipping.
- Render próprio do episódio (não é o template antigo de Rotina em Família; arquivo inválido preservado como `janula-fechada.INVALID-familia-template.mp4`).

## Verificação editorial/QA
- Personagens visíveis e interação conforme cena do despachante: Lia, Seu Nilo e Cida.
- Falas/reações/ações sincronizadas com o roteiro/storyboard; composição e identidade próprias do episódio.
- Classificação 13+ compatível com o material revisado.

## Gates de publicação (autorização prévia válida do usuário)
- Canais autorizados: Instagram `cav470609`, YouTube `UCewElO68XOz1f4Gf7FWxSuA`, TikTok `MiniDramas`.
- Deduplicação/calendário/limite 10 posts por canal/24h: **não verificados via integração** (sem operações de leitura/agendamento expostas).
- Mídia pública autorizada (`media.apexgol.com.br`): host responde (HTTP 404 na raiz), mas não há evidência nesta sessão de upload/publicação do arquivo no host.

## Tentativa de agendamento Metricool
- Conexão `Metricool MCP` (`761c64dd-49ee-49b2-8b89-5a389a40dfcc`): estado **ready** (connections_search/connection_request).
- **Falha/bloqueio:** o runtime/conector não expõe operações/ferramentas de postagem, listagem de calendário ou agendamento (search_api não retornou operações Metricool; consistente com ROT-106). Não foi possível checar deduplicação/limite nem criar agendamentos.
- **Ação:** nenhum post/agendamento criado, sem retries demorados. Conteúdo mantido como **rascunho**.

## Rota/custo
- Rota: `openai/fast` via proxy local 127.0.0.1:8001/v1 (allowlist gratuita), sem fallback pago.
- Tempos de resposta e medição de tokens/custo: não expostos pelo runtime desta sessão; custo de rota pago não utilizado.
