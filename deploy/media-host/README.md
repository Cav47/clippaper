# VPS media origin

The Caddy listener on TCP 3101 serves only MP4 files under `/m/<sha256>.mp4`.
Directory listing and all other paths return 404. The media files are stored outside
the Git repository in `/srv/paperclip-public-media`.

## Current origin

- DNS: `media.apexgol.com.br A 181.214.14.171` (TTL 300)
- Internal VPS service: TCP 3101
- Public HTTPS path after BoaHost domain publication:
  `https://media.apexgol.com.br/m/<sha256>.mp4`

The Caddyfile is source-controlled here and installed as `/etc/caddy/Caddyfile`.
BoaHost must publish `media.apexgol.com.br` to VPS port 3101 and issue the Let's
Encrypt certificate. Until that mapping is active, the public HTTPS URL will not
work. This does not change the Paperclip service on port 3100.

## Publish an approved video

Run this on the VPS as the `paperclip` user after editorial approval of that exact file:

```sh
PAPERCLIP_APPROVED=1 ./deploy/media-host/publish-approved-video.sh /absolute/path/to/approved.mp4
```

The script validates the MP4 video stream, copies it atomically to the public media
directory using its SHA-256 as the filename, and prints the permanent HTTPS URL.
Only call it for a file approved for public release. The URL is public and anyone
who has it can download that video.
