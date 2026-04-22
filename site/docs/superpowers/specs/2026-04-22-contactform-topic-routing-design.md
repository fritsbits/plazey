# Praktisch contact form — topic routing

**Date:** 2026-04-22
**Scope:** NL `/nl/praktisch` and FR `/fr/infos-pratiques`.

## Problem

Four mailto CTAs are scattered across the Praktisch page — each pointing to `info@plazey.be`. The page also has a Netlify contact form at the bottom. Users either:
- Click a mailto link (opens mail client; loses context when switching apps; no categorisation for the receiver)
- Or scroll down and use the form (works, but there's no guidance on what their question is about)

Result: the form at the bottom feels like an afterthought, inbox-side the receiver has to guess what each message is about, and the in-section CTAs duplicate the function of the form.

## Decision

Replace every section-level mailto with an inline link to `#contact`. Add a topic dropdown to the form. Clicking a section CTA preselects the matching topic (and, in one case, pre-fills a starter sentence in the message field).

## Topic dropdown

Inserted between the e-mail field and the message field. 5 options, mirroring the page sections plus one escape:

**NL:**
```
Onderwerp (required)
  – (placeholder: "Kies een onderwerp")
  Bereikbaarheid
  Toegankelijkheid
  Eten & drinken
  Kinderen
  Iets anders
```

**FR:**
```
Sujet (required)
  – (placeholder: "Choisis un sujet")
  Accès
  Accessibilité
  Manger & boire
  Enfants
  Autre chose
```

Implementation: native `<select>` inside a new `.form-field`. Placeholder option has empty `value` and `disabled selected`, so `required` validation catches "no selection".

## Section CTA mapping

| Where | New copy (NL) | `data-topic` | `data-prefill` |
|---|---|---|---|
| Bereikbaarheid callout | "Hulp nodig om van de metro naar het terrein te komen? **Laat het ons weten.**" | `bereikbaarheid` | — |
| ADL bullet (Toegankelijkheid > Zorg & info) | "…bij eten, drinken, toilet of de weg vinden op het terrein. **Vraag het vooraf aan.**" | `toegankelijkheid` | `adl` |
| Toegankelijkheid generic callout | "Heb je een vraag of nodig je hulp? **Stel je vraag.**" | `toegankelijkheid` | — |
| FAQ trailing | "Staat jouw vraag er niet bij? **Stel je vraag.**" | `anders` | — |

FR equivalents:

| Where | New copy (FR) | `data-topic` | `data-prefill` |
|---|---|---|---|
| Accès callout | "Besoin d'aide pour aller de la station au site ? **Dis-le-nous.**" | `acces` | — |
| ADL bullet | "…à manger, boire, aller aux toilettes ou trouver ton chemin sur le site. **Demande-le à l'avance.**" | `accessibilite` | `adl` |
| Accessibilité generic callout | "Une question ou besoin d'aide ? **Pose ta question.**" | `accessibilite` | — |
| FAQ trailing | "Ta question n'est pas là ? **Pose ta question.**" | `autre` | — |

All four become plain inline text links (no buttons). `<a href="#contact" data-topic="…" data-prefill="…">…</a>`.

## Pre-fill template (ADL only)

**NL:** `"Ik wil graag vragen om hulp van een vrijwilliger tijdens Plazey. Wat ik nodig heb: "`

**FR:** `"Je souhaiterais demander l'aide d'un·e bénévole pendant Plazey. Ce dont j'ai besoin : "`

Trailing colon + space. No `[fill-in]` placeholder — the caret lands at the end of the string and the user just continues typing.

## Click handler

```js
for (const link of document.querySelectorAll<HTMLAnchorElement>('a[data-topic]')) {
  link.addEventListener('click', (e) => {
    const topic = link.dataset.topic;
    const prefill = link.dataset.prefill;
    if (!topic) return;
    e.preventDefault();

    const select = document.querySelector<HTMLSelectElement>('select[name="onderwerp"]');
    if (select) select.value = topic;

    const msg = document.querySelector<HTMLTextAreaElement>('textarea[name="bericht"]');
    if (msg && prefill && !msg.value) {
      msg.value = PREFILLS[prefill]; // language-aware lookup, see below
    }

    const target = document.getElementById('contact');
    if (target) {
      const y = target.getBoundingClientRect().top + window.scrollY - getOffset();
      window.scrollTo({ top: y, behavior: 'smooth' });
    }

    setTimeout(() => {
      msg?.focus();
      if (msg) msg.setSelectionRange(msg.value.length, msg.value.length);
    }, 500);
  });
}
```

- Respects existing message content (`!msg.value`) — won't overwrite what a user typed earlier.
- Scroll offset reuses the existing `getOffset()` function from the page's scroll-spy script. Need to hoist/share this function — currently scoped to scroll-spy. Implementation plan decides whether to extract or duplicate.
- Focus lands in the message field with cursor at end, ready to type.

`PREFILLS` is a per-page constant object (one per language page), defined in the page's script block:

```ts
const PREFILLS = {
  adl: 'Ik wil graag vragen om hulp van een vrijwilliger tijdens Plazey. Wat ik nodig heb: ',
};
```

FR page has the FR version. No central dictionary — keeps each page self-contained.

## URL behavior

Topic is **not** encoded in the URL. Clicking a CTA does not change `location.hash` beyond what the anchor would natively do (which the JS `preventDefault`s anyway). Deep-linking to a specific topic is out of scope — nobody wants to share `/nl/praktisch/#contact?topic=toegankelijkheid`.

Fallback: if JS fails, `href="#contact"` still works as a plain anchor. User sees the form, no preselect, no prefill. Graceful degradation.

## Form submission

The `onderwerp` field is posted to Netlify as a normal form value. No server-side routing changes needed — Netlify's form submission dashboard will show the topic column next to name/email/message.

Hidden `<input type="hidden" name="form-name" value="contact">` stays unchanged — same form, just a new field.

## Markup changes

### Form (both pages)

Add before the `bericht` field:

```astro
<div class="form-field">
  <label for="contact-onderwerp">Onderwerp</label>
  <select id="contact-onderwerp" name="onderwerp" required>
    <option value="" disabled selected>Kies een onderwerp</option>
    <option value="bereikbaarheid">Bereikbaarheid</option>
    <option value="toegankelijkheid">Toegankelijkheid</option>
    <option value="eten">Eten & drinken</option>
    <option value="kinderen">Kinderen</option>
    <option value="anders">Iets anders</option>
  </select>
</div>
```

FR values: `acces`, `accessibilite`, `manger`, `enfants`, `autre`.

**Field name stays `onderwerp` on both pages** (not `sujet` on FR). Field `name` is the technical identifier Netlify stores; the user-facing label and options are localised. Keeping a single name means the Netlify dashboard has one consistent column.

FR placeholder option: `<option value="" disabled selected>Choisis un sujet</option>`.

### Inline CTAs (both pages)

Replace each `<a href="mailto:info@plazey.be">info@plazey.be</a>` pattern with an inline `<a href="#contact" data-topic="…" data-prefill="…">…</a>`, and adjust the surrounding copy per the table above.

Four edits per page. No other content shifts.

## CSS additions

`.form-field select` — match input styling already on `.form-field input`:

```css
.form-field select {
  font-family: inherit;
  font-size: 1rem;
  line-height: 1.4;
  color: var(--color-text);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 0.5rem 0.75rem;
  transition: border-color 0.15s, box-shadow 0.15s;
  appearance: none;
  background-image: url("data:image/svg+xml,…"); /* caret glyph — exact SVG + URL-encoding decided at implementation time */
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  padding-right: 2.5rem;
}
.form-field select:focus {
  outline: none;
  border-color: var(--color-text);
  box-shadow: 0 0 0 2px var(--color-text);
}
```

Custom caret so cross-browser look stays consistent. Inline SVG via `data:` URL keeps it a single-file change — no extra asset.

## Out of scope

- **Other pages' contact flows.** Vrijwilliger and project pages have their own forms; they stay as-is.
- **Server-side form processing.** Netlify handles submission; adding a new field just appears as a column in the dashboard.
- **Email-routing by topic.** We're not wiring `onderwerp` to different inboxes or auto-responders. Receiver decides what to do with it.
- **Deep-linking.** No URL hash params, no shareable topic URLs.
- **Migration of `info@plazey.be` as a visible address.** The email address still exists and is reachable; we just stop surfacing it as the primary CTA within the page. (The Footer, for example, is untouched.)
- **Remembering topic across visits.** No localStorage, no pre-population on fresh page load.
