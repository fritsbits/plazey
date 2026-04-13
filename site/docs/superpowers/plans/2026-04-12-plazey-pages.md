# Plazey Website Pages — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build all Plazey website pages as semantic HTML wireframes (no visual design) with real copy, accessible markup, and working JavaScript where specified.

**Architecture:** Components-first. Build site config + shell components first, then assemble pages. All pages use BaseLayout with Header + Footer inherited. Programme filter uses client-side JS with URL sync + aria-live. No CSS beyond what Astro provides by default.

**Tech Stack:** Astro 6 (static), TypeScript, content collections (glob loader), vanilla JS for interactivity, Formspree for forms (not in scope for v1 — mailto only).

---

## File Map

**New files:**
- `src/config/site.ts` — SITE_PHASE + festival constants
- `src/components/Header.astro` — sticky header, mobile nav with focus trap
- `src/components/Footer.astro` — 4-block footer
- `src/components/ProgramCard.astro` — programme item card (used on Programma + Home)
- `src/components/Accordion.astro` — `<details>`-based accordion (FAQ sections)
- `src/components/ClickToPlay.astro` — lazy-load embed with poster + play button
- `src/pages/nl/programma/[slug].astro` — programme item detail NL
- `src/pages/fr/programme/[slug].astro` — programme item detail FR
- `src/pages/fr/infos-pratiques/index.astro` — Praktisch FR (correct URL)
- `src/pages/404.astro` — 404 page
- `src/content/programme/nl/le-ministere-du-groove.md` — sample item
- `src/content/programme/nl/atelier-batik.md` — sample item
- `src/content/programme/nl/film-nuit.md` — sample item
- `src/content/programme/fr/le-ministere-du-groove.md` — FR equivalent
- `src/content/programme/fr/atelier-batik.md` — FR equivalent
- `src/content/programme/fr/film-nuit.md` — FR equivalent

**Modified files:**
- `src/layouts/BaseLayout.astro` — add skip link, landmark regions, Header + Footer
- `src/pages/nl/index.astro` — Home NL
- `src/pages/fr/index.astro` — Home FR
- `src/pages/nl/programma/index.astro` — Programma NL with filter
- `src/pages/fr/programme/index.astro` — Programma FR with filter
- `src/pages/nl/praktisch/index.astro` — Praktisch NL
- `src/pages/fr/pratique/index.astro` — redirect stub → infos-pratiques
- `src/pages/nl/over-plazey/index.astro` — Over NL
- `src/pages/fr/a-propos/index.astro` — Over FR
- `src/pages/nl/doe-mee/index.astro` — Doe mee NL
- `src/pages/fr/participez/index.astro` — Doe mee FR
- `src/content.config.ts` — add `lang` field to schema

---

## Task 1: Site config

**Files:**
- Create: `src/config/site.ts`

- [ ] **Create the config file**

```typescript
// src/config/site.ts
export const SITE_PHASE: 'save-the-date' | 'reveal' | 'live' | 'aftermovie' = 'reveal';
export const FESTIVAL_YEAR = 2026;
export const FESTIVAL_DATES_NL = '22–24 augustus 2026';
export const FESTIVAL_DATES_FR = '22–24 août 2026';
export const FESTIVAL_LOCATION = 'Elisabethpark, Koekelberg';
export const CONTACT_EMAIL = 'info@plazey.be';
export const FACEBOOK_URL = 'https://www.facebook.com/plazeyfestival';
```

- [ ] **Verify:** `npx astro check` — no TypeScript errors

---

## Task 2: Sample programme content

**Files:**
- Modify: `src/content.config.ts`
- Create: 6 sample markdown files

- [ ] **Add `lang` field to content schema**

```typescript
// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const programme = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/programme' }),
  schema: z.object({
    title: z.string(),
    lang: z.enum(['nl', 'fr']),
    day: z.enum(['friday', 'saturday', 'sunday']),
    startTime: z.string(),
    endTime: z.string().optional(),
    stage: z.string(),
    type: z.enum(['concert', 'film', 'workshop', 'kids', 'dans', 'off-stage']),
    genre: z.string().optional(),
    artist: z.string().optional(),
    description: z.string().optional(),
    embedUrl: z.string().url().optional(),
  }),
});

export const collections = { programme };
```

- [ ] **Update existing sample to include lang**

```markdown
<!-- src/content/programme/nl/voorbeeld-act.md -->
---
title: Voorbeeldact
lang: nl
day: friday
startTime: "19:00"
stage: Hoofdpodium
type: concert
genre: Jazz
artist: Voorbeeld Artiest
description: De opening van het festival.
---

Meer details volgen.
```

- [ ] **Create NL sample items**

```markdown
<!-- src/content/programme/nl/le-ministere-du-groove.md -->
---
title: Le Ministère Du Groove
lang: nl
day: saturday
startTime: "21:00"
endTime: "22:30"
stage: Hoofdpodium
type: concert
genre: Jazz-fusion
artist: Le Ministère Du Groove
description: Jazzfusion uit Brussel. Geen twee concerten zijn hetzelfde.
embedUrl: "https://open.spotify.com/artist/example"
---

Le Ministère Du Groove brengt een mix van jazz, funk en improvisatie. Ze spelen al meer dan tien jaar samen en kwamen langs op alle grote Brusselse festivals.
```

```markdown
<!-- src/content/programme/nl/atelier-batik.md -->
---
title: Batik-workshop
lang: nl
day: saturday
startTime: "14:00"
endTime: "17:00"
stage: Tuinzone
type: workshop
artist: Collectief Kleur
description: Leer de techniek van batik — stoffen beschilderen met was en verf. Voor alle leeftijden.
---

Collectief Kleur organiseert workshops rond textielkunst en ambacht. In deze sessie leer je de basics van batik.
```

```markdown
<!-- src/content/programme/nl/film-nuit.md -->
---
title: Korte films — buurtprogramma
lang: nl
day: sunday
startTime: "20:30"
endTime: "22:00"
stage: Tent west
type: film
description: Een selectie korte films van buurtbewoners en jonge filmmakers uit Koekelberg en omgeving.
---

Elke editie nodigt Plazey buurtbewoners uit om korte films te maken. Dit jaar zijn er zes inzendingen.
```

- [ ] **Create FR sample items**

```markdown
<!-- src/content/programme/fr/le-ministere-du-groove.md -->
---
title: Le Ministère Du Groove
lang: fr
day: saturday
startTime: "21:00"
endTime: "22:30"
stage: Scène principale
type: concert
genre: Jazz-fusion
artist: Le Ministère Du Groove
description: Jazz fusion bruxellois. Pas deux concerts ne se ressemblent.
embedUrl: "https://open.spotify.com/artist/example"
---

Le Ministère Du Groove mêle jazz, funk et improvisation. Ensemble depuis plus de dix ans, ils ont joué dans tous les grands festivals bruxellois.
```

```markdown
<!-- src/content/programme/fr/atelier-batik.md -->
---
title: Atelier batik
lang: fr
day: saturday
startTime: "14:00"
endTime: "17:00"
stage: Zone jardin
type: workshop
artist: Collectif Couleur
description: Apprenez la technique du batik — peindre des tissus avec de la cire et de la teinture. Pour tous les âges.
---

Collectif Couleur organise des ateliers autour de l'art textile et de l'artisanat.
```

```markdown
<!-- src/content/programme/fr/film-nuit.md -->
---
title: Courts métrages — programme de quartier
lang: fr
day: sunday
startTime: "20:30"
endTime: "22:00"
stage: Tente ouest
type: film
description: Une sélection de courts métrages de riverain·es et de jeunes cinéastes de Koekelberg et ses environs.
---

Chaque édition, Plazey invite les habitant·es à réaliser des courts métrages. Cette année, six films sont en compétition.
```

- [ ] **Verify:** `npx astro check` — no schema errors

---

## Task 3: BaseLayout with shell

**Files:**
- Modify: `src/layouts/BaseLayout.astro`
- Create: `src/components/Header.astro`
- Create: `src/components/Footer.astro`

- [ ] **Rewrite BaseLayout to include skip link + landmarks + Header + Footer**

```astro
---
// src/layouts/BaseLayout.astro
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';

interface Props {
  title: string;
  lang: 'nl' | 'fr';
  currentPath?: string;
}
const { title, lang, currentPath = '' } = Astro.props;

const skipLabel = lang === 'fr' ? 'Aller au contenu' : 'Ga naar inhoud';
---
<html lang={lang}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title} — Plazey</title>
  </head>
  <body>
    <a class="skip-link" href="#main-content">{skipLabel}</a>
    <Header lang={lang} currentPath={currentPath} />
    <main id="main-content">
      <slot />
    </main>
    <Footer lang={lang} />
  </body>
</html>

<style>
  .skip-link {
    position: absolute;
    left: -9999px;
    top: auto;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }
  .skip-link:focus {
    position: static;
    width: auto;
    height: auto;
    overflow: visible;
    padding: 0.5rem 1rem;
  }
</style>
```

- [ ] **Create Header component**

```astro
---
// src/components/Header.astro
interface Props {
  lang: 'nl' | 'fr';
  currentPath?: string;
}
const { lang, currentPath = '' } = Astro.props;

const nav = lang === 'nl'
  ? [
      { href: '/nl/programma', label: 'Programma' },
      { href: '/nl/praktisch', label: 'Praktisch' },
      { href: '/nl/over-plazey', label: 'Over' },
      { href: '/nl/doe-mee', label: 'Doe mee' },
    ]
  : [
      { href: '/fr/programme', label: 'Programme' },
      { href: '/fr/infos-pratiques', label: 'Infos pratiques' },
      { href: '/fr/a-propos', label: 'À propos' },
      { href: '/fr/participez', label: 'Participe' },
    ];

const homeHref = lang === 'nl' ? '/nl' : '/fr';
const altLang = lang === 'nl' ? 'fr' : 'nl';
// Derive the alternate URL by replacing /nl/ with /fr/ or vice versa
const altPath = currentPath
  ? currentPath.replace(`/${lang}/`, `/${altLang}/`)
  : `/${altLang}`;
const logoAriaLabel = lang === 'fr' ? 'Plazey — vers la page d\'accueil' : 'Plazey — naar de startpagina';
const menuLabel = lang === 'fr' ? 'Menu' : 'Menu';
const closeLabel = lang === 'fr' ? 'Fermer le menu' : 'Menu sluiten';
const langLabel = lang === 'fr' ? 'Choisir la langue' : 'Taal kiezen';
const navLabel = lang === 'fr' ? 'Navigation principale' : 'Hoofdnavigatie';
---

<header>
  <nav aria-label={navLabel}>
    <a href={homeHref} aria-label={logoAriaLabel} class="logo-link">Plazey</a>

    <button
      class="nav-toggle"
      aria-expanded="false"
      aria-controls="nav-menu"
      aria-label={menuLabel}
    >
      ☰
    </button>

    <ul id="nav-menu" role="list">
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

    <div role="group" aria-label={langLabel} class="lang-toggle">
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

<script>
  const toggle = document.querySelector('.nav-toggle') as HTMLButtonElement;
  const menu = document.getElementById('nav-menu') as HTMLElement;

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isOpen));
      menu.toggleAttribute('data-open', !isOpen);
      if (!isOpen) {
        // Focus first nav item
        const firstLink = menu.querySelector('a') as HTMLAnchorElement;
        firstLink?.focus();
      }
    });

    // Close on Escape
    menu.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        toggle.setAttribute('aria-expanded', 'false');
        menu.removeAttribute('data-open');
        toggle.focus();
      }
    });

    // Focus trap
    menu.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;
      const focusable = Array.from(
        menu.querySelectorAll('a, button')
      ) as HTMLElement[];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  }
</script>
```

- [ ] **Create Footer component**

```astro
---
// src/components/Footer.astro
import { FESTIVAL_YEAR, FACEBOOK_URL, CONTACT_EMAIL } from '../config/site.ts';

interface Props {
  lang: 'nl' | 'fr';
}
const { lang } = Astro.props;

const isNL = lang === 'nl';
---

<footer>
  <div class="footer-contact">
    {isNL ? <h2>Contact</h2> : <h2>Contact</h2>}
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
        {isNL ? 'Toegankelijkheidsverklaring' : 'Déclaration d\'accessibilité'}
      </a>
    </p>
  </div>

  <div class="footer-lang">
    <a href="/nl" lang="nl" aria-current={lang === 'nl' ? 'true' : undefined}>NL</a>
    <span aria-hidden="true"> · </span>
    <a href="/fr" lang="fr" aria-current={lang === 'fr' ? 'true' : undefined}>FR</a>
  </div>
</footer>
```

- [ ] **Verify:** `npm run dev` → open http://localhost:4321/nl — skip link visible on Tab, header and footer render

---

## Task 4: ProgramCard + Accordion components

**Files:**
- Create: `src/components/ProgramCard.astro`
- Create: `src/components/Accordion.astro`

- [ ] **Create ProgramCard**

```astro
---
// src/components/ProgramCard.astro
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

<a href={href} class="program-card">
  <span class="time">{timeDisplay}</span>
  <span class="type-chip">{type}</span>
  <h3 class="card-title">{title}</h3>
  <span class="stage">{stage}</span>
  {description && <p class="card-desc">{description}</p>}
</a>
```

- [ ] **Create Accordion (FAQ)**

```astro
---
// src/components/Accordion.astro
interface Props {
  items: Array<{ question: string; answer: string }>;
  headingLevel?: 'h2' | 'h3';
}
const { items, headingLevel = 'h3' } = Astro.props;
const Heading = headingLevel;
---

<dl class="accordion">
  {items.map((item) => (
    <details class="accordion-item">
      <summary>
        <Heading class="accordion-question">{item.question}</Heading>
      </summary>
      <p class="accordion-answer">{item.answer}</p>
    </details>
  ))}
</dl>
```

---

## Task 5: Home page NL + FR

**Files:**
- Modify: `src/pages/nl/index.astro`
- Modify: `src/pages/fr/index.astro`

- [ ] **Write Home NL**

```astro
---
// src/pages/nl/index.astro
import BaseLayout from '../../layouts/BaseLayout.astro';
import ProgramCard from '../../components/ProgramCard.astro';
import { getCollection } from 'astro:content';
import { FESTIVAL_DATES_NL, FESTIVAL_LOCATION, SITE_PHASE } from '../../config/site.ts';

const allItems = await getCollection('programme');
const nlItems = allItems.filter(e => e.data.lang === 'nl');
// 3 highlights per day for the teaser
const saturdayHighlights = nlItems.filter(e => e.data.day === 'saturday').slice(0, 3);
const hasProgramme = nlItems.length > 0;
---

<BaseLayout title="Plazey festival" lang="nl" currentPath="/nl">
  <section aria-label="Hero">
    <h1>Kom langs. Plazey is drie dagen gratis feest in het Elisabethpark.</h1>
    <p>{FESTIVAL_DATES_NL} · {FESTIVAL_LOCATION}</p>
    <a href="/nl/programma" class="btn-primary">Bekijk het programma</a>
    <a href="/nl/doe-mee" class="btn-ghost">Kom helpen</a>
    <a href="/nl/praktisch#bereikbaarheid" class="btn-text">Zo geraak je er</a>
    <p class="edition-indicator">Editie 2026</p>
    <figure>
      <img
        src="/images/plazey-2026.jpg"
        alt="Een kleurrijke zomeravond in het Elisabethpark tijdens Plazey 2026."
        width="1200"
        height="800"
      />
    </figure>
  </section>

  <section aria-labelledby="wat-is-plazey">
    <h2 id="wat-is-plazey">Wat is Plazey?</h2>
    <ul role="list" class="feature-blocks">
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
        <p>Meertalig, meergenerationeel, bottom-up gebouwd met en door de buurt van Koekelberg.</p>
      </li>
    </ul>
  </section>

  <section aria-labelledby="programma-teaser">
    <h2 id="programma-teaser">Wat staat er op?</h2>
    {hasProgramme && SITE_PHASE !== 'save-the-date' ? (
      <>
        <div role="tablist" aria-label="Dag selecteren" class="day-tabs">
          <button role="tab" aria-selected="true" aria-controls="tab-zaterdag" id="tab-btn-zaterdag">
            Zaterdag 23 aug
          </button>
        </div>
        <div id="tab-zaterdag" role="tabpanel" aria-labelledby="tab-btn-zaterdag">
          <ul role="list" class="program-cards">
            {saturdayHighlights.map(item => (
              <li>
                <ProgramCard
                  title={item.data.title}
                  startTime={item.data.startTime}
                  endTime={item.data.endTime}
                  type={item.data.type}
                  stage={item.data.stage}
                  description={item.data.description}
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
      <p>Het programma volgt binnenkort. <a href="https://www.facebook.com/plazeyfestival" rel="external noopener" target="_blank">Volg ons op Facebook voor de aankondiging.</a></p>
    )}
  </section>

  <section aria-labelledby="bereikbaarheid-teaser">
    <h2 id="bereikbaarheid-teaser">Hoe kom ik er?</h2>
    <p>Met metro lijn 2 of 6, halte Simonis. Van daar is het tien minuten wandelen naar het park.</p>
    <p>Je kan ook komen met de tram, de bus, de fiets of de wagen.</p>
    <a href="/nl/praktisch#bereikbaarheid" class="btn-text">Meer info over bereikbaarheid →</a>
  </section>

  <section aria-labelledby="doe-mee-teaser">
    <h2 id="doe-mee-teaser">Doe mee</h2>
    <p>Plazey draait op vrijwilligers. Wil je helpen? Achter de bar, aan de kassa of bij het opruimen.</p>
    <a href="/nl/doe-mee" class="btn-ghost">Kom helpen</a>
  </section>
</BaseLayout>
```

- [ ] **Write Home FR**

```astro
---
// src/pages/fr/index.astro
import BaseLayout from '../../layouts/BaseLayout.astro';
import ProgramCard from '../../components/ProgramCard.astro';
import { getCollection } from 'astro:content';
import { FESTIVAL_DATES_FR, FESTIVAL_LOCATION, SITE_PHASE } from '../../config/site.ts';

const allItems = await getCollection('programme');
const frItems = allItems.filter(e => e.data.lang === 'fr');
const saturdayHighlights = frItems.filter(e => e.data.day === 'saturday').slice(0, 3);
const hasProgramme = frItems.length > 0;
---

<BaseLayout title="Plazey festival" lang="fr" currentPath="/fr">
  <section aria-label="Héro">
    <h1>Passez nous voir. Plazey, c'est trois jours de fête gratuite au parc Élisabeth.</h1>
    <p>{FESTIVAL_DATES_FR} · {FESTIVAL_LOCATION}</p>
    <a href="/fr/programme" class="btn-primary">Voir le programme</a>
    <a href="/fr/participez" class="btn-ghost">Venir aider</a>
    <a href="/fr/infos-pratiques#acces" class="btn-text">Comment s'y rendre</a>
    <p class="edition-indicator">Édition 2026</p>
    <figure>
      <img
        src="/images/plazey-2026.jpg"
        alt="Une soirée d'été colorée au parc Élisabeth lors de Plazey 2026."
        width="1200"
        height="800"
      />
    </figure>
  </section>

  <section aria-labelledby="quest-ce-que-plazey">
    <h2 id="quest-ce-que-plazey">C'est quoi Plazey ?</h2>
    <ul role="list" class="feature-blocks">
      <li>
        <h3>Gratuit depuis 1992</h3>
        <p>Pas de tickets, pas d'entrée payante. Plazey a toujours été gratuit.</p>
      </li>
      <li>
        <h3>Musique, danse, ateliers</h3>
        <p>Concerts, cirque, films, activités enfants — tous genres, tous âges.</p>
      </li>
      <li>
        <h3>Pour tout le quartier</h3>
        <p>Multilingue, multigénérationnel, construit avec et par le quartier de Koekelberg.</p>
      </li>
    </ul>
  </section>

  <section aria-labelledby="programme-teaser">
    <h2 id="programme-teaser">Qu'est-ce qui est au programme ?</h2>
    {hasProgramme && SITE_PHASE !== 'save-the-date' ? (
      <>
        <div role="tablist" aria-label="Sélectionner un jour" class="day-tabs">
          <button role="tab" aria-selected="true" aria-controls="tab-samedi" id="tab-btn-samedi">
            Samedi 23 août
          </button>
        </div>
        <div id="tab-samedi" role="tabpanel" aria-labelledby="tab-btn-samedi">
          <ul role="list" class="program-cards">
            {saturdayHighlights.map(item => (
              <li>
                <ProgramCard
                  title={item.data.title}
                  startTime={item.data.startTime}
                  endTime={item.data.endTime}
                  type={item.data.type}
                  stage={item.data.stage}
                  description={item.data.description}
                  href={`/fr/programme/${item.id.replace('fr/', '')}`}
                  lang="fr"
                />
              </li>
            ))}
          </ul>
        </div>
        <a href="/fr/programme" class="btn-text">Voir le programme complet →</a>
      </>
    ) : (
      <p>Le programme arrive bientôt. <a href="https://www.facebook.com/plazeyfestival" rel="external noopener" target="_blank">Suis-nous sur Facebook pour l'annonce.</a></p>
    )}
  </section>

  <section aria-labelledby="comment-sy-rendre">
    <h2 id="comment-sy-rendre">Comment s'y rendre ?</h2>
    <p>En métro ligne 2 ou 6, arrêt Simonis. De là, dix minutes à pied jusqu'au parc.</p>
    <p>Tu peux aussi venir en tram, en bus, à vélo ou en voiture.</p>
    <a href="/fr/infos-pratiques#acces" class="btn-text">Plus d'infos sur l'accès →</a>
  </section>

  <section aria-labelledby="participe-teaser">
    <h2 id="participe-teaser">Participe</h2>
    <p>Plazey tourne grâce à ses bénévoles. Tu veux aider ? Derrière le bar, à la caisse ou pour le rangement.</p>
    <a href="/fr/participez" class="btn-ghost">Venir aider</a>
  </section>
</BaseLayout>
```

- [ ] **Verify:** `npm run dev` → `/nl` and `/fr` both render with header, footer, hero section, and cards

---

## Task 6: Programma pages with filter

**Files:**
- Modify: `src/pages/nl/programma/index.astro`
- Modify: `src/pages/fr/programme/index.astro`

- [ ] **Write Programma NL**

```astro
---
// src/pages/nl/programma/index.astro
import BaseLayout from '../../../layouts/BaseLayout.astro';
import ProgramCard from '../../../components/ProgramCard.astro';
import { getCollection } from 'astro:content';

const allItems = await getCollection('programme');
const items = allItems
  .filter(e => e.data.lang === 'nl')
  .sort((a, b) => {
    const dayOrder = { friday: 0, saturday: 1, sunday: 2 };
    const dayDiff = dayOrder[a.data.day] - dayOrder[b.data.day];
    if (dayDiff !== 0) return dayDiff;
    return a.data.startTime.localeCompare(b.data.startTime);
  });

const days = [
  { value: 'friday', label: 'Vrijdag 22 augustus' },
  { value: 'saturday', label: 'Zaterdag 23 augustus' },
  { value: 'sunday', label: 'Zondag 24 augustus' },
];

const types = [
  { value: 'concert', label: 'Concert' },
  { value: 'dans', label: 'Dans' },
  { value: 'film', label: 'Film' },
  { value: 'workshop', label: 'Workshop' },
  { value: 'kids', label: 'Kinderen' },
  { value: 'off-stage', label: 'Off-stage' },
];

const serializedItems = JSON.stringify(items.map(e => ({
  id: e.id.replace('nl/', ''),
  ...e.data,
})));
---

<BaseLayout title="Programma" lang="nl" currentPath="/nl/programma">
  <h1>Programma</h1>
  <p>22–24 augustus 2026. Alles is gratis.</p>

  <form id="filter-form" aria-label="Programma filteren">
    <fieldset>
      <legend>Dag</legend>
      <label>
        <input type="radio" name="dag" value="alle" checked />
        Alle dagen
      </label>
      {days.map(d => (
        <label>
          <input type="radio" name="dag" value={d.value} />
          {d.label.split(' ').slice(0, 2).join(' ')}
        </label>
      ))}
    </fieldset>

    <fieldset>
      <legend>Type</legend>
      {types.map(t => (
        <label>
          <input type="checkbox" name="type" value={t.value} />
          {t.label}
        </label>
      ))}
    </fieldset>

    <button type="button" id="reset-filters" hidden>Alle filters wissen</button>
  </form>

  <div role="status" aria-live="polite" aria-atomic="true" id="filter-status" class="sr-only"></div>

  <div id="programme-list">
    {days.map(day => {
      const dayItems = items.filter(e => e.data.day === day.value);
      if (dayItems.length === 0) return null;
      return (
        <section data-day={day.value} aria-labelledby={`day-${day.value}`}>
          <h2 id={`day-${day.value}`} class="day-header">{day.label}</h2>
          <ul role="list" class="program-cards">
            {dayItems.map(item => (
              <li data-type={item.data.type} data-day={item.data.day}>
                <ProgramCard
                  title={item.data.title}
                  startTime={item.data.startTime}
                  endTime={item.data.endTime}
                  type={item.data.type}
                  stage={item.data.stage}
                  description={item.data.description}
                  href={`/nl/programma/${item.id.replace('nl/', '')}`}
                  lang="nl"
                />
              </li>
            ))}
          </ul>
        </section>
      );
    })}
  </div>

  <p id="empty-state" hidden>
    Niks gevonden met deze filters.
    <button type="button" id="reset-filters-empty">Alle filters wissen</button>
  </p>
</BaseLayout>

<script>
  const form = document.getElementById('filter-form') as HTMLFormElement;
  const resetBtn = document.getElementById('reset-filters') as HTMLButtonElement;
  const resetEmptyBtn = document.getElementById('reset-filters-empty') as HTMLButtonElement;
  const status = document.getElementById('filter-status') as HTMLElement;
  const emptyState = document.getElementById('empty-state') as HTMLElement;
  const list = document.getElementById('programme-list') as HTMLElement;

  function getFilters() {
    const data = new FormData(form);
    const dag = data.get('dag') as string || 'alle';
    const types = data.getAll('type') as string[];
    return { dag, types };
  }

  function applyFilters() {
    const { dag, types } = getFilters();
    const dayFilter = dag !== 'alle';
    const typeFilter = types.length > 0;

    let visibleCount = 0;

    // Show/hide day sections
    const sections = list.querySelectorAll<HTMLElement>('[data-day]');
    sections.forEach(section => {
      const sectionDay = section.getAttribute('data-day');
      const showSection = !dayFilter || sectionDay === dag;
      section.hidden = !showSection;
    });

    // Show/hide individual cards
    const cards = list.querySelectorAll<HTMLElement>('li[data-type]');
    cards.forEach(card => {
      const cardType = card.getAttribute('data-type');
      const cardDay = card.getAttribute('data-day');
      const dayMatch = !dayFilter || cardDay === dag;
      const typeMatch = !typeFilter || types.includes(cardType!);
      const visible = dayMatch && typeMatch;
      card.hidden = !visible;
      if (visible) visibleCount++;
    });

    // Empty state
    emptyState.hidden = visibleCount > 0;
    list.hidden = visibleCount === 0;

    // Aria-live update
    status.textContent = visibleCount === 0
      ? '0 items gevonden.'
      : `${visibleCount} ${visibleCount === 1 ? 'item' : 'items'} gevonden.`;

    // Reset button
    const hasFilters = dayFilter || typeFilter;
    resetBtn.hidden = !hasFilters;

    // URL sync
    const url = new URL(window.location.href);
    if (dag !== 'alle') url.searchParams.set('dag', dag); else url.searchParams.delete('dag');
    if (types.length > 0) url.searchParams.set('type', types.join(',')); else url.searchParams.delete('type');
    window.history.replaceState({}, '', url.toString());
  }

  function resetFilters() {
    const radios = form.querySelectorAll<HTMLInputElement>('input[name="dag"]');
    radios.forEach(r => r.checked = r.value === 'alle');
    const checkboxes = form.querySelectorAll<HTMLInputElement>('input[name="type"]');
    checkboxes.forEach(c => c.checked = false);
    applyFilters();
  }

  // Restore from URL on load
  function restoreFromURL() {
    const params = new URLSearchParams(window.location.search);
    const dag = params.get('dag');
    const types = params.get('type')?.split(',') || [];

    if (dag) {
      const radio = form.querySelector<HTMLInputElement>(`input[name="dag"][value="${dag}"]`);
      if (radio) radio.checked = true;
    }
    types.forEach(t => {
      const cb = form.querySelector<HTMLInputElement>(`input[name="type"][value="${t}"]`);
      if (cb) cb.checked = true;
    });
    applyFilters();
  }

  form.addEventListener('change', applyFilters);
  resetBtn.addEventListener('click', resetFilters);
  resetEmptyBtn.addEventListener('click', resetFilters);
  restoreFromURL();
</script>

<style>
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
</style>
```

- [ ] **Write Programma FR** (same structure, translated labels)

```astro
---
// src/pages/fr/programme/index.astro
import BaseLayout from '../../../layouts/BaseLayout.astro';
import ProgramCard from '../../../components/ProgramCard.astro';
import { getCollection } from 'astro:content';

const allItems = await getCollection('programme');
const items = allItems
  .filter(e => e.data.lang === 'fr')
  .sort((a, b) => {
    const dayOrder = { friday: 0, saturday: 1, sunday: 2 };
    const dayDiff = dayOrder[a.data.day] - dayOrder[b.data.day];
    if (dayDiff !== 0) return dayDiff;
    return a.data.startTime.localeCompare(b.data.startTime);
  });

const days = [
  { value: 'friday', label: 'Vendredi 22 août' },
  { value: 'saturday', label: 'Samedi 23 août' },
  { value: 'sunday', label: 'Dimanche 24 août' },
];

const types = [
  { value: 'concert', label: 'Concert' },
  { value: 'dans', label: 'Danse' },
  { value: 'film', label: 'Film' },
  { value: 'workshop', label: 'Atelier' },
  { value: 'kids', label: 'Enfants' },
  { value: 'off-stage', label: 'Hors scène' },
];
---

<BaseLayout title="Programme" lang="fr" currentPath="/fr/programme">
  <h1>Programme</h1>
  <p>22–24 août 2026. Tout est gratuit.</p>

  <form id="filter-form" aria-label="Filtrer le programme">
    <fieldset>
      <legend>Jour</legend>
      <label>
        <input type="radio" name="dag" value="alle" checked />
        Tous les jours
      </label>
      {days.map(d => (
        <label>
          <input type="radio" name="dag" value={d.value} />
          {d.label.split(' ').slice(0, 2).join(' ')}
        </label>
      ))}
    </fieldset>

    <fieldset>
      <legend>Type</legend>
      {types.map(t => (
        <label>
          <input type="checkbox" name="type" value={t.value} />
          {t.label}
        </label>
      ))}
    </fieldset>

    <button type="button" id="reset-filters" hidden>Effacer les filtres</button>
  </form>

  <div role="status" aria-live="polite" aria-atomic="true" id="filter-status" class="sr-only"></div>

  <div id="programme-list">
    {days.map(day => {
      const dayItems = items.filter(e => e.data.day === day.value);
      if (dayItems.length === 0) return null;
      return (
        <section data-day={day.value} aria-labelledby={`day-${day.value}`}>
          <h2 id={`day-${day.value}`} class="day-header">{day.label}</h2>
          <ul role="list" class="program-cards">
            {dayItems.map(item => (
              <li data-type={item.data.type} data-day={item.data.day}>
                <ProgramCard
                  title={item.data.title}
                  startTime={item.data.startTime}
                  endTime={item.data.endTime}
                  type={item.data.type}
                  stage={item.data.stage}
                  description={item.data.description}
                  href={`/fr/programme/${item.id.replace('fr/', '')}`}
                  lang="fr"
                />
              </li>
            ))}
          </ul>
        </section>
      );
    })}
  </div>

  <p id="empty-state" hidden>
    Aucun résultat pour ces filtres.
    <button type="button" id="reset-filters-empty">Effacer les filtres</button>
  </p>
</BaseLayout>

<script>
  // Identical logic as NL but with FR strings
  const form = document.getElementById('filter-form') as HTMLFormElement;
  const resetBtn = document.getElementById('reset-filters') as HTMLButtonElement;
  const resetEmptyBtn = document.getElementById('reset-filters-empty') as HTMLButtonElement;
  const status = document.getElementById('filter-status') as HTMLElement;
  const emptyState = document.getElementById('empty-state') as HTMLElement;
  const list = document.getElementById('programme-list') as HTMLElement;

  function getFilters() {
    const data = new FormData(form);
    return { dag: data.get('dag') as string || 'alle', types: data.getAll('type') as string[] };
  }

  function applyFilters() {
    const { dag, types } = getFilters();
    let visibleCount = 0;

    list.querySelectorAll<HTMLElement>('[data-day]').forEach(section => {
      section.hidden = dag !== 'alle' && section.getAttribute('data-day') !== dag;
    });

    list.querySelectorAll<HTMLElement>('li[data-type]').forEach(card => {
      const dayMatch = dag === 'alle' || card.getAttribute('data-day') === dag;
      const typeMatch = types.length === 0 || types.includes(card.getAttribute('data-type')!);
      card.hidden = !(dayMatch && typeMatch);
      if (!card.hidden) visibleCount++;
    });

    emptyState.hidden = visibleCount > 0;
    list.hidden = visibleCount === 0;
    status.textContent = visibleCount === 0 ? '0 résultat.' : `${visibleCount} résultat${visibleCount > 1 ? 's' : ''}.`;
    resetBtn.hidden = dag === 'alle' && types.length === 0;

    const url = new URL(window.location.href);
    dag !== 'alle' ? url.searchParams.set('dag', dag) : url.searchParams.delete('dag');
    types.length > 0 ? url.searchParams.set('type', types.join(',')) : url.searchParams.delete('type');
    window.history.replaceState({}, '', url.toString());
  }

  function resetFilters() {
    form.querySelectorAll<HTMLInputElement>('input[name="dag"]').forEach(r => r.checked = r.value === 'alle');
    form.querySelectorAll<HTMLInputElement>('input[name="type"]').forEach(c => c.checked = false);
    applyFilters();
  }

  const params = new URLSearchParams(window.location.search);
  const dag = params.get('dag');
  if (dag) { const r = form.querySelector<HTMLInputElement>(`input[value="${dag}"]`); if (r) r.checked = true; }
  params.get('type')?.split(',').forEach(t => { const c = form.querySelector<HTMLInputElement>(`input[value="${t}"]`); if (c) c.checked = true; });
  form.addEventListener('change', applyFilters);
  resetBtn.addEventListener('click', resetFilters);
  resetEmptyBtn.addEventListener('click', resetFilters);
  applyFilters();
</script>

<style>
  .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
</style>
```

- [ ] **Verify:** `/nl/programma` — filter toggling shows/hides cards, URL updates, screen reader region announces count

---

## Task 7: Programme item detail pages

**Files:**
- Create: `src/pages/nl/programma/[slug].astro`
- Create: `src/pages/fr/programme/[slug].astro`

- [ ] **Create NL detail page**

```astro
---
// src/pages/nl/programma/[slug].astro
import BaseLayout from '../../../layouts/BaseLayout.astro';
import { getCollection } from 'astro:content';
import { render } from 'astro:content';

export async function getStaticPaths() {
  const items = await getCollection('programme');
  return items
    .filter(e => e.data.lang === 'nl')
    .map(item => ({
      params: { slug: item.id.replace('nl/', '') },
      props: { item },
    }));
}

const { item } = Astro.props;
const { Content } = await render(item);

const dayLabels: Record<string, string> = {
  friday: 'Vrijdag 22 augustus',
  saturday: 'Zaterdag 23 augustus',
  sunday: 'Zondag 24 augustus',
};

// Preserve filters from referrer via back-link
const backHref = '/nl/programma';
---

<BaseLayout
  title={item.data.title}
  lang="nl"
  currentPath={`/nl/programma/${Astro.params.slug}`}
>
  <a href={backHref} class="back-link">← Terug naar programma</a>

  {item.data.artist && (
    <figure class="hero-image" aria-hidden="true">
      <!-- Artist image placeholder: src filled in when assets available -->
    </figure>
  )}

  <h1>{item.data.title}</h1>
  <p class="meta">
    {dayLabels[item.data.day]} · {item.data.startTime}
    {item.data.endTime && `–${item.data.endTime}`} · {item.data.type} · {item.data.stage}
  </p>
  <span class="type-chip">{item.data.type}</span>

  <div class="description">
    <Content />
  </div>

  {item.data.embedUrl && (
    <div
      class="embed-wrapper"
      data-src={item.data.embedUrl}
      data-title={item.data.title}
    >
      <button class="play-btn" aria-label={`Afspelen: ${item.data.title}`}>
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
    <p class="credits">
      {item.data.artist && `Artiest: ${item.data.artist}.`}
    </p>
  )}
</BaseLayout>

<script>
  const wrapper = document.querySelector('.embed-wrapper') as HTMLElement | null;
  if (wrapper) {
    const btn = wrapper.querySelector('.play-btn') as HTMLButtonElement;
    const src = wrapper.dataset.src;
    const title = wrapper.dataset.title;
    btn?.addEventListener('click', () => {
      const iframe = document.createElement('iframe');
      iframe.src = src!;
      iframe.title = title || 'Media embed';
      iframe.allow = 'autoplay';
      iframe.width = '100%';
      iframe.height = '152';
      wrapper.replaceWith(iframe);
    });
  }
</script>
```

- [ ] **Create FR detail page** (same structure, translated labels)

```astro
---
// src/pages/fr/programme/[slug].astro
import BaseLayout from '../../../layouts/BaseLayout.astro';
import { getCollection } from 'astro:content';
import { render } from 'astro:content';

export async function getStaticPaths() {
  const items = await getCollection('programme');
  return items
    .filter(e => e.data.lang === 'fr')
    .map(item => ({
      params: { slug: item.id.replace('fr/', '') },
      props: { item },
    }));
}

const { item } = Astro.props;
const { Content } = await render(item);

const dayLabels: Record<string, string> = {
  friday: 'Vendredi 22 août',
  saturday: 'Samedi 23 août',
  sunday: 'Dimanche 24 août',
};
---

<BaseLayout
  title={item.data.title}
  lang="fr"
  currentPath={`/fr/programme/${Astro.params.slug}`}
>
  <a href="/fr/programme" class="back-link">← Retour au programme</a>

  <h1>{item.data.title}</h1>
  <p class="meta">
    {dayLabels[item.data.day]} · {item.data.startTime}
    {item.data.endTime && `–${item.data.endTime}`} · {item.data.type} · {item.data.stage}
  </p>
  <span class="type-chip">{item.data.type}</span>

  <div class="description">
    <Content />
  </div>

  {item.data.embedUrl && (
    <div class="embed-wrapper" data-src={item.data.embedUrl} data-title={item.data.title}>
      <button class="play-btn" aria-label={`Écouter : ${item.data.title}`}>
        ▶ Écouter {item.data.title}
      </button>
      <noscript>
        <a href={item.data.embedUrl} rel="external noopener" target="_blank">
          Écouter sur la plateforme externe →
        </a>
      </noscript>
    </div>
  )}

  {item.data.artist && <p class="credits">Artiste : {item.data.artist}.</p>}
</BaseLayout>

<script>
  const wrapper = document.querySelector('.embed-wrapper') as HTMLElement | null;
  if (wrapper) {
    const btn = wrapper.querySelector('.play-btn') as HTMLButtonElement;
    btn?.addEventListener('click', () => {
      const iframe = document.createElement('iframe');
      iframe.src = wrapper.dataset.src!;
      iframe.title = wrapper.dataset.title || 'Media embed';
      iframe.allow = 'autoplay';
      iframe.width = '100%';
      iframe.height = '152';
      wrapper.replaceWith(iframe);
    });
  }
</script>
```

- [ ] **Verify:** `/nl/programma/le-ministere-du-groove` renders. Back link present. Embed play button loads iframe on click.

---

## Task 8: Praktisch page

**Files:**
- Modify: `src/pages/nl/praktisch/index.astro`
- Create: `src/pages/fr/infos-pratiques/index.astro`
- Modify: `src/pages/fr/pratique/index.astro` (redirect stub)

- [ ] **Write Praktisch NL**

```astro
---
// src/pages/nl/praktisch/index.astro
import BaseLayout from '../../../layouts/BaseLayout.astro';
import Accordion from '../../../components/Accordion.astro';

const faqItems = [
  { question: 'Is Plazey echt gratis?', answer: 'Ja. Geen tickets, geen toegangsprijs. Plazey is gratis voor iedereen, al sinds 1992.' },
  { question: 'Mag ik mijn eigen eten en drinken meebrengen?', answer: 'Ja. Eigen eten en drinken zijn altijd welkom. Kraantjeswater haal je gratis aan de bar.' },
  { question: 'Is er een cloakroom of bagageruimte?', answer: 'Nee. Kom met zo weinig bagage als mogelijk.' },
  { question: 'Hoe laat begint en eindigt het festival?', answer: 'Op vrijdag starten de activiteiten om 19:30. Op zaterdag en zondag vanaf [starttijd invullen]. Het festival eindigt om [eindtijd invullen].' },
  { question: 'Kan ik er met een rolstoel of kinderwagen naartoe?', answer: 'Ja. De hoofdpaden zijn vlak en toegankelijk voor rolstoelen en wandelwagens. Niet alle kleinere paden zijn toegankelijk.' },
];
---

<BaseLayout title="Praktisch" lang="nl" currentPath="/nl/praktisch">
  <h1>Praktisch</h1>
  <p>Alles wat je moet weten om langs te komen.</p>

  <nav aria-label="Op deze pagina">
    <ul role="list">
      <li><a href="#bereikbaarheid">Bereikbaarheid</a></li>
      <li><a href="#eten-en-drinken">Eten &amp; drinken</a></li>
      <li><a href="#toegankelijkheid">Toegankelijkheid</a></li>
      <li><a href="#meer">Kinderen, regenplan &amp; meer</a></li>
    </ul>
  </nav>

  <section id="bereikbaarheid" aria-labelledby="heading-bereikbaarheid">
    <h2 id="heading-bereikbaarheid">Bereikbaarheid</h2>

    <h3>Metro</h3>
    <p>Met metro lijn 2 of 6, halte Simonis/Elisabeth. Van de metro is het tien minuten wandelen naar het park. Het metrostation heeft een lift en is toegankelijk voor rolstoelgebruikers. Treinstation Simonis ligt ook vlakbij.</p>

    <h3>Tram en bus</h3>
    <ul>
      <li>Tram 9 of 19, halte Simonis/Elisabeth.</li>
      <li>Bus MIVB 13, 87 of N16 — halte Elisabethpark.</li>
      <li>Bus MIVB 49 of 53 — halte Vrijheid.</li>
      <li>De Lijn 212, 213, 214 of 355 — halte Elisabethpark.</li>
    </ul>

    <h3>Fiets</h3>
    <p>Er is een onbewaakte fietsenstalling op het terrein. Breng een slot mee.</p>

    <h3>Auto</h3>
    <p>Parkeren kan rondom het park (betalend). Of in de ondergrondse parking Indigoneo, onder het park. Adres: Eugène Simonisplein 24, 1081 Koekelberg. <a href="https://www.q-park.be" rel="external noopener" target="_blank">Tarieven en reservaties</a>.</p>

    <p><strong>Hulp nodig om van de metro naar het terrein te geraken?</strong> Mail <a href="mailto:info@plazey.be">info@plazey.be</a>. We helpen je verder.</p>
  </section>

  <section id="eten-en-drinken" aria-labelledby="heading-eten">
    <h2 id="heading-eten">Eten &amp; drinken</h2>
    <p>Je mag je eigen eten en drinken meebrengen. Kraantjeswater is gratis.</p>

    <h3>Niet-alcoholische dranken</h3>
    <table>
      <caption class="sr-only">Niet-alcoholische drankprijzen Plazey 2026</caption>
      <thead>
        <tr><th scope="col">Drank</th><th scope="col">Prijs</th></tr>
      </thead>
      <tbody>
        <tr><td>Kraantjeswater</td><td>Gratis</td></tr>
        <tr><td>Spuitwater</td><td>€1</td></tr>
        <tr><td>Frisdrank</td><td>€2</td></tr>
        <tr><td>Koffie</td><td>€[valideren]</td></tr>
      </tbody>
    </table>

    <h3>Alcoholische dranken</h3>
    <table>
      <caption class="sr-only">Alcoholische drankprijzen Plazey 2026</caption>
      <thead>
        <tr><th scope="col">Drank</th><th scope="col">Prijs</th></tr>
      </thead>
      <tbody>
        <tr><td>Pintje</td><td>€3</td></tr>
        <tr><td>Wijn</td><td>€4</td></tr>
      </tbody>
    </table>
    <p><small>⚠️ Prijzen van editie 2025. Te valideren voor publicatie 2026.</small></p>

    <p>Naast dranken zijn er eetstandjes. We kiezen bewust voor buurtbewoners, lokale horecazaken en start-ups als standhouders. Wie er dit jaar staat, vind je binnenkort op deze pagina.</p>
    <p><strong>Cash én tokens worden aanvaard.</strong></p>
  </section>

  <section id="toegankelijkheid" aria-labelledby="heading-toegankelijkheid">
    <h2 id="heading-toegankelijkheid">Toegankelijkheid</h2>
    <p>Hier staat wat er is en wat nog niet. Heb je een vraag of nodig je hulp? Mail <a href="mailto:info@plazey.be">info@plazey.be</a>.</p>

    <h3>Wat er is</h3>
    <ul>
      <li><strong>CM1-toestel</strong> — aan de infostand. Maakt rechtstreeks verbinding met de geluidsinstallatie.</li>
      <li><strong>Tolk Vlaamse Gebarentaal</strong> — zondag van 15:00 tot 19:00. Ook aanwezig aan kassa, bar en eetstandjes.</li>
      <li><strong>Oordopjes</strong> — te verkrijgen aan de infostand.</li>
      <li><strong>ADL-vrijwilligers</strong> — voor hulp bij praktische zaken. Schrijf ons vooraf via <a href="mailto:info@plazey.be">info@plazey.be</a>.</li>
      <li><strong>Programma en dranklijst in braille</strong> — en in gewone druk — aan de infostand.</li>
      <li><strong>Rustige ruimte</strong> — voor wie even weg wil van het lawaai.</li>
      <li><strong>Aangepaste toiletten</strong> — voor rolstoelgebruikers.</li>
      <li><strong>Vlakke hoofdpaden</strong> — toegankelijk voor rolstoelen en wandelwagens.</li>
      <li><strong>Metro Simonis heeft een lift</strong> — rolstoel-toegankelijk.</li>
    </ul>

    <h3>Wat we nog niet hebben</h3>
    <p>[Eerlijk invullen vóór publicatie: wat ontbreekt nog voor editie 2026?]</p>

    <h3>Dit doen we samen met</h3>
    <p>Demos · AnySurfer · Zonnelied vzw · Viernulvier · Club 1030 / GC De Kriekelaar · Scheldeoffensief</p>
    <p><small>⚠️ Partnerlijst valideren vóór publicatie.</small></p>
  </section>

  <section id="meer" aria-labelledby="heading-meer">
    <h2 id="heading-meer">Kinderen, regenplan &amp; meer</h2>

    <h3>Kinderen</h3>
    <p>Kinderen zijn van harte welkom op Plazey. Er zijn activiteiten voor de allerkleinsten tot tieners. Loop je kind verloren? Kom naar de infostand [locatie invullen]. Een luierplek is aanwezig.</p>

    <h3>Regenplan</h3>
    <p>Plazey gaat altijd door, ook als het regent. Het park heeft overdekte plekken. Neem een regenjas mee voor de zekerheid.</p>

    <h3>Veelgestelde vragen</h3>
    <Accordion items={faqItems} />

    <p>Staat jouw vraag er niet bij? Mail <a href="mailto:info@plazey.be">info@plazey.be</a>.</p>
  </section>
</BaseLayout>

<style>
  .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
</style>
```

- [ ] **Create infos-pratiques FR** (same structure, French copy)

```astro
---
// src/pages/fr/infos-pratiques/index.astro
import BaseLayout from '../../../layouts/BaseLayout.astro';
import Accordion from '../../../components/Accordion.astro';

const faqItems = [
  { question: 'Plazey est-il vraiment gratuit ?', answer: 'Oui. Pas de tickets, pas d\'entrée payante. Plazey est gratuit pour tout le monde, depuis 1992.' },
  { question: 'Puis-je apporter ma propre nourriture et boisson ?', answer: 'Oui. Nourriture et boissons personnelles sont toujours les bienvenues. L\'eau du robinet est gratuite au bar.' },
  { question: 'Y a-t-il un vestiaire ou une consigne ?', answer: 'Non. Venez avec le moins de bagages possible.' },
  { question: 'À quelle heure commence et se termine le festival ?', answer: 'Le vendredi, les activités commencent à 19h30. Le samedi et dimanche à partir de [heure à compléter]. Le festival se termine à [heure à compléter].' },
  { question: 'Puis-je y venir en fauteuil roulant ou avec une poussette ?', answer: 'Oui. Les allées principales sont planes et accessibles aux fauteuils roulants et poussettes. Tous les petits chemins ne le sont pas.' },
];
---

<BaseLayout title="Infos pratiques" lang="fr" currentPath="/fr/infos-pratiques">
  <h1>Infos pratiques</h1>
  <p>Tout ce que tu dois savoir pour venir.</p>

  <nav aria-label="Sur cette page">
    <ul role="list">
      <li><a href="#acces">Accès</a></li>
      <li><a href="#manger-et-boire">Manger &amp; boire</a></li>
      <li><a href="#accessibilite">Accessibilité</a></li>
      <li><a href="#plus">Enfants, plan pluie &amp; plus</a></li>
    </ul>
  </nav>

  <section id="acces" aria-labelledby="heading-acces">
    <h2 id="heading-acces">Accès</h2>

    <h3>Métro</h3>
    <p>En métro ligne 2 ou 6, arrêt Simonis/Élisabeth. De la station, dix minutes à pied jusqu'au parc. La station est équipée d'un ascenseur et est accessible aux fauteuils roulants.</p>

    <h3>Tram et bus</h3>
    <ul>
      <li>Tram 9 ou 19, arrêt Simonis/Élisabeth.</li>
      <li>Bus STIB 13, 87 ou N16 — arrêt Parc Élisabeth.</li>
      <li>Bus STIB 49 ou 53 — arrêt Liberté.</li>
      <li>De Lijn 212, 213, 214 ou 355 — arrêt Parc Élisabeth.</li>
    </ul>

    <h3>Vélo</h3>
    <p>Un parking vélo non gardé est disponible sur le site. Prenez un antivol.</p>

    <h3>Voiture</h3>
    <p>Le stationnement est payant autour du parc. Ou dans le parking souterrain Indigoneo sous le parc. Adresse : Place Eugène Simonis 24, 1081 Koekelberg.</p>

    <p><strong>Besoin d'aide pour aller de la station au site ?</strong> Écris à <a href="mailto:info@plazey.be">info@plazey.be</a>.</p>
  </section>

  <section id="manger-et-boire" aria-labelledby="heading-manger">
    <h2 id="heading-manger">Manger &amp; boire</h2>
    <p>Tu peux apporter ta propre nourriture et boisson. L'eau du robinet est gratuite.</p>

    <h3>Boissons sans alcool</h3>
    <table>
      <caption class="sr-only">Prix des boissons sans alcool Plazey 2026</caption>
      <thead><tr><th scope="col">Boisson</th><th scope="col">Prix</th></tr></thead>
      <tbody>
        <tr><td>Eau du robinet</td><td>Gratuit</td></tr>
        <tr><td>Eau pétillante</td><td>€1</td></tr>
        <tr><td>Soft</td><td>€2</td></tr>
        <tr><td>Café</td><td>€[à valider]</td></tr>
      </tbody>
    </table>

    <h3>Boissons alcoolisées</h3>
    <table>
      <caption class="sr-only">Prix des boissons alcoolisées Plazey 2026</caption>
      <thead><tr><th scope="col">Boisson</th><th scope="col">Prix</th></tr></thead>
      <tbody>
        <tr><td>Bière</td><td>€3</td></tr>
        <tr><td>Vin</td><td>€4</td></tr>
      </tbody>
    </table>
    <p><small>⚠️ Prix de l'édition 2025. À valider pour 2026.</small></p>

    <p>Il y a aussi des stands alimentaires. Nous choisissons délibérément des habitant·es du quartier, des établissements horeca locaux et des start-ups. Les stands de cette année seront annoncés bientôt.</p>
    <p><strong>Espèces et tokens acceptés.</strong></p>
  </section>

  <section id="accessibilite" aria-labelledby="heading-accessibilite">
    <h2 id="heading-accessibilite">Accessibilité</h2>
    <p>Voici ce qui existe et ce qui manque encore. Une question ou besoin d'aide ? Écris à <a href="mailto:info@plazey.be">info@plazey.be</a>.</p>

    <h3>Ce qui est disponible</h3>
    <ul>
      <li><strong>Appareil CM1</strong> — à l'infostand. Connexion directe avec la sonorisation.</li>
      <li><strong>Interprète en Langue des Signes de Belgique Francophone</strong> — dimanche de 15h à 19h.</li>
      <li><strong>Bouchons d'oreilles</strong> — disponibles à l'infostand.</li>
      <li><strong>Bénévoles ADL</strong> — pour aide pratique sur site. Contacte-nous à l'avance via <a href="mailto:info@plazey.be">info@plazey.be</a>.</li>
      <li><strong>Programme et liste de boissons en braille</strong> — et en impression standard — à l'infostand.</li>
      <li><strong>Espace calme</strong> — pour se reposer du bruit.</li>
      <li><strong>Toilettes adaptées</strong> — pour personnes en fauteuil roulant.</li>
      <li><strong>Allées principales planes</strong> — accessibles aux fauteuils roulants et poussettes.</li>
      <li><strong>Métro Simonis équipé d'un ascenseur</strong> — accessible en fauteuil roulant.</li>
    </ul>

    <h3>Ce que nous n'avons pas encore</h3>
    <p>[À compléter honnêtement avant publication : qu'est-ce qui manque pour l'édition 2026 ?]</p>

    <h3>Nous faisons ça avec</h3>
    <p>Demos · AnySurfer · Zonnelied vzw · Viernulvier · Club 1030 / GC De Kriekelaar · Scheldeoffensief</p>
    <p><small>⚠️ Liste à valider avant publication.</small></p>
  </section>

  <section id="plus" aria-labelledby="heading-plus">
    <h2 id="heading-plus">Enfants, plan pluie &amp; plus</h2>

    <h3>Enfants</h3>
    <p>Les enfants sont les bienvenus à Plazey. Il y a des activités pour les tout-petits jusqu'aux ados. Ton enfant s'est perdu ? Viens à l'infostand [emplacement à compléter]. Un espace à langer est disponible.</p>

    <h3>Plan pluie</h3>
    <p>Plazey se tient toujours, même s'il pleut. Le parc dispose d'espaces couverts. Prends un imperméable par précaution.</p>

    <h3>Questions fréquentes</h3>
    <Accordion items={faqItems} />

    <p>Ta question n'est pas là ? Écris à <a href="mailto:info@plazey.be">info@plazey.be</a>.</p>
  </section>
</BaseLayout>

<style>
  .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
</style>
```

- [ ] **Update old pratique stub to redirect**

```astro
---
// src/pages/fr/pratique/index.astro
// Redirect to correct URL
return Astro.redirect('/fr/infos-pratiques', 301);
---
```

- [ ] **Verify:** `/nl/praktisch` and `/fr/infos-pratiques` render. Accordion items expand/collapse. `/fr/pratique` redirects.

---

## Task 9: Over Plazey pages

**Files:**
- Modify: `src/pages/nl/over-plazey/index.astro`
- Modify: `src/pages/fr/a-propos/index.astro`

- [ ] **Write Over NL**

```astro
---
// src/pages/nl/over-plazey/index.astro
import BaseLayout from '../../../layouts/BaseLayout.astro';
---

<BaseLayout title="Over Plazey" lang="nl" currentPath="/nl/over-plazey">
  <h1>Over Plazey</h1>
  <p class="opening">Kom erbij, welke taal of welk tempo je ook hebt.</p>

  <section aria-labelledby="het-verhaal">
    <h2 id="het-verhaal">Het verhaal</h2>
    <p>Plazey begon in 1992 als een klein muziekfeestje voor de omwonenden van het Elisabethpark in Koekelberg. Gratis, buiten, voor de buren. In de kern is het dat nog steeds.</p>
    <p>In 2013 groeide het uit tot een gemoedelijke ontmoetingsplek rond Bar Eliza — een houten cafeetje midden in het park, waar de buurt bij elkaar kon komen. Muziek bleef het hart, maar workshops, animatie en eten kwamen erbij.</p>
    <p>Sinds 2023 kiezen we voor radicale toegankelijkheid. Niet als label, maar als werk. Samen met Demos, AnySurfer en andere partners bouwen we aan een festival dat écht voor iedereen toegankelijk is — en dat eerlijk zegt wat nog niet lukt.</p>
  </section>

  <section aria-labelledby="wie-maakt">
    <h2 id="wie-maakt">Wie maakt Plazey?</h2>
    <p>Plazey is een project van twee Brusselse gemeenschapscentra.</p>
    <div class="org-grid">
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
    <p>Meer dan honderd vrijwilligers maken Plazey elk jaar waar. Achter de bar, aan de kassa, aan de infostand — en bij het op- en afbouwen.</p>
  </section>

  <section aria-labelledby="onze-partners">
    <h2 id="onze-partners">Onze partners</h2>
    <ul role="list" class="logo-wall">
      <li><span>Demos</span></li>
      <li><span>AnySurfer</span></li>
      <li><span>Zonnelied vzw</span></li>
      <li><span>Viernulvier</span></li>
      <li><span>Club 1030 / GC De Kriekelaar</span></li>
      <li><span>Scheldeoffensief</span></li>
    </ul>
    <p><small>⚠️ Partnerlijst valideren met De Platoo/De Zeyp vóór publicatie.</small></p>
  </section>

  <section aria-labelledby="doe-mee-callout" class="callout">
    <h2 id="doe-mee-callout">Wil je mee bouwen?</h2>
    <p>Kom helpen of stel een project voor.</p>
    <a href="/nl/doe-mee" class="btn-ghost">Naar Doe mee →</a>
  </section>
</BaseLayout>
```

- [ ] **Write Over FR**

```astro
---
// src/pages/fr/a-propos/index.astro
import BaseLayout from '../../../layouts/BaseLayout.astro';
---

<BaseLayout title="À propos de Plazey" lang="fr" currentPath="/fr/a-propos">
  <h1>À propos de Plazey</h1>
  <p class="opening">Rejoignez-nous, quelle que soit votre langue ou votre rythme.</p>

  <section aria-labelledby="lhistoire">
    <h2 id="lhistoire">L'histoire</h2>
    <p>Plazey a démarré en 1992 comme une petite fête musicale pour les riverain·es du parc Élisabeth à Koekelberg. Gratuit, en plein air, pour les voisin·es. Dans l'essence, c'est toujours ça.</p>
    <p>En 2013, le festival a évolué en un lieu de rencontre convivial autour du Bar Eliza — un petit café en bois au cœur du parc, où le quartier pouvait se rassembler. La musique restait au centre, mais des ateliers, des animations et de la restauration ont rejoint l'aventure.</p>
    <p>Depuis 2023, nous faisons le choix de l'accessibilité radicale. Pas comme étiquette, mais comme travail. Avec Demos, AnySurfer et d'autres partenaires, nous construisons un festival vraiment accessible à tout le monde — et nous disons honnêtement ce qui n'est pas encore possible.</p>
  </section>

  <section aria-labelledby="qui-fait">
    <h2 id="qui-fait">Qui fait Plazey ?</h2>
    <p>Plazey est un projet de deux maisons de quartier bruxelloises.</p>
    <div class="org-grid">
      <div class="org-card">
        <h3>Maison de quartier De Platoo</h3>
        <p>Enracinée dans le quartier. Elle rassemble les gens autour de la culture, de la rencontre et du travail communautaire à Koekelberg.</p>
        <a href="https://deplatoo.be" rel="external noopener" target="_blank">En savoir plus sur De Platoo →</a>
      </div>
      <div class="org-card">
        <h3>Maison de quartier De Zeyp</h3>
        <p>Relie les habitant·es de la large ceinture nord-ouest de Bruxelles. Avec une programmation qui reflète le quartier.</p>
        <a href="https://dezeyp.be" rel="external noopener" target="_blank">En savoir plus sur De Zeyp →</a>
      </div>
    </div>
    <p>Plus de cent bénévoles font vivre Plazey chaque année. Derrière le bar, à la caisse, à l'infostand — et lors du montage et du démontage.</p>
  </section>

  <section aria-labelledby="nos-partenaires">
    <h2 id="nos-partenaires">Nos partenaires</h2>
    <ul role="list" class="logo-wall">
      <li><span>Demos</span></li>
      <li><span>AnySurfer</span></li>
      <li><span>Zonnelied vzw</span></li>
      <li><span>Viernulvier</span></li>
      <li><span>Club 1030 / GC De Kriekelaar</span></li>
      <li><span>Scheldeoffensief</span></li>
    </ul>
    <p><small>⚠️ Liste à valider avant publication.</small></p>
  </section>

  <section aria-labelledby="participe-callout" class="callout">
    <h2 id="participe-callout">Tu veux contribuer ?</h2>
    <p>Viens aider ou propose un projet.</p>
    <a href="/fr/participez" class="btn-ghost">Vers Participe →</a>
  </section>
</BaseLayout>
```

- [ ] **Verify:** `/nl/over-plazey` and `/fr/a-propos` render with org grid and partner list

---

## Task 10: Doe mee pages

**Files:**
- Modify: `src/pages/nl/doe-mee/index.astro`
- Modify: `src/pages/fr/participez/index.astro`

- [ ] **Write Doe mee NL**

```astro
---
// src/pages/nl/doe-mee/index.astro
import BaseLayout from '../../../layouts/BaseLayout.astro';
import Accordion from '../../../components/Accordion.astro';

const faqItems = [
  { question: 'Moet ik me inschrijven om te helpen?', answer: 'Ja, stuur een mailtje naar info@plazey.be. We nemen zo snel mogelijk contact op.' },
  { question: 'Krijg ik eten en drinken?', answer: 'Ja. Tijdens je shift krijg je een maaltijd en drankjes van Plazey.' },
  { question: 'Kan ik maar één dagdeel komen?', answer: 'Ja, dat kan. Geef het aan in je mail.' },
  { question: 'Kan ik met vrienden komen helpen?', answer: 'Ja, graag zelfs. Geef het aan in je mail.' },
  { question: 'Ik spreek geen Nederlands en geen Frans. Kan ik toch helpen?', answer: 'Ja. Plazey is meertalig. Geef aan welke talen je spreekt.' },
];
---

<BaseLayout title="Doe mee" lang="nl" currentPath="/nl/doe-mee">
  <h1>Doe mee</h1>
  <p class="opening">Kom helpen. Achter de bar, aan de kassa, of bij het opruimen.</p>

  <section aria-labelledby="vrijwilliger-worden">
    <h2 id="vrijwilliger-worden">Vrijwilliger worden</h2>
    <p>Plazey draait op vrijwilligers. Elk jaar helpen meer dan honderd mensen het festival mogelijk te maken. Jij kan er één van zijn.</p>
    <p>Je kiest zelf wanneer en hoeveel. Een halve dag, een hele dag, of het volledige weekend.</p>

    <ul role="list" class="roles-grid">
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

    <p>Je hoeft geen ervaring te hebben. Plazey biedt je een maaltijd en drankjes aan tijdens je shift.</p>

    <a
      href="mailto:info@plazey.be?subject=Vrijwilliger%20Plazey%202026"
      class="btn-primary"
    >
      Schrijf je in via info@plazey.be
    </a>
    <p>Vermeld in je mail: wanneer je beschikbaar bent en waarvoor je interesse hebt.</p>
  </section>

  <section aria-labelledby="stel-project-voor">
    <h2 id="stel-project-voor">Stel een project voor</h2>
    <p>Plazey is bottom-up gebouwd. Een groot deel van het programma wordt ingediend en mee georganiseerd door buurtbewoners, lokale artiesten en organisaties.</p>
    <p>Ben je buurtbewoner? Lokale artiest? Een kleine organisatie met een idee? Stel je project voor.</p>
    <p>Zet in je voorstel: wie je bent, wat je van plan bent, wat je nodig hebt (ruimte, materiaal, tijd), en voor welke dag je denkt.</p>

    <a
      href="mailto:info@plazey.be?subject=Project%20voorstel%20Plazey%202026"
      class="btn-ghost"
    >
      Stel je project voor via info@plazey.be
    </a>
  </section>

  <section aria-labelledby="vragen-vrijwilligers">
    <h2 id="vragen-vrijwilligers">Vragen</h2>
    <Accordion items={faqItems} />
  </section>
</BaseLayout>
```

- [ ] **Write Doe mee FR**

```astro
---
// src/pages/fr/participez/index.astro
import BaseLayout from '../../../layouts/BaseLayout.astro';
import Accordion from '../../../components/Accordion.astro';

const faqItems = [
  { question: 'Dois-je m\'inscrire pour aider ?', answer: 'Oui, envoie un mail à info@plazey.be. On te répond dès que possible.' },
  { question: 'Est-ce que je reçois à manger et à boire ?', answer: 'Oui. Pendant ton shift, Plazey t\'offre un repas et des boissons.' },
  { question: 'Puis-je venir seulement une demi-journée ?', answer: 'Oui, c\'est possible. Indique-le dans ton mail.' },
  { question: 'Puis-je venir avec des ami·es ?', answer: 'Oui, avec plaisir. Indique-le dans ton mail.' },
  { question: 'Je ne parle ni néerlandais ni français. Puis-je quand même aider ?', answer: 'Oui. Plazey est multilingue. Indique quelles langues tu parles.' },
];
---

<BaseLayout title="Participe" lang="fr" currentPath="/fr/participez">
  <h1>Participe</h1>
  <p class="opening">Venez donner un coup de main. Derrière le bar, à la caisse, ou pour le rangement.</p>

  <section aria-labelledby="devenir-benevole">
    <h2 id="devenir-benevole">Devenir bénévole</h2>
    <p>Plazey tourne grâce à ses bénévoles. Chaque année, plus de cent personnes rendent le festival possible. Tu peux en faire partie.</p>
    <p>Tu choisis toi-même quand et combien. Une demi-journée, une journée entière, ou tout le week-end.</p>

    <ul role="list" class="roles-grid">
      <li class="role-card">
        <h3>Bar</h3>
        <p>Tu sers les boissons et t'assures que tout le monde a ce qu'il lui faut. Tu travailles en équipe. Pas besoin d'expérience.</p>
      </li>
      <li class="role-card">
        <h3>Caisse</h3>
        <p>Les visiteur·euses achètent ici leurs tokens. Tu es le premier contact pour celles et ceux qui entrent sur le site.</p>
      </li>
      <li class="role-card">
        <h3>Infostand</h3>
        <p>Tu réponds aux questions, distribues les programmes et aides les gens à s'orienter. Parler plusieurs langues est un atout.</p>
      </li>
      <li class="role-card">
        <h3>Rangement et montage</h3>
        <p>Avant ou après le festival, tu aides à installer le site ou à le remettre en ordre. Travail concret et pratique.</p>
      </li>
    </ul>

    <p>Tu n'as pas besoin d'expérience. Plazey t'offre un repas et des boissons pendant ton shift.</p>

    <a
      href="mailto:info@plazey.be?subject=B%C3%A9n%C3%A9vole%20Plazey%202026"
      class="btn-primary"
    >
      Inscris-toi via info@plazey.be
    </a>
    <p>Indique dans ton mail : quand tu es disponible et ce qui t'intéresse.</p>
  </section>

  <section aria-labelledby="proposer-projet">
    <h2 id="proposer-projet">Propose un projet</h2>
    <p>Plazey est construit par le bas. Une grande partie du programme est proposée et co-organisée par des habitant·es, des artistes locaux·ales et des associations.</p>
    <p>Tu es habitant·e du quartier ? Artiste local·e ? Une petite asso avec une idée ? Propose ton projet.</p>
    <p>Indique dans ta proposition : qui tu es, ce que tu prévois, ce dont tu as besoin (espace, matériel, temps), et pour quel jour tu penses.</p>

    <a
      href="mailto:info@plazey.be?subject=Proposition%20projet%20Plazey%202026"
      class="btn-ghost"
    >
      Propose ton projet via info@plazey.be
    </a>
  </section>

  <section aria-labelledby="questions-benevoles">
    <h2 id="questions-benevoles">Questions</h2>
    <Accordion items={faqItems} />
  </section>
</BaseLayout>
```

- [ ] **Verify:** `/nl/doe-mee` and `/fr/participez` render with role grid, mailto buttons, and accordions

---

## Task 11: 404 page

**Files:**
- Create: `src/pages/404.astro`

- [ ] **Create 404**

```astro
---
// src/pages/404.astro
import BaseLayout from '../layouts/BaseLayout.astro';
// Detect lang from URL, default NL
const lang = Astro.request.url.includes('/fr/') ? 'fr' : 'nl';
---

<BaseLayout
  title={lang === 'fr' ? 'Page introuvable' : 'Pagina niet gevonden'}
  lang={lang}
>
  {lang === 'nl' ? (
    <>
      <h1>Deze pagina bestaat niet (meer).</h1>
      <p>Misschien zoek je het programma of praktische info?</p>
      <a href="/nl/programma" class="btn-primary">Naar het programma</a>
      <a href="/nl/praktisch" class="btn-ghost">Naar praktisch</a>
    </>
  ) : (
    <>
      <h1>Cette page n'existe pas (plus).</h1>
      <p>Tu cherches peut-être le programme ou les infos pratiques ?</p>
      <a href="/fr/programme" class="btn-primary">Vers le programme</a>
      <a href="/fr/infos-pratiques" class="btn-ghost">Vers les infos pratiques</a>
    </>
  )}
</BaseLayout>
```

- [ ] **Verify:** Navigate to a nonexistent URL — 404 page renders with links

---

## Task 12: Final check + commit

- [ ] **Run full build**

```bash
npm run build
```

Expected: build completes with no errors. Check output folder `dist/` contains:
- `dist/nl/index.html`
- `dist/fr/index.html`
- `dist/nl/programma/index.html`
- `dist/fr/programme/index.html`
- `dist/nl/programma/le-ministere-du-groove/index.html`
- `dist/nl/praktisch/index.html`
- `dist/fr/infos-pratiques/index.html`
- `dist/nl/over-plazey/index.html`
- `dist/fr/a-propos/index.html`
- `dist/nl/doe-mee/index.html`
- `dist/fr/participez/index.html`
- `dist/404.html`

- [ ] **Run astro check**

```bash
npx astro check
```

Expected: 0 errors

- [ ] **Commit**

```bash
git add -A
git commit -m "feat: build all pages as semantic HTML wireframes (no visual design)

- Site config with SITE_PHASE, festival dates, contact constants
- BaseLayout with skip link, landmark regions, Header + Footer
- Header: sticky nav, mobile hamburger with focus trap, lang toggle
- Footer: 4-block layout, bilingual backup toggle
- Programma pages: client-side filter with URL sync, aria-live
- Programma detail: click-to-play embed, back link with filter state
- Praktisch NL (/nl/praktisch) + FR (/fr/infos-pratiques)
- Over Plazey NL + FR with org grid and partner list
- Doe mee NL + FR with role grid, mailto CTAs, FAQ accordions
- 404 page with lang detection
- 6 sample programme items (NL + FR)
- /fr/pratique redirects to /fr/infos-pratiques"
```

---

## Notes for implementer

- **Images:** `src/images/plazey-2026.jpg` does not exist yet — the `<img>` on the home page will show a broken image. This is expected; real assets arrive later.
- **Partner logos:** Logo wall on Over Plazey renders text only. Replace `<span>` with `<img>` when SVG/PNG assets are available.
- **[placeholders]:** Several copy fields contain bracketed placeholders (e.g. `[starttijd invullen]`, `[valideren]`). These are intentional and must be filled by Frederik before launch — see the "Aandachtspunten vóór publicatie" list in the Notion copy document.
- **SITE_PHASE:** Currently set to `'reveal'`. Change in `src/config/site.ts` to alter site-wide conditional content.
- **FR Doe mee URL:** Codebase uses `/fr/participez/` (existing file). Skeleton spec says `/fr/participe`. Current implementation keeps `/fr/participez/` as confirmed in CLAUDE.md.
