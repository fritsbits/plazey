# S3 — Programma-item detail (/programma/<slug>)

> **URL:** `/nl/programma/<slug>` (NL) · `/fr/programme/<slug>` (FR)

> **Doel:** één programmaitem volledig uitleggen en de weg terug wijzen.

> **Primaire actie:** terug naar het programma (met behoud van actieve filters)

> **Secundaire actie:** deel-link (native share API op mobile)

**Copy:** zie 2. Programma / Programme (NL + FR) — sectie "Item detail"

---

## Wireframe — mobile first

```
[← Terug naar programma]

[HERO-BEELD: artiest of act — optioneel]

[H1: Naam van het item]
[Meta-regel: Zaterdag 23 aug · 15:00 · Concert · Podium]
[TYPE-CHIP]

[Beschrijving: 1–4 korte paragrafen]

[CLICK-TO-PLAY EMBED: poster + play-knop — optioneel]
[Fallback tekstlink als embed niet laadt]

[Credits: artiest, partner-programmator]

[FOOTER]
```

---

### Zone 1: Teruglink

```html
<a href="/nl/programma" class="back-link">
  ← Terug naar programma
</a>
```

**Gedrag:** behoudt actieve filters via URL (bv. terug naar `/nl/programma?dag=zaterdag&type=concert`).

**Positie:** boven de H1, kleine opmaak.

---

### Zone 2: Hero

**Beeld (optioneel):**

- Artiest- of act-foto, max 600px hoog op mobile.
- Alt text: beschrijvend, bv. "Le Ministère Du Groove speelt op het podium."
- **Als er geen beeld beschikbaar is:** zone valt volledig weg. H1 staat direct onder de teruglink. **Nooit een placeholder of stockfoto.**

**Onder het beeld:**

```
[H1: Naam van het item]
[Meta-regel: Dag · Tijd · Type · Locatie]
[TYPE-CHIP]
```

---

### Zone 3: Beschrijving

- 1–4 korte paragrafen, gewone proza.
- Geen jargon (zie ToV-guide).
- H2 niet nodig als de beschrijving direct volgt op de hero-info.

---

### Zone 4: Click-to-play embed (optioneel)

**Gedrag:**

- Component toont eerst een stille poster met play-knop.
- Pas na klikken/tikken laadt het iframe (Spotify / SoundCloud / YouTube).
- Privacy + performance: externe scripts laden niet automatisch.
- **Fallback:** als JS geblokt is of embed faalt, toont altijd de tekstlink:

**HTML-patroon:**

```html
<div class="embed-wrapper" data-src="https://open.spotify.com/…" data-provider="spotify">
  <img src="poster.jpg" alt="Play Le Ministère Du Groove" class="embed-poster">
  <button class="play-btn" aria-label="Afspelen op Spotify">▶</button>
  <noscript>
    <a href="https://open.spotify.com/…">Beluister op Spotify →</a>
  </noscript>
</div>
```

**Content-schema per item (in markdown-frontmatter):**

```yaml
embed_url: "https://open.spotify.com/…"
embed_provider: "spotify"  # spotify | soundcloud | youtube
```

---

### Zone 5: Credits

Gewone tekst, geen card-component:

```
Muziek door Le Ministère Du Groove.
Geprogrammeerd door Club 1030.
```

---

## Edge cases

| Situatie | Gedrag |
|----------|--------|
| Item geannuleerd | Banner boven H1 met `role="alert"`: "Dit optreden is geannuleerd." Item blijft zichtbaar. |
| Geen beeld | Zone 2 valt volledig weg. H1 direct bereikbaar. Nooit placeholder. |
| Embed faalt | Tekstlink altijd zichtbaar als fallback. |
| JS uitgeschakeld | `<noscript>` tekstlink actief. |

---

## Site-fases — gedrag detail-pagina

Zie S0 voor het volledige fase-model.

| Fase | Gedrag detail-pagina |
|------|---------------------|
| Pre-festival | Pagina beschikbaar zodra item gepubliceerd |
| Festival | Normaal |
| Post-festival | Pagina blijft; verwijzing naar volgend jaar in footer |
| Off-season | Pagina bereikbaar maar programma-nav verborgen |

---

## Toegankelijkheid — checklist Item detail

- [ ] H1 aanwezig (naam van het item)
- [ ] Hero-beeld heeft beschrijvende alt text
- [ ] Als geen beeld: H1 direct bereikbaar zonder extra whitespace
- [ ] Play-knop heeft `aria-label` met naam van het item en platform
- [ ] Embed-iframe krijgt `title`-attribuut na laden
- [ ] Teruglink geeft duidelijk aan waar je naartoe gaat
- [ ] Geannuleerd-banner: `role="alert"` of prominent zichtbaar bij paginalading
