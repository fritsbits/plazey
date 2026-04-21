# Site Phases Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the four-phase content model (`save-the-date → reveal → live → aftermovie`) across the Plazey site, including splitting the Doe mee page into two separate pages.

**Architecture:** All phase logic reads from `SITE_PHASE` in `src/config/site.ts`. Nav and home hero CTAs change per phase. The current `/doe-mee` page splits into `/vrijwilliger` (always in nav) and `/stel-een-project-voor` (nav only in `save-the-date`). Old URLs redirect via `netlify.toml`.

**Tech Stack:** Astro 6 (static), Netlify, TypeScript. No test framework — verification is `npx astro check` (0 errors) + `npm run build` (builds without error).

---

## File map

| Action | File |
|---|---|
| Modify | `src/config/site.ts` |
| Modify | `src/components/Header.astro` |
| Create | `src/pages/nl/vrijwilliger/index.astro` |
| Create | `src/pages/nl/stel-een-project-voor/index.astro` |
| Create | `src/pages/fr/benevole/index.astro` |
| Create | `src/pages/fr/propose-ton-projet/index.astro` |
| Delete | `src/pages/nl/doe-mee/index.astro` |
| Delete | `src/pages/fr/participez/index.astro` |
| Modify | `netlify.toml` |
| Modify | `src/pages/nl/index.astro` |
| Modify | `src/pages/fr/index.astro` |
| Modify | `src/pages/nl/programma/index.astro` |
| Modify | `src/pages/fr/programme/index.astro` |

---

## Task 1: Update Header nav for phases + new URL segments

**Files:**
- Modify: `src/components/Header.astro`
- Modify: `src/config/site.ts`

- [ ] **Step 1: Import SITE_PHASE in Header.astro**

Replace the top of the frontmatter in `src/components/Header.astro`:

```astro
---
import { SITE_PHASE } from '../config/site.ts';

interface Props {
  lang: 'nl' | 'fr';
  currentPath?: string;
}
const { lang, currentPath = '' } = Astro.props;

const nlNav = SITE_PHASE === 'save-the-date'
  ? [
      { href: '/nl/praktisch', label: 'Praktisch' },
      { href: '/nl/over-plazey', label: 'Over' },
      { href: '/nl/vrijwilliger', label: 'Kom helpen' },
      { href: '/nl/stel-een-project-voor', label: 'Stel een project voor' },
    ]
  : [
      { href: '/nl/programma', label: SITE_PHASE === 'aftermovie' ? 'Programma 2026' : 'Programma' },
      { href: '/nl/praktisch', label: 'Praktisch' },
      { href: '/nl/over-plazey', label: 'Over' },
      { href: '/nl/vrijwilliger', label: 'Kom helpen' },
    ];

const frNav = SITE_PHASE === 'save-the-date'
  ? [
      { href: '/fr/infos-pratiques', label: 'Pratique' },
      { href: '/fr/a-propos', label: 'À propos' },
      { href: '/fr/benevole', label: 'Venir aider' },
      { href: '/fr/propose-ton-projet', label: 'Proposer un projet' },
    ]
  : [
      { href: '/fr/programme', label: SITE_PHASE === 'aftermovie' ? 'Programme 2026' : 'Programme' },
      { href: '/fr/infos-pratiques', label: 'Pratique' },
      { href: '/fr/a-propos', label: 'À propos' },
      { href: '/fr/benevole', label: 'Venir aider' },
    ];

const nav = lang === 'nl' ? nlNav : frNav;
const homeHref = lang === 'nl' ? '/nl' : '/fr';

const segmentMap: Record<string, string> = {
  'programma': 'programme',
  'programme': 'programma',
  'praktisch': 'infos-pratiques',
  'infos-pratiques': 'praktisch',
  'over-plazey': 'a-propos',
  'a-propos': 'over-plazey',
  'doe-mee': 'participez',
  'participez': 'doe-mee',
  'vrijwilliger': 'benevole',
  'benevole': 'vrijwilliger',
  'stel-een-project-voor': 'propose-ton-projet',
  'propose-ton-projet': 'stel-een-project-voor',
};
```

Keep the rest of `Header.astro` unchanged from line `function alternateHref` onwards.

- [ ] **Step 2: Run type check**

```bash
cd /Users/frederikvincx/Documents/plazey/site && npx astro check
```

Expected: 0 errors (ignore any zod deprecation hints).

- [ ] **Step 3: Run build to verify**

```bash
npm run build
```

Expected: Build completes without errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/Header.astro
git commit -m "feat: phase-conditional nav in Header"
```

---

## Task 2: Create /nl/vrijwilliger page

This is the volunteer form extracted from the current doe-mee page. Content is identical to the volunteer sections — only the page URL changes.

**Files:**
- Create: `src/pages/nl/vrijwilliger/index.astro`

- [ ] **Step 1: Create the file**

Create `src/pages/nl/vrijwilliger/index.astro` with this content:

```astro
---
import BaseLayout from '../../../layouts/BaseLayout.astro';
import Container from '../../../components/Container.astro';
import Accordion from '../../../components/Accordion.astro';
import { Image } from 'astro:assets';
import vrijwilligerPortret from '../../../assets/images/vrijwilliger-portret.jpg';
import vrijwilligersBar from '../../../assets/images/vrijwilligers-bar.jpg';
import kassaTokens from '../../../assets/images/kassa-tokens.jpg';
import vrijwilligersBabyspot from '../../../assets/images/vrijwilligers-babyspot.jpg';
import etenGrillen from '../../../assets/images/eten-grillen.jpg';

const faqItems = [
  { question: 'Moet ik me inschrijven om te helpen?', answer: 'Ja, vul het formulier hierboven in. We nemen zo snel mogelijk contact op.' },
  { question: 'Krijg ik eten en drinken?', answer: 'Ja. Tijdens je shift krijg je een maaltijd en drankjes van Plazey.' },
  { question: 'Kan ik maar één dagdeel komen?', answer: 'Ja, dat kan. Geef het aan in het formulier.' },
  { question: 'Kan ik met vrienden komen helpen?', answer: 'Ja, graag zelfs. Geef het aan in het formulier.' },
  { question: 'Ik spreek geen Nederlands en geen Frans. Kan ik toch helpen?', answer: 'Ja. Plazey is meertalig. Geef aan welke talen je spreekt.' },
];
---

<BaseLayout title="Kom helpen" lang="nl" currentPath="/nl/vrijwilliger">
  <section class="py-12">
    <Container>
      <div class="flex flex-col sm:flex-row gap-8 items-center">
        <div class="flex-1">
          <h1>Kom helpen</h1>
          <p class="opening">Achter de bar, aan de kassa, of bij het opruimen.</p>
        </div>
        <figure class="flex-1">
          <Image
            src={vrijwilligerPortret}
            alt="Een vrijwilliger in roze Plazey-t-shirt kijkt omhoog, met het festivalterrein op de achtergrond."
            widths={[400, 700]}
            sizes="(max-width: 640px) 100vw, 50vw"
            class="w-full rounded"
          />
        </figure>
      </div>
    </Container>
  </section>

  <section aria-labelledby="vrijwilliger-worden" class="py-12">
    <Container>
      <h2 id="vrijwilliger-worden">Vrijwilliger worden</h2>
      <p>Plazey draait op vrijwilligers. Elk jaar helpen meer dan honderd mensen het festival mogelijk te maken. Jij kan er één van zijn.</p>
      <p>Je kiest zelf wanneer en hoeveel. Een halve dag, een hele dag, of het volledige weekend.</p>

      <ul role="list" class="roles-grid grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
        <li class="role-card">
          <Image
            src={vrijwilligersBar}
            alt="Vrijwilligers in roze Plazey-t-shirt achter de bar."
            widths={[400, 600]}
            sizes="(max-width: 640px) 100vw, 50vw"
            class="w-full rounded mb-3"
          />
          <h3>Bar</h3>
          <p>Je schenkt drankjes en zorgt dat iedereen iets heeft. Je werkt in team. Geen ervaring nodig.</p>
        </li>
        <li class="role-card">
          <Image
            src={kassaTokens}
            alt="De tokenstand: een medewerker helpt een bezoeker aan de kleurrijke kassa."
            widths={[400, 600]}
            sizes="(max-width: 640px) 100vw, 50vw"
            class="w-full rounded mb-3"
          />
          <h3>Kassa</h3>
          <p>Bezoekers kopen hier hun tokens. Je hebt het eerste contact met mensen die het terrein binnenkomen. Meertalig zijn is een troef.</p>
        </li>
        <li class="role-card">
          <Image
            src={vrijwilligersBabyspot}
            alt="Twee vrijwilligers voor de Baby Spot-caravan, de infostand voor gezinnen."
            widths={[400, 600]}
            sizes="(max-width: 640px) 100vw, 50vw"
            class="w-full rounded mb-3"
          />
          <h3>Infostand</h3>
          <p>Je beantwoordt vragen, geeft programmaboekjes mee en helpt mensen de weg vinden. Meerdere talen zijn handig.</p>
        </li>
        <li class="role-card">
          <Image
            src={etenGrillen}
            alt="Een vrijwilliger in Plazey-t-shirt grilt spiesjes op een buitenstand."
            widths={[400, 600]}
            sizes="(max-width: 640px) 100vw, 50vw"
            class="w-full rounded mb-3"
          />
          <h3>Opruim en opbouw</h3>
          <p>Vóór of na het festival help je het terrein opbouwen of netjes achterlaten. Praktisch, concreet werk.</p>
        </li>
      </ul>

      <p class="mt-6">Je hoeft geen ervaring te hebben. Plazey zorgt voor een maaltijd en drankjes terwijl je helpt.</p>

      <h2 class="mt-10">Schrijf je in als vrijwilliger</h2>
      <p>Stuur ons je gegevens. We nemen zo snel mogelijk contact op.</p>

      <form
        name="vrijwilliger"
        method="POST"
        data-netlify="true"
        class="mt-8 flex flex-col gap-5 max-w-lg"
      >
        <input type="hidden" name="form-name" value="vrijwilliger" />

        <div class="flex flex-col gap-1">
          <label for="naam-vw" class="font-semibold text-sm">Naam</label>
          <input
            type="text"
            id="naam-vw"
            name="naam"
            required
            class="border border-gray-300 rounded px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div class="flex flex-col gap-1">
          <label for="email-vw" class="font-semibold text-sm">E-mailadres</label>
          <input
            type="email"
            id="email-vw"
            name="email"
            required
            class="border border-gray-300 rounded px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <fieldset class="flex flex-col gap-2">
          <legend class="font-semibold text-sm">Wanneer ben je beschikbaar?</legend>
          <label class="flex items-center gap-2"><input type="checkbox" name="beschikbaarheid" value="vrijdag" /> Vrijdag</label>
          <label class="flex items-center gap-2"><input type="checkbox" name="beschikbaarheid" value="zaterdag" /> Zaterdag</label>
          <label class="flex items-center gap-2"><input type="checkbox" name="beschikbaarheid" value="zondag" /> Zondag</label>
        </fieldset>

        <fieldset class="flex flex-col gap-2">
          <legend class="font-semibold text-sm">Waarvoor heb je interesse?</legend>
          <label class="flex items-center gap-2"><input type="checkbox" name="rol" value="bar" /> Bar</label>
          <label class="flex items-center gap-2"><input type="checkbox" name="rol" value="kassa" /> Kassa</label>
          <label class="flex items-center gap-2"><input type="checkbox" name="rol" value="infostand" /> Infostand</label>
          <label class="flex items-center gap-2"><input type="checkbox" name="rol" value="opbouw-opruim" /> Opbouw en opruim</label>
        </fieldset>

        <div class="flex flex-col gap-1">
          <label for="talen-vw" class="font-semibold text-sm">Welke talen spreek je?</label>
          <input
            type="text"
            id="talen-vw"
            name="talen"
            placeholder="bv. Nederlands, Frans, Engels"
            class="border border-gray-300 rounded px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div class="flex flex-col gap-1">
          <label for="extra-vw" class="font-semibold text-sm">Nog iets anders? <span class="font-normal text-gray-500">(optioneel)</span></label>
          <textarea
            id="extra-vw"
            name="extra"
            rows="3"
            class="border border-gray-300 rounded px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-600"
          ></textarea>
        </div>

        <button type="submit" class="btn-primary self-start">Schrijf je in</button>
      </form>
    </Container>
  </section>

  <section aria-labelledby="vragen-vrijwilligers" class="py-12">
    <Container>
      <h2 id="vragen-vrijwilligers">Vragen</h2>
      <Accordion items={faqItems} />
    </Container>
  </section>
</BaseLayout>

<script>
  const form = document.querySelector<HTMLFormElement>('form[name="vrijwilliger"]');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector<HTMLButtonElement>('button[type="submit"]');
      if (!submitBtn) return;
      const originalText = submitBtn.textContent ?? '';
      submitBtn.disabled = true;
      submitBtn.textContent = 'Bezig…';
      try {
        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(new FormData(form) as unknown as Record<string, string>).toString(),
        });
        if (response.ok) {
          form.innerHTML = '<p class="py-4 font-semibold">Bedankt! We nemen zo snel mogelijk contact op.</p>';
        } else {
          throw new Error('server error');
        }
      } catch {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        let errorEl = form.querySelector<HTMLParagraphElement>('.form-error');
        if (!errorEl) {
          errorEl = document.createElement('p');
          errorEl.className = 'form-error text-red-600 text-sm';
          submitBtn.insertAdjacentElement('beforebegin', errorEl);
        }
        errorEl.textContent = 'Er ging iets mis. Probeer het opnieuw of stuur een mail naar info@plazey.be.';
      }
    });
  }
</script>
```

- [ ] **Step 2: Run type check and build**

```bash
cd /Users/frederikvincx/Documents/plazey/site && npx astro check && npm run build
```

Expected: 0 errors, build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/pages/nl/vrijwilliger/
git commit -m "feat: add /nl/vrijwilliger page (split from doe-mee)"
```

---

## Task 3: Create /nl/stel-een-project-voor page

**Files:**
- Create: `src/pages/nl/stel-een-project-voor/index.astro`

- [ ] **Step 1: Create the file**

```astro
---
import BaseLayout from '../../../layouts/BaseLayout.astro';
import Container from '../../../components/Container.astro';
---

<BaseLayout title="Stel een project voor" lang="nl" currentPath="/nl/stel-een-project-voor">
  <section class="py-12">
    <Container>
      <h1>Stel een project voor</h1>
      <p class="opening">Stel je voor. Met je idee en je buurt.</p>
      <p>Plazey wordt mee gemaakt door mensen uit de buurt. Een groot deel van het programma wordt ingediend en mee georganiseerd door buurtbewoners, lokale artiesten en organisaties.</p>
      <p>Ben je buurtbewoner? Lokale artiest? Een kleine organisatie met een idee? Stel je project voor.</p>
      <p>Zet in je voorstel: wie je bent, wat je van plan bent, wat je nodig hebt, en voor welke dag je denkt.</p>
    </Container>
  </section>

  <section aria-labelledby="project-form-heading" class="py-12">
    <Container>
      <h2 id="project-form-heading">Stuur je voorstel</h2>

      <form
        name="project-voorstel"
        method="POST"
        data-netlify="true"
        class="mt-6 flex flex-col gap-5 max-w-lg"
      >
        <input type="hidden" name="form-name" value="project-voorstel" />

        <div class="flex flex-col gap-1">
          <label for="naam-pv" class="font-semibold text-sm">Naam</label>
          <input
            type="text"
            id="naam-pv"
            name="naam"
            required
            class="border border-gray-300 rounded px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div class="flex flex-col gap-1">
          <label for="email-pv" class="font-semibold text-sm">E-mailadres</label>
          <input
            type="email"
            id="email-pv"
            name="email"
            required
            class="border border-gray-300 rounded px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div class="flex flex-col gap-1">
          <label for="project-omschrijving" class="font-semibold text-sm">Wat is je idee?</label>
          <textarea
            id="project-omschrijving"
            name="omschrijving"
            rows="4"
            required
            class="border border-gray-300 rounded px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-600"
          ></textarea>
        </div>

        <div class="flex flex-col gap-1">
          <label for="project-nodig" class="font-semibold text-sm">Wat heb je nodig? <span class="font-normal text-gray-500">(ruimte, materiaal, tijd)</span></label>
          <textarea
            id="project-nodig"
            name="nodig"
            rows="3"
            class="border border-gray-300 rounded px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-600"
          ></textarea>
        </div>

        <fieldset class="flex flex-col gap-2">
          <legend class="font-semibold text-sm">Voor welke dag denk je?</legend>
          <label class="flex items-center gap-2"><input type="radio" name="dag" value="vrijdag" /> Vrijdag</label>
          <label class="flex items-center gap-2"><input type="radio" name="dag" value="zaterdag" /> Zaterdag</label>
          <label class="flex items-center gap-2"><input type="radio" name="dag" value="zondag" /> Zondag</label>
          <label class="flex items-center gap-2"><input type="radio" name="dag" value="weet-nog-niet" /> Weet ik nog niet</label>
        </fieldset>

        <button type="submit" class="btn-primary self-start">Stel je project voor</button>
      </form>
    </Container>
  </section>
</BaseLayout>

<script>
  const form = document.querySelector<HTMLFormElement>('form[name="project-voorstel"]');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector<HTMLButtonElement>('button[type="submit"]');
      if (!submitBtn) return;
      const originalText = submitBtn.textContent ?? '';
      submitBtn.disabled = true;
      submitBtn.textContent = 'Bezig…';
      try {
        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(new FormData(form) as unknown as Record<string, string>).toString(),
        });
        if (response.ok) {
          form.innerHTML = '<p class="py-4 font-semibold">Bedankt voor je voorstel! We nemen zo snel mogelijk contact op.</p>';
        } else {
          throw new Error('server error');
        }
      } catch {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        let errorEl = form.querySelector<HTMLParagraphElement>('.form-error');
        if (!errorEl) {
          errorEl = document.createElement('p');
          errorEl.className = 'form-error text-red-600 text-sm';
          submitBtn.insertAdjacentElement('beforebegin', errorEl);
        }
        errorEl.textContent = 'Er ging iets mis. Probeer het opnieuw of stuur een mail naar info@plazey.be.';
      }
    });
  }
</script>
```

- [ ] **Step 2: Run type check and build**

```bash
cd /Users/frederikvincx/Documents/plazey/site && npx astro check && npm run build
```

Expected: 0 errors, build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/pages/nl/stel-een-project-voor/
git commit -m "feat: add /nl/stel-een-project-voor page"
```

---

## Task 4: Create /fr/benevole page

**Files:**
- Create: `src/pages/fr/benevole/index.astro`

- [ ] **Step 1: Create the file**

```astro
---
import BaseLayout from '../../../layouts/BaseLayout.astro';
import Container from '../../../components/Container.astro';
import Accordion from '../../../components/Accordion.astro';
import { Image } from 'astro:assets';
import vrijwilligerPortret from '../../../assets/images/vrijwilliger-portret.jpg';
import vrijwilligersBar from '../../../assets/images/vrijwilligers-bar.jpg';
import kassaTokens from '../../../assets/images/kassa-tokens.jpg';
import vrijwilligersBabyspot from '../../../assets/images/vrijwilligers-babyspot.jpg';
import etenGrillen from '../../../assets/images/eten-grillen.jpg';

const faqItems = [
  { question: "Dois-je m'inscrire pour aider ?", answer: 'Oui, remplis le formulaire ci-dessus. On te répond dès que possible.' },
  { question: 'Est-ce que je reçois à manger et à boire ?', answer: "Oui. Pendant ton shift, Plazey t'offre un repas et des boissons." },
  { question: 'Puis-je venir seulement une demi-journée ?', answer: "Oui, c'est possible. Indique-le dans le formulaire." },
  { question: "Puis-je venir avec des ami·es ?", answer: "Oui, avec plaisir. Indique-le dans le formulaire." },
  { question: 'Je ne parle ni néerlandais ni français. Puis-je quand même aider ?', answer: 'Oui. Plazey est multilingue. Indique quelles langues tu parles.' },
];
---

<BaseLayout title="Venir aider" lang="fr" currentPath="/fr/benevole">
  <section class="py-12">
    <Container>
      <div class="flex flex-col sm:flex-row gap-8 items-center">
        <div class="flex-1">
          <h1>Venir aider</h1>
          <p class="opening">Derrière le bar, à la caisse, ou pour le rangement.</p>
        </div>
        <figure class="flex-1">
          <Image
            src={vrijwilligerPortret}
            alt="Une bénévole en t-shirt rose Plazey regarde vers le haut, avec le site du festival derrière elle."
            widths={[400, 700]}
            sizes="(max-width: 640px) 100vw, 50vw"
            class="w-full rounded"
          />
        </figure>
      </div>
    </Container>
  </section>

  <section aria-labelledby="devenir-benevole" class="py-12">
    <Container>
      <h2 id="devenir-benevole">Devenir bénévole</h2>
      <p>Plazey tourne grâce à ses bénévoles. Chaque année, plus de cent personnes rendent le festival possible. Tu peux en faire partie.</p>
      <p>Tu choisis toi-même quand et combien. Une demi-journée, une journée entière, ou tout le week-end.</p>

      <ul role="list" class="roles-grid grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
        <li class="role-card">
          <Image
            src={vrijwilligersBar}
            alt="Des bénévoles en t-shirt rose Plazey derrière le bar."
            widths={[400, 600]}
            sizes="(max-width: 640px) 100vw, 50vw"
            class="w-full rounded mb-3"
          />
          <h3>Bar</h3>
          <p>Tu sers les boissons et t'assures que tout le monde a ce qu'il lui faut. Tu travailles en équipe. Pas besoin d'expérience.</p>
        </li>
        <li class="role-card">
          <Image
            src={kassaTokens}
            alt="Le stand de tokens : un·e bénévole aide un·e visiteur·euse à la caisse colorée."
            widths={[400, 600]}
            sizes="(max-width: 640px) 100vw, 50vw"
            class="w-full rounded mb-3"
          />
          <h3>Caisse</h3>
          <p>Les visiteur·euses achètent ici leurs tokens. Tu es le premier contact pour celles et ceux qui entrent sur le site. Parler plusieurs langues est un plus.</p>
        </li>
        <li class="role-card">
          <Image
            src={vrijwilligersBabyspot}
            alt="Deux bénévoles devant la caravane Baby Spot, le stand d'infos pour les familles."
            widths={[400, 600]}
            sizes="(max-width: 640px) 100vw, 50vw"
            class="w-full rounded mb-3"
          />
          <h3>Infostand</h3>
          <p>Tu réponds aux questions, distribues les programmes et aides les gens à s'orienter. Parler plusieurs langues est un atout.</p>
        </li>
        <li class="role-card">
          <Image
            src={etenGrillen}
            alt="Un·e bénévole en t-shirt Plazey grille des brochettes à un stand extérieur."
            widths={[400, 600]}
            sizes="(max-width: 640px) 100vw, 50vw"
            class="w-full rounded mb-3"
          />
          <h3>Rangement et montage</h3>
          <p>Avant ou après le festival, tu aides à installer le site ou à le remettre en ordre. Travail concret et pratique.</p>
        </li>
      </ul>

      <p class="mt-6">Tu n'as pas besoin d'expérience. Plazey t'offre un repas et des boissons pendant ton shift.</p>

      <h2 class="mt-10">Inscris-toi comme bénévole</h2>
      <p>Envoie-nous tes coordonnées. On te répond dès que possible.</p>

      <form
        name="benevole"
        method="POST"
        data-netlify="true"
        class="mt-8 flex flex-col gap-5 max-w-lg"
      >
        <input type="hidden" name="form-name" value="benevole" />

        <div class="flex flex-col gap-1">
          <label for="naam-vw" class="font-semibold text-sm">Nom</label>
          <input
            type="text"
            id="naam-vw"
            name="naam"
            required
            class="border border-gray-300 rounded px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div class="flex flex-col gap-1">
          <label for="email-vw" class="font-semibold text-sm">Adresse e-mail</label>
          <input
            type="email"
            id="email-vw"
            name="email"
            required
            class="border border-gray-300 rounded px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <fieldset class="flex flex-col gap-2">
          <legend class="font-semibold text-sm">Quand es-tu disponible ?</legend>
          <label class="flex items-center gap-2"><input type="checkbox" name="beschikbaarheid" value="vrijdag" /> Vendredi</label>
          <label class="flex items-center gap-2"><input type="checkbox" name="beschikbaarheid" value="zaterdag" /> Samedi</label>
          <label class="flex items-center gap-2"><input type="checkbox" name="beschikbaarheid" value="zondag" /> Dimanche</label>
        </fieldset>

        <fieldset class="flex flex-col gap-2">
          <legend class="font-semibold text-sm">Qu'est-ce qui t'intéresse ?</legend>
          <label class="flex items-center gap-2"><input type="checkbox" name="rol" value="bar" /> Bar</label>
          <label class="flex items-center gap-2"><input type="checkbox" name="rol" value="kassa" /> Caisse</label>
          <label class="flex items-center gap-2"><input type="checkbox" name="rol" value="infostand" /> Infostand</label>
          <label class="flex items-center gap-2"><input type="checkbox" name="rol" value="opbouw-opruim" /> Rangement et montage</label>
        </fieldset>

        <div class="flex flex-col gap-1">
          <label for="talen-vw" class="font-semibold text-sm">Quelles langues parles-tu ?</label>
          <input
            type="text"
            id="talen-vw"
            name="talen"
            placeholder="ex. néerlandais, français, anglais"
            class="border border-gray-300 rounded px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div class="flex flex-col gap-1">
          <label for="extra-vw" class="font-semibold text-sm">Autre chose ? <span class="font-normal text-gray-500">(facultatif)</span></label>
          <textarea
            id="extra-vw"
            name="extra"
            rows="3"
            class="border border-gray-300 rounded px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-600"
          ></textarea>
        </div>

        <button type="submit" class="btn-primary self-start">M'inscrire</button>
      </form>
    </Container>
  </section>

  <section aria-labelledby="questions-benevoles" class="py-12">
    <Container>
      <h2 id="questions-benevoles">Questions</h2>
      <Accordion items={faqItems} />
    </Container>
  </section>
</BaseLayout>

<script>
  const form = document.querySelector<HTMLFormElement>('form[name="benevole"]');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector<HTMLButtonElement>('button[type="submit"]');
      if (!submitBtn) return;
      const originalText = submitBtn.textContent ?? '';
      submitBtn.disabled = true;
      submitBtn.textContent = 'En cours…';
      try {
        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(new FormData(form) as unknown as Record<string, string>).toString(),
        });
        if (response.ok) {
          form.innerHTML = '<p class="py-4 font-semibold">Merci ! On te répond dès que possible.</p>';
        } else {
          throw new Error('server error');
        }
      } catch {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        let errorEl = form.querySelector<HTMLParagraphElement>('.form-error');
        if (!errorEl) {
          errorEl = document.createElement('p');
          errorEl.className = 'form-error text-red-600 text-sm';
          submitBtn.insertAdjacentElement('beforebegin', errorEl);
        }
        errorEl.textContent = 'Quelque chose a mal tourné. Réessaie ou envoie un mail à info@plazey.be.';
      }
    });
  }
</script>
```

- [ ] **Step 2: Run type check and build**

```bash
cd /Users/frederikvincx/Documents/plazey/site && npx astro check && npm run build
```

Expected: 0 errors, build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/pages/fr/benevole/
git commit -m "feat: add /fr/benevole page (split from participez)"
```

---

## Task 5: Create /fr/propose-ton-projet page

**Files:**
- Create: `src/pages/fr/propose-ton-projet/index.astro`

- [ ] **Step 1: Create the file**

```astro
---
import BaseLayout from '../../../layouts/BaseLayout.astro';
import Container from '../../../components/Container.astro';
---

<BaseLayout title="Proposer un projet" lang="fr" currentPath="/fr/propose-ton-projet">
  <section class="py-12">
    <Container>
      <h1>Proposer un projet</h1>
      <p class="opening">Fais-toi connaître. Avec ton idée et ton quartier.</p>
      <p>Plazey est construit par le bas. Une grande partie du programme est proposée et co-organisée par des habitant·es, des artistes locaux·ales et des associations.</p>
      <p>Tu es habitant·e du quartier ? Artiste local·e ? Une petite association avec une idée ? Propose ton projet.</p>
      <p>Dans ta proposition, indique : qui tu es, ce que tu envisages, ce dont tu as besoin (espace, matériel, temps), et pour quel jour tu penses.</p>
    </Container>
  </section>

  <section aria-labelledby="project-form-heading" class="py-12">
    <Container>
      <h2 id="project-form-heading">Envoie ta proposition</h2>

      <form
        name="proposition-projet"
        method="POST"
        data-netlify="true"
        class="mt-6 flex flex-col gap-5 max-w-lg"
      >
        <input type="hidden" name="form-name" value="proposition-projet" />

        <div class="flex flex-col gap-1">
          <label for="naam-pv" class="font-semibold text-sm">Nom</label>
          <input
            type="text"
            id="naam-pv"
            name="naam"
            required
            class="border border-gray-300 rounded px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div class="flex flex-col gap-1">
          <label for="email-pv" class="font-semibold text-sm">Adresse e-mail</label>
          <input
            type="email"
            id="email-pv"
            name="email"
            required
            class="border border-gray-300 rounded px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div class="flex flex-col gap-1">
          <label for="project-omschrijving" class="font-semibold text-sm">C'est quoi ton idée ?</label>
          <textarea
            id="project-omschrijving"
            name="omschrijving"
            rows="4"
            required
            class="border border-gray-300 rounded px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-600"
          ></textarea>
        </div>

        <div class="flex flex-col gap-1">
          <label for="project-nodig" class="font-semibold text-sm">De quoi as-tu besoin ? <span class="font-normal text-gray-500">(espace, matériel, temps)</span></label>
          <textarea
            id="project-nodig"
            name="nodig"
            rows="3"
            class="border border-gray-300 rounded px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-600"
          ></textarea>
        </div>

        <fieldset class="flex flex-col gap-2">
          <legend class="font-semibold text-sm">Pour quel jour tu penses ?</legend>
          <label class="flex items-center gap-2"><input type="radio" name="dag" value="vrijdag" /> Vendredi</label>
          <label class="flex items-center gap-2"><input type="radio" name="dag" value="zaterdag" /> Samedi</label>
          <label class="flex items-center gap-2"><input type="radio" name="dag" value="zondag" /> Dimanche</label>
          <label class="flex items-center gap-2"><input type="radio" name="dag" value="weet-nog-niet" /> Je ne sais pas encore</label>
        </fieldset>

        <button type="submit" class="btn-primary self-start">Envoyer ma proposition</button>
      </form>
    </Container>
  </section>
</BaseLayout>

<script>
  const form = document.querySelector<HTMLFormElement>('form[name="proposition-projet"]');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector<HTMLButtonElement>('button[type="submit"]');
      if (!submitBtn) return;
      const originalText = submitBtn.textContent ?? '';
      submitBtn.disabled = true;
      submitBtn.textContent = 'En cours…';
      try {
        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(new FormData(form) as unknown as Record<string, string>).toString(),
        });
        if (response.ok) {
          form.innerHTML = '<p class="py-4 font-semibold">Merci pour ta proposition ! On te répond dès que possible.</p>';
        } else {
          throw new Error('server error');
        }
      } catch {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        let errorEl = form.querySelector<HTMLParagraphElement>('.form-error');
        if (!errorEl) {
          errorEl = document.createElement('p');
          errorEl.className = 'form-error text-red-600 text-sm';
          submitBtn.insertAdjacentElement('beforebegin', errorEl);
        }
        errorEl.textContent = 'Quelque chose a mal tourné. Réessaie ou envoie un mail à info@plazey.be.';
      }
    });
  }
</script>
```

- [ ] **Step 2: Run type check and build**

```bash
cd /Users/frederikvincx/Documents/plazey/site && npx astro check && npm run build
```

Expected: 0 errors, build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/pages/fr/propose-ton-projet/
git commit -m "feat: add /fr/propose-ton-projet page"
```

---

## Task 6: Delete old pages + add netlify.toml redirects

Netlify serves static files before checking redirects (without `force = true`). To make the 301 redirects work, delete the old page files so no static file exists at the old URLs.

**Files:**
- Delete: `src/pages/nl/doe-mee/index.astro`
- Delete: `src/pages/fr/participez/index.astro`
- Modify: `netlify.toml`

- [ ] **Step 1: Delete old page files**

```bash
rm -r /Users/frederikvincx/Documents/plazey/site/src/pages/nl/doe-mee
rm -r /Users/frederikvincx/Documents/plazey/site/src/pages/fr/participez
```

- [ ] **Step 2: Add redirects to netlify.toml**

Append to `netlify.toml` (after the existing `[[redirects]]` blocks):

```toml
[[redirects]]
  from = "/nl/doe-mee"
  to = "/nl/vrijwilliger"
  status = 301

[[redirects]]
  from = "/nl/doe-mee/*"
  to = "/nl/vrijwilliger"
  status = 301

[[redirects]]
  from = "/fr/participez"
  to = "/fr/benevole"
  status = 301

[[redirects]]
  from = "/fr/participez/*"
  to = "/fr/benevole"
  status = 301
```

- [ ] **Step 3: Run build to verify old URLs no longer generate static files**

```bash
cd /Users/frederikvincx/Documents/plazey/site && npm run build
```

Expected: Build succeeds. Confirm `dist/nl/doe-mee/` and `dist/fr/participez/` do NOT exist:

```bash
ls dist/nl/doe-mee 2>/dev/null && echo "EXISTS — problem" || echo "gone — ok"
ls dist/fr/participez 2>/dev/null && echo "EXISTS — problem" || echo "gone — ok"
```

Expected: both print "gone — ok".

- [ ] **Step 4: Commit**

```bash
git add netlify.toml
git rm src/pages/nl/doe-mee/index.astro
git rm src/pages/fr/participez/index.astro
git commit -m "feat: redirect /doe-mee → /vrijwilliger and /participez → /benevole"
```

---

## Task 7: Update /nl/index.astro home for phases

**Files:**
- Modify: `src/pages/nl/index.astro`

- [ ] **Step 1: Replace the frontmatter imports and data section**

Replace the frontmatter block (lines 1–16) of `src/pages/nl/index.astro`:

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Container from '../../components/Container.astro';
import ProgramCard from '../../components/ProgramCard.astro';
import { Image } from 'astro:assets';
import { getCollection } from 'astro:content';
import { FESTIVAL_DATES_NL, FESTIVAL_LOCATION, SITE_PHASE, FACEBOOK_URL } from '../../config/site.ts';
import sfeerFestivalplein from '../../assets/images/sfeer-festivalplein.jpg';
import sfeerPicknicktafels from '../../assets/images/sfeer-picknicktafels.jpg';
import vrijwilligerPortret from '../../assets/images/vrijwilliger-portret.jpg';

const allItems = await getCollection('programme');
const nlItems = allItems.filter(e => e.data.lang === 'nl');
const saturdayHighlights = nlItems.filter(e => e.data.day === 'saturday').slice(0, 3);
const hasProgramme = nlItems.length > 0;

const festivalDays: Record<string, 'friday' | 'saturday' | 'sunday'> = {
  '2026-08-22': 'friday',
  '2026-08-23': 'saturday',
  '2026-08-24': 'sunday',
};
const todayKey = new Date().toISOString().slice(0, 10);
const todayFestivalDay = festivalDays[todayKey];
const todayItems = todayFestivalDay
  ? nlItems
      .filter(e => e.data.day === todayFestivalDay)
      .sort((a, b) => a.data.startTime.localeCompare(b.data.startTime))
      .slice(0, 3)
  : saturdayHighlights;
---
```

- [ ] **Step 2: Replace the hero section**

Replace the entire `<section aria-label="Hero" ...>` block with:

```astro
<BaseLayout title="Plazey festival" lang="nl" currentPath="/nl">
  <section aria-label="Hero" class="py-16">
    <Container>
      <span class="edition-indicator">Editie 2026</span>
      {SITE_PHASE === 'aftermovie' ? (
        <>
          <h1>Bedankt. Tot volgend jaar.</h1>
          <div class="cta-group">
            <a href={FACEBOOK_URL} rel="external noopener" target="_blank" class="btn-primary">Bekijk onze foto's op Facebook</a>
          </div>
        </>
      ) : (
        <>
          <h1>Kom langs. Plazey is drie dagen lang gratis feest in het Elisabethpark.</h1>
          <p>{FESTIVAL_DATES_NL} · {FESTIVAL_LOCATION}</p>
          <div class="cta-group">
            {SITE_PHASE === 'save-the-date' && (
              <>
                <a href="/nl/vrijwilliger" class="btn-primary">Kom helpen</a>
                <a href="/nl/stel-een-project-voor" class="btn-ghost">Stel een project voor</a>
              </>
            )}
            {SITE_PHASE === 'reveal' && (
              <>
                <a href="/nl/programma" class="btn-primary">Bekijk het programma</a>
                <a href="/nl/vrijwilliger" class="btn-ghost">Kom helpen</a>
                <a href="/nl/praktisch#bereikbaarheid" class="btn-text">Zo geraak je er</a>
              </>
            )}
            {SITE_PHASE === 'live' && (
              <>
                <a href="/nl/programma" class="btn-primary">Zie wat er vandaag speelt</a>
                <a href="/nl/praktisch#bereikbaarheid" class="btn-ghost">Zo geraak je er</a>
              </>
            )}
          </div>
        </>
      )}
    </Container>
    <figure>
      <Image
        src={sfeerFestivalplein}
        alt="Het Plazey-festivalterrein in het Elisabethpark: picknicktafels, slingers, en het Plazey-bord tussen de bomen."
        widths={[800, 1200, 1600]}
        sizes="100vw"
        class="w-full"
      />
    </figure>
  </section>
```

- [ ] **Step 3: Replace the programme teaser section**

Replace the entire `<section aria-labelledby="programma-teaser" ...>` block with:

```astro
  <section aria-labelledby="programma-teaser" class="py-12">
    <Container>
      {SITE_PHASE === 'live' ? (
        <>
          <h2 id="programma-teaser">Vandaag op Plazey</h2>
          <ul role="list" class="program-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {todayItems.map(item => (
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
          <a href="/nl/programma" class="btn-text">Zie alles wat er vandaag is →</a>
        </>
      ) : SITE_PHASE === 'aftermovie' ? (
        <>
          <h2 id="programma-teaser">Terugblik op Plazey 2026</h2>
          <p>Dankjewel aan iedereen die er was.</p>
          <a href="/nl/programma" class="btn-text">Bekijk het volledige programma 2026 →</a>
        </>
      ) : hasProgramme && SITE_PHASE !== 'save-the-date' ? (
        <>
          <h2 id="programma-teaser">Wat staat er op het programma?</h2>
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
        <>
          <h2 id="programma-teaser">Wat staat er op het programma?</h2>
          <p>Het programma volgt binnenkort. <a href={FACEBOOK_URL} rel="external noopener" target="_blank">Volg ons op Facebook voor de aankondiging.</a></p>
        </>
      )}
    </Container>
  </section>
```

- [ ] **Step 4: Update the Doe mee section link**

In the Doe mee section near the bottom of the page, update the `href` on the ghost button from `/nl/doe-mee` to `/nl/vrijwilliger`:

```astro
<a href="/nl/vrijwilliger" class="btn-ghost">Kom helpen</a>
```

- [ ] **Step 5: Run type check and build**

```bash
cd /Users/frederikvincx/Documents/plazey/site && npx astro check && npm run build
```

Expected: 0 errors, build succeeds.

- [ ] **Step 6: Commit**

```bash
git add src/pages/nl/index.astro
git commit -m "feat: phase-conditional hero and teaser on NL home"
```

---

## Task 8: Update /fr/index.astro home for phases

**Files:**
- Modify: `src/pages/fr/index.astro`

- [ ] **Step 1: Replace the frontmatter**

Replace the frontmatter block (lines 1–16) of `src/pages/fr/index.astro`:

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Container from '../../components/Container.astro';
import ProgramCard from '../../components/ProgramCard.astro';
import { Image } from 'astro:assets';
import { getCollection } from 'astro:content';
import { FESTIVAL_DATES_FR, FESTIVAL_LOCATION, SITE_PHASE, FACEBOOK_URL } from '../../config/site.ts';
import sfeerFestivalplein from '../../assets/images/sfeer-festivalplein.jpg';
import sfeerPicknicktafels from '../../assets/images/sfeer-picknicktafels.jpg';
import vrijwilligerPortret from '../../assets/images/vrijwilliger-portret.jpg';

const allItems = await getCollection('programme');
const frItems = allItems.filter(e => e.data.lang === 'fr');
const saturdayHighlights = frItems.filter(e => e.data.day === 'saturday').slice(0, 3);
const hasProgramme = frItems.length > 0;

const festivalDays: Record<string, 'friday' | 'saturday' | 'sunday'> = {
  '2026-08-22': 'friday',
  '2026-08-23': 'saturday',
  '2026-08-24': 'sunday',
};
const todayKey = new Date().toISOString().slice(0, 10);
const todayFestivalDay = festivalDays[todayKey];
const todayItems = todayFestivalDay
  ? frItems
      .filter(e => e.data.day === todayFestivalDay)
      .sort((a, b) => a.data.startTime.localeCompare(b.data.startTime))
      .slice(0, 3)
  : saturdayHighlights;
---
```

- [ ] **Step 2: Replace the hero section**

Replace the `<section aria-label="Héro" ...>` block:

```astro
<BaseLayout title="Plazey festival" lang="fr" currentPath="/fr">
  <section aria-label="Héro" class="py-16">
    <Container class="pb-8">
      <span class="edition-indicator">Édition 2026</span>
      {SITE_PHASE === 'aftermovie' ? (
        <>
          <h1>Merci. À l'année prochaine.</h1>
          <div class="cta-group">
            <a href={FACEBOOK_URL} rel="external noopener" target="_blank" class="btn-primary">Voir nos photos sur Facebook</a>
          </div>
        </>
      ) : (
        <>
          <h1>Passez nous voir. Plazey, c'est trois jours de fête gratuite au parc Élisabeth.</h1>
          <p class="mt-2">{FESTIVAL_DATES_FR} · {FESTIVAL_LOCATION}</p>
          <div class="cta-group">
            {SITE_PHASE === 'save-the-date' && (
              <>
                <a href="/fr/benevole" class="btn-primary">Venir aider</a>
                <a href="/fr/propose-ton-projet" class="btn-ghost">Proposer un projet</a>
              </>
            )}
            {SITE_PHASE === 'reveal' && (
              <>
                <a href="/fr/programme" class="btn-primary">Voir le programme</a>
                <a href="/fr/benevole" class="btn-ghost">Venir aider</a>
                <a href="/fr/infos-pratiques#acces" class="btn-text">Comment s'y rendre</a>
              </>
            )}
            {SITE_PHASE === 'live' && (
              <>
                <a href="/fr/programme" class="btn-primary">Voir ce qui se passe aujourd'hui</a>
                <a href="/fr/infos-pratiques#acces" class="btn-ghost">Comment s'y rendre</a>
              </>
            )}
          </div>
        </>
      )}
    </Container>
    <figure>
      <Image
        src={sfeerFestivalplein}
        alt="Le site du festival Plazey au parc Élisabeth : tables de pique-nique, guirlandes et le panneau Plazey entre les arbres."
        widths={[800, 1200, 1600]}
        sizes="100vw"
        class="w-full"
      />
    </figure>
  </section>
```

- [ ] **Step 3: Replace the programme teaser section**

Replace the `<section aria-labelledby="programme-teaser" ...>` block:

```astro
  <section aria-labelledby="programme-teaser" class="py-12">
    <Container>
      {SITE_PHASE === 'live' ? (
        <>
          <h2 id="programme-teaser">Aujourd'hui à Plazey</h2>
          <ul role="list" class="program-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {todayItems.map(item => (
              <li>
                <ProgramCard
                  title={item.data.title}
                  startTime={item.data.startTime}
                  {...(item.data.endTime && { endTime: item.data.endTime })}
                  type={item.data.type}
                  stage={item.data.stage}
                  {...(item.data.description && { description: item.data.description })}
                  href={`/fr/programme/${item.id.replace('fr/', '')}`}
                  lang="fr"
                />
              </li>
            ))}
          </ul>
          <a href="/fr/programme" class="btn-text">Voir tout ce qui se passe aujourd'hui →</a>
        </>
      ) : SITE_PHASE === 'aftermovie' ? (
        <>
          <h2 id="programme-teaser">Retour sur Plazey 2026</h2>
          <p>Merci à toutes et tous celles et ceux qui étaient là.</p>
          <a href="/fr/programme" class="btn-text">Voir le programme complet 2026 →</a>
        </>
      ) : hasProgramme && SITE_PHASE !== 'save-the-date' ? (
        <>
          <h2 id="programme-teaser">Qu'est-ce qui est au programme ?</h2>
          <div role="tablist" aria-label="Sélectionner un jour" class="day-tabs flex gap-2 mt-4">
            <button role="tab" aria-selected="true" aria-controls="tab-samedi" id="tab-btn-samedi">
              Samedi 23 août
            </button>
          </div>
          <div id="tab-samedi" role="tabpanel" aria-labelledby="tab-btn-samedi">
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
        <>
          <h2 id="programme-teaser">Qu'est-ce qui est au programme ?</h2>
          <p>Le programme arrive bientôt. <a href={FACEBOOK_URL} rel="external noopener" target="_blank">Suis-nous sur Facebook pour l'annonce.</a></p>
        </>
      )}
    </Container>
  </section>
```

- [ ] **Step 4: Update the Participe section link**

In the Participe section near the bottom, update the `href` from `/fr/participez` to `/fr/benevole`:

```astro
<a href="/fr/benevole" class="btn-ghost">Venir aider</a>
```

- [ ] **Step 5: Run type check and build**

```bash
cd /Users/frederikvincx/Documents/plazey/site && npx astro check && npm run build
```

Expected: 0 errors, build succeeds.

- [ ] **Step 6: Commit**

```bash
git add src/pages/fr/index.astro
git commit -m "feat: phase-conditional hero and teaser on FR home"
```

---

## Task 9: Update /nl/programma/index.astro for phases

**Files:**
- Modify: `src/pages/nl/programma/index.astro`

- [ ] **Step 1: Add SITE_PHASE import to the frontmatter**

In `src/pages/nl/programma/index.astro`, add to the imports (after the existing imports):

```typescript
import { SITE_PHASE, FACEBOOK_URL } from '../../../config/site.ts';
```

- [ ] **Step 2: Replace the main content area**

Replace everything inside `<BaseLayout ...>` with:

```astro
<BaseLayout title="Programma" lang="nl" currentPath="/nl/programma">
  <section class="py-12">
    <Container>
      <h1>Programma</h1>

      {SITE_PHASE === 'save-the-date' ? (
        <>
          <p>Het programma 2026 volgt binnenkort.</p>
          <p><a href={FACEBOOK_URL} rel="external noopener" target="_blank">Volg ons op Facebook voor de aankondiging.</a></p>
        </>
      ) : (
        <>
          <p>22–24 augustus 2026. Alles is gratis.</p>

          {SITE_PHASE === 'aftermovie' && (
            <div role="note" class="season-banner my-4 p-4 bg-gray-100 rounded">
              <p>Dit was het programma van Plazey 2026.</p>
            </div>
          )}
```

Then keep the rest of the existing content (the filter form, the items list, the client-side filter JS) unchanged, and close the conditional:

```astro
        </>
      )}
    </Container>
  </section>
</BaseLayout>
```

Note: the complete `<BaseLayout>` closing tag and the `<script>` block at the bottom of the file stay as-is.

- [ ] **Step 3: Run type check and build**

```bash
cd /Users/frederikvincx/Documents/plazey/site && npx astro check && npm run build
```

Expected: 0 errors, build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/pages/nl/programma/index.astro
git commit -m "feat: save-the-date and aftermovie states on NL programma page"
```

---

## Task 10: Update /fr/programme/index.astro for phases

**Files:**
- Modify: `src/pages/fr/programme/index.astro`

- [ ] **Step 1: Add SITE_PHASE import**

In `src/pages/fr/programme/index.astro`, add to the imports:

```typescript
import { SITE_PHASE, FACEBOOK_URL } from '../../../config/site.ts';
```

- [ ] **Step 2: Replace main content area**

Replace everything inside `<BaseLayout ...>` with the same structure as Task 9 but in French:

```astro
<BaseLayout title="Programme" lang="fr" currentPath="/fr/programme">
  <section class="py-12">
    <Container>
      <h1>Programme</h1>

      {SITE_PHASE === 'save-the-date' ? (
        <>
          <p>Le programme 2026 arrive bientôt.</p>
          <p><a href={FACEBOOK_URL} rel="external noopener" target="_blank">Suis-nous sur Facebook pour l'annonce.</a></p>
        </>
      ) : (
        <>
          <p>22–24 août 2026. Tout est gratuit.</p>

          {SITE_PHASE === 'aftermovie' && (
            <div role="note" class="season-banner my-4 p-4 bg-gray-100 rounded">
              <p>C'était le programme de Plazey 2026.</p>
            </div>
          )}
```

Keep the rest of the existing content unchanged (filter form, items list, script), and close:

```astro
        </>
      )}
    </Container>
  </section>
</BaseLayout>
```

- [ ] **Step 3: Run type check and build**

```bash
cd /Users/frederikvincx/Documents/plazey/site && npx astro check && npm run build
```

Expected: 0 errors, build succeeds.

- [ ] **Step 4: Verify all four phases build correctly**

Switch `SITE_PHASE` in `src/config/site.ts` through each value and confirm builds pass:

```bash
# Test each phase
for phase in save-the-date reveal live aftermovie; do
  sed -i '' "s/SITE_PHASE.*=.*/SITE_PHASE: 'save-the-date' | 'reveal' | 'live' | 'aftermovie' = '$phase';/" src/config/site.ts
  echo "--- Testing phase: $phase ---"
  npm run build && echo "✓ $phase ok" || echo "✗ $phase FAILED"
done
# Restore to save-the-date
sed -i '' "s/SITE_PHASE.*=.*/SITE_PHASE: 'save-the-date' | 'reveal' | 'live' | 'aftermovie' = 'save-the-date';/" src/config/site.ts
```

Expected: all four phases build without errors.

- [ ] **Step 5: Commit**

```bash
git add src/pages/fr/programme/index.astro src/config/site.ts
git commit -m "feat: save-the-date and aftermovie states on FR programme page"
```
