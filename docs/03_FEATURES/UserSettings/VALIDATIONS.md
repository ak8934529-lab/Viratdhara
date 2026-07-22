---
document_id: USERSETTINGS_VALIDATIONS
title: User Settings — Validations
version: 1.1.0
status: active
priority: low
depends_on:
  - USERSETTINGS_SPEC
related_documents:
  - VALIDATION_REGISTRY.md
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# User Settings — Validations

## Why

Settings input is mostly toggles/selections rather than free text — little to validate, stated explicitly.

## What

Validation rules owned by this feature.

## Rules

| Rule | Condition | Failure Handling |
| --- | --- | --- |
| `notification_toggle_valid` (feature-owned) | Toggled category must be one of the 3 confirmed V1 categories (`SPEC.md`): new content from followed Creators, engagement on your activity, product & platform announcements. | `VALIDATION_FAILED` |

## Dependencies

- `USERSETTINGS_SPEC.md`, `VALIDATION_REGISTRY.md`

## Relationships

None beyond `ERROR_REGISTRY.md`.

## Constraints

None beyond the above.

## Acceptance

No setting is persisted with a notification category outside the 3 confirmed values.

## Future Scope

None.
