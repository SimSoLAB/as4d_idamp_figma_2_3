import { useState } from 'react';
import assetManifest from './imports/asset-manifest.json';

// ── Data ──────────────────────────────────────────────────────────────────────

const journeys = [
  {
    id: 'J-1042', source: 'LinkedIn', age: '02:41', depth: '6/7',
    signal: 'CROSS-LAYER + EVIDENCE',
    path: [['01','ENTRY'],['02','aS4D'],['03','REPAIR VIDEO'],['04','INTEGRATE'],['05','LPBF'],['05','VERIFY'],['07','WHITEPAPER']],
    themes: ['REPAIR','LPBF','VERIFICATION','PROOF'],
    identity: 'explicit action', action: 'Whitepaper request',
  },
  {
    id: 'J-1039', source: 'Direct', age: '04:12', depth: '5/7',
    signal: 'SYSTEM EXPLORATION',
    path: [['01','ENTRY'],['02','HYPHEN'],['03','FUNCTION TEST'],['04','FUNCTIONAL REVEAL'],['05','SCANNING'],['05','DECISION']],
    themes: ['DAMPING','TESTING','SCANNING','DECISION'],
    identity: 'anonymous', action: 'None',
  },
  {
    id: 'J-1034', source: 'Event QR', age: '01:38', depth: '4/7',
    signal: 'PROOF ENGAGEMENT',
    path: [['01','ENTRY'],['03','REPAIR VIDEO'],['04','REPAIR'],['05','DED']],
    themes: ['REPAIR','DED','PROOF'],
    identity: 'anonymous', action: 'None',
  },
  {
    id: 'J-1028', source: 'Partner referral', age: '05:05', depth: '7/7',
    signal: 'EVIDENCE SEEKING',
    path: [['01','ENTRY'],['02','aS4D'],['03','REPAIR VIDEO'],['04','INTEGRATE'],['05','LPBF'],['06','PARTNERS'],['07','FORM START']],
    themes: ['REPAIR','LPBF','PARTNER_EVIDENCE'],
    identity: 'anonymous', action: 'Form start',
  },
];

const themes = [
  { label: 'REPAIR', w: 88 }, { label: 'LPBF', w: 69 }, { label: 'VERIFICATION', w: 57 },
  { label: 'TESTING', w: 51 }, { label: 'SCANNING', w: 42 }, { label: 'DAMPING', w: 39 },
  { label: 'DED', w: 26 }, { label: 'CNC', w: 19 },
];

const hypotheses = [
  {
    id: 'HYP-021', status: 'OBSERVING',
    title: 'Repair proof → execution-system depth',
    desc: 'Expected sequence: REPAIR IN ACTION → INTEGRATE → LPBF or VERIFICATION. Compare with otherwise similar journeys without active proof engagement.',
  },
  {
    id: 'HYP-024', status: 'OPEN',
    title: 'Hyphen proof → testing-oriented exploration',
    desc: 'Expected sequence: FUNCTION UNDER TEST → functional reveal → verification/testing-oriented system or evidence exploration.',
  },
  {
    id: 'HYP-027', status: 'OBSERVING',
    title: 'Cross-layer depth precedes explicit evidence request',
    desc: 'Observe whether explicit whitepaper actions are more frequently preceded by capability + proof + system exploration than by shallow direct visits.',
  },
];

const qualityGates = [
  { gate: 'Schema versioning', design: 'DEFINED', production: 'OPEN', note: 'Every event must declare a version.' },
  { gate: 'Event delivery coverage', design: 'DEFINED', production: 'OPEN', note: 'Measure loss before interpreting sequence concentration.' },
  { gate: 'Ordering integrity', design: 'DEFINED', production: 'OPEN', note: 'Server timestamps + sequence position required.' },
  { gate: 'Visibility accuracy', design: 'DEFINED', production: 'OPEN', note: 'Exposure thresholds require validation.' },
  { gate: 'Consent / privacy treatment', design: 'BOUNDARY ONLY', production: 'OPEN GATE', note: 'No legal conclusion is made in this design.' },
  { gate: 'Identity link auditability', design: 'DEFINED', production: 'OPEN', note: 'Explicit voluntary action + link reason only.' },
];

// ── Tiny helpers ──────────────────────────────────────────────────────────────

const rule = 'border-[#2e2e2e]';

function Kicker({ children }: { children: React.ReactNode }) {
  return <p className="text-[10px] font-['Barlow:SemiBold'] tracking-[.14em] text-[#6d6d68] uppercase mb-1.5">{children}</p>;
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-l-2 border-[#F2B632] pl-3.5 py-3 pr-3 bg-[#17150f] text-[#999388] text-[11px] leading-relaxed">
      {children}
    </div>
  );
}

function Tag({ label, green }: { label: string; green?: boolean }) {
  return (
    <span className={`border px-2 py-1 text-[9px] tracking-[.07em] ${green ? 'border-[rgba(0,138,70,.35)] text-[#58b584] bg-[rgba(0,138,70,.05)]' : 'border-[#2c2c2c] text-[#8e8e88]'}`}>
      {label}
    </span>
  );
}

function StatusChip({ s }: { s: string }) {
  const color = s === 'OBSERVING' ? 'text-[#58b584]' : s === 'OPEN' ? 'text-[#F2B632]' : 'text-[#cf6963]';
  return <span className={`border border-[#343434] px-2 py-1.5 text-[9px] tracking-[.08em] ${color}`}>{s}</span>;
}

function PanelHead({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className={`flex items-center gap-3.5 px-4 py-3.5 border-b ${rule}`}>
      <h3 className="font-['Barlow:SemiBold'] text-[13px] tracking-[.02em] m-0">{title}</h3>
      {sub && <span className="ml-auto text-[10px] text-[#62625d]">{sub}</span>}
    </div>
  );
}

function HeroRow({ kicker, headline, sub }: { kicker: string; headline: React.ReactNode; sub: string }) {
  return (
    <div className="flex items-end justify-between gap-8 mb-6">
      <div>
        <Kicker>{kicker}</Kicker>
        <h2 className="font-['Barlow:Bold'] text-[clamp(2.4rem,4vw,4.8rem)] m-0 leading-[.86] tracking-[-0.05em]">{headline}</h2>
      </div>
      <p className="max-w-[690px] text-[#85857f] text-[13px] leading-relaxed m-0 flex-shrink-0 w-[42%]">{sub}</p>
    </div>
  );
}

// ── Views ─────────────────────────────────────────────────────────────────────

function OverviewView() {
  const metrics = [
    { label: 'Journeys observed', value: '128', sub: 'SYNTHETIC DEMO DATA' },
    { label: 'Cross-layer depth', value: '37', sub: 'Capability → proof → system' },
    { label: 'Evidence-seeking', value: '19', sub: 'Deep evidence / explicit content' },
    { label: 'Explicit actions', value: '7', sub: 'Voluntary action only' },
  ];
  const stages = [
    { name: 'ENTRY', w: 100, n: 128 }, { name: 'CAPABILITY', w: 82, n: 105 },
    { name: 'PROOF', w: 62, n: 79 }, { name: 'APP PATH', w: 49, n: 63 },
    { name: 'SYSTEM', w: 41, n: 52 }, { name: 'EVIDENCE', w: 22, n: 28 },
    { name: 'ACTION', w: 5.5, n: 7 },
  ];
  return (
    <section>
      <HeroRow kicker="Working intelligence surface" headline={<>Observe paths.<br />Test hypotheses.</>}
        sub="The workbench reconstructs voluntary journeys across the seven-stage iDAMP.repair story. Sequence evidence is primary; isolated clicks and dwell remain supporting observations only." />
      <div className="grid grid-cols-4 gap-3 mb-3">
        {metrics.map(m => (
          <div key={m.label} className={`border ${rule} bg-[#151515] p-[18px]`}>
            <div className="text-[10px] text-[#686863] uppercase tracking-[.1em]">{m.label}</div>
            <strong className="block font-['Barlow:SemiBold'] text-[34px] mt-3 tracking-[-0.04em]">{m.value}</strong>
            <small className="text-[#686863] text-[10px]">{m.sub}</small>
          </div>
        ))}
      </div>
      {/* Asset Inventory — real data from asset-manifest.json */}
      <div className={`border ${rule} bg-[#141414] mb-3`}>
        <PanelHead title="Asset inventory" sub={`v90 basis · ${assetManifest.source_file}`} />
        <div className="px-4 py-3 flex flex-wrap gap-6">
          <div>
            <p className="text-[9px] text-[#686863] uppercase tracking-[.1em] mb-1">Unique assets</p>
            <strong className="font-['Barlow:SemiBold'] text-[22px] tracking-[-0.04em]">{assetManifest.unique_assets_extracted}</strong>
          </div>
          <div>
            <p className="text-[9px] text-[#686863] uppercase tracking-[.1em] mb-1">Total occurrences</p>
            <strong className="font-['Barlow:SemiBold'] text-[22px] tracking-[-0.04em]">{assetManifest.embedded_asset_occurrences_original}</strong>
          </div>
          <div>
            <p className="text-[9px] text-[#686863] uppercase tracking-[.1em] mb-1">Deduplicated</p>
            <strong className="font-['Barlow:SemiBold'] text-[22px] tracking-[-0.04em]">{assetManifest.deduplicated_occurrences}</strong>
          </div>
          <div className="flex gap-3 items-end ml-auto flex-wrap">
            {(['image/png','image/jpeg','image/svg+xml','video/mp4'] as const).map(mime => {
              const count = assetManifest.assets.filter(a => a.mime === mime).length;
              const label = mime === 'image/svg+xml' ? '.svg' : mime === 'image/jpeg' ? '.jpg' : mime === 'video/mp4' ? '.mp4' : '.png';
              return (
                <div key={mime} className="text-center">
                  <p className="text-[9px] text-[#686863] uppercase tracking-[.08em] mb-0.5">{label}</p>
                  <strong className="font-['Barlow:SemiBold'] text-[18px]">{count}</strong>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[1.35fr_.65fr] gap-3">
        <div className={`border ${rule} bg-[#141414]`}>
          <PanelHead title="Emerging sequence" sub="synthetic working example" />
          <div className="p-[18px] space-y-2.5">
            {stages.map(s => (
              <div key={s.name} className="grid grid-cols-[90px_1fr_70px] items-center gap-3">
                <span className="font-['Barlow:SemiBold'] text-[10px] text-[#787873] tracking-[.08em]">{s.name}</span>
                <div className="h-2.5 bg-[#202020] overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#008A46] to-[#70a950]" style={{ width: `${s.w}%` }} />
                </div>
                <span className="text-[10px] text-[#666] text-right">{s.n}</span>
              </div>
            ))}
            <Callout>This view may describe observed sequence concentration. It must not infer buying intent, pipeline status or person identity.</Callout>
          </div>
        </div>
        <div className={`border ${rule} bg-[#141414]`}>
          <PanelHead title="Active hypotheses" sub="3 observing" />
          <div className="p-[18px]">
            <h4 className="font-['Barlow:Bold'] text-[22px] m-0 mb-1.5">HYP-021</h4>
            <div className="text-[10px] text-[#686863] mb-4">OBSERVING · Repair proof → LPBF / Verification</div>
            <p className="text-[#7b7b75] text-[11px] leading-relaxed">Do visitors who actively engage with REPAIR IN ACTION subsequently explore LPBF and Verification more often than visitors without that proof interaction?</p>
            <div className="h-px bg-[#2e2e2e] my-4" />
            <div className="flex flex-wrap gap-1.5">
              {['REPAIR','LPBF','VERIFICATION'].map(t => <Tag key={t} label={t} green />)}
            </div>
            <div className="h-px bg-[#2e2e2e] my-4" />
            <p className="text-[#7b7b75] text-[11px] leading-relaxed">Review state: evidence collection only. No causal conclusion is generated automatically.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function JourneysView() {
  const [selected, setSelected] = useState(0);
  const j = journeys[selected];
  return (
    <section>
      <HeroRow kicker="Journey explorer" headline="Sequence before score."
        sub="Each row is an ordered anonymous journey. Select a journey to inspect the exact route, themes and explicit-action boundary." />
      <div className="grid grid-cols-[1.35fr_.65fr] gap-3">
        <div className={`border ${rule} bg-[#141414]`}>
          <PanelHead title="Journey stream" sub="synthetic examples" />
          <div>
            {journeys.map((jj, i) => (
              <button key={jj.id} onClick={() => setSelected(i)}
                className={`w-full grid grid-cols-[90px_120px_1fr_160px_80px] gap-3.5 items-center px-4 py-3.5 border-b border-[#232323] text-left cursor-pointer transition-colors ${i === selected ? 'bg-[#181818] shadow-[inset_2px_0_0_#008A46]' : 'hover:bg-[#181818]'}`}>
                <strong className="font-['Barlow:SemiBold'] text-[11px]">{jj.id}</strong>
                <span className="text-[#aaa] text-[11px]">{jj.source}</span>
                <div className="flex items-center overflow-hidden min-w-0">
                  {jj.path.slice(0, 5).map((p, k) => (
                    <span key={k} className="flex items-center">
                      {k > 0 && <span className="w-2.5 h-px bg-[#363636] flex-shrink-0" />}
                      <span className="text-[9px] whitespace-nowrap px-1.5 py-1 border border-[#292929] text-[#85857f] bg-[#101010]">{p[1]}</span>
                    </span>
                  ))}
                </div>
                <span className="text-[10px] text-[#8a8a84] tracking-[.05em]">{jj.signal}</span>
                <span className="font-['Barlow:SemiBold'] text-[11px] text-[#008A46]">{jj.depth}</span>
              </button>
            ))}
          </div>
        </div>
        <div className={`border ${rule} bg-[#141414]`}>
          <PanelHead title="Journey inspector" sub="ordered evidence" />
          <div className="p-[18px]">
            <h4 className="font-['Barlow:Bold'] text-[22px] m-0 mb-1.5">{j.id}</h4>
            <div className="text-[10px] text-[#686863] mb-4">{j.source} · {j.age} · {j.depth} stages · {j.identity}</div>
            <div className="flex flex-wrap gap-1.5 items-center mb-4">
              {j.path.map((p, k) => (
                <span key={k} className="flex items-center gap-1.5">
                  {k > 0 && <span className="text-[#4e4e49] text-xs">→</span>}
                  <span className="px-2 py-1.5 border border-[#2b2b2b] bg-[#101010] text-[10px]">{p[0]} · {p[1]}</span>
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {j.themes.map(t => <Tag key={t} label={t} green />)}
            </div>
            <div className="h-px bg-[#2e2e2e] mb-4" />
            <p className="text-[#7b7b75] text-[11px] leading-relaxed">
              <span className="text-[#aaa] font-semibold">Observed class:</span> {j.signal}<br />
              <span className="text-[#aaa] font-semibold">Explicit action:</span> {j.action}
            </p>
            <Callout>This is synthetic demonstration data. The class describes observed behavior only; it is not a lead score or buying-intent claim.</Callout>
          </div>
        </div>
      </div>
    </section>
  );
}

function ThemesView() {
  return (
    <section>
      <HeroRow kicker="Theme intelligence" headline="What gets voluntarily explored?"
        sub="Theme tags are attached to controlled interaction targets. Aggregation helps find repeated paths without upgrading them into commercial truth." />
      <div className="grid grid-cols-[1.35fr_.65fr] gap-3">
        <div className={`border ${rule} bg-[#141414]`}>
          <PanelHead title="Theme concentration" sub="synthetic working example" />
          <div className="p-[18px] grid grid-cols-2 gap-x-6 gap-y-2.5">
            {themes.map(t => (
              <div key={t.label} className="grid grid-cols-[120px_1fr_42px] gap-2.5 items-center">
                <span className="font-['Barlow:SemiBold'] text-[10px] tracking-[.05em]">{t.label}</span>
                <div className="h-1.5 bg-[#222]"><div className="h-full bg-[#008A46]" style={{ width: `${t.w}%` }} /></div>
                <span className="text-[10px] text-[#696964] text-right">{t.w}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={`border ${rule} bg-[#141414]`}>
          <PanelHead title="Repeated path" sub="observation, not causality" />
          <div className="p-[18px]">
            <h4 className="font-['Barlow:Bold'] text-[22px] m-0 mb-1.5">REPAIR → LPBF → VERIFICATION</h4>
            <div className="text-[10px] text-[#686863] mb-4">Observed sequence family</div>
            <div className="flex flex-wrap gap-1.5 items-center mb-4">
              {['REPAIR PROOF','INTEGRATE','LPBF','VERIFICATION'].map((p, k) => (
                <span key={p} className="flex items-center gap-1.5">
                  {k > 0 && <span className="text-[#4e4e49]">→</span>}
                  <span className="px-2 py-1.5 border border-[#2b2b2b] bg-[#101010] text-[10px]">{p}</span>
                </span>
              ))}
            </div>
            <p className="text-[#7b7b75] text-[11px] leading-relaxed">The tool can surface recurrence, source mix and downstream actions. Interpretation remains explicit and reviewable.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function HypothesesView() {
  return (
    <section>
      <HeroRow kicker="Hypothesis lab" headline="Register the question first."
        sub="Every hypothesis has a pre-defined expected sequence, comparison, observation rule and management review state. The evidence record stays separate from interpretation." />
      <div className="space-y-3">
        {hypotheses.map(h => (
          <div key={h.id} className={`border ${rule} bg-[#141414] grid grid-cols-[100px_1fr_170px] gap-4 p-[18px] items-start`}>
            <div className="font-['Barlow:SemiBold'] text-[10px] text-[#008A46]">{h.id}</div>
            <div>
              <h4 className="font-['Barlow:Bold'] text-[18px] m-0 mb-2">{h.title}</h4>
              <p className="m-0 text-[#7f7f79] text-[11px] leading-relaxed">{h.desc}</p>
            </div>
            <div className="flex justify-end">
              <StatusChip s={h.status} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ArchitectureView() {
  const boxes = [
    { title: 'v90 Experience', desc: 'Controlled sections, proof media, blade states, system nodes and explicit actions.' },
    { title: 'Semantic SDK', desc: 'Normalizes events into versioned schema + semantic tags.' },
    { title: 'First-Party Collector', desc: 'Server-facing ingestion endpoint on controlled domain.' },
    { title: 'Raw Event Store', desc: 'Append-only observation layer; interpretation never overwrites raw facts.' },
    { title: 'Sequence Engine', desc: 'Reconstructs sessions, ordered journeys and derived observation classes.' },
    { title: 'Workbench', desc: 'Journeys, themes, hypotheses, explicit actions and data-quality review.' },
  ];
  return (
    <section>
      <HeroRow kicker="Production architecture — working design" headline="First-party by design."
        sub="Vendor-neutral architecture. The design does not select hosting, analytics vendors, consent tooling or identity providers." />
      <div className={`border ${rule} bg-[#141414]`}>
        <PanelHead title="Data path" sub="bounded v0.1 architecture" />
        <div className="flex items-stretch gap-2 p-6 overflow-x-auto">
          {boxes.map((b, i) => (
            <span key={b.title} className="flex items-stretch gap-2 min-w-0">
              <div className="min-w-[150px] flex-1 border border-[#2b2b2b] bg-[#101010] p-4">
                <strong className="font-['Barlow:SemiBold'] text-[11px] block mb-2">{b.title}</strong>
                <p className="m-0 text-[#73736e] text-[10px] leading-relaxed">{b.desc}</p>
              </div>
              {i < boxes.length - 1 && <div className="grid place-items-center text-[#4b4b46] flex-shrink-0">→</div>}
            </span>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mt-3">
        {[
          { title: 'Separate identity store', desc: 'Person-level identity is not required for journey intelligence. A person record appears only after voluntary explicit submission and is linked with a recorded reason.' },
          { title: 'Interpretation layer stays reversible', desc: 'Raw events remain stable. Theme mapping, sequence rules and hypothesis interpretations can evolve without rewriting historical observations.' },
        ].map(c => (
          <div key={c.title} className={`border ${rule} bg-[#141414] p-[18px]`}>
            <h4 className="font-['Barlow:Bold'] text-[19px] m-0 mb-2">{c.title}</h4>
            <p className="m-0 text-[#797974] text-[11px] leading-relaxed">{c.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function QualityView() {
  const stateColor = (s: string) =>
    s === 'DEFINED' ? 'text-[#58b584]' : s === 'OPEN' || s === 'OPEN GATE' ? 'text-[#F2B632]' : 'text-[#cf6963]';
  return (
    <section>
      <HeroRow kicker="Measurement validity" headline="Know when not to conclude."
        sub="Data quality is a first-class surface. Sequence intelligence is useful only when delivery, ordering, visibility and identity-link coverage are understood." />
      <div className={`border ${rule} bg-[#141414]`}>
        <PanelHead title="Quality gates" sub="working design states" />
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {['Gate','Design state','Production state','Meaning'].map(h => (
                <th key={h} className="px-3.5 py-3 border-b border-[#252525] text-left text-[9px] text-[#666] uppercase tracking-[.08em] font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {qualityGates.map(g => (
              <tr key={g.gate} className="hover:bg-[#181818] transition-colors">
                <td className="px-3.5 py-3 border-b border-[#252525] text-[11px]">{g.gate}</td>
                <td className={`px-3.5 py-3 border-b border-[#252525] text-[11px] ${stateColor(g.design)}`}>{g.design}</td>
                <td className={`px-3.5 py-3 border-b border-[#252525] text-[11px] ${stateColor(g.production)}`}>{g.production}</td>
                <td className="px-3.5 py-3 border-b border-[#252525] text-[11px] text-[#7b7b75]">{g.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function IdentityView() {
  return (
    <section>
      <HeroRow kicker="Explicit action boundary" headline={<>Identity is volunteered,<br />not inferred.</>}
        sub="The journey remains anonymous by default. Identity is introduced only through a controlled voluntary action such as a whitepaper request." />
      <div className="grid grid-cols-2 gap-3">
        <div className={`border ${rule} bg-[#141414] p-[18px]`}>
          <Kicker>Before action</Kicker>
          <h4 className="font-['Barlow:Bold'] text-[19px] m-0 mb-2">anonymous_session</h4>
          <p className="m-0 text-[#797974] text-[11px] leading-relaxed mb-4">Journey ID, sequence, semantic themes, source class and interaction evidence. No person-level identity is required.</p>
          <div className="flex flex-wrap gap-1.5 items-center">
            {['J-1042','REPAIR','LPBF','VERIFICATION'].map((p, k) => (
              <span key={p} className="flex items-center gap-1.5">
                {k > 0 && <span className="text-[#4e4e49]">→</span>}
                <span className="px-2 py-1.5 border border-[#2b2b2b] bg-[#101010] text-[10px]">{p}</span>
              </span>
            ))}
          </div>
        </div>
        <div className={`border ${rule} bg-[#141414] p-[18px]`}>
          <Kicker>After voluntary submit</Kicker>
          <h4 className="font-['Barlow:Bold'] text-[19px] m-0 mb-2">identity_record</h4>
          <p className="m-0 text-[#797974] text-[11px] leading-relaxed mb-4">Identity record is stored separately and linked to the anonymous journey with an explicit link reason such as WHITEPAPER_REQUEST.</p>
          <div className="flex flex-wrap gap-1.5 items-center">
            {['IDENTITY-104','J-1042'].map((p, k) => (
              <span key={p} className="flex items-center gap-1.5">
                {k > 0 && <span className="text-[#4e4e49]">↔</span>}
                <span className="px-2 py-1.5 border border-[#2b2b2b] bg-[#101010] text-[10px]">{p}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
      <Callout>
        Prohibited interpretation: IP/company signal → identified person. Organization-level enrichment, if ever considered, remains a separate technical and privacy/legal workstream.
      </Callout>
    </section>
  );
}

// ── Nav config ────────────────────────────────────────────────────────────────

const VIEWS = [
  { num: '01', label: 'Overview', id: 'overview', View: OverviewView },
  { num: '02', label: 'Journeys', id: 'journeys', View: JourneysView },
  { num: '03', label: 'Themes & Paths', id: 'themes', View: ThemesView },
  { num: '04', label: 'Hypothesis Lab', id: 'hypotheses', View: HypothesesView },
  { num: '05', label: 'Architecture', id: 'architecture', View: ArchitectureView },
  { num: '06', label: 'Data Quality', id: 'quality', View: QualityView },
  { num: '07', label: 'Explicit Actions', id: 'identity', View: IdentityView },
];

// ── Main export ───────────────────────────────────────────────────────────────

export function AnalysisWorkbench({ onClose }: { onClose: () => void }) {
  const [activeId, setActiveId] = useState('overview');
  const active = VIEWS.find(v => v.id === activeId) ?? VIEWS[0];

  return (
    <div className="fixed inset-0 z-50 flex bg-[#121212] text-white font-['Inter',system-ui,sans-serif] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-[252px] flex-shrink-0 border-r border-[#2e2e2e] bg-[#0f0f0f] flex flex-col sticky top-0 h-screen">
        <div className="font-['Barlow:Bold'] text-[21px] tracking-[-0.03em] mx-2 mt-6 mb-7">
          <span className="text-[#008A46]">iDAMP</span>.repair
          <small className="block mt-1.5 font-['Barlow:Medium'] text-[9px] tracking-[.12em] text-[#65655f] uppercase">Impact Intelligence</small>
        </div>
        <nav className="grid gap-1.5 px-2 flex-1">
          {VIEWS.map(v => (
            <button key={v.id} onClick={() => setActiveId(v.id)}
              className={`w-full flex items-center gap-3 border-0 px-3 py-2.5 text-left cursor-pointer border-l-2 transition-colors ${
                activeId === v.id
                  ? 'text-white border-[#008A46] bg-[#171717]'
                  : 'text-[#74746f] border-transparent hover:text-[#d0d0cb] hover:bg-[#151515]'
              }`}>
              <span className={`text-[9px] font-['Barlow:SemiBold'] tracking-[.08em] ${activeId === v.id ? 'text-[#008A46]' : 'text-[#555]'}`}>{v.num}</span>
              <span className="text-[13px]">{v.label}</span>
            </button>
          ))}
        </nav>
        <div className="border-t border-[#2e2e2e] px-3 py-4 text-[#5d5d58] text-[10px] leading-relaxed">
          <strong className="text-[#989892] font-semibold">WORKING DESIGN v0.1</strong><br />
          No production data.<br />All displayed journeys are synthetic.
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-[76px] flex items-center gap-4 px-7 border-b border-[#2e2e2e] sticky top-0 bg-[rgba(18,18,18,.94)] backdrop-blur-[14px] z-20 flex-shrink-0">
          <h1 className="font-['Barlow:SemiBold'] text-[16px] tracking-[.01em] m-0">Impact Intelligence Workbench</h1>
          <div className="flex-1" />
          <div className="flex items-center gap-1.5 border border-[#2e2e2e] px-2.5 py-1.5 text-[9px] tracking-[.08em] text-[#8b8b85] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#008A46] shadow-[0_0_0_4px_rgba(0,138,70,.10)]" />
            Experience basis · v90 clean
          </div>
          <div className="flex items-center gap-1.5 border border-[#2e2e2e] px-2.5 py-1.5 text-[9px] tracking-[.08em] text-[#8b8b85] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F2B632] shadow-[0_0_0_4px_rgba(242,182,50,.10)]" />
            Production measurement · OPEN
          </div>
          <button onClick={onClose}
            className="ml-2 px-3 py-1.5 text-[10px] font-['Barlow:SemiBold'] uppercase tracking-widest border border-[#2e2e2e] text-[#666] hover:text-white hover:border-white/30 transition-colors">
            Close
          </button>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-7">
          <active.View />
          <p className="mt-6 text-[#555] text-[10px] leading-relaxed">
            WORKING DESIGN v0.1 · Basis: idamp_repair_mockup_v90_forensic_clean_alignfix.html · SHA-256 a241b138f7221ad9… · No production data, no vendor selection, no privacy/legal conclusion, no claim release.
          </p>
        </div>
      </main>
    </div>
  );
}
