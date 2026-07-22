---
document_id: CREATORSTUDIO_DATABASE
title: Creator Studio — Database
version: 1.0.0
status: active
priority: medium
depends_on:
  - CREATORSTUDIO_SPEC
  - ENTITY_REGISTRY
related_documents:
  - DOMAIN_MODEL.md
related_entities:
  - Content
related_components: []
related_events: []
owner: Product Architecture
---

# Creator Studio — Database

## Why

This feature is the write path for `Content` — the entity every other feature only reads.

## What

This feature writes `Content` (`DOMAIN_MODEL.md`): title, type, Category, Tags, media reference, lifecycle state (`STATE_REGISTRY.md`), owning Creator (set once, immutable, per `CONTENT_ARCHITECTURE.md`).

## Rules

- Only the owning Creator's writes are valid — enforced via `PERMISSION_MATRIX.md`'s "own only" scoping at the data layer.
- Analytics are computed/read from existing event data (`EVENT_REGISTRY.md`), not stored as separate mutable `Content` fields.

## Dependencies

- `DOMAIN_MODEL.md`, `ENTITY_REGISTRY.md`

## Relationships

- `Content` (`DOMAIN_MODEL.md`) — this feature's primary write target.

## Constraints

- No new entity is introduced — `Content` already exists and is sufficient.

## Acceptance

Content writes are always scoped to the requesting Creator's own items.

## Future Scope

None.
