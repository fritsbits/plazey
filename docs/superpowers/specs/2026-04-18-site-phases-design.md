# Site phases design — Plazey 2026

**Date:** 2026-04-18  
**Status:** approved  
**Owner:** Frederik

---

## Context

The site has a single `SITE_PHASE` variable in `src/config/site.ts` that controls what renders. Changing it is a one-commit deploy. This document defines exactly what changes per phase, across which pages and components.

Scope: **Approach B** — page-level phases. Only Home, nav, Programma page, and the Doe mee split are phase-aware. Praktisch and Over Plazey are evergreen and never change.

---

## Phase overview

| Phase | When | Primary goal |
|---|---|---|
| `save-the-date` | Now → ~late July 2026 | Recruit volunteers and project proposals, build awareness |
| `reveal` | ~4 weeks before festival → Aug 21 | Get people to come, browse the programme |
| `live` | Aug 22–24 (festival weekend) | Real-time: what's on now + how to get there |
| `aftermovie` | Aug 25 → spring 2027 | Thank visitors, preserve memory, stay alive until next cycle |

---

## New page: /stel-een-project-voor

The current `/doe-mee` page combines two distinct audiences: practical volunteers and people who want to propose a project. These are split into two separate pages:

- `/nl/vrijwilliger` — volunteer recruitment (was the top section of `/doe-mee`)
- `/nl/stel-een-project-voor` — project proposals (was the bottom section of `/doe-mee`)
- FR equivalents: `/fr/benevole` and `/fr/propose-ton-projet`

The project proposal page is **only reachable via nav during `save-the-date`**. After that phase the nav link disappears — the deadline has passed. The URL stays alive (no 404) but no CTA points to it.

Both pages get the warm opening motif (tone of voice §3.6), extending the three warm-motif slots to four:
1. Home hero
2. Over Plazey opening
3. /vrijwilliger opening — "Kom helpen. Achter de bar, aan de kassa, of bij het opruimen."
4. /stel-een-project-voor opening — e.g. "Stel je voor. Met je idee en je buurt." *(to be written)*

---

## Nav per phase

| Phase | NL nav links | FR nav links |
|---|---|---|
| `save-the-date` | Praktisch · Over · Kom helpen · Stel een project voor | Pratique · À propos · Venir aider · Proposer un projet |
| `reveal` | Programma · Praktisch · Over · Kom helpen | Programme · Pratique · À propos · Venir aider |
| `live` | Programma · Praktisch · Over · Kom helpen | Programme · Pratique · À propos · Venir aider |
| `aftermovie` | Programma 2026 · Praktisch · Over · Kom helpen | Programme 2026 · Pratique · À propos · Venir aider |

"Programma" only appears in nav once there is a programme to show. In aftermovie it is labelled "Programma 2026" to signal it is an archive.

---

## Home page per phase

### save-the-date

**Hero:**
- H1: unchanged — "Kom langs. Plazey is drie dagen lang gratis feest in het Elisabethpark."
- Primary CTA: "Kom helpen" → `/nl/vrijwilliger`
- Secondary CTA (ghost): "Stel een project voor" → `/nl/stel-een-project-voor`
- No "Zo geraak je er" text link (not relevant yet)

**Programme teaser:**
- No cards
- Text: "Het programma volgt binnenkort." + Facebook link

### reveal

**Hero:**
- H1: unchanged
- Primary CTA: "Bekijk het programma" → `/nl/programma`
- Secondary CTA (ghost): "Kom helpen" → `/nl/vrijwilliger`
- "Zo geraak je er" text link returns → `/nl/praktisch#bereikbaarheid`

**Programme teaser:**
- Real Saturday highlights (3 cards, same component as Programma page)
- Day tabs: Vrijdag / Zaterdag / Zondag
- Text link: "Zie het volledige programma →"

### live

**Hero:**
- H1: unchanged
- Primary CTA: "Zie wat er vandaag speelt" → `/nl/programma`
- Secondary CTA (ghost): "Zo geraak je er" → `/nl/praktisch#bereikbaarheid` (now urgent — people are coming today)
- No volunteer CTA

**Programme teaser:**
- Replaced by "Vandaag op Plazey" section
- Shows: what's on now + next 2 items from today's schedule
- Text link: "Zie alles wat er vandaag is →"

### aftermovie

**Hero:**
- H1 replaced: "Bedankt. Tot volgend jaar."
- Primary CTA: "Bekijk de foto's" → facebook.com/plazeyfestival *(only if photos posted; otherwise no CTA)*
- No secondary CTA

**Programme teaser:**
- Replaced by quiet "Terugblik op Plazey 2026" block
- Text link to full programme archive: "Bekijk het volledige programma 2026 →"

---

## Programma page per phase

### save-the-date
- Page exists at URL but is not in nav
- H1: "Programma"
- Below H1: "Het programma 2026 volgt binnenkort. Volg ons op Facebook." + Facebook link
- No filters, no cards

### reveal + live
- Full programme with day and type filters
- In `live`: default day filter auto-set to today's date

### aftermovie
- Full programme still browsable as archive
- Small banner above filters: "Dit was het programma van Plazey 2026."
- Filters unchanged — people can browse the archive

---

## Doe mee pages per phase

### /vrijwilliger

| Phase | State |
|---|---|
| `save-the-date` | Fully active — primary destination from home hero |
| `reveal` | Still visible but home hero no longer points here; volunteer deadline closing |
| `live` | Accessible but gets no traffic; no changes |
| `aftermovie` | Off-season seasonal banner: "Inschrijven voor editie 2027 start in april. Laat nu al van je horen via info@plazey.be." |

No content changes on the page itself across phases — the seasonal banner (already designed in S7) handles the off-season state. Phase shifts are expressed through where CTAs point, not through page content.

### /stel-een-project-voor

| Phase | State |
|---|---|
| `save-the-date` | In nav, linked from home hero (secondary CTA) |
| `reveal` | Hidden from nav; URL stays alive but no CTA points to it |
| `live` | Same as reveal |
| `aftermovie` | Same as reveal |

---

## Pages not affected by phase

- `/nl/praktisch` — evergreen, updated annually before the festival
- `/nl/over-plazey` — evergreen, updated annually

---

## Redirects

The old `/doe-mee` URL must redirect to `/vrijwilliger` (301) in both languages:

- `/nl/doe-mee` → `/nl/vrijwilliger`
- `/fr/participe` → `/fr/benevole`

Add to `netlify.toml` redirects.

---

## Implementation note

All phase logic lives in `SITE_PHASE` in `src/config/site.ts`. To switch phases: change the value, commit, push — Netlify deploys automatically. The nav and each affected page component reads `SITE_PHASE` directly. No runtime logic, no date-based auto-switching — Frederik flips it manually.

The `live` phase "Vandaag op Plazey" content on home uses today's date to filter programme items at build time. This means a rebuild (or a Netlify scheduled deploy) is needed once per day during the festival weekend to keep "now" and "next" items current.
