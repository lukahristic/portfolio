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
  featured?: boolean;
}

/*
 * Every experiment here is directly evidenced by code, git history, or
 * documented decisions in an active project. If it is not in this list,
 * it has not been built yet.
 */
export const experiments: Experiment[] = [
  {
    id: 'llm-project-memory',
    title: 'LLM context engineering',
    status: 'complete',
    description:
      'Built layered context files across two active projects — project-memory.md, CLAUDE.md, decision-log.md — to re-establish full architectural context at session start. Emerged from observing what got re-explained or decided inconsistently without it.',
    tech: ['Claude Code', 'CLAUDE.md', 'Markdown', 'Context engineering'],
    insight:
      'The bottleneck is not AI capability — it\'s whether the AI has the right context at the right moment. A structured memory file outperforms an unstructured dump because the AI locates the relevant section instead of scanning undifferentiated prose.',
    date: '2026-05',
    featured: true,
  },
  {
    id: 'voice-calibration',
    title: 'Prompt drift correction',
    status: 'complete',
    description:
      'AI-generated copy was drifting soft — over-explained, not direct enough for mobile UI moments. Built a correction skill layer on top of the original voice guide, naming specific failure modes with before/after pairs and explicit precedence rules. Ran a retroactive audit across all existing screens.',
    tech: ['Claude', 'Prompt engineering', 'Skill files', 'Voice systems'],
    insight:
      'Prompt drift is cumulative and invisible per-output. A correction layer that names specific failure modes outperforms a rewritten prompt — it targets the drift without losing what worked in the original.',
    date: '2026-05',
    featured: true,
  },
  {
    id: 'safety-in-code',
    title: 'Safety encoded at the data layer',
    status: 'complete',
    description:
      'Encoded safety rules as database constraints rather than application logic or Terms of Service: the one-intro limit is a UNIQUE constraint, blocks are enforced by RLS so blocked users return nothing, women-only spaces require verified status at the database level.',
    tech: ['PostgreSQL', 'RLS', 'Supabase', 'Security architecture'],
    insight:
      'A rule that only exists in a Terms of Service is a rule motivated bad actors ignore. When the mechanism can be automated without changing the meaning, automate it. The constraint is architectural, not advisory.',
    date: '2026-06',
    featured: true,
  },
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
    featured: false,
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
    featured: false,
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
    featured: false,
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
    featured: false,
  },
];
