---
document_id: RESPONSIVE_SYSTEM
title: Responsive System
version: 2.0.0
status: active
priority: high
depends_on:
  - LAYOUT_SYSTEM
related_documents:
  - LAYOUT_SYSTEM.md
  - MASTER_PRD.md
  - SURFACE_SYSTEM.md
related_entities: []
related_components:
  - MobileAppShell
related_events: []
owner: Product Architecture
---

# Responsive System

## Why

`apps/web` (`MASTER_PRD.md`) requires a real breakpoint and layout strategy — the letterboxed-mobile-shell approach that was honest for `apps/showcase` is not sufficient for a genuine web product. This document now carries two coexisting answers for two different surfaces; it does not retrofit one onto the other.

## What

Two responsive strategies, scoped to two different surfaces:

1. **`packages/mobile` / `apps/showcase`** — unchanged: mobile-shell-only, letterboxed on wider viewports. Still true, still not retrofitted.
2. **`apps/web`** — new: a real breakpoint system with distinct layouts per breakpoint, described below.

## Rules

### `packages/mobile` / `apps/showcase` (unchanged)

- `MobileAppShell` is `max-w-md` (28rem/448px), centered, letterboxed on wider viewports. No tablet/desktop variant exists or should be added here.
- `apps/showcase`'s gallery page is a documentation surface and stays wide (`max-w-5xl`) — unrelated to product layout.

### `apps/web` (new)

| Breakpoint | Range | Navigation | Content Layout |
| --- | --- | --- | --- |
| Compact | `< 768px` | Bottom tab bar (mirrors `NAVIGATION_MODEL.md`'s 5 tabs, web-native implementation, not a reuse of `packages/mobile`'s component) | Single column |
| Medium | `768–1279px` | Collapsible/icon-rail side navigation | 2-column grids for listing surfaces (Content Discovery, Search results) |
| Wide | `≥ 1280px` | Persistent expanded side navigation with labels | 3+ column grids, persistent secondary panel where relevant (e.g. Video Player detail + up-next list side by side) |

- Breakpoints follow Tailwind v4 defaults (`md: 768px`, `xl: 1280px`) rather than inventing custom values, for consistency with the rest of the stack (`DESIGN_SYSTEM_RULES.md`).
- Every `apps/web` screen is designed at all three breakpoints before being considered complete — this is a genuine responsive redesign, not progressive letterboxing.
- `apps/web`'s navigation is a new implementation (web-native side nav / bottom bar), not a reuse of `packages/mobile`'s `MobileBottomNav`/`MobileTopBar`, which are phone-chrome-shaped. It reads the same `NAVIGATION_MODEL.md` tab/route model, just renders it differently per breakpoint.

## Dependencies

- `LAYOUT_SYSTEM.md`

## Relationships

- `MASTER_PRD.md` — the decision that `apps/web` needs this.
- `SURFACE_SYSTEM.md` — how glass/depth panels behave across these breakpoints (e.g. sidebar as a persistent glass panel at Wide, a full-screen sheet at Compact).
- `NAVIGATION_MODEL.md` — the tab/route model this reimplements per breakpoint; not redefined here.

## Constraints

- `packages/mobile` is not modified to support `apps/web`'s breakpoints. `apps/web` gets its own layout components.
- A screen may not be considered done at only one breakpoint — Compact-only (or Wide-only) is an incomplete implementation.

## Acceptance

Every `apps/web` screen renders a deliberate, designed layout at Compact, Medium, and Wide — not a scaled/letterboxed version of one fixed design.

## Future Scope

Exact grid column counts and side-nav collapse behavior are refined per feature as each feature's `UI.md` is authored (Milestone 8+), not fully specified in advance here.
