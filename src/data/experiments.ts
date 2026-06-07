export type ExperimentStatus = 'complete' | 'in-progress' | 'research';

export interface Experiment {
  id: string;
  title: string;
  status: ExperimentStatus;
  description: string;
  tech: string[];
  insight: string;
  date: string;         // YYYY-MM — used for future timeline sort
  writeupHref?: string; // undefined until a write-up exists
}

/*
 * Every experiment here is directly evidenced by code, git history, or
 * documented decisions in an active project. If it is not in this list,
 * it has not been built yet.
 */
export const experiments: Experiment[] = [
  {
    id: 'photo-upload-debugging',
    title: 'Photo Upload: Three-Architecture Debug',
    status: 'complete',
    description:
      'Six commits across three distinct failed approaches before a working React Native → Supabase Storage upload path. Each failure revealed a different layer: the JS-to-native binary bridge, Android\'s HTTP client stripping auth headers on multipart rebuild, and the Storage upsert branch evaluating both INSERT and UPDATE RLS policies simultaneously.',
    tech: ['React Native', 'Expo Camera', 'Supabase Storage', 'RLS'],
    insight:
      'Silent 403s in auth flows almost always mean credentials are added at one layer and stripped at another. The layer that attaches auth headers and the layer that evaluates them are rarely the same layer.',
    date: '2026-05',
  },
  {
    id: 'rls-security-audit',
    title: 'RLS Security Audit: Permissive Policy Exposure',
    status: 'complete',
    description:
      'Post-build audit of a production Supabase schema found USING(true) and WITH CHECK(true) policies granted to the anon role — meaning anyone with the public API key could read every gym\'s full roster and forge check-ins for arbitrary user IDs. Rewrote policies across all affected tables: gym-scoped SELECT, self-only INSERT, block-aware reads, women-only verification checks.',
    tech: ['PostgreSQL', 'Supabase RLS', 'SQL migrations'],
    insight:
      'USING(true) is not a "public read" policy — it is a "bypass all row filtering" policy. Default scaffolding often looks safe without being safe. RLS needs its own audit pass, independent of application-layer access checks.',
    date: '2026-06',
  },
  {
    id: 'voice-calibration',
    title: 'Voice Calibration: Correcting Prompt Drift',
    status: 'complete',
    description:
      'After shipping initial copy for a mobile app, AI-generated outputs were drifting too soft — poetic, over-explained, not direct enough for the moments that matter. Built a correction skill layer on top of the original voice guide, naming specific failure modes with before/after pairs and an explicit precedence rule. Then ran a retroactive audit across all existing screens.',
    tech: ['Claude', 'Skill files', 'Prompt engineering'],
    insight:
      'Prompt drift is cumulative and invisible per-output. A correction layer that names specific failure modes outperforms a rewritten prompt — it targets the drift without losing what worked in the original guide.',
    date: '2026-05',
  },
  {
    id: 'feature-freeze',
    title: 'Feature Freeze: Diagnosing Builder Bias',
    status: 'complete',
    description:
      'After a sustained build period, a codebase audit found a two-tier admin system, partner portal, push notification infrastructure, and RLS across 10+ tables — with zero validated users. Instituted a hard freeze encoded in CLAUDE.md so the AI couldn\'t add features even if prompted. The freeze redirected energy from building to voice calibration, security audits, and documentation.',
    tech: ['Claude Code', 'CLAUDE.md', 'React Native', 'Supabase'],
    insight:
      'AI-assisted development lowers the cost of building so much that judgment about what to build becomes the constraint — not technical capability. When building is easy, it becomes the default. Making building harder is sometimes the highest-leverage move.',
    date: '2026-05',
  },
  {
    id: 'safety-in-code',
    title: 'Safety Constraints in Code, Not Policy',
    status: 'complete',
    description:
      'Encoded safety rules at the data layer rather than Terms of Service: a user physically cannot send a second intro until the first is replied to, block relationships are enforced by RLS so blocked users cannot see each other\'s check-ins, and women-only spaces require verified status at the database level. The constraint is architectural, not advisory.',
    tech: ['PostgreSQL RLS', 'Supabase', 'React Native'],
    insight:
      'A rule that only exists in a Terms of Service is a rule motivated bad actors ignore. There are two categories of safety constraint: those where the mechanism can be automated without changing the meaning, and those where the mechanism is the meaning.',
    date: '2026-06',
  },
  {
    id: 'llm-project-memory',
    title: 'LLM Project Memory Across Sessions',
    status: 'complete',
    description:
      'Built layered context files (project-memory.md, CLAUDE.md, AGENTS.md, decision-log.md) across two active projects to re-establish full architectural context at the start of each AI session. The structure emerged from observing what got re-litigated, re-explained, or decided inconsistently when context was missing.',
    tech: ['Claude Code', 'CLAUDE.md', 'Markdown'],
    insight:
      'The bottleneck is not AI capability — it is whether the AI has the right context at the right moment. A structured memory file outperforms an unstructured dump because the AI can locate the relevant section rather than scanning undifferentiated prose.',
    date: '2026-05',
  },
  {
    id: 'motion-constraint-system',
    title: 'Motion Budget: Tokens Before Code',
    status: 'complete',
    description:
      'Locked five CSS motion tokens (easing curve, reveal duration, micro-interaction duration, travel distance, stagger interval) before writing any animation. Applied a decision gate to every animation added: does this make the thinking clearer, or just look good? Clearer stays. Cool-only goes to the lab.',
    tech: ['CSS custom properties', 'Astro', 'IntersectionObserver'],
    insight:
      'Motion consistency comes from a shared grammar, not a style guide. Locking tokens before code converts taste decisions into engineering decisions — reviewable, enforceable, consistent. Without a gate, cool-only animations accumulate by default.',
    date: '2026-05',
  },
];
