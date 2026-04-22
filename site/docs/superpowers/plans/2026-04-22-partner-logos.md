# Partner logos band — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a partner logos band above the footer on every page, showing 8 supporting organisations with linked, accessible logos.

**Architecture:** A new `Partners.astro` component holds the hardcoded logo data and renders a `<section>` with a flex-wrap logo list. It is inserted into `BaseLayout.astro` between `</main>` and `<Footer>` so every page gets it automatically. Images are imported locally and processed by Astro's `<Image>` component.

**Tech Stack:** Astro 6, `astro:assets` Image component, Tailwind utility classes, CSS custom properties from `global.css`.

---

### Task 1: Create `Partners.astro`

**Files:**
- Create: `site/src/components/Partners.astro`

- [ ] **Step 1: Create the file with full content**

Create `site/src/components/Partners.astro`:

```astro
---
import { Image } from 'astro:assets';
import nationaleLoterij from '../assets/images/partners/nationale-loterij.png';
import vlaanderenCjm from '../assets/images/partners/vlaanderen-cjm.jpg';
import beBrussels from '../assets/images/partners/be-brussels.jpg';
import vgc from '../assets/images/partners/vgc.jpg';
import leefmilieuBrussel from '../assets/images/partners/leefmilieu-brussel.png';
import sportBrussels from '../assets/images/partners/sport-brussels.png';
import gemeenteKoekelberg from '../assets/images/partners/gemeente-koekelberg.png';
import gemeenteGanshoren from '../assets/images/partners/gemeente-ganshoren.jpg';

interface Props {
  lang: 'nl' | 'fr';
}

const { lang } = Astro.props;
const isNL = lang === 'nl';

const partners = [
  {
    src: nationaleLoterij,
    altNl: 'Nationale Loterij',
    altFr: 'Loterie Nationale',
    url: 'https://www.nationale-loterij.be/',
  },
  {
    src: vlaanderenCjm,
    altNl: 'Vlaanderen – Cultuur, Jeugd en Media',
    altFr: 'Flandre – Culture, Jeunesse et Médias',
    url: 'https://www.vlaanderen.be/cjm/nl/',
  },
  {
    src: beBrussels,
    altNl: 'Brussels Hoofdstedelijk Gewest',
    altFr: 'Région de Bruxelles-Capitale',
    url: 'https://be.brussels/',
  },
  {
    src: vgc,
    altNl: 'Vlaamse Gemeenschapscommissie',
    altFr: 'Commission communautaire flamande',
    url: 'https://www.vgc.be/',
  },
  {
    src: leefmilieuBrussel,
    altNl: 'Leefmilieu Brussel',
    altFr: 'Bruxelles Environnement',
    url: 'https://leefmilieu.brussels/',
  },
  {
    src: sportBrussels,
    altNl: 'Sport.brussels',
    altFr: 'Sport.brussels',
    url: 'https://sport.brussels/',
  },
  {
    src: gemeenteKoekelberg,
    altNl: 'Gemeente Koekelberg',
    altFr: 'Commune de Koekelberg',
    url: 'https://www.koekelberg.be/',
  },
  {
    src: gemeenteGanshoren,
    altNl: 'Gemeente Ganshoren',
    altFr: 'Commune de Ganshoren',
    url: 'https://www.ganshoren.be/',
  },
];

const label = isNL ? 'Met steun van' : 'Avec le soutien de';
---

<section class="partners" aria-label={label}>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 py-6">
    <p class="partners-label">{label}</p>
    <ul class="partners-logos" role="list">
      {partners.map((p) => (
        <li>
          <a
            href={p.url}
            rel="external noopener"
            target="_blank"
            aria-label={isNL
              ? `Bezoek website van ${p.altNl} (opent in nieuw tabblad)`
              : `Visiter le site de ${p.altFr} (s'ouvre dans un nouvel onglet)`}
          >
            <Image
              src={p.src}
              alt={isNL ? p.altNl : p.altFr}
              height={88}
              class="partner-logo"
            />
          </a>
        </li>
      ))}
    </ul>
  </div>
</section>

<style>
  .partners {
    background: var(--color-surface);
    border-top: 1px solid var(--color-border-subtle);
  }

  .partners-label {
    font-size: 0.875rem;
    color: var(--color-text-faint);
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-bottom: 1rem;
  }

  .partners-logos {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .partner-logo {
    height: 44px;
    width: auto;
    max-width: 120px;
  }
</style>
```

- [ ] **Step 2: Run TypeScript check**

```bash
cd site && npx astro check
```

Expected: 0 errors. If you see "Cannot find module '../assets/images/partners/…'", verify the filenames in `site/src/assets/images/partners/` match exactly:
- `nationale-loterij.png`
- `vlaanderen-cjm.jpg`
- `be-brussels.jpg`
- `vgc.jpg`
- `leefmilieu-brussel.png`
- `sport-brussels.png`
- `gemeente-koekelberg.png`
- `gemeente-ganshoren.jpg`

---

### Task 2: Wire into `BaseLayout.astro`

**Files:**
- Modify: `site/src/layouts/BaseLayout.astro`

- [ ] **Step 1: Add import at top of frontmatter**

In `site/src/layouts/BaseLayout.astro`, add after the existing imports:

```astro
---
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import Partners from '../components/Partners.astro';
import '../styles/global.css';
```

- [ ] **Step 2: Insert component between `</main>` and `<Footer>`**

Replace:

```astro
    <Footer lang={lang} />
```

With:

```astro
    <Partners lang={lang} />
    <Footer lang={lang} />
```

- [ ] **Step 3: Run TypeScript check**

```bash
cd site && npx astro check
```

Expected: 0 errors.

- [ ] **Step 4: Commit**

```bash
git add site/src/components/Partners.astro site/src/layouts/BaseLayout.astro site/src/assets/images/partners/
git commit -m "feat: add partner logos band above footer on all pages"
```

---

### Task 3: Visual verification

- [ ] **Step 1: Start dev server**

```bash
cd site && npm run dev
```

- [ ] **Step 2: Check NL pages**

Open http://localhost:4321/nl/ — scroll to bottom. Verify:
- White band with "MET STEUN VAN" label appears above the footer
- 8 logos display in a flex row, wrapping as needed
- Logos are approximately 44px tall
- All 8 logos are visible (none missing or broken)

- [ ] **Step 3: Check FR pages**

Open http://localhost:4321/fr/ — scroll to bottom. Verify:
- Label reads "AVEC LE SOUTIEN DE"
- Same 8 logos appear

- [ ] **Step 4: Check mobile layout**

Resize browser to 375px width. Verify logos wrap into multiple rows without overflow or horizontal scroll.

- [ ] **Step 5: Check link targets**

Click one logo — it should open the partner site in a new tab.
