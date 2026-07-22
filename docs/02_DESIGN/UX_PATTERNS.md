---
document_id: UX_PATTERNS
title: UX Patterns
version: 1.0.0
status: active
priority: high
depends_on:
  - DESIGN_PHILOSOPHY
  - LAYOUT_SYSTEM
related_documents:
  - DESIGN_PHILOSOPHY.md
  - LAYOUT_SYSTEM.md
  - COMPONENT_LIBRARY.md
related_entities: []
related_components:
  - MobileEmptyState
  - MobileActionBar
  - MobileSegmentedControl
  - MobileChipRow
  - MobileListItem
related_events: []
owner: Product Architecture
---

# UX Patterns

## Why

The reviewed Figma design had recurring interaction needs solved inconsistently across screens (e.g. no shared empty state — several screens just left literal `<Pooja Name>` placeholder text instead). Naming the pattern once, with the component that implements it, prevents that recurrence.

## What

Recurring interaction patterns and which component implements each.

## Patterns

### Mutually exclusive choice → Segmented Control

When exactly one of a small, fixed set of options applies (e.g. a language or format choice), use `MobileSegmentedControl`, not a row of individually-styled buttons.

### Non-exclusive filter → Chip Row

When multiple filters can combine or the set is scrollable/open-ended, use `MobileChipRow` / `MobileFilterChip`, not a segmented control.

### Sticky primary action → Action Bar

A screen with one dominant commit action (Save, Continue, primary CTA) puts it in `MobileActionBar`, docked below the scroll area — not inline at the bottom of scrollable content, where it can be missed or requires scrolling to reach.

### No data yet → Empty State, never placeholder text

Any screen state with nothing to show yet uses `MobileEmptyState` (icon + title + optional description/action). This directly replaces the literal `<Pooja Name>` / `<Merchandise>` placeholder text found during the original design review — that pattern is not acceptable in any implementation.

### Settings/list rows → List Item

A single-line row with an icon, title, optional subtitle, and a chevron/trailing control (Settings, Downloads, Notifications-style screens) uses `MobileListItem` uniformly — not a bespoke row per screen.

## Dependencies

- `DESIGN_PHILOSOPHY.md`, `LAYOUT_SYSTEM.md`

## Relationships

- `COMPONENT_LIBRARY.md` / `COMPONENT_REGISTRY.md` — the components named above.

## Constraints

- A screen may not reintroduce literal placeholder text (e.g. `<Item Name>`) for a not-yet-populated state. Use `MobileEmptyState`.
- A screen with a primary CTA may not bury it at the bottom of scrollable content when `MobileActionBar` is the correct pattern.

## Acceptance

Any screen exhibiting one of these five interaction needs uses the named component/pattern, not a one-off equivalent.

## Future Scope

Patterns for confirmation dialogs, toasts/snackbars, and multi-step wizards are not yet defined — added when a screen actually needs one.
