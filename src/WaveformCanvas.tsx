import { useEffect, useRef } from 'react';

// Governed working-system hero cycle: 5.2s total.
const CYCLE = 5200; // ms

export interface WaveformProps {
  // position / layout (controlled from parent wrapper)
  // wave shape
  spatialCycles?: number;   // frequency — default 28
  speed?: number;           // temporal scroll speed — default 17.5
  centerY?: number;         // vertical center 0–1 — default 0.56
  // red (undamped) wave
  redAmp?: number;          // max amplitude px — default 161
  redOpacity?: number;      // 0–1 — default 1
  redWidth?: number;        // stroke width — default 1.95
  // gold (damped) wave
  goldAmp?: number;         // amplitude px — default 32
  goldOpacity?: number;     // 0–1 — default 1
  goldWidth?: number;       // stroke width — default 1.75
}

export default function WaveformCanvas({
  spatialCycles = 28,
  speed = 17.5,
  centerY = 0.56,
  redAmp = 161,
  redOpacity = 1,
  redWidth = 1.95,
  goldAmp = 32,
  goldOpacity = 1,
  goldWidth = 1.75,
}: WaveformProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const lastRef = useRef<number>(0);
  const epochRef = useRef<number | null>(null);
  const visibleRef = useRef(true);

  // props ref so the draw loop always reads current values without restart
  const propsRef = useRef({ spatialCycles, speed, centerY, redAmp, redOpacity, redWidth, goldAmp, goldOpacity, goldWidth });
  useEffect(() => {
    propsRef.current = { spatialCycles, speed, centerY, redAmp, redOpacity, redWidth, goldAmp, goldOpacity, goldWidth };
  });

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const activeCanvas: HTMLCanvasElement = canvas;
    const context: CanvasRenderingContext2D = ctx;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.6);

    const resize = () => {
      const r = stage.getBoundingClientRect();
      activeCanvas.width  = Math.max(1, Math.round(r.width  * dpr));
      activeCanvas.height = Math.max(1, Math.round(r.height * dpr));
      activeCanvas.style.width  = r.width  + 'px';
      activeCanvas.style.height = r.height + 'px';
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(stage);

    const io = new IntersectionObserver(
      (entries) => { visibleRef.current = entries.some(e => e.isIntersecting); },
      { threshold: 0.02 }
    );
    io.observe(stage);

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

    function draw(ts: number) {
      rafRef.current = requestAnimationFrame(draw);
      if (!visibleRef.current || ts - lastRef.current < 22) return;
      lastRef.current = ts;

      if (epochRef.current === null) epochRef.current = ts;

      const p = propsRef.current;
      const w = activeCanvas.clientWidth;
      const h = activeCanvas.clientHeight;
      if (!w || !h) return;

      context.clearRect(0, 0, w, h);

      const elapsed = Math.max(0, ts - epochRef.current);
      const cycle = ((elapsed % CYCLE) + CYCLE) % CYCLE / CYCLE;

      let damp: number;
      if      (cycle < 0.2) damp = 0;
      else if (cycle < 0.6) damp = (cycle - 0.2) / 0.4;
      else                  damp = 1 - (cycle - 0.6) / 0.4;

      const amp = p.redAmp + (p.goldAmp - p.redAmp) * damp;
      const temporalPhase = reduce.matches ? 0 : (elapsed / 1000) * p.speed;
      const center = h * p.centerY;
      const envPhase = reduce.matches ? 0 : (elapsed / 1000) * 1.65;

      const envelopeBase = (xNorm: number) =>
        Math.max(0.18, 0.58 + 0.42 * Math.sin(xNorm * Math.PI * 4.2 + envPhase));

      context.save();
      context.globalCompositeOperation = 'lighter';

      const rA = (1 - damp) * p.redOpacity;
      const yA = damp * p.goldOpacity;

      // Red bands
      for (let band = 0; band < 4; band++) {
        context.beginPath();
        for (let x = 0; x <= w; x += 2.2) {
          const nx = x / w;
          const sEnv = 0.18 + 0.82 * Math.pow(Math.sin(Math.PI * nx), 0.62);
          const mEnv = envelopeBase(nx);
          const a = amp * sEnv * mEnv * (1 - band * 0.09);
          const carrier = Math.sin(nx * Math.PI * 2 * p.spatialCycles + temporalPhase + band * 0.24);
          const side    = Math.sin(nx * Math.PI * 2 * (p.spatialCycles * 1.83) - temporalPhase * 1.12 + band * 0.51);
          const y = center + carrier * a * 0.78 + side * a * 0.11;
          x === 0 ? context.moveTo(x, y) : context.lineTo(x, y);
        }
        const alphas = [0.48, 0.25, 0.13, 0.07];
        const widths  = [p.redWidth, p.redWidth * 0.64, p.redWidth * 0.44, p.redWidth * 0.30];
        context.strokeStyle = `rgba(214,37,31,${alphas[band] * rA})`;
        context.lineWidth = widths[band];
        context.stroke();
      }

      // Gold bands
      for (let band = 0; band < 3; band++) {
        context.beginPath();
        for (let x = 0; x <= w; x += 2.2) {
          const nx = x / w;
          const sEnv = 0.22 + 0.78 * Math.pow(Math.sin(Math.PI * nx), 0.66);
          const mEnv = 0.72 + 0.28 * Math.sin(nx * Math.PI * 4.2 + envPhase);
          const a = p.goldAmp * sEnv * mEnv * (1 - band * 0.08);
          const y = center
            + Math.sin(nx * Math.PI * 2 * p.spatialCycles + temporalPhase * 0.96 + band * 0.22) * a * 0.82
            + Math.sin(nx * Math.PI * 2 * (p.spatialCycles * 1.80) - temporalPhase * 0.98 + band * 0.44) * a * 0.10;
          x === 0 ? context.moveTo(x, y) : context.lineTo(x, y);
        }
        const alphas = [0.44, 0.20, 0.09];
        const widths  = [p.goldWidth, p.goldWidth * 0.60, p.goldWidth * 0.38];
        context.strokeStyle = `rgba(242,182,50,${alphas[band] * yA})`;
        context.lineWidth = widths[band];
        context.stroke();
      }

      // Envelope guides
      const guideAlpha = rA * 0.12;
      for (const sign of [-1, 1]) {
        context.beginPath();
        for (let x = 0; x <= w; x += 4) {
          const nx = x / w;
          const sEnv = 0.18 + 0.82 * Math.pow(Math.sin(Math.PI * nx), 0.62);
          const a = amp * sEnv * envelopeBase(nx);
          const y = center + sign * a * 0.84;
          x === 0 ? context.moveTo(x, y) : context.lineTo(x, y);
        }
        context.strokeStyle = `rgba(214,37,31,${guideAlpha})`;
        context.lineWidth = 0.8;
        context.stroke();
      }

      context.restore();
    }

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <div ref={stageRef} style={{ width: '100%', height: '100%' }}>
      <canvas ref={canvasRef} style={{ display: 'block' }} />
    </div>
  );
}
