#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 2 || ! -f "$1" ]]; then
  echo "Usage: $0 /path/to/source.mp4 /path/to/output.mp4" >&2
  exit 2
fi
source_file=$(realpath -- "$1")
output_file=$(realpath -m -- "$2")
case "$output_file" in
  *.mp4) ;;
  *) echo "Output must end in .mp4." >&2; exit 2 ;;
esac
if [[ "$source_file" == "$output_file" || -e "$output_file" ]]; then
  echo "Choose a new output path; existing files are never overwritten." >&2
  exit 2
fi
install -d -m 0755 -- "$(dirname -- "$output_file")"
tmp="$(dirname -- "$output_file")/.$(basename -- "$output_file" .mp4).tmp.$$.mp4"
cleanup() { rm -f -- "$tmp"; }
trap cleanup EXIT
ffmpeg -hide_banner -nostdin -i "$source_file" \
  -map 0:v:0 -map '0:a?' -vf "fps=30" -fps_mode cfr \
  -c:v libx264 -pix_fmt yuv420p -preset medium -crf 20 \
  -c:a aac -b:a 160k -ar 48000 -movflags +faststart \
  "$tmp"
avg_fps=$(ffprobe -v error -select_streams v:0 -show_entries stream=avg_frame_rate -of default=noprint_wrappers=1:nokey=1 -- "$tmp")
python3 - "$avg_fps" <<'PY'
from fractions import Fraction
import sys
try:
    fps = float(Fraction(sys.argv[1]))
except (ValueError, ZeroDivisionError):
    raise SystemExit("Could not validate output frame rate")
if not 23 <= fps <= 60:
    raise SystemExit(f"Output frame rate {fps:.3f} FPS is outside TikTok's 23–60 FPS range")
PY
mv -- "$tmp" "$output_file"
trap - EXIT
ffprobe -v error -select_streams v:0 -show_entries stream=codec_name,width,height,avg_frame_rate,pix_fmt -show_entries format=duration,size -of json -- "$output_file"
