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

Brevity serves clarity, not minimalism. Two short sentences beats one long one, and beats one stripped one. The rules below pull in different directions on purpose — read all of them before writing.

### Sentence craft

- **One idea per sentence, keep sentences short.** Readable for language learners, children, tired people, screenreaders.
  - ❌ Plazey is een gratis buurtfestival in het Elisabethpark dat al sinds 1992 bestaat en waar muziek, dans, workshops en kunst samenkomen.
  - ✅ Plazey is een gratis buurtfestival in het Elisabethpark. Het bestaat al sinds 1992. Muziek, dans, workshops, kunst.
- **Active voice.** Never passive.
  - ❌ Het programma wordt gemaakt door de buurt.
  - ✅ De buurt maakt het programma.
- **Don't strip the object in warm moments.** Short ≠ stripped. Bridge CTAs and openings need a noun, not just a verb.
  - ❌ We luisteren.
  - ✅ We luisteren graag naar jouw idee.
- **If you mean time, say time.** Vague quantifiers force the reader to guess the unit.
  - ❌ Je kiest zelf wanneer en hoeveel.
  - ✅ Je kiest zelf hoeveel tijd je wil helpen.

### Word choice

- **No jargon.** No "line-up", "headliner", "bottom-up", "meergenerationeel", "laagdrempelig", "inclusieve beleving", "shift" (use "terwijl je helpt" instead), "beleving", "evenement", "stay tuned", "ontdek".
  - ❌ Een unieke meergenerationele beleving.
  - ✅ Een buurtfeest voor kinderen, ouders en grootouders.
- **Concrete over abstract.** Name what you do and with whom. Never "100% toegankelijk voor iedereen".
  - ❌ Plazey is volledig toegankelijk.
  - ✅ De hoofdpaden zijn vlak. Aan de infostand zijn oordopjes en een programma in braille.
- **Forward-motion language for accessibility.** Be honest about progress, not defeated. Always pair what works with what's still in progress.
  - ❌ We zeggen eerlijk wat al kan en wat nog niet.
  - ✅ We geven duidelijk aan wat al toegankelijk is en waar we nog aan werken.
- **Pick the colloquial sibling.** When two words mean the same, choose the one used in the park.
  - ❌ het volledige weekend / met genoegen / we communiceren transparant
  - ✅ het hele weekend / graag / we geven duidelijk aan

### Punctuation

- **No em dashes.** Use a comma for sentence-internal interruption, a colon for term-definition, a period + new sentence for closing thoughts. Em dashes feel "designed", trip language-learners, and don't sit naturally in our display face.
  - ❌ Plazey is er voor iedereen — en je moet je er welkom voelen.
  - ✅ Plazey is er voor iedereen, en je moet je er welkom voelen.
  - ❌ `<strong>Oordopjes</strong> — aan de infostand.`
  - ✅ `<strong>Oordopjes:</strong> aan de infostand.`
  - **FR uses French spacing:** `<strong>Bouchons d'oreilles :</strong> à l'infostand.` (space before the colon).

### Content patterns

- **Three warm moments only.** Home hero, Over Plazey opening, Doe mee opening. Everywhere else is factual and tight.
- **Pair every value statement with an action.** A values line shouldn't end on the value. State what to do.
  - ❌ Ongewenst gedrag hoort hier niet thuis.
  - ✅ Ongewenst gedrag hoort hier niet thuis, spreek gerust een medewerker aan als je iets opmerkt.
- **Name the visible cue.** When you direct someone to take action, name what they should look for.
  - ❌ Spreek een medewerker aan.
  - ✅ Spreek een medewerker aan, herkenbaar aan een kleurrijke t-shirt met het Plazey-logo.

### Per-language

- **NL uses "je" not "u".** It's a neighbourhood festival, not a service.
- **FR uses "tu" throughout** and has its own warm openings — not translations of the NL.

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
**Current style — paper-cutout / community-poster.** Huisstijl has landed but is still iterating: details may shift, the direction won't.

- **Palette:** warm cream paper (`--color-surface` `#f5efe1`) and ink (`--color-text` `#1f1d1a`) as the base. Named accents — coral, green, mustard, slate-blue, blush — opted into by component, never sprinkled decoratively.
- **Typography:** Caprasimo as the display face for headings; Nunito for body (Garet stand-in until the licensed face lands).
- **Light mode only.** No dark mode planned. The cream surface is the only background.
- **Poster signature:** thick 2.5px ink borders, hard offset shadows (no soft drop-shadows), feature cards on slight rotations (-1° to 0.5°), occasional inline tilted "soft tail" inside an h2. Borders over shadows. One radius (`--radius`) everywhere except the pill chips and pill buttons.

**Explicit anti-references:** Generic festival look — dark backgrounds, neon accents, countdown timers, DJ poster aesthetics. Nothing that looks like a ticketed concert site.

### Design Principles
1. **Type carries character.** Caprasimo as the display face is the main personality signal. Body copy supports it — legible, calm, never competing.
2. **Bold, not loud.** Festive energy comes from confident colour, hard offsets, and composition, not visual noise or decoration for its own sake.
3. **Readable by everyone.** Short sentences, clear hierarchy, WCAG AA minimum. Designed for language learners and small screens first. Always honour `prefers-reduced-motion` (rotations and transforms collapse to none).
4. **Community-first aesthetics.** A little roughness or warmth beats slick polish. Poster quality over corporate finish. Cards lean, edges feel cut by hand.
5. **Tokens, not values.** Every colour, radius, and rhythm value goes through `--token` custom properties in `global.css`. The huisstijl is iterating — hard-coded values become debt the moment a token shifts.

## Do not suggest

- A CMS (no CMS in v1)
- Server-side rendering or API routes
- Database integrations
- Ticketing, RSVP, or user accounts (festival is free and open)
- EN-language version (NL + FR only)
- Instagram links anywhere
- park-kaart / SVG map (cut from scope)
- Formspree or any third-party form backend — we use Netlify Forms (built into hosting)
