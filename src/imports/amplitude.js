(() => {
  const stage = document.querySelector(".amplitude-stage");
  const canvas = document.querySelector(".frequency-canvas");
  if (!stage || !canvas) return;

  const ctx = canvas.getContext("2d");
  const CYCLE = 5200;

  let dpr = Math.min(window.devicePixelRatio || 1, 1.6);
  let visible = true;
  let last = 0;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  const epoch = performance.now();

  function resize() {
    const r = stage.getBoundingClientRect();
    canvas.width = Math.max(1, Math.round(r.width * dpr));
    canvas.height = Math.max(1, Math.round(r.height * dpr));
    canvas.style.width = r.width + "px";
    canvas.style.height = r.height + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  resize();
  window.addEventListener("resize", resize, { passive: true });

  new IntersectionObserver((entries) => {
    visible = entries.some((entry) => entry.isIntersecting);
  }, { threshold: 0.02 }).observe(stage);

  function smoothstep(x) {
    return x * x * (3 - 2 * x);
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function draw(ts) {
    requestAnimationFrame(draw);

    // Matches the source runtime's ~45 FPS gate.
    if (!visible || ts - last < 22) return;
    last = ts;

    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (!w || !h) return;

    ctx.clearRect(0, 0, w, h);

    const elapsed = Math.max(0, ts - epoch);
    const p = ((elapsed % CYCLE) + CYCLE) % CYCLE / CYCLE;

    /*
      Source damping cycle:
      0–30%  = undamped
      30–66% = transition
      66–92% = damped
      92–100%= reset
    */
    let damp;
    if (p < 0.30) damp = 0;
    else if (p < 0.66) damp = smoothstep((p - 0.30) / 0.36);
    else if (p < 0.92) damp = 1;
    else damp = 1 - smoothstep((p - 0.92) / 0.08);

    // Exact source amplitude relationship: ~8:1.
    const highAmp = 78;
    const lowAmp = 9.5;
    const amp = lerp(highAmp, lowAmp, damp);

    const spatialCycles = 28;
    const temporalPhase = reduce.matches ? 0 : (elapsed / 1000) * 17.5;
    const center = h * 0.56;

    const envPhase = reduce.matches ? 0 : (elapsed / 1000) * 1.65;
    const envelopeBase = (xNorm) => {
      const slow = 0.58 + 0.42 * Math.sin(xNorm * Math.PI * 4.2 + envPhase);
      return Math.max(0.18, slow);
    };

    ctx.save();
    ctx.globalCompositeOperation = "lighter";

    const redAlpha = 1 - damp;
    const yellowAlpha = damp;

    // UNDAMPED / RED carrier
    for (let band = 0; band < 4; band++) {
      ctx.beginPath();

      for (let x = 0; x <= w; x += 2.2) {
        const nx = x / w;
        const spatialEnv = 0.18 + 0.82 * Math.pow(Math.sin(Math.PI * nx), 0.62);
        const modEnv = envelopeBase(nx);
        const a = amp * spatialEnv * modEnv * (1 - band * 0.09);

        const carrier = Math.sin(
          nx * Math.PI * 2 * spatialCycles +
          temporalPhase +
          band * 0.24
        );

        const side = Math.sin(
          nx * Math.PI * 2 * (spatialCycles * 1.83) -
          temporalPhase * 1.12 +
          band * 0.51
        );

        const y = center + carrier * a * 0.78 + side * a * 0.11;

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      const alphas = [0.48, 0.25, 0.13, 0.07];
      ctx.strokeStyle =
        `rgba(214,37,31,${alphas[band] * (0.32 + redAlpha * 0.68)})`;
      ctx.lineWidth = [1.95, 1.25, 0.85, 0.58][band];
      ctx.stroke();
    }

    // DAMPED / YELLOW carrier
    for (let band = 0; band < 3; band++) {
      ctx.beginPath();

      for (let x = 0; x <= w; x += 2.2) {
        const nx = x / w;
        const spatialEnv = 0.22 + 0.78 * Math.pow(Math.sin(Math.PI * nx), 0.66);
        const modEnv =
          0.72 + 0.28 * Math.sin(nx * Math.PI * 4.2 + envPhase);
        const a = lowAmp * spatialEnv * modEnv * (1 - band * 0.08);

        const y =
          center +
          Math.sin(
            nx * Math.PI * 2 * spatialCycles +
            temporalPhase * 0.96 +
            band * 0.22
          ) * a * 0.82 +
          Math.sin(
            nx * Math.PI * 2 * (spatialCycles * 1.80) -
            temporalPhase * 0.98 +
            band * 0.44
          ) * a * 0.10;

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      const alphas = [0.44, 0.20, 0.09];
      ctx.strokeStyle =
        `rgba(242,182,50,${alphas[band] * (0.08 + yellowAlpha * 0.92)})`;
      ctx.lineWidth = [1.75, 1.05, 0.66][band];
      ctx.stroke();
    }

    // Envelope guides from the source animation.
    const guideAlpha = 0.07 + redAlpha * 0.10;

    ctx.beginPath();
    for (let x = 0; x <= w; x += 4) {
      const nx = x / w;
      const spatialEnv = 0.18 + 0.82 * Math.pow(Math.sin(Math.PI * nx), 0.62);
      const a = amp * spatialEnv * envelopeBase(nx);
      const y = center - a * 0.84;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = `rgba(214,37,31,${guideAlpha})`;
    ctx.lineWidth = 0.8;
    ctx.stroke();

    ctx.beginPath();
    for (let x = 0; x <= w; x += 4) {
      const nx = x / w;
      const spatialEnv = 0.18 + 0.82 * Math.pow(Math.sin(Math.PI * nx), 0.62);
      const a = amp * spatialEnv * envelopeBase(nx);
      const y = center + a * 0.84;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = `rgba(214,37,31,${guideAlpha})`;
    ctx.lineWidth = 0.8;
    ctx.stroke();

    ctx.restore();
  }

  requestAnimationFrame(draw);
})();
