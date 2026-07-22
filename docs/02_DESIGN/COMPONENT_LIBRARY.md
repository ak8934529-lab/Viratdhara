---
document_id: COMPONENT_LIBRARY
title: Component Library
version: 1.0.0
status: active
priority: high
depends_on:
  - DESIGN_SYSTEM_RULES
related_documents:
  - COMPONENT_REGISTRY.md
related_entities: []
related_components:
  - Button
  - Badge
  - Card
  - Input
  - Avatar
  - Switch
related_events: []
owner: Product Architecture
---

# Component Library

## Why

`COMPONENT_REGISTRY.md` (`01_ARCHITECTURE`) answers "does this component exist and is it V1 scope." This document answers the design question instead: what variants and states does each component actually offer, so a screen is built with the right variant rather than a one-off override.

## What

Variant and state catalog for the `packages/ui` primitives — the components every screen composes from.

## Rules

- A screen uses an existing variant. A one-off className override to fake a variant that doesn't exist yet means the variant is missing from the component — add it to the component (and this catalog), don't override around it.

## Catalog

### Button

Variants: `default` (primary terracotta), `gold` (accent CTA, e.g. "Buy Now"), `outline`, `secondary`, `ghost`, `destructive`, `link`.
Sizes: `default`, `sm`, `lg`, `icon`, `icon-sm`.
All filled variants render as full pills (`rounded-full`) per `DESIGN_SYSTEM_RULES.md`.

### Badge

Variants: `default`, `gold`, `live` (destructive-colored, uppercase, for live/urgent labeling), `secondary`, `outline`, `ghost`.

### Card

Slots: `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`. Base surface uses `ring-1 ring-foreground/10`, not a hard border.

### Input

Single style, no variants yet — rounded-xl, `bg-input/40`, focus ring uses `--ring` (gold).

### Avatar

Sizes: `sm`, `default`, `lg`. Composes `AvatarImage` + `AvatarFallback`.

### Switch

Single style, no variants — checked state uses `--primary`.

## Dependencies

- `DESIGN_SYSTEM_RULES.md`

## Relationships

- `COMPONENT_REGISTRY.md` — existence and V1/future scope for these and every other component (`packages/mobile`, `packages/blocks`).

## Constraints

- A new variant added to a component must be added here in the same change, not left for someone to discover by reading source.

## Acceptance

Any screen's use of `Button`/`Badge`/`Card`/`Input`/`Avatar`/`Switch` can be checked against a listed variant/size here.

## Future Scope

`packages/mobile` and `packages/blocks` components will get their own variant catalogs here once they grow beyond single-style, mirroring this document's structure for `packages/ui`.
