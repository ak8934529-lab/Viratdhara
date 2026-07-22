---
document_id: CREATORSTUDIO_STATES
title: Creator Studio — States
version: 1.0.0
status: active
priority: medium
depends_on:
  - CREATORSTUDIO_SPEC
  - STATE_REGISTRY
related_documents:
  - STATE_REGISTRY.md
related_entities: []
related_components: []
related_events:
  - creator_content_published
owner: Product Architecture
---

# Creator Studio — States

## Why

This feature is the sole trigger of the Content Lifecycle's `draft → published` and `published → removed_by_creator` transitions.

## What

Implements the relevant portion of the shared Content Lifecycle machine (`STATE_REGISTRY.md`) — reproduced for this feature's context, not redefined.

## Rules

```
draft ──(Creator publishes, fires creator_content_published)──> published
published ──(Creator removes)──> removed_by_creator
```

- This feature never triggers `published → removed_by_moderation` — that transition belongs exclusively to an Administrator, per `STATE_REGISTRY.md`.
- A Creator can view (read-only) a `removed_by_moderation` item but has no action available to reverse it.

## Dependencies

- `CREATORSTUDIO_SPEC.md`, `STATE_REGISTRY.md`

## Relationships

- `EVENT_REGISTRY.md` — `creator_content_published` drives the publish transition.

## Constraints

- No Creator-facing action ever moves Content out of `removed_by_moderation`.

## Acceptance

Publish/remove actions transition state exactly as shown; moderation-removed Content is read-only to the Creator.

## Future Scope

None.
