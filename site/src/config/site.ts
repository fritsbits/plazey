// src/config/site.ts
import phaseData from './phase.json';

// The phase lives in phase.json so the beheer-CMS (/admin) can switch it.
const PHASES = ['save-the-date', 'reveal', 'live', 'aftermovie'] as const;
type Phase = (typeof PHASES)[number];
if (!PHASES.includes(phaseData.phase as Phase)) {
  throw new Error(`Invalid phase "${phaseData.phase}" in src/config/phase.json. Valid: ${PHASES.join(', ')}`);
}
export const SITE_PHASE: Phase = phaseData.phase as Phase;
export const FESTIVAL_YEAR = 2026;
export const FESTIVAL_DATES_NL = '28–30 augustus 2026';
export const FESTIVAL_DATES_FR = '28–30 août 2026';
export const FESTIVAL_LOCATION = 'Elisabethpark, Koekelberg';
export const CONTACT_EMAIL = 'info@plazey.be';
export const FACEBOOK_URL = 'https://www.facebook.com/plazeyfestival';
export const FATHOM_SITE_ID = 'LKVSWECZ';
