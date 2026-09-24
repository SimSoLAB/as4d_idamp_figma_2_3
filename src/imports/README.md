# iDAMP.repair — Amplitude Animation Extract

Extracted from the v90 mockup's `hero-sync-v17-runtime`.

This package contains only the frequency/amplitude canvas animation. It removes:
- blade logic
- pocket reveal
- hero copy
- intent navigation
- section observers unrelated to rendering
- other page/runtime controllers

The waveform math and timing are preserved from the source animation:

- cycle: 5200 ms
- undamped: 0–30%
- transition: 30–66%
- damped: 66–92%
- reset: 92–100%
- high amplitude: 78
- low amplitude: 9.5
- spatial cycles: 28
- temporal phase speed: 17.5
- envelope phase speed: 1.65
- canvas update gate: ~22 ms

Run locally:

```bash
python -m http.server 8080
```

Open:

`http://localhost:8080/`
