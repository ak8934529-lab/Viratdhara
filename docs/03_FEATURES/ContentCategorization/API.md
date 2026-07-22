---
document_id: CONTENTCATEGORIZATION_API
title: Content Categorization — API
version: 1.0.0
status: draft
priority: medium
depends_on:
  - CONTENTCATEGORIZATION_SPEC
  - API_REGISTRY
related_documents:
  - API_REGISTRY.md
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Content Categorization — API

## Why

This feature reads from the `Content` API group (`API_REGISTRY.md`); it does not need its own group.

## What

Read-only operations this feature needs from the `Content` group.

## Rules

- This document inherits `API_REGISTRY.md`'s `draft` status.

## Operations (planned)

| Operation | Purpose |
| --- | --- |
| List Categories | Get the fixed V1 Category list (source TBD — see `SPEC.md`) |
| List Content by Category (+ optional Tag filter) | Populate the browse screen and inline filter results |

## Dependencies

- `CONTENTCATEGORIZATION_SPEC.md`, `API_REGISTRY.md`

## Relationships

- `ERROR_REGISTRY.md` — `NOT_FOUND` for an invalid Category id.

## Constraints

- No write operation (create/edit Category) belongs to this feature's API surface.

## Acceptance

Once `API_REGISTRY.md`'s `Content` group is finalized, these two read operations are a subset of it, not a separate group.

## Future Scope

None beyond `API_REGISTRY.md`'s own.
