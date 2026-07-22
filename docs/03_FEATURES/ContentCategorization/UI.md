---
document_id: CONTENTCATEGORIZATION_UI
title: Content Categorization — UI
version: 1.0.0
status: active
priority: medium
depends_on:
  - CONTENTCATEGORIZATION_SPEC
  - NAVIGATION_MODEL
  - RESPONSIVE_SYSTEM
related_documents:
  - URL_STRUCTURE.md
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Content Categorization — UI

## Why

Category browsing appears inline on Home/Suno/Dekho (as a filter row) and as its own pushed screen (`/category/:id`) — both need to be built from the same components, not two divergent implementations.

## What

Two UI surfaces for this feature.

## Rules

### Inline filter row

- Appears at the top of Home, Suno, and Dekho tab screens (`NAVIGATION_MODEL.md`).
- Mobile (`apps/showcase`/future native): `MobileChipRow`/`MobileFilterChip`.
- Web (`apps/web`, per `RESPONSIVE_SYSTEM.md`): a web-native equivalent chip row, same interaction pattern (`UX_PATTERNS.md` — non-exclusive filter → chip row), styled per `SURFACE_SYSTEM.md`.

### Category browse screen

- Route `/category/:id` (`URL_STRUCTURE.md`), a pushed/detail screen.
- Shows Content grid/list scoped to the Category, with an optional Tag filter row.
- At Compact breakpoint: single column. Medium: 2-column grid. Wide: 3+ column grid (`RESPONSIVE_SYSTEM.md`).

## Dependencies

- `CONTENTCATEGORIZATION_SPEC.md`, `NAVIGATION_MODEL.md`, `RESPONSIVE_SYSTEM.md`

## Relationships

- `URL_STRUCTURE.md` — `/category/:id`.

## Constraints

- The inline filter row and the dedicated browse screen must use the same Category list and the same Tag filtering behavior — not two independently implemented filtering systems.

## Acceptance

Selecting a Category from the inline filter row and navigating to `/category/:id` directly both produce the same filtered Content set.

## Future Scope

Actual visual grid density per breakpoint is refined once `apps/web` exists to view it in-browser.
