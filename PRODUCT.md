# Product

## Register

brand

## Users

Brussels neighbourhood residents: families with kids, language learners (NL + FR), volunteers, and people who want to propose a project. They arrive via Facebook shares, word of mouth, or paper flyers — mostly on mobile, often tired, often reading in a second language. Not a tech-savvy audience. The job: find out what's on, when, and how to get there — free, no tickets, no accounts.

## Product Purpose

plazey.be is the website for Plazey, the free annual 3-day urban festival in Elisabethpark, Koekelberg (Brussels), running since 1992, organised by GC De Platoo + GC De Zeyp. The site answers the practical questions (programme, access, food, accessibility, kids) and invites participation (volunteer, propose a project). Success: a neighbour on a phone finds an act's day and time in seconds, and nobody feels the site wasn't made for them.

## Brand Personality

Warm, bubbly, accessible — the energy of a neighbourhood party, not a polished festival brand. Honest and direct. Three warm moments only (home hero, over-plazey opening, doe-mee opening); everywhere else factual and tight. NL uses "je", FR uses "tu". Short sentences, no festival jargon, no em dashes.

## Anti-references

- Countdown timers, DJ-poster aesthetics, anything that looks like a ticketed concert site. (Dark backgrounds and neon accents are not anti-references — the nav is deliberately dark and the palette is deliberately saturated.)
- Corporate polish, over-designed slickness, "beleving"-speak.
- Anything requiring accounts, tickets, or newsletters — the festival is free and open.

## Design Principles

1. **Type carries character.** Luckiest Guy as the display face is the personality signal — uppercase, tilted, loud; Karla carries the body copy, calm and legible.
2. **Loud, on purpose.** Energy from saturated colour, thick maroon borders, hard offset shadows, tilts, and themed section panels — the direction is deliberately bold and loud, not restrained.
3. **Readable by everyone.** WCAG AA minimum, language learners and small screens first, `prefers-reduced-motion` always honoured. Maroon ink is for display type and text on cream only; body text on the pink page uses `--color-text-on-page` to hold AA contrast.
4. **Community-first aesthetics.** Poster quality over corporate finish; a little handmade roughness is on-brand.
5. **Tokens, not values.** Every colour, radius, and rhythm goes through `--token` custom properties in `global.css`; radius is a 5-step scale, not a single value.

## Accessibility & Inclusion

WCAG AA minimum, treated as default rather than a separate feature. Short sentences for language learners and screenreaders. Light mode only (pink page, cream cards). Reduced motion collapses rotations/transforms to none. Content must work for kids, grandparents, and tired people on phones.
