---
document_id: USERSETTINGS_PROMPTS
title: User Settings — Prompts
version: 1.0.0
status: active
priority: low
depends_on:
  - USERSETTINGS_README
related_documents:
  - PROMPT_LIBRARY.md
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# User Settings — Prompts

## Why

The recurring risk here is scope bleed into Authentication (credential editing) — worth a standing prompt against that.

## What

Feature-specific prompts.

## Prompts

### Implement a Settings sub-screen

> Build against `MobileListItem`/`Switch` per `COMPONENTS.md`. Do not add email/password editing here — that belongs to Authentication. For Notifications/Downloads/Subscriptions, do not hardcode an assumed category list, storage limit, or tier structure — build against placeholder/mock data and flag the gap per `EDGE_CASES.md`.

## Dependencies

- `USERSETTINGS_README.md`, `PROMPT_LIBRARY.md`

## Relationships

- `PROMPT_LIBRARY.md`

## Constraints

None beyond the above.

## Acceptance

An agent given this document does not add credential-editing UI here or invent unconfirmed data shapes as final.

## Future Scope

None.
