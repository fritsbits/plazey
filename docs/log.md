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

## [2026-07-22] update | Fotobehandeling: van gekleurde sticker naar geplakte polaroid

Frederik's observatie op de vrijwilligerspagina: de foto's klikken niet met de rest. De oorzaak was structureel — kaarten werpen een doorschijnende inktschaduw (`--color-shadow-ink`) die de ondergrond meekleurt, foto's wierpen een **ondoorzichtige accentkleur**. Op de oranje ondergrond heeft geel nauwelijks contrast, dus je zag geen schaduw maar een tweede rechthoek die 10px verschoven was. Naast het gele `.experience-panel` leek die schaduw bovendien uit de foto te lekken.

- **Negen behandelingen geprototypeerd** in een wegwerplab (`public/photo-lab.html`, na afloop verwijderd): inktschaduw, papieren passe-partout, geplakte polaroid, uitgeknipt, kaal, kleurenmat, riso-misregistratie, boog, halftoon. Gekozen: **geplakte polaroid** — het buurtprikbord-register, niet het festivalmerk-register.
- **`.snapshot`**: cream printrand, `<figcaption>` in de flow (de ondermarge groeit dus mee als het bijschrift afbreekt), twee plakbandstrookjes als pseudo-elementen, harde inktschaduw. Kantelingen wisselen af en vallen weg onder `prefers-reduced-motion`; de rotatie van het plakband blijft, want dat is vorm en geen beweging. Een `.snapshot` in een al gekantelde `.paper-sheet` krijgt géén kanteling — twee rotaties stapelen.
- **Nieuw token** `--radius-xxs` (3px) voor printhoeken — de radiusschaal gaat van 5 naar 6 stappen.
- **`.split-image` wordt een `<div>`** met de `<figure class="snapshot">` erin: de 2rem padding van `.split-image` slikte anders de printrand op.
- **Weg:** `.sticker-img` met alle vijf modifiers, en `.image-pair`. Twee foto's naast elkaar met 1rem tussenruimte laten hun plakband botsen. In dezelfde opruimbeurt is ook het inmiddels ongebruikte `.figure-crop-wide` verwijderd (de crop die `sfeer-avondschemering.jpg` gebruikte, een foto die al eerder uit de repo verdween).
- **Twee foto's van de site:** `toegankelijkheid-menigte.jpg` (NL + FR toegankelijkheid) en `eten-grillen.jpg` (FR benevole). Bewuste kost: die eerste was de enige afbeelding die toegankelijkheid *toonde* in plaats van benoemde.
- **Bijschriften** bij alle zes NL / vijf FR foto's (11 in totaal). Twee concepten sneuvelden omdat ze feiten beweerden die nergens op de site staan ("gratis oordopjes", "Baby Spot = rustige plek").
- **Onderweg gevonden:** de eerste inventaris was gebouwd op verouderde grep-regelnummers en miste beide `eten-foodkraam`-foto's. Opnieuw opgebouwd door de bron te parsen. Drie NL/FR-afwijkingen genoteerd (benevole-structuur, ankerbanner alleen in FR, kids-sectie wel/niet gekanteld) — bewust niet rechtgetrokken.

Geverifieerd: `astro check` 0 errors, build 17 pagina's, `grep -rn "sticker-img\|image-pair" site/src` leeg, browsertest NL + FR op 1440px, 768px en 375px, plus `prefers-reduced-motion`.

Docs bijgewerkt: [site/CLAUDE.md](../site/CLAUDE.md) (radiusschaal + fotobehandeling), [wiki/image-placements.md](wiki/image-placements.md).

---

## [2026-08-06] update | Programmafilter: negen typechips teruggebracht tot vier

Frederiks observatie op de programmapagina: te veel pillen. De cijfers gaven hem gelijk. Negen types over 48 gepubliceerde items betekende dat zes chips het programma terugbrachten tot twee items of minder (theater 1, kermis 1, film 1, dans 1, expo 2, off-stage 2). Een chip die 48 kaarten tot één kaart filtert is een inhoudstafel, geen filter.

- **`typeGroups` + `typeGroupLabels`** in [`site/src/config/programme-labels.ts`](../site/src/config/programme-labels.ts), naast de bestaande `typeLabels`: **Muziek** (concert, 23), **Kinderen** (kids + kermis, 15), **Workshop** (3), **Te zien** (dans, film, theater, expo, off-stage, 7). FR: Musique / Enfants / Ateliers / À voir. De vier groepen dekken samen alle 48 items en geen enkele houdt er minder dan drie.
- **De contenttypes blijven negen.** De groepering is puur weergave: `content.config.ts`, de CMS-config en de `.md`-bestanden zijn niet aangeraakt, en de kaarten houden hun eigen `typeLabels`-badge. Een Fête Foraine-kaart leest dus nog steeds "Kermis", ook al zit ze onder de chip Kinderen.
- **Matchen op lidmaatschap.** Elke chip draagt `data-type` (groepssleutel) en `data-types` (de types die ze dekt); het script bouwt daar een Map van in plaats van op gelijkheid te vergelijken.
- **Oude gedeelde links blijven werken.** `?type=expo` is geen chipsleutel meer; de vorige guard zou hem stil negeren en alles tonen. Een `resolve()` valt nu terug op de groep die het type bevat. `?type=kids` blijft ongewijzigd, want het kinderblok linkt ernaar, en daarom houdt die groep bewust de naam `kids`.
- **Onderweg gevonden:** de eerste telling (concert 24, 50 items) kwam uit een grep over de map en telde twee `draft: true`-items mee, Dance Orientation en The Flemish Primitives. De pagina rendert er 48. Verandert de groepering niet, wel de cijfers.
- **Chipvulling**: de pillen krijgen een dekkende vulling 14% donkerder dan de groene ondergrond (hover 26%) in plaats van de doorschijnende cream-hover. Ze lezen nu als objecten op het paneel in plaats van als uitgesneden contouren.

Geverifieerd: `astro check` 0 errors, build 17 pagina's, en 43 browserasserties tegen de gebouwde site: per chip de telling, nog eens klikken wist, URL-sync, dagkoppen en ankerlinks die meekrimpen, de aria-live-telling, beide taalversies, `?type=expo` → Te zien, `?type=nonsense` → alles, en de groepering die echt types mengt (Kinderen trekt de kermiskaart mee en sluit de concerten uit; Te zien dekt alle vijf haar leden).

Docs bijgewerkt: [site/CLAUDE.md](../site/CLAUDE.md), [wiki/skeleton-per-pagina/s2-programma.md](wiki/skeleton-per-pagina/s2-programma.md) (Zone 2 + Zone 4).

---

## [2026-08-06] update | Kinderblok van de programmapagina weg, ingang verhuist naar Praktisch

Frederiks oordeel over het blokje van vanmiddag: te aanwezig. Een beige `paper-sheet` met kop, tekst en twee knoppen stond tussen de intro en de chips, terwijl de chip **Kinderen** een centimeter lager hetzelfde doet. Het blok verkocht een filter die al zichtbaar was.

- **`.kids-callout` is weg** op `nl/programma` en `fr/programme`, samen met zijn CSS en de `a[data-filter-type]`-handler in beide filterscripts. Die handler bestond alleen om de knop in het blok in place te laten filteren; de `?type=`-sync bij page load doet de rest.
- **De ingang zit nu waar de vraag ontstaat.** Wie op Praktisch de sectie Kinderen leest (zoek geraakt kind, Babycaravan, oordopjes), krijgt onder de lijst één knop: **Alle kinderactiviteiten** → `/nl/programma/?type=kids`. FR: **Toutes les activités enfants** → `/fr/programme/?type=kids`. Eén richting in plaats van twee knoppen die naar elkaar wijzen.
- **Verborgen in de save-the-date-fase**, want dan staat er geen programma om naartoe te linken.
- De groep `kids` houdt daarom nog altijd bewust die naam: die cross-page link is nu de enige ingang naar de kinderfilter.
- **De chip heet nu "Kinderen en families"** (FR "Enfants et familles"), zoals Lies vroeg. Alleen het label in `typeGroupLabels`; de sleutel blijft `kids`. Op 1280px staan de vier chips nog op één rij, op 375px wrapt het naar twee.

Geverifieerd: `astro check` 0 errors, build 17 pagina's, `grep -c kids-callout dist/**` → 0, en een browsertest die vanaf `#kinderen` doorklikt: URL `?type=kids`, chip Kinderen actief, 15 kaarten zichtbaar.

Docs bijgewerkt: [site/CLAUDE.md](../site/CLAUDE.md), [wiki/skeleton-per-pagina/s2-programma.md](wiki/skeleton-per-pagina/s2-programma.md).

---

## [2026-08-06] update | FAQ-openingsuren gelijkgezet met het programma

De FAQ op Praktisch zei nog "zaterdag en zondag van 14:00 tot 22:00", maar sinds de dagschema's van Lies begint zondag al om 10:00 (Arborescences en Zwerfsteen om 10:00, apéro literair om 10:30). Zaterdag en zondag staan nu apart:

- NL: "Vrijdag van 14:00 tot middernacht. Zaterdag van 14:00 tot 22:00. Zondag van 10:00 tot 22:00."
- FR: "Le vendredi de 14h à minuit. Le samedi de 14h à 22h. Le dimanche de 10h à 22h."

De sluitingsuren blijven staan zoals in het basisdoc (vr middernacht, za/zo 22u); die volgen niet uit het programma, want de laatste acts (3XL DJ's 21:15 op zaterdag, Nostos 21:00 op zondag) hebben geen einduur. Ter bevestiging voorgelegd aan Lies.

Dezelfde regel rechtgezet in [wiki/website-copy/3-praktisch.md](wiki/website-copy/3-praktisch.md), waar nog de achterhaalde 19:30-versie met invulplaatsen stond.

Geverifieerd: `astro check` 0 errors, build 17 pagina's, en beide regels teruggevonden in `dist`.

---

## [2026-08-08] update | CMS-toegang gedocumenteerd als voorwaarde, Sveltia-bundle gepind

Vraag van Frederik na het lezen van [wiki/admin-cms.md](wiki/admin-cms.md): `/admin` is een raadbare URL, en kan om het even wie met een GitHub-account daar inloggen?

**De URL is geen risico.** `site/public/admin/index.html` is een script-tag en verder niets. Wie hem laadt, krijgt een leeg loginscherm. De `noindex` is beleefdheid tegenover zoekmachines, geen controle, en hoeft dat ook niet te zijn.

**Inloggen kan inderdaad iedereen, opslaan niet.** De CMS heeft geen eigen backend: een save is een GitHub API-call met het token van de ingelogde persoon zelf. Zonder push-recht op `fritsbits/plazey` weigert GitHub de commit. De repo is publiek, dus lezen kon sowieso al rechtstreeks op GitHub. De grens die telt is GitHub's permissiemodel, en die staat.

**Twee echte bevindingen:**

- De collaborator-lijst van `fritsbits/plazey` bevat enkel `fritsbits` (admin). `admin-cms.md` beweerde nochtans dat Lies al collaborator-toegang had. Ofwel is ze nooit uitgenodigd, ofwel staat de uitnodiging nog open (openstaande uitnodigingen tonen niet in die lijst). **Actie voor Frederik: nakijken.** Zonder aanvaarde uitnodiging loopt het pas mis op de Save-knop.
- `admin/index.html` laadde `@sveltia/cms` ongepind van unpkg, altijd de laatste release, zonder SRI. In die pagina leeft een GitHub-token met schrijfrecht, dus dat is een openstaande deur richting third-party code.

**Wat aangepast is:**

- **Bundle gepind op `0.181.1`** met `integrity` (sha384) en `crossorigin="anonymous"`. Hash afgeleid uit de npm-tarball; unpkg serveert die bytes ongewijzigd. De upgrade-procedure (versie én hash samen vervangen) staat nu met kant-en-klaar commando in admin-cms.md.
- **Nieuwe sectie "Toegang"** in admin-cms.md: toegang als voorwaarde geformuleerd in plaats van als feit, met de vier stappen (account → username doorgeven → uitnodigen met rol Write → uitnodiging aanvaarden) en waarom de volgorde vastligt.
- **Hulppagina uitgebreid** met "Eén keer instellen" vóór "Inloggen": account aanmaken, username doorsturen, uitnodiging aanvaarden. "Inloggen" vermeldt nu het Authorize-scherm, en "Iets misgelopen?" koppelt een foutmelding bij het bewaren aan de niet-aanvaarde uitnodiging.

Niet aangepast: direct publiceren naar `main` zonder branch protection blijft zoals het is. Dat is de bewuste keuze uit de oorspronkelijke opzet (review maakt Frederik opnieuw de bottleneck) en de schade is één revert ver.

Geverifieerd: beide HTML-bestanden sluiten correct, de `integrity` in `admin/index.html` komt overeen met de sha384 van `package/dist/sveltia-cms.js` uit de tarball van 0.181.1. Geen Astro-build gedraaid: alles zit in `public/` (wordt ongewijzigd gekopieerd) en in `docs/`.

---

## [2026-08-11] update | Typechips blijven meescrollen onder de nav

De chipbalk op Programma stond bovenaan de pagina en verdween zodra je begon te scrollen. Wie halverwege zaterdag bedacht dat hij enkel workshops wou zien, moest eerst helemaal terug naar boven. De balk plakt nu onder de nav (`position: sticky`, `top: var(--header-height)`, `z-index: 15`, één onder de nav zelf).

Wat het tegenhield: `.hero-intro` draagt `overflow: hidden` om zijn openingsanimatie binnen de sectie te houden, en daarmee wordt die sectie een scrollcontainer, wat sticky stilzwijgend uitschakelt. Op deze pagina staat er nu `overflow-x: clip`: clip knipt wel af, maar maakt geen scrollcontainer aan.

Drie details die het af maken:

- **De balk loopt van rand tot rand** (`margin-inline: calc(50% - 50vw)`, padding zet de goot terug). Een band die op de containerrand stopt, zet vlak groen tegen de getextureerde groene sectie: dat leest als een naad. De chips blijven wel uitlijnen met de kaarten.
- **Achtergrond pas bij `[data-stuck]`.** Op zijn plek blijft de balk doorzichtig boven de textuur. Een sentinel plus `IntersectionObserver` zet het attribuut; de cream haarlijn eronder is een `box-shadow`, dus zonder layout shift.
- **Dagankers springen ook langs de balk.** `--filter-height` wordt live gemeten met een `ResizeObserver` en telt mee in `scroll-margin-top`, anders landt "Zondag" onder de chips.

Sentinel en meting worden in JS aangemaakt, niet in de markup: zonder JS zijn er geen chips, dus valt er niets vast te zetten. Een `:has(> [hidden])`-regel klapt de lege balk in dat geval dicht.

Op mobiel kost de balk 124px (vier chips over twee rijen), samen met de nav 197px van 844px. Bewust zo gelaten: één rij met horizontaal scrollen zou chips verstoppen.

Geverifieerd: `astro check` 0 errors, build 17 pagina's, en een Playwright-test op NL én FR (1440px en 390px) die bevestigt dat de balk vlak onder de nav zit (gap 0), dat de linkerrand van de chips gelijkloopt met die van de kaarten (296/296 desktop, 16/16 mobiel), dat er geen horizontale overflow bijkomt, dat de achtergrond weer loslaat bovenaan, en dat `#day-sunday` vrij van de balk landt.

Terzijde vastgesteld: [site/CLAUDE.md](../site/CLAUDE.md) beweert "No CSS framework — no Tailwind", maar Tailwind v4 draait wel degelijk (`@tailwindcss/vite`, `@import "tailwindcss"`, en `Container.astro` gebruikt `max-w-4xl mx-auto px-4 sm:px-6`). Nog niet rechtgezet.

---

## [2026-08-31] update | Site in aftermovie-modus, met een fotomuur op de home

De dag na het festival. `phase.json` staat op `aftermovie`. Dat schakelt de home om naar "Bedankt! Tot volgend jaar.", hernoemt Programma naar Programma 2026 in de nav, en zet een terugblikbanner op Programma.

Wat de fase niet deed, was de rest van de site meenemen. Praktisch stond er byte voor byte hetzelfde bij als tijdens het festival. En Vrijwilliger, dat in deze fase terugkeert in de nav, beloofde nog altijd een infomoment op donderdag 27 augustus. Dat is nu weg in beide talen.

**Fotomuur.** Er is geen aftermovie, wel tien foto's. Die staan nu op de home, direct onder de hero, in plaats van de losse Facebook-knop. Facebook blijft als tekstlink eronder staan. De lijst en de alt-teksten per taal staan in `src/config/photos-2026.ts`, zodat NL en FR één volgorde delen. Die volgorde begint aan de kassa op zaterdagmiddag en eindigt op de dansvloer 's nachts, met dag en avond afgewisseld zodat de muur geen blok donkere kaders wordt.

De prints zijn `.snapshot` zonder het plakband. Plakband steekt links en rechts een centimeter of anderhalf buiten de print, dus buren in een raster botsen met de hoeken. Die regel stond al in site/CLAUDE.md. De print houdt wel de cream rand, de harde inktschaduw en de scheefstand. Die scheefstand loopt in vier stappen in plaats van links-rechts, anders krijgt elke rij van een driekolomsmuur dezelfde helling op dezelfde plek.

De muur loopt op 72rem, breder dan de 56rem leesmaat van de rest van de site. Op de contentbreedte was elke print ongeveer 265px, wat leest als een contactafdruk in plaats van als foto's. Nu is het 339px. De titel en de Facebook-link blijven wel op 56rem, zodat ze uitlijnen met de andere sectiekoppen en alleen de muur uitsteekt.

**Seizoensbanner.** `.season-banner` bestond als classnaam op Programma maar had geen enkele CSS-regel. Hij haalde zijn achtergrond uit een inline style en kwam eruit als een vlakke doos zonder rand of schaduw. Nu draagt hij de posterhandtekening, en hij staat ook op Praktisch en Vrijwilliger. Cream, niet een van de accentkleuren: hij moet leesbaar zijn op de roze home, de gele Praktisch-pagina, de oranje Vrijwilliger-pagina en het groene Programma-paneel, en cream is de enige grond die op alle vier opvalt.

Praktisch en Vrijwilliger wisselen daarnaast hun H1 en hun formuliercopy. De rest van beide pagina's blijft bewust in de tegenwoordige tijd: het beschrijft een editie die geweest is en volgend jaar grotendeels weer klopt, dus de fase terugzetten volstaat om de site weer open te zetten.

Terzijde rechtgezet, en het bleek vandaag te knellen: site/CLAUDE.md beweerde "No CSS framework, no Tailwind". Tailwind v4 draait wel degelijk, en dat is niet vrijblijvend. De utilities-laag wint van `@layer components`, ongeacht specificiteit. Daarom kon de fotomuur `Container`'s `max-w-4xl` niet overschrijven en kreeg hij een eigen wrapperclass. De stack-sectie zegt dat nu, met de gotcha erbij.

Geverifieerd: `astro check` 0 errors, build 17 pagina's, en Playwright-shots van NL en FR op 1440px, 768px en 390px. Printbreedte 339px op desktop, geen horizontale overflow op geen enkele breedte, en de linkerrand van de sectietitel loopt gelijk met die van de andere sectiekoppen (296/296).
