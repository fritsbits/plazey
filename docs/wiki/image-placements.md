# Image placements — Plazey website

Visual reference: which photo goes in which slot per page. Use this when building the site.

Images embedded directly. Placeholders marked `> [PLACEHOLDER: ...]` where we still need a photo.

Relative path to media: `../../media/` from this file's location.

---

## S1 — Home

### Hero

The skeleton spec calls for a **custom illustration per edition** ("geen generieke stock foto"), not a photo in the traditional sense. The photo below serves as mood reference / design brief for the illustrator — it shows the composition, colour temperature, and atmosphere to aim for.

**Mood reference:**

![Wide festival square with Plazey sign, string lights, picnic tables, and a wheelchair user in the foreground](../../site/src/assets/images/sfeer-festivalplein.jpg)

*`537787901` — Captures the full festival in one frame. Plazey sign, string lights, diverse crowd, wheelchair user visible naturally. Ideal brief for the illustrator.*

**Alternative mood reference** (batch 2):

![Violinist balanced on an acrobat's shoulders, Basilica of Koekelberg framed down the tree avenue](../../site/src/assets/images/acrobaat-basiliek.jpg)

*`IMG_6299` — Best place-identity shot across both photo batches. Use if the illustrator brief should lean more on the park/Basilica setting than the crowd. Copied into `site/src/assets/images/` but not wired into a live page yet — this hero slot is an illustration brief reference, not a live photo placement.*

---

### "Doe mee" callout section

![Volunteer in pink Plazey t-shirt, looking upward, concert stage behind her](../../site/src/assets/images/vrijwilliger-portret.jpg)

*`528729450` — Reflective volunteer portrait, festival energy in the background. Use alongside the "Kom helpen" ghost button.*

---

### Sfeervolle achtergrond / atmosphere accent

If the design needs a photo block between sections (e.g. a full-bleed break between "Wat is Plazey" and the programme teaser):

![Crowd at picnic tables near the stage, families, string lights, green trees](../../site/src/assets/images/sfeer-picknicktafels.jpg)

*`529568369` — Multi-generational crowd, relaxed festival vibe. Strong landscape crop.*

![Crowd at dusk on wooden decking, string lights lit, EHBO tent visible](../../site/src/assets/images/sfeer-avondschemering.jpg)

*`IMG_6385` (batch 2) — Resolves the evening/dusk gap. Warm string lights, after-sunset crowd. Source photo is portrait; cropped via the `.figure-crop-wide` class in `global.css` (21:9, `object-position: center 36%`) to keep the string lights + crowd band in frame instead of the tree canopy above it.*

> **Stale reference (2026-07-22):** this file, `sfeer-avondschemering.jpg`, was deleted from the repo in commit `a21eac0` and no longer exists on disk. The description above is kept for historical context only; it is not "Live" anywhere.

---

## S3 — Programma-item detail (per type)

Each programme item detail page has a hero image slot. Assign from this list based on item type. Where no photo exists, use the Plazey graphic fallback.

### Theatre / outdoor performance

![Outdoor theatre on wooden stage, seated audience, Basilica of Koekelberg in background](../../site/src/assets/images/theater-basiliek.jpg)

*`528386718` — Best location-identity shot in the set. Basilica backdrop = unmistakably Koekelberg.*

**Alternative** (batch 2):

![Theatre set with live musicians, seated chair-audience, Basilica visible in the avenue background](../../site/src/assets/images/theater-muzikanten-basiliek.jpg)

*`IMG_6424` — Rivals `theater-basiliek.jpg`: adds live music to the theatre scene, same Basilica backdrop. Good for a theatre item that also involves a band. Copied into the repo but not wired into a live page — no programme item currently has a hero-image slot to place it in (see the still-open note below on `[slug].astro`).*

### Street theatre / puppet / spectacle

![Giant puppet marionette walking through the park, people at picnic tables with drinks](../../site/src/assets/images/reuzenmarionette.jpg)

*`490721594` — Whimsical and theatrical. Works for street performance, circus, and large-format acts.*

### Concert / main stage (evening)

![Two musicians on lit stage, warm amber spotlights, close-up angle from below](../../site/src/assets/images/concert-podium-avond.jpg)

*`538980955` — The only proper evening/stage-lit shot. Use for headliner or evening concert items.*

### Concert / outdoor stage (daytime)

![Two MCs/rappers performing on outdoor stage for a dense crowd, Basilica in background](../../site/src/assets/images/concert-rap-basiliek.jpg)

*`538535839` — High energy, crowd visible, Basilica gives location context. Good for hip-hop/rap/urban acts.*

### Brass band / parade / marching

![Close-up of bass drum being struck, trumpet player behind, festival crowd blurred](../../site/src/assets/images/muziek-trom-close.jpg)

*`536285406` — Detail shot with motion. Good for brass band, fanfare, or parade programme items.*

### Dance event / workshop

![Group dancing outdoors among trees, diverse ages, one person wearing a decorative pink hat](../../site/src/assets/images/dans-park.jpg)

*`535445939` — Joy and movement, diverse crowd, park setting. Works for dance workshops and free-dance sessions.*

### Kids: outdoor adventure / physical play

![Children on an outdoor balance/adventure course between trees, parents watching](../../site/src/assets/images/kids-avonturenparcours.jpg)

*`489990472` — Active and park-rooted. Good for movement or sport-based kids activities.*

### Kids: building / construction workshop

![Children building with large wooden construction blocks, adult facilitating](../../site/src/assets/images/kids-blokken-bouwen.jpg)

*`494512533` — Creative, hands-on, collaborative. Works for any crafts or building workshop.*

### Kids: nature / sensory play

![Children playing in a water container with leaves and natural materials](../../site/src/assets/images/kids-waterleerspel.jpg)

*`487033617` — Tactile and exploratory. Fits nature workshops, sensory play, or ecology activities.*

### Kids: cooking / food workshop

![Children cutting vegetables at an outdoor table, supervised by adults](../../site/src/assets/images/kids-kookworkshop.jpg)

*`490354341` — Hands-on cooking, park setting. Clear match for food/cooking workshops.*

### Kids: free play / sandbox

![Two older children and a toddler playing in a sandbox, warm festival lighting behind](../../site/src/assets/images/kids-zandbak.jpg)

*`529235257` — Candid, tender, intergenerational. Works for free-play zones or baby/toddler-friendly activities.*

### Kids: sewing / craft workshop

![Kids and adults sewing and stuffing fabric toy animals at a craft table, diverse group](../../site/src/assets/images/kids-naaiworkshop.jpg)

*`IMG_6457` (batch 2) — New workshop type not covered by batch 1. Good for any hands-on craft/sewing activity. Copied into the repo but not wired into a live page — see note below.*

### Art installation / sculpture

![Parent holding a child up to look at a large metal wolf/dragon sculpture in the park](../../site/src/assets/images/kunst-wolfsculptuur.jpg)

*`538075720` — Sense of wonder and discovery. Good for sculpture trails or visual art installations.*

### Art in the park / outdoor exhibition

![Wide tree-lined park avenue with artwork hanging on trees, visitors walking](../../site/src/assets/images/park-laan-kunst.jpg)

*`503383143` — Establishing shot with art context. Works for exhibitions, park trails, or visual art in public space.*

### Food stall / street food

![Food stall under tent, women preparing and serving, one raising a cup](../../site/src/assets/images/eten-foodkraam.jpg)

*`528603322` — Celebratory energy at a food stall. Good for food programme items and market stalls.*

### Local produce / marché

![Man with flat cap and apron presenting a basin of ripe tomatoes at a market stall](../../site/src/assets/images/markt-tomaten.jpg)

*`529231824` — Fresh, local, earthy. Good for local produce market or neighbourhood food stalls.*

### Rommelmarkt / clothing swap / flea market

![Outdoor clothing swap on grass under trees, people browsing](../../site/src/assets/images/rommelmarkt.jpg)

*`535448495` — Relaxed and community-oriented. Clear match for flea market or swap events.*

### Physical comedy / play / circus

![Sumo wrestling in padded foam costumes, laughing participants, crowd watching](../../site/src/assets/images/sumo-spel.jpg)

*`486746883` — Joyful and physical. Good for comedy acts, play activities, or circus-adjacent performances.*

### Spoken word / storytelling

![Storyteller with an illustrated banner, guitarist alongside](../../site/src/assets/images/verteller-optreden.jpg)

*`IMG_6429` (batch 2) — Resolves the spoken-word gap. Use for storytelling, slam poetry, or lecture-type programme items. Copied into the repo but not wired into a live page — see note below.*

> **Still open, all of S3 (per-item hero images):** the `programme` content collection schema (`src/content.config.ts`) has no `image` field, so no programme item currently renders a photo of any kind — this whole S3 section describes a future feature, not current behaviour. `theater-muzikanten-basiliek.jpg`, `acrobaat-basiliek.jpg`, `verteller-optreden.jpg`, and `kids-naaiworkshop.jpg` are staged in `site/src/assets/images/` for whenever that field is added.

> [PLACEHOLDER: Film / cinema screening — no photo in current set. Could be abstract (projection light, audience silhouettes in dusk).]

> [PLACEHOLDER: Main stage from audience perspective — wide shot looking at a large crowd + stage. Batch 2 has two partial candidates (`IMG_6331`, `IMG_6508`, both still in `~/Downloads/OneDrive_1_15-7-2026/`, not yet copied into the repo) but neither is a classic "big concert stage + huge crowd" shot — worth revisiting if a wider stage shot arrives in a future batch.]

---

## S4 — Praktisch

### Bereikbaarheid — section header / accent

![Wide tree-lined park avenue with art on trees, visitors walking](../../site/src/assets/images/park-laan-kunst.jpg)

*`503383143` — Establishes the physical location of the festival. Works as a visual intro to the "how to get here" section.*

### Eten & drinken — section header

![Food stall under tent, women preparing and serving, one raising a cup in celebration](../../site/src/assets/images/eten-foodkraam.jpg)

*`528603322` — Festive food energy. Strong header image for the eten & drinken section.*

### Eten & drinken — inline / supporting

![Man in Plazey t-shirt grilling skewers at outdoor food stall](../../site/src/assets/images/eten-grillen.jpg)

*`529162241` — Food preparation close-up. Use as secondary image alongside the price list.*

> **Unplaced (2026-07-22):** no longer on the live site. The `.image-pair` it sat in collapsed to a single taped `.snapshot` photo when the sticker treatment was replaced; the file stays in `src/assets/images/` and may be reused.

![Bar area with people in pink Plazey t-shirts, beer bottles on counter](../../site/src/assets/images/vrijwilligers-bar.jpg)

*`528351191` — Bar atmosphere with volunteer staff visible. Use near the drinks price table.*

### Tokens / kassa

![Colourful token kiosk counter, woman serving a visitor](../../site/src/assets/images/kassa-tokens.jpg)

*`528547725` — Shows the token system in practice. Use inline near the "tokens worden aanvaard" note.*

### Toegankelijkheid — section header + inline

Previously **live** on `/nl/praktisch#toegankelijkheid` and `/fr/infos-pratiques#accessibilite`, as an `.image-pair` (the same two-up component already used on the Doe mee page) placed right after the four access-category cards. As of 2026-07-22 that `.image-pair` collapsed to a single taped `.snapshot` photo — see below.

![Wide crowd facing a street performer, wheelchair user clearly seated front-row, Brussels skyline behind trees](../../site/src/assets/images/toegankelijkheid-menigte.jpg)

*`IMG_6331` (batch 2) — Resolves the toegankelijkheid header gap. A wheelchair user genuinely part of the crowd, not an incidental background figure. Strongest accessibility shot across both batches.*

> **Unplaced (2026-07-22):** no longer on the live site. Deliberate loss, not an oversight — of the two photos in the collapsed pair, this was the one dropped, because it was the only image on the site that *showed* accessibility rather than described it. The file stays in `src/assets/images/` and may be reused.

![Toddler on a parent's shoulders wearing ear defenders, watching a stage act](../../site/src/assets/images/kind-oordoppen.jpg)

*`IMG_6157` (batch 2) — Candid, real-world use of ear protection. **Live**: this is the photo kept as the single taped `.snapshot` in the collapsed pair, on both `/nl/praktisch#toegankelijkheid` and `/fr/infos-pratiques#accessibilite`.*

**Alternative** (not currently used, would replace `toegankelijkheid-menigte.jpg` if a theatre-specific context is preferred):

![Colourful theatre troupe performing, wheelchair user prominent in the seated front-row audience](../../site/src/assets/images/theater-publiek-rolstoel.jpg)

*`IMG_6430` (batch 2) — Same strength, theatre-specific context.*

Note: `oordopjes-producten.jpg` (`495741154`, the ear-protection product shot from batch 1) is still unused on the live site — it was never imported into `praktisch/index.astro`. `kind-oordoppen.jpg` above covers the same ground with a candid in-use photo instead.

> [PLACEHOLDER: "Baby Spot" / families area — `528283988` exists (Baby Spot caravan) but is better used on the Doe mee / Over Plazey page. Praktisch ideally needs its own families/kids-facilities photo, e.g. a baby changing area or a stroller parked at the entrance.]

---

## S5 — Over Plazey

### Page header / verhaal hero

![Outdoor theatre on wooden stage, seated audience, Basilica of Koekelberg in background](../../site/src/assets/images/theater-basiliek.jpg)

*`528386718` — Strongest "sense of place" image in the set. The Basilica makes this unmistakably Koekelberg, Brussels. Use as the opening visual for the verhaal section.*

**Alternative** if a wider/more atmospheric crop is preferred:

![Wide festival square: string lights, Plazey sign, picnic tables, wheelchair user](../../site/src/assets/images/sfeer-festivalplein.jpg)

*`537787901` — Full overview of the festival ground. More "festival" and less "theatre-specific".*

### Het verhaal — atmosphere / community accent

![Group dancing outdoors among trees, diverse ages](../../site/src/assets/images/dans-park.jpg)

*`535445939` — Joy, diversity, movement. Works alongside the alinea about the festival evolving toward multilingualism and community programming.*

### Wie maakt Plazey — volunteers

![Two women in pink Plazey t-shirts in front of the Baby Spot caravan, smiling](../../site/src/assets/images/vrijwilligers-babyspot.jpg)

*`528283988` — Human, warm, specific. Shows volunteers in a recognisable festival context.*

![Bar area with multiple Plazey volunteers in pink t-shirts](../../site/src/assets/images/vrijwilligers-bar.jpg)

*`528351191` — Group volunteer shot, convivial energy. Use as secondary image.*

> [PLACEHOLDER: Organiser / core team portrait — a photo of the people from GC De Platoo and GC De Zeyp. Not a posed group shot needed; a candid behind-the-scenes moment would work better with the festival's tone. Currently missing entirely from the set.]

> [PLACEHOLDER: Behind the scenes / setup — a photo of the festival being built (volunteers setting up tents, stage rigging, decoration). Makes "wie maakt Plazey" more concrete and inviting for potential new volunteers.]

---

## S6 — Kom helpen (Vrijwilliger)

### Page header / hero

![Volunteer in pink Plazey t-shirt in foreground looking up, concert stage behind](../../site/src/assets/images/vrijwilliger-portret.jpg)

*`528729450` — Best volunteer portrait in the set. Reflective expression, festival energy in the background. Clear visual signal: this is the "become a volunteer" page.*

### Vrijwilliger rollen — rol-kaart foto's

**Bar:**

![Bar area with Plazey volunteers in pink t-shirts, beer bottles on counter](../../site/src/assets/images/vrijwilligers-bar.jpg)

*`528351191` — Directly illustrates the bar volunteer role.*

**Keuken / food:**

![Man in Plazey t-shirt grilling skewers at outdoor food stall](../../site/src/assets/images/eten-grillen.jpg)

*`529162241` — Shows the cooking/food volunteer role.*

> **Unplaced (2026-07-22):** no longer on the live site, for the same reason as the S4 mention above — see there for detail.

**Infostand / Baby Spot:**

![Two women in pink Plazey t-shirts in front of the Baby Spot caravan](../../site/src/assets/images/vrijwilligers-babyspot.jpg)

*`528283988` — Shows the info-point volunteer role in context.*

**Kassa:**

![Colourful token kiosk, woman serving a visitor at the counter](../../site/src/assets/images/kassa-tokens.jpg)

*`528547725` — Shows the kassa/token counter role. Could double as the person at the counter = volunteer angle.*

> [PLACEHOLDER: Opbouw / afbouw volunteer role — a photo of volunteers setting up or dismantling the festival (tents, stage, tables). This role is listed in the skeleton but has no matching photo.]

> [PLACEHOLDER: Festival-wide "doe mee" atmosphere — an image that conveys the reward of volunteering: a moment of shared pride, celebration, or team energy among the volunteer crew. Currently no photo captures this "after a long shift" feeling.]

---

## S7 — Stel een project voor

*This page is primarily text-led, but the "what have neighbours done before?"-section needs visual evidence to be convincing. Each example card gets one photo. Where no matching photo exists, leave the card text-only rather than using a mismatched image — mismatched photos hurt trust on a page whose whole job is building trust.*

### Example card: jonge muzikanten op hun eerste groot podium (Club 1030 / Nar6ssique)

![Twee MC's op een openluchtpodium, dicht publiek, Basiliek van Koekelberg op de achtergrond](../../site/src/assets/images/concert-rap-basiliek.jpg)

*`538535839` — Jong, buurt-gebaseerd, energie, herkenbaar Koekelberg. Past perfect bij "jonge artiesten krijgen hier een groot publiek".*

### Example card: kunst aan de bomen (Arborescences / Dear Pigs)

![Brede tree-lined park avenue met kunstwerken aan de takken](../../site/src/assets/images/park-laan-kunst.jpg)

*`503383143` — Exact wat het project is: kunst in het park, één boom per kunstenaar. Sterkste match in de hele set voor deze categorie.*

### Example card: percussie-ensemble (Fanfakids / Strak-X)

![Close-up van een bass drum die wordt aangeslagen, trompet erachter, publiek wazig](../../site/src/assets/images/muziek-trom-close.jpg)

*`536285406` — Detail-energie. Geschikt voor "percussie-collectief van de buurt".*

### Example card: dans voor iedereen (Etage Tropical / G-dance)

![Groep mensen dansend onder de bomen, diverse leeftijden, één persoon met roze hoed](../../site/src/assets/images/dans-park.jpg)

*`535445939` — Dansbeeld met diverse groep. Niet specifiek G-dance (rolstoelen niet duidelijk zichtbaar), maar leest als inclusief en ongedwongen. Gebruik met zorgvuldige alt text en onderschrift die de G-dance-invalshoek benoemt.*

### Example card: leesclub in het park (Koekelboekske)

> [PLACEHOLDER: Kinderen die samen lezen of luisteren naar een verhaal in het park. Niet aanwezig in de huidige set. Alternatief tijdens overbrugging: kaart tekstueel laten zonder foto — beter dan een mismatch.]

### Example card: inclusief theater (Scheldeoffensief)

![Outdoor theater op een laag houten podium, zittend publiek, Basiliek op de achtergrond](../../site/src/assets/images/theater-basiliek.jpg)

*`528386718` — Generieke theater-match. Toont geen inclusiviteit expliciet; gebruik alleen als tekst die naast de kaart staat de invalshoek duidelijk maakt.*

### Example card: stadswandeling (Brukselbinnenstebuiten)

> [PLACEHOLDER: Groep mensen op een stadswandeling / rondleiding door Koekelberg, gids die iets aanwijst. Niet aanwezig in de huidige set. Laat de kaart tekstueel als er geen foto is.]

---

## Cross-cutting: photos available but not yet placed

These photos have strong potential but aren't assigned to a primary slot above. Available for use in editorial sections, callouts, or future pages.

| File | What it shows | Potential use |
|------|--------------|---------------|
| `490721594` | Giant puppet + park crowd (also listed under S3) | S1 Home programme teaser card |
| `529568369` | Crowd at picnic tables, families, string lights | S1 Home atmosphere accent (also listed) |
| `529231824` | Man with tomatoes at market stall | S4 Praktisch eten-inline, or S3 marché item |
| `529235257` | Children in sandbox | S4 Praktisch kinderen-section, or S3 kids-item |
| `538075720` | Wolf sculpture, parent + child | S3 art installation (also listed) |

**Batch 2 — catalogued but not yet copied into the repo** (still in `~/Downloads/OneDrive_1_15-7-2026/`, see `wiki/image-mapping.md` for the full inventory):

| File | What it shows | Potential use |
|------|--------------|---------------|
| `IMG_6177` | Second ear-defenders shot, wide crowd, string lights | Alt for toegankelijkheid inline, or S1 atmosphere accent |
| `IMG_6444` | Petting zoo / animal pen, kids at the fence | S3 kids item — new activity type not yet in the repo |
| `IMG_6508` | Main stage from within the crowd, singer in red feather outfit, child in ear defenders | Partial candidate for the still-open "main stage from audience" placeholder |

---

*Last updated: 2026-07-16 — added 8 batch-2 photos (accessibility, evening atmosphere, spoken word, sewing workshop) from Lies.*
