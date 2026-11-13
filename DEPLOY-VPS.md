# Paperclip na VPS

## Estado da implantação

- Ubuntu 24.04, Paperclip `2026.1106.0`, Node 24, OpenCode CLI `2.2.6`, 4 vCPU e 8 GB de RAM.
- O Paperclip roda como serviço de usuário `paperclipai.service`, com `linger` habilitado. O PostgreSQL embutido e os dados ficam no diretório persistente do usuário `paperclip`.
- Paperclip, LLMF e proxy escutam somente em `127.0.0.1`; as portas `3100`, `8000` e `8001` não são públicas.
- Agentes usam `openai/fast` → proxy local → `kilo-gateway/kilo-auto/free`. LLMF roda com `--no-fallback`; limite, falta de cota ou erro não troca para modelo pago.
- O projeto está em `/home/paperclip/work/rotina-em-familia`, branch `main`. Os caminhos de workspace e instruções dos agentes devem permanecer Linux.
- Rotinas de conteúdo estão pausadas enquanto houver issue bloqueado ou dependência de mídia inacessível. Microdramas fica em rascunhos. Publicação exige aprovação da versão exata e mídia durável validada.

## Serviços locais

As unidades `deploy/systemd/paperclip-llmf.service` e `deploy/systemd/paperclip-llmf-proxy.service` executam o endpoint gratuito e o proxy fixo. A chave fica em `/home/paperclip/.local/share/rotina-em-familia/llmf-api-key`, fora do Git, com permissão `0600`.

```sh
sudo systemctl status paperclip-llmf paperclip-llmf-proxy
sudo -u paperclip env XDG_RUNTIME_DIR=/run/user/999 \
  /home/paperclip/.local/bin/paperclipai service status
curl http://127.0.0.1:3100/api/health
```

Uma resposta 429 de Kilo pausa o trabalho afetado. Não mude o modelo para provedor pago nem adicione fallback.

## Acesso remoto

Sem domínio e HTTPS, não exponha a porta 3100. Para acesso temporário, crie um túnel SSH da porta local 3100 para `127.0.0.1:3100` na VPS e abra a porta local no navegador. Para acesso permanente de outros dispositivos, configure VPN ou domínio com HTTPS e autenticação Paperclip; não exponha `local_trusted` diretamente na Internet.

## Dados, backups e recuperação

Banco, anexos, diretórios de agentes/skills e `secrets/master.key` precisam de cópias protegidas e sincronizadas. A chave mestre só descriptografa segredos junto com o banco correspondente; mantenha os dois fora do Git e com acesso restrito. Guarde também workspace e arquivos locais necessários para retomar a produção. Nunca versione `.env`, chaves, banco, backups, `video/voice-models/`, WAVs ou MP4s gerados.

## Sincronização e verificação

1. Atualize o workspace persistente por Git e confira o hash do commit.
2. Instale as dependências de vídeo pelo lockfile; use Piper e Remotion locais, sem API tarifada.
3. Rode `paperclipai doctor`, confirme `/api/health`, serviço Paperclip e backup recente.
4. Confirme agentes prontos, `opencode` acessível pelo serviço, caminhos Linux válidos, conexões e workspace.
5. Confirme `openai/fast` → `kilo-gateway/kilo-auto/free`; se a chamada falhar, não faça fallback.
6. Confirme navegador headless, FFmpeg, Piper e voz antes de renderizar.
7. Verifique rotinas e issues bloqueados antes de habilitar agendamentos. Não repita trabalho bloqueado nem publique sem revisão editorial exata.

## Referências oficiais

- [Instalação do Paperclip](https://github.com/paperclipai/paperclip/blob/master/doc/INSTALLING.md)
- [Segredos do Paperclip](https://github.com/paperclipai/paperclip/blob/master/doc/deploy/secrets.md)
- [Backup e banco do Paperclip](https://github.com/paperclipai/paperclip/blob/master/doc/DATABASE.md)
- [Uso gratuito e limites de Kilo](https://kilo.ai/docs/getting-started/using-kilo-for-free)
- [Instalação local do Piper](https://github.com/OHF-Voice/piper1-gpl)
- [Renderização Remotion](https://www.remotion.dev/docs/render)
