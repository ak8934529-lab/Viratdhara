---
document_id: USERSETTINGS_COMPONENTS
title: User Settings — Components
version: 1.0.0
status: active
priority: low
depends_on:
  - USERSETTINGS_UI
  - COMPONENT_REGISTRY
related_documents:
  - COMPONENT_REGISTRY.md
related_entities: []
related_components:
  - MobileListItem
  - Switch
related_events: []
owner: Product Architecture
---

# User Settings — Components

## Why

Every sub-screen is a list of rows — `MobileListItem` already covers this pattern (`UX_PATTERNS.md`).

## What

Components used by this feature.

## Rules

| Component | Used On | Scope |
| --- | --- | --- |
| `MobileListItem` | Settings hub rows, Downloads list rows | V1 |
| `Switch` | Notification toggles | V1 |
| `Button` | Subscription upgrade CTA | V1 |

## Dependencies

- `USERSETTINGS_UI.md`, `COMPONENT_REGISTRY.md`

## Relationships

- `COMPONENT_REGISTRY.md`

## Constraints

- No new component is built for any of these sub-screens — all covered by existing registered components.

## Acceptance

Every sub-screen is built from only the components listed here.

## Future Scope

None.
