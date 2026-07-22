---
document_id: AUTHENTICATION_DATABASE
title: Authentication — Database
version: 1.0.0
status: active
priority: high
depends_on:
  - AUTHENTICATION_SPEC
  - ENTITY_REGISTRY
related_documents:
  - DOMAIN_MODEL.md
  - ENTITY_REGISTRY.md
related_entities:
  - Account
related_components: []
related_events: []
owner: Product Architecture
---

# Authentication — Database

## Why

`Account` is defined at the relationship level in `DOMAIN_MODEL.md`. This document adds the field-level detail Authentication specifically owns — credentials and provider linkage — without redefining the entity itself.

## What

Fields on `Account` that this feature creates and manages.

## Rules

- This feature owns: email, password hash (if email/password auth used), linked social provider identity (if social auth used), role flags (`User` implicit, `Creator`/`Administrator` additive — set elsewhere, read here), session/auth timestamps.
- This feature does not own: Account settings beyond credentials (display name, preferences — see User Settings feature, not yet started), Playlist/Content ownership (see `DOMAIN_MODEL.md`).

## Dependencies

- `AUTHENTICATION_SPEC.md`, `ENTITY_REGISTRY.md`

## Relationships

- `DOMAIN_MODEL.md` — `Account` entity and its Role relationship.
- `VALIDATION_REGISTRY.md` — `email_format`, `password_minimum` rules governing these fields.

## Constraints

- Password is never stored in plaintext — hashed only. This is a hard constraint on any implementation regardless of `04_BACKEND` architecture choice.
- A social-provider-only Account (no password set) must be representable — see `EDGE_CASES.md` for the collision case this creates.

## Acceptance

The `Account` entity, as implemented, supports both email/password and social-provider-only signup without one auth method requiring fields the other doesn't need.

## Future Scope

Exact schema (column types, indexing) is a `04_BACKEND` decision, not specified here.
