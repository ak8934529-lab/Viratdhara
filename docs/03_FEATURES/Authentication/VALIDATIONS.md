---
document_id: AUTHENTICATION_VALIDATIONS
title: Authentication — Validations
version: 1.1.0
status: active
priority: high
depends_on:
  - AUTHENTICATION_SPEC
  - VALIDATION_REGISTRY
related_documents:
  - VALIDATION_REGISTRY.md
  - ERROR_REGISTRY.md
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Authentication — Validations

## Why

Signup/login is where `email_format` and `password_minimum` (`VALIDATION_REGISTRY.md`) actually get enforced — this document is where that enforcement is specified for this feature, without redefining the shared rules themselves.

## What

Validation rules for signup and login, combining shared registry rules with this feature's own.

## Rules

| Rule | Source | Condition |
| --- | --- | --- |
| `email_format` | `VALIDATION_REGISTRY.md` | Email must be syntactically valid. |
| `password_minimum` | `VALIDATION_REGISTRY.md` | Resolved: 8–128 characters, no forced composition rules, breach-list check if feasible (NIST 800-63B-based, Commit 18). |
| Email uniqueness | Feature-owned | An email/password signup fails with `CONFLICT` if the email is already registered (via any auth method). |
| Social provider linkage | Feature-owned | A social signup with an email matching an existing email/password Account links to that Account rather than creating a duplicate — see `EDGE_CASES.md` for the collision this can create. |

## Dependencies

- `AUTHENTICATION_SPEC.md`, `VALIDATION_REGISTRY.md`

## Relationships

- `ERROR_REGISTRY.md` — `VALIDATION_FAILED`, `CONFLICT` codes used above.

## Constraints

None beyond the shared registry rule.

## Acceptance

Every signup/login validation failure maps to a code in `ERROR_REGISTRY.md` and a rule in this table.

## Future Scope

`password_minimum` may be revisited if `07_SECURITY` warrants a stricter policy later — see `VALIDATION_REGISTRY.md` Future Scope.
