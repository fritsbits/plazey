# Partner logos band

## Goal

Display the 8 supporting partners' logos on every page of the site, in a dedicated band between the main content and the footer. Each logo links to the partner's official website.

## Placement

A separate white band inserted in `BaseLayout.astro` between `</main>` and `<Footer>`. This ensures every page shows the logos without touching individual page files.

## Component

New file: `site/src/components/Partners.astro`

Accepts one prop:

```ts
interface Props {
  lang: 'nl' | 'fr';
}
```

## Logo data

Hardcoded array in the component. Images live in `site/src/assets/images/partners/`. Each entry:

| File | Alt (NL) | Alt (FR) | URL |
|---|---|---|---|
| `nationale-loterij.png` | Nationale Loterij | Loterie Nationale | https://www.nationale-loterij.be/ |
| `vlaanderen-cjm.jpg` | Vlaanderen – Cultuur, Jeugd en Media | Flandre – Culture, Jeunesse et Médias | https://www.vlaanderen.be/cjm/nl/ |
| `be-brussels.jpg` | Brussels Hoofdstedelijk Gewest | Région de Bruxelles-Capitale | https://be.brussels/ |
| `vgc.jpg` | Vlaamse Gemeenschapscommissie | Commission communautaire flamande | https://www.vgc.be/ |
| `leefmilieu-brussel.png` | Leefmilieu Brussel | Bruxelles Environnement | https://leefmilieu.brussels/ |
| `sport-brussels.png` | Sport.brussels | Sport.brussels | https://sport.brussels/ |
| `gemeente-koekelberg.png` | Gemeente Koekelberg | Commune de Koekelberg | https://www.koekelberg.be/ |
| `gemeente-ganshoren.jpg` | Gemeente Ganshoren | Commune de Ganshoren | https://www.ganshoren.be/ |

Order reflects hierarchy: national → regional → community → agencies → communes.

## Markup

```astro
<section aria-label={isNL ? 'Met steun van' : 'Avec le soutien de'}>
  <div class="partners-inner">
    <p class="partners-label">{isNL ? 'Met steun van' : 'Avec le soutien de'}</p>
    <ul class="partners-logos" role="list">
      {partners.map(p => (
        <li>
          <a
            href={p.url}
            rel="external noopener"
            target="_blank"
            aria-label={isNL
              ? `Bezoek website van ${p.altNl} (opent in nieuw tabblad)`
              : `Visiter le site de ${p.altFr} (s'ouvre dans un nouvel onglet)`}
          >
            <Image src={p.src} alt={isNL ? p.altNl : p.altFr} height={88} />
          </a>
        </li>
      ))}
    </ul>
  </div>
</section>
```

## Styling

- Band: `background: var(--color-surface)`, `border-top: 1px solid var(--color-border-subtle)`
- Padding: `var(--section-y-sm) 0` top and bottom; inner wrapper uses `max-w-4xl mx-auto px-4 sm:px-6` — same pattern as `Footer.astro`
- Label: `font-size: 0.875rem`, `color: var(--color-text-faint)`, centered, `text-transform: uppercase`, `letter-spacing: 0.06em`, `margin-bottom: 1rem`
- Logo list: `display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 1.5rem`
- Logo images: `height: 44px; width: auto; max-width: 120px` via CSS (not HTML attributes)
- No hover effects, no shadows (wireframe phase)

## Image handling

Use Astro's `<Image>` component (`astro:assets`) with local file imports. Pass `height={88}` (2× for retina) — Astro infers width automatically from the local file and maintains aspect ratio. CSS constrains display to `height: 44px; width: auto`. Astro handles format conversion and lazy loading automatically.

## BaseLayout integration

```astro
---
import Partners from '../components/Partners.astro';
---
  </main>
  <Partners lang={lang} />
  <Footer lang={lang} />
```

## Accessibility

- `<section>` has `aria-label` with the label text (bilingual)
- `<ul role="list">` for logo list (removes list semantics that VoiceOver adds by default for styled lists)
- Each `<a>` has a descriptive `aria-label` naming the partner and noting it opens in a new tab
- `alt` text on each image is the organisation name in the page language
