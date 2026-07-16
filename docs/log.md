# Log — Plazey docs wiki

Append-only chronological record of ingests, queries, and maintenance passes.

---

## [2026-04-12] ingest | Initial setup — all Notion sources imported

Imported all Notion pages from the "Plazey communicatie" project into `raw/`. Sources:

- `strategie-scope-structuur.md` — UX planning doc v5 (Garrett planes 0–3)
- `skeleton-overzicht.md` — Skeleton overview with principles and page briefs
- `skeleton-per-pagina/s0` through `s7` — Per-page wireframe specs
- `tone-of-voice.md` — Writing guide
- `tech-stack.md` — Astro + Netlify decision and rationale
- `website-copy/1` through `6` — Draft NL+FR copy for all pages
- `vergadering-2026-04-10.md` — Meeting transcript
- `referenties.md` — Bruzz article (aug 2023, interview Lies Van Overschée)
- `visual-inspiration.md` + 2 images in `assets/`

Wiki not yet built. `index.md` created. `CLAUDE.md` schema written.

---

## [2026-04-12] query | Image mapping — all 25 media photos analysed

Read and described all 25 photos in `/plazey/media/`. Created `wiki/image-mapping.md` with:
- Per-photo inventory: filename, description, mood, suggested website placement
- Image needs assessment per page (S1–S6): coverage rating and specific gaps

---

## [2026-04-12] update | Image placements page created

Created `wiki/image-placements.md` — visual reference assigning specific photos to each slot on each page (S1, S3 per-type, S4, S5, S6). Photos embedded inline with markdown image syntax. Placeholder markers added for slots with no suitable photo.

Summary of placeholders (8 total):
- S1: evening/dusk crowd shot
- S3: spoken word, film/cinema, main stage from audience
- S4: meaningful toegankelijkheid section header, families/baby facilities
- S5: organiser/core team portrait, behind-the-scenes/setup
- S6: opbouw volunteer role, "after the shift" crew celebration

Key findings:
- Well covered: atmosphere/crowd, music performance, kids activities, food, volunteers, park establishing shots
- Gaps: evening/dusk shots (only 1), toegankelijkheid (meaningful shots missing), main stage from audience POV, behind-the-scenes/setup, organiser portraits, landscape-oriented crops for hero slots

## [2026-07-16] ingest | Contentbatch 1 van de organisatie (3 Word-docs)

Drie docx-bestanden ontvangen en geïngest naar `raw/` met provenance-headers (datum + sha256, zodat een geüpdatete versie van hetzelfde doc detecteerbaar is):

- `2026-07-16-basiswebsite.md` — prijslijst, openingsuren (vr 14u-24u, za/zo 14u-22u), gehoor = enkel oordopjes, vraag om derde organisatorenblok (De Zeyp, De Platoo, Vaartkapoen)
- `2026-07-16-plazey-pro.md` — programmateksten podium: vrijdag met uren, za/zo zonder uren
- `2026-07-16-randactiviteiten.md` — grotendeels lege tabel; promoteksten en foto's volgen in een latere batch

Nieuw: `wiki/content-intake-status.md` — tracker per content-item (bron → site-target → status) + workflow voor volgende batches en geüpdatete docs. Site-updates toegepast in dezelfde sessie (programme-entries, praktisch, over-plazey, NL+FR).

## [2026-07-16] update | Admin CMS live: programma-beheer + fase-switch via /admin

Sveltia CMS toegevoegd op plazey.be/admin zodat Lies het programma zelf kan beheren en de site-fase kan omzetten. Zie [wiki/admin-cms.md](wiki/admin-cms.md) voor het volledige ontwerp. Kern:

- Eén programma-entry per item met NL/FR naast elkaar (i18n multiple_folders op de bestaande mappenstructuur). Vijf FR-files hernoemd naar NL-slugs + 301-redirects.
- `lang`-frontmatterveld geschrapt (map = taal); `stage` is nu een neutraal enum met vertaalmap in `programme-labels.ts`; `stage` en `curator` zijn selects in het CMS.
- `SITE_PHASE` verhuisd van hardcoded in `site.ts` naar `phase.json` zodat het CMS erbij kan; build-time validatie toegevoegd.
- Fixt en passant: detailpagina's toonden de ruwe type-waarde ("kermis") i.p.v. het vertaalde label.
- Nog te doen door Frederik (buiten git): GitHub OAuth-app aanmaken, Netlify OAuth-provider instellen, Lies als collaborator uitnodigen.
