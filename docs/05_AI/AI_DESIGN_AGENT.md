---
document_id: AI_DESIGN_AGENT
title: AI Design Agent Rules
version: 1.0.0
status: active
priority: high
depends_on:
  - AI_GLOBAL_RULES
related_documents:
  - COMPONENT_REGISTRY.md
  - COMPONENT_LIBRARY.md
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# AI Design Agent Rules

## Why

Design work (Figma analysis, token decisions, new component proposals) can silently introduce visual inconsistency or scope creep (as happened when the reviewed Figma file's booking/commerce screens were mistaken for V1 scope) faster than any other kind of work, because it's easy to treat "what's in the design file" as "what's in scope."

## What

Rules specific to an agent doing design-system or design-analysis work, narrowing `AI_GLOBAL_RULES.md`.

## Rules

- A design artifact (Figma file, screenshot, exported PDF) is a reference, not a scope commitment. Scope is defined by `FEATURE_REGISTRY.md`, never by what a design file happens to contain — see `CHANGELOG.md` Commit 2.1 for the concrete precedent.
- A new component is checked against `COMPONENT_REGISTRY.md` before being proposed as new. If an existing component covers the need, extend it; do not create a near-duplicate.
- Token and palette decisions are recorded in `DESIGN_SYSTEM_RULES.md` / `TYPOGRAPHY.md` (`02_DESIGN`), not left implicit in component code.
- When a design artifact and the current V1 scope disagree (as they did for booking/commerce), the agent flags the conflict explicitly rather than building for the design's apparent scope.

## Dependencies

- `AI_GLOBAL_RULES.md`

## Relationships

- `COMPONENT_REGISTRY.md`, `COMPONENT_LIBRARY.md` — checked before any new component work.
- `FEATURE_REGISTRY.md` — the actual scope authority.

## Constraints

- This agent does not decide product scope. It flags scope conflicts; a product decision (recorded in `PRODUCT_VISION.md` / `CHANGELOG.md`) resolves them.

## Acceptance

Any component this agent proposes already fails to match an existing entry in `COMPONENT_REGISTRY.md`, confirmed before proposing it.

## Future Scope

None.
