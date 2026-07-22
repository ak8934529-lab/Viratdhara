---
document_id: CREATORPROFILE_API
title: Creator Profile — API
version: 1.0.0
status: draft
priority: medium
depends_on:
  - CREATORPROFILE_SPEC
  - API_REGISTRY
related_documents:
  - API_REGISTRY.md
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Creator Profile — API

## Why

This feature needs a new API group — `Follow` doesn't fit cleanly under `Creator` (which is about a Creator managing their own Content) or `Content` (which is about the media itself).

## What

Operations needed. Adds a `Follow` group to `API_REGISTRY.md` in this same change.

## Rules

- This document inherits `API_REGISTRY.md`'s `draft` status.

## Operations (planned)

| Operation | Group | Purpose |
| --- | --- | --- |
| Get Creator profile | `Creator` (existing group) | Public profile data + their published Content |
| Follow Creator | `Follow` (new group) | Create a Follow relationship |
| Unfollow Creator | `Follow` (new group) | Remove a Follow relationship |

## Dependencies

- `CREATORPROFILE_SPEC.md`, `API_REGISTRY.md`

## Relationships

- `ERROR_REGISTRY.md` — `UNAUTHENTICATED` if Follow is attempted without a session; `CONFLICT` is not used for a duplicate follow (idempotent success instead, per `SPEC.md`).

## Constraints

- `API_REGISTRY.md` must be updated with the new `Follow` group in the same commit as this document, per `AI_DOCUMENTATION_AGENT.md`.

## Acceptance

Once finalized, Follow/Unfollow are one real group, distinct from `Creator` and `Content`.

## Future Scope

A "list followers"/"list following" operation is not specified — see `README.md` Future Scope.
