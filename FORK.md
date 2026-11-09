# Paperclip fork workspace

This repository pins the complete Paperclip source tree as the `paperclip/` submodule. The pinned upstream revision is `d2fe85e57c2fb805e9d08a8cf132621733e77715` (upstream `master`, inspected 2026-11-09).

## Get the source

```sh
git clone --recurse-submodules https://github.com/Cav47/clippaper.git
# Or, from an existing clone:
git submodule update --init --recursive
```

Paperclip's own build and run instructions live in `paperclip/README.md`. Keep local API credentials in Paperclip's encrypted Connections UI; never put them in this repository, `.env` files committed to Git, or source patches.

## Requested product changes

- **Interface language:** Paperclip already ships an i18next locale catalog, including `pt-BR`, `en`, and `es`. The current catalog is only partially translated (the three catalogs currently translate the no-company landing card). A selector alone would not translate the whole application. A complete selector needs persistent user preference plus reviewed translations across the UI.
- **Agent response language:** should be a separate per-company or per-agent setting that adds a stable instruction to agent runs; it should not be inferred from the UI locale.
- **Provider choice:** Paperclip already supports OpenRouter as a provider, with its own API key. OpenRouter's single credential does not reuse separate provider keys.
- **Fallback across accounts/providers:** upstream has an experimental AI connection pool/router that selects one authorized account for a task and pins that task to it. It does not automatically retry a failed model run on another provider. A true failure fallback needs retry classification, bounded retries, run/session recovery, audit records, and UI configuration; it must not silently replay non-idempotent tool actions.

The upstream source is pinned here rather than copied into this repository, so upstream updates remain explicit and the existing `main` branch and Codex skills branch remain intact. Do not describe the current pool as automatic failure fallback.
