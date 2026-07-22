---
document_id: SEARCH_SPEC
title: Search — Specification
version: 1.0.0
status: active
priority: high
depends_on:
  - SEARCH_README
related_documents:
  - CONTENT_ARCHITECTURE.md
related_entities:
  - Content
related_components: []
related_events:
  - content_searched
owner: Product Architecture
---

# Search — Specification

## Why

`CONTENT_ARCHITECTURE.md` names Search as one of five discoverability paths without specifying its matching behavior — this document is that specification.

## What

Query execution and result presentation.

## Rules

- A query matches Content whose title, Tag(s), or Category name contains the query text (case-insensitive substring match, minimum viable behavior — ranking/fuzzy-match sophistication is not specified and should not be assumed).
- A query executes on explicit submission (not necessarily on every keystroke — live-search-as-you-type is not specified as required).
- Results respect the same visibility rules as everywhere else: only `published` Content (`STATE_REGISTRY.md` Content Lifecycle) is searchable; `removed_by_creator`/`removed_by_moderation` Content never appears.
- Emits `content_searched` (`EVENT_REGISTRY.md`) on query execution.

## Dependencies

- `SEARCH_README.md`

## Relationships

- `CONTENT_ARCHITECTURE.md`, `STATE_REGISTRY.md`

## Constraints

- No search result ever includes non-`published` Content, regardless of match strength.
- No personalization/ranking-by-Account is added to Search's result ordering — that responsibility belongs to Recommendation Engine, not this feature.

## Acceptance

A query for a word in a published Content item's title, tag, or category returns that item; a query for a word only in a non-published item's title returns nothing.

## Future Scope

Autocomplete, typo-tolerance, and search history are not specified.
