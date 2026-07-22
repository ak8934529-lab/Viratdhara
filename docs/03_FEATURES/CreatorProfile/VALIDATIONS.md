---
document_id: CREATORPROFILE_VALIDATIONS
title: Creator Profile — Validations
version: 1.0.0
status: active
priority: low
depends_on:
  - CREATORPROFILE_SPEC
related_documents:
  - VALIDATION_REGISTRY.md
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Creator Profile — Validations

## Why

The one real constraint on the Follow action is who can follow whom.

## What

Validation rules for the Follow action.

## Rules

| Rule | Condition | Failure Handling |
| --- | --- | --- |
| `follow_requires_auth` (feature-owned) | Follow action requires `logged_in` session (`STATE_REGISTRY.md`). | `UNAUTHENTICATED` — routes to Authentication. |
| `no_self_follow` (feature-owned) | An Account cannot follow itself, even if it holds the Creator role. | Follow button is not shown / is disabled on a Creator's own profile view — see `EDGE_CASES.md`. |
| `followed_must_be_creator` (feature-owned) | The followed Account must hold the Creator role. | `VALIDATION_FAILED` if attempted against a non-Creator Account (should not be reachable via normal UI, but enforced regardless). |

## Dependencies

- `CREATORPROFILE_SPEC.md`, `VALIDATION_REGISTRY.md`

## Relationships

- `ERROR_REGISTRY.md`, `PERMISSION_MATRIX.md`

## Constraints

None beyond the above.

## Acceptance

No Follow relationship is ever created for an unauthenticated Account, a self-follow, or a non-Creator target.

## Future Scope

None.
