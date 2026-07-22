---
document_id: CONTENTDISCOVERY_API
title: Content Discovery — API
version: 1.0.0
status: draft
priority: high
depends_on:
  - CONTENTDISCOVERY_SPEC
  - API_REGISTRY
related_documents:
  - API_REGISTRY.md
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Content Discovery — API

## Why

This feature composes reads from `Content` and `Recommendations` groups, plus owns `Playlists` (`API_REGISTRY.md`).

## What

Operations this feature needs.

## Rules

- This document inherits `API_REGISTRY.md`'s `draft` status.

## Operations (planned)

| Operation | Group | Purpose |
| --- | --- | --- |
| Get feed sections (per tab) | `Content` | Composed read: featured + category-browsable Content, scoped by tab's type/format |
| Get Recommendations | `Recommendations` (Recommendation Engine's group) | Consumed, not owned, by this feature |
| Create Playlist | `Playlists` | New Playlist for an Account |
| Add Content to Playlist | `Playlists` | Append Content reference |

## Dependencies

- `CONTENTDISCOVERY_SPEC.md`, `API_REGISTRY.md`

## Relationships

- `ERROR_REGISTRY.md`

## Constraints

- Feed composition logic (which sections, in what order) is a `04_BACKEND`/client concern layered on top of these reads, not a separate documented API operation beyond "get feed sections."

## Acceptance

Once finalized, these operations map to the `Content`/`Recommendations`/`Playlists` groups without needing new groups.

## Future Scope

None beyond `API_REGISTRY.md`'s own.
