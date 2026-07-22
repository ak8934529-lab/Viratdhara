---
document_id: VIDEOPLAYER_DATABASE
title: Video Player — Database
version: 1.0.0
status: active
priority: medium
depends_on:
  - VIDEOPLAYER_SPEC
  - ENTITY_REGISTRY
related_documents:
  - DOMAIN_MODEL.md
related_entities:
  - Content
related_components: []
related_events: []
owner: Product Architecture
---

# Video Player — Database

## Why

Whether playback position needs to persist across sessions ("resume where you left off") is not confirmed anywhere — worth stating as open rather than silently building persistence that may not be wanted, or silently omitting it if it is.

## What

This feature reads `Content` (`DOMAIN_MODEL.md`) for playback. Whether it also writes a per-Account "last position" is unresolved.

## Rules

- No new entity is introduced for playback progress without registering it in `ENTITY_REGISTRY.md`/`DOMAIN_MODEL.md` first — a "resume playback" feature, if confirmed, would need a new Account-Content position mapping.

## Dependencies

- `DOMAIN_MODEL.md`, `ENTITY_REGISTRY.md`

## Relationships

None beyond `Content`.

## Constraints

- This feature does not assume resume-across-sessions is in scope. If it is, that requires a product confirmation and a `DOMAIN_MODEL.md` update, not an implementation-level addition.

## Acceptance

No schema exists for playback-position persistence unless and until confirmed and registered.

## Future Scope

Resume-across-sessions is the open item here — flag for product confirmation before assuming either way.
