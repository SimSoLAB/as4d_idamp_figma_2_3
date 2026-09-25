import test from 'node:test';
import assert from 'node:assert/strict';
import {
  EVENT_SCHEMA_VERSION,
  eventSignature,
  hasSequenceIntegrity,
  reconstructJourney,
  shouldCollapseDuplicate,
  stageForRouteStep,
  type SemanticEvent,
} from '../src/impact/core.ts';

test('semantic contract is versioned and route stages are deterministic', () => {
  assert.equal(EVENT_SCHEMA_VERSION, '1.0.0');
  assert.equal(stageForRouteStep('01'), 'curiosity');
  assert.equal(stageForRouteStep('07'), 'explicit_action');
});

test('duplicate collapse happens before a new sequence should be assigned', () => {
  assert.equal(shouldCollapseDuplicate(1000, 1200), true);
  assert.equal(shouldCollapseDuplicate(1000, 1800), false);
  assert.equal(
    eventSignature({ name: 'section_view', section: 'proof', theme: 'proof', metadata: { b: 2, a: 1 } }),
    eventSignature({ name: 'section_view', section: 'proof', theme: 'proof', metadata: { a: 1, b: 2 } }),
  );
});

test('sequence integrity rejects gaps', () => {
  const mk = (sequence: number): SemanticEvent => ({
    schemaVersion: '1.0.0',
    eventId: String(sequence),
    sessionId: 's',
    sequence,
    timestamp: new Date(0).toISOString(),
    name: 'section_view',
    section: 'x',
    theme: 'curiosity',
  });
  assert.equal(hasSequenceIntegrity([mk(1), mk(2)]), true);
  assert.equal(hasSequenceIntegrity([mk(1), mk(3)]), false);
});

test('passive stages never become explicit actions', () => {
  const passive: SemanticEvent[] = [
    {
      schemaVersion: '1.0.0',
      eventId: '1',
      sessionId: 's',
      sequence: 1,
      timestamp: new Date(0).toISOString(),
      name: 'section_view',
      section: 'hero',
      theme: 'curiosity',
    },
    {
      schemaVersion: '1.0.0',
      eventId: '2',
      sessionId: 's',
      sequence: 2,
      timestamp: new Date(1).toISOString(),
      name: 'section_view',
      section: 'insights',
      theme: 'explicit_action',
    },
  ];
  const journey = reconstructJourney(passive);
  assert.equal(journey.explicitActions.length, 0);
});

test('only a validated whitepaper_request counts as explicit action', () => {
  const events: SemanticEvent[] = [
    {
      schemaVersion: '1.0.0',
      eventId: '1',
      sessionId: 's',
      sequence: 1,
      timestamp: new Date(0).toISOString(),
      name: 'whitepaper_validation_error',
      section: 'deep_insights',
      theme: 'explicit_action',
    },
    {
      schemaVersion: '1.0.0',
      eventId: '2',
      sessionId: 's',
      sequence: 2,
      timestamp: new Date(1).toISOString(),
      name: 'whitepaper_request',
      section: 'deep_insights',
      theme: 'explicit_action',
      metadata: { backend: false },
    },
  ];
  assert.equal(reconstructJourney(events).explicitActions.length, 1);
});
