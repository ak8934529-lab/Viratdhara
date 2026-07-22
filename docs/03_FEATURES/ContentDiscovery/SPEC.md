---
document_id: CONTENTDISCOVERY_SPEC
title: Content Discovery — Specification
version: 1.1.0
status: active
priority: critical
depends_on:
  - CONTENTDISCOVERY_README
related_documents:
  - CONTENT_ARCHITECTURE.md
  - NAVIGATION_MODEL.md
related_entities:
  - Content
  - Playlist
related_components: []
related_events:
  - content_viewed
  - playlist_created
  - playlist_item_added
owner: Product Architecture
---

# Content Discovery — Specification

## Why

`CONTENT_ARCHITECTURE.md` names Content Discovery as one of five discoverability paths; this document specifies what that feed actually composes.

## What

Feed composition for Home, Suno, Dekho, and Shorts.

## Rules

- **Home**: mixed Content type, composed entirely of Recommendation Engine output (resolved, Commit 18: no separate editorial "featured" source in V1 — see `EDGE_CASES.md`). (The reviewed design's temple-live carousel is out of scope per the V1 booking/commerce exclusion — `PRODUCT_VISION.md`; Home's actual V1 composition is narrower than what was visually reviewed.)
- **Suno**: Audio Content only, composed of Category-browsable sections (`Content Categorization`) plus Recommendation Engine output scoped to Audio.
- **Dekho**: Video Content only (excluding short-format), same composition pattern as Suno scoped to Video.
- **Shorts**: Video Content with `format: short` (`CONTENT_ARCHITECTURE.md`), typically a single-column vertical feed.
- Opening any Content item from any feed emits `content_viewed`.
- A user may create a Playlist and add Content to it from any feed (`playlist_created`, `playlist_item_added`).

## Dependencies

- `CONTENTDISCOVERY_README.md`, `CONTENT_ARCHITECTURE.md`, `NAVIGATION_MODEL.md`

## Relationships

- `RecommendationEngine`, `ContentCategorization` — the two composed inputs.

## Constraints

- No feed ever shows non-`published` Content.
- No feed mixes in Advertisement units directly — ad placement is Video Player's pre-roll only (`ADVERTISEMENTS_README.md`), not a Content Discovery feed placement in this pass.

## Acceptance

Each of the 4 tabs shows only Content of its stated type/format, sourced only from the two named inputs.

## Future Scope

A distinct editorial "featured" curation mechanism for Home, beyond Recommendation Engine's output, is not V1 — see `EDGE_CASES.md`.
