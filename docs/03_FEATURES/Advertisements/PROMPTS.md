---
document_id: ADVERTISEMENTS_PROMPTS
title: Advertisements — Prompts
version: 1.0.0
status: active
priority: low
depends_on:
  - ADVERTISEMENTS_README
related_documents:
  - PROMPT_LIBRARY.md
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Advertisements — Prompts

## Why

The one hard rule this feature must never violate is blocking Content access on ad failure — worth a standing prompt.

## What

Feature-specific prompts.

## Prompts

### Implement the ad interstitial

> Implement pre-roll-only placement before Video Player sessions. No-ad and load-failure cases must never block Content playback — fall through immediately per `EDGE_CASES.md`. Do not hardcode placement frequency or skip timing as final — both are open product decisions; implement them as configurable rather than baked-in assumptions.

## Dependencies

- `ADVERTISEMENTS_README.md`, `PROMPT_LIBRARY.md`

## Relationships

- `PROMPT_LIBRARY.md`

## Constraints

None beyond the above.

## Acceptance

An agent given this document never implements a blocking ad failure path.

## Future Scope

None.
