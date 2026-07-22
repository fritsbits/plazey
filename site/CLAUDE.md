# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # dev server at http://localhost:4321
npm run build     # static build → dist/
npx astro check   # TypeScript check (0 errors expected; ignore zod deprecation hints)
```

## Stack

- Astro 6 (static), hosted on Netlify. No server, no database.
- Content in Markdown files under `src/content/`.
- Git-based CMS on `/admin` (Sveltia CMS, config in `public/admin/config.yml`): Lies manages programme items and the site phase; every save commits to `main` → Netlify auto-deploys. See `docs/wiki/admin-cms.md`.
- No CSS framework — styles live in a single `global.css` driven by design tokens (no Tailwind/Bootstrap). The huisstijl has shipped; see Design Context below.

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
- `ProgramCard.astro` — programme card used on Programma pages and Home teaser. When the item has a markdown body (default slot), embed, or artist credit, the card opens a native `<dialog>` lightbox with the full act info; otherwise it's a static card. No detail pages — everything lives on the overview.
- `Accordion.astro` — `<details>`/`<summary>` pattern, used for FAQ sections

**Site config:** `src/config/site.ts` — exports `SITE_PHASE`, `FESTIVAL_YEAR`, `FESTIVAL_DATES_NL/FR`, `FESTIVAL_LOCATION`, `CONTACT_EMAIL`, `FACEBOOK_URL`. `SITE_PHASE` controls what renders and is read from `src/config/phase.json` (editable via the CMS — never hardcode the phase back into site.ts).

**Programme collection:** glob loader from `src/content/programme/**/*.md`. The folder is the language: filter with `e.id.startsWith('nl/')` / `('fr/')` — there is no `lang` frontmatter field. NL and FR files share the same filename (one item = `nl/slug.md` + `fr/slug.md`); the CMS pairs them as one entry. Strip the prefix when building page slugs. Neutral enum values for `type` and `stage` are translated per language in `src/config/programme-labels.ts`.

**Programme filter (Programma pages):** one axis only — **type**. A row of single-select toggle chips (`<button aria-pressed>`); nothing pressed means "show everything", so there is no "all types" chip, and pressing the active chip clears it. Chips are only rendered for types that have items, so an empty result is unreachable — no empty state exists. Filtering show/hides rendered HTML, no re-fetch; `?type=` syncs to the URL for shareable links; an `aria-live` region announces the count (silent on first paint). The chip bar is JS-only, so it ships `hidden` and the script reveals it.

**Days are structure, not filter state:** each day is a `<section data-day>` with an `h2.day-header` anchor (`#day-friday`…), plus a `.day-jump` `<nav>` of plain anchor links above the chips (works without JS). Filtering hides a day's heading and its jump link when none of its cards survive. There is deliberately no day filter — the whole programme is a short scroll, so a day filter would only remove what you can already see.

**Programme act info:** no detail pages. The card (or its quiet "Lees meer" / "Lire la suite" button) opens a native `<dialog>` lightbox — focus trap, Esc, and backdrop-click close for free. Old `/programma/<slug>` URLs 301 to the overview (netlify.toml splat redirects). Without JS, a `<noscript>` style in BaseLayout shows the dialog content inline under the card. Click-to-play embed inside the lightbox: lazy iframe loaded on button click (JS), `<noscript>` fallback link.

**Forms:** Contact, volunteer, and project-proposal forms use **Netlify Forms** (`data-netlify="true"`). No third-party form backend. Submissions are captured by Netlify and forwarded by email. Each form has a hidden `form-name` input and a client-side JS progressive-enhancement handler that POSTs with `fetch()` so the user stays on the page. The `<noscript>` path still submits natively.

## Programme content collection schema

The field list lives in `src/content.config.ts` — read it there rather than duplicating it here. Gotcha: adding a `stage` or `curator` option touches three files: `public/admin/config.yml`, `src/content.config.ts` (stage enum), and `src/config/programme-labels.ts` (stage labels).

## Content update workflow

Two routes, both ending in a commit on `main` → Netlify auto-deploys:

1. **Lies (organiser), self-service:** plazey.be/admin → edits programme items or the site phase → save commits directly.
2. **Frederik via Claude Code:** organiser sends update (WhatsApp/email) → paste to Claude → Claude updates `.md` file(s) → git commit.

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
**Current style — loud poster-carnival.** Huisstijl has shipped: deliberately bold and saturated. The earlier restrained framing and the cream-only, no-neon guidance are retired.

- **Base / surfaces:** pink full-bleed page background (`--color-page` `#F0788F`) with cream cards and panels (`--color-surface` `#FCF2E7`) laid on top; maroon ink (`--color-text` `#6F2418`) for display type and for text on cream. Body-size text set directly on the pink page uses `--color-text-on-page` (`#310801`, near-black) to hold WCAG AA — maroon-on-pink is for large display text only.
- **Named accents:** yellow `#F6CB2F`, orange `#F49A00`, green `#3F6C39`, sage `#94AB86`, maroon `#6F2418`, cream `#FCF2E7`, dark nav `#2E2C26`. (The old accent set — coral, mustard, slate-blue, blush — is gone.)
- **Themed section panels:** the page reads as a sequence of coloured bands, not one flat surface — dark nav masthead, pink full-bleed hero, green Programma panel and footer, yellow doe-mee / callout panels, cream cards throughout.
- **Typography:** Luckiest Guy as the display face (headings, buttons, badges, the wordmark — set uppercase, tilted); Karla for body. Karla is the final body face — the earlier licensed "Garet" stand-in plan is retired.
- **Light mode only.** No dark mode planned. The pink page is the base surface now, not cream; the dark nav is a deliberate themed panel, not a mode.
- **Radius:** a 5-step scale, not one project-wide value — `--radius-lg` 24px (images), `--radius-md` 20px (cards), `--radius-sm` 14px (buttons), `--radius-xs` 12px (tags/marks), `--radius-pill` 999px (chips/pill buttons).
- **Image treatment ("sticker"):** contained content images get the sticker treatment — 24px radius, 4px maroon border, hard offset colour shadow (`.sticker-img` + shadow-colour modifiers), alternating shadow colour down the page. Genuinely full-bleed atmosphere bands stay edge-to-edge and are not stickered — a deliberate mixed treatment.
- **Poster signature:** thick maroon borders, hard offset shadows (no soft drop-shadows), slight tilts (-2° to 1°) on cards, badges, and buttons. Borders over shadows. All tilts and transforms collapse under `prefers-reduced-motion`. No marquee, no scattered confetti.

**Explicit anti-references:** Countdown timers, DJ-poster aesthetics, anything that looks like a ticketed concert site. (Dark backgrounds and neon accents are no longer blanket anti-references — the nav is deliberately dark and the palette is deliberately saturated.)

### Design Principles
1. **Type carries character.** Luckiest Guy as the display face is the main personality signal — uppercase, tilted, loud. Karla carries the body copy: legible, calm, never competing.
2. **Loud, on purpose.** Festive energy comes from saturated colour, hard offsets, tilts, and themed section panels — the direction is deliberately bold and loud, not restrained. (Retires the earlier restraint-first framing.)
3. **Readable by everyone.** Short sentences, clear hierarchy, WCAG AA minimum. Maroon ink is for display type and text on cream only — body text set on the pink page uses `--color-text-on-page` to hold AA contrast. Designed for language learners and small screens first. Always honour `prefers-reduced-motion` (rotations and transforms collapse to none).
4. **Community-first aesthetics.** A little roughness or warmth beats slick polish. Poster quality over corporate finish. Cards lean, edges feel cut by hand.
5. **Tokens, not values.** Every colour, radius, and rhythm value goes through `--token` custom properties in `global.css`. Radius is now a scale, not a single value — pick the right step, never hard-code a px radius.

## Do not suggest

- A hosted/paid CMS or CMS migration (the git-based Sveltia setup on /admin is the CMS)
- Server-side rendering or API routes
- Database integrations
- Ticketing, RSVP, or user accounts (festival is free and open)
- EN-language version (NL + FR only)
- Instagram links anywhere
- park-kaart / SVG map (cut from scope)
- Formspree or any third-party form backend — we use Netlify Forms (built into hosting)
