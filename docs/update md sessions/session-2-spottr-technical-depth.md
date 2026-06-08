# Portfolio Update — Session 2: Spottr Technical Depth

## Context for Claude Code

You are working on Wency's portfolio site. Read `CLAUDE.md` in the repo root before touching any file. The stack is Astro + Tailwind CSS v4 + TypeScript. Single-page site. All sections are composed in `src/pages/index.astro`. Design tokens live in `src/styles/global.css`.

This session adds a technical depth layer to the Spottr case study. The product storytelling (design decision, status system rebuild, how it was built) must remain completely intact. You are adding to the existing section, not replacing anything.

---

## What this session adds

Two additions to the Spottr case study, both inserted after the existing "How it was built" beat and before the stack/status tag row at the bottom of the section:

1. A **system architecture callout** — a compact visual breakdown of the 3-system architecture
2. A **technical depth note** — a short prose block naming the real technical decisions

---

## Addition 1: System Architecture Callout

### Where to insert
After the "How it was built" content block, before the stack tags and status badge at the bottom of the Spottr section.

### What to build
A self-contained component or inline block (your choice — keep it in `index.astro` unless it makes clear sense to extract). It should render three cards in a row (or a responsive grid) representing the three systems that make up Spottr.

**Three systems — exact content:**

**Card 1: Mobile App**
- Label: `Mobile App`
- Stack line: `React Native · Expo · expo-router`
- Detail: `Auth, onboarding, live member list, messaging, QR check-in, push notifications`

**Card 2: Admin Portal**
- Label: `Admin Portal`
- Stack line: `Next.js 14 · Vercel · SSR auth`
- Detail: `Platform HQ and gym-partner portals, server-side Supabase sessions`

**Card 3: Supabase Backend**
- Label: `Backend`
- Stack line: `Postgres · RLS · Realtime · Edge Functions · pg_cron`
- Detail: `JWT auth, row-level security on all tables, WebSocket live updates, Deno serverless functions, scheduled cleanup jobs`

### Design rules
- Use existing Tailwind utility classes and design tokens already in `global.css` (e.g. `bg-paper`, `text-ink`, `text-accent` or whatever tokens exist — check `global.css` first).
- Keep the visual style consistent with the rest of the case study. If the case study uses bordered cards with subtle backgrounds, match that.
- Do not introduce new colors or font sizes not already in the token system.
- The section heading above these cards should read: `How it's assembled`
- Use a small label above the section heading (matching the style of other small labels in the Spottr section like "01 — Spottr The problem") that reads: `Architecture`

---

## Addition 2: Technical Depth Note

### Where to insert
Directly after the three architecture cards, still before the stack/status row.

### What to add
A short callout block — not a full paragraph, more like a highlighted note. Style it consistently with how "lessons" or "insights" are styled elsewhere in the case study if that pattern exists. If not, use a left-border accent style (a colored left border with slightly muted background).

**Exact copy:**

```
The constraint is at the data layer.

Block relationships enforced by RLS — blocked users cannot see each other's check-ins,
not because the app hides them, but because the database returns nothing.
The one-intro limit is a UNIQUE constraint on thread pairs, not an application rule.
Safety and integrity built in, not bolted on.
```

The heading of this callout: `What makes it real`

---

## Do not

- Change any existing Spottr product story beats (design rejection, status system rebuild, how it was built)
- Touch the before/after images or their captions
- Touch the existing stack tags at the bottom (React Native, Expo, Supabase)
- Touch any other section of the page
- Change `src/styles/global.css` token definitions
- Change `src/data/experiments.ts`

---

## After all changes

1. Run `npx astro check` — fix any TypeScript errors.
2. Run `npm run build` — confirm zero errors.
3. Report: what files were changed, what was added, and the exact insertion point in the file (surrounding element or line context).

## If something is unclear

If the Spottr section structure differs significantly from what is described and you cannot find a clean insertion point, stop and report what you found. Do not guess at structure or insert in the wrong place.
