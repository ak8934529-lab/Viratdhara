---
document_id: CREATORPROFILE_COMPONENTS
title: Creator Profile — Components
version: 1.0.0
status: active
priority: low
depends_on:
  - CREATORPROFILE_UI
  - COMPONENT_REGISTRY
related_documents:
  - COMPONENT_REGISTRY.md
related_entities: []
related_components:
  - Avatar
  - Button
related_events: []
owner: Product Architecture
---

# Creator Profile — Components

## Why

The Follow button is a state-driven `Button` variant toggle, not a new component.

## What

Components used by this feature.

## Rules

| Component | Used On | Scope |
| --- | --- | --- |
| `Avatar` (`size="lg"`) | Profile header | V1 |
| `Button` (`variant="default"` when "Follow", `variant="outline"` when "Following") | Follow/unfollow action | V1 |
| `Card` / `apps/web` glass card | Content grid items | V1 |

## Dependencies

- `CREATORPROFILE_UI.md`, `COMPONENT_REGISTRY.md`

## Relationships

- `COMPONENT_REGISTRY.md`

## Constraints

- No new component is built for the Follow button — it's an existing `Button` with state-driven variant/label.

## Acceptance

The profile screen is built from only the components listed here.

## Future Scope

None.
