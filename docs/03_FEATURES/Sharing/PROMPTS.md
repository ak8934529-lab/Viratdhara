---
document_id: SHARING_PROMPTS
title: Sharing — Prompts
version: 1.0.0
status: active
priority: low
depends_on:
  - SHARING_README
related_documents:
  - PROMPT_LIBRARY.md
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Sharing — Prompts

## Why

The recurring risk here is over-building — inventing a custom share sheet or short-link service beyond what's specified.

## What

Feature-specific prompts.

## Prompts

### Implement the share action

> Use the platform native share API (`navigator.share`, with a copy-link fallback) per `SPEC.md`. Do not build a custom share sheet UI or a short-link service — neither is specified as needed.

## Dependencies

- `SHARING_README.md`, `PROMPT_LIBRARY.md`

## Relationships

- `PROMPT_LIBRARY.md`

## Constraints

None beyond the above.

## Acceptance

An agent given this document does not over-scope the implementation beyond native share + link resolution.

## Future Scope

None.
