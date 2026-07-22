---
document_id: AUTHENTICATION_API
title: Authentication — API
version: 1.0.0
status: draft
priority: medium
depends_on:
  - AUTHENTICATION_SPEC
  - API_REGISTRY
related_documents:
  - API_REGISTRY.md
  - ERROR_REGISTRY.md
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Authentication — API

## Why

This feature owns the `Auth` group in `API_REGISTRY.md`. Detailing its operations here (still without a finalized contract) keeps the operation list visible ahead of `04_BACKEND` architecture being decided.

## What

Operations the `Auth` API group must support, at the operation-name level — no request/response shape, since `API_REGISTRY.md` itself is `draft` pending backend architecture.

## Rules

- This document inherits `API_REGISTRY.md`'s `draft` status and the same rule: no endpoint path/method/payload is finalized here.

## Operations (planned)

| Operation | Purpose |
| --- | --- |
| Sign up (email/password) | Create Account, start session |
| Sign up (social provider) | Create/link Account via Google, Facebook, or Apple, start session |
| Log in (email/password) | Authenticate existing Account, start session |
| Log in (social provider) | Authenticate existing Account via social provider, start session |
| Log out | End session |
| Get current session | Check `logged_in`/`logged_out` state on app load |

## Dependencies

- `AUTHENTICATION_SPEC.md`, `API_REGISTRY.md`

## Relationships

- `ERROR_REGISTRY.md` — expected error codes: `VALIDATION_FAILED` (bad email/password), `CONFLICT` (email already registered), `UNAUTHENTICATED` (invalid credentials).

## Constraints

- No operation beyond the six above is added without updating `AUTHENTICATION_SPEC.md` first.

## Acceptance

Once `04_BACKEND` architecture exists, each operation above maps to one real endpoint without needing to be renamed or split.

## Future Scope

Password reset and MFA operations are not listed — see `AUTHENTICATION_README.md` Future Scope.
