# Frontend wireframe playbook

## Where this fits

This step follows UX planning. Before starting, you need:

- **Strategy** — goals, audience, constraints
- **Scope** — what's in and out of v1
- **Structure** — site map and page hierarchy
- **Skeletons** — wireframes for the whole site and core functionality
- **Tone of voice guide** — how the site speaks
- **Content** — all copy for every page, final or near-final

This step builds the first working version of the site: real content, right structure, working interactions. No look and feel yet.

## Goal

Produce a site you can sit down and review with stakeholders — content, structure, and logic — without opinions on aesthetics getting in the way, and without having to wait for a visual design to be ready.

The wireframe should look like a wireframe. Structurally sound, real content in place, hierarchy visible. Colour, typography, and surface design are deliberately absent.

## Principle

Keep markup clean. Use a CSS reset and global base styles to handle basic readability, so components don't need inline utility classes for it. Reserve utility classes for layout structure only: containers, grids, section spacing.

## Five decisions to make before starting

**1. CSS approach**
Tailwind / plain CSS / other. If Tailwind: how does it install in this stack?

**2. Where does the max-width constraint live?**
- On the layout wrapper → all content bounded, simpler markup
- Per section → hero and future full-bleed sections stay free (recommended for most sites)

**3. Nav behaviour**
Static (scrolls with the page) or sticky (fixed at top)?

**4. Scope**
Shell only (nav + layout wrapper) or full structural pass (all pages + all components)?
For a first working version: full structural pass.

**5. What does the global stylesheet restore?**
Any CSS reset strips browser defaults you want back. At minimum:
- Heading scale: h1–h4 with size, weight, and line-height
- Link colour and hover state

## What stays out of scope

- Custom fonts or font imports
- Brand colours (beyond neutral grays and a default link blue)
- Visual decoration: shadows, gradients, illustrations, icons
- Animations and transitions
- Anything that constitutes a look-and-feel decision

If a stakeholder asks "can we make this more [adjective]?" during review, the answer is: that's the next step. This step is for content and structure.

## Definition of done

- Every page renders with real content
- Heading hierarchy is visible (h1 > h2 > h3)
- Navigation works, including mobile
- All interactive elements function (filters, accordions, toggles, embeds)
- Layout holds at both desktop and mobile viewports
- No broken links or placeholder copy
- TypeScript / build check passes with 0 errors
