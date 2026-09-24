# Plan: Hero Waveform Animation

## Context

The screenshot shows the site rendering correctly, but one design element is missing: a red sine-wave visualization that spans the full width of the hero background (node 1:62, "Frame", 1290×298px at left:150 top:116). This was exported as an empty `<div>` in the design context because Figma couldn't serialize it — confirmed by a direct screenshot of that node. The waveform is thematically central to the product (iDAMP = vibration damping) and visually prominent in the design.

The waveform shows:
- Multiple overlapping red sine waves at varying frequencies and amplitudes
- An envelope shape that rises (constructive interference) in the middle and tapers at the edges
- Dotted vertical stems (resonance spikes)
- Color: deep red (~`#cc1a00` / `#c0281a`), on dark `#121212` background
- The whole thing should animate — waves flowing/oscillating — to bring the hero to life

## Approach

Implement as an animated `<canvas>` element (React component, `useEffect` + `requestAnimationFrame`) positioned exactly at node 1:62's coordinates in the hero section.

**No external library needed** — plain Canvas 2D API is sufficient for sine waves.

## Implementation

### 1. New component `src/WaveformCanvas.tsx`

A self-contained `<canvas>` component that:

- Draws 4–5 overlapping sine waves with:
  - Different frequencies (0.8×, 1.2×, 1.8×, 2.5× base) 
  - Different amplitudes modulated by a Gaussian envelope that peaks at ~55% width
  - Phase offset incremented each frame for animation
  - Dotted vertical lines every ~30px at the wave peaks (use `setLineDash`)
- Color: `rgba(180, 30, 20, 0.7)` for main waves, `rgba(180, 30, 20, 0.25)` for secondary
- Stroke width: 1–1.5px
- 60fps via `requestAnimationFrame`, cancelled on unmount
- Canvas sized to `1290 × 298` (CSS) via `ref` + `width`/`height` attributes

### 2. Place in hero section — `src/App.tsx`

Add inside the `<section id="hero">` block, after the background div, wrapped in a `motion.div` entrance animation:

```tsx
{/* node 1:62 — Waveform background */}
<motion.div
  className="absolute left-[150px] top-[116px] w-[1290px] h-[298px] pointer-events-none"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1.4, delay: 0.1, ease: 'easeInOut' }}
>
  <WaveformCanvas />
</motion.div>
```

Position it behind the blade and text (z-index lower, or just before them in DOM order).

## Files to Modify

- **Create** `src/WaveformCanvas.tsx` — new canvas component
- **Edit** `src/App.tsx` — add `<WaveformCanvas>` inside hero section at correct position

## Verification

- Build passes (`pnpm build`)
- Preview shows animated red sine waves behind the hero headline and blade
- Waveform visually matches the screenshot reference: multi-wave overlapping, envelope shape, dotted spikes
- Reduced-motion: wrap `requestAnimationFrame` loop with `window.matchMedia('(prefers-reduced-motion: reduce)')` check — draw one static frame if true
