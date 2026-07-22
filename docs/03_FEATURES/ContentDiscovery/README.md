---
document_id: CONTENTDISCOVERY_README
title: Content Discovery — Overview
version: 1.0.0
status: active
priority: critical
depends_on:
  - CONTENT_ARCHITECTURE
  - RECOMMENDATIONENGINE_README
  - CONTENTCATEGORIZATION_README
  - FEATURE_REGISTRY
related_documents:
  - CONTENTDISCOVERY_SPEC.md
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

# Content Discovery

## Why

This is the highest-dependency V1 feature (`DEPENDENCY_GRAPH.md`) — it's the Home/Suno/Dekho/Shorts tab content, composing Recommendation Engine's personalized output and Content Categorization's browsable structure into one feed per tab.

## What

This feature owns the Home, Suno, Dekho, and Shorts tab screens (`NAVIGATION_MODEL.md`) — each a feed composed of: featured/live sections, Recommendation Engine output, and Category-browsable sections. It also owns Playlist creation/management (per `PRODUCT_CONTEXT.md`, Users "create playlists").

## Documents in This Feature

| Document | Purpose |
| --- | --- |
| `SPEC.md` | Functional specification |
| `UI.md` | Home/Suno/Dekho/Shorts tab screens |
| `COMPONENTS.md` | Feed section components, Playlist components |
| `API.md` | Feed composition, Playlist CRUD |
| `DATABASE.md` | `Playlist` entity detail |
| `STATES.md` | None owned beyond Playlist CRUD (no state machine) |
| `VALIDATIONS.md` | Playlist name validation |
| `EVENTS.md` | `content_viewed`, `playlist_created`, `playlist_item_added` |
| `EDGE_CASES.md` | Empty feed, feed composition when Recommendation Engine has nothing to serve |
| `TEST_CASES.md` | Test cases traced to the above |
| `PROMPTS.md` | Canonical prompts for implementing this feature |
| `CHANGELOG.md` | History of changes to this feature's documentation |

## Dependencies

- `CONTENT_ARCHITECTURE.md`, `Recommendation Engine`, `Content Categorization` (`DEPENDENCY_GRAPH.md`).

## Relationships

- `NAVIGATION_MODEL.md` — 4 of the 5 bottom-nav tabs (Home, Suno, Dekho, Shorts) belong to this feature; "Playing Now" belongs to Video Player.

## Constraints

- This feature does not implement the Recommendation ranking algorithm itself — it consumes Recommendation Engine's output as-is (`RECOMMENDATIONENGINE_README.md`).
- This feature does not implement Category management — it consumes Content Categorization's browse structure as-is.

## Acceptance

Each of the 4 tabs renders a feed composed of the sections specified in `SPEC.md`, using only `published` Content.

## Future Scope

Feed personalization beyond what Recommendation Engine provides (e.g. this feature re-ranking within its own feed) is not specified.
