export const EVENT_SCHEMA_VERSION = '1.0.0' as const;

export const JOURNEY_STAGES = [
  'curiosity',
  'trust',
  'competence',
  'proof',
  'integrated_system',
  'deep_evidence',
  'explicit_action',
] as const;

export type JourneyStage = (typeof JOURNEY_STAGES)[number];

export type SemanticEvent = {
  schemaVersion: typeof EVENT_SCHEMA_VERSION;
  eventId: string;
  sessionId: string;
  sequence: number;
  timestamp: string;
  name: string;
  section: string;
  theme: JourneyStage | string;
  metadata?: Record<string, unknown>;
};

export type DraftEvent = Omit<
  SemanticEvent,
  'schemaVersion' | 'eventId' | 'sessionId' | 'sequence' | 'timestamp'
>;

const STEP_TO_STAGE: Record<string, JourneyStage> = {
  '01': 'curiosity',
  '02': 'trust',
  '03': 'competence',
  '04': 'proof',
  '05': 'integrated_system',
  '06': 'deep_evidence',
  '07': 'explicit_action',
};

export function stageForRouteStep(step: string | null | undefined): JourneyStage | string {
  return step ? (STEP_TO_STAGE[step] ?? 'unknown') : 'unknown';
}

export function eventSignature(event: DraftEvent): string {
  const metadata = event.metadata
    ? Object.fromEntries(Object.entries(event.metadata).sort(([a], [b]) => a.localeCompare(b)))
    : undefined;
  return JSON.stringify([event.name, event.section, event.theme, metadata]);
}

export function shouldCollapseDuplicate(previousAt: number | undefined, now: number, windowMs = 750): boolean {
  return previousAt !== undefined && now - previousAt >= 0 && now - previousAt < windowMs;
}

export function hasSequenceIntegrity(events: readonly SemanticEvent[]): boolean {
  return events.every((event, index) => event.sequence === index + 1);
}

export function reconstructJourney(events: readonly SemanticEvent[]) {
  const stagesObserved: JourneyStage[] = [];
  for (const event of events) {
    if (event.name !== 'section_view') continue;
    if (!JOURNEY_STAGES.includes(event.theme as JourneyStage)) continue;
    const stage = event.theme as JourneyStage;
    if (!stagesObserved.includes(stage)) stagesObserved.push(stage);
  }

  const explicitActions = events.filter((event) => event.name === 'whitepaper_request');
  return {
    stagesObserved,
    explicitActions,
    sequenceIntegrity: hasSequenceIntegrity(events),
  };
}
