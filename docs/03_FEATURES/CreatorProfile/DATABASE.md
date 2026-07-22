---
document_id: CREATORPROFILE_DATABASE
title: Creator Profile — Database
version: 1.1.0
status: active
priority: high
depends_on:
  - CREATORPROFILE_SPEC
  - ENTITY_REGISTRY
related_documents:
  - DOMAIN_MODEL.md
related_entities:
  - Follow
related_components: []
related_events: []
owner: Product Architecture
---

# Creator Profile — Database

## Why

This feature owns the `Follow` entity, added to `DOMAIN_MODEL.md`/`ENTITY_REGISTRY.md` in this same milestone.

## What

The `Follow` entity's fields, at the level this document owns (relationship existence; not analytics/history).

## Rules

- `Follow` is a directional relationship: one Account (follower) → one Account with Creator role (followed).
- Minimum fields: follower Account reference, followed Creator (Account) reference, created timestamp.
- No "unfollow history" is retained as a separate record — unfollowing deletes the `Follow` relationship, it does not soft-delete/archive it (no requirement for that has been stated).
- Cascade delete (resolved, Commit 18, see `EDGE_CASES.md`): a `Follow` record is deleted when either referenced Account is deleted, or when the followed Account's Creator role is revoked.

## Dependencies

- `DOMAIN_MODEL.md`, `ENTITY_REGISTRY.md`

## Relationships

- `DOMAIN_MODEL.md` — `Follow`'s relationship-level definition.

## Constraints

- No duplicate `Follow` record for the same follower/followed pair — following an already-followed Creator is a no-op (`SPEC.md`), not a second record.
- A Creator following themselves is not representable — see `EDGE_CASES.md`.

## Acceptance

The `Follow` entity supports create, idempotent-create (no-op on duplicate), and delete (unfollow).

## Future Scope

Follow-count aggregation (for potential display on the profile) is not specified as required.
