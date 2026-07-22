---
document_id: VIDEOPLAYER_SPEC
title: Video Player — Specification
version: 1.0.0
status: active
priority: critical
depends_on:
  - VIDEOPLAYER_README
related_documents:
  - STATE_REGISTRY.md
  - CONTENT_ARCHITECTURE.md
related_entities:
  - Content
related_components: []
related_events:
  - content_played
  - content_paused
  - content_completed
owner: Product Architecture
---

# Video Player — Specification

## Why

Playback is the moment a user actually consumes Content — every other feature's job is to lead here.

## What

Playback behavior for both Content types (`Video`, `Audio` — `CONTENT_ARCHITECTURE.md`).

## Rules

- Starting playback on any Content item transitions the shared Playback state machine `idle → playing` (`STATE_REGISTRY.md`) and emits `content_played`.
- Only one Content item plays at a time — starting a new item stops the previous one; there is no simultaneous multi-item playback.
- Pausing transitions `playing → paused` and emits `content_paused`. Resuming from `paused` re-enters `playing` (does not re-emit `content_played` — that event marks the start of a session, not every resume; see `EVENTS.md`).
- Reaching the end transitions to `content_completed` then `idle` (`STATE_REGISTRY.md`).
- Seeking (scrubbing to a timestamp) does not change playback state; it's a position update within `playing`/`paused`.
- The mini `PlayerBar` persists across Main App navigation while state is `playing` or `paused` — navigating tabs does not stop playback.

## Dependencies

- `VIDEOPLAYER_README.md`, `STATE_REGISTRY.md`

## Relationships

- `CONTENT_ARCHITECTURE.md` — the `Content` entity being played.

## Constraints

- No second Content item begins playback while another is `playing`/`paused` without first stopping the first — no background multi-play.
- Playback never starts for non-`published` Content (`STATE_REGISTRY.md` Content Lifecycle) — if a currently-playing item transitions to a removed state mid-session, see `EDGE_CASES.md`.

## Acceptance

Starting, pausing, resuming, seeking, and completing playback each produce the exact state/event described above, and only one item plays at a time.

## Future Scope

Autoplay-next and playback queue are not specified — see `README.md` Future Scope.
