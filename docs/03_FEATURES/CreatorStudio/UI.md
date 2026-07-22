---
document_id: CREATORSTUDIO_UI
title: Creator Studio — UI
version: 1.0.0
status: active
priority: medium
depends_on:
  - CREATORSTUDIO_SPEC
  - INFORMATION_ARCHITECTURE
  - RESPONSIVE_SYSTEM
related_documents:
  - URL_STRUCTURE.md
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Creator Studio — UI

## Why

Creator Studio is its own structural area (`INFORMATION_ARCHITECTURE.md`) with its own navigation, not the shared Main App bottom nav.

## What

Three screens.

## Rules

| Screen | Route (`URL_STRUCTURE.md`) |
| --- | --- |
| Studio home | `/creator-studio` |
| Content management | `/creator-studio/content` |
| Analytics | `/creator-studio/analytics` |

- These three screens share Creator Studio's own navigation (`INFORMATION_ARCHITECTURE.md` — "own nav, not the shared bottom nav"), entered from Settings/Profile for Creator-role Accounts.
- At Wide breakpoint (`RESPONSIVE_SYSTEM.md`), Content management may show a denser, more table-like row layout than the consumer-facing card grids — still using `SURFACE_SYSTEM.md`'s glass/depth surface tiers (`surface-glass-base` rows), just a tighter information density suited to management rather than browsing.

## Dependencies

- `CREATORSTUDIO_SPEC.md`, `INFORMATION_ARCHITECTURE.md`, `RESPONSIVE_SYSTEM.md`

## Relationships

- `URL_STRUCTURE.md`

## Constraints

- No screen here is reachable via the Main App bottom nav — entry is exclusively through Settings/Profile for Creator-role Accounts.

## Acceptance

All 3 routes render correctly and are reachable only for Creator-role Accounts.

## Future Scope

Exact Wide-breakpoint layout for Content management is refined once viewable in `apps/web`.
