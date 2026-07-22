---
document_id: SEARCH_UI
title: Search — UI
version: 1.0.0
status: active
priority: medium
depends_on:
  - SEARCH_SPEC
  - NAVIGATION_MODEL
  - RESPONSIVE_SYSTEM
related_documents:
  - URL_STRUCTURE.md
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Search — UI

## Why

Search is entered from the same top-bar icon on every Main App screen (`NAVIGATION_MODEL.md`) — one consistent entry point, one results screen.

## What

Entry point and results screen for this feature.

## Rules

- Entry point: search icon in `MobileTopBar`'s trailing slot (mobile) / equivalent in `apps/web`'s top nav (`RESPONSIVE_SYSTEM.md`), present on every Main App screen.
- Route: `/search` (`URL_STRUCTURE.md`) — a pushed/detail screen (back arrow, not a tab root).
- Results are presented as a Content grid/list, matching `Content Categorization`'s browse-screen layout for visual consistency (`UX_PATTERNS.md`).
- No-results state uses `MobileEmptyState` (`UX_PATTERNS.md`), never blank space.

## Dependencies

- `SEARCH_SPEC.md`, `NAVIGATION_MODEL.md`, `RESPONSIVE_SYSTEM.md`

## Relationships

- `URL_STRUCTURE.md` — `/search`.
- `ContentCategorization`'s `UI.md` — the grid layout this feature's results screen matches.

## Constraints

- The search input itself is always visible/focused on entering `/search` — not a secondary action after landing on the screen.

## Acceptance

Tapping the search icon from any Main App screen reaches the same `/search` screen with an immediately focused input.

## Future Scope

Breakpoint-specific result grid density follows `Content Categorization`'s once that's finalized in-browser.
