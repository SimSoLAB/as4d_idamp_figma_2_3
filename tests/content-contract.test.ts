import test from 'node:test';
import assert from 'node:assert/strict';
import { controlledContent } from '../src/governance/content.ts';

test('SIU-18 public journey stays canonical and ordered', () => {
  assert.deepEqual(
    controlledContent.publicJourney.map((stage) => stage.label),
    ['Curiosity', 'Trust', 'Competence', 'Proof', 'Integrated System', 'Deep Evidence', 'Explicit Action'],
  );
  assert.deepEqual(
    controlledContent.publicJourney.map((stage) => stage.num),
    ['01', '02', '03', '04', '05', '06', '07'],
  );
  assert.ok(controlledContent.publicJourney.every((stage) => stage.class === 'STRATEGIC_INTENT'));
});

test('SIU-17 industrialisation path stays canonical', () => {
  assert.deepEqual(
    controlledContent.industrialisationStages.map((stage) => stage.label),
    [
      'Specialist Technology / Evidence',
      'aS4D Repair Industrialisation',
      'Scan / Application Intelligence',
      'Installed Industrial LPBF',
      'Customer-local Validation / Qualification',
    ],
  );
  assert.ok(controlledContent.industrialisationStages.every((stage) => stage.class === 'STRATEGIC_INTENT'));
});

test('technical and measurement boundaries remain explicit', () => {
  assert.equal(controlledContent.iiotBoundary.class, 'CURRENT_FACT');
  assert.match(controlledContent.iiotBoundary.text, /MQTT/);
  assert.match(controlledContent.iiotBoundary.text, /MES, fleet and cross-site intelligence remain future capability/);

  assert.equal(controlledContent.optionalSpecialistNodes.class, 'EVIDENCE_GATED');
  assert.match(controlledContent.optionalSpecialistNodes.text, /not canonical iDAMP\.repair core-path nodes/);

  assert.equal(controlledContent.identityBoundary.class, 'CURRENT_FACT');
  assert.match(controlledContent.identityBoundary.text, /anonymous by default/);

  assert.equal(controlledContent.actionBoundary.class, 'CURRENT_FACT');
  assert.match(controlledContent.actionBoundary.text, /not lead, buying-intent or pipeline truth/);

  assert.equal(controlledContent.technicalClaimGate.class, 'EVIDENCE_GATED');
  assert.match(controlledContent.technicalClaimGate.text, /HOLD-TECH-T2B/);
});
