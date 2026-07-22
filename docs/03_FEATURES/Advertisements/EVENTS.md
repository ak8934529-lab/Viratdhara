---
document_id: ADVERTISEMENTS_EVENTS
title: Advertisements — Events
version: 1.0.0
status: active
priority: medium
depends_on:
  - ADVERTISEMENTS_SPEC
  - EVENT_REGISTRY
related_documents:
  - EVENT_REGISTRY.md
related_entities: []
related_components: []
related_events:
  - ad_impression
  - ad_clicked
owner: Product Architecture
---

# Advertisements — Events

## Why

This feature is the sole emitter of the two ad lifecycle events.

## What

Events this feature emits, both already defined in `EVENT_REGISTRY.md`.

## Rules

| Event | Emitted When |
| --- | --- |
| `ad_impression` | An Advertisement transitions to `showing` (`STATES.md`). |
| `ad_clicked` | An Account interacts with the shown Advertisement. |

## Dependencies

- `ADVERTISEMENTS_SPEC.md`, `EVENT_REGISTRY.md`

## Relationships

- `STATES.md` — `ad_impression` fires on the `loading → showing` transition.

## Constraints

- `ad_impression` does not fire for `skipped_unavailable` (no ad shown, per `STATES.md`).

## Acceptance

Every shown ad fires exactly one `ad_impression`; every interacted-with ad fires exactly one `ad_clicked`.

## Future Scope

None.
