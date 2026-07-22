---
document_id: SHARING_VALIDATIONS
title: Sharing — Validations
version: 1.0.0
status: active
priority: low
depends_on:
  - SHARING_SPEC
related_documents:
  - VALIDATION_REGISTRY.md
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Sharing — Validations

## Why

The one thing worth validating is that a resolved link actually points somewhere real and visible.

## What

Validation rule for share-link resolution.

## Rules

| Rule | Condition | Failure Handling |
| --- | --- | --- |
| `share_link_resolves` (feature-owned) | The Content id in a share link must exist and be `published`. | `NOT_FOUND` (`ERROR_REGISTRY.md`) if it doesn't — see `EDGE_CASES.md` for the exact user-facing treatment. |

## Dependencies

- `SHARING_SPEC.md`, `VALIDATION_REGISTRY.md`

## Relationships

- `ERROR_REGISTRY.md`

## Constraints

None beyond the above.

## Acceptance

Every resolved share link either shows the Content or a clear "not available" state — never a raw error or blank screen.

## Future Scope

None.
