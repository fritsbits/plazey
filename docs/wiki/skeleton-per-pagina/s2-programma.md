# S2 — Programma (/programma, /programme)



> **⚠️ Deels achterhaald.** Dit blijft het wireframe van de ontwerpfase; het gebouwde scherm wijkt op drie punten af:
> 1. **Geen detailpagina's** (2026-07-16). De kaart opent een `<dialog>`-lightbox. Zie de noot in [s3-programma-item.md](s3-programma-item.md).
> 2. **Geen dagfilter en geen lege staat** (2026-07-22). Eén filter-as: type. Zie Zone 2 en Zone 4 hieronder, die zijn bijgewerkt.
> 3. **Geen sticky dag-header.** Dag-koppen scrollen gewoon mee; de ankerlinks uit Zone 2 vervangen het snelnavigatie-doel.
>
> Ook de datums in dit document (22–24 augustus) zijn die van het oorspronkelijke ontwerp; het festival valt op **28–30 augustus 2026**.

> **URL:** `/nl/programma` (NL) · `/fr/programme` (FR)

> **Doel:** bezoekers laten scannen wat er speelt per dag en filteren op wat relevant is.

> **Primaire actie:** klik op een item → lightbox met de volledige act-info

> **Secundaire actie:** filteren op type

**Copy:** zie [2. Programma / Programme (NL + FR)](https://www.notion.so/33fd3ecc475c81be8266faf517c76a31)

---

## Wireframe — mobile first

### Zone 1: Page header

```javascript
[H1: Programma]
[Intro: 22–24 augustus 2026. Alles is gratis.]
```

**Padding:** 24px boven H1, 8px tussen H1 en intro.

---

### Zone 2: Dag-ankers + type-chips *(herzien 2026-08-06)*

Twee rijen die verschillende dingen doen: **navigeren** naar een dag, en **filteren** op type.

```javascript
[Vrijdag] [Zaterdag] [Zondag]          ← ankerlinks, geen state

[Muziek] [Kinderen en families] [Workshop] [Te zien]
```

**Dag-ankerlinks:** gewone `<a href="#day-sunday">` in een `<nav aria-label>`, die naar de dag-kop scrollen. Bewust als links gestyled, niet als chips, zodat ze niet als tweede filterrij lezen. Werken zonder JS. Verschijnen alleen als er meer dan één dag geprogrammeerd staat.

**Type-chips:**

- Toggles, **single-select**. Niets ingedrukt = alles tonen, dus er is géén "Alle types"-chip. Nog eens op de actieve chip drukken wist hem.

- Filteren is instant: geen "Toepassen"-knop, geen resetknop nodig.

- Actieve filter in de URL: `?type=music`. Deelbaar. Een onbekende waarde valt terug op de groep die dat type bevat, dus een link die vóór de groepering gedeeld is (`?type=expo`) komt nog altijd op de juiste chip terecht.

- Alleen chips voor groepen die echt items hebben, dus 0 resultaten is onbereikbaar.

- **Eén chip dekt meerdere types** *(2026-08-06)*. Negen types gaven negen chips, waarvan er zes het programma terugbrachten tot twee items of minder: dat is een inhoudstafel, geen filter. `typeGroups` in `src/config/programme-labels.ts` groepeert ze tot vier: **Muziek** (concert), **Kinderen en families** (kids, kermis), **Workshop**, **Te zien** (dans, film, theater, expo, off-stage). FR: Musique / Enfants et familles / Ateliers / À voir. De kaarten houden hun eigen precieze badge, dus een Fête Foraine-kaart leest nog steeds "Kermis" onder de chip Kinderen en families. De groep `kids` houdt bewust die naam, want de sectie Kinderen op Praktisch linkt naar `/nl/programma/?type=kids` (FR `/fr/programme/?type=kids`). Dat is de enige ingang naar de kinderfilter, dus die link moet blijven werken.

**Waarom geen dagfilter meer:** de dagen zijn al de structuur van de pagina (drie koppen, ~28 kaarten totaal). Een dagfilter neemt weg wat je toch al ziet, en dwong een facetten-mechaniek af (types verbergen die niet bij de gekozen dag horen, en omgekeerd) die veel complexer was dan het probleem. Wat mensen willen is springen, niet filteren.

**Waarom single-select bij type:** bij multi-select weet niemand of "dans + theater" AND of OR betekent, en met ~28 items levert de extra kracht niets op.

**Semantische HTML:**

```html
<nav class="day-jump" aria-label="Spring naar een dag">
  <a href="#day-friday" data-day="friday">Vrijdag</a>
  …
</nav>

<!-- hidden in de HTML; het script maakt de rij zichtbaar, want zonder JS
     doen de knoppen niets -->
<!-- data-type = groepssleutel, data-types = de types die de chip dekt;
     het script matcht op lidmaatschap, niet op gelijkheid -->
<div id="type-filter" role="group" aria-label="Filter op type" hidden>
  <button type="button" data-type="kids" data-types="kids kermis" aria-pressed="false">Kinderen</button>
  …
</div>
```

**Aria-live regio** (voor screenreaders) — blijft leeg bij eerste paint, zodat er geen telling wordt voorgelezen die niemand vroeg:

```html
<div role="status" aria-live="polite" aria-atomic="true">
  37 items gevonden.
</div>
```

---

### Zone 3: Dag-groepen + programma-items

```javascript
[STICKY DAG-HEADER: Vrijdag 22 augustus]

[CARD] [CARD] [CARD]…  (gestackt op mobile)

[STICKY DAG-HEADER: Zaterdag 23 augustus]

[CARD] [CARD]…

[STICKY DAG-HEADER: Zondag 24 augustus]

[CARD]…
```

**Sticky dag-header:**

- Plakt aan top van viewport terwijl je scrollt door de dag.

- Z-index hoger dan cards.

- Hoogte: 40px (past onder de sticky header van 56px).

---

### Programma-item card — anatomie

```javascript
+------------------------------------------+
| [TIJD: bold]         [TYPE-CHIP]          |
| [H3: Naam van het item]                  |
| [Locatie in park: klein]                 |
| [Een-regel beschrijving]                 |
+------------------------------------------+
```

**Eigenschappen:**

- Hele card is klikbaar (geen aparte link-knop). `<a>` wraps de hele card.

- Touch target: minimum 44px hoog inclusief padding.

- Hover/focus: visueel onderscheiden (kleurshift of border).

- Geen afbeelding op de overzichtskaart (alleen op detail-pagina optioneel).

**Semantische HTML:**

```html
<ul role="list">
  <li>
    <a href="/nl/programma/le-ministere-du-groove" class="program-card">
      <span class="time">15:00</span>
      <span class="type-chip">Concert</span>
      <h3>Le Ministère Du Groove</h3>
      <span class="location">Podium</span>
      <p>Jazzfusion uit Brussel.</p>
    </a>
  </li>
</ul>
```

---

### Zone 4: Lege staat — *bestaat niet meer (2026-07-22)*

Een chip wordt alleen gerenderd als zijn groep items heeft, en er is maar één filter-as. Eén chip aanklikken geeft dus altijd minstens één kaart: 0 resultaten is onbereikbaar. De lege staat en de "Alle filters wissen"-knop zijn verwijderd in plaats van dood gehouden. De groepering van 2026-08-06 verandert daar niets aan: groeperen kan een groep alleen groter maken, nooit leeg.

Wat wél gebeurt bij filteren: een dag-kop en zijn ankerlink verdwijnen als geen enkele kaart van die dag het filter overleeft.

---

## Componenten

*(tabel)*

---

## Edge cases — site-fases

Zie S0 voor het volledige fase-model en de `SITE_PHASE` variabele.

*(tabel)*

---

## Toegankelijkheid — checklist Programma

- [ ] Filter-chips als echte `<button aria-pressed>`, nooit pure divs

- [ ] Ingedrukte chip herkenbaar zonder kleur (vinkje), niet enkel via de oranje vulling — WCAG 1.4.1

- [ ] `aria-live="polite"` regio update bij filterwijziging, maar zwijgt bij eerste paint

- [ ] Dag-ankerlinks in een `<nav>` met `aria-label`; `scroll-margin-top` houdt de dag-kop onder de sticky site-header

- [ ] Elke card is één focussable element (`<a>`), geen geneste interactieve elementen

- [ ] Focus state zichtbaar op elke card

- [ ] Cards in een `<ul role="list">` voor goede semantiek

- [ ] Dag-groepen gemarkeerd als secties met een accessible heading (de sticky dag-header)