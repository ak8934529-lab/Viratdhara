---
document_id: CONTENTCATEGORIZATION_PROMPTS
title: Content Categorization — Prompts
version: 1.1.0
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

> Build against the 5-item placeholder Category list in `CONTENT_ARCHITECTURE.md`. It is a real, usable list for structural/testing purposes — but it is explicitly not final; do not present it in product copy or documentation as a confirmed taxonomy.

## Dependencies

- `CONTENTCATEGORIZATION_README.md`, `PROMPT_LIBRARY.md`

## Relationships

- `PROMPT_LIBRARY.md`

## Constraints

- No prompt here treats the placeholder list as permanent.

## Acceptance

An agent given this document builds the correct UI/data shape without shipping an invented Category taxonomy as if it were final.

## Future Scope

None.
