---
document_id: ERROR_REGISTRY
title: Error Registry
version: 1.0.0
status: draft
priority: medium
depends_on:
  - API_REGISTRY
related_documents:
  - API_REGISTRY.md
  - VALIDATION_REGISTRY.md
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Error Registry

## Why

Every API group in `API_REGISTRY.md` will need to fail in predictable, shared ways (not found, unauthorized, invalid input). One registry prevents each feature from inventing its own error vocabulary.

## What

The error categories every API group in V1 shares. Feature-specific error detail belongs in that feature's own `EDGE_CASES.md`; this registry is only the shared category vocabulary.

## Rules

- An error code is `SCREAMING_SNAKE_CASE`.
- A feature may not invent a new top-level error category without adding it here first. A feature may have specific *causes* of a shared category (documented in its own `EDGE_CASES.md`).

## Registry

| Code | Meaning | Applies To |
| --- | --- | --- |
| `UNAUTHENTICATED` | No valid session present. | Any API group requiring login |
| `PERMISSION_DENIED` | Session valid, but `PERMISSION_MATRIX.md` denies the action. | Creator/Administrator-gated actions |
| `NOT_FOUND` | Requested entity does not exist or is not visible to the requester. | All groups |
| `VALIDATION_FAILED` | Input failed a rule in `VALIDATION_REGISTRY.md`. | All groups accepting input |
| `RATE_LIMITED` | Too many requests in a window. | All groups |
| `CONFLICT` | Action would violate a domain rule (e.g. duplicate signup email). | Auth, Creator |

## Dependencies

- `API_REGISTRY.md`

## Relationships

- `VALIDATION_REGISTRY.md` — the rules that produce `VALIDATION_FAILED`.
- `PERMISSION_MATRIX.md` — the rules that produce `PERMISSION_DENIED`.

## Constraints

- No feature's `EDGE_CASES.md` may introduce a new top-level code; it may only reference one of the codes above with feature-specific detail.

## Acceptance

Once `04_BACKEND` exists, every error response it defines maps to exactly one code in this table.

## Future Scope

This document's `status` moves from `draft` to `active` alongside `API_REGISTRY.md`, once `04_BACKEND` architecture exists.
