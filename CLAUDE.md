# CLAUDE.md

This is a personal portfolio project. Read the context below before doing any work.

## Read first, every session
1. **`claude/project-memory.md`** — the compressed source of truth. Who this is, the locked strategy, brand, audience, creative direction, tech stack, and content architecture. Start here. It indexes everything else.

## Deep references (read when a task touches that area)
- **`docs/decision-log.md`** — every decision made, with its rejected alternatives and reasons. Check before reopening a settled question.
- **`docs/creative-direction.md`** — feeling, voice, color, type, art direction, motion rules.
- **`docs/content-architecture.md`** — the section sequence and the purpose of each section.
- **`docs/portfolio-sop.md`** — reusable workflows.

## How to work on this project
- **Documentation-first.** Before implementing anything unfamiliar (Astro APIs, libraries, deploy config), read the official docs. Avoid trial-and-error loops.
- **Log decisions as they happen.** When a significant decision is made: update `project-memory.md`, append to `decision-log.md` (include the rejected alternative + why), and add/update an SOP if a reusable workflow emerged. Don't wait to be asked.
- **Don't reopen settled questions.** Check the decision log first. Only revisit a rejected approach if genuinely new information justifies it — and note why.
- **Keep memory compressed.** Prefer high-density summaries over context dumps. Carry an "open threads" list so nothing is lost between sessions.

## Non-negotiable project rules (from the locked direction)
- **Structure before style before motion.** Build sections/components first, then design tokens (palette + type), then visual polish, then motion. Never jump ahead to polished UI because it feels productive.
- **Motion serves the story, never the reverse.** Test every animation: "does this make the thinking clearer, or just look cool?" Cool-only goes to the experiments lab, not the main site.
- **Warm, confident, human, self-aware.** Restraint is the flex. The enemy is the generic intimidating dev-portfolio aesthetic.
- **Tone is warm; content is rigorous.** Visual restraint must never mean thin technical substance.
- **Performance is a feature.** Astro's zero-JS default protects this — keep it. Respect reduced-motion preferences.

## Build context
- Stack: Astro + Tailwind CSS, deployed on Vercel.
- This `claude/` and `docs/` documentation lives at the repo root, outside `src/`. It is project memory, not site content — do not include it in the published build.