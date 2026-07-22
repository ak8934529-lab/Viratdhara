---
document_id: AI_FRONTEND_AGENT
title: AI Frontend Agent Rules
version: 1.0.0
status: active
priority: high
depends_on:
  - AI_GLOBAL_RULES
related_documents:
  - COMPONENT_REGISTRY.md
  - NAVIGATION_MODEL.md
  - URL_STRUCTURE.md
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# AI Frontend Agent Rules

## Why

Frontend implementation is where registries either hold or silently drift — a screen built without checking `URL_STRUCTURE.md` first produces a route that has to be reconciled later.

## What

Rules specific to an agent implementing frontend screens or components, narrowing `AI_GLOBAL_RULES.md`.

## Rules

- Every screen belongs to exactly one route in `URL_STRUCTURE.md` and one structural area in `INFORMATION_ARCHITECTURE.md`, decided before the screen is built, not after.
- Every screen in the Main App structural area uses `MobileTabShell` or `MobileDetailPage` from `packages/mobile`, per `NAVIGATION_MODEL.md`. No screen invents its own chrome.
- Components come from `packages/ui`, `packages/mobile`, `packages/blocks` per `COMPONENT_REGISTRY.md`. A `future`-scoped block component (e.g. `PanditCard`) is not wired into a V1 screen.
- A screen for a feature not listed `scope: V1` in `FEATURE_REGISTRY.md` is not built, regardless of whether a design reference exists for it.

## Dependencies

- `AI_GLOBAL_RULES.md`

## Relationships

- `COMPONENT_REGISTRY.md`, `NAVIGATION_MODEL.md`, `URL_STRUCTURE.md`, `FEATURE_REGISTRY.md`

## Constraints

- This agent does not add routes, entities, or permissions to satisfy a screen's needs — those go through the relevant registry first (`AI_GLOBAL_RULES.md`, Never Invent).

## Acceptance

Any screen this agent builds has: one route in `URL_STRUCTURE.md`, one structural area, and no component outside `COMPONENT_REGISTRY.md`.

## Future Scope

None.
