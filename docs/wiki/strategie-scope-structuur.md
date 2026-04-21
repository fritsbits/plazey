# Strategie · Scope · Structuur — Plazey website v5



> Doorloop van de Garrett UX planning playbook (Plane 0 → 3) voor de nieuwe Plazey-site. Gecollapsed in één document omdat het project klein is. Plane 4 (Skeleton) volgt apart.

**Status:** draft v5 · **Datum:** 2026-04-18 · **Owner:** Frederik

**v5-wijziging (2026-04-18):** "Doe mee" is niet langer één pagina. Gesplitst in twee aparte routes — `/vrijwilliger` (Kom helpen, altijd in nav) en `/stel-een-project-voor` (enkel in nav tijdens `save-the-date`). Beide werken met gestructureerde Netlify-formulieren in plaats van mailto. Reden: vrijwilligersopvolging en programmavoorstellen lopen in verschillende maanden en vragen andere informatie — ze in één pagina proppen verwarde beide doelgroepen. Skeleton per pagina herwerkt in `s6-vrijwilliger.md` + nieuwe `s7-stel-een-project-voor.md`.

**Input:**

- [Huidige site (Wix)](https://plazey.wixsite.com/plazey-festival) — Home, /vervoer, /eten-en-drinken, /hulp, /praktisch (leeg), /dreptatepentrufabian (off-topic)

- [Brainstormnotes Plazey '26, 23 okt 2025](https://www.notion.so/295d3ecc475c80929ed8c18876bd6230)

- [Bruzz-interview Lies Van Overschée (2023)](https://www.bruzz.be/culture/music-nightlife/lies-van-overschee-plazey-heeft-zich-als-festival-aangepast-aan-de)

- [Playbook: UX planning — Elements of User Experience](https://www.notion.so/332d3ecc475c8168b2d6ce7ad4144d32)

---

## Plane 0 — Context

**Huidige site — herziene lezing na volledige verkenning:**

- Wix one-pager door Moefie, vastgeklikt op editie 2025.

- Top-level pagina's: Home (programma-dump met anker-nav per dag + about + praktisch + contact), /praktisch (overzicht, leeg), **/vervoer, /eten-en-drinken, /hulp** (substantiële inhoud, bilinguaal), /dreptatepentrufabian (off-topic tribute).

- /vervoer: metro/tram/bus-haltes inclusief vermelding dat Simonis een lift heeft en rolstoel-toegankelijk is, fietsenstalling (onbewaakt, breng slot mee), parking Indigoneo onder het park.

- /eten-en-drinken: volledige drankenprijslijst (kraantjeswater gratis, spuitwater €1, pintje €3, wijn €4…), expliciete keuze voor buurtbewoners + lokale horeca + start-ups als standhouders.

- /hulp: CM1-toestel voor auditieve beperking, VGT-tolk zondag 15:00–19:00, oordopjes, ADL-vrijwilligers voor begeleiding, programma + dranklijst in braille aan infostand. Dit is al *echt toegankelijkheidswerk*, niet boilerplate.

- Geen ticketing (gratis), geen nieuwsbrief, geen press room, geen language toggle.

- Footer: contact, "Instagram" (eigenlijk een Instagram-locatie/geotag, geen account), Facebook ([facebook.com/plazeyfestival](http://facebook.com/plazeyfestival) — echt), Partners, © Moefie.

**Vanuit brainstorm '26:** gratis stadsfestival in Elisabethpark Koekelberg, gedragen door GC PLAtoo + GC Zeyp, 3 dagen zomer, muziek/dans/circus/kunst/workshops, alle leeftijden. Ambities '26 die de site raken: herbruikbare meerjarige huisstijl die makkelijk op de site toe te passen is, eerdere communicatie, betere vrijwilligerswerking, lokale/interculturele food partners.

**Vanuit het Bruzz-interview:**

- Gratis sinds 1992. Eigen eten mag mee. Drankjes bewust goedkoop.

- Radicaal toegankelijk als intentie van het festival (maar niet als frame in de copy — zie v3 correctie).

- Bottom-up programmatie. Lokale jongerenorganisaties (Club 1030, Nar6ssique) programmeren mee. Geen wedloop naar bekende namen.

- Meertalig en meergenerationeel publiek.

- Cash blijft mogelijk — bewuste anti-cashless keuze omdat mensen zonder papieren geen Payconiq hebben.

**Herziening open vragen:**

1. Jaarlijkse campagnesite of permanent festivalthuis? → Permanent thuis, evergreen shell, per editie inwisselbare programma-inhoud.

1. Editor na launch? → Frederik.

1. Primair: overtuigen om te komen, of helpen wie al komt? → Beide, neighborhood-first.

1. ~~Open budget nog live?~~ → Irrelevant voor het publiek, geschrapt uit scope.

1. Nieuw: heeft Plazey een eigen Instagram-account? → **Nee.** De huidige "Instagram"-link op de site is een geotag. Alleen Facebook ([facebook.com/plazeyfestival](http://facebook.com/plazeyfestival)) is actief.

---

## Plane 1 — Strategie

### Kern

- **Digitale missie:** [Plazey.be](http://plazey.be/) is de open uitnodiging van de buurt aan Elisabethpark, elke zomer — gratis, meertalig, makkelijk leesbaar — die het voor iedereen, wie ook, eenvoudig maakt om te weten wat er is, hoe je er geraakt en hoe je meedoet.

- **Publiek 1:** de Koekelbergse buurt in haar volle breedte (meergenerationeel, meertalig, multicultureel, met gezinnen als instap). Niet het abstracte "suburban nuclear family".

- **Publiek 2:** Brussels cultureel publiek (20–40, NL/FR) voor films, concerten, zaterdagavond.

- **Publiek 3:** vrijwilligers, lokale artiesten, buurtorganisaties — de bottom-up pipeline.

- **Waardepropositie:** gratis sinds 1992, in het park i.p.v. in een zaal, bottom-up met de buurt gebouwd, niet op de buurt geprogrammeerd.

- **North Star:** unieke bezoeken in de 14 dagen voor het festival die Programma of Praktisch bereiken. Secundair: vrijwilligers-mails.

### Jobs-to-be-Done per publiek

1. *"Wanneer er deze zomer iets in mijn park gebeurt, wil ik — in mijn taal, zonder frictie, wat mijn situatie ook is — begrijpen of het voor mij is en hoe ik kan binnenvallen."* (buurt)

1. *"Wanneer ik dit weekend-gigs aan het scannen ben, wil ik in één oogopslag de line-up en speeltijden zien om mijn avond te plannen."* (Brussels cultureel publiek)

1. *"Wanneer ik hoor dat Plazey helpers of mede-programmatoren zoekt, wil ik één duidelijke volgende stap."* (vrijwilligers / partners)

### Actieve principes (getuned uit de playbook)

- **Gekeepd:** user needs lead, 2–3 audiences, functional before pleasurable, flag assumptions.

- **Getuned:** "Success = measurable behaviour change" → in afwezigheid van een ticket funnel werken we met page-reach proxies.

- **Toegevoegd: Low-maintenance by default.** Elk stuk content moet door één niet-technische persoon in <15 min updatebaar zijn.

- **Toegevoegd: Yearly identity, evergreen shell.** De site overleeft edities zonder rebuild.

- **Toegevoegd: Toegankelijkheid is geen sectie, het is een default.** WCAG 2.2 AA als vloer. Praktische toegankelijkheidsinfo staat waar mensen ze zoeken (in Praktisch), niet als apart spoor.

- **Toegevoegd: Eén versie, en die versie is easy-read.** Geen aparte plain-language laag. De enige copy op de site is al makkelijk leesbaar, in korte zinnen, in gewone woorden, voor iedereen. Dit is niet "toegankelijkheid" — dit is hoe we altijd schrijven.

- **Toegevoegd: Geen headliner-front-loading.** Programma-pagina toont buurtprogrammatie, kinderen, workshops en door partners geprogrammeerde blokken met hetzelfde visuele gewicht als concerten.

- **Toegevoegd: Niet overhyped.** De site claimt niets wat het festival niet waarmaakt. Geen "radicaal toegankelijk" als marketing-label. Wat er is, is er; wat er niet is, benoemen we eerlijk. *Radicaal toegankelijk* mag eenmalig op **Over Plazey** verschijnen in de verleden tijd (als historische zelfbenoeming sinds 2023), nooit als claim in de tegenwoordige tijd op home of praktisch.

- **Toegevoegd: Copy volgt de Tone of voice guide.** Alle site-teksten volgen [Tone of voice guide — Plazey](https://www.notion.so/33fd3ecc475c81caa19dc265e61ebf70) — helder, warm, uitnodigend, easy-read, bilinguaal NL/FR. Warm openingsmotief (*kom langs / kom erbij / kom helpen / stel je voor*) staat alleen op home, Over Plazey, Kom helpen en Stel een project voor.

### Open vragen

- ~~Open budget nog live?~~ → Geschrapt.

- ~~Plain-language / easy-read als launch of fase 2?~~ → Geschrapt. Eén versie, easy-read.

- Nieuw: willen we al op v1 een Instagram-account aanmaken voor Plazey, of blijven we bij Facebook-only? (Als er geen IG is, moet de footer dat niet doen alsof.)

---

## Plane 2 — Scope

**Producttype:** content-led info site. Geen functionaliteit buiten browsen en mail-to.

### Must-Have

- Edition landing: data, locatie, *gratis sinds 1992*, one-liner-uitnodiging.

- Programma: browsebaar per dag, filter op type (concert / film / workshop / kids / dans / off-stage). Per item: titel, tijd, locatie-in-park, korte bilinguale beschrijving, artiest/partner-credit, optioneel Spotify/SoundCloud embed.

- Praktisch: bereikbaarheid (uit /vervoer), eten & drinken met prijslijst (uit /eten-en-drinken), **cash én tokens aanvaard**, kinderen, regenplan, FAQ. Plain text, geen marketing.

- Toegankelijkheid als prominente sectie binnen Praktisch (met eigen anchor URL). Content bestaat al in /hulp: CM1-toestel, VGT-tolk zondag 15–19u, oordopjes, ADL-vrijwilligers, braille-programma + dranklijst aan infostand. Plus metrotoegankelijkheid + assistentie-mail naar [info@plazey.be](mailto:info@plazey.be). **Afsluitend onderaan deze sectie: partnerlijst als bewijs** — *"Dit doen we samen met:"* gevolgd door Demos, AnySurfer, Zonnelied vzw, Viernulvier, Club 1030 / gemeenschapscentrum De Kriekelaar, Scheldeoffensief. Alleen expliciet genoemde partners; te valideren of elke partner bij de lopende editie nog actief betrokken is voor publicatie.

- Over Plazey: sinds 1992, gedragen door GC PLAtoo + GC Zeyp, bottom-up, gratis. Korte missie. Partner-logo's in context.

- Kom helpen (`/vrijwilliger` · `/benevole`): vrijwilligers-call met gestructureerd Netlify-formulier (naam, mail, beschikbaarheid per dag, rol-interesse, talen, vrije tekst). Bevestigingsbericht na succesvolle submit.

- Stel een project voor (`/stel-een-project-voor` · `/propose-ton-projet`): aparte pagina die buurtbewoners, lokale artiesten en kleine organisaties uitnodigt om programma in te dienen. Gestructureerd Netlify-formulier (naam, mail, idee, wat je nodig hebt, voorkeur-dag). Alleen zichtbaar in de hoofdnav tijdens de `save-the-date`-fase; verdwijnt uit nav zodra programma gelocked is.

- Bilinguaal NL/FR, elke pagina gedupliceerd, persistente taalswitch, taal-geprefixte URLs (`/nl/...`, `/fr/...`).

- Mobile-first. WCAG 2.2 AA doorheen. Toetsenbord-navigatie. Honest alt text. Voldoende contrast.

- Evergreen shell: editie-specifieke content (hero-beeld, data, programma) inwisselbaar zonder layout/code aan te raken.

- Alle copy geschreven in korte zinnen, gewone woorden — dit is de default, niet een aparte laag.

### Performance (nice to have)

- Spotify / SoundCloud embeds per artiest.

- "Vandaag op Plazey" auto-highlight tijdens het festivalweekend.

- Eenvoudige parkkaart met podia / eten / toiletten / toegankelijke ingangen.

- Fotoarchief van vorige edities als één pagina.

### Delighter

- *(geen in v1)*

- **Cut v3:** dag-selectie delen als URL (overcomplicatie).

- Cut v2: persoonlijke programmabouwer, share-as-image, add-to-calendar per item.

### Won't-Have (vergrendeld)

- Ticketing / RSVP / accounts — festival is gratis en open.

- Nieuwsbrief.

- Blog / news stream — geen editoriale capaciteit. News leeft op sociale media.

- Press room — geen bestaande content, publiek is niet primair, mail naar [info@plazey.be](mailto:info@plazey.be) volstaat.

- EN-versie. NL/FR-only.

- E-commerce / merch.

- Volledig multi-editie-archief als first-class IA — maximaal één archief-pagina in fase 2.

- **Open budget pagina / transparantie-sectie.** Primair publiek geeft er niet om.

- **Aparte easy-read versie.** Eén versie, die versie is al leesbaar.

- **"Festival met beperkingen"-framing in de copy.** Mooie quote in context, maar als on-site framing plant het het idee dat Plazey specifiek voor mensen met beperkingen is.

### Content lifecycle

- Programma → owner Frederik, lock ~4 weken voor festival.

- Praktisch (incl. Toegankelijkheid) → owner Frederik + productie, jaarlijks + vlak voor festival.

- Over + Partners → owner Frederik / Lies, jaarlijks.

- Home hero → Frederik, 3× per jaar (save-the-date → reveal → live → aftermovie).

- Kom helpen (vrijwilliger) → Frederik, actief april–augustus. Submissies komen binnen via Netlify Forms dashboard.

- Stel een project voor → Frederik, actief oktober–februari (vóór programmatie-lock). Submissies via Netlify Forms.

### Content-herbruik uit huidige site

Veel content is al geschreven en hoeft alleen een edit-pass:

- Drankenprijslijst → direct overnemen naar Praktisch / eten & drinken.