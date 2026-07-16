// Programme items store neutral values (folder = language); these maps
// translate them for display. Adding a stage? Also add it to the CMS
// config (public/admin/config.yml) and content.config.ts.
export const typeLabels: Record<'nl' | 'fr', Record<string, string>> = {
  nl: { concert: 'Concert', dans: 'Dans', film: 'Film', workshop: 'Workshop', kids: 'Kinderen', 'off-stage': 'Off-stage', expo: 'Expo', theater: 'Theater', kermis: 'Kermis' },
  fr: { concert: 'Concert', dans: 'Danse', film: 'Film', workshop: 'Atelier', kids: 'Enfants', 'off-stage': 'Hors scène', expo: 'Expo', theater: 'Théâtre', kermis: 'Fête foraine' },
};

export const stageLabels: Record<'nl' | 'fr', Record<string, string>> = {
  nl: { dans: 'Dans', froefroe: 'FroeFroe', tentoonstelling: 'Tentoonstelling', workshop: 'Workshop' },
  fr: { dans: 'Danse', froefroe: 'FroeFroe', tentoonstelling: 'Exposition', workshop: 'Atelier' },
};
