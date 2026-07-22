---
document_id: CONTENTDISCOVERY_EVENTS
title: Content Discovery — Events
version: 1.0.0
status: active
priority: medium
depends_on:
  - CONTENTDISCOVERY_SPEC
  - EVENT_REGISTRY
related_documents:
  - EVENT_REGISTRY.md
related_entities: []
related_components: []
related_events:
  - content_viewed
  - playlist_created
  - playlist_item_added
owner: Product Architecture
---

# Content Discovery — Events

## Why

This feature is one of several emitters of `content_viewed` (shared with Search, Recommendation Engine) and the sole emitter of the two Playlist events.

## What

Events this feature emits.

## Rules

| Event | Emitted When |
| --- | --- |
| `content_viewed` | A Content item is opened from any feed section. |
| `playlist_created` | An Account creates a new Playlist. |
| `playlist_item_added` | Content is added to a Playlist. |

## Dependencies

- `CONTENTDISCOVERY_SPEC.md`, `EVENT_REGISTRY.md`

## Relationships

- Shared `content_viewed` semantics with `Search`, `RecommendationEngine`.

## Constraints

- `content_viewed` fires with consistent shape regardless of which feature triggered it (`EVENT_REGISTRY.md`).

## Acceptance

Every Content open from a feed fires `content_viewed`; every Playlist create/add fires its respective event exactly once.

## Future Scope

None.
