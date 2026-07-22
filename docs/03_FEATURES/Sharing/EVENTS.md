---
document_id: SHARING_EVENTS
title: Sharing — Events
version: 1.0.0
status: active
priority: low
depends_on:
  - SHARING_SPEC
  - EVENT_REGISTRY
related_documents:
  - EVENT_REGISTRY.md
related_entities: []
related_components: []
related_events:
  - content_shared
owner: Product Architecture
---

# Sharing — Events

## Why

This feature is the sole emitter of `content_shared`.

## What

Events this feature emits.

## Rules

| Event | Emitted When |
| --- | --- |
| `content_shared` | A share action is initiated (native share sheet invoked), per `SPEC.md` — not gated on confirmed completion. |

## Dependencies

- `SHARING_SPEC.md`, `EVENT_REGISTRY.md`

## Relationships

None beyond the shared event.

## Constraints

- No completion-confirmation event is added unless the platform reliably supports detecting share completion (currently assumed not to, per `SPEC.md`).

## Acceptance

`content_shared` fires exactly once per share action initiated.

## Future Scope

A distinct "share completed" event if platform support allows it later.
