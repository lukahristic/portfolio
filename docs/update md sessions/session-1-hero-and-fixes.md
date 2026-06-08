# Portfolio Update — Session 1: Hero Rewrite + Quick Fixes

## Context for Claude Code

You are working on Wency's portfolio site. Read `CLAUDE.md` in the repo root before touching any file. The stack is Astro + Tailwind CSS v4 + TypeScript. Single-page site. All sections are composed in `src/pages/index.astro`. Design tokens live in `src/styles/global.css`.

This session has two parts: rewrite the hero section copy and apply four quick fixes. Do not touch any other sections.

---

## Part A — Hero Section Rewrite

### File to edit
`src/pages/index.astro` — find the Opening/Hero section (it contains the `#top` anchor and the current headline).

### What to change

**Current headline:**
```
I don't wait for permission to build.
```

**New headline:**
```
I direct AI to ship production software. The judgment is mine.
```

**Current subheadline/descriptor line:**
```
Product Builder & Software Engineer · Manila, PH · Open to remote
```

**New descriptor line (keep same styling, same position):**
```
Software Engineer · AI-assisted builder · Manila, PH · Open to remote
```

**Current body paragraph (the one starting "I build thoughtful..."):**
```
I build thoughtful, production-ready software and leverage AI-assisted
engineering to move from idea to deployment efficiently.
```

**New body paragraph:**
```
I read the docs, write the brief, make the call. AI handles execution.
The result is production-ready software — architected deliberately,
shipped without waiting for permission.
```

### Rules
- Preserve all existing HTML structure, class names, and Tailwind utilities exactly.
- Only change the text content inside the existing elements.
- Do not add new elements, wrappers, or classes.
- Do not change the CTA buttons ("See the work" and "Download résumé").

---

## Part B — Quick Fixes

### Fix 1: Footer source link

**File:** `src/pages/index.astro` (footer section at the bottom)

**Current:**
```
Source
```
linking to `https://github.com/lukahristic/portfolio`

**Action:** Verify the href is `https://github.com/lukahristic/portfolio`. If it already points there, no change needed. If it points to any other repo or user, correct it to `https://github.com/lukahristic/portfolio`.

---

### Fix 2: Spottr status tag

**File:** `src/pages/index.astro` or wherever the Spottr case study status badge is rendered (look for "Launching" text near the Spottr section).

**Current tag text:**
```
Launching
```

**New tag text:**
```
Beta · Launching soon
```

Keep the same element, same classes, same styling. Text change only.

---

### Fix 3: Ecommerce section copy reframe

**File:** `src/pages/index.astro` — find the EcommerceStudy section.

Find this paragraph (or closest match):
```
This project isn't a product. Nobody's buying anything through it.
It exists to answer one question any technical screener will have:
can I understand how a real application is assembled and shipped?
```

**Replace with:**
```
This project exists to answer one question: can I assemble a real
application correctly? Auth, typed code end-to-end, a containerised
local database, and a working deploy pipeline — each technology chosen
deliberately, not copied from a tutorial.
```

Find this sentence (further in the section):
```
Not a tutorial-follow. A deliberate exercise in assembling things correctly.
```

**Replace with:**
```
Every technology choice has a reason. That's what this project documents.
```

Keep all surrounding elements, classes, and structure unchanged.

---

### Fix 4: BASE_URL in Layout.astro

**File:** `src/layouts/Layout.astro`

Find the `BASE_URL` constant or any placeholder URL in the `<head>` meta tags (OG, Twitter, canonical). The CLAUDE.md notes say "BASE_URL must be updated to the real Vercel URL before launch (currently a placeholder)."

**Action:** Check what the current value is.
- If it already reads `https://portfolio-wency.vercel.app`, no change needed.
- If it is a placeholder (e.g. `https://your-domain.com` or similar), replace it with `https://portfolio-wency.vercel.app`.

---

## After all changes

1. Run `npx astro check` — fix any TypeScript errors before finishing.
2. Run `npm run build` — confirm the build passes with zero errors.
3. Do not run `npm run dev` or start a server — just confirm the build.

## Do not

- Touch `src/data/experiments.ts`
- Touch `src/styles/global.css`
- Touch the Spottr case study body copy (product stories, before/after images)
- Reorder any sections
- Add new components or files

## When done

Report which files were changed and exactly what was changed in each. If any fix could not be applied because the current markup does not match what is described, report what you found instead of guessing.
