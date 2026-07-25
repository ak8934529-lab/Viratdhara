---
document_id: VIDEOPLAYER_COMPONENTS
title: Video Player — Components
version: 1.2.0
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
  - PlaybackStage
  - MiniPlayer
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
| `PlayerBar` | Mini player (`packages/blocks`) | V1 |
| `MiniPlayer` | Mini player (`apps/web`) | V1 — `apps/web`'s own docked bar, parallel to `PlayerBar` rather than a wrapper over it, per `COMPONENT_REGISTRY.md`. |
| `PlaybackStage` | The player surface — one surface for both Content types, composed inside `/content/:id` | V1 — `apps/web/src/components/content/PlaybackStage.tsx`, registered in `COMPONENT_REGISTRY.md`. |

`PlaybackStage` is the player surface component this document previously called for and left unnamed. It renders **one 16:9 `<video>` element for both Content types** — there is no separate audio layout (`UI.md`) — and supplies an Audio item's generated artwork as that element's `poster` frame. It registers the media element with the shared player context so the mini player reflects one session rather than competing with a second.

## Dependencies

- `VIDEOPLAYER_UI.md`, `COMPONENT_REGISTRY.md`

## Relationships

- `COMPONENT_REGISTRY.md` — `PlayerBar`'s existing V1 entry, and `PlaybackStage`/`MiniPlayer`'s `apps/web` entries.
- `apps/showcase/src/pages/screens/PlayerScreen.tsx` — the original reference implementation `PlaybackStage` was extracted from.

## Constraints

- The full player's controls are no longer ad hoc. The named component this document expected — provisionally `PlayerTransportControls` — is realised as `PlaybackStage`. **Seeking is not its to own**: the native video controls handle play/pause and seeking, so there is no component-owned seek bar. What `PlaybackStage` owns is the poster frame and the transport row — track stepping (previous/next), shuffle, repeat, and add-to-playlist — which exists precisely because the native controls do not cover any of it (`UI.md`). The transport row is internal to it and is not separately registered; if a second surface ever needs it alone, that is when it gets extracted and registered, not before.
- Playback markup may not be hand-rolled on any screen. A surface that needs the player composes `PlaybackStage`.

## Acceptance

Both UI surfaces use registered components — `PlaybackStage` for the player surface and `MiniPlayer`/`PlayerBar` for the docked bar — not one-off markup per screen.

## Future Scope

`packages/blocks`'s `PlayerBar` and `apps/web`'s `MiniPlayer` are two implementations of one concept, as is the case across the two component sets generally — see `COMPONENT_REGISTRY.md` Future Scope. There is no `packages/*` counterpart to `PlaybackStage` yet.
