# Playbook audit: Plazey site (23d5ea1 → 4159a12)

## Executive summary

Over 20 commits from the initial frontend wireframe baseline to HEAD, the site gained 5 major capabilities that were not anticipated in the playbooks:

1. **Phase-conditional rendering** — save-the-date / reveal / live / aftermovie states across nav, hero, programme sections (4 commits)
2. **Page structure split** — volunteer and project-proposal pages separated from catch-all "doe mee" (3 new pages, 2 langu ages)
3. **Form overhaul** — Netlify Forms + async submission with success/error states (5 commits)
4. **Design tokens & conventions** — DESIGN.md codified, grayscale tokens in global.css, token-driven theme handoff (1 commit, 203 lines CSS)
5. **Partner logos component** — new fullwidth band above footer, placeholder images (1 commit, 132 lines)

**Content extraction status:**
- **Frontend wireframe playbook:** ~1,660 words extracted (first 100 blocks). `has_more: True` — pagination needed.
- **UX planning playbook:** ~1,355 words extracted (first 100 blocks). `has_more: True` — pagination needed.

The Skeleton documents in `/Users/frederikvincx/Documents/plazey/docs/wiki/` (11 skeleton-per-pagina files, plus tone-of-voice, tech-stack, etc.) were the canonical input to the wireframe. The wireframes should have baked in the states that emerged — but they didn't. Phase-conditional logic, form async submission, and token-driven CSS are now structural debt when they should be Skeleton + Frontend wireframe outputs.

---

## By category: gaps & findings

### 1. Structure / IA — Page split and routing

**What changed:**
- `doe-mee` (NL) and `participez` (FR) split into separate volunteer and project-proposal pages
- New routes: `/nl/vrijwilliger`, `/nl/stel-een-project-voor`, `/fr/benevole`, `/fr/propose-ton-projet`
- Old routes 301-redirected (via `.netlify/redirects`)
- Nav updated to point to new routes; segmentMap updated for lang toggle

**Examples:**
1. `/src/pages/nl/vrijwilliger/index.astro` — 213 lines, new volunteer signup page (copy, form, FAQ)
2. `/src/pages/nl/stel-een-project-voor/index.astro` — 210 lines, project proposal page
3. `/src/config/site.ts` — segmentMap now includes: `'vrijwilliger': 'benevole'`, `'stel-een-project-voor': 'propose-ton-projet'`
4. `CLAUDE.md` sitemap still lists old `doe-mee` and `participez` — out of sync

**Judgment:** **Should have been in UX planning (Structure plane)**

The initial Skeleton docs (`skeleton-per-pagina/s6-doe-mee.md` et al.) specified only two sections on the volunteer page: form + FAQ. Post-playbook, the site gained two distinct pages. This is a structural decision that affects:
- Sitemap (Structure)
- Page briefs, section inventory, CTA logic per page (Skeleton)
- Copy and form fields (Content plane output)

The decision was driven by clearer scope in the wiki docs (separate volunteer vs. project roles, different form fields), but the Skeleton docs didn't surface it as a choice point.

**Playbook amendment:** Frontend wireframe should ask: "Does your Skeleton distinguish *volunteer* and *project-proposal* as separate user journeys, or are they combined?" If separate, they get separate pages, routes, nav entries. Add a decision tree to the Structure plane: "Is there a page that mixes two distinct user flows? If yes, split."

---

### 2. Interaction / States — Phase-conditional rendering

**What changed:**
- `SITE_PHASE` (from config/site.ts) gates rendering of content blocks across:
  - Header nav (save-the-date mode hides Programme, shows Volunteer + Project Proposal; live mode shows only Programme)
  - Home hero (3 versions: save-the-date, reveal, live + 1 aftermovie)
  - Home "What is Plazey" section (collapsed in save-the-date; expanded feature blocks in reveal/live)
  - Programme page hero (save-the-date vs. reveal vs. live vs. aftermovie)
  - Practical page intro (phase-dependent text)
  - Footer (partner logos band inserted above)

**Examples:**
1. **Header (2a50901):**
   ```tsx
   const nlNav = SITE_PHASE === 'save-the-date'
     ? [{ href: '/nl/praktisch', label: 'Praktisch' }, ...]
     : [{ href: '/nl/programma', label: SITE_PHASE === 'aftermovie' ? 'Programma 2026' : 'Programma' }, ...]
   ```
   Two entirely different nav structures based on phase. segmentMap updated accordingly.

2. **Home hero (7355af9, nl/index.astro lines 36–74):**
   - `save-the-date`: "Elk jaar maakt de buurt Plazey. Dit jaar jij ook?" + two CTAs (Volunteer, Project)
   - `reveal`: "Kom langs. Plazey is drie dagen lang gratis feest..." + three CTAs (Programme, Volunteer, Practical)
   - `live`: Same h1, but CTAs change to "See what's on today"
   - `aftermovie`: "Bedankt. Tot volgend jaar." + Facebook link

3. **Programme pages (1585852, nl/programma/index.astro):**
   - `save-the-date`: No programme table, teaser text only
   - `reveal`: Full programme grid with filter UI
   - `live`: "Wat speelt nu?" with today's events highlighted
   - `aftermovie`: Aftermovie video embed

4. **Design token: `--color-text`, `--color-hover` (global.css)** — awaits huisstijl swap

**Judgment:** **Context-specific, but belongs in UX planning's State inventory** + **should be in Frontend wireframe Skeleton rendering rules**

Phase-conditional rendering is not "post-playbook tweaking" — it's a core state inventory. The Skeleton docs *mention* save-the-date / reveal / live phases, but they don't detail:
- Which sections appear in which phases
- What the CTA logic is per phase
- How nav changes (both items and labels)
- How hero text and teaser vary

The Frontend wireframe playbook says "Render every state listed in Skeleton state inventory," but the Skeleton didn't *fully* list these states — they were implicit.

**Playbook amendment:**
- **UX planning (Skeleton):** Add a mandatory "Phase state inventory" section to the template. If the product has multiple launch/lifecycle phases, list them and specify: page sections per phase, nav structure per phase, hero/CTA copy per phase, hidden/shown elements.
- **Frontend wireframe:** Add a decision to CLAUDE.md: "If Skeleton includes a phase inventory, render every phase variant as a separate view or with clear conditional annotations." Banned patterns: no `<!-- TODO: phase-gate this -->` comments; all phases must render.

---

### 3. Interaction / States — Form async submission

**What changed:**
- Volunteer and project proposal forms on both NL and FR pages changed from native form submission to Netlify Forms + async fetch POST
- On success: inline success message, button disabled
- On error: inline error message with mailto fallback
- URL stays on the page; no reload

**Examples:**
1. **Form async handler (bf65737, added to all form pages):**
   ```javascript
   const form = document.querySelector('[data-form="volunteer"]');
   if (!form) return;
   form.addEventListener('submit', async (e) => {
     e.preventDefault();
     const formData = new FormData(form);
     const button = form.querySelector('button[type="submit"]');
     button.disabled = true;
     try {
       const response = await fetch('/', {
         method: 'POST',
         body: new URLSearchParams(formData),
       });
       // success: show message
     } catch (error) {
       // error: show fallback
     }
   });
   ```

2. **Netlify Forms declaration (7e11a1d):**
   ```html
   <form name="volunteer-nl" method="POST" data-netlify="true">
     <!-- fields -->
   </form>
   ```
   No third-party backend; submissions captured by Netlify deploy context.

3. **Form JS selector fix (6f0d1b1):**
   "Netlify strips `data-netlify` attribute at deploy" — handler changed to use `data-form` instead of attribute selector.

**Judgment:** **Tech decision that should have surfaced in UX planning's Scope** + **form pattern needed in Frontend wireframe**

The Skeleton docs mention forms but don't specify: Netlify Forms? third-party? server-side? The playbooks assumed this was "not a UX decision" — but it is. Async submission vs. native reload affects:
- User experience (no flicker, inline feedback)
- Error handling (retry logic?)
- Accessibility (focus management after success, aria-live announcements)
- SEO (no page reload, so crawlers see the form, not the confirmation)

**Playbook amendment:**
- **UX planning (Scope):** Add a checklist question: "Do any forms exist? If yes, decide: native submission (page reload + server) vs. async (XHR/fetch + inline feedback)." This changes the Skeleton state inventory (success/error are now on-page states, not separate pages).
- **Frontend wireframe:** Codify the pattern in `global.css` or a new form-states.css file. Add to CLAUDE.md: "Forms with async submission must have: 1. `data-form="[name]"` selector, 2. success message in a live region, 3. error message with fallback mailto, 4. button disabled during request." Provide template.

---

### 4. Design tokens — Grayscale tokens, radius, typography scale

**What changed:**
- Committed DESIGN.md (46 lines) documenting all tokens and conventions
- global.css now defines:
  - `:root` custom properties: `--color-text`, `--color-text-muted`, `--color-text-faint`, `--color-border`, `--color-border-subtle`, `--color-surface`, `--color-surface-muted`, `--color-hover`
  - `--radius: 0.375rem` (used everywhere)
  - `--section-y-sm`, `-md`, `-lg` for responsive vertical rhythm
  - `--max-content: 56rem` for container width
  - `--font-sans`, `--font-heading` (system-ui, serif)
- Typography scale: h1 fluid clamp, h2–h3 fixed, body 1rem, labels 0.875rem, caption 0.75rem
- Weights: 400 body, 500 labels, 600 headings only
- Buttons: `.btn-primary` (dark bg), `.btn-ghost` (outline), `.btn-text` (link)
- Section padding: `.section` class applies `--section-y-sm` med `--section-y-lg` responsive

**Examples:**
1. **DESIGN.md (new file):**
   ```markdown
   # Plazey — design tokens
   Wireframe phase. Grayscale only. Huisstijl replaces these values later by swapping `:root` in `src/styles/global.css`.
   | Token | Value | Use |
   |---|---|---|
   | `--color-text` | `#111827` | Body text, primary button, nav logo |
   | `--color-text-muted` | `#4b5563` | Secondary copy, opening paragraph |
   ```

2. **global.css (203 lines, 392f529):**
   ```css
   :root {
     --color-text: #111827;
     --color-text-muted: #4b5563;
     --radius: 0.375rem;
     --section-y-sm: 3rem;
   }
   h1 {
     font-size: clamp(2rem, 5.5vw, 3.5rem);
     line-height: 1.1;
   }
   .btn-primary {
     background: var(--color-text);
     color: var(--color-surface);
   }
   ```

3. **Convention enforcement (global.css @layer components):**
   - `.section` applies `--section-y-sm` md `--section-y-lg`
   - `.btn-primary`, `.btn-ghost`, `.btn-text` locked to single radius + padding + weight
   - `.text-meta`, `.text-date`, `.edition-indicator` locked to specific font sizes
   - Focus ring: `outline: 2px solid var(--color-text)` only; no box-shadow

**Judgment:** **Should have been in Frontend wireframe, Section: Design tokens + CLAUDE.md**

The Frontend wireframe playbook *mentions* tokens — spacing scale, type scale, radius, neutral palette — but only as concepts. It doesn't provide a template for *how to commit them* to the codebase, how to structure :root, or what conventions to enforce in @layer. The DESIGN.md handoff pattern (token-to-huisstijl swap) should be baked into the playbook.

Also, this reveals a gap: the playbook says "Primary CTA: bg-neutral-900" but doesn't say *how* to store and update that (via :root vs. hardcoding vs. Tailwind config).

**Playbook amendment:**
- **Frontend wireframe (Section: Design tokens):** Provide a boilerplate DESIGN.md and global.css :root + @layer structure. Specify: "All colour values live in :root custom properties, never in Tailwind config or hardcoded." Add to CLAUDE.md: "All tokens live in DESIGN.md + :root. To swap to huisstijl, update :root values only; no markup changes."
- **Frontend wireframe (Section: Conventions):** Codify the section padding pattern, button tier pattern, and focus ring pattern as enforced @layer components, not utility-dependent.

---

### 5. Component patterns — Partner logos band

**What changed:**
- New `<Partners />` component: 132-line Astro file
- Renders a fullwidth band of partner logos above the footer on all pages
- Inserted into `BaseLayout.astro` before `<Footer />`
- Images: `/src/assets/images/partners/*.jpg` (6 partner images)
- Layout: grid of logos with equal-width columns, grayscale filter

**Examples:**
1. **Partners.astro (new, 132 lines, 1ee6c69):**
   ```astro
   import { Image } from 'astro:assets';
   export interface Props { ... }
   const { images } = Astro.props;
   
   <section class="section border-t border-gray-200">
     <Container>
       <h3>Partners</h3>
       <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
         {images.map(img => <Image src={img} alt="..." />)}
       </div>
     </Container>
   </section>
   ```

2. **BaseLayout.astro (updated):**
   ```astro
   <main id="main-content">{slot}</main>
   <Partners images={partnerLogos} />
   <Footer />
   ```

3. **Image filtering (global.css):**
   ```css
   img { filter: grayscale(100%); }
   ```

**Judgment:** **Belongs in UX planning's Scope + Skeleton**

This component emerged as a stakeholder request that wasn't in the original Skeleton. The Skeleton docs don't mention a partner or sponsor section. This suggests either:
1. Scope creep (new feature requested post-playbook)
2. Scope incomplete (partners should have been listed in Strategy)

Either way, it's a valid component that now needs to be in the wireframe patterns — but it was added *after* the wireframe was baselined.

**Playbook amendment:**
- **UX planning (Scope):** Add a checkbox: "Does this product have sponsors, partners, or affiliations? If yes, they appear in [Scope] and go to Skeleton: add a 'Partners' section to the structure doc with logo treatment."
- **Frontend wireframe (Section: Component patterns):** Add a "Partners / Logo band" pattern: grid layout, grayscale applied via filter, equal-width columns, section padding via `.section`.

---

### 6. Tech decisions — Netlify Forms, form submission, redirects

**What changed:**
- Netlify Forms (native integration, no external service)
- Form submissions are captured by Netlify deploy context and forwarded by email
- Each form has `name` and `data-netlify="true"` attributes
- `.netlify/redirects` file created for 301 redirects (`/doe-mee` → `/vrijwilliger`, etc.)
- Form JS handler selector changed from `[data-netlify]` to `[data-form]` to work around Netlify stripping the attribute at deploy

**Examples:**
1. **Netlify Forms setup (7e11a1d):**
   ```html
   <form name="volunteer-nl" method="POST" data-netlify="true">
     <input type="hidden" name="form-name" value="volunteer-nl" />
     <input type="text" name="name" required />
     <!-- fields -->
     <button type="submit">Inscrivez-vous</button>
   </form>
   ```

2. **Form submission JS (bf65737):**
   ```javascript
   const form = document.querySelector('[data-form="volunteer"]');
   if (!form) return;
   form.addEventListener('submit', async (e) => {
     e.preventDefault();
     const formData = new FormData(form);
     const response = await fetch('/', { method: 'POST', body: new URLSearchParams(formData) });
     // handle response
   });
   ```

3. **Redirects (fdf9a90):**
   ```
   /nl/doe-mee          /nl/vrijwilliger        301
   /nl/participez       /nl/benevole            301
   ```

**Judgment:** **Should have been in UX planning's Scope** (choice of form backend)

The choice to use Netlify Forms (vs. a third-party service like Typeform, Airtable, etc.) has downstream impacts: no server-side validation, limited form fields, Netlify-specific deployment step. This is a Scope decision that gates Skeleton details (form fields, error handling, redirect strategy).

**Playbook amendment:**
- **UX planning (Scope):** Add a decision: "What captures form submissions? Netlify Forms (free, form backend included), Airtable/Zapier (sync to CRM), or custom handler?" This is a constraint on form complexity downstream.
- **Frontend wireframe (CLAUDE.md):** Codify: "Forms use Netlify Forms. Each form must have `name="[form-name]"`, `data-netlify="true"`, and a hidden `form-name` input. JS handler uses `[data-form="..."]` selector, not `[data-netlify]`."

---

### 7. Content / Copy — Form labels, headings, FAQ updates

**What changed:**
- Form headings promoted from h3 to h2 (11f0da3)
- Headings and intro text added above forms (64a35d1)
- FAQ answers updated to reference form instead of mailto (cdebfeb)
- Form labels, checkbox groups, and placeholders finalized across both languages

**Examples:**
1. **Form heading (11f0da3, nl/vrijwilliger/index.astro):**
   ```astro
   <h2 id="kom-helpen">Kom helpen</h2>
   <form name="volunteer-nl" method="POST" data-netlify="true">
     <!-- fields -->
   </form>
   ```
   Changed from `<h3>` to `<h2>` to increase visual hierarchy and match Skeleton brief (not a subsection, a main page section).

2. **Intro text (64a35d1):**
   ```astro
   <h2>Kom helpen</h2>
   <p>Vul het formulier in en we zullen je binnenkort contacteren.</p>
   <form>...</form>
   ```

3. **FAQ update (cdebfeb):**
   ```astro
   <!-- Before -->
   <dd>Je kan je inschrijven via <a href="mailto:...">dit emailadres</a></dd>
   
   <!-- After -->
   <dd>Je kan je inschrijven via het formulier op de <a href="/nl/vrijwilliger#kom-helpen">Kom helpen</a> pagina.</dd>
   ```

**Judgment:** **Context-specific refinement, belongs in project CLAUDE.md**

These tweaks were driven by final copy review and form finalization. They're not playbook-worthy — they're part of the "content polish" phase after wireframe review.

**Playbook amendment:** *None required.* These are project-execution details, not pattern gaps.

---

### 8. Accessibility & hardening — Focus rings, skip links, aria-live

**What changed:**
- Focus ring: `:focus-visible` with `outline: 2px solid var(--color-text)` + `outline-offset: 2px` (global.css)
- Skip link to `#main-content` in `BaseLayout.astro`
- Form async submission announces result in `aria-live="polite"` region
- Reduced motion: `prefers-reduced-motion: reduce` disables transitions and animations
- Image alt text on partner logos (fixed in 4159a12)

**Examples:**
1. **Focus ring (global.css):**
   ```css
   :focus-visible {
     outline: 2px solid var(--color-text);
     outline-outline-offset: 2px;
     border-radius: var(--radius);
   }
   ```

2. **Skip link (BaseLayout.astro):**
   ```astro
   <a href="#main-content" class="skip-link">Skip to content</a>
   <Header ... />
   <main id="main-content">{slot}</main>
   ```

3. **Aria-live region (form success, fr/benevole/index.astro):**
   ```astro
   <div aria-live="polite" id="form-feedback"></div>
   <form>...</form>
   <script>
     // on success: document.getElementById('form-feedback').textContent = 'Merci! Nous vous recontacterons bientôt.'
   </script>
   ```

4. **Partner logos alt text fix (4159a12):**
   ```astro
   <Image src={logo} alt="" role="img" aria-label="Partner: Gemeente Ganshoren" />
   ```

**Judgment:** **Should have been in Frontend wireframe (CLAUDE.md + component patterns)**

These are wireframe-phase constraints: no visual design yet, so accessibility must be structural (focus ring, skip link, live regions, reduced-motion). The playbook mentions "keyboard nav" and "focus trap" but doesn't detail the focus ring pattern or require aria-live for async feedback.

**Playbook amendment:**
- **Frontend wireframe (CLAUDE.md):** Add a mandatory "Accessibility checklist": skip link, focus ring pattern, aria-live for async forms, reduced-motion media query, form labels, image alt text (empty alt + aria-label for decorative images in links).
- **Frontend wireframe (Component patterns):** Codify focus ring and skip link as always-required; add aria-live pattern for async forms.

---

### 9. Not playbook-worthy — Plazey-specific copy & tone

**What was project-specific and should NOT go back into playbooks:**
- Plazey's "three warm moments" rule (Home hero, About opening, Volunteer opening)
- "Je" not "u" voice (neighbourhood familiarity)
- Festival-specific dates, location, phase names (`save-the-date`, `reveal`, `live`, `aftermovie`)
- Partner logos + image assets
- French vs. Dutch tone differences (tu vs. vous reasoning)

**Judgment:** Stay in `/Users/frederikvincx/Documents/plazey/site/CLAUDE.md` and `/Users/frederikvincx/Documents/plazey/docs/wiki/tone-of-voice.md`. These are Plazey conventions, not patterns that transfer to next projects.

---

## Summary of highest-impact gaps

| Rank | Gap | Impact | Root cause |
|---|---|---|---|
| 1 | **Phase-conditional state inventory missing from Skeleton template** | 4 commits to retrofit phases across nav, hero, programme, footer | Skeleton plane didn't require explicit "What renders in each phase?" — states were implicit |
| 2 | **Page split (volunteer vs. project-proposal) not surfaced as structure decision** | 3 new pages + 6 files (NL+FR) + nav updates + redirects | Skeleton was written as "doe mee / participez" before scoping separated the two user flows |
| 3 | **Form submission method (Netlify) not specified in Scope** | 5 commits (form migration, async handler, JS fix, FAQ updates, heading tweaks) | UX planning didn't ask "which form backend?" → Frontend wireframe had to guess |
| 4 | **Design tokens not committed to boilerplate** | 1 commit (DESIGN.md + 203 lines CSS) but had to be retrofitted | Frontend wireframe playbook mentions tokens as concepts but doesn't provide template or :root structure |
| 5 | **Partner logos component not in Scope** | 1 commit (132 lines, new component) | Scope didn't ask "any sponsors/partners?" — emerged as stakeholder request |

---

## Proposed playbook amendments

### UX Planning Playbook — Scope plane

**Add decision checkpoints:**

1. **Phases & lifecycle states** (before Skeleton):
   - "Does this product have multiple launch or lifecycle phases (pre-launch, launch, live, post-event)?"
   - If yes: list phases and decide what changes per phase (nav items, hero copy, CTAs, hidden/visible sections)
   - Output: Add a `phases.md` table to your project docs

2. **Form backend** (before Scope):
   - "How many forms? What backend? Netlify Forms, third-party service (Airtable, Typeform), or custom server handler?"
   - This gates form complexity, error handling, and Scope size
   - Output: Document in Scope; add to Skeleton as a tech constraint

3. **Sponsors / partners** (in Scope):
   - "Any sponsors, partners, or affiliations?"
   - If yes: they go in Structure (site layout position), Skeleton (section brief + logo treatment), Content (names and links)
   - Output: Add "Partners section" to Scope list if approved

### UX Planning Playbook — Skeleton plane

**Enhance template for high-variability products:**

1. **Add mandatory "Phase state inventory" section** (if product has phases):
   ```markdown
   ## Phase state inventory
   
   ### save-the-date phase
   - Nav: [Praktisch, Over, Kom helpen, Stel een project voor]
   - Hero: "Elk jaar maakt de buurt Plazey. Dit jaar jij ook?" + two CTAs
   - "What is" section: collapsed teaser
   - Programme page: teaser only, no filter UI
   - Volunteer/Project: visible, forms enabled
   
   ### reveal phase
   - Nav: [Programma, Praktisch, Over, Kom helpen]
   - Hero: "Kom langs..." + three CTAs
   - "What is" section: expanded feature blocks
   - Programme page: full grid + filter UI
   
   [etc. for live, aftermovie]
   ```

2. **Add "Form state inventory" section** (if forms exist):
   ```markdown
   ## Volunteer form states
   - Default: empty form, all fields visible
   - Submitted (success): inline success message, button disabled, form cleared
   - Submitted (error): inline error with fallback mailto link
   - Validation: per-field error messages
   ```

### Frontend Wireframe Playbook

**Section: Design tokens & conventions**

1. **Provide boilerplate DESIGN.md + :root template:**
   ```markdown
   # Design tokens
   Wireframe phase. Placeholder grayscale values; huisstijl replaces via :root swap.
   
   | Token | Wireframe | Use |
   |---|---|---|
   | `--color-text` | `#111827` | Body text, primary button |
   | `--color-surface` | `#ffffff` | Default background |
   | `--radius` | `0.375rem` | Single radius everywhere |
   | `--section-y-sm` | `3rem` | Mobile section padding |
   ```
   + global.css :root block with all variables

2. **Enforce token usage in @layer components:**
   - All buttons use `var(--color-text)` + `var(--radius)`, never hardcoded values
   - All section padding uses `.section` class (applies `--section-y-*`), never inline `py-N`
   - All focus rings use `var(--color-text)`, never `focus:ring-blue-*`
   - All text colours use `var(--color-text*)`, never `text-gray-*`

3. **Update CLAUDE.md checklist:**
   ```markdown
   ## Tokens & conventions
   - [ ] All colour values in :root (never hardcoded)
   - [ ] All spacing from approved scale (1, 2, 3, 4, 6, 8, 12, 16, 24)
   - [ ] All section padding via `.section` class
   - [ ] All buttons via `.btn-primary`, `.btn-ghost`, `.btn-text`
   - [ ] Single radius value project-wide (rounded-md or rounded-xl)
   - [ ] Focus ring pattern consistent (outline + outline-offset)
   ```

**Section: State rendering & phase-conditional content**

1. **Provide a conditional-rendering template:**
   ```astro
   // src/config/site.ts
   export const SITE_PHASE = 'reveal'; // 'save-the-date' | 'reveal' | 'live' | 'aftermovie'
   
   // Page component
   import { SITE_PHASE } from '../config/site.ts';
   
   {SITE_PHASE === 'save-the-date' && <Button>Kom helpen</Button>}
   {SITE_PHASE === 'reveal' && <Button>Bekijk programma</Button>}
   {SITE_PHASE === 'live' && <Button>Zie wat er vandaag speelt</Button>}
   ```

2. **Rule: No hidden states behind toggles.**
   - Every phase variant must be visible in a reviewable view or URL
   - Suggestion: `/preview` index listing all phases with a phase selector
   - Alternative: hardcode phase value in dev, build multiple static outputs per phase

3. **Update banned patterns list:**
   - Never: `<!-- TODO: add phase-gating when needed -->`
   - Never: production code with commented-out phase variants
   - Always: all phases rendered or explicitly marked `<!-- not required in this phase -->`

**Section: Form patterns (async submission)**

1. **Provide async form handler template:**
   ```javascript
   // Async form with success/error feedback
   const forms = document.querySelectorAll('[data-form]');
   forms.forEach(form => {
     form.addEventListener('submit', async (e) => {
       e.preventDefault();
       const button = form.querySelector('button[type="submit"]');
       button.disabled = true;
       const feedback = form.querySelector('[aria-live]') || createFeedbackRegion();
       try {
         const res = await fetch('/', { method: 'POST', body: new FormData(form) });
         feedback.textContent = res.ok ? 'Success! We\'ll be in touch.' : 'Error. Try again or email us.';
         if (!res.ok) form.reset(); button.disabled = false;
       } catch (err) {
         feedback.innerHTML = `Error submitting form. <a href="mailto:contact@...">Email us instead.</a>`;
         button.disabled = false;
       }
     });
   });
   ```

2. **Require aria-live region in forms:**
   - Always: `<div aria-live="polite" aria-atomic="true" id="form-feedback"></div>` near form
   - Populate on success/error with actionable message
   - Test with screenreader

3. **Update CLAUDE.md:**
   ```markdown
   ## Forms
   - [ ] Netlify Forms: each form has `name="..."` and `data-netlify="true"`
   - [ ] Async submission: `[data-form="..."]` selector, `fetch()` handler
   - [ ] Feedback: aria-live region shows success/error/validation messages
   - [ ] Fallback: error message includes mailto link for JS-disabled users
   - [ ] Validation: per-field HTML5 validation, plus optional client-side rules
   ```

**Section: Component patterns — add Partners logo band**

```astro
<!-- src/components/Partners.astro -->
---
interface Props { images: ImageMetadata[] }
const { images } = Astro.props;
---
<section class="section border-t border-[var(--color-border)]">
  <Container>
    <h3>With support from</h3>
    <ul class="partners-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-8">
      {images.map(img => (
        <li>
          <Image src={img} alt="" aria-label={img.alt} />
        </li>
      ))}
    </ul>
  </Container>
</section>

<style>
  .partners-grid { /* equal-width columns, grayscale applied globally */ }
</style>
```

**Section: Accessibility checklist**

Add mandatory checks:

- [ ] Skip link to `#main-content` in layout
- [ ] Focus ring: `:focus-visible { outline: 2px solid var(--color-text); outline-offset: 2px; }`
- [ ] Reduced motion: `@media (prefers-reduced-motion: reduce) { * { animation-duration: 0.01ms !important; } }`
- [ ] Forms with async: aria-live region for feedback + mandatory labels
- [ ] Images: alt text always (never empty unless decorative + role="img" + aria-label)
- [ ] Buttons: min 44px height, sufficient contrast, disabled state visible
- [ ] Links: underline always (never colour-only), visited state distinct
- [ ] Headings: proper nesting (h1 → h2 → h3), never skip levels

---

## Conclusions

The gap between the playbooks and the final wireframe is **not a playbook failure** — it's a testament to how detailed Skeleton work surfaced real structure & interaction decisions that weren't codified in the frontend wireframe playbook template.

**Top 3 amendments that would have compressed the delta:**

1. **Skeleton template requires a phase state inventory** (if phases exist). This single addition would have surfaced save-the-date / reveal / live / aftermovie rendering rules upfront.

2. **Frontend wireframe provides design token boilerplate + enforcement** (DESIGN.md + :root + @layer). This removes guesswork and makes token-to-huisstijl handoff friction-free.

3. **Frontend wireframe requires explicit conditional rendering pattern** for all Skeleton-listed states. The playbook already says "render every state" — it just needs to specify *how* for multi-phase products and provide the template.

None of these changes require new planes or fundamental restructuring. They're template and checklist additions that fold post-playbook discoveries back into reusable patterns.

---

**Audit date:** 2026-04-22  
**Auditor:** Claude Code  
**Site:** Plazey festival (NL+FR, Astro 6, Netlify)  
**Playbook versions:** Frontend wireframe (Apr 12), UX planning (Apr 12)  
**Commit range:** 23d5ea1 (wireframe baseline) → 4159a12 (HEAD)

