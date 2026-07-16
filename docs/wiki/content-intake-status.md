# Content-intake status

Tracker voor de contentbatches die de organisatie aanlevert (Word-docs). Eén rij per content-item: waar het vandaan komt, waar het op de site landt, en of het al verwerkt is.

**Laatst bijgewerkt:** 2026-07-16 (batch 1)

## Workflow bij een nieuwe batch

1. **Converteer** het doc: `textutil -convert txt "<doc>.docx"` en bereken `shasum -a 256 "<doc>.docx"`.
2. **Check op update van bestaand doc:** vergelijk de hash met de Provenance-header van het bestaande bestand in `docs/raw/`. Zelfde naam + andere hash = nieuwe versie → diff de teksten en verwerk alleen wat veranderde.
3. **Ingest:** schrijf (of vervang) het bestand in `docs/raw/` met datum-prefix en nieuwe provenance-header. Bij vervanging: oude versie blijft in git-historie, dus gewoon overschrijven.
4. **Verwerk** de wijzigingen in `site/src/` (programme-md's, pagina's).
5. **Werk deze pagina bij:** status per item, nieuwe open vragen.
6. **Log** in `docs/log.md`.

## Ontvangen documenten

| Doc | Versie ontvangen | Raw file | Status |
|---|---|---|---|
| basiswebsite.docx | 2026-07-16 (`9c7652dc…`) | [raw](../raw/2026-07-16-basiswebsite.md) | ✅ verwerkt |
| plazey pro.docx | 2026-07-16 (`71e248c8…`) | [raw](../raw/2026-07-16-plazey-pro.md) | ✅ verwerkt |
| Randactiviteiten - overzicht met teksten.docx | 2026-07-16 (`0d59a226…`) | [raw](../raw/2026-07-16-randactiviteiten.md) | ⏳ wacht op teksten |

## Status per content-item

### basiswebsite.docx → Praktisch + Over Plazey

| Item | Site-target | Status |
|---|---|---|
| Prijslijst dranken (volledig) | `nl/praktisch` + `fr/infos-pratiques` § Eten & drinken | ✅ toegepast (Freedom Pils weggelaten: "niet op prijslijst") |
| Openingsuren (vr 14u-24u, za/zo 14u-22u) | FAQ op beide praktisch-pagina's | ✅ toegepast (verving "vrijdag 19:30") |
| Gehoor: enkel oordopjes | § Toegankelijkheid, blok Gehoor | ✅ toegepast (CM1-toestel + tolk VGT verwijderd, ook uit Over Plazey-verhaal) |
| Derde blokje organisatoren (De Zeyp, De Platoo, Vaartkapoen) | `nl/over-plazey` + `fr/a-propos` | ✅ toegepast (VK-kaart toegevoegd) |

### plazey pro.docx → Programma

| Item | Site-target | Status |
|---|---|---|
| VR Julo's Jukebox 14-17u + tekst + tai chi/Boomer- & Parkiboks | `programme/*/julos-jukebox.md` | ✅ toegepast |
| VR Atelier Leon 17u + tekst | `programme/*/atelier-leon.md` | ✅ toegepast |
| VR Plaatjes Wawasda 18u-20u30 | nieuw: `programme/*/wawasda.md` | ✅ toegepast |
| VR Kortfilms 21u, volledige lijst (7 films) | `programme/*/kortfilms.md` / `court-metrages.md` | ✅ toegepast |
| VR Dansen Wawasda & Mr. Pink 22u30 | nieuw: `programme/*/wawasda-mr-pink.md` | ✅ toegepast |
| ZA Baraka Sounds: DJ Aldessa, Mec Yek, Taraf Budișteanu | `programme/*/baraka-sounds.md` | ✅ toegepast (verving "Nicolas Hauzeur & guests") |
| ZA 3XXL: Karsten Quix, Flemish Primitives, Neeya, Jennifur, Troy, KZ | 6 bestaande entries | ✅ curator BiZa → 3XXL (zie open vragen) |
| ZO bios: Maya Teklal, Under the Reefs, IGIT, Nostos, Taxus Brown, White Privileged Girls, Hind Ennaira, HYMM | 8 bestaande entries | ✅ toegepast (HYMM: NL/FR vertaald uit Engelse brontekst) |
| Uren zaterdag + zondag | alle za/zo-entries | ⏳ niet in doc — staan nog op placeholder 14:00 |

### Randactiviteiten.docx → Programma (rand)

| Item | Site-target | Status |
|---|---|---|
| Alle randactiviteiten (sumo, springkasteel, kubb, spikeball, pannakooi, air badminton, kan jam, ninja run, Vormidable, Magico magico, Bamboeland, bijoux, vliegeren, boogschieten) | nog geen entries aangemaakt | ⏳ wacht: doc bevat enkel uren voor 8 slots, geen promoteksten ("van vorig jaar") en geen foto's |

## Open vragen voor de organisatie

1. **Curator zaterdagavond:** het doc zegt "3XXL presenteert", de site had "BiZa". Nu overal 3XXL. Klopt dat?
2. **Uren zaterdag en zondag** (podium-acts) ontbreken nog.
3. **Koffie** staat niet op de nieuwe prijslijst; van de site gehaald. Komt er koffie?
4. **Randactiviteiten:** promoteksten "van vorig jaar" en foto's "in de map" zijn nog niet aangeleverd.
5. **Maya Teklal:** FR- en ENG-bio aangekondigd in het doc, alleen NL zat erin. FR is nu een eigen vertaling.
6. **Kinderkoptelefoons** (praktisch § kinderen): nog steeds vermeld, maar het gehoor-lijstje is teruggebracht tot enkel oordopjes. Bevestigen of koptelefoons er zijn.
7. **Vrijdag 19u30:** de oude FAQ zei dat vrijdag om 19:30 begint; het nieuwe doc zegt 14u-middernacht. 14u aangehouden (matcht Julo's Jukebox om 14u).

## Conventies

- Spelling gevolgd uit het doc, behalve evidente typo's: "The Flemish Premitives" → Primitives, "benen klos" → los, "HYM" → HYMM.
- Em-dashes uit klantteksten omgezet naar komma's/dubbele punten (huisstijlregel).
- `white-priviliged-girls.md`: bestandsnaam (slug) behouden, titel gecorrigeerd naar "White Privileged Girls".
