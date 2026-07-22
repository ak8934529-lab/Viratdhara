---
document_id: SEARCH_EVENTS
title: Search — Events
version: 1.0.0
status: active
priority: medium
depends_on:
  - SEARCH_SPEC
  - EVENT_REGISTRY
related_documents:
  - EVENT_REGISTRY.md
related_entities: []
related_components: []
related_events:
  - content_searched
  - content_viewed
owner: Product Architecture
---

# Search — Events

## Why

This feature is the sole emitter of `content_searched`.

## What

Events this feature emits.

## Rules

| Event | Emitted When |
| --- | --- |
| `content_searched` | A query is executed (`searching` state entered, per `STATES.md`). |
| `content_viewed` | A result is opened — shared with other discoverability paths, not redefined here. |

## Dependencies

- `SEARCH_SPEC.md`, `EVENT_REGISTRY.md`

## Relationships

- `STATES.md` — `content_searched` fires on the `idle → searching` transition.

## Constraints

- `content_searched` fires once per submitted query, not once per keystroke (this feature does not implement live-search-as-you-type per `SPEC.md`).

## Acceptance

`content_searched` fires exactly once per query submission.

## Future Scope

A zero-results variant (e.g. a payload flag) may be added if search-quality analytics become a need.
