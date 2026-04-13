# S1 — Home (/nl, /fr)



> **URL:** `/nl` (NL) · `/fr` (FR)

> **Doel:** binnen 5 seconden duidelijk maken wat Plazey is, wanneer het is, waar het is, en dat je welkom bent.

> **Primaire CTA:** Bekijk het programma / Voir le programme

> **Secundaire CTA's:** Kom helpen / Venir aider (ghost knop) · Zo geraak je er / Comment s'y rendre (tekstlink)

**Copy:** zie [1. Home (NL + FR)](https://www.notion.so/33fd3ecc475c814d87f2db3ccdd11196)

---

## Wireframe — mobile first

### Zone 1: Hero

**Hoogte:** full-viewport op mobile / 60vh op desktop.

**Layout:** Z-patroon (oog gaat top-left → top-right → diagonaal → bottom-left).

```javascript
[LOGO]                    [NL|FR]


  [H1 — warme opening]
  [Datum + locatie-regel]
  [PRIMAIRE KNOP: vol]
  [GHOST KNOP: Kom helpen]
  [TEKSTLINK: Zo geraak je er]

                        [Editie 2026]

[EDITIE-BEELD: full-bleed, hoog contrast]
```

**Editie-beeld:**

- Illustratie op maat per editie (geen generieke stock foto).

- Full-width, hoog contrast met witte tekst erop.

- Alt text: beschrijvend, in ToV-stijl — bv. *"Een kleurrijke zomeravond in het Elisabethpark tijdens Plazey 2026."*

- Evergreen component: illustratie per editie wisselen zonder code aan te passen.

**Editie-indicator:**

- Klein, rustig letterteken, top rechts.

- Geen visueel gewicht naast H1.

**Desktop-aanpassing:**

- Hero 60vh. Tekst links, beeld rechts of beeld als achtergrond met overlay.

---

### Zone 2: Wat is Plazey?

**Doel:** "Is dit iets voor mij?"

**Layout:** 3 blokjes — gestackt op mobile, naast elkaar (3 kolommen) op desktop.

```javascript
[ICOON]
[Titel: bold, 1 regel]
[Beschrijving: 1 zin]
```

Blokje 1: Gratis sinds 1992

Blokje 2: Muziek, dans, workshops

Blokje 3: Voor de hele buurt

**Spacing:** 32px boven de sectie, 16px tussen blokjes op mobile.

---

### Zone 3: Programma-teaser

**Doel:** "Wat staat er op?"

**Layout:** tab-row voor dag-selectie + cards eronder.

```javascript
[Tab: Vrijdag] [Tab: Zaterdag] [Tab: Zondag]

[CARD]   [CARD]   [CARD]
 Tijd     Tijd     Tijd
 Naam     Naam     Naam
 Type     Type     Type

[Tekstlink: Zie het volledige programma →]
```

**Cards:** hergebruikt component uit Programma-pagina (zelfde markup, zelfde stijl).

**Aantal:** max 3 cards per dag (hoogtepunten, niet alles).

**Mobile:** cards gestackt; 1 dag zichtbaar per tab.

**Desktop:** 3 cards naast elkaar per dag.

**Editie-afhankelijk:** deze zone verdwijnt buiten het festivalseizoen of toont een fallback (*"Het programma volgt binnenkort."*).

---

### Zone 4: Hoe kom ik er?

**Doel:** "Kan ik het praktisch maken?"

**Layout:** 3 regels tekst + tekstlink. Geen visueel gewicht.

```javascript
[Korte bereikbaarheidssamenvatting: 3 regels]
[Tekstlink: Meer info over bereikbaarheid →]
```

**Link:** springt naar `/nl/praktisch#bereikbaarheid`.

---

### Zone 5: Doe mee

**Doel:** "Kan ik meer dan kijken?"

**Layout:** één zin + secundaire knop (ghost).

```javascript
[1 zin over vrijwilligers]
[GHOST KNOP: Kom helpen]
```

**Link:** naar `/nl/doe-mee`.

---

### Zone 6: Footer (global — zie S0)

---

## Componenten

*(tabel)*

---

## Semantische HTML-structuur

```html
<main id="main-content">
  <section aria-label="Hero">
    <h1>…</h1>
    <p>…datum + locatie…</p>
    <a href="/nl/programma" class="btn-primary">Bekijk het programma</a>
    <a href="/nl/doe-mee" class="btn-ghost">Kom helpen</a>
    <a href="/nl/praktisch#bereikbaarheid">Zo geraak je er</a>
  </section>

  <section aria-labelledby="wat-is-plazey">
    <h2 id="wat-is-plazey">Wat is Plazey?</h2>
    <ul role="list">
      <li>…</li>
      <li>…</li>
      <li>…</li>
    </ul>
  </section>

  <section aria-labelledby="programma-teaser">
    <h2 id="programma-teaser">Programma</h2>
    <div role="tablist">…</div>
    <ul role="list" class="program-cards">…</ul>
    <a href="/nl/programma">Zie het volledige programma →</a>
  </section>

  <section aria-labelledby="bereikbaarheid-home">
    <h2 id="bereikbaarheid-home">Hoe kom ik er?</h2>
    <p>…</p>
    <a href="/nl/praktisch#bereikbaarheid">Meer info →</a>
  </section>

  <section aria-labelledby="doe-mee-home">
    <h2 id="doe-mee-home">Doe mee</h2>
    <p>…</p>
    <a href="/nl/doe-mee" class="btn-ghost">Kom helpen</a>
  </section>
</main>
```

---

## Edge cases — site-fases

Zie S0 voor het volledige fase-model en het update-mechanisme (`SITE_PHASE` in `site.ts`).

*(tabel)*

---

## Toegankelijkheid — checklist Home

- [ ] Hero-afbeelding heeft beschrijvende alt text (geen lege string)

- [ ] H1 exact één keer aanwezig

- [ ] Tab-interface (programma-teaser) correct: `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`, `aria-controls`

- [ ] Primaire knop is een `<a>` (navigatie naar programma), geen `<button>`

- [ ] Ghost-knop heeft zichtbare focus state

- [ ] Alle sectie-koppen zijn H2 (nooit een sectie zonder heading)

- [ ] Contrast tekst op hero-beeld ≥ 4.5:1