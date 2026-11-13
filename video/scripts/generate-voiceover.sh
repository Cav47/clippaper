#!/usr/bin/env bash
set -euo pipefail

video_dir="$(cd -- "$(dirname -- "$0")/.." && pwd)"
asset_name="${1:-short-estudo}"
if [[ ! "$asset_name" =~ ^[A-Za-z0-9_-]+$ ]]; then
  echo "Use somente letras, números, hífen e sublinhado no nome do áudio." >&2
  exit 2
fi
model="$video_dir/voice-models/pt_BR-cadu-medium.onnx"
config="$model.json"
output="$video_dir/public/audio/$asset_name.wav"
script="$video_dir/voiceover/$asset_name.txt"
piper="$video_dir/.venv/bin/piper"

if [[ ! -x "$piper" ]]; then
  echo "Piper não está instalado. Recrie video/.venv com requirements-voice.txt." >&2
  exit 1
fi
if [[ ! -f "$model" || ! -f "$config" ]]; then
  echo "Baixe a voz pt_BR-cadu-medium conforme video/VOICE-MODEL.md." >&2
  exit 1
fi

mkdir -p "$(dirname -- "$output")"
"$piper" -m "$model" -c "$config" -i "$script" -f "$output" --sentence-silence 0.35
echo "Narração local criada: $output"
