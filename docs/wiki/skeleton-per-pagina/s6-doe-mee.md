# S6 — Doe mee (/doe-mee, /participe)

> **URL:** `/nl/doe-mee` (NL) · `/fr/participe` (FR)

> **Doel:** vrijwilligers werven + buurtartiesten/organisaties uitnodigen om programma voor te stellen.

> **Primaire CTA:** `mailto:` vrijwilligers inschrijven

> **Secundaire CTA:** `mailto:` project voorstellen

> **Warm openingsmotief actief op deze pagina.**

**Copy:** zie 5. Doe mee / Participe (NL + FR)

---

## Wireframe — mobile first

### Zone 1: Page header

```
[H1: Doe mee]
[Openingsregel: Kom helpen. Achter de bar, aan de kassa, of bij het opruimen.]
```

**Openingsregel:** direct onder H1, iets groter dan body-tekst. Geen H2. Zelfde behandeling als Over Plazey.

---

### Zone 2: Vrijwilliger worden

**Vraag:** "Wat zou ik kunnen doen?"

```
[H2: Vrijwilliger worden]

[Intro: 2 zinnen over wat vrijwilligerswerk inhoudt]

[ROL-GRID: 2×2 op mobile / 4 kolommen op desktop]

+----------+  +----------+  +----------+  +----------+
| Bar      |  | Kassa    |  | Infostand|  | Opruim   |
| [1 zin]  |  | [1 zin]  |  | [1 zin]  |  | [1 zin]  |
| [timing] |  | [timing] |  | [timing] |  | [timing] |
+----------+  +----------+  +----------+  +----------+

[Verwachtingen: 1 alinea (geen ervaring, meertalig welkom, maaltijd)]

[PRIMAIRE KNOP: full-width op mobile]
  Schrijf je in via info@plazey.be
  mailto:info@plazey.be?subject=Vrijwilliger%20Plazey%202026

[Instructieregel: vermeld wanneer je beschikbaar bent]
```

**Rol-blokjes:**

```html
<ul role="list" class="roles-grid">
  <li class="role-card">
    <h3>Bar</h3>
    <p>Je schenkt drankjes…</p>
  </li>
  <li class="role-card">
    <h3>Kassa</h3>
    <p>Bezoekers kopen…</p>
  </li>
  <li class="role-card">
    <h3>Infostand</h3>
    <p>Je beantwoordt vragen…</p>
  </li>
  <li class="role-card">
    <h3>Opruim en opbouw</h3>
    <p>Vóór of na…</p>
  </li>
</ul>
```

**Primaire knop (mailto):**

```html
<a href="mailto:info@plazey.be?subject=Vrijwilliger%20Plazey%202026"
   class="btn-primary">
  Schrijf je in via info@plazey.be
</a>
```

---

### Zone 3: Stel een project voor

**Vraag:** "Kan ik mijn eigen ding op Plazey doen?"

```
[H2: Stel een project voor]

[Uitleg: 2–3 zinnen over bottom-up programmatie]

[Wat in een voorstel: 1 alinea]

[GHOST KNOP]
  Stel je project voor via info@plazey.be
  mailto:info@plazey.be?subject=Project%20voorstel%20Plazey%202026
```

```html
<a href="mailto:info@plazey.be?subject=Project%20voorstel%20Plazey%202026"
   class="btn-ghost">
  Stel je project voor via info@plazey.be
</a>
```

---

### Zone 4: FAQ accordion

**Vraag:** resterende vragen die de primaire CTA kunnen blokkeren.

```
[H2: Vragen]

[▼] Moet ik me inschrijven om te helpen?
[▼] Krijg ik eten en drinken?
[▼] Kan ik maar één dagdeel komen?
[▼] Kan ik met vrienden komen helpen?
[▼] Ik spreek geen NL en geen FR. Kan ik toch helpen?
```

**Accordion HTML:** zie S4 (zelfde patroon met `<details>` of ARIA-buttons).

---

### Zone 5: Footer (global — zie S0)

---

## Edge cases

| Situatie | Gedrag |
|----------|--------|
| Off-season (sept–mrt) | Banner: "Plazey 2026 is nog niet in voorbereiding. Stuur al een mailtje naar info@plazey.be." Formulier verborgen. |
| Pre-festival (apr–mei) | Volledige pagina zichtbaar. |

**Off-season conditie:** bepaald door kalendermaand, niet door `SITE_PHASE`.

**Implementatie:** off-season conditie op basis van `new Date().getMonth()` (sept = 8, mrt = 2). Combineer met `SITE_PHASE` voor de volledige logica.

---

## Componenten

| Component | Type | Hergebruik |
|-----------|------|-----------|
| RoleCard | `<li>` in `<ul role="list">` | Alleen Doe mee |
| MailtoButton | `<a class="btn-primary">` | Gedeeld |
| FAQAccordion | `<details>` of ARIA | Gedeeld met S4 |
| SeizoensBanner | `<div role="alert">` | Gedeeld |

---

## Toegankelijkheid — checklist Doe mee

- [ ] H1 aanwezig, openingsregel is `<p>` (niet nog een heading)
- [ ] Rol-kaarten in `<ul role="list">`, elke rol heeft H3
- [ ] Mailto-links zijn `<a>` met duidelijk zichtbaar label (niet alleen een icoon)
- [ ] Mailto-knoppen hebben volledig leesbaar label inclusief het e-mailadres
- [ ] Accordion-items: `aria-expanded` + `aria-controls` correct
- [ ] Seizoensbanner: `role="alert"` of duidelijk aanwezig bij paginalading
- [ ] Ghost-knop heeft zichtbare focus state
