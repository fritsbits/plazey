# S7 — Stel een project voor (/stel-een-project-voor, /propose-ton-projet)

> **URL:** `/nl/stel-een-project-voor` (NL) · `/fr/propose-ton-projet` (FR)

> **Doel:** buurtbewoners, lokale artiesten en kleine organisaties overtuigen dat ze zelf programma mogen voorstellen — en ze door een laagdrempelig formulier loodsen voor de programmatie-lock.

> **Primaire CTA:** Netlify-formulier "Stel je project voor".

> **Warm openingsmotief actief op deze pagina.** ("Heb je een idee? Laat het weten.")

> **Fase-zichtbaarheid:** in hoofdnav tijdens `save-the-date`. Verdwijnt uit nav bij `reveal`/`live`/`aftermovie` (programmatie is dan gelocked). Pagina blijft bereikbaar via directe URL en via footer-link.

**Status:** nieuw · **Datum:** 2026-04-18 · **Owner:** Frederik

---

## Waarom deze pagina?

Dit is nieuw t.o.v. v1. In de oude skeleton zat "Stel een project voor" als zone 3 van Doe mee — een ghost-knop met mailto. Dat werkte niet:

- **Twee doelgroepen in één pagina** verwart. Iemand die wil helpen met de bar leest niet door tot de projectvoorstel-sectie. Iemand met een muziekproject scrollt door de vrijwilligers-rollen heen.
- **Verschillende tijdsvensters.** Vrijwilligers werven = april–augustus. Programmatie-voorstellen = oktober–februari. Eén pagina kan niet allebei tegelijk "open" en "gesloten" zijn.
- **Een mailto vraagt te veel drempel.** Een lege `mailto:` met subject-prefix is net genoeg om de meerderheid die op het punt staat een voorstel in te dienen, te laten afhaken. Ze denken: "Wat moet ik allemaal in die mail zetten?" en klappen hun laptop dicht.
- **Bewijs ontbrak.** De oude sectie zei *"bottom-up"* en *"lokale artiesten"* zonder te tonen wat dat in de praktijk betekent. Zonder voorbeelden voelt het abstract en elitair.

De nieuwe pagina lost elk van die vier op: eigen route, fase-specifieke nav-aanwezigheid, gestructureerd formulier met invulvelden die het werk doen, en een sectie met concrete voorbeelden uit vorige edities.

---

## Wireframe — mobile first

### Zone 1: Page header

```
+--------------------------------------+
| [H1: Stel een project voor]          |
| [Opening: "Heb je een idee? Laat     |
|  het weten."]                        |
|                                      |
| [Intro-paragraaf: 2-3 zinnen —       |
|  waarom deze pagina bestaat, wie     |
|  welkom is.]                         |
+--------------------------------------+
```

**H1 en openingsregel:** warm motief actief. Openingsregel krijgt de `opening`-class (zelfde als Kom helpen, Over Plazey, Home).

**Geen hero-beeld.** De intro moet eerst in woorden duidelijk maken dat de lezer *zelf* iets kan voorstellen. Een beeld komt pas in Zone 2 (voorbeelden), waar het iets toevoegt.

---

### Zone 2: Wat voor projecten zijn dit? (voorbeelden uit vorige edities)

**Vraag:** *"Hoort mijn idee hier? Wat bedoel je met 'buurtproject'?"*

```
[H2: Wat hebben buurtbewoners al gedaan?]

[Intro: 1 zin — "Dit zijn projecten die buurtbewoners, collectieven en
 kleine organisaties de voorbije jaren op Plazey brachten."]

[VOORBEELDEN-GRID: 1 kolom mobile / 2 kolommen desktop]

+--------------------------+  +--------------------------+
| [Foto 1]                 |  | [Foto 2]                 |
| Jonge muzikanten op      |  | Dans voor iedereen       |
| hun eerste groot podium  |  |                          |
| Club 1030 programmeerde  |  | Etage Tropical gaf G-    |
| vier bands uit de buurt. |  | dance-workshops, open    |
|                          |  | voor mensen met en       |
|                          |  | zonder beperking.        |
+--------------------------+  +--------------------------+
+--------------------------+  +--------------------------+
| [Foto 3]                 |  | [Foto 4]                 |
| Rondleiding én           |  | Leesclub in het park     |
| kunstinstallatie in één  |  |                          |
| Brukselbinnenstebuiten   |  | Koekelboekske bracht     |
| en Dear Pigs liepen door |  | kinderen samen rond een  |
| de buurt en hingen hun   |  | boek, onder de bomen.    |
| werk aan de bomen.       |  |                          |
+--------------------------+  +--------------------------+

[Meer voorbeelden tekstblok:
 "Ook gedaan: Fanfakids (percussie), Arborescences (elke boom één
 kunstenaar), Systeem D-films door Brusselse makers, Scheldeoffensief
 (inclusief theaterlab), Café Latte (koor), Apéro Literair."]

[Afsluiter: 1 zin — "Je ziet het: muziek, dans, theater, film, sport,
 eten, lezen. Klein of groot. Voor één middag of voor drie dagen."]
```

**Belangrijk:** deze sectie komt **vóór** het formulier. Reden: de psychologische drempel wegnemen ("Is mijn idee goed genoeg?") moet gebeuren vóór we om gegevens vragen. Concrete voorbeelden uit eigen geschiedenis zijn daar het beste middel voor.

**Niet-doen:** elk voorbeeld voorzien van een jaartal of editie. Dat maakt het museaal. Formuleer in de verleden tijd zonder datum, zodat het evergreen blijft.

---

### Zone 3: Wat zet je in je voorstel?

**Vraag:** *"Wat moet ik klaarhebben voor ik op 'verzend' klik?"*

```
[H2: Wat we willen weten]

[Intro: 1 zin — "Hou het kort. Een paar zinnen per vraag volstaat."]

[GESTRUCTUREERDE LIJST — zelfde volgorde als formulier, zodat lezers
 mentaal kunnen voorbereiden]

• Wie ben je? (naam, contactgegevens)
• Wat is je idee? (in 3-5 zinnen)
• Wat heb je nodig? (ruimte, materiaal, tijd, geluid, budget)
• Voor welke dag denk je?

[Afsluiter: 1 zin — "Nog niet alles rond? Dat geeft niet. Stuur wat je
 hebt, we denken mee."]
```

Deze zone bestaat om de lezer voor te bereiden op het formulier. Het verlaagt de drempel ("aha, ik moet niet een volledig uitgewerkt voorstel hebben").

---

### Zone 4: Formulier

**Vraag:** *"Hoe dien ik in?"*

```
[H2: Stuur je voorstel]

[NETLIFY FORM — name="project-voorstel"]
  • Naam (text, required)
  • E-mailadres (email, required)
  • Wat is je idee? (textarea, 4 regels, required)
  • Wat heb je nodig? (textarea, 3 regels, optioneel, hint "ruimte,
    materiaal, tijd")
  • Voor welke dag denk je? (radio: vrijdag / zaterdag / zondag /
    weet nog niet)
  • [Submit: "Stel je project voor"]

[Succesbericht na submit:
 "Bedankt voor je voorstel! We nemen zo snel mogelijk contact op."]

[Errorbericht bij fail:
 "Er ging iets mis. Probeer het opnieuw of stuur een mail naar info@plazey.be."]
```

**Implementatie:** zelfde patroon als vrijwilligersformulier (S6). `data-netlify="true"`, hidden `form-name`-input, JS-interceptor met URL-encoded POST naar `/`, succes/error handling.

**Verschillen met vrijwilligersformulier:**

- Geen checkboxes voor rollen — hier staat één grote open tekstvraag ("Wat is je idee?") centraal.
- Eén radio-groep voor dag (max één antwoord), niet meerdere checkboxes voor beschikbaarheid. *Weet nog niet* is een legitiem antwoord — dat mag geen drempel zijn.
- Geen talen-veld. Taal blijkt uit de ingevulde tekst.

---

### Zone 5: FAQ accordion

**Vraag:** *"Maar wat als…?"*

```
[H2: Vragen]

[▼] Ik heb geen organisatie, mag ik toch voorstellen?
    → Ja. Individuen zijn welkom.

[▼] Moet ik Nederlands of Frans spreken?
    → Nee. Plazey is meertalig. Dien in in de taal die voor jou werkt.

[▼] Krijg ik betaald?
    → We hebben een beperkt budget. In je voorstel mag je vermelden
      wat je nodig hebt. We antwoorden eerlijk wat we wel en niet
      kunnen dekken.

[▼] Tot wanneer kan ik voorstellen?
    → We plannen het programma in de winter. Hoe vroeger je dit
      voorjaar indient, hoe groter de kans.

[▼] Is er een limiet op wat er kan?
    → Bijna niet. Muziek, dans, theater, film, workshop, eten,
      kinderen, sport, kunst in het park. Stuur het en we praten erover.

[▼] Wat gebeurt er met mijn voorstel?
    → We lezen elk voorstel en nemen contact op. Soms vragen we een
      gesprek. Soms passen we je idee samen aan.
```

Zelfde `<Accordion>`-component als S4 en S6.

---

### Zone 6: Footer (global — zie S0)

---

## Edge cases

| Situatie | Gedrag |
|----------|--------|
| `save-the-date` fase | Pagina volledig zichtbaar, formulier actief, pagina in hoofdnav. |
| `reveal` / `live` / `aftermovie` fase | Pagina blijft online, formulier blijft werken (inzendingen voor volgende editie). Banner bovenaan: "Het programma voor [jaar] is klaar. Voorstellen die nu binnenkomen, nemen we mee naar volgende editie." Pagina **niet** in hoofdnav, wel bereikbaar via footer en directe URL. |
| Geen JS | Native form submit werkt, Netlify redirect naar bedank-pagina (standaard Netlify-gedrag). |
| Form error | Knop wordt terug actief, `<p class="form-error">` verschijnt net boven de knop. |
| Succesvolle submit | Hele form wordt vervangen door succesbericht met warme toon. |

---

## Componenten

| Component | Type | Hergebruik |
|-----------|------|-----------|
| ProjectForm | `<form>` met Netlify-hook | Alleen hier |
| ExampleCard | `<li>` in `<ul role="list">` met `<Image>` + H3 + `<p>` | Alleen hier |
| FAQAccordion | `<details>` / ARIA | Gedeeld met S4 + S6 |
| FaseBanner | `<div role="status">` | Gedeeld met S6 |
| SuccessMessage / ErrorMessage | `<p>` | Gedeeld met S6 |

---

## Toegankelijkheid — checklist Stel een project voor

- [ ] H1 aanwezig, openingsregel is `<p class="opening">`, niet een heading
- [ ] Voorbeelden in `<ul role="list">`, elke kaart met H3 + beschrijvende foto-alt
- [ ] Foto's hebben specifieke alt text die het project beschrijft, niet generiek "foto van vorige editie"
- [ ] Formulier: elk veld heeft een zichtbaar `<label>`
- [ ] Radio-groep in `<fieldset>` + `<legend>`
- [ ] Required-velden gemarkeerd
- [ ] Submit-knop heeft duidelijke focus state
- [ ] Succes- en errorbericht wordt aangekondigd (aria-live of role="status")
- [ ] Client-side JS-fail mag niet stuk gaan: native form submit werkt ook
- [ ] Accordion-items: `aria-expanded` + `aria-controls` correct
- [ ] FaseBanner heeft `role="status"` en staat bovenaan de DOM
