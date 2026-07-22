---
document_id: CREATORPROFILE_UI
title: Creator Profile — UI
version: 1.0.0
status: active
priority: medium
depends_on:
  - CREATORPROFILE_SPEC
  - RESPONSIVE_SYSTEM
related_documents:
  - URL_STRUCTURE.md
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Creator Profile — UI

## Why

One screen, reached from multiple places (Content detail's Creator byline, Creator Studio's own preview link) — needs one consistent layout.

## What

The public profile screen.

## Rules

- Route `/creator/:id` (`URL_STRUCTURE.md`), a pushed/detail screen.
- Layout: header (avatar, display name, Follow button), then a Content grid of the Creator's published items.
- At Wide breakpoint (`RESPONSIVE_SYSTEM.md`), the header may sit alongside the grid rather than stacked above it.
- Follow button reflects current state (Follow vs. Following) immediately on tap (optimistic UI), reconciled against the actual API result.

## Dependencies

- `CREATORPROFILE_SPEC.md`, `RESPONSIVE_SYSTEM.md`

## Relationships

- `URL_STRUCTURE.md` — `/creator/:id`.

## Constraints

- The Follow button is disabled (or routes to Authentication) rather than silently failing when the viewer is unauthenticated.

## Acceptance

The profile screen renders the Creator's info, published Content grid, and a correctly-stated Follow button in every case (own profile, authenticated viewer, unauthenticated viewer).

## Future Scope

Grid density at each breakpoint refined once viewable in `apps/web`.
