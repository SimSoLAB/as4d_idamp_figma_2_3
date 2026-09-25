import { useState, useCallback } from 'react';
import { ImpactWorkbench } from './impact/ImpactWorkbench.tsx';
import { DownloadSrcBtn } from './SrcExport';

// ── Site inventory ─────────────────────────────────────────────────────────────
const SITE_MANIFEST = {
  meta: {
    title: 'iDAMP.repair',
    url: 'https://idamp.repair',
    stack: ['React 19', 'Vite 8', 'TypeScript 5.7', 'Tailwind CSS v4'],
    lastIndexed: new Date().toISOString(),
  },
  sections: [
    {
      id: 'section-01',
      num: '01',
      label: 'Hero',
      headline: 'iDAMP.repair',
      subheadline: 'Integrated Damage Assessment & Repair',
      copy: 'Working industrialisation architecture. Technical performance, qualification and release claims remain governed outside this interface.',
      components: ['WaveformCanvas', 'AnimatedBlade', 'NavBar'],
      assets: ['ellipse-glow.svg', 'turbine-a.jpg', 'turbine-b.jpg', 'turbine-c.jpg'],
      links: [],
      status: 'complete',
    },
    {
      id: 'section-02',
      num: '02',
      label: 'Two Specialists',
      headline: 'Who makes it possible?',
      subheadline: null,
      copy: 'Hyphen Innovations and additiveSTREAM — two specialists, one integrated system.',
      components: ['SpecialistCard', 'LogoLockup'],
      assets: ['logo-hyphen.png', 'logo-additivestream.png', 'logo-hybrd.png', 'logo-am-repair.png'],
      links: ['hypheninnovations.com', 'additivestream.de'],
      status: 'complete',
    },
    {
      id: 'section-03',
      num: '03',
      label: 'Proof In Motion',
      headline: 'Show me the proof.',
      subheadline: 'Evidence-gated. Integration path visible.',
      copy: 'Demonstration surfaces are references only; proposition-specific proof depends on controlled evidence and provenance.',
      components: ['ProofVideoCard'],
      assets: ['file-1.mp4', 'aS4D_trailer_hybrd.AM.mp4'],
      links: [],
      status: 'complete',
    },
    {
      id: 'section-04',
      num: '04',
      label: 'Integration Path',
      headline: 'Integration Path',
      subheadline: null,
      copy: 'Three steps: Assess, Repair, Certify. Each phase feeds the next with structured data.',
      components: ['IntegrationStep'],
      assets: ['tca55-damage.png', 'tca55-cut-prepare.png', 'tca55-repair.png'],
      links: [],
      status: 'complete',
    },
    {
      id: 'section-05',
      num: '05',
      label: 'One System',
      headline: 'One System',
      subheadline: 'The architecture that closes the loop',
      copy: 'Scan → Scrap/Repair decision → IIoT data layer → LPBF / DED / CNC execution → Verification.',
      components: ['ArchitectureDiagram', 'NodeOverlay', 'DetailPanel'],
      assets: [],
      links: [],
      status: 'complete',
      nodes: ['Scan', 'Scrap/Repair', 'IIoT', 'LPBF', 'DED', 'CNC', 'Verification'],
    },
    {
      id: 'section-06',
      num: '06',
      label: 'Evidence Landscape',
      headline: 'Evidence Landscape',
      subheadline: null,
      copy: 'Partner and event landscape shown as reference. Validation scope is proposition-specific and evidence-gated.',
      components: ['PartnerMarquee'],
      assets: [
        'partner-fraunhofer.png', 'partner-icesco.png', 'partner-3t.png',
        'partner-toolcraft.png', 'partner-zeiss.png', 'partner-hyphen.png',
        'partner-amf3.png', 'partner-a3ds.png', 'partner-taag.png', 'partner-dod.png',
      ],
      links: [],
      status: 'complete',
    },
    {
      id: 'section-07',
      num: '07',
      label: 'Insights',
      headline: 'Insights',
      subheadline: null,
      copy: 'Contact form and event announcements.',
      components: ['ContactForm', 'EventCard'],
      assets: ['event-icam26.png', 'event-as4d-fraunhofer.png'],
      links: [],
      status: 'complete',
    },
  ],
  assetInventory: {
    total: 120,
    byType: { png: 28, svg: 82, mp4: 2, jpg: 3, other: 5 },
    videoPaths: ['/assets/file-1.mp4', '/assets/aS4D_trailer_hybrd.AM.mp4'],
  },
};

type Section = typeof SITE_MANIFEST.sections[number];

// ── Status badge ───────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  return (
    <span className="inline-block px-1.5 py-0.5 text-[10px] tracking-widest font-['Barlow:SemiBold'] uppercase bg-emerald-950 text-emerald-400 border border-emerald-800 rounded-sm">
      {status}
    </span>
  );
}

// ── Section row ────────────────────────────────────────────────────────────────
function SectionRow({ section, selected, onSelect }: {
  section: Section;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={`w-full text-left px-3 py-2.5 border-b border-white/5 transition-colors cursor-pointer ${
        selected ? 'bg-white/8' : 'hover:bg-white/4'
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-['Barlow:SemiBold'] text-white/30 w-5">{section.num}</span>
          <span className="text-[12px] font-['Barlow:Medium'] text-white/80">{section.label}</span>
        </div>
        <StatusBadge status={section.status} />
      </div>
    </button>
  );
}

// ── Detail panel ───────────────────────────────────────────────────────────────
function SectionDetail({ section }: { section: Section }) {
  const [copied, setCopied] = useState(false);

  const exportJson = useCallback(() => {
    const blob = new Blob([JSON.stringify(section, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `idamp_section_${section.num}_${section.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [section]);

  const copyJson = useCallback(() => {
    navigator.clipboard.writeText(JSON.stringify(section, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }, [section]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-[10px] font-['Barlow:SemiBold'] text-white/30 uppercase tracking-widest mb-0.5">
            Section {section.num}
          </p>
          <h3 className="text-[15px] font-['Barlow:Bold'] text-white leading-tight">{section.label}</h3>
        </div>
        <StatusBadge status={section.status} />
      </div>

      <div className="space-y-3">
        <Field label="Headline" value={section.headline} />
        {section.subheadline && <Field label="Subheadline" value={section.subheadline} />}
        <Field label="Copy" value={section.copy} />
      </div>

      <div className="space-y-2">
        <FieldList label="Components" items={section.components} color="blue" />
        <FieldList label="Assets" items={section.assets} color="amber" />
        {section.links.length > 0 && <FieldList label="Links" items={section.links} color="violet" />}
        {'nodes' in section && section.nodes && (
          <FieldList label="Nodes" items={section.nodes} color="cyan" />
        )}
      </div>

      <div className="flex gap-2 pt-1">
        <button
          onClick={copyJson}
          className="flex-1 py-1.5 text-[11px] font-['Barlow:SemiBold'] tracking-wider uppercase border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-colors rounded-sm"
        >
          {copied ? 'Copied ✓' : 'Copy JSON'}
        </button>
        <button
          onClick={exportJson}
          className="flex-1 py-1.5 text-[11px] font-['Barlow:SemiBold'] tracking-wider uppercase border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-colors rounded-sm"
        >
          Export .json
        </button>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[9px] font-['Barlow:SemiBold'] uppercase tracking-widest text-white/30 mb-0.5">{label}</p>
      <p className="text-[12px] font-['Barlow:Light'] text-white/70 leading-relaxed">{value}</p>
    </div>
  );
}

const colorMap: Record<string, string> = {
  blue: 'bg-blue-950 text-blue-300 border-blue-800',
  amber: 'bg-amber-950 text-amber-300 border-amber-800',
  violet: 'bg-violet-950 text-violet-300 border-violet-800',
  cyan: 'bg-cyan-950 text-cyan-300 border-cyan-800',
};

function FieldList({ label, items, color }: { label: string; items: string[]; color: string }) {
  return (
    <div>
      <p className="text-[9px] font-['Barlow:SemiBold'] uppercase tracking-widest text-white/30 mb-1">{label}</p>
      <div className="flex flex-wrap gap-1">
        {items.map(item => (
          <span
            key={item}
            className={`inline-block px-1.5 py-0.5 text-[10px] border rounded-sm ${colorMap[color] ?? colorMap.blue}`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Meta header ────────────────────────────────────────────────────────────────
function MetaHeader() {
  const [exportedAll, setExportedAll] = useState(false);

  const exportAll = useCallback(() => {
    const blob = new Blob([JSON.stringify(SITE_MANIFEST, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'idamp_repair_site_manifest.json';
    a.click();
    URL.revokeObjectURL(url);
    setExportedAll(true);
    setTimeout(() => setExportedAll(false), 2000);
  }, []);

  return (
    <div className="px-3 py-3 border-b border-white/10">
      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="text-[9px] font-['Barlow:SemiBold'] uppercase tracking-widest text-white/30">Analysis Layer</p>
          <p className="text-[13px] font-['Barlow:Bold'] text-white">iDAMP.repair</p>
        </div>
        <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_theme(colors.emerald.400)]" />
      </div>
      <div className="flex gap-3 text-[10px] font-['Barlow:Light'] text-white/40 mb-2.5">
        <span>{SITE_MANIFEST.sections.length} sections</span>
        <span>{SITE_MANIFEST.assetInventory.total} assets</span>
        <span>{SITE_MANIFEST.assetInventory.byType.mp4} videos</span>
      </div>
      <button
        onClick={exportAll}
        className="w-full py-1.5 text-[10px] font-['Barlow:SemiBold'] tracking-wider uppercase bg-white/5 hover:bg-white/10 border border-white/15 text-white/70 hover:text-white transition-colors rounded-sm"
      >
        {exportedAll ? 'Exported ✓' : 'Export full manifest.json'}
      </button>
    </div>
  );
}

// ── Main overlay ───────────────────────────────────────────────────────────────

export function AnalysisLayer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DownloadSrcBtn />
      <button
        onClick={() => setOpen(v => !v)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-3 py-2 bg-black/90 border border-white/20 hover:border-white/40 text-white/60 hover:text-white text-[10px] font-['Barlow:SemiBold'] uppercase tracking-widest transition-all rounded-sm shadow-lg backdrop-blur-sm"
        title="Toggle Analysis Workbench"
      >
        <span className={`w-1.5 h-1.5 rounded-full ${open ? 'bg-emerald-400' : 'bg-white/30'}`} />
        {open ? 'Close' : 'Intelligence'}
      </button>

      {open && <ImpactWorkbench onClose={() => setOpen(false)} />}
    </>
  );
}
