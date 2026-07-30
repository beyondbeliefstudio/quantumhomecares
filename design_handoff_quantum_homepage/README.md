# Handoff: Quantum Home Cares — Marketing Landing Page

## Overview
A single-page marketing site for **Quantum Home Cares, LLC**, a New Jersey in-home senior care agency owned and operated by Marvalyn Ellis. The page sells advocacy-led, personalized home care to three audiences at once: seniors researching for themselves, adult children / spouses arranging care for a parent, and referral professionals (hospital discharge planners, case managers, social workers).

There is exactly **one page**. Every nav item, button, and footer link is an in-page anchor (`#services`, `#approach`, `#who`, `#how`, `#professionals`, `#about`, `#news`, `#contact`, `#top`) or a `tel:` / `mailto:` / one external press link. **Do not create routes or internal pages** — additional pages come in a later phase.

Primary conversion is the **contact form** at `#contact` (to be wired to the client's CRM). The phone number remains as a secondary path.

## About the Design Files
The files in `design-reference/` are **design references authored in HTML**, not production code. `Quantum Homepage.dc.html` is a prototype built in a proprietary streaming-component format (`<x-dc>` template + a `Component extends DCLogic` class + `{{ }}` interpolation holes) — **do not port that runtime**. Read it as a visual and behavioral spec: markup structure, exact inline styles, copy, and interaction logic.

Rebuild it in the target **Astro starter template** using that project's established conventions (Astro components, its CSS approach, its image pipeline). `quantum-tokens.css` IS production-ready and is meant to be dropped in as `src/styles/tokens.css`.

Suggested Astro structure (adapt to the starter's conventions):

```
src/
  styles/tokens.css            ← from design-reference/quantum-tokens.css, verbatim
  layouts/BaseLayout.astro     ← <head>, fonts, tokens import, body resets, header, footer
  pages/index.astro            ← composes the sections in order
  components/
    SiteHeader.astro           ← sticky glass header + logo swap + mobile menu
    Hero.astro
    CredentialBand.astro
    WhyFamilies.astro
    Services.astro
    PhotoStrip.astro
    Approach.astro
    QuoteBanner.astro
    WhoWeHelp.astro
    HowItWorks.astro
    ForProfessionals.astro
    Coverage.astro
    Standards.astro
    About.astro
    InTheNews.astro
    Faq.astro
    ContactForm.astro
    SiteFooter.astro
```

## Fidelity
**High fidelity.** Colors, type sizes, spacing, radii, and motion values in the reference are final and intentional. Recreate them exactly; use the token variables rather than re-deriving values. Where the reference uses inline styles, that is an artifact of the prototype format — move them into whatever styling approach the Astro starter uses, preserving values 1:1.

Two caveats:
- All photography is **placeholder stock** (see [Assets](#assets)).
- The founder portrait is a placeholder with a visible "PLACEHOLDER HEADSHOT" chip. Remove the chip when the real photo lands.

---

## Design Tokens

Use `design-reference/quantum-tokens.css` verbatim. Highlights actually used on this page:

### Color
| Token | Hex | Usage on this page |
|---|---|---|
| `--qhc-paper` | `#F9F6F1` | page background (warm linen, never white) |
| `--qhc-white` | `#FFFFFF` | all cards, form panel, news card |
| `--qhc-navy-900` | `#0A2C4C` | headings, strong body emphasis |
| `--qhc-navy-800` | `#14508C` | links, secondary button fill, service icons |
| `--qhc-navy-300` | `#9CC7F0` | card hover borders, comparison panel border, big numerals in Who We Help |
| `--qhc-navy-200` | `#C4DDF4` | icon-circle borders |
| `--qhc-navy-100` | `#DBE9F7` | eyebrow pills, icon circles, band gradient top |
| `--qhc-navy-050` | `#EDF4FB` | contact section background, comparison "us" panel |
| `--qhc-ember-700` | `#5C4838` | eyebrow pill text, "Quantum" labels, **credential band background** |
| `--qhc-ember-600` | `#7B614E` | primary CTA fill, ✓ marks, step numerals |
| `--qhc-ember-300` | `#D5C6B5` | underline accent in the Approach headline |
| `--qhc-ink-900` | `#12181D` | body base |
| `--qhc-ink-700` | `#2E363D` | paragraph copy |
| `--qhc-slate-600` | `#575F68` | meta, captions, "Most agencies" column |
| `--qhc-hairline` | `#DFD9CE` | **the** structural line — all card borders, section rules |
| `--qhc-hairline-strong` | `#C8BFB0` | form input borders |

Two tinted band gradients repeat across the page (Services, How It Works, Standards):
```css
/* band flowing down into paper */
linear-gradient(180deg, var(--qhc-navy-100) 0%, rgba(214,231,246,0.42) 55%, var(--qhc-paper) 100%)
/* band flowing up out of paper */
linear-gradient(180deg, var(--qhc-paper) 0%, rgba(214,231,246,0.42) 45%, var(--qhc-navy-100) 100%)
```
Each tinted band has `border-top` and `border-bottom` of `1px solid var(--qhc-hairline)`.

### Typography
- **Display:** Gambetta (variable woff2 included in `design-reference/fonts/`; `@font-face` already declared at the top of `quantum-tokens.css`). Used at **weight 400** on this page.
- **Text:** Hanken Grotesk via Google Fonts, weights 400 / 500 / 600:
  `https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600&display=swap`
- Body base: `17px / 1.6`, color `--qhc-ink-900`.

| Role | Spec |
|---|---|
| Section h2 | Gambetta 400, `clamp(34px, 3.4vw, 48px)`, lh `1.08`, **`letter-spacing: -3px`**, `--qhc-navy-900` |
| Smaller section h2 (FAQ, News) | Gambetta 400, `clamp(30px, 3vw, 42px)`, lh `1.1`, `-3px` |
| Contact h2 | Gambetta 400, `clamp(38px, 4vw, 56px)`, lh `1.06`, `-3px` |
| News card h3 | Gambetta 400, `clamp(28px, 2.5vw, 36px)`, lh `1.12`, `-1.5px` |
| Card h3 | Hanken 600, `20–21px`, lh `1.25`, `--qhc-navy-900` |
| Lead paragraph | Hanken 400, `18px`, lh `1.62`, `--qhc-ink-700` |
| Card paragraph | Hanken 400, `17px`, lh `1.6`, `--qhc-ink-700` |
| Meta / captions | Hanken 400–500, `15–16px`, `--qhc-slate-600` |
| Eyebrow pill | Hanken 600, `13px`, `letter-spacing: 0.08em`, uppercase, `--qhc-ember-700` |

Global wrap rules (ship these):
```css
h1, h2, h3, h4, blockquote, summary, figcaption { text-wrap: balance; }
p, li { text-wrap: pretty; }
```

### Layout & geometry
- Content container: `max-width: 1360px; margin: 0 auto;`
- Horizontal gutter: `56px`
- Section rhythm: `padding-top: 128px` for plain sections; tinted bands use `margin-top: 128px` + inner `padding: 104px 56px`
- Radii: `--qhc-radius-sm: 10px` (inputs) · `--qhc-radius: 16px` (cards) · `--qhc-radius-lg: 24px` (image plates, comparison panels, news card) · `--qhc-radius-pill: 999px` (buttons, badges) · `--qhc-radius-circle: 50%` (icon circles)
- **No drop shadows anywhere on this page.** Depth is borders + tinted bands only. (Shadow tokens exist but the only one used is the sticky-header shadow below.)
- Anchor offset: `html { scroll-behavior: smooth; }` and `section[id] { scroll-margin-top: 116px; }`

### Motion
- `--qhc-duration-fast: 120ms`, `--qhc-duration-slow: 340ms`, `--qhc-ease-out: cubic-bezier(0.16, 1, 0.3, 1)`
- Entrance keyframe used by hero and scroll reveals:
  ```css
  @keyframes qhc-rise { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }
  ```
- `prefers-reduced-motion: reduce` is already handled inside `quantum-tokens.css` (durations → 1ms, animations neutralized). Keep that block.

---

## Global Chrome

### Sticky header
- `position: sticky; top: 0; z-index: 40;` on a full-width `<header>`; inner bar `max-width: 1360px; min-height: 104px; padding: 12px 40px; display: flex; align-items: center; gap: 28px`.
- **Rest state:** `background: rgba(249,246,241,0.86)`, `backdrop-filter: saturate(1.4) blur(18px)`, `border-bottom: 1px solid transparent`, no shadow.
- **Scrolled state** (past 40px): `background: rgba(249,246,241,0.55)`, `backdrop-filter: saturate(1.6) blur(24px)`, `border-bottom-color: rgba(10,44,76,0.10)`, `box-shadow: 0 18px 40px -30px rgba(10,44,76,0.55)`. Transition `background`, `box-shadow`, `border-color` over `--qhc-duration-slow`.
- **Logo cross-fade:** the logo link is a fixed-height (`56px`) relative box, `222px` wide at rest, `68px` when scrolled (transition `width`, `--qhc-duration-slow`). Two absolutely-positioned images share it: the **wordmark** (`assets/quantum-wordmark.png`, 52px tall, opacity 1 → 0) and the **heart mark** (`assets/quantum-mark.png`, 54px tall, `scale(0.9)` → `scale(1)`, opacity 0 → 1). Both transition opacity over `260ms`, transform over `320ms`. Net effect: full wordmark at the top of the page, compact heart icon once scrolling.
- **Ancestor caution:** the prototype's `<main>` uses `overflow-x: clip` (NOT `hidden`) — `overflow: hidden` on any ancestor kills `position: sticky`. Keep that in mind in the Astro layout.
- Implementation note: the reference toggles state by writing a `data-scrolled="1"` attribute on the header from an `IntersectionObserver` on a 40px sentinel element (plus a `requestAnimationFrame` scroll fallback), with all scrolled styling in CSS keyed on that attribute. Reproduce with a small client-side script — CSS-only `scroll-driven` animations are an acceptable modern alternative if the starter targets evergreen browsers.
- Nav (desktop): `Services · Our Approach · Who We Help · How It Works · For Professionals · About` — 16px/500, `--qhc-ink-900`, `padding: 10px 0`, `border-bottom: 1px solid transparent` → `--qhc-ember-600` on hover. Then a phone pill (navy-100 fill, navy-200 border, 48px min-height, `tel:` link) and the primary **Request care** pill (`--qhc-ember-600` fill, white text, hover `--qhc-ember-700` + `translateY(-1px)`), anchored to `#contact`.
- **Responsive:** desktop nav hides below `1020px`; the phone pill hides below `1180px`. Below `1020px` a 48px circular hamburger button (navy-100 fill, navy-200 border) appears and toggles a full-width drawer below the header bar: `rgba(249,246,241,0.98)` + `blur(18px)`, with 52px-min-height stacked links (all eight anchors), a `Call {phone}` link, and a full-width Request care pill. Links close the drawer on click; resizing back above 1020px closes it. Manage `aria-expanded` and `aria-label` ("Open menu" / "Close menu").

### Footer
`border-top: 1px solid var(--qhc-hairline)`, `background: var(--qhc-paper)`, inner `max-width: 1360px; padding: 64px 56px 40px`. Three stacked rows:
1. Wordmark (44px tall) on the left; phone (20px/600, navy-900, hover ember-700) and `hello@quantumhomecares.com` (17px, navy-800) on the right. `flex-wrap: wrap; justify-content: space-between; gap: 32px 48px`.
2. Anchor row (`Services, Our Approach, Who We Help, How It Works, For Professionals, About, Request Care`) — 16px, `--qhc-slate-600`, hover `--qhc-ember-700`; `padding: 32px 0; margin-top: 32px;` with hairline top **and** bottom.
3. Legal row, 15px `--qhc-slate-600`, space-between: `© 2026 Quantum Home Cares, LLC · Serving all of New Jersey` / `NJ Health Care Service Firm HP0426700 · Insured and bonded`.

No Privacy/Accessibility links yet — those pages don't exist. Add them when the pages ship.

---

## Sections, in order

All copy below is final. Section IDs are the anchor targets.

### 1. Hero — `#top`
`max-width: 1360px; padding: 84px 56px 40px; position: relative`. Decorative blue glow behind the imagery: absolutely positioned `720×720` circle at `top: -140px; right: -180px`, `border-radius: 50%`, `background: radial-gradient(circle at 50% 50%, var(--qhc-navy-100) 0%, rgba(214,231,246,0.45) 46%, rgba(214,231,246,0) 72%)`, `pointer-events: none`.

Two-column grid `6fr 5fr`, `gap: 64px`, `align-items: center`.

- **Left** (`animation: qhc-rise 700ms var(--qhc-ease-out) both`): eyebrow pill "In-Home Senior Care Across New Jersey"; h1; lead paragraph; a CTA row with the primary ember pill → `#contact` and a secondary link. (No feature pills here — they were deliberately removed as redundant with the credential band directly below.)
- **Right** (`animation: qhc-rise 900ms ... 120ms both`, `position: relative`): primary portrait plate `aspect-ratio: 4/5`, `border-radius: var(--qhc-radius-lg)`, `overflow: hidden`, `margin-left: 12%`. Overlapping secondary square plate: `position: absolute; left: -12%; bottom: -40px; width: 42%; aspect-ratio: 1/1`, same radius, `border: 8px solid var(--qhc-paper)` (creates the cut-out effect against the page).

### 2. Credential band (brown, full-bleed)
`margin-top: 72px; background: var(--qhc-ember-700)` (#5C4838). Inner `max-width: 1360px; padding: 52px 56px`. Grid `repeat(4, minmax(0,1fr))`, `gap: 28px 0`. Each item: `padding: 0 26px` with **`padding-left: 0` on the first** and `border-left: 1px solid rgba(255,255,255,0.28)` on items 2–4 (vertical dividers *between* items). Text `rgba(255,255,255,0.82)` at 16px/1.5; the `<strong>` label is `display: block`, 600, `#fff`.

Responsive (dividers must never strand on a wrapped row):
```css
@media (max-width: 1180px) {
  [credgrid] { grid-template-columns: repeat(2, minmax(0,1fr)); gap: 30px 44px; }
  [cred]     { padding: 0; border-left: 0; }
}
@media (max-width: 620px) { [credgrid] { grid-template-columns: minmax(0,1fr); } }
```

Content: **Licensed and registered** / New Jersey Health Care Service Firm HP0426700 · **Insured and bonded** / Every caregiver screened and background checked · **Advocacy included** / We attend appointments and follow through · **Serving all of New Jersey** / North, Central, and South Jersey.

### 3. Why families reach out
Grid `5fr 6fr`, `gap: 72px`, `align-items: center`. Left: two portrait plates (`aspect-ratio: 3/4`, `--qhc-radius`) in a `1fr 1fr` grid, `gap: 16px`, with the **second offset `margin-top: 48px`** for a staggered feel. Right (`max-width: 58ch`): eyebrow "Why Families Reach Out", h2 "Caring for a parent becomes a second full-time job.", two paragraphs, then the pull-statement card:

> White card, `border: 1px solid var(--qhc-hairline)`, `--qhc-radius`, `padding: 26px 30px`, `display: flex; align-items: center; gap: 22px`. Heart mark at 58px tall, then Gambetta 400 / 26px / lh 1.26 / `-0.8px`, navy-900: **"Quantum Home Cares takes that weight off your family."**

### 4. Services — `#services` (tinted band, gradient down)
Centered header block: `max-width: 76ch; margin: 0 auto 64px; text-align: center`, eyebrow "What We Do" (see *eyebrow-on-band* note), h2 "Complete support, built around one person.", lead paragraph `max-width: 64ch`.

Cards: `grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px`. Each card is the **canonical card**: `background: var(--qhc-white)`, `border: 1px solid var(--qhc-hairline)`, `--qhc-radius`, `padding: 30px 28px 32px`, `display: flex; flex-direction: column; gap: 14px`; hover → `border-color: var(--qhc-navy-300)` + `transform: translateY(-2px)` over `--qhc-duration-fast`.

Each card leads with a **56px icon circle**: `background: var(--qhc-navy-100)`, `border: 1px solid var(--qhc-navy-200)`, `border-radius: 50%`, `display: grid; place-items: center`, holding a 28px inline SVG, `viewBox="0 0 24 24"`, `fill: none`, `stroke: currentColor` (`--qhc-navy-800`), `stroke-width: 1.5`, round caps/joins. The six custom icon paths are in the reference file — **copy them verbatim** (clipboard-with-check, house-with-heart, steaming bowl, car, armchair, crescent moon).

1. **Care Planning and Advocacy** — A custom care plan, and someone in the room at medical appointments who knows the right questions to ask. We coordinate with doctors, follow up on decisions, and make sure nothing falls through.
2. **Daily Living Support** — Personal hygiene assistance, light housekeeping, and laundry. The everyday tasks that get harder over time, handled with dignity and privacy.
3. **Meals, Nutrition, and Wellness** — In-home meal preparation, grocery shopping, and medication reminders. Good nutrition and consistent routines are the foundation of staying independent.
4. **Transportation and Companionship** — Errands, appointments, and time spent together. Isolation is one of the biggest risks to senior health, and one of the easiest to solve.
5. **Respite and Specialized Care** — Coverage so family caregivers can rest, plus closer supervision for seniors who need it. Caring for someone else should not cost you your own health.
6. **Overnight and Live-In Care** — For families worried about the hours nobody is watching. Awake overnight shifts and live-in arrangements, scheduled around how your parent actually sleeps.

### 5. Photo strip
`grid-template-columns: repeat(4, 1fr); gap: 16px`, each `aspect-ratio: 4/5` with `--qhc-radius`. Caption below, 15px `--qhc-slate-600`: "Placeholder photography. Replace with photographs of real clients and caregivers once releases are signed." **Delete the caption when real photography lands.**

### 6. Approach — `#approach`
Centered header (`max-width: 76ch`): eyebrow "Our Approach"; h2 **"Most agencies send help. We `show up and follow through`."** where the highlighted phrase is `color: var(--qhc-ember-700); border-bottom: 2px solid var(--qhc-ember-300)`; lead paragraph `max-width: 64ch` ending "…Here is the difference, line by line."

**Comparison — the one place the unified card style does NOT apply** (client explicitly asked to keep these colors). It is a single grid `grid-template-columns: 1fr 1fr; align-items: stretch` whose **cells alternate left/right so paired rows always align horizontally** — do *not* build it as two independent columns (they drift out of alignment).

- Left cells: `background: var(--qhc-paper)`, `border-left`/`border-right: 1px solid var(--qhc-hairline)`; header cell adds `border-top` and `border-radius: 24px 0 0 0`; last cell adds `border-bottom` and `border-radius: 0 0 0 24px`.
- Right cells: `background: var(--qhc-navy-050)`, borders `1px solid var(--qhc-navy-300)`, mirrored radii (`0 24px 0 0`, `0 0 24px 0`).
- Header cells: `padding: 30px 32px 24px`; body cells `padding: 22px 32px` with a `border-top` in the matching border color.
- Left header: "Most agencies", 20px/600, `--qhc-slate-600`. Right header: heart mark (34px) + "Quantum Home Cares", 20px/600, navy-900.
- Body cells: `grid-template-columns: 20px 1fr; gap: 12px`. Left uses a 20px ✕ glyph stroked `--qhc-slate-600` at `opacity: 0.8`; right uses a ✓ stroked `--qhc-ember-600` at `stroke-width: 2.2`. Then a topic label (13px/600, `0.07em`, uppercase — slate on the left, `--qhc-ember-700` on the right) and the line itself (17px; slate-600 regular left, navy-900 **600** right).

| Topic | Most agencies | Quantum Home Cares |
|---|---|---|
| Who shows up | Whoever is available that day | A caregiver matched to your parent, kept consistent |
| The care plan | Hours logged, then on to the next client | A written plan we build, maintain, and update as needs change |
| The paperwork | Insurance calls and coordination left to you | We handle the calls, the forms, and the follow-through |
| Communication | You hear from them once something goes wrong | We check in before it does, and keep you posted either way |

Closer below, centered, 18px/600 navy-900, `max-width: 52ch; margin: 40px auto 0`: "Advocacy is not an add-on service here. It is the reason this company exists."

### 7. Full-bleed quote
`position: relative; margin-top: 128px; min-height: 620px; display: flex; align-items: flex-end`. Full-bleed cover image, then scrim `linear-gradient(180deg, rgba(10,44,76,0) 30%, rgba(10,44,76,0.72) 100%)`. Text plate `padding: 0 56px 72px`: Gambetta **300**, `clamp(30px, 3vw, 44px)`, lh 1.16, `-0.02em`, `#fff`, `max-width: 26ch` — "Aging at home should not depend on how much fight a family has left."

### 8. Who we help — `#who`
Centered header (`max-width: 72ch`): eyebrow "Who We Help", h2 "Families usually reach us at one of four moments.", lead (`max-width: 62ch`) "Sometimes the senior calls us directly. More often it is an adult child, a spouse, or a discharge planner calling on their behalf. All of it is welcome."

Four canonical cards, `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px`. Each opens with a Gambetta 400 / 34px / lh 0.9 / `-1.5px` numeral in **`--qhc-navy-300`** (`01`–`04`), then h3 (20px/600) and body (17px).

1. **After a hospital stay** — Discharge paperwork, new medications, and follow-up appointments arriving all at once. We take over the coordination and get the home ready before your parent walks back in.
2. **When memory starts changing** — Early dementia and Alzheimer's support built on routine and familiarity, with caregivers trained to redirect rather than correct.
3. **When the family caregiver is worn down** — Respite coverage by the shift, the week, or ongoing, so the adult child holding everything together can sleep, travel, and be a family member again.
4. **When you live too far away** — Eyes in the home and a person on the ground in New Jersey, with regular updates so distance stops feeling like negligence.

### 9. How it works — `#how` (tinted band, gradient up)
Grid `5fr 6fr`, `gap: 72px`, `align-items: center`. Left: portrait plate `aspect-ratio: 5/6`, `--qhc-radius-lg`. Right: eyebrow "Getting Started" (band treatment), h2 "Three steps. No pressure, no obligation.", then three canonical white cards, `gap: 16px`, each `display: grid; grid-template-columns: 52px 1fr; gap: 22px; align-items: start; padding: 26px 28px`. Numeral: Gambetta 400 / **40px** / lh 0.9 / `-2px` / `--qhc-ember-600`.

1. **Tell us what is going on** — Send the form and we respond within one business day. We listen, ask questions, and give you an honest read on what your family needs, at no cost.
2. **We build a plan for your parent** — A visit to the home, an assessment of the real needs and routines, and a written care plan you approve before anything begins.
3. **Care begins, and we stay involved** — We match a caregiver, get started, and stay in regular contact. As needs change, the plan changes with them.

### 10. For care professionals — `#professionals`
Grid `repeat(auto-fit, minmax(420px, 1fr))`, `gap: 56px 72px`, `align-items: start`. Left: eyebrow "For Care Professionals", h2 "A referral partner who closes the loop.", lead (`max-width: 46ch`) "Hospitals, rehab facilities, discharge planners, case managers, and social workers across New Jersey use us to place patients safely at home — and to hear back about what happened next.", then a **secondary** CTA pill → `#contact`: `background: var(--qhc-navy-700)`, white text, 56px min-height, `padding: 0 28px`, hover `--qhc-navy-800` + `translateY(-1px)` — label **"Send a referral"**.

Right: four plain text blocks (no card chrome), `grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 32px 40px`; h3 19px/600 navy-900, body 17px ink-700.

1. **Fast discharge turnaround** — We can assess and staff a home within days of a discharge date, including same-week starts when the situation calls for it.
2. **One point of contact** — You reach the owner directly, not a regional call center. Referrals are acknowledged the same business day.
3. **Reduced readmission risk** — Medication reminders, follow-up appointments, and nutrition handled in the home, so your discharge plan actually gets carried out.
4. **Licensed and documented** — NJ Health Care Service Firm HP0426700. Insured, bonded, background-checked providers, with written care plans on file.

### 11. Coverage
Grid `6fr 5fr`, `gap: 72px`, `align-items: center`. Left: eyebrow "Where We Work", h2 "Care and advocacy statewide, New Jersey.", lead (`max-width: 50ch`) "We serve families across the state, from the northern counties to the shore. If your parent is in New Jersey, we can be in their home." Then a three-column county list, `gap: 22px 40px`, `padding-top: 24px; border-top: 1px solid var(--qhc-hairline)`; each entry a 16px paragraph with a `display: block` 600 navy-900 label:
- **North Jersey** — Bergen, Essex, Morris, Passaic, Hudson, Union
- **Central Jersey** — Somerset, Middlesex, Monmouth, Mercer, Hunterdon
- **South Jersey** — Ocean, Burlington, Camden, Atlantic, Cape May

Right: square image plate `aspect-ratio: 1/1`, `--qhc-radius-lg`.

### 12. Standards (tinted band, gradient down)
Header block `max-width: 48ch; margin-bottom: 48px`: eyebrow "Our Standards" (band treatment), h2 "Six things every caregiver here is held to." Cards: `repeat(auto-fit, minmax(340px, 1fr)); gap: 20px` (caps at 3 across at desktop width), canonical white card style, `padding: 30px 28px`, `gap: 6px`. Each: a Gambetta **300** / 26px / `-0.02em` / `--qhc-navy-800` word, then a 16px ink-700 line.

Care / Personalized attention for every client · Competency / High standards of skill and medical literacy · Commitment / Focused on long-term wellness, not billable hours · Communication / Transparent updates between families and providers · Compassion / Every senior treated with the empathy they deserve · Courage / Advocating firmly in complex medical settings.

### 13. About — `#about`
Grid `6fr 5fr`, `gap: 72px`, `align-items: center`. Left (`max-width: 56ch`): eyebrow **"Meet Marvalyn"**, h2 "One owner. One standard. Every family.", three 18px/1.62 paragraphs, then a byline (16px slate-600, `padding-top: 18px; border-top: 1px solid var(--qhc-hairline)`): "Marvalyn Ellis, Founder · Quantum Home Cares, LLC".

> Marvalyn Ellis founded Quantum Home Cares after 25 years of managing care for her own aging parents while holding down a full-time career. That is where the advocacy model came from: learning the healthcare system by fighting through it, and seeing what happens to families with no one in their corner.
>
> She still owns and runs the company herself. Marvalyn handles the intake call, the in-home assessment, the care plan, and the scheduling, then matches a vetted care provider to the home. National agencies route you through a call center. Here, the person who plans your parent's care is the person who answers the phone.
>
> Every care provider is selected the way she would select someone to care for her own mother. That standard does not move, and it is why families stay.

Right: portrait plate `aspect-ratio: 4/5`, `--qhc-radius-lg`, with an absolutely-positioned chip at `left: 16px; bottom: 16px` — `rgba(255,255,255,0.9)`, pill radius, 13px/600 slate-600, "PLACEHOLDER HEADSHOT". **Remove the chip with the real photo.**

### 14. In the news — `#news`
Centered header (`max-width: 62ch`): eyebrow "In the News", h2 "Coverage of our New Jersey launch".

One press card, and the whole card is the link: `<a href="https://www.homecaremag.com/news/quantum-home-cares-opens-new-jersey-location" target="_blank" rel="noopener">` styled `display: grid; grid-template-columns: 5fr 7fr; align-items: stretch; background: var(--qhc-white); border: 1px solid var(--qhc-hairline); border-radius: var(--qhc-radius-lg); overflow: hidden; text-decoration: none`; hover `border-color: var(--qhc-navy-300)` + `translateY(-2px)`.
- Left: image cell `position: relative; min-height: 340px` with an absolutely-positioned cover image.
- Right: `padding: 44px 48px; gap: 18px`. A meta row with a navy-100 pill "HomeCare Magazine" (13px/600, `0.06em`, uppercase, navy-800) plus "Industry press" (15px slate-600); the h3 headline "Quantum Home Cares Opens New Jersey Location"; a 17px dek; then a `margin-top: auto` link affordance: "Read the article" 16px/600 `--qhc-ember-700` with an 18px arrow SVG.

Dek: "HomeCare Magazine covers our launch and the model behind it: personalized, advocacy-led care for New Jersey seniors, built around one family at a time rather than a national playbook."

### 15. FAQ
Grid `4fr 7fr`, `gap: 72px`, `align-items: start`. Left: h2 "Questions families ask first". Right: accordion, `gap: 12px`, built on native `<details>`/`<summary>` — white, `1px solid var(--qhc-hairline)`, `--qhc-radius`, `padding: 4px 24px`; first item `open`.
- `<summary>`: `display: flex; justify-content: space-between; gap: 20px; padding: 18px 0; cursor: pointer; font-size: 18px; font-weight: 600;` navy-900, `list-style: none` (plus `summary::-webkit-details-marker { display: none }`).
- Toggle glyph: a 30px navy-100 circle with a `+` (18px/500, navy-800). When open: `background: var(--qhc-navy-700); color: #fff; transform: rotate(45deg)` (becomes an ✕), transitioning `transform 220ms cubic-bezier(0.16,1,0.3,1)`, `background`/`color` 220ms ease.
- Answer: 16px/1.6 ink-700, `padding: 0 0 20px`, `max-width: 62ch`.

1. **What is the minimum commitment?** — There is no long contract. We start with the schedule your parent needs and adjust month to month.
2. **How quickly can care start?** — In most cases within a few days of the assessment, and faster for hospital discharges.
3. **What if my parent refuses help?** — Common, and expected. We start small, often with companionship or errands, and let trust build before adding personal care.
4. **Will it be the same caregiver?** — Yes, with a named backup who already knows the care plan for vacations and sick days.

### 16. Contact — `#contact`
`margin-top: 128px; border-top: 1px solid var(--qhc-hairline); background: var(--qhc-navy-050)`. Inner `padding: 96px 56px`, grid `6fr 5fr`, `gap: 80px`, `align-items: start`.

Left: h2 "Tell us about your parents." (`max-width: 20ch`), lead (`max-width: 46ch`) "Send us the situation and we will respond within one business day with an honest read on what is needed. Families, seniors, and referring professionals all use this form. No cost, no commitment, no pressure.", a `16/10` image plate (`--qhc-radius-lg`), then 16px slate-600: "Prefer to talk? Call **{phone}** or email **hello@quantumhomecares.com**." (both links navy-800/600).

Right: `<form>` panel — white, `1px solid var(--qhc-hairline)`, `--qhc-radius-lg`, `padding: 36px`, `display: flex; flex-direction: column; gap: 18px`. Eyebrow pill "Request a free consultation". Fields (labels 15px/600 ink-900, `gap: 7px`):

| Field | Type | Notes |
|---|---|---|
| Your name | text | full width |
| Phone / Email | tel / email | side by side, `1fr 1fr`, `gap: 16px` |
| Care is for | select | A parent · A spouse · Myself · Someone else · A patient I am referring |
| County in New Jersey | text | paired with the select above |
| When would care start? | select | As soon as possible · Within a few weeks · Planning ahead · Not sure yet |
| What is going on *(optional)* | textarea rows=3 | `resize: vertical` |

Inputs/selects: `min-height: 52px; padding: 0 16px; font-size: 17px; font-family: inherit; background: var(--qhc-white); border: 1px solid var(--qhc-hairline-strong); border-radius: var(--qhc-radius-sm)`. Textarea: `padding: 12px 16px; line-height: 1.55`. **Focus:** `border-color: var(--qhc-ember-600); box-shadow: var(--qhc-focus-ring); outline: none`.

Submit: full-width pill, `min-height: 56px`, `--qhc-ember-600` fill, white 17px/600, hover `--qhc-ember-700`, focus ring — label **"Send request"**. Below it, 15px slate-600: "We respond within one business day. Please leave out medical details — we will gather what we need when we speak."

---

## Interactions & Behavior

| Behavior | Spec |
|---|---|
| In-page nav | Smooth scroll via `html { scroll-behavior: smooth }`; `section[id] { scroll-margin-top: 116px }` clears the sticky header. |
| Sticky header | State flips past 40px of scroll (see *Sticky header*). Prefer an IntersectionObserver sentinel over a scroll listener. |
| Logo swap | Wordmark ⇄ heart mark cross-fade tied to the same scrolled state. |
| Mobile menu | Toggle below 1020px; closes on link click and on resize above the breakpoint. |
| Card hover | `border-color → var(--qhc-navy-300)`, `transform: translateY(-2px)`, `--qhc-duration-fast`. Applies to service, who-we-help, and the news card. |
| Button hover | Ember pill → `--qhc-ember-700`; navy pill → `--qhc-navy-800`; both `translateY(-1px)`. |
| FAQ accordion | Native `<details>`; glyph rotates 45° and inverts to navy-700/white when open. Multiple can be open. |
| Scroll reveals | Sections fade/rise in with `qhc-rise` via IntersectionObserver in the prototype. Keep it subtle; respect `prefers-reduced-motion`. |
| Form submit | Prototype calls `preventDefault()`. **Wire to the client's CRM** — see below. |
| Reduced motion | Handled by the media query already in `quantum-tokens.css`. |

### Eyebrow pills on tinted bands
The default eyebrow is `background: var(--qhc-navy-100); color: var(--qhc-ember-700)`. On the three tinted-blue bands (Services, How It Works, Standards) that pill disappears into the background, so those three use `background: var(--qhc-white); border: 1px solid var(--qhc-navy-300)` instead. Preserve both variants. Common properties: `display: inline-flex; align-items: center; min-height: 32px; padding: 0 14px; border-radius: var(--qhc-radius-pill); font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase; font-weight: 600`. When a pill sits in a CSS **grid** cell, add `justify-self: start` (`align-self: flex-start` does nothing there and the pill stretches full-width).

## State Management
Almost none — this is a static marketing page.
- `scrolled: boolean` — header/logo state.
- `menuOpen: boolean` — mobile drawer.
- `<details>` open state — native, no JS.
- Form field values + submission state (`idle | submitting | success | error`) once the CRM is wired.

### Form / CRM wiring (needed before launch)
The client's requirement was to route **all** conversion through the form rather than phone calls. Implement per the Astro starter's conventions (Astro server endpoint / form action / the client's CRM webhook):
- Required: name, one of phone/email, county, "care is for", timing. Optional: the note.
- Validate email/phone format client-side; show inline errors in `--qhc-error-700` with the same 15px/600 label type.
- Success: replace the form body with a confirmation echoing "We respond within one business day."
- Add spam protection (honeypot or the starter's preferred method) and a hidden source field so referral-professional submissions can be segmented — the "A patient I am referring" option in **Care is for** is the signal.

## Assets

### Logo (in `assets/`, from the client's original lockup)
- `quantum-wordmark.png` — "QUANTUM HOME CARES" wordmark, used in the header at rest (52px tall) and in the footer (44px).
- `quantum-mark.png` — the heart-with-people icon, used as the scrolled header logo (54px), in the Approach comparison header (34px), and in the section-3 pull-statement card (58px).
- `quantum-logo-full-lockup.png` — the original combined lockup, for reference only (not used on the page).

These are **raster crops** of the supplied artwork. **Ask the client for vector (SVG) versions of both the mark and the wordmark before launch** and swap them in — the header logo scales and will show softness on high-DPI displays.

### Fonts
- `design-reference/fonts/Gambetta-Variable.woff2` / `.woff` (+ italic variants). `@font-face` rules are at the top of `quantum-tokens.css` — adjust the `src:` paths to the Astro public/asset path. Confirm the client holds a valid Gambetta web license.
- Hanken Grotesk via Google Fonts (`preconnect` to `fonts.googleapis.com` and `fonts.gstatic.com`, then the stylesheet link).

### Photography — ALL PLACEHOLDER
Every photo is an Unsplash URL with an `?auto=format&fit=crop&q=70&w…&h…` query. They are **stand-ins for licensed stock the client will supply** (the client confirmed stock photography, not a shoot). Replace all of them, run them through the Astro image pipeline, and keep the alt text descriptive.

| Where | Unsplash photo ID | Intended subject |
|---|---|---|
| Hero, primary plate | `photo-1566616213894-2d4e1baee5d8` | Smiling senior woman at home |
| Hero, inset square | `photo-1508963493744-76fce69379c0` | Older couple sitting together outdoors |
| Why families, plate 1 | `photo-1543333995-a78aea2eee50` | Caregiver walking with a senior client |
| Why families, plate 2 | `photo-1616286608358-0e1b143f7d2f` | Senior woman smiling |
| Photo strip | `photo-1513159446162-54eb8bdaa79b`, `photo-1559234938-b60fff04894d`, `photo-1584515933487-779824d29309`, `photo-1532329683184-6ffd13057d1c` | chess; couple walking; hands; couple outdoors |
| Full-bleed quote | `photo-1554331292-735256644d5f` | Senior couple walking a path |
| How it works | `photo-1587556930720-58ec521056a5` | Senior woman at home |
| Coverage | `photo-1508963493744-76fce69379c0` | Older couple outdoors |
| About | `photo-1526795443948-005b48ce4791` | **Placeholder founder portrait — replace with Marvalyn's headshot** |
| In the news | `photo-1543333995-a78aea2eee50` | Caregiver with a senior client |
| Contact | `premium_photo-1663090054202-8835fa45fd77` | Caregiver talking with a senior woman |

Note the strip caption and the About chip both explicitly label the placeholders — delete both once real imagery is in.

### Icons
All inline SVG, 24×24 viewBox, `stroke: currentColor`, `fill: none`. No icon library needed. Copy the paths from the reference: six service icons, ✕/✓ comparison marks, the news arrow, and the hamburger.

## Content facts (for copy edits — do not contradict)
- Service area: **all of New Jersey** (North, Central, South). Not a single county.
- License: **NJ Health Care Service Firm HP0426700**; insured and bonded.
- **Marvalyn Ellis** is the sole owner. She personally handles admin, intake, booking, planning, and scheduling; **care providers** deliver the hands-on service. Never imply a large staff or a call center.
- Audiences: seniors themselves, adult children / spouses / caretakers, **and** institutions — hospitals, discharge planners, social workers, case managers.
- Care structures: **hourly, self pay, and live-in** (plus awake overnight). The "Paying for care" section that listed insurance/VA/Medicaid was **intentionally removed** — do not reinstate it without the client's word.
- Positioning: more personalized than national agencies; a personal, compassionate touch.
- Press: HomeCare Magazine, "Quantum Home Cares Opens New Jersey Location".
- Testimonials were **intentionally removed** (no approved quotes yet). A `showFaq` flag exists in the prototype to hide the FAQ; the FAQ ships visible.

## Known gaps before go-live
1. Real photography + Marvalyn's headshot (remove both placeholder labels).
2. Vector logo files.
3. CRM form integration + spam protection.
4. Confirm `hello@quantumhomecares.com` and the phone number are live and monitored.
5. Privacy Policy / Accessibility pages (footer links are deliberately absent until they exist).
6. Favicon, OG/Twitter meta, `LocalBusiness` + `MedicalBusiness` JSON-LD schema (name, license, service area, phone, URL), sitemap, analytics.
7. Accessibility pass: heading order, focus-visible on every interactive element (the ember focus ring is defined), drawer focus trap, `prefers-reduced-motion` verified, AA contrast on the brown band (white on `#5C4838` passes; the `0.82` alpha body text should be re-verified after any color tweak).

## Files
```
design_handoff_quantum_homepage/
├── README.md                                  ← this document
├── assets/
│   ├── quantum-mark.png                       ← heart icon
│   ├── quantum-wordmark.png                   ← wordmark
│   └── quantum-logo-full-lockup.png           ← original lockup (reference)
├── screenshots/                               ← 19 desktop captures, top → bottom
│   ├── 01-hero-top.png                        ← header at rest (full wordmark)
│   ├── 02-hero-credential-band.png
│   ├── 03-why-families-reach-out.png
│   ├── 04-services-header.png
│   ├── 05-services-cards.png
│   ├── 06-photo-strip.png
│   ├── 07-approach-header.png
│   ├── 08-approach-comparison.png
│   ├── 09-full-bleed-quote.png
│   ├── 10-who-we-help.png
│   ├── 11-how-it-works.png
│   ├── 12-for-care-professionals.png
│   ├── 13-coverage.png
│   ├── 14-standards.png
│   ├── 15-about-marvalyn.png
│   ├── 16-in-the-news.png
│   ├── 17-faq.png
│   ├── 18-contact-form.png
│   └── 19-footer.png
└── design-reference/
    ├── Quantum Homepage.dc.html               ← THE design reference (open in a browser)
    ├── quantum-tokens.css                     ← production-ready tokens; ship as src/styles/tokens.css
    ├── support.js                             ← prototype runtime; DO NOT port
    ├── image-slot.js                          ← prototype helper; DO NOT port
    └── fonts/                                 ← Gambetta variable woff2/woff (+ italic)
```

Open `design-reference/Quantum Homepage.dc.html` directly in a browser to see the design live, including the sticky header, logo swap, hover states, and accordion.
