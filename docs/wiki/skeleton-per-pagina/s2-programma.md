# S2 — Programma (/programma, /programme)



> **URL:** `/nl/programma` (NL) · `/fr/programme` (FR)

> **Doel:** bezoekers laten scannen wat er speelt per dag en filteren op wat relevant is.

> **Primaire actie:** klik op een item → detail-pagina

> **Secundaire actie:** filteren op dag of type

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

### Zone 2: Filterrij

**Mobile:** horizontale chip-row met zichtbare scroll-indicator (scrollbar of fade-out aan de rand).

**Desktop:** alle chips ge-expanded, geen scroll nodig.

```javascript
[Filter: Dag]
[Alle dagen] [Vrijdag 22 aug] [Zaterdag 23 aug] [Zondag 24 aug]

[Filter: Type]
[Concert] [Dans] [Film] [Workshop] [Kinderen] [Off-stage]
```

**Gedrag:**

- Chips zijn toggles: actief/inactief. Meerdere types tegelijk selecteerbaar.

- Filteren is instant: geen “Toepassen”-knop.

- Actieve filters in de URL (query string): bv. `?dag=zaterdag&type=concert`. URL deelbaar.

- Dag-filter is single-select (of “Alle dagen”). Type-filter is multi-select.

- Resetknop verschijnt als één of meer filters actief zijn: “Alle filters wissen”.

**Semantische HTML:**

```html
<!-- Dag — single-select → radio group -->
<fieldset>
  <legend>Dag</legend>
  <label><input type="radio" name="dag" value="alle"> Alle dagen</label>
  <label><input type="radio" name="dag" value="vrijdag"> Vrijdag 22 aug</label>
  …
</fieldset>

<!-- Type — multi-select → checkbox group -->
<fieldset>
  <legend>Type</legend>
  <label><input type="checkbox" name="type" value="concert"> Concert</label>
  …
</fieldset>
```

**Alternatief (button-gebaseerd):**

```html
<button type="button" aria-pressed="false">Concert</button>
```

**Aria-live regio** (voor screenreaders):

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

### Zone 4: Lege staat

**Conditie:** alle filters wissen = 0 resultaten.

```javascript
[Niks gevonden met deze filters.]
[KNOP: Alle filters wissen]
```

**Aria-live:** de regio uit Zone 2 meldt “0 items gevonden.”

---

## Componenten

*(tabel)*

---

## Edge cases — site-fases

Zie S0 voor het volledige fase-model en de `SITE_PHASE` variabele.

*(tabel)*

---

## Toegankelijkheid — checklist Programma

- [ ] Filter-chips als echte form controls (radio/checkbox of `aria-pressed` buttons), nooit pure divs

- [ ] `aria-live="polite"` regio update bij filterwijziging

- [ ] Dag-header sticky: niet verborgen voor screenreaders bij scrollen

- [ ] Elke card is één focussable element (`<a>`), geen geneste interactieve elementen

- [ ] Focus state zichtbaar op elke card

- [ ] Cards in een `<ul role="list">` voor goede semantiek

- [ ] Dag-groepen gemarkeerd als secties met een accessible heading (de sticky dag-header)