---
document_id: CREATORSTUDIO_EVENTS
title: Creator Studio — Events
version: 1.0.0
status: active
priority: medium
depends_on:
  - CREATORSTUDIO_SPEC
  - EVENT_REGISTRY
related_documents:
  - EVENT_REGISTRY.md
related_entities: []
related_components: []
related_events:
  - creator_content_published
owner: Product Architecture
---

# Creator Studio — Events

## Why

This feature is the sole emitter of `creator_content_published`, and a consumer (not emitter) of the Content-engagement events its analytics screen aggregates.

## What

Events this feature emits and reads.

## Rules

| Event | Role |
| --- | --- |
| `creator_content_published` | Emitted by this feature when a Creator publishes. |
| `content_viewed`, `content_played`, `content_completed`, `content_shared` | Read/aggregated by this feature's analytics screen; emitted by other features (`Content Discovery`, `Search`, `Video Player`, `Sharing`). |

## Dependencies

- `CREATORSTUDIO_SPEC.md`, `EVENT_REGISTRY.md`

## Relationships

- `STATES.md` — `creator_content_published` drives the publish transition.

## Constraints

- This feature does not re-emit or duplicate the consumed events under a new name — analytics reads the existing events as-is.

## Acceptance

`creator_content_published` fires exactly once per publish action; analytics reflects real aggregated event counts.

## Future Scope

None.
