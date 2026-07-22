---
document_id: DESIGN_PHILOSOPHY
title: Design Philosophy
version: 1.0.0
status: active
priority: critical
depends_on:
  - PRODUCT_PHILOSOPHY
related_documents:
  - PRODUCT_PHILOSOPHY.md
  - DESIGN_SYSTEM_RULES.md
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Design Philosophy

## Why

`PRODUCT_PHILOSOPHY.md` states "calm, not overwhelming" and "trust over engagement" at product level. Visual and interaction design is where that principle either holds or gets contradicted by a hundred small decisions (a flashing badge, an aggressive color, a cluttered layout) made independently.

## What

How `PRODUCT_PHILOSOPHY.md`'s principles translate into visual and interaction decisions.

## Rules

- **Warm, not loud.** The palette is a warm terracotta/maroon primary (`#BE5339`) and gold accent (`#D3932F`) against near-black surfaces — devotional and grounded, not bright/saturated in the way engagement-optimized apps trend toward. See `TYPOGRAPHY.md` / token values in `apps/showcase/src/index.css`.
- **Dark-first, not dark-mode-as-afterthought.** The reviewed design has no designed light theme. Rather than fabricate one, `:root` holds the actual dark palette directly (see `DESIGN_SYSTEM_RULES.md` token section) — an explicit, documented deviation from adding a light theme nobody asked for.
- **Card-based, bounded content.** Content lives in bounded cards (`Card`, `MobileTonalCard`, `surface-card`/`surface-tonal` utilities) rather than borderless infinite feeds — a small structural choice that works against the "endless scrolling" pattern `PRODUCT_PHILOSOPHY.md` deprioritizes.
- **Soft, rounded, approachable.** Primary actions use fully pill-shaped buttons (`rounded-full`), not sharp rectangles — see `DESIGN_SYSTEM_RULES.md` radius token.

## Dependencies

- `PRODUCT_PHILOSOPHY.md`

## Relationships

- `DESIGN_SYSTEM_RULES.md` — where these principles become concrete tokens.
- `UX_PATTERNS.md` — where these principles become concrete interaction patterns.

## Constraints

- A visual decision that contradicts `PRODUCT_PHILOSOPHY.md` (e.g. an aggressive red "urgency" banner, an autoplay-everything feed) is a philosophy violation, not a valid design choice, regardless of how common it is elsewhere.

## Acceptance

Any new screen or component can be checked against these four points before being considered visually consistent with the product.

## Future Scope

A light theme may be designed later if there's a real reason (e.g. outdoor/daytime legibility research). It is not assumed to be needed by default.
