# Praktisch — section-level visual variation

**Date:** 2026-04-21
**Scope:** NL `/nl/praktisch` and FR `/fr/infos-pratiques`.

## Problem

After the 2026-04-21 critique pass, the page reads clean but every section uses the same structural skeleton — image hero, h2, h3-list, paragraph, callout. Five sections of identical rhythm means the scroll feels monotonous and important-vs-utility sections carry the same visual weight.

## Principle

**Function before form.** Each section adopts a format because it helps the reader do *their specific job on that section* faster. Variation is the by-product, not the goal. A practical page doesn't earn decorative differentiation — it earns functional differentiation.

## Per-section design

### 1. Bereikbaarheid — 2×2 transport-mode grid

Replaces the current stack of four h3 subsections (Metro, Tram en bus, Fiets, Auto) with a 2×2 grid of transport cards. Each card contains the mode name (Caprasimo, prominent), a short lead sentence, and any supporting details as a tight list.

Content per card:
- **Metro** — Lijn 2 of 6, halte Simonis/Elisabeth. 10 min wandelen. Metro heeft een lift.
- **Tram & bus** — Halte Elisabethpark of Simonis/Elisabeth. Lijnen: Tram 9, 19 · MIVB 13, 87, N16, 49, 53 · De Lijn 212, 213, 214, 355.
- **Fiets** — Onbewaakte stalling op het terrein. Breng een slot mee.
- **Auto** — Betalend rondom het park of parking Indigoneo (Eugène Simonisplein 24, 1081 Koekelberg).

**Decision:** the Tram & bus card has more content than the others. The grid accepts this asymmetry — that card simply runs deeper than its row-mate. No special spanning logic, no bottom-row wide variant.

Park-image hero and the "Hulp nodig om van de metro naar het terrein te geraken?" callout are unchanged.

### 2. Eten & drinken — unchanged, minus one image

Structure is already distinctive after the earlier rework (image-pair + typographic menu board). Only change:

- **Drop the `etenGrillen` image.** It's portrait, cropped awkwardly into a 16:7 block, and adds nothing the image-pair above doesn't already convey.

Final flow: intro → image-pair (foodkraam + tokens) → "Aan de bar" menu board → draft-note → stands paragraph → "Cash én tokens worden aanvaard." bold line.

Remove the `etenGrillen` import from both NL and FR page frontmatter.

### 3. Toegankelijkheid — 4-category directory

Replaces the flat 9-item `<ul class="grid sm:grid-cols-2">` plus separate "Veiligheid" subsection with a 2×2 category grid. Four categories, three items each:

- **Gehoor** — CM1-toestel · Tolk Vlaamse Gebarentaal (zondag 15:00–19:00) · Oordopjes
- **Mobiliteit** — Vlakke hoofdpaden · Aangepaste toiletten · Metro Simonis heeft een lift
- **Zorg & info** — ADL-vrijwilligers · Programma en dranklijst in braille · Rustige ruimte
- **Veiligheid** — "Gaat het?" vragen · aanspreken van medewerkers (gele/roze t-shirt) · luisteren zonder oordeel

The existing `<h3>Veiligheid</h3>` subsection disappears — its three bullets become the fourth quadrant. Each category gets a Caprasimo label with a thin rule under it, followed by its three items as a compact list.

Image hero and the mailto callout are unchanged.

**FR category labels:** Audition · Mobilité · Aide & info · Sécurité.

### 4. Kinderen — compact dt/dd block

No image. H2 + one-line intro, then three term/description pairs in a `<dl>`:

- **Je kind kwijt?** — Kom naar de infostand.
- **Luier?** — Luierplek op het terrein.
- **Te hard geluid?** — Oordopjes en kinderkoptelefoon aan de infostand.

Intentionally the shortest section. Text-only signals "utility, quick answer" rather than "feature section."

**FR terms:** `Enfant perdu ?` · `Change ?` · `Trop fort ?`
**FR descriptions:** `Viens à l'infostand.` · `Table à langer sur place.` · `Bouchons d'oreilles et casque enfant à l'infostand.`

### 5. Veelgestelde vragen — unchanged

Accordion + trailing mailto. The current treatment is already minimal and job-appropriate.

## Scroll rhythm

Top → bottom: image-hero + grid · image-pair + menu · image-hero + 4-col directory · text-only terms · text-only accordion. Image-heavy sections live near the top; text-only sections taper off. Matches how attention actually decays on a long utility page.

## CSS additions

Three new component blocks in `global.css`. Token-based, huisstijl-ready.

- **`.transport-grid`** — `display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;` with `grid-template-columns: 1fr` under 640px.
- **`.transport-card`** — padded block with subtle border and muted surface. Contains `.transport-mode` (Caprasimo heading) + body.
- **`.access-grid`** — same grid shape as `.transport-grid` (could share a single `.col-grid-2` token — decide during implementation).
- **`.access-cat-label`** — Caprasimo, bottom rule, short label.
- **`.kids-terms`** — `<dl>` with `<dt>` Caprasimo + bold, `<dd>` muted body text. Row-based layout on mobile; two-column on ≥sm if it reads better.

All three new blocks use existing tokens (`--color-text`, `--color-border`, `--radius`). No new colour values, no hard-coded spacing outside the existing scale.

## Per-file changes

| File | Change |
|---|---|
| `src/pages/nl/praktisch/index.astro` | Bereikbaarheid → transport-grid. Eten → drop `etenGrillen` + figure. Toegankelijkheid → 4-category access-grid (merges current "Veiligheid" subsection). Kinderen → dl with `.kids-terms`. Remove `etenGrillen` import. |
| `src/pages/fr/infos-pratiques/index.astro` | Same restructure with FR copy. Remove `etenGrillen` import. |
| `src/styles/global.css` | Add `.transport-grid` + `.transport-card` + `.transport-mode`, `.access-grid` + `.access-cat-label`, `.kids-terms` (+ `dt`/`dd` inside). |

## Out of scope

- **Image asset changes.** We drop one import; we don't commission or crop new imagery.
- **CTA section.** Untouched — it keeps the light `.callout` + `.cta-form` pattern from the 2026-04-21 CTA decision.
- **Subnav, hero meta line, FAQ.** Untouched.
- **Other long pages (Over Plazey, Doe mee).** This spec is Praktisch-only. The same principle could apply later, but each page has different content and deserves its own pass.
- **Responsive breakpoints beyond 640px.** Default Tailwind `sm` (640px) handles the grid collapse. No tablet-specific behaviour.
- **Accessibility tag additions.** The existing `aria-labelledby` + heading structure is preserved.
