# Admin CMS — programme beheer voor Lies

*Status: live sinds 2026-07-16. Vervangt "No CMS in v1" — de delegatie-case uit [tech-stack.md](tech-stack.md) ("If delegation becomes necessary → add Decap CMS") is ingetreden.*

## Wat het is

Een git-based CMS op **plazey.be/admin**: een browser-formulier bovenop de bestaande markdown-files. Geen server, geen database — elke save is een git-commit op `main`, Netlify bouwt en deployt automatisch (~1-2 min).

- **CMS:** [Sveltia CMS](https://github.com/sveltia/sveltia-cms) — actief onderhouden opvolger van Decap/Netlify CMS, zelfde config-formaat, betere UX.
- **Bestanden:** `site/public/admin/index.html` (laadt Sveltia van unpkg) + `site/public/admin/config.yml` (collecties, velden, Nederlandse labels).
- **Login:** GitHub OAuth via Netlify's OAuth-provider. Lies heeft een GitHub-account met collaborator-toegang tot `fritsbits/plazey`.

## Wat Lies kan beheren

1. **Programma** — één entry per item, NL links / FR rechts naast elkaar. Gedeelde feiten (dag, startuur, plek, type, curator, embed-link, draft) worden één keer ingevuld en automatisch gekopieerd; alleen titel, genre, korte tekst en lange tekst zijn per taal.
2. **Site-fase** — dropdown in "Site-instellingen": save-the-date / reveal / live / aftermovie. Schrijft naar `site/src/config/phase.json`; `site.ts` leest die file (met build-time validatie).

Publicatie is direct (geen review-stap): een fout is één git-revert verwijderd. Het bestaande `draft`-veld ("Nog niet tonen op de site") blijft de manier om items voor te bereiden.

## Ontwerpbeslissingen

- **i18n multiple_folders** — de bestaande structuur `programme/nl/` + `programme/fr/` met identieke bestandsnamen ís Decap/Sveltia's i18n-formaat. Vijf FR-files met gelokaliseerde slugs zijn hernoemd naar de NL-slug (`battle-de-danse` → `dance-battle`, `court-metrages` → `kortfilms`, `theatre-froefroe` → `theater-froefroe`, `arborescences-samedi/dimanche` → `-zaterdag/-zondag`); 301-redirects in `site/netlify.toml` vangen de oude FR-URL's op.
- **`lang`-veld geschrapt** uit frontmatter — de map (`nl/`/`fr/`) is de bron; pagina's filteren op `id.startsWith('nl/')`.
- **`stage` en `curator` zijn selects** — voorkomt spellingsvarianten. `stage` slaat een neutrale waarde op (bv. `tentoonstelling`) die per taal vertaald wordt in `site/src/config/programme-labels.ts` (zelfde patroon als `type`). Nieuwe optie toevoegen = Frederik past `config.yml` + `programme-labels.ts` + `content.config.ts` aan.
- **Directe publicatie** — geen editorial workflow/PR-review; dat zou Frederik opnieuw tot bottleneck maken.

## Hulp voor Lies

Cheat sheet (NL, printbaar): **plazey.be/admin/hulp/** — bron: `site/public/admin/hulp/index.html`. Inloggen, item aanpassen/toevoegen, draft-veld, fase omzetten, wat te doen bij fouten.

## Onderhoud

- Nieuwe plek/podium of curator: opties toevoegen in `site/public/admin/config.yml` (en voor stage ook `programme-labels.ts` + het enum in `content.config.ts`).
- CMS-versie: unpkg laadt automatisch de laatste Sveltia-release; bij breaking changes kan een versie gepind worden in `admin/index.html`.
- Lokaal testen: `local_backend: true` staat in de config; draai `npx decap-server` in de repo-root en open `localhost:4321/admin/index.html` (in Brave werkt alleen de Decap-variant; Sveltia's lokale modus vereist de File System Access API die Brave standaard blokkeert).
