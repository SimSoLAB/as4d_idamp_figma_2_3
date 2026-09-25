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

export type JourneyStage = ControlledContent & {
  num: string;
  label: string;
  id: string;
  purpose: string;
};

export type IndustrialisationStage = ControlledContent & {
  num: string;
  label: string;
};

const publicJourney = [
  {
    num: '01',
    label: 'Curiosity',
    id: 'idamp',
    class: 'STRATEGIC_INTENT',
    text: 'Curiosity',
    purpose: 'Create a credible reason to explore the iDAMP.repair story without implying technical proof.',
    source: 'SIU-18',
  },
  {
    num: '02',
    label: 'Trust',
    id: 'capabilities',
    class: 'STRATEGIC_INTENT',
    text: 'Trust',
    purpose: 'Make authority, boundaries and collaboration logic understandable before capability claims deepen.',
    source: 'SIU-18',
  },
  {
    num: '03',
    label: 'Competence',
    id: 'proof-motion',
    class: 'STRATEGIC_INTENT',
    text: 'Competence',
    purpose: 'Show relevant functional and industrialisation competence while keeping evidence and intent distinct.',
    source: 'SIU-18',
  },
  {
    num: '04',
    label: 'Proof',
    id: 'integration-path',
    class: 'STRATEGIC_INTENT',
    text: 'Proof',
    purpose: 'Expose bounded evidence surfaces without converting demonstrations or assets into universal claims.',
    source: 'SIU-18',
  },
  {
    num: '05',
    label: 'Integrated System',
    id: 'system',
    class: 'STRATEGIC_INTENT',
    text: 'Integrated System',
    purpose: 'Explain how specialist technology and aS4D industrialisation can form one governed workflow.',
    source: 'SIU-18',
  },
  {
    num: '06',
    label: 'Deep Evidence',
    id: 'validation',
    class: 'STRATEGIC_INTENT',
    text: 'Deep Evidence',
    purpose: 'Provide access to deeper evidence, provenance and bounded validation context.',
    source: 'SIU-18',
  },
  {
    num: '07',
    label: 'Explicit Action',
    id: 'insights',
    class: 'STRATEGIC_INTENT',
    text: 'Explicit Action',
    purpose: 'Keep voluntary explicit action separate from passive engagement and from lead/pipeline truth.',
    source: 'SIU-18',
  },
] satisfies JourneyStage[];

const industrialisationStages = [
  {
    num: '01',
    label: 'Specialist Technology / Evidence',
    class: 'STRATEGIC_INTENT',
    text: 'Specialist functional technology and bounded evidence enter the industrialisation path.',
    source: 'SIU-17',
  },
  {
    num: '02',
    label: 'aS4D Repair Industrialisation',
    class: 'STRATEGIC_INTENT',
    text: 'aS4D integrates the specialist input into a governed repair industrialisation workflow.',
    source: 'SIU-17',
  },
  {
    num: '03',
    label: 'Scan / Application Intelligence',
    class: 'STRATEGIC_INTENT',
    text: 'Scan-derived application and repair intelligence informs the bounded workflow.',
    source: 'SIU-17',
  },
  {
    num: '04',
    label: 'Installed Industrial LPBF',
    class: 'STRATEGIC_INTENT',
    text: 'The intended architecture uses installed industrial LPBF as an execution environment; machine/process performance remains evidence-gated.',
    source: 'SIU-17',
  },
  {
    num: '05',
    label: 'Customer-local Validation / Qualification',
    class: 'STRATEGIC_INTENT',
    text: 'Validation and qualification remain customer- and evidence-specific endpoints, not automatic outcomes of the interface.',
    source: 'SIU-17',
  },
] satisfies IndustrialisationStage[];

export const controlledContent = {
  publicJourney,
  industrialisationStages,

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

  heroFunctionalTechnology: {
    class: 'STRATEGIC_INTENT',
    text: 'Hyphen contributes specialist functional technology and testing context.',
    source: 'SIU-17',
  },
  heroIndustrialisation: {
    class: 'STRATEGIC_INTENT',
    text: 'aS4D contributes repair industrialisation and the path toward industrial application.',
    source: 'SIU-17',
  },
  heroCombinedPath: {
    class: 'STRATEGIC_INTENT',
    text: 'Together, the intended architecture connects specialist technology and evidence with industrial repair execution and customer-local validation.',
    source: 'SIU-17',
  },

  iiotBoundary: {
    class: 'CURRENT_FACT',
    text: 'MQTT, local orchestration, run-level records and local workflow/process data. MES, fleet and cross-site intelligence remain future capability.',
    source: 'CLM-TEC-IIOT-001 / CURRENT Claim Register',
  },
  iiotFuture: {
    class: 'FORWARD_LOOKING',
    text: 'Repeated governed deployments may create a future basis for broader cross-part, cross-site and fleet-level decisions.',
    source: 'CLM-TEC-IIOT-002 / CURRENT Claim Register',
  },

  optionalSpecialistNodes: {
    class: 'EVIDENCE_GATED',
    text: 'DED and CNC may appear as optional specialist execution or finishing nodes where a governed workflow and evidence support them; they are not canonical iDAMP.repair core-path nodes.',
    source: 'SIU-17 / CURRENT implementation boundary',
  },

  validationBoundary: {
    class: 'EVIDENCE_GATED',
    text: 'Visible evidence does not by itself establish universal machine coverage, material qualification, production readiness, certification or customer-local acceptance.',
    source: 'CURRENT Product & Technology / Claim Register',
  },
  scaleBoundary: {
    class: 'INVESTOR_FRAMING',
    text: 'Seed is intended to prove scaling units and scaling mechanics; it does not claim that aS4D has already achieved company-scale execution.',
    source: 'SIU-02',
  },
  identityBoundary: {
    class: 'CURRENT_FACT',
    text: 'Journey measurement is anonymous by default. Person identity begins only after a voluntary explicit action and remains separately auditable.',
    source: 'SIU-18',
  },
  actionBoundary: {
    class: 'CURRENT_FACT',
    text: 'Clicks, scroll, dwell and video interactions are supporting observations only; they are not lead, buying-intent or pipeline truth.',
    source: 'SIU-18',
  },

  technicalClaimGate: {
    class: 'EVIDENCE_GATED',
    text: 'Technical claims remain subject to CURRENT Product & Technology, Claim Register and HOLD-TECH-T2B.',
  },
} satisfies Record<string, ControlledContent | JourneyStage[] | IndustrialisationStage[]>;
