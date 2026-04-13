# S4 — Praktisch (/praktisch, /infos-pratiques)



> **URL:** `/nl/praktisch` (NL) · `/fr/infos-pratiques` (FR)

> **Doel:** elke praktische vraag beantwoorden in één pagina.

> **Primaire actie:** mail naar [info@plazey.be](mailto:info@plazey.be) als vraag onbeantwoord is.

> **Secundaire acties:** deep-links naar de vier anchor-secties.

**Copy:** zie [3. Praktisch / Infos pratiques (NL + FR)](https://www.notion.so/33fd3ecc475c81948ec5cf58e2fbbfde)

---

## Wireframe — mobile first

### Zone 1: Page header

```javascript
[H1: Praktisch]
[Intro: Alles wat je moet weten om langs te komen.]
```

---

### Zone 2: In-page nav

**Desktop:** horizontale rij van 4 links die naar ankers springen.

**Mobile:** sticky mini-tabs die onder de globale header plakken bij scrollen.

```javascript
[Bereikbaarheid] [Eten & drinken] [Toegankelijkheid] [Kinderen, regenplan & meer]
```

**Gedrag:**

- Actief anker is visueel gemarkeerd (underline of kleur).

- Bij klikken: smooth-scroll naar de sectie. URL update naar `#bereikbaarheid` etc. — deelbaar.

- `<nav aria-label="Op deze pagina">` om te onderscheiden van de globale nav.

**HTML:**

```html
<nav aria-label="Op deze pagina">
  <ul role="list">
    <li><a href="#bereikbaarheid">Bereikbaarheid</a></li>
    <li><a href="#eten-en-drinken">Eten & drinken</a></li>
    <li><a href="#toegankelijkheid">Toegankelijkheid</a></li>
    <li><a href="#meer">Kinderen, regenplan & meer</a></li>
  </ul>
</nav>
```

---

### Zone 3: Sectie #bereikbaarheid

**Vraag:** “Hoe kom ik er?”

```javascript
[H2: Bereikbaarheid]  id="bereikbaarheid"

  [H3: Metro]
  [2–3 regels tekst]

  [H3: Tram en bus]
  [2–3 regels tekst]

  [H3: Fiets]
  [1–2 regels tekst]

  [H3: Auto]
  [2–3 regels + externe link Indigoneo]

  [Contact-card: "Hulp nodig? Mail info@plazey.be"]
```

**Kaartje:** geschrapt (zie Skeleton-beslissingen). Tekstbeschrijving van routes volstaat.

---

### Zone 4: Sectie #eten-en-drinken

**Vraag:** “Wat kost een pint? Mag ik m’n eigen eten meebrengen?”

```javascript
[H2: Eten & drinken]  id="eten-en-drinken"

[Intro-alinea: eigen eten mag, kraantjeswater gratis]

[H3: Niet-alcoholische dranken]
[TABEL: 2 kolommen — Drank | Prijs]

[H3: Alcoholische dranken]
[TABEL: 2 kolommen — Drank | Prijs]

[Alinea: keuze voor buurtbewoners / lokale horeca / start-ups]

[Noot: Cash én tokens worden aanvaard.]

[Contact-card]
```

**Tabel:** compacte twee-koloms tabel. Geen zebra-striping nodig als contrast voldoende is via `<th>` styling.

```html
<table>
  <caption class="sr-only">Drankprijzen Plazey 2026</caption>
  <thead>
    <tr><th scope="col">Drank</th><th scope="col">Prijs</th></tr>
  </thead>
  <tbody>
    <tr><td>Kraantjeswater</td><td>Gratis</td></tr>
    …
  </tbody>
</table>
```

---

### Zone 5: Sectie #toegankelijkheid

**Vraag:** “Kan ik Plazey meemaken met m’n situatie?”

```javascript
[H2: Toegankelijkheid]  id="toegankelijkheid"

[Opening-alinea: eerlijk, concreet. Mail info@plazey.be voor hulp.]

[H3: Wat er is]
[<ul> met icoon per item]
  - CM1-toestel
  - VGT-tolk
  - Oordopjes
  - ADL-vrijwilligers
  - Braille-programma + dranklijst
  - Rustige ruimte
  - Aangepaste toiletten
  - Vlakke hoofdpaden
  - Lift metro Simonis

[H3: Wat we nog niet hebben]
[1–2 regels — eerlijk en concreet]

[H3: Dit doen we samen met]
[Partnerlijst als tekst of logo-chips]
Demos · AnySurfer · Zonnelied vzw · Viernulvier · Club 1030 · Scheldeoffensief

[Contact-card]
```

**Iconen in de lijst:** decoratief (`aria-hidden="true"`). De tekst draagt de betekenis.

```html
<ul role="list">
  <li>
    <span aria-hidden="true">✓</span>
    CM1-toestel — aan de infostand.
  </li>
  …
</ul>
```

**Partnerlijst:** `<ul>` met per item een `<a>` naar de partnerwebsite. Als logo: SVG met alt = partnernaam.

---

### Zone 6: Sectie #meer

**Vraag:** “Wat nog?” (samengevat blok: kinderen + regenplan + FAQ)

```javascript
[H2: Kinderen, regenplan & meer]  id="meer"

  [H3: Kinderen]
  [1 alinea]

  [H3: Regenplan]
  [1 alinea]

  [H3: Veelgestelde vragen]
  [ACCORDION: 5 vragen]
    [Q] Is Plazey echt gratis?
    [Q] Mag ik mijn eigen eten en drinken meebrengen?
    [Q] Is er een cloakroom of bagageruimte?
    [Q] Hoe laat begint en eindigt het festival?
    [Q] Kan ik er met een rolstoel of wandelwagen naartoe?

[Contact-card: "Vraag niet beantwoord? Mail info@plazey.be."]
```

**Accordion HTML-patroon:**

```html
<details>
  <summary>Is Plazey echt gratis?</summary>
  <p>Ja. Geen tickets, geen toegangsprijs…</p>
</details>
```

Alternatief met ARIA (als meer controle nodig):

```html
<button aria-expanded="false" aria-controls="faq-1" id="faq-btn-1">
  Is Plazey echt gratis?
</button>
<div id="faq-1" role="region" aria-labelledby="faq-btn-1" hidden>
  <p>Ja. Geen tickets…</p>
</div>
```

---

### Contact-card (herhaald onderaan elke sectie)

```html
<aside class="contact-card">
  <p>Vraag niet beantwoord? <a href="mailto:info@plazey.be">Mail info@plazey.be</a>.</p>
</aside>
```

---

## Componenten

*(tabel)*

---

## Edge cases — site-fases

Praktisch is grotendeels evergreen — bereikbaarheid en toegankelijkheid veranderen niet per fase.

*(tabel)*

---

## Toegankelijkheid — checklist Praktisch

- [ ] In-page nav heeft `aria-label="Op deze pagina"` (niet “Hoofdnavigatie”)

- [ ] Actief anker heeft `aria-current` op in-page nav-link

- [ ] Tabel heeft `<caption>` (mag screen-reader-only)

- [ ] Tabel heeft `<th scope="col">` voor kolomkoppen

- [ ] Iconen in toegankelijkheidslijst zijn `aria-hidden="true"`

- [ ] Accordions: `aria-expanded` en `aria-controls` correct

- [ ] Partnerlogo’s hebben alt text (= partnernaam)

- [ ] Alle anker-ID’s zijn uniek op de pagina

- [ ] Smooth-scroll respecteert `prefers-reduced-motion` (geen animatie als instelling uit staat)