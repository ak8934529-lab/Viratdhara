---
document_id: RECOMMENDATIONENGINE_EVENTS
title: Recommendation Engine — Events
version: 1.0.0
status: active
priority: medium
depends_on:
  - RECOMMENDATIONENGINE_SPEC
  - EVENT_REGISTRY
related_documents:
  - EVENT_REGISTRY.md
related_entities: []
related_components: []
related_events:
  - recommendation_served
  - recommendation_clicked
owner: Product Architecture
---

# Recommendation Engine — Events

## Why

This feature is the sole emitter of the two recommendation lifecycle events.

## What

Events this feature emits, both already defined in `EVENT_REGISTRY.md`.

## Rules

| Event | Emitted When |
| --- | --- |
| `recommendation_served` | A `Recommendation` becomes visible to an Account (rendered within Content Discovery's feed). |
| `recommendation_clicked` | The Account acts on (opens) a served Recommendation. |

## Dependencies

- `RECOMMENDATIONENGINE_SPEC.md`, `EVENT_REGISTRY.md`

## Relationships

- `Content Discovery` — the actual render trigger for `recommendation_served`.

## Constraints

- `recommendation_served` fires once per Recommendation actually rendered, not once per Recommendation generated (a generated-but-unrendered Recommendation does not fire it).

## Acceptance

Every rendered Recommendation fires exactly one `recommendation_served`; every clicked one fires exactly one `recommendation_clicked`.

## Future Scope

None.
