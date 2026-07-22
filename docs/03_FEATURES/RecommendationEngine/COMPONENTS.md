---
document_id: RECOMMENDATIONENGINE_COMPONENTS
title: Recommendation Engine — Components
version: 1.0.0
status: active
priority: low
depends_on:
  - RECOMMENDATIONENGINE_UI
  - COMPONENT_REGISTRY
related_documents:
  - COMPONENT_REGISTRY.md
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Recommendation Engine — Components

## Why

This feature renders nothing itself — it reuses whatever Content-card component `Content Discovery` uses.

## What

No components are owned by this feature.

## Rules

- Any Content card rendering a Recommendation uses the same component `Content Discovery` uses for any other Content item — no visually distinct "Recommendation card" component exists or is planned.

## Dependencies

- `RECOMMENDATIONENGINE_UI.md`, `COMPONENT_REGISTRY.md`

## Relationships

- `ContentDiscovery`'s `COMPONENTS.md` — the actual component ownership.

## Constraints

None.

## Acceptance

No component is registered as owned by this feature.

## Future Scope

None.
