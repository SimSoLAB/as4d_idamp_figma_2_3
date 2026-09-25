export type ContentClass =
  | 'STRATEGIC_INTENT'
  | 'CURRENT_FACT'
  | 'INVESTOR_FRAMING'
  | 'FORWARD_LOOKING'
  | 'EVIDENCE_GATED'
  | 'PLACEHOLDER';

export type ControlledContent = {
  class: ContentClass;
  text: string;
  source?: string;
};

export const controlledContent = {
  industrialisationPath: {
    class: 'STRATEGIC_INTENT',
    text: 'Specialist technology/evidence → aS4D repair industrialisation → scan-derived application intelligence → installed industrial LPBF → customer-local validation/qualification.',
    source: 'SIU-17',
  },
  impactEngine: {
    class: 'STRATEGIC_INTENT',
    text: 'Curiosity → Trust → Competence → Proof → Integrated System → Deep Evidence → Explicit Action.',
    source: 'SIU-18',
  },
  iiotBoundary: {
    class: 'CURRENT_FACT',
    text: 'MQTT, local orchestration, run-level records and local workflow/process data. MES, fleet and cross-site intelligence remain future capability.',
  },
  technicalClaimGate: {
    class: 'EVIDENCE_GATED',
    text: 'Technical claims remain subject to CURRENT Product & Technology, Claim Register and HOLD-TECH-T2B.',
  },
} satisfies Record<string, ControlledContent>;
