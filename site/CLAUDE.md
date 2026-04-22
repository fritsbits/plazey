# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # dev server at http://localhost:4321
npm run build     # static build → dist/
npx astro check   # TypeScript check (0 errors expected; ignore zod deprecation hints)
```

## Stack

- Astro 6 (static), hosted on Netlify. No server, no CMS in v1.
- Content in Markdown files under `src/content/`. No database.
- No CSS framework — styles come when the huisstijl is ready. No visual design in v1.

## Site map

| NL URL | FR URL | Page |
|---|---|---|
| `/nl/` | `/fr/` | Home |
| `/nl/programma/` | `/fr/programme/` | Programme |
| `/nl/praktisch/` | `/fr/infos-pratiques/` | Practical info |
| `/nl/over-plazey/` | `/fr/a-propos/` | About Plazey |
| `/nl/doe-mee/` | `/fr/participez/` | Get involved |

Note: `/fr/pratique/` exists as a 301 redirect to `/fr/infos-pratiques/`.

## Bilingual routing

- Page files: `src/pages/nl/` and `src/pages/fr/`
- Content files: `src/content/programme/nl/` and `src/content/programme/fr/`
- Every page passes `lang` and `currentPath` props to BaseLayout
- Two fully independent versions — no mixing of NL and FR within a page

## Architecture

**Layout shell:** `src/layouts/BaseLayout.astro` renders the full HTML shell — `<html lang>`, skip link, `<Header>`, `<main id="main-content">`, `<Footer>`. Accepts `title`, `lang`, and optional `currentPath`.

**Components:** `src/components/`
- `Header.astro` — sticky nav, mobile hamburger with focus trap + Escape-to-close, lang toggle
- `Footer.astro` — 4 blocks: contact, social (Facebook only), org (De Platoo + De Zeyp), legal
- `ProgramCard.astro` — card link used on Programma pages and Home teaser
- `Accordion.astro` — `<details>`/`<summary>` pattern, used for FAQ sections

**Site config:** `src/config/site.ts` — exports `SITE_PHASE`, `FESTIVAL_YEAR`, `FESTIVAL_DATES_NL/FR`, `FESTIVAL_LOCATION`, `CONTACT_EMAIL`, `FACEBOOK_URL`. Change `SITE_PHASE` to control what renders (currently `'reveal'`).

**Programme collection:** glob loader from `src/content/programme/**/*.md`. Filter by `lang` field to separate NL/FR content. Content IDs include the language prefix (`nl/le-ministere-du-groove`) — strip it when building page slugs.

**Programme filter (Programma pages):** client-side JS only. Radio buttons for day, checkboxes for type. Filters show/hide rendered HTML — no re-fetch. URL query params sync state for shareable links. `aria-live` region announces result count.

**Programme detail pages:** `[slug].astro` with `getStaticPaths`. Click-to-play embed: lazy iframe loaded on button click (JS), `<noscript>` fallback link.

**Forms:** Contact, volunteer, and project-proposal forms use **Netlify Forms** (`data-netlify="true"`). No third-party form backend. Submissions are captured by Netlify and forwarded by email. Each form has a hidden `form-name` input and a client-side JS progressive-enhancement handler that POSTs with `fetch()` so the user stays on the page. The `<noscript>` path still submits natively.

## Programme content collection schema (`src/content.config.ts`)

- `title` (string, required)
- `lang` (enum: nl | fr, required)
- `day` (enum: friday | saturday | sunday, required)
- `startTime` (string "HH:MM", required)
- `endTime` (string "HH:MM", optional)
- `stage` (string, required)
- `type` (enum: concert | film | workshop | kids | dans | off-stage, required)
- `genre` (string, optional)
- `artist` (string, optional)
- `description` (string, optional)
- `embedUrl` (URL string, optional) — Spotify/SoundCloud, renders as click-to-play

## Content update workflow

1. Organiser sends update (WhatsApp/email)
2. Frederik pastes to Claude Code
3. Claude updates the relevant `.md` file(s) in `src/content/programme/`
4. Git commit → Netlify auto-deploys

## Tone of voice

Full guide: https://www.notion.so/frederik-vincx/Tone-of-voice-guide-Plazey-33fd3ecc475c81caa19dc265e61ebf70

Key rules:
- **One idea per sentence, keep sentences short.** The site must be readable for language learners, children, tired people, screenreaders.
- **Active voice.** Never passive.
- **"Je" not "u"** — it's a neighbourhood festival, not a service.
- **No jargon:** no "line-up", "headliner", "bottom-up", "meergenerationeel", "laagdrempelig", "inclusieve beleving", "shift" (use "terwijl je helpt" instead).
- **Concrete over abstract:** name what you do and with whom. Never "100% toegankelijk voor iedereen".
- **Three warm moments only:** Home hero, Over Plazey opening, Doe mee opening. Everywhere else: factual and tight.
- The French version uses "tu" throughout and has its own warm openings (not translations of the NL).

## Praktisch page in-page anchors

NL: `#bereikbaarheid`, `#eten-en-drinken`, `#toegankelijkheid`, `#kinderen`, `#faq`
FR: `#acces`, `#manger-et-boire`, `#accessibilite`, `#enfants`, `#questions-frequentes`

## Social

- Facebook only: facebook.com/plazeyfestival
- No Instagram account — do not add Instagram links anywhere on the site.

## Design Context

### Users
Brussels neighbourhood residents — families, children, language learners (NL + FR), volunteers, and people who want to contribute a project. Casual, community context: users arrive via Facebook shares, word of mouth, or physical flyers. Not a tech-savvy audience. Many access on mobile. Readability must work for tired people, kids, and people reading in a second language.

### Brand Personality
Warm, bubbly, accessible — the energy of a neighbourhood party, not a polished festival brand. Honest and direct. Nothing corporate, distant, or over-designed.

### Aesthetic Direction
**Now (wireframe phase):** Grayscale only. Caprasimo for headings, system-ui for body. Huisstijl tokens replace CSS custom properties in `global.css` — no markup changes needed.

**Huisstijl target:** Bold & festive — strong colours, expressive typography, poster-like composition. Feels like something the community could have made.

**Explicit anti-references:** Generic festival look — dark backgrounds, neon accents, countdown timers, DJ poster aesthetics.

### Design Principles
1. **Type carries character.** Caprasimo is the main personality signal. Body supports it — legible, calm, never competing.
2. **Bold, not loud.** Festive energy from confident colour and composition, not visual noise.
3. **Readable by everyone.** Short sentences, clear hierarchy, WCAG AA minimum. Language learners and small screens first.
4. **Community-first aesthetics.** Warmth over slick polish. Poster quality over corporate finish.
5. **Huisstijl-ready at all times.** No hard-coded values. All decisions must survive a token swap.

## Do not suggest

- A CMS (no CMS in v1)
- Server-side rendering or API routes
- Database integrations
- Ticketing, RSVP, or user accounts (festival is free and open)
- EN-language version (NL + FR only)
- Instagram links anywhere
- park-kaart / SVG map (cut from scope)
- Formspree or any third-party form backend — we use Netlify Forms (built into hosting)
