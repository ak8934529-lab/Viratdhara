---
document_id: RECOMMENDATIONENGINE_PROMPTS
title: Recommendation Engine — Prompts
version: 1.1.0
status: active
priority: low
depends_on:
  - RECOMMENDATIONENGINE_README
related_documents:
  - PROMPT_LIBRARY.md
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Recommendation Engine — Prompts

## Why

The biggest risk with this feature is an agent inventing a plausible-sounding ranking algorithm and treating it as final — worth a standing prompt against exactly that.

## What

Feature-specific prompts.

## Prompts

### Implement the Recommendation contract

> Build the entity, API contract, and events per `SPEC.md`/`DATABASE.md`/`EVENTS.md`. Implement the V1 placeholder heuristic exactly as specified in `EDGE_CASES.md` (Category-recency, falling back to global recency) — label it clearly as a placeholder in code comments. Do not implement a real ML/collaborative-filtering algorithm as part of this task; that is a separate, larger effort.

## Dependencies

- `RECOMMENDATIONENGINE_README.md`, `PROMPT_LIBRARY.md`

## Relationships

- `PROMPT_LIBRARY.md`

## Constraints

None beyond the above.

## Acceptance

An agent given this document builds the contract without presenting a guessed algorithm as final.

## Future Scope

None.
