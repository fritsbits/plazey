// Programme items store neutral values (folder = language); these maps
// translate them for display. Adding a stage? Also add it to the CMS
// config (public/admin/config.yml) and content.config.ts.
export const typeLabels: Record<'nl' | 'fr', Record<string, string>> = {
  nl: { concert: 'Concert', dans: 'Dans', film: 'Film', workshop: 'Workshop', kids: 'Kinderen', 'off-stage': 'Off-stage', expo: 'Expo', theater: 'Theater', kermis: 'Kermis' },
  fr: { concert: 'Concert', dans: 'Danse', film: 'Film', workshop: 'Atelier', kids: 'Enfants', 'off-stage': 'Hors scène', expo: 'Expo', theater: 'Théâtre', kermis: 'Fête foraine' },
};

// The filter chips group several types into one bucket. One chip per type gave
// nine chips, six of which filtered the programme down to two items or fewer,
// which is a table of contents rather than a filter. Grouping loses nothing:
// each card still carries its own precise `typeLabels` badge. A new type must
// be added to a group here, otherwise no chip will ever reach it.
export const typeGroups = [
  { value: 'music', types: ['concert'] },
  { value: 'kids', types: ['kids', 'kermis'] },
  { value: 'workshop', types: ['workshop'] },
  { value: 'see', types: ['dans', 'film', 'theater', 'expo', 'off-stage'] },
] as const;

// `kids` keeps its name from the type it grew out of: the kids callout links
// `?type=kids`, and those links get shared.
export const typeGroupLabels: Record<'nl' | 'fr', Record<string, string>> = {
  nl: { music: 'Muziek', kids: 'Kinderen en families', workshop: 'Workshop', see: 'Te zien' },
  fr: { music: 'Musique', kids: 'Enfants et familles', workshop: 'Ateliers', see: 'À voir' },
};

// Badge on a card whose time moved after the programme went public. Says which
// direction it moved, because "gewijzigd" sends someone hunting for the new
// time while "vervroegd" tells them to come earlier.
export const timeChangeLabels: Record<'nl' | 'fr', Record<string, string>> = {
  nl: { earlier: 'Vervroegd', later: 'Uitgesteld' },
  fr: { earlier: 'Avancé', later: 'Reporté' },
};

export const stageLabels: Record<'nl' | 'fr', Record<string, string>> = {
  nl: { dans: 'Dans', froefroe: 'FroeFroe', tentoonstelling: 'Tentoonstelling', workshop: 'Workshop' },
  fr: { dans: 'Danse', froefroe: 'FroeFroe', tentoonstelling: 'Exposition', workshop: 'Atelier' },
};
