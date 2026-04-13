# Tailwind structural layout — design spec

**Date:** 2026-04-12
**Scope:** Add Tailwind CSS and apply structural layout classes across all components and pages. No colour, typography, or surface-level design decisions.

---

## 1. Setup

Run `npx astro add tailwind`. This installs `@astrojs/tailwind`, creates `tailwind.config.mjs`, and wires the integration into `astro.config.mjs` automatically.

Add a `Container` component at `src/components/Container.astro`:

```astro
---
---
<div class="max-w-4xl mx-auto px-4 sm:px-6">
  <slot />
</div>
```

This avoids repeating the wrapper div on every section in every page.

---

## 2. BaseLayout.astro

- `<body>`: add `class="min-h-screen flex flex-col"`
- `<main>`: add `class="flex-1"`

This ensures the footer is always pushed to the bottom of the viewport, even on short pages.

---

## 3. Header.astro

**Structure:**
- `<header>`: `border-b`
- `<nav>` inner wrapper: `max-w-4xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16`
- Logo link (`.logo-link`): `font-semibold text-lg`
- Nav list (`<ul>`): `hidden md:flex items-center gap-6 text-sm data-[open]:flex data-[open]:flex-col data-[open]:absolute data-[open]:top-16 data-[open]:inset-x-0 data-[open]:px-4 data-[open]:py-4 data-[open]:border-b data-[open]:gap-4 data-[open]:bg-white`
  - Tailwind v3.2+ supports arbitrary data attribute variants: `data-[open]:*` targets `[data-open]` on the element itself, with higher specificity than `hidden`, so the toggle works without custom CSS.
- Nav toggle (`.nav-toggle`): `md:hidden`
- Lang toggle (`.lang-toggle`): `flex items-center gap-2 text-sm`

**Mobile behaviour (< 768px):**
- Logo stays left, lang toggle + hamburger move to the right (flex row, existing markup order is fine)
- Nav list is `hidden` by default; when JS sets `data-open` on the `<ul>`, the `data-[open]:*` classes kick in and it drops below the header as an absolute-positioned column
- No custom CSS needed — existing JS (aria-expanded + data-open) drives visibility unchanged

---

## 4. Footer.astro

The current `<footer>` has no inner wrapper — add one:

```astro
<footer>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
    <!-- existing four divs + lang toggle -->
  </div>
</footer>
```

- The four blocks (`.footer-contact`, `.footer-social`, `.footer-org`, `.footer-legal`) are already separate divs — they become grid cells automatically
- Lang toggle row (`.footer-lang`): add `col-span-2 md:col-span-4 pt-4 border-t text-sm` — spans full width as a bottom row

---

## 5. Page sections

**Pattern for every section:**

```astro
<section aria-label="..." class="py-12">
  <Container>
    <!-- content -->
  </Container>
</section>
```

**Hero section exception:** The `<figure>` with the hero image sits outside the `<Container>` so it can go full-width within the section. Inner text content and CTAs stay inside a `<Container>`.

```astro
<section aria-label="Hero" class="py-16">
  <Container>
    <h1>...</h1>
    <p>...</p>
    <!-- CTAs -->
  </Container>
  <figure>
    <img ... />
  </figure>
</section>
```

**Section spacing:** `py-12` for standard sections, `py-16` for hero.

**Feature blocks (Wat is Plazey? / Qu'est-ce que Plazey?):**
- `<ul role="list" class="feature-blocks">` → `grid grid-cols-1 sm:grid-cols-3 gap-8 mt-6`

**Doe mee / Participe teaser and bereikbaarheid teaser:** plain text + CTA, no grid needed.

---

## 6. Programme pages (NL + FR)

- Filter bar: `flex flex-wrap gap-2 mb-8`
- Filter buttons (day radio + type checkboxes): `border rounded-full px-4 py-1 text-sm cursor-pointer`
- Card grid `<ul role="list">`: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4`

---

## 7. ProgramCard.astro

Current root element is `<a class="program-card">`. Add Tailwind classes:
`flex flex-col gap-1 p-4 border rounded hover:shadow-sm`

Inner elements:
- `.time`: `text-sm text-gray-500` (structural only — gray is a neutral wireframe tone)
- `.type-chip`: `text-xs border rounded-full px-2 py-0.5 self-start`
- `.card-title` (h3): `font-medium`
- `.stage`: `text-sm`
- `.card-desc` (p): `text-sm mt-1`

---

## 8. Accordion.astro

- `<dl class="accordion">`: `divide-y`
- `<details class="accordion-item">`: no additional classes needed
- `<summary>`: `flex items-center justify-between py-4 cursor-pointer list-none`
- `.accordion-question` (h2/h3 inside summary): `font-medium text-base`
- `.accordion-answer` (p): `pb-4 text-sm`

A CSS `::marker` reset may be needed for `<summary>` in some browsers — add it to a global style block in BaseLayout if so.

---

## 9. Programme detail pages (`[slug].astro`)

- Main content container: wrap existing content in `<Container>` with `py-12` on the section
- Embed placeholder / click-to-play button: `w-full aspect-video flex items-center justify-center border rounded`

---

## Out of scope

- Colours (no `bg-*`, `text-*` colour classes beyond neutral grays used as wireframe placeholders)
- Typography choices (no font imports, no `font-*` beyond `font-medium` / `font-semibold` for weight hierarchy)
- Animations or transitions
- CMS, server rendering, or new pages
