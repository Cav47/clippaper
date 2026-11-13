#!/usr/bin/env python3
"""Create a gentle, original synthesized music bed for the study short."""
from pathlib import Path
import wave

import numpy as np

RATE = 22050
DURATION = 30.0
OUT = Path(__file__).resolve().parents[1] / "public/audio/short-estudo-bed.wav"

def main():
    OUT.parent.mkdir(parents=True, exist_ok=True)
    total = int(RATE * DURATION)
    t = np.arange(total, dtype=np.float64) / RATE
    mix = np.zeros(total, dtype=np.float64)
    progression = [
        ([130.81, 164.81, 196.00, 246.94], 392.00),  # Cmaj7
        ([174.61, 220.00, 261.63, 329.63], 440.00),  # Fmaj7
        ([110.00, 164.81, 196.00, 261.63], 392.00),  # Am7
        ([98.00, 146.83, 196.00, 246.94], 392.00),   # G6
    ]
    chord_len = 3.75
    for bar in range(8):
        start = bar * chord_len
        end = min(DURATION, start + chord_len)
        mask = (t >= start) & (t < end)
        local = t[mask] - start
        fade_in = np.minimum(local / 0.65, 1.0)
        fade_out = np.minimum((end - start - local) / 0.7, 1.0)
        envelope = np.clip(np.minimum(fade_in, fade_out), 0.0, 1.0)
        notes, top = progression[bar % len(progression)]
        pad = np.zeros(local.shape, dtype=np.float64)
        for i, hz in enumerate(notes):
            pad += np.sin(2 * np.pi * hz * local + i * 0.19) * 0.16
            pad += np.sin(2 * np.pi * hz * 2 * local + i * 0.27) * 0.025
        mix[mask] += pad * envelope
        # Soft bell-like notes give the bed a quiet, steady pulse.
        for beat in range(4):
            note_start = start + beat * 0.9 + 0.18
            note_end = min(end, note_start + 1.25)
            sel = (t >= note_start) & (t < note_end)
            lt = t[sel] - note_start
            decay = np.exp(-3.2 * lt)
            bell = np.sin(2 * np.pi * top * lt) + 0.24 * np.sin(2 * np.pi * top * 2.01 * lt)
            mix[sel] += 0.055 * bell * decay
    # Smooth global fade and conservative peak for comfortable narration mix.
    fade = np.minimum(np.clip(t / 0.8, 0, 1), np.clip((DURATION - t) / 1.8, 0, 1))
    mix *= fade
    peak = np.max(np.abs(mix)) or 1.0
    pcm = np.int16(np.clip(mix / peak * 0.22, -1, 1) * 32767)
    with wave.open(str(OUT), "wb") as wav:
        wav.setnchannels(1)
        wav.setsampwidth(2)
        wav.setframerate(RATE)
        wav.writeframes(pcm.tobytes())
    print(f"Wrote {OUT} ({DURATION:.1f}s, {RATE}Hz mono)")

if __name__ == "__main__":
    main()
