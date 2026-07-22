---
document_id: RECOMMENDATIONENGINE_DATABASE
title: Recommendation Engine — Database
version: 1.0.0
status: active
priority: high
depends_on:
  - RECOMMENDATIONENGINE_SPEC
  - ENTITY_REGISTRY
related_documents:
  - DOMAIN_MODEL.md
related_entities:
  - Recommendation
related_components: []
related_events: []
owner: Product Architecture
---

# Recommendation Engine — Database

## Why

This feature owns the `Recommendation` entity, already defined at the relationship level in `DOMAIN_MODEL.md`.

## What

Fields on `Recommendation` this feature owns.

## Rules

- Minimum fields: Account reference, Content reference, generated timestamp. A ranking score/weight field is likely needed once an algorithm is chosen, but is not specified now (`SPEC.md`).
- `Recommendation` records are system-generated, never user-authored (`DOMAIN_MODEL.md`) — no create/update API exists for a human to directly write one.

## Dependencies

- `DOMAIN_MODEL.md`, `ENTITY_REGISTRY.md`

## Relationships

- `Content`, `Account` (`DOMAIN_MODEL.md`) — the entities `Recommendation` references.

## Constraints

- No new entity beyond `Recommendation` itself is introduced by this feature.

## Acceptance

`Recommendation` records support read (serve) and the two tracking events; no direct write API for end users exists.

## Future Scope

A ranking-score field is anticipated once an algorithm is chosen but not added speculatively now.
