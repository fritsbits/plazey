# Tech stack — Plazey website v1



## Decision

**Astro** (static site generator) deployed on **Netlify** or **Vercel** (free tier). No server. No CMS in v1.

This decision was made after evaluating Laravel (Frederik's recurring stack) against the actual requirements of the site.

---

## Why not Laravel

Laravel is Frederik's recurring stack for good reason — mature, well-maintained, reliable long-term. But for Plazey v1 it carries costs that aren't justified:

- Server running year-round (Digital Ocean + Forge) for a site that's actively used ~3 weeks per year

- Ongoing maintenance overhead (PHP updates, composer, server health) for minimal dynamic functionality

- No real CMS requirement in v1 — content owner is Frederik, programme locks ~4 weeks before festival

---

## Why Astro

Astro is purpose-built for content-driven sites. Key reasons it fits:

- **Free hosting** on Netlify/Vercel free tier — meaningful for a limited-budget org

- **Zero server maintenance** between editions

- **Bilingual routing** (`/nl/`, `/fr/`) handled cleanly via content collections

- **Shallow framework coupling** — content lives in markdown files. If Astro ever disappeared, migration to another static generator would take days, not months

- **Longevity:** acquired by Cloudflare (January 2026), MIT-licensed, open-source. Abandonment risk is low

---

## Content updates

**v1: Frederik stays in the loop, AI-assisted.**

Organisers send updates (WhatsApp, email). Frederik pastes to LLM → LLM updates markdown → Git commit → auto-deploy. ~5 min per update. Realistic given the programme locks 4 weeks before the festival and update volume is low.

**If delegation becomes necessary (future editions):**

Add **Decap CMS** (open source, sits on top of Astro + Git, gives a browser form UI to non-technical editors). This is a configuration exercise, not a rebuild — content stays in markdown.

*Update 2026-07-16: this happened — Lies now manages the programme via a git-based CMS (Sveltia, the maintained Decap successor) on plazey.be/admin. See [admin-cms.md](admin-cms.md).*

---

## Forms

Static sites have no server, so forms need a third-party endpoint.

**Decision: Formspree** (or equivalent: Formspark, Netlify Forms).

- Free tier: 50 submissions/month — plenty for volunteer sign-ups and rommelmarkt/bazaar applications

- HTML form on the Astro site points to Formspree endpoint

- Submissions emailed to organiser + stored in Formspree dashboard

- Setup time: ~1 hour per form

Use cases covered: volunteer call (Doe mee), rommelmarkt/bazaar applications.

**When this stops being enough:** if organisers need to manage, filter, or respond to applications in bulk → revisit with a proper backend. Not a v1 problem.

---

## When to reconsider Laravel

Laravel makes sense for Plazey if, in a future edition:

- A non-technical volunteer needs to edit content without going through Frederik (and Decap CMS isn't enough)

- Forms require complex validation, file uploads (e.g. artist press kits), or entries stored in a queryable database

- The site grows to need user accounts, payment, or other server-side logic

Migrating from Astro to Laravel at that point is a clean rebuild — the markdown content ports over easily.

---

## Working with Claude Code

Three layers, in order of impact.

### 1. Astro Docs MCP Server

Astro provides an official MCP server that gives Claude Code real-time search over the latest Astro documentation — the direct equivalent of Laravel Boost, but first-party from Astro.

**Setup:** [Claude.ai](http://claude.ai/) connector settings → Add custom connector → URL: `https://mcp.docs.astro.build/mcp` → name it "Astro docs".

Do this before starting the project. It's the highest-leverage step.

### 2. [CLAUDE.md](http://claude.md/)

Claude Code reads a `CLAUDE.md` file at the project root as persistent context for every session. Keep it short and concrete — not generic Astro best practices (the MCP server handles that), but Plazey-specific decisions:

- Content collections schema for programme items

- Bilingual URL structure (`/nl/`, `/fr/`)

- Formspree integration approach

- "No CMS in v1" — so it doesn't suggest one

- File structure and naming conventions

**Caveat:** long [CLAUDE.md](http://claude.md/) files backfire. Research shows that adding more rules can cause the model to follow *all* rules worse as context grows. Keep it to the essentials.

### 3. llms.txt (fallback)

Astro also publishes `llms.txt` and `llms-full.txt` — the full docs in AI-optimised markdown format — at `https://docs.astro.build`. Useful as a fallback when the MCP server isn't available, but less efficient (more tokens, goes stale). The MCP server is always preferable.

---

## Stack summary

*(tabel)*