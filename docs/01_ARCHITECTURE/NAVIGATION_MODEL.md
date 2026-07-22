---
document_id: NAVIGATION_MODEL
title: Navigation Model
version: 1.0.0
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

### Bottom Tab Bar (5 tabs, fixed order)

| Tab | Label | Feature | Content Type |
| --- | --- | --- | --- |
| 1 | Home | Content Discovery | Mixed |
| 2 | Suno | Content Discovery / Content Categorization | Audio |
| 3 | Playing Now | Video Player (audio/video playback surface) | Current playback |
| 4 | Dekho | Content Discovery / Content Categorization | Video |
| 5 | Shorts | Content Discovery | Video (short format) |

- Tab order is fixed. Reordering requires updating this document.
- Exactly one tab is active at a time; "Playing Now" is active when a player session exists regardless of which tab the user browsed from — see `STATE_REGISTRY.md` for playback state.

### Top Bar

- Present on every Main App screen except the full Playing Now player view (which uses a minimize control, not a title bar back-arrow, since it isn't a "pushed" screen — see `MobileDetailPage` vs `MobileTabShell` in `COMPONENT_REGISTRY.md`).
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
- The bottom nav must never contain more or fewer than 5 tabs without a documented decision here first.

## Acceptance

Any Main App screen can be checked: it has exactly one of {tab-root chrome, pushed-screen chrome}, and both always include the bottom nav.

## Future Scope

An Administrator navigation model does not exist yet — see `INFORMATION_ARCHITECTURE.md` Future Scope.
