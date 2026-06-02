# Content Architecture — Portfolio

> Narrative sequence and section purpose. NOT layout/wireframe/visual design.
> The bridge document: Claude Code builds structure from this + project-memory.md + creative-direction.md.

## Governing principle
The visitor's silent question evolves as they scroll. Answer the RIGHT question at the RIGHT moment, in order:
**"Who is this?" → "Can they actually do anything?" → "How do they think?" → "Is this real?" → "What now?"**
Each section answers exactly one. Order is load-bearing. Most dev portfolios over-answer "can they do anything" (logo walls) and skip "how do they think" — we invert this, because thinking is the edge.

## Sections (in order)

### 1. Opening — "who is this?"
- Plain, confident, one-sentence statement of identity (product builder who ships deliberately, AI as judgment-driven tool). Voice does the disarming in first 5 seconds. Warmth = a person, not a résumé.
- Job: make them keep scrolling. Nothing more. NO rotating-title hero animation. Restraint = confidence.

### 2. Proof-of-substance glance — "can they actually do anything?"
- Brief concrete signal of shipped real things (Spottr + ecommerce named, real stacks). NOT full case studies — a glance.
- Job: earn the right to tell longer stories. Skeptics burned by "aspiring dev" portfolios need fast evidence or they bounce.

### 3. Spottr case study — "how do they think?" (PRODUCT-THINKING proof) — HEART OF SITE
- Where narrative immersion lives (D-009). Decision story, not feature tour:
  - Problem: put reader INSIDE the gym intimidation deadlock; make them feel it.
  - Insight: geolocation-gated live presence + chat-first (non-obvious).
  - Decisions: chose/rejected + the DESIGN-OVERRIDE moment (told AI its premium design was intimidating, redirected to warm). Best proof of judgment — gets real estate.
  - Build: plan mode, docs-first, engineered prompts. AI use stated openly.
  - Outcome: published → offered to real gyms → real users. GROWS as launch progresses (D-014).

### 4. Ecommerce case study — "how do they think?" (TECHNICAL-CREDIBILITY proof)
- Shorter than Spottr; different job: disarm the gatekeeper. Lead with real-engineering signals: auth/authz, Docker Postgres, Vercel deploy pipeline. Decisions framed as "I understand how real apps are assembled & shipped," not product insight.
- Job: let a reasonable skeptic advocate internally.

### 5. How I work / process — "is this real?"
- Method made the explicit subject — the thing others hide, made centerpiece.
- Signature device (D-021): transparent note that THIS SITE was built the same deliberate way, with AI, on purpose. Medium proves message. Converts the convertible skeptic — unfakeable.

### 6. Experiments lab — quiet "are they still growing?"
- Clearly labeled, visibly looser treatment. Parallax/3D/motion curiosity lives here as LEARNING, not identity (D-005). Shows craft curiosity without contaminating the confident main narrative. Optional to visitor.

### 7. Close — "what now?"
- Warm, direct, low-friction contact invite. Not "hire me" — "this is how I think; imagine me on your team." ONE clear action. Remote-first → contact effortless, path obvious.

## Load-bearing notes
- ORDER: substance (2) before stories (3–4) [skeptics need evidence before investing in narrative]; stories before process (5) [process only convincing after seeing output]; lab (6) near end [the one place confidence relaxes; must not undercut serious work above].
- GROWS WITH LAUNCH: Spottr case study intentionally unfinished at first ("launching soon" → "published" → "real gyms using it"). Visible progression IS proof of shipping/follow-through (launch-as-narrative SOP-03). Architecture must accommodate this evolution from day one, not be rebuilt later.

## Not yet decided (do NOT block init)
- Single-page scroll vs multi-page routing (affects Astro structure — decide at/just before wireframe).
- Whether sections 3 & 4 are inline or link to dedicated case-study pages.
- Palette swatches + typeface pairing (Tailwind tokens — swappable post-init).
