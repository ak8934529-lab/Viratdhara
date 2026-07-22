---
document_id: VIDEOPLAYER_EVENTS
title: Video Player — Events
version: 1.0.0
status: active
priority: high
depends_on:
  - VIDEOPLAYER_SPEC
  - EVENT_REGISTRY
related_documents:
  - EVENT_REGISTRY.md
related_entities: []
related_components: []
related_events:
  - content_played
  - content_paused
  - content_completed
owner: Product Architecture
---

# Video Player — Events

## Why

This feature is the sole emitter of the three playback lifecycle events.

## What

Events this feature emits, all already defined in `EVENT_REGISTRY.md`.

## Rules

| Event | Emitted When |
| --- | --- |
| `content_played` | Playback starts for the first time on a Content item (`idle → playing`). Resuming from `paused` re-enters `playing` without re-emitting this event, per `SPEC.md`. |
| `content_paused` | Playback pauses. |
| `content_completed` | Playback reaches the end. |

## Dependencies

- `VIDEOPLAYER_SPEC.md`, `EVENT_REGISTRY.md`

## Relationships

- `STATES.md` — these events trigger the Playback machine's transitions.

## Constraints

- No new playback event (e.g. a separate "resumed" event) is introduced without registering it in `EVENT_REGISTRY.md` first.

## Acceptance

Every play/pause/complete action fires exactly one corresponding event.

## Future Scope

A `content_seeked` event may be added if seek-behavior analytics become a need.
