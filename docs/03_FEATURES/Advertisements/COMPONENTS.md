---
document_id: ADVERTISEMENTS_COMPONENTS
title: Advertisements — Components
version: 1.0.0
status: active
priority: low
depends_on:
  - ADVERTISEMENTS_UI
  - COMPONENT_REGISTRY
related_documents:
  - COMPONENT_REGISTRY.md
related_entities: []
related_components:
  - Badge
  - Button
related_events: []
owner: Product Architecture
---

# Advertisements — Components

## Why

No existing component covers a full-screen ad interstitial with a skip control — this is new, but composed from existing primitives, not a new package.

## What

Components used by this feature.

## Rules

| Component | Used On | Scope |
| --- | --- | --- |
| `Badge` (labeled "Ad") | Ad label | V1 |
| `Button` | Skip control | V1 |
| A new ad-interstitial container (not yet built/registered) | Full ad presentation | To be built as part of this feature's implementation, registered in `COMPONENT_REGISTRY.md` once built |

## Dependencies

- `ADVERTISEMENTS_UI.md`, `COMPONENT_REGISTRY.md`

## Relationships

- `COMPONENT_REGISTRY.md`

## Constraints

- The new ad-interstitial component must be registered in `COMPONENT_REGISTRY.md` in the same change it's built, per `AI_DOCUMENTATION_AGENT.md`.

## Acceptance

The `Badge`/`Button` primitives are reused; only the interstitial container itself is new.

## Future Scope

Component to be built and registered during this feature's implementation.
