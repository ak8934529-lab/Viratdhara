---
document_id: ACCESSIBILITY
title: Accessibility
version: 1.0.0
status: active
priority: critical
depends_on:
  - PRODUCT_PHILOSOPHY
  - DESIGN_SYSTEM_RULES
related_documents:
  - PRODUCT_PHILOSOPHY.md
  - COMPONENT_LIBRARY.md
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Accessibility

## Why

`PRODUCT_PHILOSOPHY.md` states Accessibility as one of five non-negotiable product principles — keyboard navigation, screen readers, localization, varying screen sizes. This document makes that principle checkable at the component level.

## What

Concrete accessibility rules for every component and screen.

## Rules

### Touch targets

- Minimum touch target is 48×48px (`.touch-target` utility, `min-h-12 min-w-12`). Icon-only buttons in `packages/mobile` (top bar actions, FAB) meet this; a new icon-only control must too.

### Screen readers

- A decorative icon (one that duplicates adjacent visible text) is marked `aria-hidden`. A functional icon-only control (e.g. back arrow, search) has an explicit `aria-label`. This pattern is already used throughout `packages/mobile` (`aria-hidden` on icons, `aria-label="Go back"` on the back button) and must continue.
- Live/dynamic regions (a "Still listening?" prompt, playback state changes) need an appropriate live-region treatment — not yet implemented; see Future Scope.

### Keyboard navigation

- All interactive elements are real `<button>`/`<a>`/`<input>` elements (never a `<div>` with an `onClick`), so keyboard focus and activation work by default. `MobileListItem`, `MobileFilterChip`, `MobileSegmentedControl`, etc. all follow this already.
- Focus states use the `--ring` token (`focus-visible:ring-ring/50`), consistently across `packages/ui`.

### Color contrast

- Text/background pairs use `--foreground`/`--muted-foreground` against `--background`/`--card`, chosen for the dark palette. No component sets a custom text color outside the token set without a contrast check against its actual background.

### Localization

- No component hardcodes user-facing string layout in a way that breaks with longer translated text (e.g. fixed-width containers around text) — text containers use `truncate`/`min-w-0` flex patterns already, which must continue for any new component.
- Actual translation/locale infrastructure does not exist yet — see Future Scope.

## Dependencies

- `PRODUCT_PHILOSOPHY.md`, `DESIGN_SYSTEM_RULES.md`

## Relationships

- `COMPONENT_LIBRARY.md` — the components these rules apply to.

## Constraints

- No component ships as a non-interactive element wrapped to look like a button (a `<div>` with click handling). Use a real interactive element.

## Acceptance

Any new component can be checked: real interactive element, focus-visible ring present, decorative vs. functional icon labeling correct, meets the 48px touch target minimum.

## Future Scope

- No live-region/announcement pattern exists yet for dynamic state changes (playback start/stop, "still listening" prompts).
- No localization/translation infrastructure exists yet — `PRODUCT_PHILOSOPHY.md`'s "support localization" is a stated principle without implementation so far.
