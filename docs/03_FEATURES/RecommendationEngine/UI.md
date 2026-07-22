---
document_id: RECOMMENDATIONENGINE_UI
title: Recommendation Engine — UI
version: 1.0.0
status: active
priority: low
depends_on:
  - RECOMMENDATIONENGINE_SPEC
related_documents: []
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Recommendation Engine — UI

## Why

This feature has no screen of its own — worth stating explicitly rather than leaving this document looking incomplete.

## What

This feature has no dedicated UI. Its output (`Recommendation` records) is rendered by `Content Discovery`'s `UI.md` as one or more sections/rows within the home feed (e.g. a "Recommended for you" row).

## Rules

- No screen or route belongs to this feature.
- Any visual treatment for a "Recommended" section is specified in `Content Discovery`'s `UI.md`, not duplicated here.

## Dependencies

- `RECOMMENDATIONENGINE_SPEC.md`

## Relationships

- `ContentDiscovery` (once documented) — the owner of the actual rendering.

## Constraints

- This feature never introduces its own route or standalone screen.

## Acceptance

No route in `URL_STRUCTURE.md` is attributed to this feature.

## Future Scope

None.
