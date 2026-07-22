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

---

## [2026-07-16] ingest | Image mapping — batch 2, 32 new photos from Lies

Viewed and catalogued 32 new photos from Lies in `~/Downloads/OneDrive_1_15-7-2026/` (`IMG_6139.JPG`–`IMG_6508.JPG`, still raw — not yet copied into `site/src/assets/images/`). Appended a "Batch 2" section to `wiki/image-mapping.md` and updated the gap assessment.

Batch 2 resolves several gaps flagged after batch 1:
- Evening/dusk atmosphere — `IMG_6385`
- Toegankelijkheid — `IMG_6331` and `IMG_6430` (wheelchair user visibly part of the crowd/audience), `IMG_6157`/`IMG_6177`/`IMG_6508` (real ear-protection use)
- Main stage from audience perspective — `IMG_6331`, `IMG_6508`
- Programme edge cases — `IMG_6429` (spoken word/storyteller), `IMG_6444` (petting zoo), `IMG_6457` (sewing/craft workshop), `IMG_6238` (face painting)
- Landscape hero options — `IMG_6299` (Basilica avenue), `IMG_6424` (theatre + Basilica), `IMG_6255`

Still open: behind-the-scenes/setup photos, a distinct organiser (GC De Platoo / GC De Zeyp) portrait.

Top picks for actually copying into the repo: `IMG_6299`, `IMG_6331`, `IMG_6430`, `IMG_6157`, `IMG_6424`, `IMG_6385`, `IMG_6429`, `IMG_6457` (+ honorable mentions `IMG_6177`, `IMG_6444`, `IMG_6508`). Decision on which to bring in and how to rename them is pending — see conversation.

---

## [2026-07-16] update | Batch 2 photos copied into repo and wired into live pages

Copied the 8 top picks into `site/src/assets/images/` (renamed: `acrobaat-basiliek.jpg`, `toegankelijkheid-menigte.jpg`, `theater-publiek-rolstoel.jpg`, `kind-oordoppen.jpg`, `theater-muzikanten-basiliek.jpg`, `sfeer-avondschemering.jpg`, `verteller-optreden.jpg`, `kids-naaiworkshop.jpg`).

Wired 2 of the 8 into live pages, both NL + FR:
- **Home** (`nl/index.astro`, `fr/index.astro`): `sfeer-avondschemering.jpg` added as a second full-bleed atmosphere figure, between "Hoe kom ik er?" and the "Doe mee" split section. Source photo is portrait (2656×3984); added a `.figure-crop-wide` class in `global.css` (21:9 aspect, `object-position: center 36%`) so the crop shows the string lights + crowd band rather than the tree canopy above it.
- **Praktisch** (`nl/praktisch/index.astro`, `fr/infos-pratiques/index.astro`): `toegankelijkheid-menigte.jpg` + `kind-oordoppen.jpg` added as an `.image-pair` (reusing the existing component from the Doe mee page) right after the four access-category cards. This section previously had zero images.

The remaining 6 (`acrobaat-basiliek.jpg`, `theater-muzikanten-basiliek.jpg`, `verteller-optreden.jpg`, `kids-naaiworkshop.jpg`, plus the un-copied honorable mentions) are documented in `wiki/image-placements.md` but not wired in: the `programme` content collection has no `image` field, so no per-programme-item photo placement is possible without a schema change first. Over-plazey, Doe mee, and Stel-een-project-voor already have assigned hero images and weren't touched.

Verified: `npx astro check` (0 errors), `npm run build` (71 pages built), and visual check via Chrome on both new placements (home evening figure, praktisch toegankelijkheid image pair).

## [2026-07-16] update | Admin CMS live: programma-beheer + fase-switch via /admin

Sveltia CMS toegevoegd op plazey.be/admin zodat Lies het programma zelf kan beheren en de site-fase kan omzetten. Zie [wiki/admin-cms.md](wiki/admin-cms.md) voor het volledige ontwerp. Kern:

- Eén programma-entry per item met NL/FR naast elkaar (i18n multiple_folders op de bestaande mappenstructuur). Vijf FR-files hernoemd naar NL-slugs + 301-redirects.
- `lang`-frontmatterveld geschrapt (map = taal); `stage` is nu een neutraal enum met vertaalmap in `programme-labels.ts`; `stage` en `curator` zijn selects in het CMS.
- `SITE_PHASE` verhuisd van hardcoded in `site.ts` naar `phase.json` zodat het CMS erbij kan; build-time validatie toegevoegd.
- Fixt en passant: detailpagina's toonden de ruwe type-waarde ("kermis") i.p.v. het vertaalde label.
- Nog te doen door Frederik (buiten git): GitHub OAuth-app aanmaken, Netlify OAuth-provider instellen, Lies als collaborator uitnodigen.

## [2026-07-16] update | Programma-detailpagina's vervangen door uitklapbare kaarten

De act-detailpagina's (`/nl/programma/<slug>` + `/fr/programme/<slug>`) zijn geschrapt. Meting: 15 van 27 items hadden 0–27 woorden body, dus de klik leverde vrijwel niets op; ~10 items hebben echte bio's (58–300 woorden). Beslissing (Frederik, na visuele mock): alles op het overzicht, detailpagina's weg, tekst-only (geen foto-veld).

- `ProgramCard.astro` heeft nu twee gedaantes: uitklapbare `<details>`-kaart ("Lees meer" / "Lire la suite", mosterd-pil met chevron) wanneer een item een markdown-body, embed of artist heeft; anders een statische kaart zonder knop of link. Geen doodlopende kliks meer.
- De click-to-play embed (Spotify/SoundCloud) en de artist-credit verhuisden mee naar de uitgeklapte kaart; het CMS-veld `embedUrl` blijft dus werken.
- Home-teaserkaarten zijn statisch geworden (de "bekijk programma"-knop eronder blijft de CTA).
- `[slug].astro` (NL+FR) verwijderd; netlify.toml: splat-301's `/nl/programma/*` en `/fr/programme/*` naar het overzicht (verving ook de vijf oude FR-slug-redirects, die er nu toch zouden landen).
- CMS-label bijgewerkt: "Lange tekst (detailpagina)" → "Lange tekst (klapt open op het kaartje)" + hint.
- Opgeruimd: `.type-chip` uit global.css (alleen de detailpagina gebruikte hem).
- Fix onderweg: curator-regel rendde zonder spatie ("gepresenteerd doorAfrodance") en de uitgeklapte body erfde de mosterd-tekstkleur van `.hero-green :where(p)`; beide verholpen in ProgramCard.

Geverifieerd: `astro check` 0 errors, build 17 pagina's, browser-check NL+FR (uitklap, filters incl. URL-sync, mobiel 390px). Wireframe S3 is hiermee achterhaald; noot toegevoegd in [wiki/skeleton-per-pagina/s3-programma-item.md](wiki/skeleton-per-pagina/s3-programma-item.md).

## [2026-07-16] update | Uitklap-kaarten vervangen door lightbox na feedback

Feedback Frederik op de uitklap-versie: de mosterd-pil was te opvallend, en lange teksten (Kortfilms, 300 woorden) werden een onleesbaar hoge smalle kolom in het grid. Vervangen door een lightbox:

- De hele kaart (of de rustige "Lees meer"-tekstlink met coral-onderstreping, in de `.btn-text`-grammatica) opent een native `<dialog>`: focus-trap, Esc en backdrop-klik gratis. Poster-paneel op leesbreedte (36rem), interne scroll, sticky sluitknop, dag · tijd · plek-metaregel in de kop.
- Zonder JS toont een `<noscript>`-style in BaseLayout de dialooginhoud inline onder de kaart.
- Gotcha: Tailwind v4-preflight zet `margin: 0` op alles en sloopt zo de native centrering van `<dialog>`; expliciete `margin: auto` herstelt dat (dialoog verscheen linksboven).

Geverifieerd in de browser (desktop 1280 + mobiel 390): openen via kaart-klik én toetsenbord, Esc, backdrop-klik, interne scroll bij Kortfilms, 0 console errors, `astro check` 0 errors.

## [2026-07-17] query | Extern onderzoek naar aanvulbare programma-info

Onderzocht (3 parallelle agents: officiële kanalen, 3XXL-acts, overige acts + Gmail) wat er publiek verifieerbaar toe te voegen is aan de magere programma-items. Resultaat in [wiki/programma-onderzoek-extern-2026-07.md](wiki/programma-onderzoek-extern-2026-07.md). Kort: uren za/zo bestaan nog niet (Lies, mail 22/06: "die puzzel wordt pas eind juli gemaakt"); de officiële affiche staat op deplatoo.be met vrijdag-uren en één ontbrekende act (Apéro literair door Boekelberg); sterke bio-bronnen gevonden voor FroeFroe (Pretpakket 2.0, kalender-match 30/08 De Platoo), Arborescences, STRUK, Dance Orientation, Flemish Primitives en Jennifur; TROY/Neeya/KZ/Les Choux de Bruxelles waarschijnlijk maar onbevestigd; 3XXL, Karsten Quix en Afrodance-curator online onvindbaar → vragen aan Lies. Nog geen sitewijzigingen doorgevoerd.

## [2026-07-17] update | Onderzochte bio's toegepast op 12 programma-items + nieuw item Apéro literair

Vervolg op het externe onderzoek (zie vorige entry): bio's toegevoegd (NL+FR, description + body) voor Theater FroeFroe (Pretpakket 2.0), Arborescences ×2, Fête Foraine/STRUK, Dance Orientation (nu vrijdag 15:00, van de affiche), The Flemish Primitives, Jennifur, en, onder voorbehoud van bevestiging door Lies, TROY, Neeya, KZ en Les Choux de Bruxelles. Nieuw item `apero-literair.md` (zondag, off-stage, curator Boekelberg, enkel kaarttekst) van de officiële affiche; "Boekelberg" toegevoegd aan de curator-select in `public/admin/config.yml`. KZ-frontmatter opgeschoond (lege velden + placeholder-description weg). Statustracker en open vragen (nu 13) bijgewerkt in [wiki/content-intake-status.md](wiki/content-intake-status.md). Conceptmail met alle vragen voor Lies als Gmail-draft klaargezet. Geverifieerd: `astro check` 0 errors, build 17 pagina's.

## [2026-07-22] update | Programma-navigatie vereenvoudigd: dagfilter geschrapt, type als toggle-chips

Frederik's observatie: de filterrij maakte iets eenvoudigs moeilijk. De cijfers gaven hem gelijk — 28 items (6 vr / 9 za / 13 zo), waarvan 19 concerten. Een dagfilter neemt weg wat je toch al ziet, en een "alle types"-knop bestond alleen omdat radio's niet leeg kunnen zijn.

- **Dagfilter weg.** De dagen zijn al de structuur van de pagina. Vervangen door een `.day-jump` `<nav>` met gewone ankerlinks (*Vrijdag · Zaterdag · Zondag*) naar de dag-koppen: navigatie in plaats van state, werkt zonder JS, deelbaar. `scroll-margin-top` op `.day-header` houdt de kop onder de sticky site-header.
- **Type als single-select toggle-chips** (`<button aria-pressed>`). Niets ingedrukt = alles tonen, dus geen "Alle types"-chip; nog eens drukken wist de selectie. Multi-select bewust niet: bij twee actieve chips weet niemand of het AND of OR is.
- **Weg:** `syncFacets` (~30 regels facetten-mechaniek), de dag-fieldset, beide "alle"-knoppen, de lege staat, de `?dag=`-parameter, en de CSS voor `.filter-group`, `.filter-legend`, `.filter-pills`, `.filter-reset`, `.programme-empty`. Netto ~90 regels per pagina eruit. De lege staat is onbereikbaar geworden: chips bestaan alleen voor types die items hebben, dus één type aanklikken geeft altijd ≥1 kaart.
- De chiprij ship't `hidden` en wordt door het script zichtbaar gemaakt, zodat je zonder JS geen knoppen ziet die niets doen.
- Filteren verbergt nog steeds een dag-kop die leegvalt, en nu ook diens ankerlink.
- Twee fixes onderweg: het oude script crashte in de `save-the-date`-fase (`list` is dan `null`, nu achter één guard), en de hover-stijl won van de ingedrukte staat, zodat een net aangeklikte chip troebel bleef zolang de muis erop stond (`:hover:not([aria-pressed="true"])`).

Geverifieerd: `astro check` 0 errors, build 17 pagina's, browsertest NL 420px (28 kaarten → "Dans" = 2 kaarten / 2 dagkoppen / 2 ankerlinks / `?type=dans` → nog eens klikken = 28 terug en param weg → ankerlink scrollt naar `#day-sunday`), 0 console errors.

Docs bijgewerkt: [site/CLAUDE.md](../site/CLAUDE.md), [wiki/skeleton-per-pagina/s2-programma.md](wiki/skeleton-per-pagina/s2-programma.md) (Zone 2 + Zone 4 herschreven, noot over de drie afwijkingen t.o.v. het wireframe), [wiki/skeleton-overzicht.md](wiki/skeleton-overzicht.md), [wiki/website-copy/2-programma.md](wiki/website-copy/2-programma.md) (NL + FR; ook de datums gecorrigeerd van 22–24 naar 28–30 augustus).
