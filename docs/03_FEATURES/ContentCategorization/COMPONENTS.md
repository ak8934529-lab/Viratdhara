---
document_id: CONTENTCATEGORIZATION_COMPONENTS
title: Content Categorization — Components
version: 1.0.0
status: active
priority: medium
depends_on:
  - CONTENTCATEGORIZATION_UI
  - COMPONENT_REGISTRY
related_documents:
  - COMPONENT_REGISTRY.md
related_entities: []
related_components:
  - MobileChipRow
  - MobileFilterChip
related_events: []
owner: Product Architecture
---

# Content Categorization — Components

## Why

Filter chips are used identically across Home, Suno, Dekho, and the Category browse screen — one component, not four inline reimplementations.

## What

Components used by this feature.

## Rules

| Component | Used On | Scope |
| --- | --- | --- |
| `MobileChipRow` / `MobileFilterChip` | Inline filter rows (mobile/`packages/mobile`) | V1 |
| Web chip row equivalent (built for `apps/web`, per `MASTER_PRD.md` — `packages/mobile` not reused) | Inline filter rows and browse screen (web) | to be built, Milestone 8+ |
| `Card` / `MobileTonalCard` (mobile) or `apps/web`'s glass card (`SURFACE_SYSTEM.md`) | Content grid items | V1 |

## Dependencies

- `CONTENTCATEGORIZATION_UI.md`, `COMPONENT_REGISTRY.md`

## Relationships

- `COMPONENT_REGISTRY.md` — existence/scope confirmation.

## Constraints

- The web chip row equivalent, once built, must be added to `COMPONENT_REGISTRY.md` in the same change, per `AI_DOCUMENTATION_AGENT.md`.

## Acceptance

Both UI surfaces in `UI.md` are built from only the components listed here.

## Future Scope

The `apps/web` chip row component does not exist yet — this feature cannot be fully implemented on web until it's built.
