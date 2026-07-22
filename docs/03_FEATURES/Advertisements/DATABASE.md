---
document_id: ADVERTISEMENTS_DATABASE
title: Advertisements — Database
version: 1.0.0
status: active
priority: low
depends_on:
  - ADVERTISEMENTS_SPEC
  - ENTITY_REGISTRY
related_documents:
  - DOMAIN_MODEL.md
related_entities:
  - Advertisement
related_components: []
related_events: []
owner: Product Architecture
---

# Advertisements — Database

## Why

This feature reads `Advertisement` (`DOMAIN_MODEL.md`); it does not own creation/management fields, since no Administrator ad-management tooling exists yet.

## What

This feature reads `Advertisement` to select and serve one; it owns no fields on it.

## Rules

- No schema change originates from this feature.
- Ad-targeting criteria fields, if any, belong to the future Administrator ad-management feature, not this one.

## Dependencies

- `DOMAIN_MODEL.md`, `ENTITY_REGISTRY.md`

## Relationships

None beyond `Advertisement`.

## Constraints

None beyond the general no-invented-schema rule.

## Acceptance

No migration attributed to this feature touches `Advertisement` schema — only serving/tracking logic.

## Future Scope

Administrator ad-management (creation, targeting rules) is a separate, not-yet-scoped feature.
