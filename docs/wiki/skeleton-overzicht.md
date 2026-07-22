# Skeleton — Plazey website v1



> Plane 4 van de Garrett UX planning playbook voor [plazey.be](http://plazey.be/). Bouwt verder op [Strategie · Scope · Structuur — Plazey website v4](https://www.notion.so/33ed3ecc475c81098e26c21780562018) en volgt de [Tone of voice guide — Plazey](https://www.notion.so/33fd3ecc475c81caa19dc265e61ebf70).

**Status:** draft v2 · **Datum:** 2026-04-18 · **Owner:** Frederik

**v2-wijziging (2026-04-18):** Doe mee is gesplitst in twee routes: `/vrijwilliger` + `/stel-een-project-voor` (NL) en `/benevole` + `/propose-ton-projet` (FR). Beide werken met Netlify-formulieren, niet mailto. Zie `s6-vrijwilliger.md` en nieuwe `s7-stel-een-project-voor.md`.

---

## Actieve principes (uit de playbook)

- **Mobile-first altijd.** Alle wireframes hieronder beschrijven eerst de mobiele layout (4 kolommen, stacking verticaal). Desktop (12 kolommen) is een aanpassing, geen uitgangspunt.

- **Eén primaire CTA per pagina + 1–2 secundaire.** Primair is visueel dominant. Secundair is ghost/link.

- **Layer-cake voor content-pagina's.** Korte koppen, stukjes content, lucht boven elke kop. F-patroon vermijden.

- **Secties beantwoorden vragen, geen content-types.** Label-test: wat is de vraag van de bezoeker?

- **Nooit een sectie voor één element.** Als een blok uit één zin bestaat, hoort het bij het aangrenzende blok.

- **Consolidatie-pass voor publicatie.** Na elke pagina één ronde om secties samen te voegen.

- **Elke navigatie-label slaagt voor de information-scent test.**

- **8px-grid.** Alle spacing in veelvouden van 8. Touch targets minimum 44×44px.

- **Toegankelijkheid is default, niet optie.** WCAG 2.2 AA als vloer. Skip links, landmark regions, alt text, zichtbare focus state, toetsenbord-navigatie doorheen.

- **Evergreen shell.** Elke pagina is zo gebouwd dat editie-specifieke content (hero-beeld, data, programma) inwisselbaar is zonder layout te raken.

---

## Kern (vijf beslissingen)

1. **Zeven globale routes** per taal (Home, Programma, Programma-detail, Praktisch, Over Plazey, Kom helpen, Stel een project voor), één globale shell (header + footer + taaltoggle). *Stel een project voor* is alleen in de hoofdnav tijdens `save-the-date`; daarna blijft de pagina bereikbaar maar onopvallend.

1. **Layer-cake** op alle content-pagina's; Z-patroon alleen in de home hero.

1. **Programma is één filterbare lijst**, geen sub-pagina's per dag. Item-detail opent in een lightbox op diezelfde lijst, niet op een eigen pagina. *(Het "apart, minimaal pagina-sjabloon" uit het oorspronkelijke ontwerp is geschrapt op 2026-07-16.)*

1. **Praktisch is één pagina met vier anchor-secties**, niet vier sub-pagina's. Elke anker heeft een deelbare URL.

1. **Home, Kom helpen en Stel een project voor dragen de primaire CTA's.** Kom helpen en Stel een project voor zijn beide formulier-gedreven pagina's met een duidelijke submit als primaire actie. Programma, Praktisch en Over hebben functionele secundaire acties (filteren, contact, meer lezen), geen marketing-CTA.

---

## Globale shell

### Header (sticky, 56px hoog op mobile, 72px op desktop)

- **Links:** Plazey-logo (linkt naar `/nl` of `/fr` op basis van taal). Touch target 44×44px.

- **Midden (desktop) / hamburger (mobile):** nav-items in volgorde: **Programma · Praktisch · Over · Doe mee**. Belangrijkste items eerst en laatst (serial position).

- **Rechts:** **NL / FR**-toggle. Permanente zichtbaarheid, ook op mobile. Drukken op de toggle blijft op dezelfde logische pagina in de andere taal (`/praktisch` ↔ `/infos-pratiques`).

- **Skip link** bovenaan (alleen zichtbaar op focus): "Ga naar inhoud" / "Aller au contenu".

### Footer

- **Blok 1:** Contact — e-mailadres [info@plazey.be](mailto:info@plazey.be), telefoon indien er een is, postadres van gemeenschapscentrum De Platoo.

- **Blok 2:** Social — Facebook-link ([facebook.com/plazeyfestival](http://facebook.com/plazeyfestival)). Geen Instagram zolang er geen echt account is.

- **Blok 3:** Organisatie — gemeenschapscentrum De Platoo + gemeenschapscentrum De Zeyp, beide met link naar hun eigen site.

- **Blok 4:** Juridisch — © Plazey [jaartal], privacyverklaring, toegankelijkheidsverklaring.

- **Stacking:** 4 blokken vertikaal op mobile, 4 kolommen op desktop. Onderaan op elke breedte: NL/FR switch als backup.

### Landmark regions

Elke pagina bevat: `<header>`, `<nav>`, `<main>`, `<footer>`. H1 exact één keer per pagina, direct onder de header.

---

## Home (`/nl`, `/fr`)

**Doel:** binnen 5 seconden duidelijk maken wat Plazey is, wanneer het is, waar het is, en dat je welkom bent.

**Primaire CTA:** "Bekijk het programma" (knop, vol). 

**Secundaire CTA's:** "Kom helpen" (ghost), "Zo geraak je er" (tekstlink).

### Wireframe-brief (mobile first)

1. **Hero** (full-viewport hoogte op mobile, 60vh op desktop) — Z-patroon.

1. **Sectie: Wat is Plazey?** (beantwoordt de vraag *"Is dit iets voor mij?"*)

1. **Sectie: Programma-teaser** (beantwoordt *"Wat staat er op?"*)

1. **Sectie: Hoe kom ik er?** (beantwoordt *"Kan ik het praktisch maken?"*)

1. **Sectie: Doe mee** (beantwoordt *"Kan ik meer dan kijken?"*)

1. **Footer** (zie globale shell).

### Componenten hergebruikt

- Nav (global)

- Editie-beeld-component (1× per editie inwisselbaar)

- Card programma-highlight (3 instanties, hergebruikt uit Programma-pagina)

- Footer (global)

### Edge cases

- **Vooraf het festival:** hero toont "over X dagen" tegenteller en de programma-teaser.

- **Tijdens het festival:** "Vandaag op Plazey"-vervanging van de teaser-sectie, met *nu aan de gang* + *volgende twee items*.

- **Na het festival:** hero vervangt CTA door *"Bedankt. Tot volgend jaar."* + link naar fotoarchief als dat bestaat. Programma-teaser valt weg of wordt *"Terugblik"*.

---

## Programma (`/programma`, `/programme`)

**Doel:** een bezoeker laat scannen wat er speelt, per dag, en helpt filteren op wat écht relevant is voor diens avond of namiddag.

**Primaire actie:** klik op een item → lightbox met de volledige act-info (er zijn geen detail-pagina's, zie S3).

**Secundair:** filteren op type.

### Wireframe-brief (mobile first)

1. **Page header** — H1: *"Programma"*. Eén zin eronder: *"28–30 augustus 2026. Alles is gratis."*

1. **Dag-ankerlinks** — *Vrijdag · Zaterdag · Zondag* als gewone anchors naar de dag-koppen. Navigatie, geen filter-state; werkt zonder JS.

1. **Type-chips** — één rij toggles, single-select. Niets ingedrukt = alles tonen, dus geen "alle types"-chip; nog eens drukken wist de selectie. Kiezen = onmiddellijk filteren, geen "toepassen"- en geen resetknop. URL sync: `?type=` in de query string zodat deelbaar. Alleen chips voor types die items hebben. *(Herzien 2026-07-22: de dagfilter is geschrapt, zie S2 voor de motivatie.)*

1. **Dag-groepen** — lijst van programma-items gegroepeerd per dag, met een dag-kop als ankerdoel. Een kop en zijn ankerlink verdwijnen als het actieve typefilter die dag leegmaakt.

1. **Programma-item card** (herbruikbaar component):

### Componenten nieuw

- Dag-ankerlinks (`.day-jump`)

- Type chip-row

- Programma-item card

### Toegankelijkheid-specifiek

- Filters als native `<button aria-pressed>`, geen pure divs. Ingedrukte staat ook zonder kleur herkenbaar (vinkje).

- Focus state duidelijk zichtbaar op elke card.

- `aria-live="polite"` region meldt *"37 items gevonden"* bij filterwijziging, en zwijgt bij eerste paint.

---

## Programma-item detail (`/programma/<slug>`)

**Doel:** één item helemaal uitleggen en terug de weg wijzen.

**Primaire actie:** terug naar het programma (behouden filters).

**Secundair:** deel-link (native share op mobile).

### Wireframe-brief

1. **Breadcrumb / terug-link** — *"← Terug naar programma"*. Klein, bovenaan.

1. **Hero** — artiest-beeld (optioneel). Onder het beeld:

1. **Beschrijving** — 1–4 korte paragrafen. Geen jargon.

1. **Media** (optioneel, Performance-feature volgens Scope) — één Spotify of SoundCloud embed als het relevant is. Fallback: tekstlink naar extern platform.

1. **Credits** — artiest, partner-programmator, bron als er een is. Gewoon tekst, geen cards.

1. **Footer** (global).

### Edge cases

- **Item geannuleerd:** banner bovenaan (niet-rode waarschuwingskleur, wel duidelijke iconografie). *"Dit programma is geannuleerd. Zie [alternatief] of terug naar het programma."*

- **Geen beeld beschikbaar:** hero valt weg, H1 staat direct onder de header. Geen generieke placeholder-afbeelding.

- **Embed faalt / privacy blockers:** tekstlink zichtbaar als fallback, embed verdwijnt netjes.

---

## Praktisch (`/praktisch`, `/infos-pratiques`)

**Doel:** elke praktische vraag — hoe kom ik er, wat kost het, is het toegankelijk voor mij, wat met m'n kinderen — beantwoorden in één pagina.

**Primaire actie:** mail naar [info@plazey.be](mailto:info@plazey.be) (als iemands vraag niet beantwoord is). 

**Secundair:** deep-links naar de vier anchor-secties.

### Wireframe-brief

1. **Page header** — H1 *"Praktisch"*. Eén zin eronder: *"Alles wat je moet weten om langs te komen."*

1. **In-page nav** — vier links die naar de ankers springen, horizontaal op desktop, als sticky mini-tabs op mobile. Volgorde: *Bereikbaarheid · Eten & drinken · Toegankelijkheid · Kinderen, regenplan & meer*.