# Portfolio Update — Session 3: Research Log → Systems Lab Rebuild

## Context for Claude Code

You are working on Wency's portfolio site. Read `CLAUDE.md` in the repo root before touching any file. The stack is Astro + Tailwind CSS v4 + TypeScript. Single-page site.

The experiments data lives in `src/data/experiments.ts`. The Lab section is rendered by `Lab.astro` and `ExperimentCard.astro` (or equivalent component names — check `src/` for the actual filenames). Read those files before making any changes.

This session rebuilds the Research Log section into a tighter, more purposeful "Systems Lab" section. It has three parts: rename, restructure the data, and update the section intro copy.

---

## Part A — Rename the section

### Section heading
**File:** `src/pages/index.astro` — find the Lab section heading.

**Current heading:** `Research Log.`
**New heading:** `Systems Lab.`

**Current section intro paragraph** (the one starting "Not every idea ships..."):
```
Not every idea ships as a product. Some stay in notebooks. Some become SOPs.
Some become the invisible architecture inside larger systems.

These are the AI and automation experiments I'm running in the open — memory
architectures, orchestration patterns, knowledge systems, prompt engineering.
Built to understand, documented to reuse.
```

**New intro paragraph:**
```
Not every insight comes from shipping a product. Some come from hitting a wall,
diagnosing why, and building the fix into the system.

These are the AI engineering decisions I've made in the open — memory architectures,
prompt systems, security patterns, context engineering.
Built to understand. Documented to reuse.
```

---

## Part B — Restructure experiments data

**File:** `src/data/experiments.ts`

Read the current file structure first. The file exports an array of experiment objects. Do not change the TypeScript interface/type — only change the data values.

### Step 1: Identify the three FEATURED experiments

These three become the primary cards, rendered first and visually emphasized:

**Featured 1 — LLM Project Memory**
Find the existing entry about "LLM Project Memory Across Sessions". Update its fields:

- `title`: `LLM context engineering`
- `status`: keep as-is (`Complete` or equivalent)
- `summary` or description: `Built layered context files across two active projects — project-memory.md, CLAUDE.md, decision-log.md — to re-establish full architectural context at session start. Emerged from observing what got re-explained or decided inconsistently without it.`
- `insight`: `The bottleneck is not AI capability — it's whether the AI has the right context at the right moment. A structured memory file outperforms an unstructured dump because the AI locates the relevant section instead of scanning undifferentiated prose.`
- `tags`: `["Claude Code", "CLAUDE.md", "Markdown", "Context engineering"]`
- Add a field `featured: true` if the type supports it, or note it in a comment

**Featured 2 — Voice Calibration**
Find the existing entry about "Voice Calibration: Correcting Prompt Drift". Update:

- `title`: `Prompt drift correction`
- `summary`: `AI-generated copy was drifting soft — over-explained, not direct enough for mobile UI moments. Built a correction skill layer on top of the original voice guide, naming specific failure modes with before/after pairs and explicit precedence rules. Ran a retroactive audit across all existing screens.`
- `insight`: `Prompt drift is cumulative and invisible per-output. A correction layer that names specific failure modes outperforms a rewritten prompt — it targets the drift without losing what worked in the original.`
- `tags`: `["Claude", "Prompt engineering", "Skill files", "Voice systems"]`
- Add `featured: true`

**Featured 3 — Safety as Architecture**
Find the existing entry about "Safety Constraints in Code, Not Policy". Update:

- `title`: `Safety encoded at the data layer`
- `summary`: `Encoded safety rules as database constraints rather than application logic or Terms of Service: the one-intro limit is a UNIQUE constraint, blocks are enforced by RLS so blocked users return nothing, women-only spaces require verified status at the database level.`
- `insight`: `A rule that only exists in a Terms of Service is a rule motivated bad actors ignore. When the mechanism can be automated without changing the meaning, automate it. The constraint is architectural, not advisory.`
- `tags`: `["PostgreSQL", "RLS", "Supabase", "Security architecture"]`
- Add `featured: true`

### Step 2: Mark remaining experiments as secondary

The remaining four experiments (Photo Upload debug, RLS Security Audit, Feature Freeze, Motion Budget) should be kept in the data but marked with `featured: false`. They will be used in Part C below.

If the type does not have a `featured` field, add it to the TypeScript interface as `featured?: boolean` — optional boolean, defaults to `undefined` (treated as false).

---

## Part C — Update Lab/ExperimentCard rendering

**Files:** `Lab.astro` and `ExperimentCard.astro` (find actual filenames in `src/`)

### Rendering logic

1. **Featured cards** (`featured: true`) render first, in full — same card layout as today, all fields visible.

2. **Secondary cards** (`featured: false` or `featured` undefined) render below the featured cards, in a compact list format:
   - Title only + tags (no summary, no insight block)
   - Visually subdued — smaller text, less padding, no accent border
   - A small label above this list reading: `More experiments`

3. If there are no secondary cards, do not render the "More experiments" label or list.

### Do not

- Change the featured card visual design (keep existing `ExperimentCard` appearance)
- Change how `writeupHref` is handled (still shows "Write-up coming" if undefined)
- Add new Tailwind classes not already in the project's token system

---

## Part D — Update section nav label (if applicable)

If the site has any internal nav or scrollspy that references the Lab section by name (check `Nav.astro` or similar, and the scrollspy in `Layout.astro`'s script block), update the label from "Lab" to "Lab" — actually keep "Lab" as the nav label since it's short. No change needed here unless the nav currently says "Research Log" — in that case change to "Lab".

---

## After all changes

1. Run `npx astro check` — fix all TypeScript errors (especially if you added `featured` to the interface).
2. Run `npm run build` — confirm zero errors.
3. Report:
   - Files changed
   - The final `featured` field values for all 7 experiments
   - Whether the secondary card compact list rendered cleanly or if there were layout issues to flag

## If something is unclear

If the component structure (Lab.astro / ExperimentCard.astro) differs significantly from what is described and the rendering split cannot be implemented cleanly, implement Part A and Part B only (rename + data restructure), and report what you found in the component layer so the rendering split can be planned separately.
