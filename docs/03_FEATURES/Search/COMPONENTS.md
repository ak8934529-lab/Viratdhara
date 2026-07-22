---
document_id: SEARCH_COMPONENTS
title: Search — Components
version: 1.0.0
status: active
priority: medium
depends_on:
  - SEARCH_UI
  - COMPONENT_REGISTRY
related_documents:
  - COMPONENT_REGISTRY.md
related_entities: []
related_components:
  - MobileSearchBar
  - MobileEmptyState
related_events: []
owner: Product Architecture
---

# Search — Components

## Why

The search input pattern (icon + text field) is already a registered component (`MobileSearchBar`) — this feature reuses it rather than building a new input.

## What

Components used by this feature.

## Rules

| Component | Used On | Scope |
| --- | --- | --- |
| `MobileSearchBar` (mobile) / web search input equivalent | `/search` entry field | V1 (web equivalent: to be built) |
| `MobileEmptyState` | No-results state | V1 |
| `Card` / `apps/web` glass card (`SURFACE_SYSTEM.md`) | Result grid items | V1 |

## Dependencies

- `SEARCH_UI.md`, `COMPONENT_REGISTRY.md`

## Relationships

- `COMPONENT_REGISTRY.md`

## Constraints

- No new search-input component is built for mobile — `MobileSearchBar` already covers it.

## Acceptance

The `/search` screen is built from only the components listed here.

## Future Scope

Web search input component does not exist yet — needed before `apps/web` can implement this feature.
