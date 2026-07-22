---
document_id: VIDEOPLAYER_API
title: Video Player — API
version: 1.0.0
status: draft
priority: medium
depends_on:
  - VIDEOPLAYER_SPEC
  - API_REGISTRY
related_documents:
  - API_REGISTRY.md
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Video Player — API

## Why

Playback needs the actual media stream plus a way to persist progress (`DATABASE.md`) — both belong to the `Content` API group.

## What

Operations this feature needs, within the `Content` group.

## Rules

- This document inherits `API_REGISTRY.md`'s `draft` status.

## Operations (planned)

| Operation | Purpose |
| --- | --- |
| Get Content stream/media source | Resolve a playable media URL for a Content id |
| Report playback progress | Persist elapsed position (for resume — see `DATABASE.md`) |

## Dependencies

- `VIDEOPLAYER_SPEC.md`, `API_REGISTRY.md`

## Relationships

- `ERROR_REGISTRY.md` — `NOT_FOUND` for an invalid/removed Content id.

## Constraints

- No operation here duplicates the `Content` group's general read operation already used by Content Discovery/Search/Categorization — this feature adds only stream-resolution and progress-reporting.

## Acceptance

Once finalized, both operations are part of the `Content` group, not a separate one.

## Future Scope

Adaptive bitrate / streaming protocol choice is a `04_BACKEND`/infrastructure decision, not specified here.
