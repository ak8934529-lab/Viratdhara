---
document_id: CONTENTDISCOVERY_DATABASE
title: Content Discovery — Database
version: 1.0.0
status: active
priority: medium
depends_on:
  - CONTENTDISCOVERY_SPEC
  - ENTITY_REGISTRY
related_documents:
  - DOMAIN_MODEL.md
related_entities:
  - Playlist
  - Content
related_components: []
related_events: []
owner: Product Architecture
---

# Content Discovery — Database

## Why

This feature owns `Playlist` (`DOMAIN_MODEL.md`) and reads `Content`/`Recommendation` without owning their fields.

## What

Fields on `Playlist` this feature owns.

## Rules

- `Playlist` fields: owning Account reference, name, ordered list of Content references, created/updated timestamps (`DOMAIN_MODEL.md` relationship: Account owns many Playlists; Playlist contains many Content).
- This feature reads, but owns no fields on, `Content` or `Recommendation`.

## Dependencies

- `DOMAIN_MODEL.md`, `ENTITY_REGISTRY.md`

## Relationships

- `Content`, `Recommendation` (`DOMAIN_MODEL.md`).

## Constraints

- No new entity beyond `Playlist` (already registered) is introduced.

## Acceptance

`Playlist` CRUD is fully attributable to this feature; `Content`/`Recommendation` schema changes are not.

## Future Scope

None.
