---
document_id: CREATORSTUDIO_PROMPTS
title: Creator Studio — Prompts
version: 1.0.0
status: active
priority: low
depends_on:
  - CREATORSTUDIO_README
related_documents:
  - PROMPT_LIBRARY.md
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Creator Studio — Prompts

## Why

The one hard rule this feature must never violate is cross-Creator data leakage — worth a standing prompt.

## What

Feature-specific prompts.

## Prompts

### Implement Content management

> Enforce "own Content only" at the data layer (`AI_BACKEND_AGENT.md`), not only by hiding UI for other Creators' Content. Block publish on missing title/Category per `VALIDATIONS.md`.

### Implement analytics

> Aggregate existing events (`content_viewed`, `content_played`, `content_completed`, `content_shared`) scoped to the Creator's own Content — do not invent a new analytics-specific event. Zero-activity Content shows explicit zero counts, not an empty state.

## Dependencies

- `CREATORSTUDIO_README.md`, `PROMPT_LIBRARY.md`

## Relationships

- `PROMPT_LIBRARY.md`

## Constraints

None beyond the above.

## Acceptance

An agent given this document never allows cross-Creator data access and never invents a new analytics event.

## Future Scope

None.
