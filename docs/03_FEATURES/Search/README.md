---
document_id: SEARCH_README
title: Search — Overview
version: 1.0.0
status: active
priority: high
depends_on:
  - CONTENT_ARCHITECTURE
  - FEATURE_REGISTRY
related_documents:
  - SEARCH_SPEC.md
related_entities:
  - Content
related_components: []
related_events:
  - content_searched
owner: Product Architecture
---

# Search

## Why

Content Discovery and Recommendation Engine surface Content passively; Search is the one path where a user directly states intent — it needs to be fast and predictable rather than reuse Discovery's ranking logic.

## What

This feature owns the search query input, query execution against Content (title/tag/category match, per `CONTENT_ARCHITECTURE.md` Discoverability), and the results screen. It does not own ranking/personalization beyond straightforward relevance match — that distinction belongs to Recommendation Engine.

## Documents in This Feature

| Document | Purpose |
| --- | --- |
| `SPEC.md` | Functional specification |
| `UI.md` | Search entry point and results screen |
| `COMPONENTS.md` | `MobileSearchBar` and web equivalent |
| `API.md` | Search query operation |
| `DATABASE.md` | Read-only relationship to `Content` |
| `STATES.md` | Query/results state (idle, searching, results, no-results, error) |
| `VALIDATIONS.md` | Query input constraints |
| `EVENTS.md` | `content_searched` |
| `EDGE_CASES.md` | Empty query, no results, special characters |
| `TEST_CASES.md` | Test cases traced to the above |
| `PROMPTS.md` | Canonical prompts for implementing this feature |
| `CHANGELOG.md` | History of changes to this feature's documentation |

## Dependencies

- `CONTENT_ARCHITECTURE.md` — the discoverability path this feature implements.

## Relationships

- `NAVIGATION_MODEL.md` — search icon in the top bar's trailing slot is this feature's entry point.
- `Content Discovery`, `Recommendation Engine` — related but distinct discoverability paths.

## Constraints

- This feature does not personalize results by Account — that would duplicate Recommendation Engine's responsibility.

## Acceptance

A user can enter a query and see Content whose title, tags, or category match it.

## Future Scope

Search suggestions/autocomplete and search history are not specified — added only with a real design for them.
