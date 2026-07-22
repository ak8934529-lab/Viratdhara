---
document_id: COMPONENT_REGISTRY
title: Component Registry
version: 1.0.0
status: active
priority: high
depends_on: []
related_documents:
  - COMPONENT_LIBRARY.md
  - FEATURE_REGISTRY.md
related_entities: []
related_components:
  - Button
  - Badge
  - Card
  - Input
  - Avatar
  - Switch
  - Separator
  - MobileAppShell
  - MobileTopBar
  - MobileMain
  - MobileBottomNav
  - MobileTabShell
  - MobileDetailPage
  - MobileBrandMark
  - PageScroll
  - MobileFab
  - MobileListItem
  - MobileListCard
  - MobileStatCard
  - MobileSectionHeading
  - MobileFilterChip
  - MobileChipRow
  - MobileSegmentedControl
  - MobileSegmentedListItem
  - MobileSearchBar
  - MobileEmptyState
  - MobilePageBody
  - MobileActionBar
  - MobileTonalCard
  - LiveBadge
  - TempleLiveCard
  - QuickActionTile
  - PanditCard
  - ProductCard
  - BookingSummaryCard
  - PlayerBar
related_events: []
owner: Product Architecture
---

# Component Registry

## Why

Components already exist in code (`packages/ui`, `packages/mobile`, `packages/blocks`). This registry is the flat, authoritative index of them, so a feature document can say "uses `PanditCard`" and mean exactly one specific component, not a description that might not match what's implemented.

## What

Every component across the three code packages, its source package, and whether the concept it represents is currently V1 scope.

## Rules

- This registry lists components by name and location. It does not restate their props/behavior — the component's own source file is the implementation source of truth.
- A component's V1/future scope tag reflects the *product concept* it was built for, not whether the code itself works. Future-scoped components remain in the codebase for later use.

## Registry

### `packages/ui` (foundational primitives)

| Component | Scope |
| --- | --- |
| `Button` | V1 |
| `Badge` | V1 |
| `Card` | V1 |
| `Input` | V1 |
| `Avatar` | V1 |
| `Switch` | V1 |
| `Separator` | V1 |

### `packages/mobile` (chrome/shell)

| Component | Scope |
| --- | --- |
| `MobileAppShell` | V1 |
| `MobileTopBar` | V1 |
| `MobileMain` | V1 |
| `MobileBottomNav` | V1 — implements `NAVIGATION_MODEL.md` |
| `MobileTabShell` | V1 |
| `MobileDetailPage` | V1 |
| `MobileBrandMark` | V1 |
| `PageScroll` | V1 |
| `MobileFab` | V1 |
| `MobileListItem` | V1 |
| `MobileListCard` | V1 |
| `MobileStatCard` | V1 |
| `MobileSectionHeading` | V1 |
| `MobileFilterChip` | V1 |
| `MobileChipRow` | V1 |
| `MobileSegmentedControl` / `MobileSegmentedListItem` | V1 |
| `MobileSearchBar` | V1 |
| `MobileEmptyState` | V1 |
| `MobilePageBody` | V1 |
| `MobileActionBar` | V1 |
| `MobileTonalCard` | V1 (base surface for `packages/blocks` cards) |

### `packages/blocks` (domain-composed)

| Component | Scope | Note |
| --- | --- | --- |
| `LiveBadge` | future | Built for temple livestream content; generic enough to reuse if/when Live Streaming is promoted from `PRODUCT_VISION.md`. |
| `TempleLiveCard` | future | Temple/pandit booking concept — not V1. |
| `QuickActionTile` | V1 (component) | Thin wrapper over `MobileStatCard`; V1-usable for Content Discovery category tiles, but its current demo content (Temple Live, Pooja & Aarti) in `apps/showcase` is future-scope subject matter — implementation follow-up, not a documentation gap. |
| `PanditCard` | future | Pandit booking — not V1. |
| `ProductCard` | future | Merchandise/commerce — not V1. |
| `BookingSummaryCard` | future | Booking — not V1. |
| `PlayerBar` | V1 | Directly supports the Video Player feature (Suno/Dekho/Playing Now playback). |

## Dependencies

None.

## Relationships

- `COMPONENT_LIBRARY.md` (`02_DESIGN`) catalogs these same components from a design-rules perspective (variants, states); this registry is the existence/scope index.
- Feature `COMPONENTS.md` files reference this registry rather than re-describing a component.

## Constraints

- A feature marked V1 in `FEATURE_REGISTRY.md` may not reference a `future`-scoped component as its primary UI without flagging that as a gap here first.
- No component may be added to a feature's `COMPONENTS.md` without first existing in this registry.

## Acceptance

Every component referenced in any feature's `COMPONENTS.md` appears in this table with a matching name.

## Future Scope

`apps/showcase`'s demo screens currently use future-scoped block components (`TempleLiveCard`, `PanditCard`, `ProductCard`) as example content. Once V1 feature screens are actually built (Milestone 6+), the showcase demo content should be revisited to use V1-appropriate examples instead — this is a code-level follow-up, not a documentation blocker.
