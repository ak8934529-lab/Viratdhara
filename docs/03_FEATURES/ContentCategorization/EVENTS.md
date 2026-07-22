---
document_id: CONTENTCATEGORIZATION_EVENTS
title: Content Categorization — Events
version: 1.0.0
status: active
priority: low
depends_on:
  - CONTENTCATEGORIZATION_SPEC
  - EVENT_REGISTRY
related_documents:
  - EVENT_REGISTRY.md
related_entities: []
related_components: []
related_events:
  - content_viewed
owner: Product Architecture
---

# Content Categorization — Events

## Why

Category-driven views are one of the ways `content_viewed` (`EVENT_REGISTRY.md`) fires — worth naming explicitly so analytics can distinguish "viewed via category browse" from "viewed via search."

## What

This feature emits the existing `content_viewed` event; it does not introduce a new one.

## Rules

- `content_viewed` fires when a Content item is opened from either the inline filter row or the Category browse screen.
- No new event (e.g. `category_selected`) is added without registering it in `EVENT_REGISTRY.md` first.

## Dependencies

- `EVENT_REGISTRY.md`

## Relationships

None beyond the shared event.

## Constraints

- This feature does not fire `content_viewed` with different semantics than any other feature that also emits it — the event shape stays consistent.

## Acceptance

`content_viewed` fires exactly once per Content item opened from this feature's surfaces.

## Future Scope

A `category_selected` event may be added if category-level analytics become a need — not invented speculatively now.
