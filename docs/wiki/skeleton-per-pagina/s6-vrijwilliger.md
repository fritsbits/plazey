# S6 — Kom helpen (/vrijwilliger, /benevole)

> **URL:** `/nl/vrijwilliger` (NL) · `/fr/benevole` (FR)

> **Doel:** vrijwilligers werven en gericht opvolgen per rol, per dag.

> **Primaire CTA:** Netlify-formulier "Schrijf je in".

> **Warm openingsmotief actief op deze pagina.**

**Copy:** zie `website-copy/5-doe-mee.md` (vrijwilligers-deel) — de sectie *Stel een project voor* verhuisde naar S7.

**v2 (2026-04-18):** H1 is "Kom helpen" (niet langer "Doe mee"). Primaire CTA is een gestructureerd Netlify-formulier, geen mailto. Eigen FAQ blijft.

---

## Wireframe — mobile first

### Zone 1: Page header met portret

```
+-------------------------------+
| [H1: Kom helpen]              |
| [Openingsregel: Achter de bar |
|  aan de kassa, of bij het     |
|  opruimen.]                   |
|                               |
| [Portret vrijwilliger —       |
|  `vrijwilliger-portret.jpg`]  |
+-------------------------------+
```

Op desktop: titel + openingsregel links, portret rechts (flex-row).
Op mobile: stack verticaal, portret onder de openingsregel.

---

### Zone 2: Rol-grid

**Vraag:** "Wat zou ik kunnen doen?"

```
[ROL-GRID: 1 kolom mobile / 2 kolommen desktop]

+----------------+  +----------------+
| Bar            |  | Kassa          |
| [1-2 zinnen]   |  | [1-2 zinnen]   |
+----------------+  +----------------+
+----------------+  +----------------+
| Infostand      |  | Opbouw en      |
| [1-2 zinnen]   |  | opruim         |
|                |  | [1-2 zinnen]   |
+----------------+  +----------------+

[Afsluitregel: "Je hoeft geen ervaring te hebben. …"]
```

Geen foto per rol-kaart. Twee sfeerbeelden (vrijwilligers-bar + vrijwilligers-babyspot) staan als image-pair onder het grid.

---

### Zone 3: Inschrijfformulier

**Vraag:** "Hoe schrijf ik me in?"

```
[H2: Schrijf je in als vrijwilliger]

[Intro: 1 zin — "Stuur ons je gegevens. We nemen zo snel mogelijk contact op."]

[NETLIFY FORM — name="vrijwilliger"]
  • Naam (text, required)
  • E-mailadres (email, required)
  • Wanneer ben je beschikbaar? (checkboxes: vrijdag / zaterdag / zondag)
  • Waarvoor heb je interesse? (checkboxes: bar / kassa / infostand / opbouw-opruim)
  • Welke talen spreek je? (text, placeholder "bv. NL, FR, EN")
  • Nog iets anders? (textarea, optioneel)
  • [Submit: "Schrijf je in"]

[Succesbericht na submit:
 "Bedankt! We nemen zo snel mogelijk contact op."]

[Errorbericht bij fail:
 "Er ging iets mis. Probeer het opnieuw of stuur een mail naar info@plazey.be."]
```

**Implementatie:**

- `<form name="vrijwilliger" method="POST" data-netlify="true">` met hidden `form-name`-input.
- Client-side JS onderschept submit, POST naar `/` met URL-encoded body. Bij 200 wordt het formulier vervangen door het succesbericht. Bij fout wordt de knop terug actief + een `<p class="form-error">` ingevoegd.
- Fallback: als JS uit staat, gewone browser-submit werkt ook (Netlify vangt de POST op).

---

### Zone 4: FAQ accordion

**Vraag:** resterende vragen die submit kunnen blokkeren.

```
[H2: Vragen]

[▼] Moet ik me inschrijven om te helpen?
[▼] Krijg ik eten en drinken?
[▼] Kan ik maar één dagdeel komen?
[▼] Kan ik met vrienden komen helpen?
[▼] Ik spreek geen Nederlands en geen Frans. Kan ik toch helpen?
```

Zelfde `<Accordion items={…} />`-component als Praktisch (S4).

---

### Zone 5: Footer (global — zie S0)

---

## Edge cases

| Situatie | Gedrag |
|----------|--------|
| Off-season (sept–mrt) | Banner bovenaan: "Plazey [volgende editie] is nog niet in voorbereiding. Je kan je al aanmelden en we contacteren je in het voorjaar." Formulier blijft zichtbaar en functioneel. |
| Pre-festival (apr–juli) | Volledige pagina zichtbaar, formulier actief. |
| Tijdens festivalweekend | Formulier blijft zichtbaar ("laatste-minuut helpers welkom"). |
| Na festival | Pagina blijft online met banner "Plazey [jaar] is gedaan. Bedankt aan iedereen die hielp." Formulier optioneel verborgen. |

Conditie op basis van `new Date().getMonth()` gecombineerd met `SITE_PHASE`.

---

## Componenten

| Component | Type | Hergebruik |
|-----------|------|-----------|
| VrijwilligerForm | `<form>` met Netlify-hook | Alleen hier |
| RoleCard (met foto) | `<li>` in `<ul role="list">` | Alleen hier |
| FAQAccordion | `<details>` / ARIA | Gedeeld met S4 + S7 |
| SuccessMessage | `<p class="form-success">` | Gedeeld met S7 |
| ErrorMessage | `<p class="form-error">` | Gedeeld met S7 |

---

## Toegankelijkheid — checklist Kom helpen

- [ ] H1 aanwezig, openingsregel is `<p class="opening">`, niet nog een heading
- [ ] Portret heeft beschrijvende alt text (persoon + context)
- [ ] Rol-kaarten in `<ul role="list">`, elke rol heeft H3 en beschrijvende foto-alt
- [ ] Formulier: elk `<input>` heeft een zichtbaar `<label>` (geen placeholder als label)
- [ ] Checkboxes gegroepeerd in `<fieldset>` + `<legend>`
- [ ] Required-velden gemarkeerd met `required`-attribuut + visueel
- [ ] Submit-knop heeft duidelijke focus state
- [ ] Succes- en errorbericht wordt aangekondigd (aria-live of role="status")
- [ ] Client-side JS-fail gaat niet stuk zonder JS: native form submit werkt
- [ ] Accordion-items: `aria-expanded` + `aria-controls` correct
- [ ] Seizoensbanner: `role="status"` of duidelijk aanwezig bij paginalading
