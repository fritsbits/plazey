# S0 — Globale shell (header + footer + skip link)



> Elke pagina op [plazey.be](http://plazey.be/) erft deze shell. Wijzigingen hier raken automatisch alle pagina's.

**Copy:** zie [6. Global UI & 404](https://www.notion.so/33fd3ecc475c81bb8997cc6ca042065c)

---

## Site-fase beheer

De site heeft **4 fases per editie**. Eén variabele in de site-config (`SITE_PHASE`) stuurt alle conditionele content op elke pagina. Om de site van fase te wisselen hoeft Frederik enkel die variabele aan te passen — één commit, Netlify deployt automatisch.

*(tabel)*

**Update-stappenplan (< 5 min):**

1. Open `src/config/site.ts`

1. Wijzig `SITE_PHASE` naar de gewenste waarde

1. Commit + push → Netlify deployt automatisch

```typescript
// src/config/site.ts
export const SITE_PHASE: 'save-the-date' | 'reveal' | 'live' | 'aftermovie' = 'reveal'
export const FESTIVAL_YEAR = 2026
export const FESTIVAL_DATES = 'vrijdag 14 t/m zondag 16 augustus 2026'
export const FESTIVAL_DATES_FR = 'vendredi 14 au dimanche 16 août 2026'
```

**Off-season Doe mee (aparte conditie):** de seizoensbanner op Doe mee (sept–mrt) is gebaseerd op kalendermaand, niet op `SITE_PHASE`. Zie S6.

---

## Header

**Gedrag:** sticky — blijft zichtbaar bij scrollen.

**Hoogte:** 56px mobile / 72px desktop.

**Achtergrond:** vol, hoog contrast met paginainhoud eronder (niet transparant).

### Elementen (links → rechts)

*(tabel)*

### Skip link

```html
<a class="skip-link" href="#main-content">Ga naar inhoud</a>
<!-- FR: Aller au contenu -->
```

- Eerste element in de DOM, vóór de header.

- Alleen zichtbaar bij toetsenbordfocus (clip-path of transform, niet `display:none`).

- Springt naar `<main id="main-content">`.

### Semantische HTML

```html
<a class="skip-link" href="#main-content">…</a>
<header>
  <nav aria-label="Hoofdnavigatie">
    <a href="/nl" aria-label="Plazey — startpagina"><!-- logo --></a>
    <ul role="list">
      <li><a href="/nl/programma" aria-current="page">Programma</a></li>
      <li><a href="/nl/praktisch">Praktisch</a></li>
      <li><a href="/nl/over">Over</a></li>
      <li><a href="/nl/doe-mee">Doe mee</a></li>
    </ul>
    <div role="group" aria-label="Taal kiezen">
      <a href="/nl/…" aria-current="true" lang="nl">NL</a>
      <a href="/fr/…" lang="fr">FR</a>
    </div>
  </nav>
</header>
```

### Mobile nav-overlay

- Fullscreen of slide-in vanaf rechts.

- Links gestackt verticaal, groot touch target.

- NL/FR toggle ook aanwezig in overlay.

- Sluitknop (X) bovenaan rechts. Aria-label: “Menu sluiten”.

- Focus-trap: Tab-toets blijft binnen overlay. Escape sluit overlay.

---

## Footer

**Layout:** 4 blokken verticaal op mobile → 4 kolommen op desktop.

**Achtergrond:** donker of neutraal, hoog contrast.

### Blokken

*(tabel)*

**Onderaan footer (elke breedte):** NL / FR backup-toggle.

### Semantische HTML

```html
<footer>
  <div class="footer-contact">…</div>
  <div class="footer-social">…</div>
  <div class="footer-org">…</div>
  <div class="footer-legal">…</div>
  <div class="footer-lang">…</div>
</footer>
```

---

## Landmark regions (elke pagina)

```html
<a class="skip-link" href="#main-content">…</a>
<header>…</header>
<main id="main-content">
  <h1>…</h1>
  …paginainhoud…
</main>
<footer>…</footer>
```

- H1 staat **exact één keer** per pagina.

- `<nav>` met `aria-label` om hoofd-nav te onderscheiden van in-page nav (Praktisch).

- `<main>` ontvangt de skip-link-focus.

---

## Toegankelijkheid — checklist shell

- [ ] Skip link zichtbaar bij focus, verborgen bij muis

- [ ] Logo-link heeft beschrijvende aria-label

- [ ] Actieve pagina heeft `aria-current="page"` op nav-link

- [ ] NL/FR toggle: actieve taal heeft `aria-current="true"`

- [ ] Mobile overlay heeft focus-trap + Escape-to-close

- [ ] Hamburger-knop heeft aria-expanded (true/false)

- [ ] Alle footer-links hebben zichtbare focus state

- [ ] Contrast header-tekst op achtergrond ≥ 4.5:1 (WCAG AA)