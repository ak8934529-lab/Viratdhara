---
document_id: NAVIGATION_MODEL
title: Navigation Model
version: 1.1.0
status: active
priority: critical
depends_on:
  - INFORMATION_ARCHITECTURE
related_documents:
  - INFORMATION_ARCHITECTURE.md
  - URL_STRUCTURE.md
  - FEATURE_REGISTRY.md
related_entities: []
related_components:
  - MobileBottomNav
  - MobileTopBar
related_events: []
owner: Product Architecture
---

# Navigation Model

## Why

The reviewed Figma design had a bottom tab bar on the music/content screens but no navigation chrome at all on the temple/booking screens — a real inconsistency found during design review. Since booking is now out of V1 scope (`PRODUCT_VISION.md`), the Main App's navigation model is exactly the tab bar that already existed on the content/music screens. One navigation model, used everywhere in the Main App structural area.

## What

The Main App structural area (`INFORMATION_ARCHITECTURE.md`) uses one persistent bottom tab bar plus one persistent top bar, rendered via `MobileBottomNav` / `MobileTopBar` (`packages/mobile`).

## Rules

### Bottom Tab Bar (4 tabs, fixed order)

| Tab | Label | Feature | Content Type |
| --- | --- | --- | --- |
| 1 | Home | Content Discovery | Mixed |
| 2 | Suno | Content Discovery / Content Categorization | Audio |
| 3 | Dekho | Content Discovery / Content Categorization | Video |
| 4 | Shorts | Content Discovery | Video (short format) |

- Tab order is fixed. Reordering requires updating this document.
- Every tab belongs to Content Discovery / Content Categorization. No tab represents playback.
- Exactly one tab is active at a time, determined by the current route. No tab is driven by playback state.
- Playback is not a tab destination. It is reached by opening a Content item — from a Content card, or by tapping the docked mini player, which opens `/content/:id`, the single playback surface for both Content types (`URL_STRUCTURE.md`, `VideoPlayer/UI.md`). The mini player, not a tab, is what keeps an active session reachable from anywhere in the Main App — see `STATE_REGISTRY.md` for playback state.

### Top Bar

- Present on every Main App screen. There is no exception.
- Leading slot: back arrow on pushed/detail screens (`MobileDetailPage`), nothing on tab-root screens (`MobileTabShell`).
- Trailing slot: search icon (→ Search feature), notification bell, avatar (→ Settings).

### Creator Studio Navigation

- Not the same navigation instance as Main App. Entered from Settings/Profile (Creator role only) and exited back to Main App. Its own internal navigation is owned by the Creator Studio feature.

## Dependencies

- `INFORMATION_ARCHITECTURE.md` — structural areas this model applies to.

## Relationships

- `MobileBottomNav`, `MobileTopBar` (`COMPONENT_REGISTRY.md`) are the implementation of this model. This document is the rule; the component is the code.
- `URL_STRUCTURE.md` maps each tab to a route.

## Constraints

- No screen in the Main App structural area may omit both the top bar and bottom nav simultaneously (that combination previously existed only on the now-descoped booking screens).
- The bottom nav must never contain more or fewer than 4 tabs without a documented decision here first.
- **This 4-tab model replaced a 5-tab model, by explicit product direction.** The removed tab was "Playing Now" at position 3: it held the full player at `/playing-now` and was specified as active whenever a player session existed, and it carried this document's one top-bar exception (a minimize control instead of a back arrow, on the grounds that a tab root is not a pushed screen). It was removed because the docked mini player now opens `/content/:id`, which makes Content detail the single playback surface for both Content types — a tab dedicated to playback was then redundant, and the top-bar exception had nothing left to apply to. `URL_STRUCTURE.md` (the `/playing-now` route) and `VideoPlayer/UI.md` (the full player as a tab root) were updated in the same change rather than left to contradict this document. See `CHANGELOG.md` Milestone 25.

## Acceptance

Any Main App screen can be checked: it has the top bar, exactly one of {tab-root chrome, pushed-screen chrome}, and the bottom nav.

## Future Scope

An Administrator navigation model does not exist yet — see `INFORMATION_ARCHITECTURE.md` Future Scope.
