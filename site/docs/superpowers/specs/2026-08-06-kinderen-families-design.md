# Kinderen en families op plazey.be

Datum: 2026-08-06 · Bron: Lies, mail + doc "Randactiviteiten - overzicht met teksten". Goedgekeurd door Frederik via Lavish-review (aanpak "programme + blokje", FroeFroe-titel behouden, geen home-teaser).

## Doel

De kinder- en gezinsactiviteiten uit het Randactiviteiten-doc een plek geven, plus het "blokje kinderen en families" waar Lies om vraagt.

## Ontwerp

**Alles is programma.** Elke activiteit met een dag en uren wordt een gewoon programma-item met `type: kids` (NL + FR bestand, zelfde slug). De bestaande type-filter toont dan automatisch een chip "Kinderen" / "Enfants"; `?type=kids` is de deelbare gezinsweergave.

**Doorlopend.** Nieuw optioneel schemaveld `allDay: boolean` (`content.config.ts`, CMS `config.yml`). `ProgramCard` toont dan "doorlopend" / "en continu" in plaats van een uur; `startTime` blijft verplicht en bepaalt alleen de sortering (openingstijd van de dag). Gebruikt door Zwerfsteen (×3 dagen, patroon van Arborescences).

**Het blokje.** Op `nl/programma` en `fr/programme`, tussen intro en dag-secties: een compacte beige `paper-sheet` (`.kids-callout` in `global.css`) met twee links: de kids-filter (`?type=kids`, met JS filtert de link in place via `data-filter-type`) en praktisch `#kinderen` / `#enfants`.

**Praktisch.** De `#kinderen`-sectie krijgt de facility-info uit het doc: Babycaravan (zetels, luierplek, microgolf), gratis oordopjes en kinderkoptelefoons aan de infostand in ruil voor een identiteitskaart.

**Updates aan bestaande items.** Fête Foraine: za 15:00–18:00 (tekst stond al op de site). Theater FroeFroe: zo 14:00–19:00, leeftijd 3–8 → 4–10 jaar volgens het doc; titel blijft "Theater FroeFroe".

**Nieuwe items** (13 ×2 talen, partners in de bodytekst, niet als curator): Zwerfsteen (vr/za/zo, doorlopend), Sportplezier voor jong en oud (za 15–20, zo 14–20, VGC Sportdienst), Henna (zo 15–19), Ninja Playground (zo 14–18, BBJJA), Maderas (zo 14–18, Amadeo Kollectif), Workshop boekenleggers (zo 14–15:30), Workshop tataki zomé (zo 16–18), De grootste ballenbaan van Brussel (zo 14–18, Studio Ludiek), Creatief bijoux maken (zo 15–19), Schaakinitiatie (zo 14–20).

**Weggelaten tot Lies bevestigt:** Cultureghem (×2) en Boogschieten ("te bevestigen" in het doc).

## Bewuste beperkingen

- Fête Foraine (kermis) en FroeFroe (theater) houden hun eigen type en vallen dus buiten de kids-filter; de knop heet daarom "Kinderactiviteiten", niet "alle".
- Geen home-teaser, geen aparte pagina, geen extra types.
