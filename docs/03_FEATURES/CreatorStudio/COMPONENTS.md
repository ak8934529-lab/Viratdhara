---
document_id: CREATORSTUDIO_COMPONENTS
title: Creator Studio — Components
version: 1.0.0
status: active
priority: low
depends_on:
  - CREATORSTUDIO_UI
  - COMPONENT_REGISTRY
related_documents:
  - COMPONENT_REGISTRY.md
related_entities: []
related_components:
  - Input
  - Button
  - MobileListItem
related_events: []
owner: Product Architecture
---

# Creator Studio — Components

## Why

Content creation is a form; management is a list; analytics is a set of stat displays — all covered by existing primitives plus one new stat-display component.

## What

Components used by this feature.

## Rules

| Component | Used On | Scope |
| --- | --- | --- |
| `Input` | Content title/metadata form fields | V1 |
| `Button` | Publish/save/remove actions | V1 |
| `MobileListItem` | Content management list rows | V1 |
| `MobileStatCard` (or a new analytics-specific stat display) | Analytics screen | V1 (`MobileStatCard`) — a dedicated analytics component may be built if `MobileStatCard`'s shape doesn't fit (e.g. needs a trend indicator); register any new one in `COMPONENT_REGISTRY.md` |

## Dependencies

- `CREATORSTUDIO_UI.md`, `COMPONENT_REGISTRY.md`

## Relationships

- `COMPONENT_REGISTRY.md`

## Constraints

- Any new analytics-display component is registered before use.

## Acceptance

Content creation/management screens use only registered components; analytics uses `MobileStatCard` or a newly registered equivalent.

## Future Scope

A dedicated analytics-trend component is not yet confirmed as needed.
