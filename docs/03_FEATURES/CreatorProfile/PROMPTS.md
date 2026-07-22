---
document_id: CREATORPROFILE_PROMPTS
title: Creator Profile — Prompts
version: 1.0.0
status: active
priority: low
depends_on:
  - CREATORPROFILE_README
related_documents:
  - PROMPT_LIBRARY.md
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Creator Profile — Prompts

## Why

This feature introduced a new entity (`Follow`) — worth a standing prompt reminding an implementer that entity additions require touching `DOMAIN_MODEL.md`/`ENTITY_REGISTRY.md`, which was already done here as the reference example.

## What

Feature-specific prompts.

## Prompts

### Implement the Follow action

> Implement idempotent follow/unfollow per `SPEC.md` and `VALIDATIONS.md` — no self-follow, no duplicate `Follow` records, requires `logged_in` session. Reference `DOMAIN_MODEL.md`'s `Follow` entity; do not redefine its shape.

### Adding a new entity, using this feature as the example

> When a feature needs an entity not in `ENTITY_REGISTRY.md` (as `Follow` wasn't, despite being implied by `PRODUCT_CONTEXT.md` since Milestone 2), add it to `DOMAIN_MODEL.md` and `ENTITY_REGISTRY.md` in the same change as the feature's own `DATABASE.md` — see Commit 12 for the reference pattern.

## Dependencies

- `CREATORPROFILE_README.md`, `PROMPT_LIBRARY.md`

## Relationships

- `PROMPT_LIBRARY.md`

## Constraints

None beyond the above.

## Acceptance

An agent given this document correctly reuses the already-registered `Follow` entity rather than reinventing it.

## Future Scope

None.
