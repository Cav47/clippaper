#!/usr/bin/env bash
set -euo pipefail

if [[ "${PAPERCLIP_APPROVED:-}" != "1" ]]; then
  echo "Blocked: set PAPERCLIP_APPROVED=1 only after this exact video has editorial approval." >&2
  exit 2
fi
if [[ $# -ne 1 || ! -f "$1" ]]; then
  echo "Usage: PAPERCLIP_APPROVED=1 $0 /absolute/path/to/approved-video.mp4" >&2
  exit 2
fi
source_file=$(realpath -- "$1")
case "$source_file" in
  *.mp4) ;;
  *) echo "Only MP4 files are supported." >&2; exit 2 ;;
esac
video_stream=$(ffprobe -v error -select_streams v:0 -show_entries stream=codec_name,width,height -of csv=p=0 -- "$source_file")
if [[ -z "$video_stream" ]]; then
  echo "No readable video stream found." >&2
  exit 2
fi
# TikTok auto-publishing rejects sources outside 23–60 FPS. Fail before exposing
# a file or creating a scheduled post; target a constant 30 FPS export.
avg_fps=$(ffprobe -v error -select_streams v:0 -show_entries stream=avg_frame_rate -of default=noprint_wrappers=1:nokey=1 -- "$source_file")
duration=$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 -- "$source_file")
size=$(stat -c %s -- "$source_file")
if ! python3 - "$avg_fps" "$duration" "$size" <<'PY'
from fractions import Fraction
import sys
try:
    fps = float(Fraction(sys.argv[1]))
    duration = float(sys.argv[2])
    size = int(sys.argv[3])
except (ValueError, ZeroDivisionError):
    raise SystemExit("Invalid video metadata")
if not 23 <= fps <= 60:
    print(f"Blocked: average frame rate {fps:.3f} FPS; TikTok requires 23–60 FPS. Re-render/normalize to constant 30 FPS.", file=sys.stderr)
    raise SystemExit(1)
if not 3 <= duration <= 600:
    print(f"Blocked: duration {duration:.3f}s; TikTok auto-publish requires 3–600 seconds.", file=sys.stderr)
    raise SystemExit(1)
if size > 500 * 1024 * 1024:
    print(f"Blocked: file size {size} bytes; TikTok limit is 500 MB.", file=sys.stderr)
    raise SystemExit(1)
PY
then
  exit 2
fi
hash=$(sha256sum -- "$source_file" | cut -d ' ' -f 1)
name="${hash}.mp4"
root="${PAPERCLIP_MEDIA_ROOT:-/srv/paperclip-public-media}"
dest_dir="$root/m"
base_url="${PAPERCLIP_MEDIA_PUBLIC_BASE_URL:-https://media.apexgol.com.br}"
install -d -m 0755 -- "$dest_dir"
dest="$dest_dir/$name"
if [[ -e "$dest" ]]; then
  existing_hash=$(sha256sum -- "$dest" | cut -d ' ' -f 1)
  [[ "$existing_hash" == "$hash" ]] || { echo "Hash path exists with different content." >&2; exit 3; }
else
  tmp="$dest_dir/.${name}.tmp.$$"
  install -m 0644 -- "$source_file" "$tmp"
  mv -- "$tmp" "$dest"
fi
printf '%s/m/%s\n' "${base_url%/}" "$name"
printf 'sha256=%s size=%s video=%s\n' "$hash" "$(stat -c %s -- "$dest")" "$video_stream"
