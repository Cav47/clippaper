# Resolução do agendamento — ROT-30 / Short Pauta A (sono)

## Estado
**Resolvido.** A mídia foi hospedada e importada pelo Metricool; os dois posts foram agendados com publicação automática. Na última verificação, ambos estavam `PENDING`; ainda não estavam publicados.

## Conteúdo e mídia aprovados
- Revisão editorial exata: ROT-28 (concluída/aprovada).
- MP4: `video/out/SHORT-2026-11-13-sono.mp4` (30 s, 1080×1920, H.264+AAC).
- SHA-256 verificado: `103e8caa7597b0b04d995025ec56ad2c72f709afd6c30b96641863bbf9dc6436`.
- Legenda agendada: a versão aprovada na ROT-28, sem alterações.

## Hospedagem
Foi criado um GitHub Release público, no repositório `Cav47/clippaper`, para fornecer a URL HTTPS permanente solicitada:

- Release: https://github.com/Cav47/clippaper/releases/tag/media-short-sono-rot28-2026-11-13
- Arquivo: https://github.com/Cav47/clippaper/releases/download/media-short-sono-rot28-2026-11-13/SHORT-2026-11-13-sono.mp4

O Metricool importou e hospedou cópias da mídia. As URLs retornadas foram `https://static.metricool.com/planner/202611/8070469-file-16903012559689728933.mp4` (Instagram) e `https://static.metricool.com/planner/202611/8070469-file-17429988090800506008.mp4` (YouTube).

## Agendamentos confirmados
Marca `8070469`, fuso `America/Los_Angeles`; canais confirmados: Instagram `cav470609` e YouTube `UCewElO68XOz1f4Gf7FWxSuA`.

- **Instagram Reels:** 14/11/2026 às 10:00 PT; ID Metricool `427200213`; `autoPublish=true`; estado `PENDING`. [Abrir no Planner](https://app.metricool.com/planner/calendar?blogId=8070469&openWithPostUuid=5372553215686232996)
- **YouTube Short:** 14/11/2026 às 16:00 PT; ID Metricool `427200528`; `autoPublish=true`; estado `PENDING`. [Abrir no Planner](https://app.metricool.com/planner/calendar?blogId=8070469&openWithPostUuid=-8592290434060629229)

Os horários foram escolhidos usando `getBestTimeToPostByNetwork` para cada rede. Uma consulta posterior de `getScheduledPosts` confirmou cada conta, horário, status e mídia hospedada pelo Metricool. Nenhum conteúdo foi publicado durante a resolução.

## Correção sobre o erro 403
O `403 Board access required` afetava somente os endpoints de descoberta `aggregator/apps` e `composio/apps`. A conexão Metricool estava ativa; as ferramentas diretas de leitura e agendamento funcionaram.
