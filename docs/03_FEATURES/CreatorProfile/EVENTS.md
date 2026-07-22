---
document_id: CREATORPROFILE_EVENTS
title: Creator Profile — Events
version: 1.0.0
status: active
priority: medium
depends_on:
  - CREATORPROFILE_SPEC
  - EVENT_REGISTRY
related_documents:
  - EVENT_REGISTRY.md
related_entities: []
related_components: []
related_events:
  - creator_followed
  - creator_unfollowed
owner: Product Architecture
---

# Creator Profile — Events

## Why

This feature is the sole emitter of the two Follow lifecycle events, added to `EVENT_REGISTRY.md` in this same milestone.

## What

Events this feature emits.

## Rules

| Event | Emitted When |
| --- | --- |
| `creator_followed` | An Account successfully follows a Creator (first-time follow — idempotent re-follow does not re-fire it). |
| `creator_unfollowed` | An Account successfully unfollows a Creator. |

## Dependencies

- `CREATORPROFILE_SPEC.md`, `EVENT_REGISTRY.md`

## Relationships

- `STATES.md` — these events drive the Follow state transition.

## Constraints

- Neither event fires on a failed request (network error, validation failure) — only on confirmed success.

## Acceptance

Each successful follow/unfollow action fires exactly one corresponding event.

## Future Scope

None.
