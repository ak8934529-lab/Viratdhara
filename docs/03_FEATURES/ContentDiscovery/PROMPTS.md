---
document_id: CONTENTDISCOVERY_PROMPTS
title: Content Discovery — Prompts
version: 1.0.0
status: active
priority: low
depends_on:
  - CONTENTDISCOVERY_README
related_documents:
  - PROMPT_LIBRARY.md
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Content Discovery — Prompts

## Why

This feature composes two other features — the recurring risk is silently reimplementing their logic instead of consuming their output.

## What

Feature-specific prompts.

## Prompts

### Implement a feed tab

> Compose Recommendation Engine's and Content Categorization's existing output per `SPEC.md` — do not reimplement ranking or category logic here. Use `MobileTabShell` per `NAVIGATION_MODEL.md`. Build the Shorts renderer as a new, registered component (`COMPONENTS.md`) since none exists yet.

### Update `apps/showcase`'s demo content

> `COMPONENT_REGISTRY.md` flags that `QuickActionTile`'s current showcase demo uses future-scope subject matter (Temple Live, Pooja & Aarti). Once this feature's real V1 categories/sections exist, update the showcase demo to reflect them instead.

## Dependencies

- `CONTENTDISCOVERY_README.md`, `PROMPT_LIBRARY.md`

## Relationships

- `PROMPT_LIBRARY.md`

## Constraints

None beyond the above.

## Acceptance

An agent given this document composes rather than duplicates the two upstream features' logic.

## Future Scope

None.
