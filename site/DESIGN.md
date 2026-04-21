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
| `--font-sans` | `system-ui, ...` | Only font in the project |

## Scales

**Spacing** — Tailwind units from the approved set only: `1, 2, 3, 4, 6, 8, 12, 16, 24`. Never `5, 7, 9, 10, 11, 13+` outside that scale.

**Type** — clamp-sized `h1`, 1.5 / 1.125 / 1 rem for h2–h4. Body defaults to 1rem; `.opening` is 1.1875rem. No value below 0.875rem (14px accessibility floor).

**Weights** — 400 (body), 500 (buttons, nav, labels), 600 (headings, active nav, button hover emphasis). Never 700+ until huisstijl.

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
2. Load brand font via `--font-sans`.
3. No component markup changes required.
