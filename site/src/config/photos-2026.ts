// Photos from the 2026 weekend, shown on the home page in the `aftermovie`
// phase. NL and FR pages are independent, so the alt text lives here per
// language rather than in the markup — one list, two voices.
//
// The order is the reading order of the wall: it opens at the entrance on a
// Saturday afternoon and closes on the dancefloor at night, alternating day
// and evening so the wall doesn't turn into a block of dark frames.
import kassaBuggy from '../assets/images/2026/kassa-buggy.jpg';
import podiumVliegtuigNacht from '../assets/images/2026/podium-vliegtuig-nacht.jpg';
import kinderenWaterspeeltafel from '../assets/images/2026/kinderen-waterspeeltafel.jpg';
import gitaristRodeGitaar from '../assets/images/2026/gitarist-rode-gitaar.jpg';
import punkkapperBasiliek from '../assets/images/2026/punkkapper-basiliek.jpg';
import zangeresRoodVliegtuig from '../assets/images/2026/zangeres-rood-vliegtuig.jpg';
import boksenKindPark from '../assets/images/2026/boksen-kind-park.jpg';
import avondPicknicktafels from '../assets/images/2026/avond-picknicktafels.jpg';
import saxofonistBlauwLicht from '../assets/images/2026/saxofonist-blauw-licht.jpg';
import dansenLichtjesAvond from '../assets/images/2026/dansen-lichtjes-avond.jpg';

export const photos2026 = [
  {
    src: kassaBuggy,
    alt: {
      nl: 'Bezoekers aan de blauwgeschilderde kassa. Medewerkers in groene t-shirts bedienen, een vrouw wacht met een buggy.',
      fr: "Des visiteurs à la caisse peinte en bleu. Des équipiers en t-shirt vert servent, une femme attend avec une poussette.",
    },
  },
  {
    src: podiumVliegtuigNacht,
    alt: {
      nl: 'Een band speelt in paars licht onder het vliegtuig dat boven het podium hangt. Silhouetten van het publiek op de voorgrond.',
      fr: "Un groupe joue dans une lumière violette sous l'avion suspendu au-dessus de la scène. Des silhouettes du public au premier plan.",
    },
  },
  {
    src: kinderenWaterspeeltafel,
    alt: {
      nl: 'Kinderen met fietshelmen op spelen aan een blauwe watertafel met houten hengeltjes.',
      fr: 'Des enfants avec des casques de vélo jouent autour d\'une table à eau bleue avec des petites cannes en bois.',
    },
  },
  {
    src: gitaristRodeGitaar,
    alt: {
      nl: 'Een gitarist in een gebloemd vest speelt op een rode gitaar, met een pet op.',
      fr: 'Un guitariste en gilet à fleurs joue sur une guitare rouge, casquette sur la tête.',
    },
  },
  {
    src: punkkapperBasiliek,
    alt: {
      nl: 'Bij de punkkapper wordt een jongen geschminkt. Op de achtergrond de basiliek van Koekelberg tussen de bomen.',
      fr: "Chez le coiffeur punk, un garçon se fait maquiller. Au fond, la basilique de Koekelberg entre les arbres.",
    },
  },
  {
    src: zangeresRoodVliegtuig,
    alt: {
      nl: 'Een zangeres in een rood topje wijst naar boven, naar het vliegtuig dat boven het podium hangt.',
      fr: "Une chanteuse en haut rouge pointe vers le haut, vers l'avion suspendu au-dessus de la scène.",
    },
  },
  {
    src: boksenKindPark,
    alt: {
      nl: 'Een meisje met rode bokshandschoenen bokst tegen de pads van een begeleider, op een pad in het park.',
      fr: "Une fille avec des gants de boxe rouges frappe les pattes d'ours d'un animateur, sur une allée du parc.",
    },
  },
  {
    src: avondPicknicktafels,
    alt: {
      nl: 'Het festivalterrein bij nacht. Slingers met lampjes tussen de bomen, mensen aan de picknicktafels, de maan boven het park.',
      fr: 'Le site du festival la nuit. Des guirlandes lumineuses entre les arbres, des gens aux tables de pique-nique, la lune au-dessus du parc.',
    },
  },
  {
    src: saxofonistBlauwLicht,
    alt: {
      nl: 'Een saxofonist speelt in blauw licht, met een bassist achter hem.',
      fr: 'Un saxophoniste joue dans une lumière bleue, un bassiste derrière lui.',
    },
  },
  {
    src: dansenLichtjesAvond,
    alt: {
      nl: 'Mensen dansen onder de lichtjes bij de dj-booth, laat op de avond.',
      fr: 'Des gens dansent sous les guirlandes près de la cabine du dj, tard dans la soirée.',
    },
  },
] as const;
