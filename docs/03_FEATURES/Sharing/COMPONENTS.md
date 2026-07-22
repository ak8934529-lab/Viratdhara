---
document_id: SHARING_COMPONENTS
title: Sharing — Components
version: 1.0.0
status: active
priority: low
depends_on:
  - SHARING_UI
  - COMPONENT_REGISTRY
related_documents:
  - COMPONENT_REGISTRY.md
related_entities: []
related_components:
  - Button
related_events: []
owner: Product Architecture
---

# Sharing — Components

## Why

The share affordance is a single icon button — it doesn't warrant a bespoke component beyond the existing `Button` primitive.

## What

Components used by this feature.

## Rules

| Component | Used On | Scope |
| --- | --- | --- |
| `Button` (`variant="ghost"`, `size="icon"`) | Share icon, everywhere it appears | V1 |
| Native browser/OS share sheet | Invoked, not rendered by this codebase | N/A — platform-provided |

## Dependencies

- `SHARING_UI.md`, `COMPONENT_REGISTRY.md`

## Relationships

- `COMPONENT_REGISTRY.md`

## Constraints

- No new component is built for the share icon itself.

## Acceptance

The share affordance is a `Button` instance, not a bespoke component.

## Future Scope

If a custom in-app share sheet is ever designed (`UI.md` Future Scope), it would be registered here.
