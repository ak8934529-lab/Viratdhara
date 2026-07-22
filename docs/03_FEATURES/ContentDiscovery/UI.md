---
document_id: CONTENTDISCOVERY_UI
title: Content Discovery — UI
version: 1.0.0
status: active
priority: high
depends_on:
  - CONTENTDISCOVERY_SPEC
  - NAVIGATION_MODEL
  - RESPONSIVE_SYSTEM
related_documents:
  - URL_STRUCTURE.md
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Content Discovery — UI

## Why

Four tab-root screens, each a feed of sections — one layout pattern, varied only by which sections/Content-type each tab includes.

## What

The 4 tab screens.

## Rules

| Screen | Route | Nav Tab |
| --- | --- | --- |
| Home | `/` (authenticated) | Home |
| Suno | `/suno` | Suno |
| Dekho | `/dekho` | Dekho |
| Shorts | `/shorts` | Shorts |

- Each uses `MobileTabShell` (top bar with no back-arrow, bottom nav) per `NAVIGATION_MODEL.md`.
- Sections within a feed use `MobileSectionHeading` + a horizontally-scrolling or grid Content-card row, consistent with `Content Categorization`'s browse-screen visual language.
- Shorts uses a distinct single-column, full-screen-per-item vertical feed, not the section/row pattern of the other three.
- At Wide breakpoint (`RESPONSIVE_SYSTEM.md`), Home/Suno/Dekho sections may show more columns per row; Shorts stays single-item-at-a-time regardless of breakpoint (its format is inherently full-viewport).

## Dependencies

- `CONTENTDISCOVERY_SPEC.md`, `NAVIGATION_MODEL.md`, `RESPONSIVE_SYSTEM.md`

## Relationships

- `URL_STRUCTURE.md`, `ContentCategorization`'s `UI.md` (shared visual language).

## Constraints

- Shorts never adopts the section/row layout of the other three tabs.

## Acceptance

Each tab renders its correct route, correct Content type/format, and correct layout pattern (sectioned vs. Shorts' vertical feed).

## Future Scope

Exact section ordering/curation on Home is pending the featured-vs-algorithmic decision (`SPEC.md` Future Scope).
