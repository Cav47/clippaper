# Vídeos verticais — Remotion

Template 1080×1920 para transformar roteiros aprovados em rascunhos de Shorts/Reels com texto, ilustrações 2D animadas, narração e música sintetizada localmente. `out/SHORT-2026-11-12-ilustrado.mp4` é a edição atual de referência; continua sendo um rascunho para revisão no Paperclip, sem publicação.

## Requisitos e comandos

Node.js 22.13+; pnpm 11 exige Node.js 22 ou superior. O projeto fixa pnpm 11.25.0 e Remotion 4.0.543. Esta composição não precisa de GPU, mas a renderização usa CPU e espaço em disco. No Mac local, Node.js 22.23.5 foi instalado em `~/.local` e validado pelo SHA-256 oficial. Se o runner do Paperclip disser `node: not found`, confirme que `~/.local/bin` está no `PATH` do processo que executa o agente.

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm exec remotion render ShortVertical out/short-estudo.mp4
```

Gere a voz local com `./scripts/generate-voiceover.sh short-sono` após instalar Piper e baixar o modelo indicado em `VOICE-MODEL.md`; o argumento seleciona `voiceover/<nome>.txt` e gera `public/audio/<nome>.wav`. Gere a trilha instrumental determinística com `./.venv/bin/python scripts/generate-background-music.py short-sono`, que cria `public/audio/short-sono-bed.wav`. Renderize com `pnpm exec remotion render ShortSono out/short-sono.mp4` e pré-visualize no Studio antes de aprovar. Argumento omitido preserva o nome padrão `short-estudo`, portanto cada curta mantém seus próprios arquivos. As pastas `out/` e os WAVs gerados são ignorados pelo Git. A trilha é original e sintetizada por código, sem faixa comercial de terceiros.

Edite as propriedades `example` em `src/Root.tsx` usando um roteiro aprovado. Ajuste cenas e ilustrações em `src/Composition.tsx`; mantenha texto legível nas áreas seguras e compatível com o tempo de narração. A música fica baixa sob a voz e tem fades no começo e no fim.

## Narração e licenças

Piper TTS 1.8.0 está instalado num ambiente isolado local (`.venv/`, ignorado pelo Git); `requirements-voice.txt` registra a dependência. Para recriar o ambiente:

```sh
python3 -m venv .venv
.venv/bin/pip install -r requirements-voice.txt
```

O modelo `pt_BR-cadu-medium` é obtido separadamente; veja `VOICE-MODEL.md` e confirme o `MODEL_CARD` da cópia exata. Não versione modelos grandes, chaves ou mídias de terceiros. Este template gera ilustrações vetoriais programadas; não gera cenas fotorrealistas por IA.
