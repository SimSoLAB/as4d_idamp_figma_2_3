import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import WaveformCanvas from './WaveformCanvas';
import { AnalysisLayer } from './AnalysisLayer';

const assetPathPrefix = "/assets";

const imgHyphen1 = `${assetPathPrefix}/a1496.png`;
const imgAssetBrandAdditivestreamLogo = `${assetPathPrefix}/4c88f.png`;
const imgAssetTca55FunctionalRevealHighlighted = `${assetPathPrefix}/2ab31.png`;
const imgAssetHyphenEdgeTestingSystem = `${assetPathPrefix}/55528.png`;
const imgAssetIdampTurbomachineryComponent = `${assetPathPrefix}/e8540.png`;
const imgAssetHybrdAmWordmark = `${assetPathPrefix}/d0fc4.png`;
const imgAssetHybrdAmComponent = `${assetPathPrefix}/144d8.png`;
const imgAssetAmRepairWordmark = `${assetPathPrefix}/75947.png`;
const imgAssetAmRepairBlade = `${assetPathPrefix}/b9b60.png`;
const imgAssetTca55IdampIntegrated = `${assetPathPrefix}/747de.png`;
const imgAssetTca55Damage = `${assetPathPrefix}/9a12c.png`;
const imgAssetTca55CutPrepare = `${assetPathPrefix}/c1a29.png`;
const imgAssetTca55Repair = `${assetPathPrefix}/6b7b4.png`;
const imgAssetEventIcam26Banner = `${assetPathPrefix}/a1fff.png`;
const imgAssetEventAs4DLiveDemoFraunhofer = `${assetPathPrefix}/f857d.png`;
const imgAssetPartnerFraunhofer = `${assetPathPrefix}/aba92.png`;
const imgAssetPartnerIcesco = `${assetPathPrefix}/ea495.png`;
const imgAssetPartner3TAdditiveManufacturing = `${assetPathPrefix}/96a02.png`;
const imgAssetPartnerToolcraft = `${assetPathPrefix}/5a0b4.png`;
const imgAssetPartnerZeiss = `${assetPathPrefix}/5b329.png`;
const imgAssetPartnerHyphenInnovations = `${assetPathPrefix}/6eb23.png`;
const imgAssetPartnerAmf3 = `${assetPathPrefix}/e9469.png`;
const imgAssetPartnerA3Ds = `${assetPathPrefix}/26106.png`;
const imgAssetPartnerTaag = `${assetPathPrefix}/3fc61.png`;
const imgAssetPartnerDepartmentOfDefense = `${assetPathPrefix}/2348a.png`;
const imgEllipse1 = `${assetPathPrefix}/ac12f.svg`;
const imgEllipse2 = `${assetPathPrefix}/6504c.svg`;
const imgVector = `${assetPathPrefix}/5fdce.svg`;
const imgVector1 = `${assetPathPrefix}/eb4a0.svg`;
const imgVector2 = `${assetPathPrefix}/0573b.svg`;
const imgVector3 = `${assetPathPrefix}/5d083.svg`;
const imgVector4 = `${assetPathPrefix}/20477.svg`;
const imgVector5 = `${assetPathPrefix}/a0f92.svg`;
const imgVector6 = `${assetPathPrefix}/59f2a.svg`;
const imgVector7 = `${assetPathPrefix}/2cc5d.svg`;
const imgVector8 = `${assetPathPrefix}/4d28c.svg`;
const imgVector9 = `${assetPathPrefix}/8b994.svg`;
const imgVector10 = `${assetPathPrefix}/ff1de.svg`;
const imgVector11 = `${assetPathPrefix}/401c6.svg`;
const imgVector12 = `${assetPathPrefix}/ebd8a.svg`;
const imgVector13 = `${assetPathPrefix}/496fc.svg`;
const imgVector14 = `${assetPathPrefix}/20e6e.svg`;
const imgVector15 = `${assetPathPrefix}/d1d13.svg`;
const imgVector16 = `${assetPathPrefix}/ff61a.svg`;
const imgVector17 = `${assetPathPrefix}/aac32.svg`;
const imgVector18 = `${assetPathPrefix}/b5b20.svg`;
const imgVector19 = `${assetPathPrefix}/9b200.svg`;
const imgVector20 = `${assetPathPrefix}/3cad0.svg`;
const imgVector21 = `${assetPathPrefix}/4b50f.svg`;
const imgVector22 = `${assetPathPrefix}/2ad5e.svg`;
const imgVector23 = `${assetPathPrefix}/b6557.svg`;
const imgVector24 = `${assetPathPrefix}/9ba6d.svg`;
const imgVector25 = `${assetPathPrefix}/09447.svg`;
const imgVector26 = `${assetPathPrefix}/52246.svg`;
const imgVector27 = `${assetPathPrefix}/944a7.svg`;
const imgVector28 = `${assetPathPrefix}/89270.svg`;
const imgVector29 = `${assetPathPrefix}/29269.svg`;
const imgVector30 = `${assetPathPrefix}/31110.svg`;
const imgVector31 = `${assetPathPrefix}/55013.svg`;
const imgVector32 = `${assetPathPrefix}/ba012.svg`;
const imgVector33 = `${assetPathPrefix}/28515.svg`;
const imgVector34 = `${assetPathPrefix}/f9651.svg`;
const imgVector35 = `${assetPathPrefix}/edcc1.svg`;
const imgVector36 = `${assetPathPrefix}/bfdde.svg`;
const imgVector37 = `${assetPathPrefix}/bfbce.svg`;
const imgVector38 = `${assetPathPrefix}/c4b73.svg`;
const imgVector39 = `${assetPathPrefix}/6978d.svg`;
const imgVector40 = `${assetPathPrefix}/a8d00.svg`;
const imgVector41 = `${assetPathPrefix}/c2c4c.svg`;
const imgVector42 = `${assetPathPrefix}/6e082.svg`;
const imgVector43 = `${assetPathPrefix}/b762b.svg`;
const imgVector44 = `${assetPathPrefix}/e81d8.svg`;
const imgVector45 = `${assetPathPrefix}/3f8e6.svg`;
const imgVector46 = `${assetPathPrefix}/2e4d5.svg`;
const imgVector47 = `${assetPathPrefix}/7e759.svg`;
const imgVector48 = `${assetPathPrefix}/80d49.svg`;
const imgVector49 = `${assetPathPrefix}/96c17.svg`;
const imgVector50 = `${assetPathPrefix}/0b8b5.svg`;
const imgVector51 = `${assetPathPrefix}/0f600.svg`;
const imgVector52 = `${assetPathPrefix}/1b017.svg`;
const imgVector53 = `${assetPathPrefix}/a734c.svg`;
const imgVector54 = `${assetPathPrefix}/62e1e.svg`;
const imgVector55 = `${assetPathPrefix}/d0bbd.svg`;
const imgVector56 = `${assetPathPrefix}/c846d.svg`;
const imgVector57 = `${assetPathPrefix}/dec9d.svg`;
const imgVector58 = `${assetPathPrefix}/2764f.svg`;
const imgVector60 = `${assetPathPrefix}/51b63.svg`;
const imgVector61 = `${assetPathPrefix}/aafaa.svg`;
const imgVector62 = `${assetPathPrefix}/f103c.svg`;
const imgGroup8 = `${assetPathPrefix}/de076.svg`;
const imgVector63 = `${assetPathPrefix}/cfdc0.svg`;
const imgVector64 = `${assetPathPrefix}/a2094.svg`;
const imgVector65 = `${assetPathPrefix}/32146.svg`;
const imgGroup9 = `${assetPathPrefix}/9a2d3.svg`;
const imgGroup10 = `${assetPathPrefix}/c92d7.svg`;
const imgGroup = `${assetPathPrefix}/c2238.svg`;
const imgGroup1 = `${assetPathPrefix}/7fe1f.svg`;
const imgGroup2 = `${assetPathPrefix}/5e49a.svg`;
const imgGroup3 = `${assetPathPrefix}/78ce4.svg`;
const imgGroup4 = `${assetPathPrefix}/9a12c.png`;
const imgVector59 = `${assetPathPrefix}/a93fc.png`;
const imgVector66 = `${assetPathPrefix}/92e8d.png`;

const navItems = [
  { num: '01', label: 'iDAMP.repair', id: 'hero' },
  { num: '02', label: 'Capabilities', id: 'section-02' },
  { num: '03', label: 'Proof', id: 'section-03' },
  { num: '04', label: 'Integration Path', id: 'section-04' },
  { num: '05', label: 'One System', id: 'section-05' },
  { num: '06', label: 'Evidence Landscape', id: 'section-06' },
  { num: '07', label: 'Insights', id: 'section-07' },
];

const partnerLogos = [
  { src: '/assets/logo-exchange-1.svg', alt: 'GE Aerospace' },
  { src: '/assets/logo-exchange-2.svg', alt: 'TURBOCAM International' },
  { src: '/assets/logo-exchange-3.svg', alt: 'FANUC' },
  { src: '/assets/logo-exchange-4.png', alt: 'Exchange Partner' },
  { src: '/assets/14869.svg', alt: 'Fraunhofer' },
  { src: '/assets/07288.png', alt: '3T Additive Manufacturing' },
  { src: '/assets/e2e63.png', alt: 'Toolcraft' },
  { src: '/assets/3b0a6.svg', alt: 'Hyphen Innovations' },
  { src: '/assets/67684.svg', alt: 'a3Ds' },
  { src: '/assets/a1496.png', alt: 'Hyphen' },
  { src: '/assets/3337b.svg', alt: 'AMF3' },
  { src: '/assets/d57ff.svg', alt: 'TAAG' },
  { src: '/assets/b8bb4.png', alt: 'Research Partner' },
];

// Synced to waveform CYCLE = 20000ms: 4s green hold → 8s linear → gold → 8s linear → green
const TIMELINE_DURATION = 20;
const TIMELINE_TIMES = [0, 0.2, 0.6, 1] as const;
const TIMELINE_EASE = "linear";

const TURBINE_IMAGES = [
  '/assets/turbine-a.jpg',
  '/assets/turbine-b.jpg',
  '/assets/turbine-c.jpg',
];

function TurbineSlideshow() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % TURBINE_IMAGES.length), 8000);
    return () => clearInterval(id);
  }, []);
  return (
    <div
      className="absolute pointer-events-none overflow-hidden"
      style={{
        top: 0,
        left: 0,
        width: '52%',
        height: '100%',
        opacity: 0.13,
        maskImage: 'radial-gradient(ellipse 80% 90% at 30% 40%, black 30%, transparent 75%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 90% at 30% 40%, black 30%, transparent 75%)',
      }}
    >
      {TURBINE_IMAGES.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-[1500ms] ease-in-out"
          style={{ opacity: i === index ? 1 : 0 }}
        />
      ))}
    </div>
  );
}

function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Spec: Autoplay OFF | Loop ON | Muted OFF — <video loop> with play button overlay
function ProofVideoCard({ src, label, accentColor }: {
  src: string;
  label: string;
  accentColor: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [playing, setPlaying] = useState(false);
  const [posterUrl, setPosterUrl] = useState<string | null>(null);

  function capturePoster() {
    const v = videoRef.current;
    const c = canvasRef.current;
    if (!v || !c || posterUrl) return;
    c.width = v.videoWidth || 640;
    c.height = v.videoHeight || 360;
    const ctx = c.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(v, 0, 0);
    setPosterUrl(c.toDataURL('image/jpeg', 0.85));
  }

  function toggle() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else { v.pause(); setPlaying(false); }
  }

  return (
    <div className="h-[340px] overflow-clip relative shrink-0 w-full bg-[#141414]">
      <canvas ref={canvasRef} className="hidden" />
      <video
        ref={videoRef}
        src={src}
        poster={posterUrl ?? undefined}
        preload="metadata"
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        onLoadedData={capturePoster}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      {/* Play / pause overlay — hides when playing, shows on hover */}
      <button
        onClick={toggle}
        className={`absolute inset-0 flex flex-col items-center justify-center gap-3 cursor-pointer transition-opacity duration-200 ${playing ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}
        aria-label={playing ? 'Pause video' : 'Play video'}
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center transition-transform duration-150 hover:scale-110"
          style={{ background: `${accentColor}e0` }}
        >
          {playing ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect x="3" y="2" width="5" height="16" rx="1" fill="white" />
              <rect x="12" y="2" width="5" height="16" rx="1" fill="white" />
            </svg>
          ) : (
            <svg width="20" height="22" viewBox="0 0 20 22" fill="none">
              <path d="M2 2L18 11L2 20V2Z" fill="white" />
            </svg>
          )}
        </div>
        <p className="font-['Barlow:Medium'] text-[11px] tracking-[1.2px] text-[rgba(255,255,255,0.65)] uppercase">
          {label}
        </p>
      </button>
    </div>
  );
}

function ProgressBar({ active }: { active: number }) {
  return (
    <div className="flex gap-[2px] h-px items-start w-[190px]">
      {[1,2,3,4,5,6,7].map(i => (
        <div
          key={i}
          className="flex-1 h-full min-w-px"
          style={{ background: i === active ? '#008a46' : i < active ? 'rgba(255,255,255,0.2)' : '#2e2e2e' }}
        />
      ))}
    </div>
  );
}

function SectionHeader({ label, active }: { label: string; active: number }) {
  return (
    <div className="flex flex-col gap-[7px] items-start">
      <p className="font-['Barlow:SemiBold'] leading-normal text-[#8f8f89] text-[14px] whitespace-nowrap">
        {label}
      </p>
      <ProgressBar active={active} />
    </div>
  );
}

type NodeKey = 'scan' | 'scrap' | 'iiot' | 'lpbf' | 'ded' | 'cnc' | 'verify';
const NODE_DETAILS: Record<NodeKey, { role: string; title: string; desc: string; steps: { num: string; title: string; desc: string }[] }> = {
  scan: {
    role: 'ASSESS NODE',
    title: 'DED Scanning',
    desc: 'High-resolution structured-light and CT scanning captures the full 3D geometry of the damaged component. Point-cloud data is compared against the nominal CAD model to characterise defect geometry, depth, and extent.',
    steps: [
      { num: '01', title: 'ACQUIRE', desc: 'Structured-light / CT scan of damaged part' },
      { num: '02', title: 'REGISTER', desc: 'Align scan to nominal CAD reference' },
      { num: '03', title: 'OUTPUT', desc: 'Defect map + deviation report to Decide node' },
    ],
  },
  scrap: {
    role: 'DECISION NODE',
    title: 'Scrap or Repair',
    desc: 'The damage assessment report is evaluated against material, geometry, and economic thresholds. Parts within repair bounds are routed to the Prepare stage; parts outside bounds are flagged for controlled scrapping.',
    steps: [
      { num: '01', title: 'EVALUATE', desc: 'Damage extent vs. repairability criteria' },
      { num: '02', title: 'DECIDE', desc: 'Repair path or scrap authorisation' },
      { num: '03', title: 'RECORD', desc: 'Decision rationale captured in iDAMP trace' },
    ],
  },
  iiot: {
    role: 'PLATFORM NODE',
    title: 'IIoT Platform',
    desc: 'The shopfloor integration layer connects every execution node through a unified data bus. Process parameters, sensor streams, and quality records flow into a single repair trace that follows the part from assessment to final verification.',
    steps: [
      { num: '01', title: 'CONNECT', desc: 'Machine interfaces and sensor bridges' },
      { num: '02', title: 'ORCHESTRATE', desc: 'Job dispatch and sequence control' },
      { num: '03', title: 'TRACE', desc: 'Full data lineage from scan to sign-off' },
    ],
  },
  lpbf: {
    role: 'EXECUTION NODE',
    title: 'LPBF',
    desc: 'Laser Powder Bed Fusion receives the prepared repair definition and executes layer-by-layer fusion to rebuild the damage zone with full density and metallurgical bonding to the substrate.',
    steps: [
      { num: '01', title: 'PREPARED INPUT', desc: 'Repair / build definition' },
      { num: '02', title: 'EXECUTE', desc: 'LPBF manufacturing step' },
      { num: '03', title: 'RETURN', desc: 'Part + execution context to verification' },
    ],
  },
  ded: {
    role: 'EXECUTION NODE',
    title: 'DED',
    desc: 'Directed Energy Deposition deposits material precisely onto the damage zone using a focused energy source. DED enables repair of large cross-sections and complex contours that are inaccessible to powder-bed processes.',
    steps: [
      { num: '01', title: 'TOOL PATH', desc: 'Repair volume segmented into deposition layers' },
      { num: '02', title: 'DEPOSIT', desc: 'Layer-by-layer material build-up in defect zone' },
      { num: '03', title: 'RETURN', desc: 'Near-net-shape part forwarded to CNC or verify' },
    ],
  },
  cnc: {
    role: 'EXECUTION NODE',
    title: 'CNC',
    desc: 'Post-deposition CNC machining restores final geometry, surface finish, and dimensional tolerances. The CNC step is driven by the deviation map from the Scan node and closes the loop to as-designed specification.',
    steps: [
      { num: '01', title: 'FIXTURE', desc: 'Part registered from additive coordinate frame' },
      { num: '02', title: 'MACHINE', desc: 'Contour and finish to nominal geometry' },
      { num: '03', title: 'RETURN', desc: 'Machined part with geometric report to verify' },
    ],
  },
  verify: {
    role: 'VERIFICATION NODE',
    title: 'Verification',
    desc: 'Dimensional, material, and functional checks confirm the repaired component meets original specification. Results are stored in the iDAMP repair trace and form the evidence package for qualification and sign-off.',
    steps: [
      { num: '01', title: 'MEASURE', desc: 'CMM / scan vs. nominal deviation analysis' },
      { num: '02', title: 'TEST', desc: 'iDAMP functional damping validation' },
      { num: '03', title: 'CERTIFY', desc: 'Evidence package generated for quality release' },
    ],
  },
};

export default function App() {
  const [activeNav, setActiveNav] = useState(0);
  const [selectedNode, setSelectedNode] = useState<NodeKey>('lpbf');
  const [formData, setFormData] = useState({ name: '', email: '', company: '', role: '', context: '' });

  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = sectionRefs.current.indexOf(entry.target as HTMLElement);
            if (idx !== -1) setActiveNav(idx);
          }
        });
      },
      { threshold: 0.3 }
    );
    sectionRefs.current.forEach(el => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
    <div className="bg-[#121212] flex flex-col items-start w-full min-h-dvh max-w-[1440px] mx-auto">
      {/* Header */}
      <header className="bg-[rgba(10,10,10,0.94)] border-b border-[rgba(255,255,255,0.07)] flex h-[72px] items-center px-12 w-full sticky top-0 z-50">
        <div className="flex gap-[10px] items-center shrink-0 w-[222px]">
          <div className="h-[31px] w-[72px] relative shrink-0">
            <img alt="Hyphen" className="absolute inset-0 max-w-none object-cover size-full pointer-events-none" src={imgHyphen1} />
          </div>
          <p className="font-['Inter:Regular'] font-normal text-[14px] text-[rgba(255,255,255,0.22)] whitespace-nowrap">×</p>
          <div className="h-[31px] w-[116px] relative shrink-0">
            <img alt="additiveSTREAM" className="absolute inset-0 max-w-none object-contain size-full pointer-events-none" src={imgAssetBrandAdditivestreamLogo} />
          </div>
        </div>
        <div className="flex-1" />
        <nav className="hidden lg:flex gap-5 items-center">
          {navItems.map((item, i) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="flex flex-col gap-[6px] items-start cursor-pointer"
            >
              <div className={`flex font-['Barlow:Medium'] gap-[5px] items-start text-[16px] whitespace-nowrap transition-colors ${activeNav === i ? 'text-white' : 'text-[#6f6f6b]'}`}>
                <span className={`text-[9px] ${activeNav === i ? 'text-[#008a46]' : ''}`}>{item.num}</span>
                <span>{item.label}</span>
              </div>
              <div className={`h-[2px] w-full transition-colors ${activeNav === i ? 'bg-[#008a46]' : 'bg-transparent'}`} />
            </button>
          ))}
        </nav>
      </header>

      {/* Section 01 — Hero */}
      <section
        id="idamp"
        data-track-section="idamp_hero"
        data-route-step="01"
        data-section-name="IDAMP.REPAIR"
        data-section-no="01"
        ref={el => { sectionRefs.current[0] = el; }}
        className="h-[668px] overflow-clip relative shrink-0 w-full"
      >
        <div className="absolute bg-[#121212] h-[828px] left-0 top-0 w-full" />

        {/* Turbine slideshow — top-left, very light transparent */}
        <TurbineSlideshow />

        {/* node 1:62 — Waveform background */}
        <motion.div
          className="absolute left-0 right-0 top-[100px] h-[300px] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.1, ease: 'easeInOut' }}
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 32%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 32%)',
          }}
        >
          <WaveformCanvas />
        </motion.div>

        {/* Blade — slides in from right */}
        <motion.div
          data-track-region="hero_blade"
          className="absolute flex flex-col items-center justify-center left-[848px] overflow-clip top-[70px] w-[399px] h-[527px]"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[123.18%] left-[-96.01%] max-w-none top-[-7.57%] w-[299%]" src={imgAssetTca55FunctionalRevealHighlighted} />
          </div>
          {/* node 1:64 — Ellipse 1: synced to waveform cycle — green during red phase, gold during damped phase */}
          <motion.div
            className="absolute h-[92.5px] left-[143.58px] top-[49.11px] w-[94px]"
            initial={{ opacity: 0, filter: 'hue-rotate(105deg)' }}
            animate={{
              opacity: [0, 0, 0.7, 0],
              filter: ['hue-rotate(105deg)', 'hue-rotate(105deg)', 'hue-rotate(0deg)', 'hue-rotate(105deg)'],
            }}
            transition={{ duration: TIMELINE_DURATION, times: [...TIMELINE_TIMES], ease: TIMELINE_EASE, repeat: Infinity }}
          >
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse1} />
          </motion.div>
          {/* node 1:65 — Ellipse 2: synced to waveform cycle */}
          <motion.div
            className="absolute h-[75px] left-[239px] top-[74px] w-[27px]"
            initial={{ opacity: 0, filter: 'hue-rotate(105deg)' }}
            animate={{
              opacity: [0, 0, 0.7, 0],
              filter: ['hue-rotate(105deg)', 'hue-rotate(105deg)', 'hue-rotate(0deg)', 'hue-rotate(105deg)'],
            }}
            transition={{ duration: TIMELINE_DURATION, times: [...TIMELINE_TIMES], ease: TIMELINE_EASE, repeat: Infinity }}
          >
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse2} />
          </motion.div>
        </motion.div>

        {/* Hero copy — staggered entrance */}
        <div className="absolute flex h-[336px] items-start left-[89px] overflow-clip top-[308px] w-[770px]">
          <div className="flex flex-col gap-[12px] items-start overflow-clip w-[700px]">

            {/* Headline */}
            <div className="overflow-hidden">
              <motion.div
                className="flex font-['Barlow:Bold'] items-start leading-normal text-[128px] tracking-[-7.04px] whitespace-nowrap"
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="shrink-0 text-[#d9d9d5]">iDAMP</p>
                {/* node 1:70 — .repair color cycle 16s loop */}
                <motion.p
                  className="shrink-0"
                  initial={{ color: '#008A46' }}
                  animate={{ color: ['#008A46', '#008A46', '#F2B632', '#008A46'] }}
                  transition={{ color: { duration: TIMELINE_DURATION, times: [...TIMELINE_TIMES], ease: TIMELINE_EASE, repeat: Infinity } }}
                >
                  .repair
                </motion.p>
              </motion.div>
            </div>

            {/* Subheadline */}
            <motion.p
              className="font-['Barlow:SemiBold'] leading-normal text-[#d9d9d5] text-[24px] w-[700px]"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              Functional damping becomes part of the repair.
            </motion.p>

            {/* Body copy */}
            <motion.div
              className="font-['Inter:Regular'] font-normal text-[#c8c8c8] text-[15px]"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="leading-[1.43] mb-0">Hyphen brings iDAMP and testing.</p>
              <p className="leading-[1.43] mb-0">aS4D brings repair and industrialisation.</p>
              <p className="leading-[1.43]">Together, one route from functional technology to industrial application.</p>
            </motion.div>

          </div>
        </div>

        {/* Scroll indicator — fades in late, then pulses */}
        <motion.p
          className="absolute font-['Barlow:Medium'] font-medium leading-normal left-1/2 -translate-x-1/2 text-[#555] text-[9px] text-center top-[620px] tracking-[1.08px] uppercase whitespace-nowrap"
          style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0, 0.6, 0.3, 0.6] }}
          transition={{ duration: 3, delay: 1.8, times: [0, 0.3, 0.6, 0.8, 1], ease: 'easeInOut', repeat: Infinity, repeatDelay: 1 }}
        >
          SCROLL TO FOLLOW THE CAPABILITY CHAIN ↓
        </motion.p>
      </section>

      {/* Section 02 — Two Specialists */}
      <section
        id="capabilities"
        data-track-section="capabilities"
        data-route-step="02"
        data-section-name="TWO SPECIALISTS"
        data-section-no="02"
        ref={el => { sectionRefs.current[1] = el; }}
        className="flex flex-col items-start w-full"
      >
        <div className="bg-[rgba(255,255,255,0.09)] h-px w-full shrink-0" />
        <div className="flex flex-col gap-6 items-start overflow-clip pb-16 pt-12 px-12 w-full">
          <FadeUp><SectionHeader label="Who makes it possible?" active={2} /></FadeUp>
          <FadeUp delay={0.1} className="flex flex-col gap-[14px] items-start text-[#d9d9d5]">
            <div className="font-['Barlow:Bold'] text-[58px] tracking-[-2.784px]">
              <p className="leading-[0.88] mb-0">TWO SPECIALISTS</p>
              <p className="leading-[0.88]">ONE PATH TO APPLICATION</p>
            </div>
            <p className="font-['Barlow:SemiBold'] leading-normal text-[24px] max-w-5xl">
              Hyphen brings functional technology, testing and evidence. aS4D brings integration, repair and industrialisation.
            </p>
          </FadeUp>
          <div className="flex gap-[18px] items-start w-full flex-col md:flex-row">
            {/* Hyphen Card */}
            <FadeUp delay={0.15} className="flex flex-1 min-w-0">
            <div className="bg-[#171717] flex flex-1 flex-col items-start overflow-clip pb-6 px-6 relative min-w-0" data-track-region="company_hyphen">
              <div className="absolute bg-[#efc125] h-[2px] left-0 top-0 w-full" />
              <div className="flex items-start overflow-clip py-6 w-full">
                <div className="h-[54px] w-[128px] relative shrink-0">
                  <img alt="Hyphen" className="absolute inset-0 max-w-none object-cover size-full pointer-events-none" src={imgHyphen1} />
                </div>
              </div>
              <div className="border-t border-[#2e2e2e] flex gap-[18px] items-start py-[18px] w-full">
                <div className="flex flex-1 flex-col gap-2 items-start min-w-0">
                  <p className="font-['Barlow:Bold'] leading-normal text-[34px] text-white">EDGE</p>
                  <div className="font-['Inter:Regular'] font-normal text-[#969691] text-[13px]">
                    <p className="leading-[1.42] mb-0">Hardware-enabled fatigue testing turns structural</p>
                    <p className="leading-[1.42]">response into evidence for the next development step.</p>
                  </div>
                </div>
                <div className="h-[140px] w-[160px] relative shrink-0">
                  <img alt="EDGE Testing System" className="absolute inset-0 max-w-none object-contain size-full pointer-events-none" src={imgAssetHyphenEdgeTestingSystem} />
                </div>
              </div>
              <div className="border-t border-[#2e2e2e] flex gap-[18px] items-start py-[18px] w-full">
                <div className="flex flex-1 flex-col gap-2 items-start min-w-0">
                  <p className="font-['Barlow:Bold'] leading-normal text-[34px] text-white">iDAMP</p>
                  <div className="font-['Inter:Regular'] font-normal text-[#969691] text-[13px]">
                    <p className="leading-[1.42] mb-0">Functional damping is integrated into</p>
                    <p className="leading-[1.42]">turbomachinery components and verified through test.</p>
                  </div>
                </div>
                <div className="h-[140px] w-[160px] relative shrink-0">
                  <img alt="iDAMP Turbomachinery Component" className="absolute inset-0 max-w-none object-contain size-full pointer-events-none" src={imgAssetIdampTurbomachineryComponent} />
                </div>
              </div>
            </div>

            </FadeUp>
            {/* additiveSTREAM Card */}
            <FadeUp delay={0.25} className="flex flex-1 min-w-0">
            <div className="bg-[#171717] flex flex-1 flex-col items-start overflow-clip pb-6 px-6 relative min-w-0" data-track-region="company_as4d">
              <div className="absolute bg-[#008a46] h-[2px] left-0 top-0 w-full" />
              <div className="flex items-start overflow-clip py-6 w-full">
                <div className="h-[54px] w-[216px] relative shrink-0">
                  <img alt="additiveSTREAM" className="absolute inset-0 max-w-none object-contain size-full pointer-events-none" src={imgAssetBrandAdditivestreamLogo} />
                </div>
              </div>
              <div className="border-t border-[#2e2e2e] flex gap-[18px] items-start py-[18px] w-full">
                <div className="flex flex-1 flex-col gap-2 items-start min-w-0">
                  <div className="h-[41px] w-[187px] relative shrink-0">
                    <img alt="hybrd.AM" className="absolute inset-0 max-w-none object-contain size-full pointer-events-none" src={imgAssetHybrdAmWordmark} />
                  </div>
                  <div className="font-['Inter:Regular'] font-normal text-[#969691] text-[13px]">
                    <p className="leading-[1.42] mb-0">Hybrid additive integration brings</p>
                    <p className="leading-[1.42]">new function into existing high-value parts.</p>
                  </div>
                </div>
                <div className="h-[140px] w-[160px] relative shrink-0">
                  <img alt="hybrd.AM Component" className="absolute inset-0 max-w-none object-contain size-full pointer-events-none" src={imgAssetHybrdAmComponent} />
                </div>
              </div>
              <div className="border-t border-[#2e2e2e] flex gap-[18px] items-start py-[18px] w-full">
                <div className="flex flex-1 flex-col gap-2 items-start min-w-0">
                  <div className="h-[41px] w-[183px] relative shrink-0">
                    <img alt="AM.repair" className="absolute inset-0 max-w-none object-contain size-full pointer-events-none" src={imgAssetAmRepairWordmark} />
                  </div>
                  <div className="font-['Inter:Regular'] font-normal text-[#969691] text-[13px]">
                    <p className="leading-[1.42] mb-0">Scan, decide, prepare, execute and verify</p>
                    <p className="leading-[1.42]">the repair route as one industrial workflow.</p>
                  </div>
                </div>
                <div className="h-[140px] w-[160px] relative shrink-0">
                  <img alt="AM.repair Blade" className="absolute inset-0 max-w-none object-contain size-full pointer-events-none" src={imgAssetAmRepairBlade} />
                </div>
              </div>
            </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Section 03 — Proof In Motion */}
      <section
        id="proof-motion"
        data-track-section="proof_in_motion"
        data-route-step="03"
        data-section-name="PROOF IN MOTION"
        data-section-no="03"
        ref={el => { sectionRefs.current[2] = el; }}
        className="flex flex-col items-start overflow-clip w-full"
      >
        <div className="bg-[rgba(255,255,255,0.09)] h-px w-full shrink-0" />
        <div className="flex flex-col gap-6 items-start overflow-clip pb-16 pt-12 px-12 w-full">
          <FadeUp><SectionHeader label="Show me the proof." active={3} /></FadeUp>
          <FadeUp delay={0.1} className="flex flex-col gap-[14px] items-start text-[#d9d9d5] whitespace-nowrap">
            <p className="font-['Barlow:Bold'] leading-[0.88] text-[58px] tracking-[-2.784px]">PROOF IN MOTION</p>
            <p className="font-['Barlow:SemiBold'] leading-normal text-[24px]">Hardware-verified. Integration-ready.</p>
          </FadeUp>
          <div className="flex gap-[18px] items-start w-full flex-col md:flex-row">
            {/* Proof Card — Hyphen / file (1).mp4 */}
            <div className="bg-[#171717] border border-[#2e2e2e] flex flex-1 flex-col items-start overflow-clip relative min-w-0 as4d-proof-video-v31" data-proof-id="function-under-test" data-track-region="proof_video_hyphen">
              <ProofVideoCard
                src="/assets/file-1.mp4"
                label="Function Under Test"
                accentColor="#efc125"
              />
              <div className="absolute bg-[#efc125] h-[2px] left-[-1px] top-[340px] w-full" />
              <div className="flex flex-col gap-2 items-start pb-6 pt-[18px] px-6 w-full">
                <p className="font-['Barlow:Bold'] leading-normal text-[#efc125] text-[24px] tracking-[1.44px] uppercase w-full">FUNCTION UNDER TEST</p>
                <p className="font-['Inter:Regular'] font-normal leading-[1.42] text-[#969691] text-[13px] w-full">
                  Structural response is tested and turned into evidence for the next iteration.
                </p>
              </div>
            </div>
            {/* Proof Card — additiveSTREAM / aS4D_trailer_hybrd.AM.mp4 */}
            <div className="bg-[#171717] border border-[#2e2e2e] flex flex-1 flex-col items-start overflow-clip relative min-w-0 as4d-proof-video-v31" data-proof-id="repair-in-action" data-track-region="proof_video_as4d">
              <ProofVideoCard
                src="/assets/aS4D_trailer_hybrd.AM.mp4"
                label="Repair In Action"
                accentColor="#008a46"
              />
              <div className="absolute bg-[#008a46] h-[2px] left-[-1px] top-[340px] w-full" />
              <div className="flex flex-col gap-2 items-start pb-6 pt-[18px] px-6 w-full">
                <p className="font-['Barlow:Bold'] leading-normal text-[#008a46] text-[24px] tracking-[1.44px] uppercase w-full">REPAIR IN ACTION</p>
                <p className="font-['Inter:Regular'] font-normal leading-[1.42] text-[#969691] text-[13px] w-full">
                  Integration, repair execution and verification connect the next build to industrial application.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 04 — Integration Path */}
      <section
        id="integration-path"
        data-track-section="integration_path"
        data-route-step="04"
        data-section-name="ONE BLADE / FIVE STATES"
        data-section-no="04"
        data-track-region="blade_state_sequence"
        ref={el => { sectionRefs.current[3] = el; }}
        className="flex flex-col items-start overflow-clip w-full"
      >
        <div className="bg-[rgba(255,255,255,0.09)] h-px w-full shrink-0" />
        <div className="flex flex-col gap-6 items-start overflow-clip pb-16 pt-12 px-12 w-full">
          <FadeUp><SectionHeader label="How does function become part of the repair?" active={4} /></FadeUp>
          <FadeUp delay={0.1} className="flex flex-col gap-[14px] items-start text-[#d9d9d5] whitespace-nowrap">
            <p className="font-['Barlow:Bold'] leading-[0.88] text-[58px] tracking-[-2.784px]">ONE BLADE // FIVE READABLE STATES</p>
            <p className="font-['Barlow:SemiBold'] leading-normal text-[24px]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
              Damage → preparation → repair → iDAMP integration → highlighted function
            </p>
          </FadeUp>
          <div className="flex gap-2 items-start w-full overflow-x-auto">
            {[
              { img: imgAssetTca55Damage, num: '01', label: 'DAMAGED', active: true, bg: '#171717', stage: '0' },
              { img: imgAssetTca55CutPrepare, num: '02', label: 'PREPARED', active: false, bg: '#171717', stage: '1' },
              { img: imgAssetTca55Repair, num: '03', label: 'REPAIRED', active: false, bg: '#171717', stage: '2' },
              { img: imgAssetTca55IdampIntegrated, num: '04', label: 'IDAMP INTEGRATED', active: false, bg: '#171717', stage: '3' },
              { img: imgAssetTca55FunctionalRevealHighlighted, num: '05', label: 'FUNCTIONAL REVEAL', active: false, bg: '#171717', stage: '4' },
            ].map(state => (
              <div key={state.num} className="state flex flex-1 flex-col items-start min-w-[150px] overflow-clip relative" data-stage={state.stage} style={{ background: state.bg }}>
                <div className="h-[160px] relative shrink-0 w-full">
                  <img alt={state.label} className="absolute inset-0 max-w-none object-contain size-full pointer-events-none" src={state.img} />
                </div>
                <div className="flex items-start px-3 py-[10px] w-full">
                  <p className="font-['Barlow:Medium'] leading-normal text-[16px] whitespace-pre" style={{ color: state.active ? '#008a46' : '#808080' }}>
                    {state.num}  {state.label}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Blade Detail */}
          <div className="hidden xl:grid relative w-full" style={{ gridTemplateColumns: '1fr 420px 1fr', height: 480 }}>

            {/* Left annotations */}
            <div className="flex flex-col justify-around py-12 pr-6 items-end">
              {[
                { num: '01', title: 'SURFACE EROSION', desc: 'Progressive material loss across pressure face' },
                { num: '02', title: 'CRACK PROPAGATION', desc: 'Intergranular fracture extending through substrate' },
              ].map(a => (
                <div key={a.num} className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-['Barlow:SemiBold'] text-[13px] tracking-[0.8px] text-white leading-snug">{a.title}</p>
                    <p className="font-['Inter:Regular'] text-[11px] text-[#7a7a76] leading-[1.5] max-w-[200px] mt-0.5">{a.desc}</p>
                  </div>
                  <div className="flex items-center gap-0 shrink-0">
                    <div className="w-12 h-px bg-[rgba(0,166,90,0.35)]" />
                    <div className="bg-[rgba(16,20,18,0.92)] border border-[rgba(0,166,90,0.7)] rounded-[6px] w-8 h-8 flex items-center justify-center shrink-0">
                      <span className="font-['Barlow:Light'] text-[#00a65a] text-[15px] leading-none">{a.num}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Blade image centered */}
            <div className="relative overflow-hidden">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img alt="" className="absolute h-[118.67%] left-[-91.43%] max-w-none top-[-8.28%] w-[285.71%]" src={imgAssetTca55Damage} />
              </div>
            </div>

            {/* Right annotations */}
            <div className="flex flex-col justify-around py-12 pl-6 items-start">
              {[
                { num: '03', title: 'LEADING EDGE SPALL', desc: 'Impact-driven spallation compromising aerodynamic profile' },
                { num: '04', title: 'ROOT DELAMINATION', desc: 'Interlaminar separation at blade root from thermal cycling' },
              ].map(a => (
                <div key={a.num} className="flex items-center gap-4">
                  <div className="flex items-center shrink-0">
                    <div className="bg-[rgba(16,20,18,0.92)] border border-[rgba(0,166,90,0.7)] rounded-[6px] w-8 h-8 flex items-center justify-center shrink-0">
                      <span className="font-['Barlow:Light'] text-[#00a65a] text-[15px] leading-none">{a.num}</span>
                    </div>
                    <div className="w-12 h-px bg-[rgba(0,166,90,0.35)]" />
                  </div>
                  <div>
                    <p className="font-['Barlow:SemiBold'] text-[13px] tracking-[0.8px] text-white leading-snug">{a.title}</p>
                    <p className="font-['Inter:Regular'] text-[11px] text-[#7a7a76] leading-[1.5] max-w-[200px] mt-0.5">{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Section 05 — One System */}
      <section
        id="system"
        data-track-section="one_system"
        data-route-step="05"
        data-section-name="ONE SYSTEM"
        data-section-no="05"
        ref={el => { sectionRefs.current[4] = el; }}
        className="flex flex-col items-start overflow-clip w-full"
      >
        <div className="bg-[rgba(255,255,255,0.09)] h-px w-full shrink-0" />
        <div className="flex flex-col gap-6 items-start overflow-clip pb-16 pt-12 px-12 w-full">
          <FadeUp><SectionHeader label="How does it all come together?" active={5} /></FadeUp>
          <div className="flex flex-col gap-[14px] items-start">
            <div className="flex font-['Barlow:Bold'] items-center leading-[0.88] text-[58px] tracking-[-2.784px] whitespace-nowrap">
              <p className="text-[#fafafa]">iDAMP</p>
              <p className="text-white">.repair</p>
              <p className="text-[#fafafa]">{` // ONE SYSTEM`}</p>
            </div>
            <p className="font-['Barlow:SemiBold'] leading-normal text-[#d9d9d5] text-[24px] max-w-2xl">
              One architecture. Connected flow from damage assessment to verified additive repair.
            </p>
          </div>
          {(() => {
            const detail = NODE_DETAILS[selectedNode];
            const NODE_SCHEMA_ID: Record<NodeKey, string> = {
              scan: 'scanning', scrap: 'decision', iiot: 'iiot',
              lpbf: 'lpbf', ded: 'ded', cnc: 'cnc', verify: 'verification',
            };
            const NodeBtn = ({ id, label, style }: { id: NodeKey; label: string; style: React.CSSProperties }) => (
              <button
                onClick={() => setSelectedNode(id)}
                data-node={NODE_SCHEMA_ID[id]}
                className="absolute flex items-center justify-center rounded cursor-pointer transition-all duration-150"
                style={{
                  ...style,
                  background: selectedNode === id ? 'rgba(242,182,50,0.12)' : 'transparent',
                  border: selectedNode === id ? '1.5px solid rgba(242,182,50,0.7)' : '1.5px solid transparent',
                  zIndex: 10,
                }}
                title={label}
              />
            );
            return (
          <div className="flex gap-[18px] items-start w-full flex-col lg:flex-row">
            {/* System Architecture */}
            <div className="flex flex-1 flex-col items-start min-w-0 overflow-clip" data-track-region="system_architecture">
              <div className="bg-[#171717] border border-[#2e2e2e] flex flex-col h-[457px] items-center justify-center overflow-clip relative shrink-0 w-full">
                <div className="h-[358.691px] overflow-clip relative shrink-0 w-[638px]">
                  <div className="absolute inset-[3.33%_2.57%_1.23%_2.5%]"><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector} /></div>
                  <div className="absolute inset-[27.56%_40.12%_37.33%_40.13%]"><div className="absolute inset-[-0.28%]"><img alt="" className="block max-w-none size-full" src={imgVector1} /></div></div>
                  <div className="absolute inset-[24.78%_38.56%_34.56%_38.56%]"><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector2} /></div>
                  <div className="absolute inset-[22%_37%_31.78%_37%]"><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector3} /></div>
                  <div className="absolute inset-[34%_47.25%_58.78%_46.25%]"><div className="absolute inset-[-1.38%_-0.86%]"><img alt="" className="block max-w-none size-full" src={imgVector4} /></div></div>
                  <div className="absolute inset-[39.56%_49.12%_58.89%_48.38%]"><div className="absolute inset-[-6.39%_-2.24%]"><img alt="" className="block max-w-none size-full" src={imgVector5} /></div></div>
                  <div className="absolute inset-[41.56%_49.12%_56.89%_48.38%]"><div className="absolute inset-[-6.39%_-2.24%]"><img alt="" className="block max-w-none size-full" src={imgVector6} /></div></div>
                  <div className="absolute inset-[43.56%_49.12%_54.89%_48.38%]"><div className="absolute inset-[-6.39%_-2.24%]"><img alt="" className="block max-w-none size-full" src={imgVector7} /></div></div>
                  <div className="absolute inset-[40.06%_50.97%_59.39%_48.72%]"><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector8} /></div>
                  <div className="absolute inset-[42.06%_50.97%_57.39%_48.72%]"><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector9} /></div>
                  <div className="absolute inset-[44.06%_50.97%_55.39%_48.72%]"><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector10} /></div>
                  <div className="absolute inset-[46.47%_42.72%_50.91%_42.67%]"><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector11} /></div>
                  <div className="absolute inset-[51.89%_43%_46.29%_42.94%]"><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector12} /></div>
                  <div className="absolute inset-[86%_7.5%_6.89%_7.5%]"><div className="absolute inset-[-0.93%_0]"><img alt="" className="block max-w-none size-full" src={imgVector13} /></div></div>
                  <div className="absolute inset-[88.11%_86.81%_8.11%_10.94%]"><div className="absolute inset-[-2.63%_-2.48%]"><img alt="" className="block max-w-none size-full" src={imgVector14} /></div></div>
                  <div className="absolute inset-[89%_87.37%_9%_11.5%]"><div className="absolute inset-[-4.97%]"><img alt="" className="block max-w-none size-full" src={imgVector15} /></div></div>
                  <div className="absolute inset-[88.91%_82.89%_9.48%_14.44%]"><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector16} /></div>
                  <div className="absolute bottom-[9.44%] left-[22.81%] right-[75%] top-[88.56%]"><div className="absolute inset-[-3.31%_-1.7%]"><img alt="" className="block max-w-none size-full" src={imgVector17} /></div></div>
                  <div className="absolute inset-[87.78%_70.87%_7.78%_26.88%]"><div className="absolute inset-[-2.24%_-2.48%]"><img alt="" className="block max-w-none size-full" src={imgVector18} /></div></div>
                  <div className="absolute inset-[88.88%_65.77%_9.48%_30.42%]"><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector19} /></div>
                  <div className="absolute inset-[88.56%_58.75%_9.44%_39.06%]"><div className="absolute inset-[-3.31%_-1.7%]"><img alt="" className="block max-w-none size-full" src={imgVector20} /></div></div>
                  <div className="absolute inset-[87.78%_54.62%_7.78%_43.13%]"><div className="absolute inset-[-2.24%_-2.48%]"><img alt="" className="block max-w-none size-full" src={imgVector21} /></div></div>
                  <div className="absolute inset-[88.93%_49.06%_9.07%_46.67%]"><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector22} /></div>
                  <div className="absolute inset-[88.56%_41.87%_9.44%_55.94%]"><div className="absolute inset-[-3.31%_-1.7%]"><img alt="" className="block max-w-none size-full" src={imgVector23} /></div></div>
                  <div className="absolute inset-[88.67%_38.12%_8.67%_60.38%]"><div className="absolute inset-[-3.73%]"><img alt="" className="block max-w-none size-full" src={imgVector24} /></div></div>
                  <div className="absolute inset-[87.78%_37.75%_7.78%_60%]"><div className="absolute inset-[-2.24%_-2.48%]"><img alt="" className="block max-w-none size-full" src={imgVector25} /></div></div>
                  <div className="absolute inset-[88.93%_32.07%_9.48%_63.54%]"><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector26} /></div>
                  <div className="absolute inset-[88.56%_24.06%_9.44%_73.75%]"><div className="absolute inset-[-3.31%_-1.7%]"><img alt="" className="block max-w-none size-full" src={imgVector27} /></div></div>
                  <div className="absolute inset-[87.56%_20.06%_7.78%_77.94%]"><div className="absolute inset-[-2.13%_-2.8%]"><img alt="" className="block max-w-none size-full" src={imgVector28} /></div></div>
                  <div className="absolute inset-[89%_20.5%_9.56%_78.44%]"><div className="absolute inset-[-6.88%_-5.26%]"><img alt="" className="block max-w-none size-full" src={imgVector29} /></div></div>
                  <div className="absolute inset-[88.86%_15.5%_9.07%_81.28%]"><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector30} /></div>
                  <div className="absolute bottom-[72.44%] left-1/2 right-1/2 top-[22.22%]"><div className="absolute inset-[-2.49%_-0.48px]"><img alt="" className="block max-w-none size-full" src={imgVector31} /></div></div>
                  <div className="absolute inset-[43.33%_60%_56.67%_26.88%]"><div className="absolute inset-[-0.48px_-0.57%]"><img alt="" className="block max-w-none size-full" src={imgVector32} /></div></div>
                  <div className="absolute inset-[23.77%_26.61%_63.11%_58.64%]"><div className="absolute inset-[-1.01%_-0.51%]"><img alt="" className="block max-w-none size-full" src={imgVector33} /></div></div>
                  <div className="absolute inset-[45.49%_26.61%_54.1%_59.79%]"><div className="absolute inset-[-32.36%_-0.55%_-32.35%_-0.55%]"><img alt="" className="block max-w-none size-full" src={imgVector34} /></div></div>
                  <div className="absolute bottom-[32.22%] left-1/2 right-1/2 top-[62.67%]"><div className="absolute inset-[-2.59%_-0.48px]"><img alt="" className="block max-w-none size-full" src={imgVector35} /></div></div>
                  <div className="absolute inset-[21.44%_49.56%_77%_49.56%]"><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector36} /></div>
                  <div className="absolute inset-[26.78%_49.56%_71.67%_49.56%]"><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector37} /></div>
                  <div className="absolute inset-[42.56%_72.69%_55.89%_26.44%]"><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector38} /></div>
                  <div className="absolute inset-[42.56%_59.56%_55.89%_39.56%]"><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector38} /></div>
                  <div className="absolute inset-[36.07%_40.95%_62.38%_58.18%]"><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector39} /></div>
                  <div className="absolute inset-[45.08%_39.56%_53.36%_59.56%]"><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector40} /></div>
                  <div className="absolute inset-[52.87%_40.95%_45.58%_58.18%]"><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector41} /></div>
                  <div className="absolute inset-[61.89%_49.56%_36.55%_49.56%]"><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector42} /></div>
                  <div className="absolute inset-[67%_49.56%_31.44%_49.56%]"><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector43} /></div>
                  <div className="absolute inset-[53.69%_26.61%_32.38%_58.64%]"><div className="absolute inset-[-0.95%_-0.51%]"><img alt="" className="block max-w-none size-full" src={imgVector44} /></div></div>
                  <div className="absolute inset-[14.75%_5.99%_68.02%_73.39%]"><div className="absolute inset-[-0.38%_-0.18%]"><img alt="" className="block max-w-none size-full" src={imgVector45} /></div></div>
                  <div className="absolute inset-[36.89%_5.99%_45.89%_73.39%]"><div className="absolute inset-[-0.38%_-0.18%]"><img alt="" className="block max-w-none size-full" src={imgVector46} /></div></div>
                  <div className="absolute inset-[59.02%_5.99%_23.76%_73.39%]"><div className="absolute inset-[-0.38%_-0.18%]"><img alt="" className="block max-w-none size-full" src={imgVector47} /></div></div>
                  <div className="absolute inset-[17.54%_19.68%_72.1%_75.93%]"><div className="absolute inset-[-0.96%_-1.27%]"><img alt="" className="block max-w-none size-full" src={imgVector48} /></div></div>
                  <div className="absolute inset-[19.16%_20.25%_75.01%_76.49%]"><div className="absolute inset-[-1.71%]"><img alt="" className="block max-w-none size-full" src={imgVector49} /></div></div>
                  <div className="absolute inset-[18.4%_19.81%_71.24%_76.06%]"><div className="absolute inset-[-0.96%_-1.35%]"><img alt="" className="block max-w-none size-full" src={imgVector50} /></div></div>
                  <div className="absolute inset-[23.04%_20.87%_76.2%_77.12%]"><div className="absolute inset-[-13.16%_-2.79%]"><img alt="" className="block max-w-none size-full" src={imgVector51} /></div></div>
                  <div className="absolute inset-[22.15%_13.58%_75.92%_82.79%]"><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector52} /></div>
                  <div className="absolute inset-[25.1%_16.58%_73.82%_82.79%]"><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector53} /></div>
                  <div className="absolute inset-[24.92%_11.8%_73.68%_84.2%]"><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector54} /></div>
                  <div className="absolute inset-[39.91%_19.59%_50.38%_76.4%]"><div className="absolute inset-[-1.02%_-1.39%]"><img alt="" className="block max-w-none size-full" src={imgVector55} /></div></div>
                  <div className="absolute inset-[44.29%_14.2%_53.79%_82.79%]"><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector56} /></div>
                  <div className="absolute inset-[46.89%_11.8%_51.71%_84.2%]"><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector57} /></div>
                  <div className="absolute inset-[47.14%_16.58%_51.78%_82.79%]"><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector58} /></div>
                  <div className="absolute inset-[59.81%_17.37%_27.05%_74.31%]"><img alt="" className="absolute block inset-0 max-w-none size-full" height="47.118" src={imgVector59} width="53.087" /></div>
                  <div className="absolute inset-[66.39%_13.91%_31.63%_82.79%]"><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector60} /></div>
                  <div className="absolute inset-[69.02%_11.8%_29.58%_84.2%]"><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector61} /></div>
                  <div className="absolute inset-[69.27%_16.58%_29.65%_82.79%]"><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector62} /></div>
                  <div className="absolute inset-[66.73%_39.81%_16.55%_39.5%]"><div className="absolute inset-[-0.4%_-0.18%]"><img alt="" className="block max-w-none size-full" src={imgGroup8} /></div></div>
                  <div className="absolute inset-[46.65%_81.98%_52.27%_17.4%]"><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector62} /></div>
                  <div className="absolute inset-[35.22%_71%_48.05%_8.31%]"><div className="absolute inset-[-0.4%_-0.18%]"><img alt="" className="block max-w-none size-full" src={imgVector63} /></div></div>
                  <div className="absolute inset-[47.77%_81.66%_51.15%_17.71%]"><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector62} /></div>
                  <div className="absolute inset-[41.14%_75.61%_53.97%_17.71%]"><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector64} /></div>
                  <div className="absolute inset-[46.59%_77.4%_52.17%_19.12%]"><img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector65} /></div>
                  <div className="absolute inset-[38.01%_83.86%_52.51%_10.5%]"><img alt="" className="absolute block inset-0 max-w-none size-full" height="34" src={imgVector66} width="36" /></div>
                  <div className="absolute inset-[6.79%_39.97%_76.49%_39.34%]"><div className="absolute inset-[-0.4%_-0.18%]"><img alt="" className="block max-w-none size-full" src={imgGroup9} /></div></div>

                  {/* Clickable node overlays — positioned over each node in the 638×359 diagram */}
                  {/* Scan */}
                  <NodeBtn id="scan"  label="Scan"         style={{ left: '5%',  top: '13%', width: '18%', height: '24%' }} />
                  {/* Scrap or Repair */}
                  <NodeBtn id="scrap" label="Scrap/Repair" style={{ left: '0%',  top: '38%', width: '20%', height: '26%' }} />
                  {/* IIoT Platform */}
                  <NodeBtn id="iiot"  label="IIoT"         style={{ left: '32%', top: '38%', width: '24%', height: '26%' }} />
                  {/* Verification */}
                  <NodeBtn id="verify" label="Verify"      style={{ left: '26%', top: '62%', width: '22%', height: '24%' }} />
                  {/* LPBF */}
                  <NodeBtn id="lpbf"  label="LPBF"         style={{ left: '50%', top: '5%',  width: '22%', height: '27%' }} />
                  {/* DED */}
                  <NodeBtn id="ded"   label="DED"          style={{ left: '50%', top: '33%', width: '22%', height: '27%' }} />
                  {/* CNC */}
                  <NodeBtn id="cnc"   label="CNC"          style={{ left: '50%', top: '60%', width: '22%', height: '27%' }} />
                </div>
              </div>
            </div>

            {/* System Detail — reactive */}
            <div className="bg-[#171717] border border-[#2e2e2e] flex flex-1 flex-col gap-4 items-start min-w-0 overflow-clip p-6" data-track-region="system_node_detail" data-active-node={selectedNode}>
              {/* Logo placeholder area */}
              <div className="bg-[#1e1e1e] border border-[#2e2e2e] flex flex-col h-[88px] items-center justify-center overflow-clip shrink-0 w-full">
                <img alt="" className="h-[52px] max-w-[160px] object-contain opacity-90" src={imgGroup10} />
              </div>
              <p className="font-['Barlow:Medium'] leading-normal text-[#008a46] text-[10px] tracking-[1px] uppercase">{detail.role}</p>
              <p className="font-['Barlow:Bold'] leading-none text-[28px] text-white">{detail.title}</p>
              <p className="font-['Inter:Regular'] font-normal leading-[1.5] text-[#7a7a76] text-[12px]">{detail.desc}</p>
              <div className="flex flex-col gap-2 items-start w-full mt-1">
                {detail.steps.map(step => (
                  <div key={step.num} className="border-t border-[#2a2a2a] flex gap-3 items-start pt-3 w-full">
                    <p className="font-['Barlow:Bold'] text-[#008a46] text-[11px] whitespace-nowrap mt-0.5">{step.num}</p>
                    <div className="flex flex-1 flex-col gap-0.5 items-start min-w-0">
                      <p className="font-['Barlow:SemiBold'] text-white text-[12px] tracking-[0.4px]">{step.title}</p>
                      <p className="font-['Inter:Regular'] font-normal text-[#7a7a76] text-[11px] leading-[1.4]">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              {/* Node selector pills */}
              <div className="flex flex-wrap gap-1.5 mt-2 w-full">
                {(['scan','scrap','iiot','lpbf','ded','cnc','verify'] as NodeKey[]).map(id => (
                  <button
                    key={id}
                    onClick={() => setSelectedNode(id)}
                    className="px-2 py-0.5 text-[10px] font-['Barlow:Medium'] tracking-[0.6px] uppercase rounded border transition-colors duration-150"
                    style={{
                      borderColor: selectedNode === id ? '#F2B632' : '#2e2e2e',
                      color: selectedNode === id ? '#F2B632' : '#555',
                      background: selectedNode === id ? 'rgba(242,182,50,0.07)' : 'transparent',
                    }}
                  >
                    {NODE_DETAILS[id].title}
                  </button>
                ))}
              </div>
            </div>
          </div>
            );
          })()}
        </div>
      </section>

      {/* Section 06 — Evidence Landscape */}
      <section
        id="validation"
        data-track-section="evidence_landscape"
        data-route-step="06"
        data-section-name="EVIDENCE LANDSCAPE"
        data-section-no="06"
        ref={el => { sectionRefs.current[5] = el; }}
        className="flex flex-col items-start overflow-clip w-full"
      >
        <div className="bg-[rgba(255,255,255,0.09)] h-px w-full shrink-0" />
        <div className="flex flex-col gap-6 items-start overflow-clip pb-16 pt-12 px-12 w-full">
          <FadeUp><SectionHeader label="Where can I see it in practice?" active={6} /></FadeUp>
          <div className="flex flex-col gap-[14px] items-start text-[#d9d9d5] whitespace-nowrap">
            <p className="font-['Barlow:Bold'] leading-[0.88] text-[58px] tracking-[-2.784px]">SEE IT .... MEET IT .... TAKE THE PROOF</p>
            <p className="font-['Barlow:SemiBold'] leading-normal text-[24px]">Events, demonstrations and partner landscape.</p>
          </div>

          <div className="flex flex-col gap-[18px] items-start w-full">
            {/* ICAM26 Banner */}
            <div className="event-banner-v39 bg-[#171717] border border-[#2e2e2e] flex items-start overflow-clip w-full flex-col md:flex-row" data-event-id="icam26" data-track-region="event_banner_icam">
              <div className="flex gap-[18px] items-start pr-8 py-8 shrink-0 w-full md:w-[521px]">
                <div className="bg-[#ff6b1a] h-full self-stretch relative w-[3px]" />
                <div className="flex flex-1 flex-col items-start min-w-0">
                  <div className="font-['Barlow:Bold'] text-[64px] text-white w-full">
                    <p className="leading-[1.1] mb-0">iDAMP IN THE</p>
                    <p className="leading-[1.1]">TECHNICAL CONVERSATION.</p>
                  </div>
                </div>
              </div>
              <div className="border border-[#2e2e2e] flex-1 min-w-0 relative self-stretch min-h-[200px]">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img alt="ICAM 26" className="absolute h-[157.69%] left-[0.01%] max-w-none top-[-52.18%] w-full" src={imgAssetEventIcam26Banner} />
                </div>
              </div>
            </div>

            {/* aS4D Demo Banner */}
            <div className="event-banner-v39 bg-[#171717] border border-[#2e2e2e] flex items-start overflow-clip w-full flex-col md:flex-row" data-event-id="as4d-fraunhofer" data-track-region="event_banner_demo">
              <div className="flex gap-[18px] items-start pr-8 py-8 shrink-0 w-full md:w-[526px]">
                <div className="bg-[#008a46] h-[210px] relative w-[3px]" />
                <div className="flex flex-1 flex-col items-start min-w-0">
                  <div className="font-['Barlow:Bold'] text-[64px] text-white w-full">
                    <p className="leading-[1.1] mb-0">SEE THE</p>
                    <p className="leading-[1.1] mb-0">INDUSTRIAL</p>
                    <p className="leading-[1.1]">PATHWAY.</p>
                  </div>
                </div>
              </div>
              <div className="border border-[#2e2e2e] flex-1 min-w-0 relative self-stretch min-h-[200px]">
                <img alt="aS4D Live Demo Fraunhofer" className="absolute inset-0 max-w-none object-cover size-full pointer-events-none" src={imgAssetEventAs4DLiveDemoFraunhofer} />
              </div>
            </div>
          </div>

          {/* Partner Marquee */}
          <div className="h-[120px] overflow-hidden relative w-full" data-track-region="partner_validation">
            <div className="flex gap-12 items-start animate-marquee py-4 w-max">
              {[...partnerLogos, ...partnerLogos].map((logo, i) => (
                <div key={i} className="partner-v40 border border-[#2e2e2e] h-[88px] relative shrink-0 w-[188px]" data-partner-id={logo.alt?.toLowerCase().replace(/\s+/g, '-')}>
                  <img alt={logo.alt} className="absolute inset-0 max-w-none object-contain size-full pointer-events-none" src={logo.src} />
                </div>
              ))}
            </div>
            <div className="absolute bg-gradient-to-r from-[#121212] h-full left-0 to-transparent top-0 w-20 pointer-events-none" />
            <div className="absolute bg-gradient-to-l from-[#121212] h-full right-0 to-transparent top-0 w-20 pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Section 07 — Insights */}
      <section
        id="insights"
        data-track-section="deep_insights"
        data-route-step="07"
        data-section-name="INSIGHTS"
        data-section-no="07"
        ref={el => { sectionRefs.current[6] = el; }}
        className="flex flex-col items-start overflow-clip w-full"
      >
        <div className="bg-[rgba(255,255,255,0.09)] h-px w-full shrink-0" />
        <div className="flex flex-col gap-6 items-start overflow-clip pb-16 pt-12 px-12 w-full">
          <FadeUp><SectionHeader label="Take me deeper." active={7} /></FadeUp>
          <div className="flex gap-12 items-start w-full flex-col lg:flex-row">
            <div className="flex flex-col gap-[14px] items-start text-[#d9d9d5] lg:w-[550px] shrink-0">
              <p className="font-['Barlow:Bold'] leading-[0.88] text-[58px] tracking-[-2.784px] w-full">GET THE INSIGHTS</p>
              <p className="font-['Barlow:SemiBold'] leading-normal text-[24px] w-full">
                Go deeper into the iDAMP.repair approach, its development logic and the path from functional technology to industrial application.
              </p>
            </div>
            <div className="lead-form bg-[#171717] border border-[#2e2e2e] flex flex-1 flex-col gap-[14px] items-start min-w-0 overflow-clip p-6" data-track-region="whitepaper_form" id="whitepaperForm">
              <p className="font-['Barlow:Bold'] leading-normal text-[16px] text-white w-full">Request the iDAMP.repair whitepaper</p>
              <p className="font-['Inter:Regular'] font-normal leading-[1.42] text-[#969691] text-[10px] w-full">
                Request the iDAMP.repair whitepaper and supporting evidence.
              </p>
              {[
                { id: 'name', label: 'NAME', placeholder: 'Your name', value: formData.name, key: 'name' as const },
                { id: 'email', label: 'WORK EMAIL', placeholder: 'name@company.com', value: formData.email, key: 'email' as const },
                { id: 'company', label: 'COMPANY', placeholder: 'Company name', value: formData.company, key: 'company' as const },
                { id: 'role', label: 'POSITION / ROLE', placeholder: 'Your role', value: formData.role, key: 'role' as const },
                { id: 'context', label: 'WHAT BROUGHT YOU HERE?', placeholder: 'Tell us briefly', value: formData.context, key: 'context' as const },
              ].map(field => (
                <div key={field.id} className="flex flex-col gap-1 items-start w-full">
                  <label htmlFor={field.id} className="font-['Inter:Medium'] font-medium text-[#808080] text-[10px] tracking-[0.8px] uppercase whitespace-nowrap">
                    {field.label}
                  </label>
                  <input
                    id={field.id}
                    type={field.key === 'email' ? 'email' : 'text'}
                    placeholder={field.placeholder}
                    value={field.value}
                    onChange={e => setFormData(prev => ({ ...prev, [field.key]: e.target.value }))}
                    className="bg-[#050505] border border-[#2a2a2a] font-['Inter:Regular'] font-normal text-[12px] text-[#555] w-full px-[7.273px] py-[7.273px] outline-none focus:border-[#008a46] transition-colors placeholder:text-[#555]"
                  />
                </div>
              ))}
              <button
                onClick={() => alert('Whitepaper request submitted.')}
                className="bg-[#008a46] flex items-center justify-center overflow-clip px-[14.547px] py-[8.486px] w-full hover:bg-[#00a653] transition-colors cursor-pointer"
              >
                <p className="font-['Inter:Medium'] font-medium leading-normal text-[12px] text-center text-white whitespace-nowrap">
                  SEND ME THE WHITEPAPER →
                </p>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="flex flex-col items-start overflow-clip w-full">
        <div className="bg-[rgba(255,255,255,0.09)] h-px w-full shrink-0" />
        <div className="flex items-start overflow-clip pb-[70px] pt-[46px] px-12 w-full">
          <p className="font-['Barlow:Bold'] leading-normal text-[16px] text-white whitespace-nowrap">iDAMP.repair</p>
          <div className="flex-1" />
          <div className="flex font-['Inter:Regular'] font-normal gap-6 items-start text-[#808080] text-[12px] whitespace-nowrap flex-wrap">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="cursor-pointer hover:text-white transition-colors">Back to top ↑</button>
            <a href="#" className="hover:text-white transition-colors">Hyphen ↗</a>
            <a href="#" className="hover:text-white transition-colors">additiveSTREAM ↗</a>
            <a href="#" className="hover:text-white transition-colors">Hyphen LinkedIn ↗</a>
            <a href="#" className="hover:text-white transition-colors">aS4D LinkedIn ↗</a>
            <a href="#" className="hover:text-white transition-colors">Legal</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
    <AnalysisLayer />
  </>
  );
}
