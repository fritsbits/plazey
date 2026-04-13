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
