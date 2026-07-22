---
document_id: CONTENTDISCOVERY_STATES
title: Content Discovery — States
version: 1.0.0
status: active
priority: low
depends_on:
  - CONTENTDISCOVERY_SPEC
related_documents:
  - STATE_REGISTRY.md
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Content Discovery — States

## Why

Stated explicitly rather than left as an unexplained empty document.

## What

This feature introduces no cross-feature state machine. A feed's loading/loaded/empty/error condition is transient UI state, not a domain state machine.

## Rules

- No entry is added to `STATE_REGISTRY.md` for this feature.
- Feed loading states (loading/loaded/empty/error) follow the same shape as `Search`'s feature-local states (`SEARCH_STATES.md`) for consistency, without being formally shared.

## Dependencies

- `CONTENTDISCOVERY_SPEC.md`

## Relationships

- `SEARCH_STATES.md` — pattern reference, not a shared machine.

## Constraints

None.

## Acceptance

No implementation introduces a cross-feature state machine for this feature.

## Future Scope

None.
