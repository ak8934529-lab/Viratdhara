---
document_id: VIDEOPLAYER_COMPONENTS
title: Video Player — Components
version: 1.0.0
status: active
priority: high
depends_on:
  - VIDEOPLAYER_UI
  - COMPONENT_REGISTRY
related_documents:
  - COMPONENT_REGISTRY.md
related_entities: []
related_components:
  - PlayerBar
related_events: []
owner: Product Architecture
---

# Video Player — Components

## Why

`PlayerBar` (`packages/blocks`) already exists and is tagged V1 in `COMPONENT_REGISTRY.md` specifically for this feature — this document is where that gets used, not redefined.

## What

Components used by this feature.

## Rules

| Component | Used On | Scope |
| --- | --- | --- |
| `PlayerBar` | Mini player | V1 |
| Full player transport controls, seek bar | Full "Playing Now" screen | Not yet a named registered component — currently ad hoc per `apps/showcase`'s `PlayerScreen.tsx` reference; should be extracted into a real component before `apps/web` implementation. |

## Dependencies

- `VIDEOPLAYER_UI.md`, `COMPONENT_REGISTRY.md`

## Relationships

- `COMPONENT_REGISTRY.md` — `PlayerBar`'s existing V1 entry.
- `apps/showcase/src/pages/screens/PlayerScreen.tsx` — reference implementation to extract a reusable component from.

## Constraints

- The full player's controls should not stay ad hoc — extracting a named component (e.g. `PlayerTransportControls`) and registering it in `COMPONENT_REGISTRY.md` is expected before this feature is implementation-complete.

## Acceptance

Both UI surfaces use `PlayerBar` and a to-be-extracted transport-controls component, not one-off markup per screen.

## Future Scope

Extracting and registering the full-player transport component is the immediate next step for this feature.
