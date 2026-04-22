# Plazey — design tokens

Wireframe phase. Grayscale only. Huisstijl replaces these values later by swapping the CSS custom properties in `src/styles/global.css`.

## Tokens

Defined on `:root` in `src/styles/global.css`. Reference via `var(--token)` — never hard-code the raw value.

| Token | Value | Use |
|---|---|---|
| `--color-text` | `#111827` | Body text, primary button, nav logo |
| `--color-text-muted` | `#4b5563` | Secondary copy, opening paragraph |
| `--color-text-faint` | `#6b7280` | Eyebrow labels, footer meta |
| `--color-border` | `#d1d5db` | Form inputs, draft dashed border |
| `--color-border-subtle` | `#e5e7eb` | Section dividers, callout edges |
| `--color-surface` | `#ffffff` | Default background |
| `--color-surface-muted` | `#f3f4f6` | Ghost button hover, callout fill |
| `--color-hover` | `#374151` | Primary button hover, link hover |
| `--radius` | `0.375rem` | Single radius, everywhere except `.type-chip` (pill) |
| `--section-y-sm` / `-md` / `-lg` | `3rem` / `4rem` / `6rem` | Responsive `.section` padding ramp |
| `--max-content` | `56rem` | Single container width (`Container.astro`) |
| `--font-sans` | `system-ui, ...` | Body, nav, buttons, logo — everything except headings |
| `--font-heading` | `"Caprasimo", Georgia, serif` | `h1`–`h4` only. Loaded from fonts.bunny.net in `BaseLayout.astro` |

## Scales

**Spacing** — Tailwind units from the approved set only: `1, 2, 3, 4, 6, 8, 12, 16, 24`. Never `5, 7, 9, 10, 11, 13+` outside that scale.

**Type** — both h1 and h2 are fluid. `h1`: `clamp(2rem, 5.5vw, 3.5rem)` (32–56px). `h2`: `clamp(1.375rem, 3.5vw, 1.75rem)` (22–28px). `h3`: 1.25rem. `h4`: 1rem. Body 1rem; `.opening` 1.1875rem; `.text-meta` 0.875rem. No value below 0.875rem (14px accessibility floor). Ratios: at mobile h1/h2 ≈ 1.45:1; at max viewport h1/h2 = 2:1, h2/h3 ≈ 1.4:1, h3/body 1.25:1.

**Weights** — 400 (body + headings; Caprasimo ships a single 400 weight), 500 (buttons, nav, labels), 600 (active nav, logo, eyebrows). Never 700+ until huisstijl.

## Conventions

- Grayscale only. No indigo / blue / purple. No gradients, glassmorphism, accent stripes, coloured shadows.
- Borders over shadows. No `shadow-*` except standard browser focus rings.
- Icons: inline SVG with `.icon icon-sm|md|lg`. Never text glyphs (`☰`, `▶`, `←`, `↓`).
- Radius: one value via `--radius`. `.type-chip` (pill) is the only exception.
- Section padding: always via `.section`. Never inline `py-N`.
- Forms use `focus:ring-neutral-900`, never `focus:ring-blue-*`.

## Handoff to huisstijl

When brand decisions land:
1. Update `:root` values in `global.css`.
2. Swap the font link in `BaseLayout.astro` and update `--font-sans` / `--font-heading`.
3. No component markup changes required.
