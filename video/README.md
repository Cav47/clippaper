# Vídeos verticais — Remotion

Template 1080×1920 para transformar roteiros aprovados em rascunhos de Shorts/Reels com texto animado e legendas. O exemplo usa `SHORT-SEMANA-2026-11-12.md`. Primeiro preview MP4 renderizado localmente em `out/SHORT-2026-11-12-preview.mp4` (pasta ignorada pelo Git) e conferido no começo, meio e fim. É um rascunho tipográfico silencioso: não tem narração, imagens de cena ou música e ainda precisa de revisão editorial antes de qualquer uso.

## Requisitos e comandos

Node.js 20.19+, 22.13+ ou 24+; o projeto fixa pnpm 11.25.0 e Remotion 4.0.543. Esta composição não precisa de GPU, mas a renderização usa CPU e espaço em disco.

```sh
pnpm install
pnpm dev
pnpm exec remotion render ShortVertical out/short-estudo.mp4
```

Pré-visualize o resultado no Studio antes de aprová-lo. A pasta `out/` é ignorada pelo Git. A CLI Remotion inclui comandos `ffmpeg` e `ffprobe` para processar e inspecionar mídia; nenhum binário independente foi adicionado ao repositório.

Edite as propriedades `example` em `src/Root.tsx` usando um roteiro aprovado. Ajuste duração e cenas em `src/Composition.tsx`; mantenha texto legível nas áreas seguras e compatível com o tempo de narração.

## Narração e licenças

Piper TTS 1.8.0 está instalado num ambiente isolado local (`.venv/`, ignorado pelo Git); `requirements-voice.txt` registra a dependência. Para recriar o ambiente:

```sh
python3 -m venv .venv
.venv/bin/pip install -r requirements-voice.txt
```

Nenhum modelo de voz foi baixado: confirme a licença do `MODEL_CARD` da cópia exata antes de usá-la. Não versione modelos, áudio, chaves ou mídias de terceiros. Este template gera elementos gráficos programados; não gera cenas fotorrealistas por IA.
