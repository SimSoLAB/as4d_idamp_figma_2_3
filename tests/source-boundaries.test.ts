import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('public source keeps technical and action boundaries explicit', async () => {
  const app = await readFile(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const runtime = await readFile(new URL('../src/impact/runtime.ts', import.meta.url), 'utf8');
  const governance = await readFile(new URL('../src/governance/content.ts', import.meta.url), 'utf8');
  const waveform = await readFile(new URL('../src/WaveformCanvas.tsx', import.meta.url), 'utf8');
  assert.match(app, /controlledContent\.iiotBoundary\.text/);
  assert.doesNotMatch(app, /Hardware-verified\. Integration-ready\./);
  assert.doesNotMatch(app, /Whitepaper request submitted\./);
  assert.doesNotMatch(app, /full density and metallurgical bonding/);
  assert.match(runtime, /whitepaper_request/);
  assert.match(runtime, /if \(!result\.ok\)/);
  assert.match(runtime, /backend: false/);
  assert.match(governance, /HOLD-TECH-T2B/);
  assert.match(governance, /MES, fleet and cross-site intelligence remain future capability/);
  assert.match(waveform, /const CYCLE = 5200/);
  assert.match(waveform, /prefers-reduced-motion: reduce/);
});
