---
document_id: VIDEOPLAYER_UI
title: Video Player — UI
version: 1.2.0
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
  - PlaybackStage
  - MiniPlayer
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
- Tapping it opens the full player — that is, `/content/:id` for the currently loaded item.

### Full player (composed inside Content detail)

- Not a route of its own and not a tab. It is composed inside `/content/:id` (`URL_STRUCTURE.md`) by `PlaybackStage` (`COMPONENTS.md`), which makes Content detail the single playback surface for both Content types.
- **One video surface for both Content types.** `PlaybackStage` renders exactly one 16:9 `<video>` element, whether the item is Video or Audio Content. There is deliberately no separate audio layout — the square-artwork-plus-transport-plus-lyrics stage this document previously specified for Audio was removed by explicit product direction, which favours a single player shape over two presentations of one feature.
- **Audio supplies its artwork as the `poster` frame.** An audio item has nothing to render in a video element, so its generated artwork (`COMPONENT_LIBRARY.md`, `lib/poster-art.ts`) is set as the element's `poster`. It therefore presents as a poster rather than a black rectangle, which is what makes one video-shaped surface acceptable for Audio at all.
- Title/creator, and a transport row below the player: shuffle, previous, play/pause, next, repeat, add-to-playlist, with elapsed/remaining time. The transport row is retained alongside the native video controls because those cover play/pause and seeking but **not track stepping** — previous/next, shuffle, and repeat have no native equivalent.
- **No minimize control.** The full player is no longer a tab root — it is reached from a Content card or from the mini player, so it is a pushed screen and carries the normal pushed-screen chrome: top bar with a back arrow, per `NAVIGATION_MODEL.md`. A minimize control was specified here only for as long as the player was a tab root.
- At Wide breakpoint (`RESPONSIVE_SYSTEM.md`), `apps/web` may show a secondary panel (e.g. up-next/queue) alongside the player — not required at Compact/Medium.

This replaced a full player at `/playing-now`, reached from a "Playing Now" bottom-nav tab, by explicit product direction. The tab, the route, and the minimize control were removed together; `NAVIGATION_MODEL.md` and `URL_STRUCTURE.md` were updated in the same change. See `CHANGELOG.md` Milestone 25.

### Open item — the lyrics/detail panel is specified but not rendered

The lyrics/detail panel this document specified "where applicable" belonged to the removed audio layout. With the move to one video surface it is **not currently rendered anywhere**. It is recorded here as an open item, not withdrawn: the requirement stands, and it now has no home. Resolving it needs a product decision — either a panel below or beside the video surface that works for both Content types, or an explicit decision to drop lyrics from V1. Until then, no agent should read this document's Rules as satisfied.

## Dependencies

- `VIDEOPLAYER_SPEC.md`, `NAVIGATION_MODEL.md`, `RESPONSIVE_SYSTEM.md`

## Relationships

- `URL_STRUCTURE.md` — `/content/:id`, which carries both surfaces of this feature's full player.
- `NAVIGATION_MODEL.md` — the 4-tab bottom nav, none of which is playback, and the top bar's now-unconditional presence.
- `SURFACE_SYSTEM.md` — the full player's artwork panel is a strong candidate for the single `surface-glass-accent` treatment per screen.

## Constraints

- The mini player never disappears due to navigation alone — only an explicit stop or playback completion removes it. One narrow exception, introduced with the move to `/content/:id`: it is suppressed on the loaded item's own Content page, where the full player is already on screen and a docked bar would be a second control for the same session. The session itself is untouched, and the bar returns on navigating away.

## Acceptance

The mini player appears whenever Playback state is active and correctly reflects play/pause state; the full player shows accurate elapsed/remaining time and responds to seek.

## Future Scope

Queue/up-next panel is Wide-breakpoint-only for now, per `RESPONSIVE_SYSTEM.md`.
