# Plazey docs — wiki schema

This is the LLM wiki for the Plazey website project. The wiki documents the design, content, and development of plazey.be — the website for the free annual urban festival in Elisabethpark, Koekelberg, Brussels.

## Directory structure

```
docs/
├── CLAUDE.md          ← this file — schema and conventions
├── index.md           ← master index of all wiki pages
├── log.md             ← append-only chronological log
├── raw/               ← verbatim source documents (LLM reads, never modifies)
│   ├── vergadering-2026-04-10.md
│   ├── referenties.md
│   ├── visual-inspiration.md
│   └── assets/
│       ├── visual-inspiration-1.png
│       └── visual-inspiration-2.png
└── wiki/              ← LLM-generated and maintained pages
    ├── strategie-scope-structuur.md
    ├── tone-of-voice.md
    ├── tech-stack.md
    ├── skeleton-overzicht.md
    ├── skeleton-per-pagina/
    │   ├── s0-globale-shell.md
    │   ├── s1-home.md
    │   ├── s2-programma.md
    │   ├── s3-programma-item.md
    │   ├── s4-praktisch.md
    │   ├── s5-over-plazey.md
    │   ├── s6-doe-mee.md
    │   └── s7-404-empty-states.md
    └── website-copy/
        ├── 1-home.md
        ├── 2-programma.md
        ├── 3-praktisch.md
        ├── 4-over-plazey.md
        ├── 5-doe-mee.md
        └── 6-global-ui-404.md
```

## Layers

**Raw sources** (`raw/`) — immutable. The LLM reads these but never edits them. These are the authoritative source documents, exported verbatim from Notion.

**Wiki** (`wiki/`) — LLM-owned. Synthesized, cross-referenced pages built from the raw sources. The LLM creates and updates these. Frederik reads them.

## Operations

### Ingest
When a new source is added to `raw/`, the LLM should:
1. Read the source
2. Write or update relevant wiki pages
3. Update `index.md`
4. Append an entry to `log.md`

### Query
When asked a question, the LLM should:
1. Read `index.md` to find relevant pages
2. Read those wiki pages
3. Synthesize an answer
4. If the answer is substantial and reusable, file it back as a new wiki page

### Lint
Periodically check the wiki for: contradictions, stale claims, orphan pages, missing cross-references, data gaps.

## Wiki page conventions

- Filename: lowercase, hyphens, no spaces (e.g. `festival-profiel.md`)
- Language: mix of Dutch and English is fine — match the source material
- Cross-links: use relative markdown links (`[page](../wiki/page.md)`)
- No YAML frontmatter required (plain files, not Obsidian)
- Keep pages focused on one topic

## Log conventions

Each log entry:
```
## [YYYY-MM-DD] type | description
```
Types: `ingest`, `query`, `lint`, `update`

## Project context

- **Festival:** Plazey — free 3-day urban festival, Elisabethpark Koekelberg, Brussels, since 1992
- **Organisers:** GC De Platoo + GC De Zeyp
- **Website:** plazey.be — Astro rebuild (this repo), replacing the old Wix site
- **Tech stack:** Astro (static) + Netlify/Vercel, bilingual NL/FR (/nl/ + /fr/)
- **Owner/dev:** Frederik
- **Status:** Built and live — huisstijl shipped; ongoing content and polish

## Key decisions (locked)

- Git-based CMS on /admin (Sveltia): Lies self-services programme items and the site phase; Frederik also edits via Claude Code
- No ticketing, newsletter, blog, press room, EN version
- No Instagram until a real account exists (footer: Facebook only)
- Accessibility is default, not a separate section
- Cash remains possible (no cashless-only)
- Bilingual NL/FR, separate URLs, never mixed within a sentence
- Tone: warm but factual, short sentences, no festival jargon, "je" not "u"
