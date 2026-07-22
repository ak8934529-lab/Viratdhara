---
document_id: SEARCH_PROMPTS
title: Search — Prompts
version: 1.0.0
status: active
priority: low
depends_on:
  - SEARCH_README
related_documents:
  - PROMPT_LIBRARY.md
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Search — Prompts

## Why

The risk with Search is scope creep into Recommendation Engine's territory (personalized ranking) — worth a standing prompt against that.

## What

Feature-specific prompts.

## Prompts

### Implement the search results screen

> Implement plain relevance match (title/tag/category substring) per `SPEC.md`. Do not add per-Account ranking or personalization — that belongs to Recommendation Engine. Implement all 5 states from `STATES.md` distinctly, especially `no_results` vs. `error`.

## Dependencies

- `SEARCH_README.md`, `PROMPT_LIBRARY.md`

## Relationships

- `PROMPT_LIBRARY.md`

## Constraints

None beyond the above.

## Acceptance

An agent given this document does not conflate Search with Recommendation Engine's responsibility.

## Future Scope

None.
