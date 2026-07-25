---
document_id: VIDEOPLAYER_README
title: Video Player — Overview
version: 1.1.0
status: active
priority: critical
depends_on:
  - CONTENT_ARCHITECTURE
  - FEATURE_REGISTRY
related_documents:
  - VIDEOPLAYER_SPEC.md
  - STATE_REGISTRY.md
related_entities:
  - Content
related_components:
  - PlayerBar
related_events:
  - content_played
  - content_paused
  - content_completed
owner: Product Architecture
---

# Video Player

## Why

Despite its name (carried over from the reviewed design's "Playing Now" tab), this feature plays both Video and Audio Content types — it's the single playback surface, not video-specific. Both types now play through one video-shaped surface, which makes the name accurate in shape as well as ownership (`UI.md`).

## What

This feature owns playback controls (play/pause/skip/seek), the docked mini player (persistent across Main App screens while something is playing), the playback surface composed inside `/content/:id` — not a screen or tab of its own — and the Playback state machine (`STATE_REGISTRY.md`).

## Documents in This Feature

| Document | Purpose |
| --- | --- |
| `SPEC.md` | Functional specification |
| `UI.md` | Mini player bar + the playback surface inside `/content/:id` |
| `COMPONENTS.md` | Mini player and playback surface components |
| `API.md` | Playback session / progress operations |
| `DATABASE.md` | Read-only relationship to `Content`; playback progress persistence |
| `STATES.md` | Playback state machine (references `STATE_REGISTRY.md`) |
| `VALIDATIONS.md` | None owned |
| `EVENTS.md` | `content_played`, `content_paused`, `content_completed` |
| `EDGE_CASES.md` | Network interruption, background/foreground transitions, Content removed mid-playback |
| `TEST_CASES.md` | Test cases traced to the above |
| `PROMPTS.md` | Canonical prompts for implementing this feature |
| `CHANGELOG.md` | History of changes to this feature's documentation |

## Dependencies

- `CONTENT_ARCHITECTURE.md`, `STATE_REGISTRY.md`

## Relationships

- Every discoverability path (Content Discovery, Search, Recommendation Engine, Content Categorization, Sharing) hands off to this feature to actually play a Content item.
- `NAVIGATION_MODEL.md` — no bottom-nav tab belongs to this feature and none is driven by playback state. What keeps an active session reachable from any tab is the docked mini player, which opens `/content/:id` for the loaded item. Playback is not a tab destination.

## Constraints

- This feature does not decide what to play next algorithmically — that's Recommendation Engine, if/when an autoplay-next feature is specified (not yet).

## Acceptance

A user can play, pause, seek, and skip Content, with the mini `PlayerBar` persisting across navigation until playback ends or is explicitly stopped.

## Future Scope

Autoplay-next, queue management beyond a single current item, and offline/download playback are not specified.
