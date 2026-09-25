# iDAMP.repair CONTROLLED STRATEGY OVERLAY

This repository is the Figma-compatible implementation repository for iDAMP.repair. Figma Make is a technical/design surface, not the authority for strategy, claims, technical truth, finance, customer/pipeline truth, or governance.

## Authority and routing
- CURRENT SharePoint governance and management decisions remain authoritative.
- Strategy-led build order: CURRENT Strategy -> Controlled Content -> Product Experience -> Measurement Architecture -> Acceptance -> separate Production Gates.
- Figma output may change layout and visual implementation, but must not silently replace the controlled strategy or evidence boundaries.
- If Figma Make regenerates files that conflict with the controlled strategy layer, preserve the strategy layer and reconcile visually rather than accepting the regression.

## Canonical strategy
- SIU-17 industrialisation path: Specialist Technology / Evidence -> aS4D Repair Industrialisation -> Scan-derived Application / Repair Intelligence -> Installed Industrial LPBF -> Customer-local Validation / Qualification.
- SIU-18 journey: Curiosity -> Trust -> Competence -> Proof -> Integrated System -> Deep Evidence -> Explicit Action.
- Measurement is sequence-first. Individual clicks, scroll, dwell, video views or downloads do not by themselves create buying intent, lead score, pipeline status or identified-person truth.
- Anonymous journey behavior is the default. Person linkage requires explicit voluntary action and separate auditable handling.

## Controlled content classes
Relevant UI content must be classifiable as one of:
STRATEGIC_INTENT, CURRENT_FACT, INVESTOR_FRAMING, FORWARD_LOOKING, EVIDENCE_GATED, PLACEHOLDER.

## Hard boundaries
- No UI component creates technical truth.
- Technical claims remain subject to Product & Technology, Claim Register and HOLD-TECH-T2B.
- Production measurement/persistence, privacy/legal, consent, vendor/tool selection, deployment/publication and person enrichment remain OPEN unless separately approved.
- Figma is not Company Truth.

## Repo role
This repo began as a Figma Make export but is now the controlled Figma-compatible implementation shell. The strategy/knowledge overlay is intentional and must survive Figma-generated updates.

---

# figma-make-app

React + Vite + Tailwind CSS project running inside Figma Make.

## Development Server

A Vite development server is **already running** on `$PORT` (default 8443). You don't need to start it manually.

- Preview URL: The user can access the running app through the preview panel
- Hot reload: Changes to source files are reflected immediately

## Project Structure

This is the canonical project structure. Start with task-relevant files below. Only follow imports or inspect other files when required, when a documented path is missing, or when the repository contradicts this guide.

- `src/main.tsx` - React entrypoint; imports `src/index.css` and mounts `src/App.tsx` into the `#root` element
- `src/App.tsx` - Primary application component and the usual starting point for UI work
- `src/index.css` - Global CSS entrypoint and Tailwind CSS v4 import
- `index.html` - Vite HTML shell containing the `#root` element and loading `src/main.tsx`
- `package.json` - Project dependencies and the Vite build, development, preview, and formatting scripts
- `vite.config.ts` - Vite configuration with React, Tailwind CSS v4, and Figma Make plugins plus the `@` alias for `src`
- `.mise.toml` - Toolchain versions for Node.js and pnpm

## Dependencies

- Runtime: React 19 and React DOM 19
- Styling: Tailwind CSS v4 with the `@tailwindcss/vite` plugin
- Build tooling: Vite 8, TypeScript 5.7, and `@vitejs/plugin-react`
- Formatting: oxfmt

## Styling

This project uses **Tailwind CSS v4** through the `@tailwindcss/vite` plugin configured in `vite.config.ts`. `src/index.css` imports Tailwind with `@import 'tailwindcss';`. Use Tailwind utility classes directly in JSX and put global CSS or Tailwind v4 theme customization in `src/index.css`. This scaffold does not need a Tailwind config file or PostCSS config.

`src/main.tsx` imports `src/index.css`, so global font wiring belongs in `src/index.css`. Keep CSS `@import` statements first, then add any `@font-face` rules and font-family defaults there.
