---
document_id: USERSETTINGS_DATABASE
title: User Settings — Database
version: 1.0.0
status: active
priority: medium
depends_on:
  - USERSETTINGS_SPEC
  - ENTITY_REGISTRY
related_documents:
  - DOMAIN_MODEL.md
related_entities:
  - Account
related_components: []
related_events: []
owner: Product Architecture
---

# User Settings — Database

## Why

This feature owns non-credential Account fields — distinct from Authentication's credential fields (`AUTHENTICATION_DATABASE.md`).

## What

Fields on `Account` this feature owns.

## Rules

- This feature owns: notification preference flags (per category — list unconfirmed, see `EDGE_CASES.md`), subscription tier/status, downloaded-Content references (which Content items, not the media itself).
- This feature does not own: email, password hash, social-provider linkage (`Authentication`'s `DATABASE.md`).

## Dependencies

- `DOMAIN_MODEL.md`, `ENTITY_REGISTRY.md`, `AUTHENTICATION_DATABASE.md` (the sibling document defining the boundary)

## Relationships

- `Content` (`DOMAIN_MODEL.md`) — downloaded-item references point at `Content`, don't duplicate it.

## Constraints

- No credential field is added to this feature's owned set — that boundary stays with Authentication.

## Acceptance

The Account schema's notification/subscription/downloads fields are attributable to this feature; credential fields are not.

## Future Scope

Whether "downloaded Content" implies actual offline media storage or just a favorites-like reference list is unconfirmed — see `SPEC.md` Future Scope.
