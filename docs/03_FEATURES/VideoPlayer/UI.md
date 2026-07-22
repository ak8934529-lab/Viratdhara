---
document_id: VIDEOPLAYER_UI
title: Video Player — UI
version: 1.0.0
status: active
priority: high
depends_on:
  - VIDEOPLAYER_SPEC
  - NAVIGATION_MODEL
  - RESPONSIVE_SYSTEM
related_documents:
  - URL_STRUCTURE.md
related_entities: []
related_components:
  - PlayerBar
related_events: []
owner: Product Architecture
---

# Video Player — UI

## Why

The reviewed design's "Playing Now" screen (Hanuman Chalisa example) already establishes the layout this feature formalizes: artwork, transport controls, progress, lyrics/detail panel.

## What

Two UI surfaces.

## Rules

### Mini player (`PlayerBar`)

- Docked above the bottom nav (mobile) whenever Playback state is `playing`/`paused`.
- Shows artwork thumbnail, title, artist/creator, play/pause, skip.
- Tapping it navigates to the full player.

### Full player ("Playing Now")

- Route `/playing-now` (`URL_STRUCTURE.md`), the "Playing Now" bottom-nav tab.
- Full artwork, title/creator, seek bar with elapsed/remaining time, transport controls (shuffle, previous, play/pause, next, repeat), lyrics/detail panel where applicable, minimize control (not a back-arrow — this is a tab root, not a pushed screen, per `NAVIGATION_MODEL.md`).
- At Wide breakpoint (`RESPONSIVE_SYSTEM.md`), `apps/web` may show a secondary panel (e.g. up-next/queue) alongside the player — not required at Compact/Medium.

## Dependencies

- `VIDEOPLAYER_SPEC.md`, `NAVIGATION_MODEL.md`, `RESPONSIVE_SYSTEM.md`

## Relationships

- `URL_STRUCTURE.md` — `/playing-now`.
- `SURFACE_SYSTEM.md` — the full player's artwork panel is a strong candidate for the single `surface-glass-accent` treatment per screen.

## Constraints

- The mini player never disappears due to navigation alone — only an explicit stop or playback completion removes it.

## Acceptance

The mini player appears whenever Playback state is active and correctly reflects play/pause state; the full player shows accurate elapsed/remaining time and responds to seek.

## Future Scope

Queue/up-next panel is Wide-breakpoint-only for now, per `RESPONSIVE_SYSTEM.md`.
