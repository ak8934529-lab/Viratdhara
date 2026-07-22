---
document_id: CONTENTDISCOVERY_COMPONENTS
title: Content Discovery — Components
version: 1.0.0
status: active
priority: medium
depends_on:
  - CONTENTDISCOVERY_UI
  - COMPONENT_REGISTRY
related_documents:
  - COMPONENT_REGISTRY.md
related_entities: []
related_components:
  - MobileSectionHeading
  - MobileListCard
  - MobileStatCard
related_events: []
owner: Product Architecture
---

# Content Discovery — Components

## Why

Feed sections are a repeating pattern (heading + row of cards) already covered by existing registered components.

## What

Components used by this feature.

## Rules

| Component | Used On | Scope |
| --- | --- | --- |
| `MobileSectionHeading` | Every feed section header | V1 |
| `MobileListCard` / `Card` (`apps/web` glass card) | Content items within a section | V1 |
| `MobileStatCard` (via `QuickActionTile`, `packages/blocks`) | Any quick-action tiles retained on Home (subject content must be V1-appropriate, not the future-scope examples currently in `apps/showcase` — see `COMPONENT_REGISTRY.md`) | V1 (component); demo content needs updating |
| Shorts full-screen item renderer | Shorts feed | Not yet a named registered component — to be built and registered |

## Dependencies

- `CONTENTDISCOVERY_UI.md`, `COMPONENT_REGISTRY.md`

## Relationships

- `COMPONENT_REGISTRY.md` — flags `QuickActionTile`'s current demo content mismatch (Milestone 3 note), directly relevant here since this feature is where it'd actually be used.

## Constraints

- The Shorts renderer, once built, is registered in `COMPONENT_REGISTRY.md` in the same change.

## Acceptance

Home/Suno/Dekho are built from only registered components; Shorts' renderer is built and registered as part of this feature's implementation.

## Future Scope

Shorts renderer does not exist yet.
