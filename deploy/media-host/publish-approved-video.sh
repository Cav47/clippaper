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
