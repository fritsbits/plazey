# Tailwind Structural Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Install Tailwind CSS and apply structural layout classes across all components and pages — nav, containers, section spacing, grids, and cards — without making any colour or typography decisions.

**Architecture:** Tailwind is added via the official Astro integration. A `Container` component wraps content inside sections so pages stay clean. The Header uses `flex-wrap` to handle the mobile dropdown in-flow (menu pushes content down rather than overlaying it). All pages follow the same section pattern: `<section class="py-12"><Container>…</Container></section>`.

**Tech Stack:** Astro 6, Tailwind CSS v3 via `@astrojs/tailwind`, Node/npm

---

## File map

| Action | File |
|---|---|
| Run once | `npx astro add tailwind` (creates `tailwind.config.mjs`, updates `astro.config.mjs`) |
| Create | `src/components/Container.astro` |
| Modify | `src/layouts/BaseLayout.astro` |
| Modify | `src/components/Header.astro` |
| Modify | `src/components/Footer.astro` |
| Modify | `src/components/ProgramCard.astro` |
| Modify | `src/components/Accordion.astro` |
| Modify | `src/pages/nl/index.astro` |
| Modify | `src/pages/fr/index.astro` |
| Modify | `src/pages/nl/programma/index.astro` |
| Modify | `src/pages/fr/programme/index.astro` |
| Modify | `src/pages/nl/programma/[slug].astro` |
| Modify | `src/pages/fr/programme/[slug].astro` |
| Modify | `src/pages/nl/praktisch/index.astro` |
| Modify | `src/pages/fr/infos-pratiques/index.astro` |
| Modify | `src/pages/nl/over-plazey/index.astro` |
| Modify | `src/pages/fr/a-propos/index.astro` |
| Modify | `src/pages/nl/doe-mee/index.astro` |
| Modify | `src/pages/fr/participez/index.astro` |

---

## Task 1: Install Tailwind and create Container component

**Files:**
- Run: `npx astro add tailwind` (auto-creates `tailwind.config.mjs`, updates `astro.config.mjs`)
- Create: `src/components/Container.astro`

- [ ] **Step 1: Install Tailwind via Astro integration**

```bash
npx astro add tailwind
```

Accept all prompts. This installs `@astrojs/tailwind`, creates `tailwind.config.mjs`, and adds the integration to `astro.config.mjs`.

- [ ] **Step 2: Create the Container component**

Create `src/components/Container.astro`:

```astro
---
---
<div class="max-w-4xl mx-auto px-4 sm:px-6">
  <slot />
</div>
```

- [ ] **Step 3: Verify the build still passes**

```bash
npm run dev
```

Expected: dev server starts at `http://localhost:4321`, no errors in terminal. The site looks unstyled (Tailwind resets all browser defaults — that's expected at this stage).

---

## Task 2: BaseLayout shell

**Files:**
- Modify: `src/layouts/BaseLayout.astro`

- [ ] **Step 1: Add layout classes to body and main**

In `src/layouts/BaseLayout.astro`, update `<body>` and `<main>`:

```astro
<body class="min-h-screen flex flex-col">
  <a class="skip-link" href="#main-content">{skipLabel}</a>
  <Header lang={lang} currentPath={currentPath} />
  <main id="main-content" class="flex-1">
    <slot />
  </main>
  <Footer lang={lang} />
</body>
```

- [ ] **Step 2: Verify footer is pinned to bottom on short pages**

Open `http://localhost:4321/nl/doe-mee` — a short page. Footer should sit at the bottom of the viewport, not mid-page.

---

## Task 3: Header layout

**Files:**
- Modify: `src/components/Header.astro`

- [ ] **Step 1: Add Tailwind classes to all header elements**

Replace the `<header>` and its contents in `src/components/Header.astro` with:

```astro
<header class="border-b">
  <nav aria-label={navLabel} class="max-w-4xl mx-auto px-4 sm:px-6 flex flex-wrap items-center py-3 gap-x-4">
    <a href={homeHref} aria-label={logoAriaLabel} class="logo-link mr-auto font-semibold text-lg">Plazey</a>

    <button
      class="nav-toggle md:hidden"
      aria-expanded="false"
      aria-controls="nav-menu"
      aria-label={menuLabel}
    >
      ☰
    </button>

    <ul id="nav-menu" role="list"
      class="hidden w-full order-last md:order-none md:w-auto md:flex items-center gap-6 text-sm data-[open]:flex data-[open]:flex-col data-[open]:py-4 data-[open]:gap-4 data-[open]:border-t">
      {nav.map(({ href, label }) => (
        <li>
          <a
            href={href}
            aria-current={currentPath.startsWith(href) ? 'page' : undefined}
          >
            {label}
          </a>
        </li>
      ))}
    </ul>

    <div role="group" aria-label={langLabel} class="lang-toggle flex items-center gap-2 text-sm">
      <a
        href={`/nl${currentPath.replace(/^\/(nl|fr)/, '')}`}
        lang="nl"
        aria-current={lang === 'nl' ? 'true' : undefined}
      >NL</a>
      <a
        href={`/fr${currentPath.replace(/^\/(nl|fr)/, '')}`}
        lang="fr"
        aria-current={lang === 'fr' ? 'true' : undefined}
      >FR</a>
    </div>
  </nav>
</header>
```

Keep the existing `<script>` block unchanged — the JS already handles `data-open` toggling on the `<ul>`.

Remove the existing `<style>` block (it had no rules for the nav, only the skip link which moves to BaseLayout).

- [ ] **Step 2: Move skip-link style into BaseLayout**

The `<style>` in BaseLayout already has `.skip-link` rules — no change needed there. Confirm the `<Header>` component no longer has a `<style>` block after the change above.

- [ ] **Step 3: Verify desktop nav**

At `http://localhost:4321/nl` at ≥768px viewport: logo left, nav links in a row, NL/FR toggle to the right, no hamburger visible.

- [ ] **Step 4: Verify mobile nav**

At <768px viewport: logo left, hamburger right. Click hamburger — nav links drop below the header bar as a column. Press Escape — menu closes (existing JS handles this).

---

## Task 4: Footer layout

**Files:**
- Modify: `src/components/Footer.astro`

- [ ] **Step 1: Add a wrapper div and grid classes**

In `src/components/Footer.astro`, wrap the existing content in a grid div:

```astro
<footer>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
    <div class="footer-contact">
      <h2>Contact</h2>
      <p><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
      <p><a href="tel:+3224120050">02 412 00 50</a></p>
    </div>

    <div class="footer-social">
      {isNL ? <h2>Sociaal</h2> : <h2>Réseaux</h2>}
      <p>
        <a href={FACEBOOK_URL} rel="external noopener" target="_blank">
          Facebook
        </a>
      </p>
    </div>

    <div class="footer-org">
      {isNL ? <h2>Organisatie</h2> : <h2>Organisation</h2>}
      <p>
        <a href="https://deplatoo.be" rel="external noopener" target="_blank">
          {isNL ? 'Gemeenschapscentrum De Platoo' : 'Maison de quartier De Platoo'}
        </a>
      </p>
      <p>
        <a href="https://dezeyp.be" rel="external noopener" target="_blank">
          {isNL ? 'Gemeenschapscentrum De Zeyp' : 'Maison de quartier De Zeyp'}
        </a>
      </p>
    </div>

    <div class="footer-legal">
      {isNL ? <h2>Juridisch</h2> : <h2>Mentions légales</h2>}
      <p>© Plazey {FESTIVAL_YEAR}</p>
      <p>
        <a href={isNL ? '/nl/privacyverklaring' : '/fr/politique-de-confidentialite'}>
          {isNL ? 'Privacyverklaring' : 'Politique de confidentialité'}
        </a>
      </p>
      <p>
        <a href={isNL ? '/nl/toegankelijkheidsverklaring' : '/fr/declaration-accessibilite'}>
          {isNL ? 'Toegankelijkheidsverklaring' : "Déclaration d'accessibilité"}
        </a>
      </p>
    </div>

    <div class="footer-lang col-span-2 md:col-span-4 pt-4 border-t text-sm">
      <a href="/nl" lang="nl" aria-current={lang === 'nl' ? 'true' : undefined}>NL</a>
      <span aria-hidden="true"> · </span>
      <a href="/fr" lang="fr" aria-current={lang === 'fr' ? 'true' : undefined}>FR</a>
    </div>
  </div>
</footer>
```

- [ ] **Step 2: Verify footer grid**

At `http://localhost:4321/nl` at ≥768px: 4 columns side by side. At <768px: 2 columns. Lang toggle spans full width at the bottom with a top border.

---

## Task 5: ProgramCard component

**Files:**
- Modify: `src/components/ProgramCard.astro`

- [ ] **Step 1: Replace class-based markup with Tailwind classes**

Replace the entire file content of `src/components/ProgramCard.astro` with:

```astro
---
interface Props {
  title: string;
  startTime: string;
  endTime?: string;
  type: string;
  stage: string;
  description?: string;
  href: string;
  lang: 'nl' | 'fr';
}
const { title, startTime, endTime, type, stage, description, href } = Astro.props;
const timeDisplay = endTime ? `${startTime}–${endTime}` : startTime;
---

<a href={href} class="program-card flex flex-col gap-1 p-4 border rounded hover:shadow-sm">
  <span class="time text-sm">{timeDisplay}</span>
  <span class="type-chip text-xs border rounded-full px-2 py-0.5 self-start">{type}</span>
  <h3 class="card-title font-medium">{title}</h3>
  <span class="stage text-sm">{stage}</span>
  {description && <p class="card-desc text-sm mt-1">{description}</p>}
</a>
```

- [ ] **Step 2: Verify a programme card renders correctly**

Open `http://localhost:4321/nl/programma` (or the home page if programme items exist). Cards should have a visible border, padding, and a light shadow on hover.

---

## Task 6: Accordion component

**Files:**
- Modify: `src/components/Accordion.astro`

- [ ] **Step 1: Add Tailwind classes**

Replace the entire file content of `src/components/Accordion.astro` with:

```astro
---
interface Props {
  items: Array<{ question: string; answer: string }>;
  headingLevel?: 'h2' | 'h3';
}
const { items, headingLevel = 'h3' } = Astro.props;
const Heading = headingLevel;
---

<dl class="accordion divide-y">
  {items.map((item) => (
    <details class="accordion-item">
      <summary class="flex items-center justify-between py-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
        <Heading class="accordion-question font-medium text-base">{item.question}</Heading>
        <span aria-hidden="true">↓</span>
      </summary>
      <p class="accordion-answer pb-4 text-sm">{item.answer}</p>
    </details>
  ))}
</dl>
```

Note: `[&::-webkit-details-marker]:hidden` removes the default browser triangle on the summary element in WebKit browsers. The `list-none` handles Firefox.

- [ ] **Step 2: Verify on Praktisch page**

Open `http://localhost:4321/nl/praktisch`. Scroll to the FAQ section. Each row should have a bottom border, question text on the left, arrow on the right. Clicking opens/closes cleanly.

---

## Task 7: Home pages — NL and FR

**Files:**
- Modify: `src/pages/nl/index.astro`
- Modify: `src/pages/fr/index.astro`

- [ ] **Step 1: Update NL home page**

Replace the content of `src/pages/nl/index.astro` with:

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Container from '../../components/Container.astro';
import ProgramCard from '../../components/ProgramCard.astro';
import { getCollection } from 'astro:content';
import { FESTIVAL_DATES_NL, FESTIVAL_LOCATION, SITE_PHASE, FACEBOOK_URL } from '../../config/site.ts';

const allItems = await getCollection('programme');
const nlItems = allItems.filter(e => e.data.lang === 'nl');
const saturdayHighlights = nlItems.filter(e => e.data.day === 'saturday').slice(0, 3);
const hasProgramme = nlItems.length > 0;
---

<BaseLayout title="Plazey festival" lang="nl" currentPath="/nl">
  <section aria-label="Hero" class="py-16">
    <Container>
      <h1>Kom langs. Plazey is drie dagen gratis feest in het Elisabethpark.</h1>
      <p>{FESTIVAL_DATES_NL} · {FESTIVAL_LOCATION}</p>
      <a href="/nl/programma" class="btn-primary">Bekijk het programma</a>
      <a href="/nl/doe-mee" class="btn-ghost">Kom helpen</a>
      <a href="/nl/praktisch#bereikbaarheid" class="btn-text">Zo geraak je er</a>
      <p class="edition-indicator">Editie 2026</p>
    </Container>
    <figure>
      <img
        src="/images/plazey-2026.jpg"
        alt="Een kleurrijke zomeravond in het Elisabethpark tijdens Plazey 2026."
        width="1200"
        height="800"
        class="w-full"
      />
    </figure>
  </section>

  <section aria-labelledby="wat-is-plazey" class="py-12">
    <Container>
      <h2 id="wat-is-plazey">Wat is Plazey?</h2>
      <ul role="list" class="feature-blocks grid grid-cols-1 sm:grid-cols-3 gap-8 mt-6">
        <li>
          <h3>Gratis sinds 1992</h3>
          <p>Geen tickets, geen toegangsprijs. Plazey is altijd al gratis geweest.</p>
        </li>
        <li>
          <h3>Muziek, dans, workshops</h3>
          <p>Concerten, circusacts, films, kinderactiviteiten — alle genres, alle leeftijden.</p>
        </li>
        <li>
          <h3>Voor de hele buurt</h3>
          <p>We spreken meer talen. Jong en oud zijn welkom. Het programma wordt mee gemaakt door mensen uit de buurt.</p>
        </li>
      </ul>
    </Container>
  </section>

  <section aria-labelledby="programma-teaser" class="py-12">
    <Container>
      <h2 id="programma-teaser">Wat staat er op?</h2>
      {hasProgramme && SITE_PHASE !== 'save-the-date' ? (
        <>
          <div role="tablist" aria-label="Dag selecteren" class="day-tabs flex gap-2 mt-4">
            <button role="tab" aria-selected="true" aria-controls="tab-zaterdag" id="tab-btn-zaterdag">
              Zaterdag 23 aug
            </button>
          </div>
          <div id="tab-zaterdag" role="tabpanel" aria-labelledby="tab-btn-zaterdag">
            <ul role="list" class="program-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {saturdayHighlights.map(item => (
                <li>
                  <ProgramCard
                    title={item.data.title}
                    startTime={item.data.startTime}
                    {...(item.data.endTime && { endTime: item.data.endTime })}
                    type={item.data.type}
                    stage={item.data.stage}
                    {...(item.data.description && { description: item.data.description })}
                    href={`/nl/programma/${item.id.replace('nl/', '')}`}
                    lang="nl"
                  />
                </li>
              ))}
            </ul>
          </div>
          <a href="/nl/programma" class="btn-text">Zie het volledige programma →</a>
        </>
      ) : (
        <p>Het programma volgt binnenkort. <a href={FACEBOOK_URL} rel="external noopener" target="_blank">Volg ons op Facebook voor de aankondiging.</a></p>
      )}
    </Container>
  </section>

  <section aria-labelledby="bereikbaarheid-teaser" class="py-12">
    <Container>
      <h2 id="bereikbaarheid-teaser">Hoe kom ik er?</h2>
      <p>Met metro lijn 2 of 6, halte Simonis. Van daar is het tien minuten wandelen naar het park.</p>
      <p>Je kan ook komen met de tram, de bus, de fiets of de wagen.</p>
      <a href="/nl/praktisch#bereikbaarheid" class="btn-text">Meer info over bereikbaarheid →</a>
    </Container>
  </section>

  <section aria-labelledby="doe-mee-teaser" class="py-12">
    <Container>
      <h2 id="doe-mee-teaser">Doe mee</h2>
      <p>Plazey draait op vrijwilligers. Wil je helpen? Achter de bar, aan de kassa of bij het opruimen.</p>
      <a href="/nl/doe-mee" class="btn-ghost">Kom helpen</a>
    </Container>
  </section>
</BaseLayout>
```

- [ ] **Step 2: Apply the same pattern to the FR home page**

Open `src/pages/fr/index.astro`. Apply identical structural changes:
- Add `import Container from '../../components/Container.astro';`
- Add `class="py-16"` to the Hero section, move `<figure>` outside Container
- Add `class="py-12"` to all other sections
- Wrap each section's content in `<Container>`
- Add `class="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-6"` to `.feature-blocks ul`
- Add `class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4"` to `.program-cards ul`
- Add `class="flex gap-2 mt-4"` to `.day-tabs`
- Add `class="w-full"` to the hero `<img>`

- [ ] **Step 3: Verify home page layout**

Open `http://localhost:4321/nl`. Check:
- Hero spans full width, content is contained at max-width
- Feature blocks are a 3-column grid on desktop, 1-column on mobile
- Sections have visible vertical spacing between them

---

## Task 8: Programme index pages — NL and FR

**Files:**
- Modify: `src/pages/nl/programma/index.astro`
- Modify: `src/pages/fr/programme/index.astro`

- [ ] **Step 1: Update NL programme page**

In `src/pages/nl/programma/index.astro`:

1. Add import after existing imports:
```astro
import Container from '../../../components/Container.astro';
```

2. Replace the `<BaseLayout>` content with:
```astro
<BaseLayout title="Programma" lang="nl" currentPath="/nl/programma">
  <section class="py-12">
    <Container>
      <h1>Programma</h1>
      <p>22–24 augustus 2026. Alles is gratis.</p>

      <form id="filter-form" aria-label="Programma filteren" class="my-6 space-y-4">
        <fieldset class="flex flex-wrap items-center gap-2">
          <legend class="font-medium text-sm mr-2">Dag</legend>
          <label class="flex items-center gap-1 text-sm">
            <input type="radio" name="dag" value="alle" checked />
            Alle dagen
          </label>
          {days.map(d => (
            <label class="flex items-center gap-1 text-sm">
              <input type="radio" name="dag" value={d.value} />
              {d.label}
            </label>
          ))}
        </fieldset>

        <fieldset class="flex flex-wrap items-center gap-2">
          <legend class="font-medium text-sm mr-2">Type</legend>
          {types.map(t => (
            <label class="flex items-center gap-1 text-sm">
              <input type="checkbox" name="type" value={t.value} />
              {t.label}
            </label>
          ))}
        </fieldset>

        <button type="button" id="reset-filters" hidden class="text-sm underline">Alle filters wissen</button>
      </form>

      <div role="status" aria-live="polite" aria-atomic="true" id="filter-status" class="sr-only"></div>

      <div id="programme-list">
        {days.map(day => {
          const dayItems = items.filter(e => e.data.day === day.value);
          if (dayItems.length === 0) return null;
          return (
            <section data-day={day.value} aria-labelledby={`day-${day.value}`}>
              <h2 id={`day-${day.value}`} class="day-header font-medium text-lg mt-8 mb-4">{day.label}</h2>
              <ul role="list" class="program-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {dayItems.map(item => {
                  const cardProps = {
                    title: item.data.title,
                    startTime: item.data.startTime,
                    type: item.data.type,
                    stage: item.data.stage,
                    href: `/nl/programma/${item.id.replace('nl/', '')}`,
                    lang: 'nl' as const,
                    ...(item.data.endTime && { endTime: item.data.endTime }),
                    ...(item.data.description && { description: item.data.description }),
                  };
                  return (
                    <li data-type={item.data.type} data-day={item.data.day}>
                      <ProgramCard {...cardProps} />
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>

      <p id="empty-state" hidden>
        Niks gevonden met deze filters.
        <button type="button" id="reset-filters-empty" class="underline">Alle filters wissen</button>
      </p>
    </Container>
  </section>
</BaseLayout>
```

3. Remove the `<style>` block at the bottom (`.sr-only` is now provided by Tailwind).

Keep the entire `<script>` block unchanged.

- [ ] **Step 2: Apply same changes to FR programme page**

Open `src/pages/fr/programme/index.astro`. Apply the same structural changes (swap NL-specific labels for FR equivalents that already exist in the file). The structure is identical — add Container import, wrap in `<section class="py-12"><Container>`, add grid classes to `.program-cards ul`, add filter fieldset flex classes, remove `.sr-only` style block.

- [ ] **Step 3: Verify programme page**

Open `http://localhost:4321/nl/programma`. Cards should render in a grid. Filter controls should be horizontally arranged. Day headings have spacing. If no programme items exist yet, the page shows the empty state.

---

## Task 9: Programme detail pages — NL and FR

**Files:**
- Modify: `src/pages/nl/programma/[slug].astro`
- Modify: `src/pages/fr/programme/[slug].astro`

- [ ] **Step 1: Update NL detail page**

In `src/pages/nl/programma/[slug].astro`, add the Container import:
```astro
import Container from '../../../components/Container.astro';
```

Replace the `<BaseLayout>` content with:
```astro
<BaseLayout
  title={item.data.title}
  lang="nl"
  currentPath={`/nl/programma/${Astro.params.slug}`}
>
  <section class="py-12">
    <Container>
      <a href="/nl/programma" class="back-link text-sm">← Terug naar programma</a>

      <h1 class="mt-4">{item.data.title}</h1>
      <p class="meta text-sm mt-1">
        {dayLabels[item.data.day]} · {item.data.startTime}{item.data.endTime && `–${item.data.endTime}`} · {item.data.type} · {item.data.stage}
      </p>
      <span class="type-chip text-xs border rounded-full px-2 py-0.5 inline-block mt-2">{item.data.type}</span>

      <div class="description mt-6">
        <Content />
      </div>

      {item.data.embedUrl && (
        <div
          class="embed-wrapper mt-6"
          data-src={item.data.embedUrl}
          data-title={item.data.title}
        >
          <button class="play-btn w-full border rounded py-8 flex items-center justify-center gap-2 hover:bg-gray-50" aria-label={`Afspelen: ${item.data.title}`}>
            ▶ Beluister {item.data.title}
          </button>
          <noscript>
            <a href={item.data.embedUrl} rel="external noopener" target="_blank">
              Beluister op het externe platform →
            </a>
          </noscript>
        </div>
      )}

      {item.data.artist && (
        <p class="credits text-sm mt-4">Artiest: {item.data.artist}.</p>
      )}
    </Container>
  </section>
</BaseLayout>
```

Keep the existing `<script>` block unchanged.

- [ ] **Step 2: Apply same changes to FR detail page**

Open `src/pages/fr/programme/[slug].astro`. Apply identical structural changes — same classes, swap NL text strings for FR equivalents (e.g. `← Terug naar programma` → `← Retour au programme`, etc., matching what already exists in the file).

- [ ] **Step 3: Verify a detail page**

If programme items exist: open one at `/nl/programma/[slug]`. Back link, heading, meta line, and embed button (if present) should all be visible and contained.

---

## Task 10: Praktisch / Infos pratiques pages

**Files:**
- Modify: `src/pages/nl/praktisch/index.astro`
- Modify: `src/pages/fr/infos-pratiques/index.astro`

- [ ] **Step 1: Update NL Praktisch page**

In `src/pages/nl/praktisch/index.astro`, add Container import:
```astro
import Container from '../../../components/Container.astro';
```

Wrap the entire page content (the `h1`, intro `p`, in-page `nav`, and all `<section>` elements) in a single outer section with Container:

```astro
<BaseLayout title="Praktisch" lang="nl" currentPath="/nl/praktisch">
  <div class="py-12">
    <Container>
      <h1>Praktisch</h1>
      <p>Alles wat je moet weten om langs te komen.</p>

      <nav aria-label="Op deze pagina" class="my-6">
        <ul role="list" class="flex flex-wrap gap-4 text-sm">
          <li><a href="#bereikbaarheid">Bereikbaarheid</a></li>
          <li><a href="#eten-en-drinken">Eten &amp; drinken</a></li>
          <li><a href="#toegankelijkheid">Toegankelijkheid</a></li>
          <li><a href="#meer">Kinderen, regenplan &amp; meer</a></li>
        </ul>
      </nav>

      <section id="bereikbaarheid" aria-labelledby="heading-bereikbaarheid" class="mt-12">
        <!-- keep existing content unchanged -->
      </section>

      <section id="eten-en-drinken" aria-labelledby="heading-eten" class="mt-12">
        <!-- keep existing content unchanged -->
      </section>

      <section id="toegankelijkheid" aria-labelledby="heading-toegankelijkheid" class="mt-12">
        <!-- keep existing content unchanged -->
      </section>

      <section id="meer" aria-labelledby="heading-meer" class="mt-12">
        <!-- keep existing content unchanged -->
      </section>
    </Container>
  </div>
</BaseLayout>
```

The inner section content (all `<h2>`, `<h3>`, `<p>`, `<ul>`, `<table>`, `<Accordion>` elements) stays exactly as-is — only the wrapper structure changes.

Remove the `<style>` block at the bottom (`.sr-only` is now provided by Tailwind — confirm that the `<caption class="sr-only">` on the tables still renders correctly).

- [ ] **Step 2: Apply same changes to FR Infos pratiques page**

Open `src/pages/fr/infos-pratiques/index.astro`. Apply the same wrapping pattern. The in-page nav uses FR anchor IDs (`#acces`, `#manger-et-boire`, `#accessibilite`, `#plus`) — keep those unchanged.

- [ ] **Step 3: Verify Praktisch page**

Open `http://localhost:4321/nl/praktisch`. Page content should be contained at max-width, in-page nav links should be in a horizontal row, section spacing should be visible, tables should render, accordion should function.

---

## Task 11: Over Plazey / À propos pages

**Files:**
- Modify: `src/pages/nl/over-plazey/index.astro`
- Modify: `src/pages/fr/a-propos/index.astro`

- [ ] **Step 1: Update NL Over Plazey page**

In `src/pages/nl/over-plazey/index.astro`, add Container import:
```astro
import Container from '../../../components/Container.astro';
```

Replace the `<BaseLayout>` content with:
```astro
<BaseLayout title="Over Plazey" lang="nl" currentPath="/nl/over-plazey">
  <section class="py-12">
    <Container>
      <h1>Over Plazey</h1>
      <p class="opening">Kom erbij, welke taal of welk tempo je ook hebt.</p>
    </Container>
  </section>

  <section aria-labelledby="het-verhaal" class="py-12">
    <Container>
      <h2 id="het-verhaal">Het verhaal</h2>
      <p>Plazey begon in 1992 als een klein muziekfeestje voor de omwonenden van het Elisabethpark in Koekelberg. Gratis, buiten, voor de buren. In de kern is het dat nog steeds.</p>
      <p>In 2013 groeide het uit tot een gemoedelijke ontmoetingsplek rond Bar Eliza — een houten cafeetje midden in het park, waar de buurt bij elkaar kon komen. Muziek bleef het hart, maar workshops, animatie en eten kwamen erbij.</p>
      <p>Sinds 2023 kiezen we voor radicale toegankelijkheid. Niet als label, maar als werk. Samen met Demos, AnySurfer en andere partners bouwen we aan een festival dat écht voor iedereen toegankelijk is — en dat eerlijk zegt wat nog niet lukt.</p>
    </Container>
  </section>

  <section aria-labelledby="wie-maakt" class="py-12">
    <Container>
      <h2 id="wie-maakt">Wie maakt Plazey?</h2>
      <p>Plazey is een project van twee Brusselse gemeenschapscentra.</p>
      <div class="org-grid grid grid-cols-1 sm:grid-cols-2 gap-8 mt-6">
        <div class="org-card">
          <h3>Gemeenschapscentrum De Platoo</h3>
          <p>Geworteld in de wijk. Ze brengen mensen samen via cultuur, ontmoeting en gemeenschapswerk in Koekelberg.</p>
          <a href="https://deplatoo.be" rel="external noopener" target="_blank">Meer over De Platoo →</a>
        </div>
        <div class="org-card">
          <h3>Gemeenschapscentrum De Zeyp</h3>
          <p>Verbindt mensen in de brede noordwestelijke gordel van Brussel. Met een programma dat de buurt weerspiegelt.</p>
          <a href="https://dezeyp.be" rel="external noopener" target="_blank">Meer over De Zeyp →</a>
        </div>
      </div>
      <p class="mt-6">Meer dan honderd vrijwilligers maken Plazey elk jaar waar. Achter de bar, aan de kassa, aan de infostand — en bij het op- en afbouwen.</p>
    </Container>
  </section>

  <section aria-labelledby="onze-partners" class="py-12">
    <Container>
      <h2 id="onze-partners">Onze partners</h2>
      <ul role="list" class="logo-wall flex flex-wrap gap-4 mt-4">
        <li><span>Demos</span></li>
        <li><span>AnySurfer</span></li>
        <li><span>Zonnelied vzw</span></li>
        <li><span>Viernulvier</span></li>
        <li><span>Club 1030 / GC De Kriekelaar</span></li>
        <li><span>Scheldeoffensief</span></li>
      </ul>
      <p><small>⚠️ Partnerlijst valideren met De Platoo/De Zeyp vóór publicatie.</small></p>
    </Container>
  </section>

  <section aria-labelledby="doe-mee-callout" class="callout py-12">
    <Container>
      <h2 id="doe-mee-callout">Wil je mee bouwen?</h2>
      <p>Kom helpen of stel een project voor.</p>
      <a href="/nl/doe-mee" class="btn-ghost">Naar Doe mee →</a>
    </Container>
  </section>
</BaseLayout>
```

- [ ] **Step 2: Apply same changes to FR À propos page**

Open `src/pages/fr/a-propos/index.astro`. Apply the same structure — same Tailwind classes, FR content stays as-is.

- [ ] **Step 3: Verify Over Plazey page**

Open `http://localhost:4321/nl/over-plazey`. The org grid should be 2 columns on desktop. Partners list should be a horizontal wrap. Section spacing visible throughout.

---

## Task 12: Doe mee / Participez pages

**Files:**
- Modify: `src/pages/nl/doe-mee/index.astro`
- Modify: `src/pages/fr/participez/index.astro`

- [ ] **Step 1: Update NL Doe mee page**

In `src/pages/nl/doe-mee/index.astro`, add Container import:
```astro
import Container from '../../../components/Container.astro';
```

Replace `<BaseLayout>` content with:
```astro
<BaseLayout title="Doe mee" lang="nl">
  <section class="py-12">
    <Container>
      <h1>Doe mee</h1>
      <p class="opening">Kom helpen. Achter de bar, aan de kassa, of bij het opruimen.</p>
    </Container>
  </section>

  <section aria-labelledby="vrijwilliger-worden" class="py-12">
    <Container>
      <h2 id="vrijwilliger-worden">Vrijwilliger worden</h2>
      <p>Plazey draait op vrijwilligers. Elk jaar helpen meer dan honderd mensen het festival mogelijk te maken. Jij kan er één van zijn.</p>
      <p>Je kiest zelf wanneer en hoeveel. Een halve dag, een hele dag, of het volledige weekend.</p>

      <ul role="list" class="roles-grid grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
        <li class="role-card">
          <h3>Bar</h3>
          <p>Je schenkt drankjes en zorgt dat iedereen iets heeft. Je werkt in team. Geen ervaring nodig.</p>
        </li>
        <li class="role-card">
          <h3>Kassa</h3>
          <p>Bezoekers kopen hier hun tokens. Je hebt het eerste contact met mensen die het terrein binnenkomen. Meertalig zijn is een troef.</p>
        </li>
        <li class="role-card">
          <h3>Infostand</h3>
          <p>Je beantwoordt vragen, geeft programmaboekjes mee en helpt mensen de weg vinden. Meerdere talen zijn handig.</p>
        </li>
        <li class="role-card">
          <h3>Opruim en opbouw</h3>
          <p>Vóór of na het festival help je het terrein opbouwen of netjes achterlaten. Praktisch, concreet werk.</p>
        </li>
      </ul>

      <p class="mt-6">Je hoeft geen ervaring te hebben. Plazey zorgt voor een maaltijd en drankjes terwijl je helpt.</p>

      <a
        href="mailto:info@plazey.be?subject=Vrijwilliger%20Plazey%202026"
        class="btn-primary"
      >
        Schrijf je in via info@plazey.be
      </a>
      <p>Vermeld in je mail: wanneer je beschikbaar bent en waarvoor je interesse hebt.</p>
    </Container>
  </section>

  <section aria-labelledby="stel-project-voor" class="py-12">
    <Container>
      <h2 id="stel-project-voor">Stel een project voor</h2>
      <p>Plazey wordt mee gemaakt door mensen uit de buurt. Een groot deel van het programma wordt ingediend en mee georganiseerd door buurtbewoners, lokale artiesten en organisaties.</p>
      <p>Ben je buurtbewoner? Lokale artiest? Een kleine organisatie met een idee? Stel je project voor.</p>
      <p>Zet in je voorstel: wie je bent, wat je van plan bent, wat je nodig hebt (ruimte, materiaal, tijd), en voor welke dag je denkt.</p>

      <a
        href="mailto:info@plazey.be?subject=Project%20voorstel%20Plazey%202026"
        class="btn-ghost"
      >
        Stel je project voor via info@plazey.be
      </a>
    </Container>
  </section>

  <section aria-labelledby="vragen-vrijwilligers" class="py-12">
    <Container>
      <h2 id="vragen-vrijwilligers">Vragen</h2>
      <Accordion items={faqItems} />
    </Container>
  </section>
</BaseLayout>
```

- [ ] **Step 2: Apply same changes to FR Participez page**

Open `src/pages/fr/participez/index.astro`. Apply the same structural changes — same Tailwind classes, FR content stays as-is.

- [ ] **Step 3: Final verification pass**

Run a quick check across all pages in the browser at both desktop (1280px) and mobile (375px):

| Page | Check |
|---|---|
| `/nl` | Hero full-width, feature grid 3-col, section spacing |
| `/nl/programma` | Filter controls horizontal, card grid |
| `/nl/programma/[slug]` | Contained, embed button full-width |
| `/nl/praktisch` | In-page nav horizontal, sections spaced |
| `/nl/over-plazey` | Org grid 2-col, partners wrap |
| `/nl/doe-mee` | Roles grid 2-col, accordion works |
| All FR equivalents | Same structural results |
| Mobile all pages | Nav hamburger works, 1-col layouts, footer 2-col |

Also run `npx astro check` to confirm zero TypeScript errors.

```bash
npx astro check
```

Expected: 0 errors (the zod deprecation hint is a known false positive per CLAUDE.md — ignore it).
