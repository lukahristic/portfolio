/*
 * The published decision log.
 *
 * Curated on purpose. The full working log in docs/decision-log.md is internal
 * strategy notes written in the third person — useful as project memory, wrong
 * as a public document. These are the craft and engineering calls, in my own
 * words, each with the option I turned down and why.
 *
 * Rule: every entry names a real alternative that was actually considered.
 * A "decision" with no rejected option is just a description.
 */

export interface Decision {
  id: string;
  area: 'Stack' | 'Design' | 'Motion' | 'Content';
  title: string;
  decision: string;
  why: string;
  rejected: string;
}

export const decisions: Decision[] = [
  {
    id: 'astro-over-next',
    area: 'Stack',
    title: 'Astro instead of Next.js',
    decision:
      'Build this site on Astro with Tailwind, deployed to Vercel.',
    why: 'It is a content site. Astro ships zero JavaScript by default, which means the performance budget is protected by the framework rather than by my discipline. It also puts a third tool next to React Native and Next.js, which is itself the argument: pick the tool the job wants.',
    rejected:
      'Next.js — the framework I already knew. It would have shipped a React runtime to power interactivity this site does not have. Reaching for the familiar tool is exactly the habit I was trying not to demonstrate.',
  },
  {
    id: 'serif-headlines',
    area: 'Design',
    title: 'A serif for headlines',
    decision: 'Fraunces for display type, DM Sans for body and UI.',
    why: 'A warm serif reads as a person talking. It also survives being set large, which the case studies need.',
    rejected:
      'An all-sans geometric pairing — the developer-portfolio uniform. It is a safe choice that makes every site look like every other site, and looking like everyone else is the specific failure I was trying to avoid.',
  },
  {
    id: 'house-and-rooms',
    area: 'Design',
    title: 'The portfolio gets its own palette, not Spottr’s',
    decision:
      'Warm paper, warm near-black ink, terracotta accent for the site. Project accents are scoped locally — Spottr’s amber only exists inside the Spottr case study.',
    why: 'A house with rooms. The site has one identity; each project keeps its own character inside its own section without redefining the global tokens.',
    rejected:
      'Adopting Spottr’s palette site-wide. It would have made the portfolio look like a Spottr marketing page and subordinated everything else to one project. Also rejected: a cold, fully distinct palette, which loses the warmth the whole approach depends on.',
  },
  {
    id: 'motion-tokens-first',
    area: 'Motion',
    title: 'Motion tokens locked before any animation was written',
    decision:
      'Five CSS custom properties — easing curve, reveal duration, micro-interaction duration, travel distance, stagger interval — fixed before the first animation.',
    why: 'Consistency in motion comes from a shared grammar, not from taste applied repeatedly. Locking the tokens first turns style decisions into engineering decisions: reviewable, enforceable, hard to drift.',
    rejected:
      'Animating first and extracting tokens later. That is how a site ends up with six easing curves and no one able to say which is correct.',
  },
  {
    id: 'css-first-motion',
    area: 'Motion',
    title: 'CSS-first motion, one JavaScript dependency',
    decision:
      'Scroll reveals in CSS with an IntersectionObserver fallback. Lenis for smooth scroll is the only runtime dependency. Total JS budget: under 15kb.',
    why: 'This site argues that Astro was chosen for shipping zero JavaScript. Loading a heavy animation library to decorate that argument would contradict it — the same mistake as designing an anti-intimidation app to look intimidating.',
    rejected:
      'GSAP with ScrollTrigger. More capable, and I wanted to use it. It would have cost more JavaScript than the entire rest of the page, to produce effects the story does not need.',
  },
  {
    id: 'reduced-motion-killswitch',
    area: 'Motion',
    title: 'prefers-reduced-motion is a kill switch, not a dimmer',
    decision:
      'When reduced motion is requested, animation is removed rather than shortened. Reveals resolve to their visible state immediately.',
    why: 'A shortened animation is still an animation. Someone who asked for no motion asked for no motion.',
    rejected:
      'Scaling durations down, which is the common approach and still moves things on a screen belonging to someone who said not to.',
  },
  {
    id: 'artifacts-not-adjectives',
    area: 'Content',
    title: 'Show artifacts, never claim qualities',
    decision:
      'No adjective about myself appears without something attached to it that a reader can open — a repo, a running app, a decision, a constraint in a schema.',
    why: 'Anyone can write "detail-oriented." The claim costs nothing, so it is worth nothing. A link costs something to produce and can be checked.',
    rejected:
      'A skills section and a list of interests. Fast to write, impossible to verify, and identical to every other portfolio.',
  },
  {
    id: 'question-order',
    area: 'Content',
    title: 'Sections ordered by the visitor’s next question',
    decision:
      'The page is sequenced against what a reader silently asks next: who is this, can they actually do anything, how do they think, is any of it real, what now.',
    why: 'Evidence has to arrive before storytelling earns attention. Process only becomes interesting after the output is credible.',
    rejected:
      'The conventional order — about, projects, skills, contact — which is organised around what the author wants to say rather than what the reader needs next.',
  },
  {
    id: 'og-image-by-hand',
    area: 'Stack',
    title: 'The social preview image was made by hand',
    decision: 'One PNG, authored once, committed to the repo.',
    why: 'It is a single asset that changes almost never.',
    rejected:
      'Generating it at build time with Satori. A rendering pipeline, a font-loading step, and a new failure mode, to produce one file. The complexity had no one to serve.',
  },
];
