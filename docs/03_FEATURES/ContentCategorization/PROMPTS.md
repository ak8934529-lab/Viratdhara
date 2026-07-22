---
document_id: CONTENTCATEGORIZATION_PROMPTS
title: Content Categorization — Prompts
version: 1.0.0
status: active
priority: low
depends_on:
  - CONTENTCATEGORIZATION_README
related_documents:
  - PROMPT_LIBRARY.md
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Content Categorization — Prompts

## Why

The one recurring risk with this feature is quietly inventing a Category list to "just get something working" — worth a standing prompt against that.

## What

Feature-specific prompts.

## Prompts

### Implement the Category browse screen

> Build against mock Category/Tag data structurally identical to `DOMAIN_MODEL.md`'s entities. Do not invent or hardcode a "final" Category list — use clearly-marked placeholder names and flag in the PR/commit that real Category data is pending a product decision (`EDGE_CASES.md`).

## Dependencies

- `CONTENTCATEGORIZATION_README.md`, `PROMPT_LIBRARY.md`

## Relationships

- `PROMPT_LIBRARY.md`

## Constraints

- No prompt here resolves the undefined-Category-list gap — it stays open.

## Acceptance

An agent given this document builds the correct UI/data shape without shipping an invented Category taxonomy as if it were final.

## Future Scope

None.
