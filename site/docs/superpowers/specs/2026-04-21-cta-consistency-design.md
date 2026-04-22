# CTA consistency — save-the-date phase

**Date:** 2026-04-21
**Scope:** pages visible when `SITE_PHASE === 'save-the-date'` only.

## Problem

End-of-page CTAs drift across the site: different wrappers (dark `.callout-cta` on NL about, light `.callout` on FR about), different structures (two actions vs one), different arrow conventions (inline SVG vs literal `→`), and two different labels for the same destination ("Kom helpen" vs "Vrijwilliger worden").

## Decisions

### Canonical end-of-page CTA block

Used identically on NL over-plazey and FR à-propos.

```astro
<aside aria-labelledby="cta-heading" class="callout-cta section">
  <Container>
    <h2 id="cta-heading">{heading}</h2>
    <p>{paragraph}</p>
    <div class="cta-group">
      <a href={volunteerPath} class="btn-ghost">{volunteerLabel}</a>
      <a href={projectPath} class="btn-text callout-cta-text-link">{projectLabel}</a>
    </div>
  </Container>
</aside>
```

- Wrapper: `<aside aria-labelledby>` + `.callout-cta .section`
- Primary action: `.btn-ghost` (ghost on dark panel = white outline)
- Secondary action: `.btn-text.callout-cta-text-link`
- No SVG arrows, no `→` characters inside either button

### Copy

**NL (about only):**
- H2: "Doe mee aan Plazey."
- P: "Kom achter de bar, aan de kassa of bij het opbouwen. Of stel een project voor en maak deel uit van het programma."
- Buttons: `Kom helpen` → `/nl/vrijwilliger` + `Stel een project voor` → `/nl/stel-een-project-voor`

**FR (about only):**
- H2: "Participe à Plazey."
- P: "Viens derrière le bar, à la caisse ou pour le montage. Ou propose un projet et fais partie du programme."
- Buttons: `Viens aider` → `/fr/benevole` + `Propose un projet` → `/fr/propose-ton-projet`

### Label convention (applies everywhere)

- All button labels are imperative, verb-first. FR uses `tu`-imperative ("Viens", "Propose", "Découvre"), never infinitive.
- Nav / CTA links pointing *to* the volunteer page: "Kom helpen" / "Viens aider"
- The final in-page signup button *on* the volunteer page: "Word vrijwilliger" / "Deviens bénévole" (commitment, not navigation)
- Project side: "Stel een project voor" / "Propose un projet"

### Arrow convention (applies everywhere)

- `.btn-primary` and `.btn-ghost`: never contain an arrow (no SVG, no `→`)
- `.btn-text`: may keep `→` when indicating "goes elsewhere" (e.g. "Volg ons op Facebook →")
- Back/forward navigation SVGs on detail pages are unaffected

### Home mid-page teasers — stay light

Hero already carries the primary CTAs; mid-page teasers stay plain `.section` with a single `.btn-ghost` and an image alongside. No dark callout on the home.

Wrap the lone button in `.cta-group` for structural consistency (removes the ad-hoc `mt-6`).

### Form pages

Volunteer pages (`/nl/vrijwilliger`, `/fr/benevole`): no change. Final "Vrijwilliger worden" / "Devenir bénévole" button stays in its existing `.cta-group` — it's the commitment button, not part of the canonical block.

Project form pages (`/nl/stel-een-project-voor`, `/fr/propose-ton-projet`): **left as-is**. The submit handler uses `insertAdjacentElement('beforebegin', errorEl)` to show an error message — wrapping the button in `.cta-group` would place the error *inside* the cta-group as a flex-row sibling of the button, breaking the error-state layout. Form submit buttons are treated as form controls, not CTA blocks.

## Per-page changes

| Page | Change |
|---|---|
| NL over-plazey | Apply canonical block. Remove the inline SVG arrow from the ghost button. Change button label from "Vrijwilliger worden" → "Kom helpen". |
| FR à-propos | Replace light `.callout` with canonical dark block. Two buttons instead of one. |
| NL praktisch | **Excluded** — ends on a light `.callout` with an inline contact form (`.cta-form`). Deliberately inward-pointing; users landing here want answers, not a second volunteer prompt. |
| FR infos-pratiques | **Excluded** — same as NL praktisch. |
| NL home volunteer teaser | Wrap lone button in `.cta-group`; drop `mt-6`. |
| FR home volunteer teaser | Same. |
| NL home programme teaser | No change. |
| FR home programme teaser | No change. |
| NL vrijwilliger | No change. |
| FR bénévole | No change. |
| NL stel-een-project-voor | No change (see Form pages note above). |
| FR propose-ton-projet | No change. |

## Out of scope

- No changes to `global.css` — existing classes cover everything.
- No new Astro component extraction — the canonical block renders twice per language; inline is fine at this scale.
- Programme list + detail pages (not in the save-the-date nav).
- Reveal/live/aftermovie phase differences.
