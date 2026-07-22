---
document_id: ENTITY_REGISTRY
title: Entity Registry
version: 1.0.0
status: active
priority: critical
depends_on:
  - DOMAIN_MODEL
related_documents:
  - DOMAIN_MODEL.md
related_entities:
  - Account
  - Content
  - Category
  - Tag
  - Playlist
  - Recommendation
  - Advertisement
related_components: []
related_events: []
owner: Product Architecture
---

# Entity Registry

## Why

A flat, single-glance list of every entity that officially exists, so a feature document can check "does this entity already exist" without reading the full relationship model in `DOMAIN_MODEL.md`.

## What

The authoritative list of entities. An entity not listed here does not exist for documentation or implementation purposes.

## Rules

- This registry lists entities. It does not define their fields or relationships — see `DOMAIN_MODEL.md` for that.
- Adding an entity requires adding it to `DOMAIN_MODEL.md`'s relationship model in the same change.

## Registry

| Entity | Owning Concept | Status | Defined In |
| --- | --- | --- | --- |
| `Account` | Identity | active | `DOMAIN_MODEL.md` |
| `Content` | Core media unit | active | `DOMAIN_MODEL.md` |
| `Category` | Content grouping | active | `DOMAIN_MODEL.md` |
| `Tag` | Content labeling | active | `DOMAIN_MODEL.md` |
| `Playlist` | User collection | active | `DOMAIN_MODEL.md` |
| `Recommendation` | Generated association | active | `DOMAIN_MODEL.md` |
| `Advertisement` | Ad unit | active | `DOMAIN_MODEL.md` |

## Dependencies

- `DOMAIN_MODEL.md`

## Relationships

Every feature's `DATABASE.md` must reference entities by the exact name in this table.

## Constraints

- No feature document may introduce a new entity name inline. Add it here and to `DOMAIN_MODEL.md` first.

## Acceptance

Grepping this table for an entity name gives a definitive yes/no on whether it is real.

## Future Scope

Entities for future/long-term modules (`Event`, `Temple`, `Donation`, `Course`, `Article`, `Book`, per `PRODUCT_VISION.md`) are added here when those modules are promoted to `FEATURE_REGISTRY.md`.
