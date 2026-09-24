/**
 * SrcExport — complete project source bundle for forensic intake.
 * Explicit ?raw imports for root files to avoid Rolldown tracing vite.config.ts imports.
 */

// ── Explicit root-file imports (safe: ?raw prevents dependency tracing) ────────
import _packageJson    from '../package.json?raw';
import _tsconfig       from '../tsconfig.json?raw';
import _indexHtml      from '../index.html?raw';
import _miseToml       from '../.mise.toml?raw';
// .figma/make — scripts have no extension; ?raw forces text loading
import _figmaSiteJson  from '../.figma/make/site.json?raw';
import _figmaDevJson   from '../.figma/make/dev.json?raw';
import _figmaInstall   from '../.figma/make/install?raw';
import _figmaDev       from '../.figma/make/dev?raw';
import _figmaDeploy    from '../.figma/make/deploy?raw';
import _figmaPreview   from '../.figma/make/deploy-preview?raw';
import _figmaFormat    from '../.figma/make/format?raw';
import _figmaAnalyze   from '../.figma/make/analyze-routes?raw';
import _figmaLang      from '../.figma/make/langserver?raw';

// ── src/ files via glob — AnalysisLayer.tsx is included (no self-reference here) ──
const SRC_FILES = import.meta.glob(
  ['./*.tsx', './*.ts', './*.css', './imports/*.json', './imports/*.html'],
  { as: 'raw', eager: true }
) as Record<string, string>;

const ROOT_HARDCODED: Record<string, string> = {
  'package.json':                _packageJson,
  'tsconfig.json':               _tsconfig,
  'index.html':                  _indexHtml,
  '.mise.toml':                  _miseToml,
  '.figma/make/site.json':       _figmaSiteJson,
  '.figma/make/dev.json':        _figmaDevJson,
  '.figma/make/install':         _figmaInstall,
  '.figma/make/dev':             _figmaDev,
  '.figma/make/deploy':          _figmaDeploy,
  '.figma/make/deploy-preview':  _figmaPreview,
  '.figma/make/format':          _figmaFormat,
  '.figma/make/analyze-routes':  _figmaAnalyze,
  '.figma/make/langserver':      _figmaLang,
};

function buildBundle(): Record<string, string> {
  const bundle: Record<string, string> = { ...ROOT_HARDCODED };
  for (const [path, content] of Object.entries(SRC_FILES)) {
    bundle['src/' + path.replace(/^\.\//, '')] = content;
  }
  return bundle;
}

export function DownloadSrcBtn() {
  const trigger = () => {
    const bundle = buildBundle();
    const fileCount = Object.keys(bundle).length;
    const json = JSON.stringify(
      { _meta: { exported: new Date().toISOString(), project: 'idamp.repair', files: fileCount }, files: bundle },
      null,
      2
    );
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `idamp_repair_complete_src_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={trigger}
      className="fixed bottom-16 right-6 z-50 flex items-center gap-2 px-3 py-2 bg-black/90 border border-white/20 hover:border-white/40 text-white/50 hover:text-white text-[10px] font-['Barlow:SemiBold'] uppercase tracking-widest transition-all rounded-sm shadow-lg backdrop-blur-sm"
      title="Download complete source bundle (src/ + root config + .figma/make/)"
    >
      ↓ Complete src bundle
    </button>
  );
}
