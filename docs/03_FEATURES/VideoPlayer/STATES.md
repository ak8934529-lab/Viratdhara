---
document_id: VIDEOPLAYER_STATES
title: Video Player — States
version: 1.0.0
status: active
priority: critical
depends_on:
  - VIDEOPLAYER_SPEC
  - STATE_REGISTRY
related_documents:
  - STATE_REGISTRY.md
related_entities: []
related_components: []
related_events:
  - content_played
  - content_paused
  - content_completed
owner: Product Architecture
---

# Video Player — States

## Why

This feature is the sole owner/implementer of the Playback state machine defined in `STATE_REGISTRY.md`.

## What

Implements the shared Playback machine — reproduced for this feature's context, not redefined.

## Rules

```
idle ──(content_played)──> playing
playing ──(content_paused)──> paused
paused ──(resume, no event re-fired)──> playing
playing ──(reaches end)──> content_completed ──> idle
```

- Seeking does not transition state — it's a position update within `playing`/`paused`.
- Buffering is a transient sub-state of `playing` in V1 (no separate top-level state) — see `STATE_REGISTRY.md`.

## Dependencies

- `VIDEOPLAYER_SPEC.md`, `STATE_REGISTRY.md`

## Relationships

- `EVENT_REGISTRY.md` — `content_played`, `content_paused` trigger the transitions above.
- `NAVIGATION_MODEL.md` — the "Playing Now" tab is active whenever state is `playing`/`paused`.

## Constraints

- No other feature triggers this machine's transitions — only Video Player.

## Acceptance

State is `playing` immediately after starting playback, `paused` immediately after pausing, and `idle` after completion — matching `STATE_REGISTRY.md` exactly.

## Future Scope

A distinct `buffering` state may be added if network conditions make the current buffering-as-sub-state-of-playing model insufficient for UI feedback.
