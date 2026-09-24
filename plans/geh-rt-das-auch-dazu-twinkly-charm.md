# Plan: Asset-Manifest Integration & Alt-Text-Fixes

## Context

Der User hat das `asset-manifest.json` aus dem v90-Source-Mockup angehängt und gefragt ob es zum Projekt gehört. Die Explore-Phase zeigt: Alle Assets sind vorhanden — aber 3 Partner-Logos haben falsche Alt-Texte in `App.tsx`, und das Manifest liegt bereits unter `src/imports/asset-manifest.json`. Das Manifest soll als echte Datenquelle in die `AnalysisWorkbench` eingebunden werden statt der hartkodierten Inventar-Zahlen.

**Einziges wirklich fehlendes Asset:** `technical-field-background.png` (2.5 MB) — ist nicht im Projekt vorhanden und wird aktuell nicht referenziert. Keine Aktion nötig.

---

## Befunde aus der Explore-Phase

| Manifest-Label | Datei in public/assets/ | Alt-Text aktuell | Korrekt |
|---|---|---|---|
| GE Aerospace | `logo-exchange-1.svg` | "EAeroSpace" | ❌ falsch |
| TURBOCAM International | `logo-exchange-2.svg` | "additiveSTREAM" | ❌ falsch |
| FANUC | `logo-exchange-3.svg` | "FANUC" | ✅ korrekt |
| (Exchange Partner 4) | `logo-exchange-4.png` | "Exchange Partner" | ⚠ unklar |

Manifest bereits vorhanden: `src/imports/asset-manifest.json` (und `-1.json` als Duplikat).

---

## Änderungen

### 0. v90-HTML-Bewertung (neu aus Prüfung)

Das v90-Original enthält **`data-track-region`-Attribute** und **`data-route-step` / `data-section-name` / `data-section-no`** die im aktuellen App.tsx noch fehlen. Außerdem verwendet v90 für `data-stage` numerische Werte (`0`–`4`), während App.tsx semantische Strings (`"damaged"` etc.) gesetzt hat — das muss auf v90-Konvention angepasst werden.

**Fehlende `data-track-region`-Attribute (aus v90):**
- `hero_blade` → hero visual wrapper
- `company_hyphen`, `company_as4d` → Specialist-Cards
- `proof_video_hyphen`, `proof_video_as4d` → Proof-Video-Articles
- `blade_state_sequence` → Integration Path state strip
- `system_architecture`, `system_node_detail` → Section 05 divs
- `event_banner_icam`, `event_banner_demo` → Event-Banner
- `partner_validation` → Partner-Marquee-Wrapper
- `whitepaper_form` → Form-Element

**`data-stage`-Korrektur:** v90 nutzt `0`–`4`, nicht semantische Strings. App.tsx muss angepasst werden.

**`data-route-step`, `data-section-name`, `data-section-no`:** Diese 3 Attribute fehlen auf allen 7 section-Tags.

### 1. Alt-Texte korrigieren — `src/App.tsx` (ca. Zeile 121–125)

```ts
const partnerLogos = [
  { src: '/assets/logo-exchange-1.svg', alt: 'GE Aerospace' },
  { src: '/assets/logo-exchange-2.svg', alt: 'TURBOCAM International' },
  { src: '/assets/logo-exchange-3.svg', alt: 'FANUC' },
  { src: '/assets/logo-exchange-4.png', alt: 'Exchange Partner' },
  // ... bestehende weitere Logos unverändert
];
```

### 1b. Fehlende `data-track-region` + `data-route-step` ergänzen — `src/App.tsx`

Für jeden der 7 Sections: `data-route-step`, `data-section-name`, `data-section-no` ergänzen.

Für alle Regionen: `data-track-region` auf die jeweiligen Wrapper-Elemente (Hero-Visual, Company-Cards, Proof-Video-Articles, State-Strip, System-Architecture-Div, Detail-Panel, Event-Banner, Partner-Wrap, Form).

`data-stage` auf Blade-State-Karten: von semantischen Strings (`"damaged"`) auf numerische Werte (`"0"`) gemäß v90-Konvention korrigieren.

### 2. Manifest als Datenquelle in AnalysisWorkbench einbinden — `src/AnalysisWorkbench.tsx`

- `import assetManifest from '../imports/asset-manifest.json'` (Vite unterstützt JSON-Imports nativ)
- Im Overview-View: echte Zahlen aus Manifest statt hardkodierter `{ total: 120, byType: {...} }`
- Im Stack-Footer oder als neuer "Assets"-Tab: echte Asset-Liste aus `assetManifest.assets` mit `path`, `mime`, `size_bytes`, `labels`, `sha256`

Konkret in `AnalysisWorkbench.tsx`:
- Ersetze die hartkodierte `SITE_MANIFEST.assetInventory` durch echte Counts aus dem Manifest
- Füge im Overview-View einen neuen "Asset Inventory"-Block hinzu mit den realen Zahlen (32 unique, 55 occurrences, 23 dedupliziert)

### 3. Duplikat-Manifest aufräumen (optional)

`src/imports/asset-manifest-1.json` ist identisch mit `asset-manifest.json` → kann gelöscht werden wenn der User bestätigt.

---

## Dateien die geändert werden

- `src/App.tsx` — Alt-Texte in `partnerLogos` (3 Zeilen)
- `src/AnalysisWorkbench.tsx` — Import + reale Asset-Daten in Overview + neue Asset-Liste

## Zusätzlicher Fund: v90-Basis-HTML

Das zweite Attachment (`da4990e9`) ist die **v90-Source-HTML** selbst:
- Dateiname: `index(20260923-041214) (1).html`
- `data-mockup="visitor-v90-final-fullwidth-dividers-03-04"`, 14.181 Zeilen
- SHA-256 `a241b138…` — exakt das im Schema referenzierte Basis-Dokument

**Aktion:** In `src/imports/` ablegen als `v90-basis.html` — als nicht-gerenderte Referenzdatei. Kein Build-Impact, da Vite HTML-Dateien in `src/` nicht automatisch verarbeitet. Dient als forensische Quelle für spätere Selector-Audits.

## Dateien die nicht geändert werden

- `src/imports/asset-manifest.json` — wird nur importiert, nicht modifiziert
- `public/assets/` — alle Assets vorhanden, kein Upload nötig

---

## Verifikation

1. Site laden → Evidence Landscape Section → Marquee prüfen: GE Aerospace und TURBOCAM International korrekt als Alt-Text
2. "Intelligence"-Button unten rechts → Overview → Asset-Metriken zeigen 32 unique / 55 occurrences
3. `npx tsc --noEmit` — keine neuen Fehler
