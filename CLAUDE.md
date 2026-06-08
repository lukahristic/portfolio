# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
npm run dev        # dev server at localhost:4321
npm run build      # production build to ./dist/
npm run preview    # preview the production build locally
npx astro check    # TypeScript type-check all .astro files
```

## Stack

- **Astro** (static-first, single-page) + **TypeScript** (strict mode)
- **Tailwind CSS v4** (inline `@theme` tokens in `global.css`, no `tailwind.config.*`)
- **Lenis** for smooth scroll; no GSAP, no heavy animation libraries
- **No React/Vue/Svelte** — all components are `.astro` files

## Architecture

**Single page:** `src/pages/index.astro` composes every section in narrative order:
`Nav → Opening → ProofGlance → SpottrStudy → EcommerceStudy → Process → Lab → Close`

**Layout** (`src/layouts/Layout.astro`) owns all `<head>` meta (OG, Twitter, canonical), injects the JS flag (`html.js`), and bundles the single motion script — Lenis smooth scroll, reveal-on-scroll, before/after wipe, and Spottr chapter scrollspy. All JS lives in one `<script>` block there.

**Design tokens** live in `src/styles/global.css` under `@theme`. Color, type, spacing, and motion variables are all defined there. Tailwind utilities resolve against these tokens (e.g. `bg-paper`, `text-ink`, `text-accent`).

**Experiments data** (`src/data/experiments.ts`) is the single source of truth for the Lab section. Add experiments there; `Lab.astro` and `ExperimentCard.astro` render from it automatically.

## Motion system

Every animation must pass the gate: **"does this make the thinking clearer, or just look cool?"** Cool-only → Lab section only.

- **Reveals:** add `data-reveal` to any element; add `data-reveal-delay="1"` through `"4"` for stagger. CSS hides them (`html.js` flag required); IntersectionObserver adds `.is-visible`.
- **Before/after wipe:** add `data-ba` to a figure with `.ba__before` / `.ba__after` / `.ba__handle` / `.ba__caption` children. JS adds `.ba--wipe` to upgrade from side-by-side to wipe mode.
- **Spottr chapter marker:** add `data-beat="Label"` to section beats; `.spottr-marker [data-beat-label]` updates via scrollspy.
- **Parallax:** CSS-only via `animation-timeline: scroll()` (progressive enhancement — only fires on `pointer: fine` + motion allowed).
- All motion respects `prefers-reduced-motion` — never skip this check.

## Content architecture

Sections answer the visitor's evolving silent question in order:

1. **Opening** — "who is this?"
2. **ProofGlance** — "can they actually do anything?"
3. **SpottrStudy** — "how do they think?" (product judgment — heart of site)
4. **EcommerceStudy** — "how do they think?" (technical credibility)
5. **Process** — "is this real?"
6. **Lab** — "are they still growing?"
7. **Close** — "what now?"

**Order is load-bearing.** Don't reorder sections. Evidence before narrative; narrative before method; lab near end so it never undercuts serious work above.

## Key conventions

- `BASE_URL` in `Layout.astro` must be updated to the real Vercel URL before launch (currently a placeholder).
- `section[id]` elements get `scroll-margin-top: 4rem` automatically to clear the fixed nav.
- The `html.js` class is set synchronously in `<head>` so no-JS users never see hidden elements flash.
- Experiment `writeupHref` is `undefined` until a write-up exists — the card shows "Write-up coming" as the fallback.
- Spottr screenshots (`src/assets/spottr/`) are before/after pairs: `*-old.*` = original dark premium design; `*-new.*` = warm redesign. They are the centerpiece of the case study.
