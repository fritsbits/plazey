# S5 — Over Plazey (/over, /a-propos)



> **URL:** `/nl/over` (NL) · `/fr/a-propos` (FR)

> **Doel:** context en vertrouwen geven. Wie maakt dit, sinds wanneer, waarom gratis, wat staat erachter.

> **Primaire actie:** ghost knop “Kom helpen” → Doe mee

> **Secundaire actie:** externe links naar De Platoo en De Zeyp

> **Warm openingsmotief actief op deze pagina.**

**Copy:** zie [4. Over Plazey / À propos (NL + FR)](https://www.notion.so/33fd3ecc475c8143b256f0b680eb6e03)

---

## Wireframe — mobile first

### Zone 1: Page header

```javascript
[H1: Over Plazey]
[Openingsregel: Kom erbij, welke taal of welk tempo je ook hebt.]
```

**Openingsregel:** direct onder H1, iets groter dan body-tekst. Geen aparte H2. Visueel: warm, persoonlijk.

---

### Zone 2: Het verhaal

**Vraag:** “Waar komt dit vandaan?”

```javascript
[H2: Het verhaal]  (of: unstyled — sectie-label voor screenreaders)

[Alinea 1: 1992 — oorsprong]
[Alinea 2: 2013 — Bar Eliza]
[Alinea 3: 2023 — radicale toegankelijkheid (enige plek op de site!)]
```

**Layout:** volbreedte proza, geen twee kolommen. Leesbaar op mobile.

**Lengte:** max 3 alinea’s van elk max 3 zinnen.

---

### Zone 3: Wie maakt Plazey?

**Vraag:** “Wie zit erachter?”

**Mobile:** gestackt (De Platoo boven De Zeyp)

**Desktop:** twee gelijke kolommen naast elkaar

```javascript
[H2: Wie maakt Plazey?]

+---------------------+  +---------------------+
| Gemeenschapscentrum |  | Gemeenschapscentrum |
| De Platoo           |  | De Zeyp             |
|                     |  |                     |
| [1 zin]             |  | [1 zin]             |
| [→ deplatoo.be]     |  | [→ dezeyp.be]       |
+---------------------+  +---------------------+

[1 zin over de meer dan 100 vrijwilligers]
```

**HTML:**

```html
<section aria-labelledby="wie-maakt">
  <h2 id="wie-maakt">Wie maakt Plazey?</h2>
  <div class="org-grid">
    <div class="org-card">
      <h3>Gemeenschapscentrum De Platoo</h3>
      <p>…één zin…</p>
      <a href="https://deplatoo.be" rel="external">Meer over De Platoo →</a>
    </div>
    <div class="org-card">
      <h3>Gemeenschapscentrum De Zeyp</h3>
      <p>…één zin…</p>
      <a href="https://dezeyp.be" rel="external">Meer over De Zeyp →</a>
    </div>
  </div>
  <p>Meer dan honderd vrijwilligers…</p>
</section>
```

---

### Zone 4: Onze partners

**Vraag:** “Met wie nog?”

```javascript
[H2: Onze partners]

[LOGO-WALL: horizontale rij op desktop, 2×grid op mobile]
[Logo] [Logo] [Logo] [Logo] [Logo] [Logo]
```

**Logo-wall:**

- SVG waar mogelijk, PNG@2x als fallback.

- Grijstint (`filter: grayscale(100%)`) in rust.

- Kleur bij hover en focus.

- Elk logo is een `<a>` naar de partnerwebsite met `alt` = partnernaam.

- Geen aparte tekst-label onder elk logo nodig als alt correct is.

```html
<section aria-labelledby="partners">
  <h2 id="partners">Onze partners</h2>
  <ul role="list" class="logo-wall">
    <li>
      <a href="https://demos.be" rel="external">
        <img src="demos.svg" alt="Demos" width="120" height="40">
      </a>
    </li>
    <li>…</li>
  </ul>
</section>
```

> ⚠️ Partnerlijst valideren met De Platoo/De Zeyp vóór publicatie.

---

### Zone 5: Callout — Doe mee

```javascript
+--------------------------------------------------+
| Wil je mee bouwen?                               |
| Kom helpen of stel een project voor.             |
|                                                  |
| [GHOST KNOP: Naar Doe mee →]                    |
+--------------------------------------------------+
```

**Visueel:** gekleurde achtergrondpanel (accentkleur, lage saturatie). Geen full-black, geen wit.

**Link:** naar `/nl/doe-mee`.

```html
<aside class="callout" aria-label="Doe mee aan Plazey">
  <p>Wil je mee bouwen? Kom helpen of stel een project voor.</p>
  <a href="/nl/doe-mee" class="btn-ghost">Naar Doe mee →</a>
</aside>
```

---

## Componenten

*(tabel)*

---

## Edge cases — site-fases

De Over-pagina is volledig evergreen. Inhoud verandert niet per fase.

*(tabel)*

---

## Toegankelijkheid — checklist Over Plazey

- [ ] H1 aanwezig, openingsregel is geen heading (visueel groot, semantisch `<p>`)

- [ ] Org-kaarten: De Platoo en De Zeyp hebben elk een H3

- [ ] Externe links hebben `rel="external"` en visuele indicator (icoon of tekst)

- [ ] Logo’s hebben alt text = partnernaam (nooit leeg, nooit “logo”)

- [ ] Logo-wall: grijstint-naar-kleur-overgang respecteert `prefers-reduced-motion`

- [ ] Callout-panel is een `<aside>` met aria-label

- [ ] Ghost-knop heeft zichtbare focus state