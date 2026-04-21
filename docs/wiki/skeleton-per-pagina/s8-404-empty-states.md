# S7 — 404 + empty states + seizoensbanner



> Alle niet-succesvolle en randgevallen states die op eender welke pagina kunnen optreden.

**Copy:** zie [6. Global UI & 404 (NL + FR)](https://www.notion.so/33fd3ecc475c81bb8997cc6ca042065c)

---

## 404-pagina

**URL:** elke niet-bestaande URL op het domein.

**Doel:** bezoeker niet boos maken, en snel terugbrengen.

```javascript
[SHELL: header + footer]

<main>
  [H1: Deze pagina bestaat niet (meer).]
  [1 zin: Misschien zoek je het programma of praktische info?]

  [PRIMAIRE KNOP]   [GHOST KNOP]
  Naar het programma   Naar praktisch
</main>
```

**Regels:**

- Geen mascotte, geen grap, geen 404-illustratie.

- Geen zoekbalk (geen content om te doorzoeken).

- Twee knoppen naast elkaar op desktop, gestackt op mobile.

- Toon de 404 in de actieve taal van de bezoeker (detecteer op basis van `Accept-Language` header of fallback naar NL).

**HTML:**

```html
<main id="main-content">
  <h1>Deze pagina bestaat niet (meer).</h1>
  <p>Misschien zoek je het programma of praktische info?</p>
  <div class="cta-row">
    <a href="/nl/programma" class="btn-primary">Naar het programma</a>
    <a href="/nl/praktisch" class="btn-ghost">Naar praktisch</a>
  </div>
</main>
```

**HTTP-statuscode:** 404 (niet 200). Verificeren in Astro/server config.

---

## Empty state — programmafilters (0 resultaten)

**Conditie:** actieve filters leveren 0 programma-items op.

```javascript
[Aria-live regio update: "0 items gevonden."]

[Niks gevonden met deze filters.]
[KNOP: Alle filters wissen]
```

**Regels:**

- Toon de lege staat **in de lijst-container** op de plek waar anders cards staan.

- Nooit een visuele fout-indicator (rood, X). Toon alleen de tekst + resetknop.

- Resetknop verwijdert alle actieve filters uit URL en herstelt de volledige lijst.

**HTML:**

```html
<!-- Aria-live region (altijd aanwezig in DOM, ook als gevuld) -->
<div role="status" aria-live="polite" aria-atomic="true" class="sr-only">
  0 items gevonden.
</div>

<!-- Zichtbare lege staat -->
<div class="empty-state" aria-hidden="true">
  <p>Niks gevonden met deze filters.</p>
  <button type="button" class="btn-reset">Alle filters wissen</button>
</div>
```

---

## Empty state — programma-teaser op Home (nog geen items)

**Conditie:** programma 2026 nog niet ingevuld (voor de lock-datum ~4 weken voor festival).

```javascript
[Het programma volgt binnenkort.]
[Volg ons op Facebook voor de aankondiging.]
[TEKSTLINK: facebook.com/plazeyfestival]
```

**Geen** vervangende placeholder-cards of lorem ipsum.

---

## Seizoensbanner — op Doe mee

**Conditie:** buiten het vrijwilligersseizoen (november–maart).

**Positie:** bovenaan `<main>`, onder de globale header.

```javascript
+----------------------------------------------------------+
| Inschrijven voor editie 2026 start in april.             |
| Laat nu al van je horen via info@plazey.be.             |
+----------------------------------------------------------+
```

**Visueel:** neutrale achtergrond (geen rood/oranje = geen fouttint). Informatief.

**HTML:**

```html
<div role="note" class="season-banner">
  <p>
    Inschrijven voor editie 2026 start in april.
    Laat nu al van je horen via
    <a href="mailto:info@plazey.be">info@plazey.be</a>.
  </p>
</div>
```

---

## Geannuleerd-banner — op programma-item detail

**Conditie:** programma-item is geannuleerd.

**Positie:** bovenaan de detailpagina, vóór de H1.

```javascript
+----------------------------------------------------+
| ⚠ Dit programma is geannuleerd.                    |
| Bekijk het volledige programma voor alternatieven.  |
| [TEKSTLINK: Terug naar programma]                   |
+----------------------------------------------------+
```

**Kleur:** niet rood. Gebruik amber/geel-tint (aankondigend, niet alarmerend).

**HTML:**

```html
<div role="alert" class="cancelled-banner">
  <p>
    Dit programma is geannuleerd.
    <a href="/nl/programma">Bekijk het volledige programma</a> voor alternatieven.
  </p>
</div>
```

---

## Embed-fout-state — op programma-item detail

**Conditie:** Spotify/SoundCloud/YouTube embed laadt niet (JS geblokt, privacy-instelling, netwerk).

**Fallback is altijd zichtbaar als eerste element** (vóór de embed laadt):

```html
<div class="embed-wrapper" data-src="…">
  <!-- Altijd zichtbaar: -->
  <a href="https://open.spotify.com/…" class="embed-fallback">
    Beluister op Spotify →
  </a>
  <!-- Alleen na klik: -->
  <!-- <iframe>…</iframe> -->
</div>
```

De tekstlink verdwijnt **niet** als de embed laadt — hij blijft als backup.

---

## Site-fases — welke pagina's beschikbaar zijn

Zie S0 voor het volledige fase-model en de `SITE_PHASE` variabele.

*(tabel)*

---

## FR — equivalenten

*(tabel)*

---

## Toegankelijkheid — checklist edge cases

- [ ] 404 retourneert HTTP 404 (niet 200)

- [ ] Empty state: aria-live regio aanwezig en update correct bij filterwijziging

- [ ] Seizoensbanner: `role="note"` (niet `alert` — niet urgent)

- [ ] Geannuleerd-banner: `role="alert"` zodat screenreaders het meteen aankondigen

- [ ] Embed-fallback: altijd in DOM, nooit verborgen voor JS-laadt

- [ ] Alle banners: hoog genoeg contrast (ook in amber/geel kleurschema)