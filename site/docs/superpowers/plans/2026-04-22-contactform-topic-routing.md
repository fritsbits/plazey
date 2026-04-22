# Contact form topic routing — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the four section-level mailto CTAs on the Praktisch page with inline links that route to the contact form, preselect a topic in a new dropdown, and optionally prefill the message field (ADL case only).

**Architecture:** Native `<select>` added to the existing Netlify contact form. Section CTAs become `<a href="#contact" data-topic="…" data-prefill="…">` links. Page script reads those attributes on click, sets the select value + optional message prefill, and smooth-scrolls to the form using the existing `getOffset()` measurement logic. No URL encoding of topic, no server-side changes.

**Tech Stack:** Astro 6, native HTML form + `<select>`, Netlify Forms, inline TypeScript in Astro `<script>` blocks, CSS custom properties from `global.css`.

**Spec:** `docs/superpowers/specs/2026-04-22-contactform-topic-routing-design.md`

---

### Task 1: Add select styling to `global.css`

**Files:**
- Modify: `site/src/styles/global.css` (extend the `.form-field` block near the bottom of `@layer components`)

- [ ] **Step 1: Locate the `.form-field` block**

Open `site/src/styles/global.css`. Search for `.form-field input,` — the block defines input/textarea styling inside form fields.

- [ ] **Step 2: Add `<select>` rules in the same block**

After the existing `.form-field input:focus, .form-field textarea:focus { … }` rule, add:

```css
  .form-field select {
    font-family: inherit;
    font-size: 1rem;
    line-height: 1.4;
    color: var(--color-text);
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    padding: 0.5rem 2.5rem 0.5rem 0.75rem;
    appearance: none;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>");
    background-repeat: no-repeat;
    background-position: right 0.75rem center;
    transition: border-color 0.15s, box-shadow 0.15s;
  }
  .form-field select:focus {
    outline: none;
    border-color: var(--color-text);
    box-shadow: 0 0 0 2px var(--color-text);
  }
  .form-field select:invalid {
    color: var(--color-text-muted);
  }
```

The `:invalid` rule mutes the colour when the placeholder (empty value) is selected, so "Kies een onderwerp" reads as a hint rather than a committed value.

- [ ] **Step 3: Verify build stays green**

Run from the repo's `site/` directory:

```bash
npx astro check
```

Expected: 1 pre-existing error (`Header.astro` unused `alternateHref`). 0 new errors.

- [ ] **Step 4: Commit**

```bash
git add site/src/styles/global.css
git commit -m "style: form-field select with caret glyph"
```

---

### Task 2: Add topic dropdown + topic-routed click handler (NL page)

**Files:**
- Modify: `site/src/pages/nl/praktisch/index.astro` (form markup + script block)

- [ ] **Step 1: Insert the `<select>` field between e-mail and message**

Find the form field for `contact-email` in the NL contact form. After that form-field closing `</div>`, and before the `contact-bericht` form-field, insert:

```astro
            <div class="form-field">
              <label for="contact-onderwerp">Onderwerp</label>
              <select id="contact-onderwerp" name="onderwerp" required>
                <option value="" disabled selected>Kies een onderwerp</option>
                <option value="bereikbaarheid">Bereikbaarheid</option>
                <option value="toegankelijkheid">Toegankelijkheid</option>
                <option value="eten">Eten &amp; drinken</option>
                <option value="kinderen">Kinderen</option>
                <option value="anders">Iets anders</option>
              </select>
            </div>
```

- [ ] **Step 2: Replace the existing scroll-spy `<script>` block with the consolidated version**

Find the `<script>` block at the bottom of the page that defines `sections`, `navLinks`, `getOffset`, `update`, and the click handler for `.page-nav` links. Replace it wholesale with:

```astro
  <script>
    const PREFILLS: Record<string, string> = {
      adl: 'Ik wil graag vragen om hulp van een vrijwilliger tijdens Plazey. Wat ik nodig heb: ',
    };

    function getOffset(): number {
      const header = document.querySelector('header') as HTMLElement | null;
      const subnav = document.querySelector('.page-subnav-wrapper') as HTMLElement | null;
      const headerH = header?.offsetHeight ?? 0;
      const subnavSticky = subnav ? getComputedStyle(subnav).position === 'sticky' : false;
      const subnavH = subnavSticky ? (subnav?.offsetHeight ?? 0) : 0;
      return headerH + subnavH + 8;
    }

    function scrollToId(id: string) {
      const target = document.getElementById(id);
      if (!target) return;
      const y = target.getBoundingClientRect().top + window.scrollY - getOffset();
      window.scrollTo({ top: y, behavior: 'smooth' });
    }

    // In-page anchor subnav: scroll-spy + click-to-scroll
    const sections = Array.from(document.querySelectorAll('section[id]'));
    const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('.page-nav a[href^="#"]'));
    if (sections.length && navLinks.length) {
      function update() {
        const offset = getOffset();
        let active = sections[0]?.id ?? '';
        for (const section of sections) {
          if (section.getBoundingClientRect().top <= offset) active = section.id;
        }
        for (const link of navLinks) {
          if (link.getAttribute('href') === `#${active}`) {
            link.setAttribute('aria-current', 'true');
          } else {
            link.removeAttribute('aria-current');
          }
        }
      }
      for (const link of navLinks) {
        link.addEventListener('click', (e) => {
          const id = link.getAttribute('href')?.slice(1);
          if (!id) return;
          e.preventDefault();
          scrollToId(id);
          history.replaceState(null, '', `#${id}`);
        });
      }
      document.addEventListener('scroll', update, { passive: true });
      update();
    }

    // Section CTAs → contact form: preselect topic, optional message prefill
    const topicLinks = document.querySelectorAll<HTMLAnchorElement>('a[data-topic]');
    for (const link of topicLinks) {
      link.addEventListener('click', (e) => {
        const topic = link.dataset.topic;
        const prefill = link.dataset.prefill;
        if (!topic) return;
        e.preventDefault();

        const select = document.querySelector<HTMLSelectElement>('select[name="onderwerp"]');
        if (select) select.value = topic;

        const msg = document.querySelector<HTMLTextAreaElement>('textarea[name="bericht"]');
        if (msg && prefill && !msg.value) {
          msg.value = PREFILLS[prefill] ?? '';
        }

        scrollToId('contact');

        setTimeout(() => {
          msg?.focus();
          if (msg) msg.setSelectionRange(msg.value.length, msg.value.length);
        }, 500);
      });
    }
  </script>
```

Keep the other `<script>` block (form submit handler) as-is.

- [ ] **Step 3: Verify build**

```bash
npx astro check
```

Expected: 1 pre-existing error, 0 new errors.

- [ ] **Step 4: Visual sanity check**

Start dev server if not running: `npm run dev` from `site/`. Open `http://localhost:4321/nl/praktisch/`, scroll to the contact form at the bottom. Verify:

- A new "Onderwerp" field is visible between e-mail and bericht
- Dropdown shows placeholder "Kies een onderwerp" in muted colour
- Clicking the dropdown reveals the 5 options in order
- No CTA links yet route here (that's Task 3) — the form just exists with the new field

- [ ] **Step 5: Commit**

```bash
git add site/src/pages/nl/praktisch/index.astro
git commit -m "feat: add onderwerp dropdown + topic-link handler on NL praktisch"
```

---

### Task 3: Replace the four mailto CTAs on NL page with topic-routed links

**Files:**
- Modify: `site/src/pages/nl/praktisch/index.astro` (4 inline edits)

- [ ] **Step 1: Replace Bereikbaarheid callout**

Find the Bereikbaarheid section. The callout currently reads:

```astro
        <div class="callout-inline">
          <p><strong>Hulp nodig om van de metro naar het terrein te geraken?</strong> Mail <a href="mailto:info@plazey.be">info@plazey.be</a>. We helpen je verder.</p>
        </div>
```

Replace the `<p>` content with:

```astro
          <p><strong>Hulp nodig om van de metro naar het terrein te komen?</strong> <a href="#contact" data-topic="bereikbaarheid">Laat het ons weten.</a></p>
```

Note: "te geraken" → "te komen" (minor tone tune, more natural NL).

- [ ] **Step 2: Replace ADL bullet in Toegankelijkheid > Zorg & info**

Find the list item that currently reads:

```astro
              <li><strong>Hulp bij dagelijkse dingen</strong> — vrijwilligers helpen je bij eten, drinken, toilet of de weg vinden op het terrein. Schrijf ons vooraf via <a href="mailto:info@plazey.be">info@plazey.be</a>.</li>
```

Replace with:

```astro
              <li><strong>Hulp bij dagelijkse dingen</strong> — vrijwilligers helpen je bij eten, drinken, toilet of de weg vinden op het terrein. <a href="#contact" data-topic="toegankelijkheid" data-prefill="adl">Vraag het vooraf aan.</a></li>
```

- [ ] **Step 3: Replace Toegankelijkheid generic callout**

Find the callout at the bottom of the Toegankelijkheid section:

```astro
        <div class="callout-inline">
          <p>Heb je een vraag of nodig je hulp? Mail <a href="mailto:info@plazey.be">info@plazey.be</a>.</p>
        </div>
```

Replace the `<p>` content with:

```astro
          <p>Heb je een vraag of nodig je hulp? <a href="#contact" data-topic="toegankelijkheid">Stel je vraag.</a></p>
```

- [ ] **Step 4: Replace FAQ trailing CTA**

Find the paragraph at the end of the FAQ section:

```astro
        <p>Staat jouw vraag er niet bij? Mail <a href="mailto:info@plazey.be">info@plazey.be</a>.</p>
```

Replace with:

```astro
        <p>Staat jouw vraag er niet bij? <a href="#contact" data-topic="anders">Stel je vraag.</a></p>
```

- [ ] **Step 5: Verify build**

```bash
npx astro check
```

Expected: 1 pre-existing error, 0 new errors.

- [ ] **Step 6: Manual interaction test**

On `http://localhost:4321/nl/praktisch/`, click each of the 4 new CTAs in turn. For each, verify:

1. Page smooth-scrolls to the contact form.
2. The "Onderwerp" dropdown is preselected to the correct value.
3. For the ADL link only: the bericht field is populated with "Ik wil graag vragen om hulp van een vrijwilliger tijdens Plazey. Wat ik nodig heb: ", and the cursor is at the end, ready to type.
4. Other CTAs leave the bericht field empty but focused.
5. Scrolling back up, no URL changes (no `#contact` in the address bar from these clicks — `preventDefault` stops the anchor behaviour).

If any of those fail, debug before committing.

- [ ] **Step 7: Commit**

```bash
git add site/src/pages/nl/praktisch/index.astro
git commit -m "refactor: route NL section CTAs to contact form with topic preselect"
```

---

### Task 4: Mirror all NL changes on FR page

**Files:**
- Modify: `site/src/pages/fr/infos-pratiques/index.astro` (form markup, script block, 4 CTA edits)

- [ ] **Step 1: Insert the `<select>` field into the FR form**

Find the FR contact form's `contact-email` field. After it, before `contact-bericht`, insert:

```astro
            <div class="form-field">
              <label for="contact-onderwerp">Sujet</label>
              <select id="contact-onderwerp" name="onderwerp" required>
                <option value="" disabled selected>Choisis un sujet</option>
                <option value="acces">Accès</option>
                <option value="accessibilite">Accessibilité</option>
                <option value="manger">Manger &amp; boire</option>
                <option value="enfants">Enfants</option>
                <option value="autre">Autre chose</option>
              </select>
            </div>
```

**Important:** the `name` attribute stays `onderwerp` (matches NL so Netlify sees one column). Only the label, placeholder, and option labels/values are localised.

- [ ] **Step 2: Replace the FR scroll-spy `<script>` with the consolidated version**

Same structure as NL, with the FR prefill string:

```astro
  <script>
    const PREFILLS: Record<string, string> = {
      adl: "Je souhaiterais demander l'aide d'un·e bénévole pendant Plazey. Ce dont j'ai besoin : ",
    };

    function getOffset(): number {
      const header = document.querySelector('header') as HTMLElement | null;
      const subnav = document.querySelector('.page-subnav-wrapper') as HTMLElement | null;
      const headerH = header?.offsetHeight ?? 0;
      const subnavSticky = subnav ? getComputedStyle(subnav).position === 'sticky' : false;
      const subnavH = subnavSticky ? (subnav?.offsetHeight ?? 0) : 0;
      return headerH + subnavH + 8;
    }

    function scrollToId(id: string) {
      const target = document.getElementById(id);
      if (!target) return;
      const y = target.getBoundingClientRect().top + window.scrollY - getOffset();
      window.scrollTo({ top: y, behavior: 'smooth' });
    }

    const sections = Array.from(document.querySelectorAll('section[id]'));
    const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('.page-nav a[href^="#"]'));
    if (sections.length && navLinks.length) {
      function update() {
        const offset = getOffset();
        let active = sections[0]?.id ?? '';
        for (const section of sections) {
          if (section.getBoundingClientRect().top <= offset) active = section.id;
        }
        for (const link of navLinks) {
          if (link.getAttribute('href') === `#${active}`) {
            link.setAttribute('aria-current', 'true');
          } else {
            link.removeAttribute('aria-current');
          }
        }
      }
      for (const link of navLinks) {
        link.addEventListener('click', (e) => {
          const id = link.getAttribute('href')?.slice(1);
          if (!id) return;
          e.preventDefault();
          scrollToId(id);
          history.replaceState(null, '', `#${id}`);
        });
      }
      document.addEventListener('scroll', update, { passive: true });
      update();
    }

    const topicLinks = document.querySelectorAll<HTMLAnchorElement>('a[data-topic]');
    for (const link of topicLinks) {
      link.addEventListener('click', (e) => {
        const topic = link.dataset.topic;
        const prefill = link.dataset.prefill;
        if (!topic) return;
        e.preventDefault();

        const select = document.querySelector<HTMLSelectElement>('select[name="onderwerp"]');
        if (select) select.value = topic;

        const msg = document.querySelector<HTMLTextAreaElement>('textarea[name="bericht"]');
        if (msg && prefill && !msg.value) {
          msg.value = PREFILLS[prefill] ?? '';
        }

        scrollToId('contact');

        setTimeout(() => {
          msg?.focus();
          if (msg) msg.setSelectionRange(msg.value.length, msg.value.length);
        }, 500);
      });
    }
  </script>
```

Keep the other `<script>` (form submit handler) as-is.

- [ ] **Step 3: Replace Accès callout**

Current:

```astro
        <div class="callout-inline">
          <p><strong>Besoin d'aide pour aller de la station au site ?</strong> Écris à <a href="mailto:info@plazey.be">info@plazey.be</a>. On t'aide.</p>
        </div>
```

Replace `<p>` content with:

```astro
          <p><strong>Besoin d'aide pour aller de la station au site ?</strong> <a href="#contact" data-topic="acces">Dis-le-nous.</a></p>
```

- [ ] **Step 4: Replace ADL bullet in Accessibilité > Aide & info**

Current:

```astro
              <li><strong>Aide au quotidien</strong> — des bénévoles t'aident à manger, boire, aller aux toilettes ou trouver ton chemin sur le site. Écris-nous à l'avance via <a href="mailto:info@plazey.be">info@plazey.be</a>.</li>
```

Replace with:

```astro
              <li><strong>Aide au quotidien</strong> — des bénévoles t'aident à manger, boire, aller aux toilettes ou trouver ton chemin sur le site. <a href="#contact" data-topic="accessibilite" data-prefill="adl">Demande-le à l'avance.</a></li>
```

- [ ] **Step 5: Replace Accessibilité generic callout**

Current:

```astro
        <div class="callout-inline">
          <p>Une question ou besoin d'aide ? Écris à <a href="mailto:info@plazey.be">info@plazey.be</a>.</p>
        </div>
```

Replace `<p>` content with:

```astro
          <p>Une question ou besoin d'aide ? <a href="#contact" data-topic="accessibilite">Pose ta question.</a></p>
```

- [ ] **Step 6: Replace FAQ trailing CTA**

Current:

```astro
        <p>Ta question n'est pas là ? Écris à <a href="mailto:info@plazey.be">info@plazey.be</a>.</p>
```

Replace with:

```astro
        <p>Ta question n'est pas là ? <a href="#contact" data-topic="autre">Pose ta question.</a></p>
```

- [ ] **Step 7: Verify build**

```bash
npx astro check
```

Expected: 1 pre-existing error, 0 new errors.

- [ ] **Step 8: Manual interaction test (FR)**

On `http://localhost:4321/fr/infos-pratiques/`, click each of the 4 new CTAs:

1. Accès callout → dropdown = "Accès"
2. ADL bullet → dropdown = "Accessibilité", message prefilled with "Je souhaiterais demander l'aide d'un·e bénévole pendant Plazey. Ce dont j'ai besoin : " + cursor at end
3. Accessibilité callout → dropdown = "Accessibilité", message empty
4. FAQ trailer → dropdown = "Autre chose", message empty

All four should smooth-scroll to the form and focus the message field.

- [ ] **Step 9: Commit**

```bash
git add site/src/pages/fr/infos-pratiques/index.astro
git commit -m "feat: mirror topic-routed contact flow on FR infos-pratiques"
```

---

## Self-review checklist

Before handing off to the implementing engineer, the plan author ran through:

**1. Spec coverage:** Each item from the spec has a task:
- Dropdown options (NL + FR) → Tasks 2, 4
- CTA mapping table (all 4 per page) → Tasks 3 (NL), 4 (FR)
- ADL pre-fill template (NL + FR) → Tasks 2, 4 (in PREFILLS constant)
- Click handler with preselect + prefill + scroll + focus → Tasks 2, 4
- No URL topic encoding → implicit in handler (`preventDefault` + no hash update on topic links)
- CSS select styling → Task 1
- Field name `onderwerp` on both pages → Tasks 2, 4 (explicitly noted)
- FR placeholder "Choisis un sujet" → Task 4

**2. No placeholders:** No TBDs. The caret SVG is fully specified. All copy strings and template strings are final. Verification steps have exact commands and expected output.

**3. Type consistency:** `PREFILLS` is `Record<string, string>` in both Task 2 and Task 4. `getOffset`, `scrollToId`, `topicLinks` signatures are identical. Select `name="onderwerp"` is consistent. `data-topic` values match the dropdown `option value`s (NL: bereikbaarheid/toegankelijkheid/eten/kinderen/anders; FR: acces/accessibilite/manger/enfants/autre).
