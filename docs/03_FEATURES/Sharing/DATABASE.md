---
document_id: SHARING_DATABASE
title: Sharing — Database
version: 1.0.0
status: active
priority: low
depends_on:
  - SHARING_SPEC
  - ENTITY_REGISTRY
related_documents:
  - DOMAIN_MODEL.md
related_entities:
  - Content
related_components: []
related_events: []
owner: Product Architecture
---

# Sharing — Database

## Why

This feature reads `Content` only — no new schema.

## What

This feature reads `Content` (`DOMAIN_MODEL.md`) to resolve a shared link; it owns no fields and introduces no new entity.

## Rules

- No "Share" entity (e.g. a persisted share-event record beyond the analytics event) is introduced without registering it in `ENTITY_REGISTRY.md` first.

## Dependencies

- `DOMAIN_MODEL.md`, `ENTITY_REGISTRY.md`

## Relationships

None beyond `Content`.

## Constraints

None beyond the general no-invented-entity rule.

## Acceptance

No migration attributed to this feature.

## Future Scope

None.
