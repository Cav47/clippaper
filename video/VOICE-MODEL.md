# Voz local para narração

Voz brasileira Piper `pt_BR-cadu-medium`, executada localmente com Piper 1.8.0. O modelo e o JSON de configuração ficam em `voice-models/` (ignorado pelo Git); não são enviados ao Paperclip nem usados por API hospedada.

- Modelo: https://huggingface.co/rhasspy/piper-voices/resolve/main/pt/pt_BR/cadu/medium/pt_BR-cadu-medium.onnx
- Configuração: https://huggingface.co/rhasspy/piper-voices/resolve/main/pt/pt_BR/cadu/medium/pt_BR-cadu-medium.onnx.json
- Model card: https://huggingface.co/rhasspy/piper-voices/resolve/main/pt/pt_BR/cadu/medium/MODEL_CARD
- Fonte e licença: [`piper/VOICES.md`](https://github.com/rhasspy/piper/blob/master/VOICES.md) lista `cadu` para pt_BR; [`COMMERCIAL_USE.md`](https://github.com/OHF-Voice/piper1-gpl/blob/main/docs/COMMERCIAL_USE.md) lista `pt_BR-cadu-medium` como CC0. O card atual identifica treinamento a partir de `rdh`, também CC0.

## Regenerar a narração

Baixe os três arquivos acima para `video/voice-models/` e execute `video/scripts/generate-voiceover.sh`. O WAV gerado em `video/public/audio/short-estudo.wav` é ignorado pelo Git. Depois renderize o Short com Remotion. O modelo não é distribuído com o projeto; verificar o card se baixar uma versão diferente.
