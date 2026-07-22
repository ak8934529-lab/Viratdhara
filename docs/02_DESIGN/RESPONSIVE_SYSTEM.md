---
document_id: RESPONSIVE_SYSTEM
title: Responsive System
version: 1.0.0
status: draft
priority: medium
depends_on:
  - LAYOUT_SYSTEM
related_documents:
  - LAYOUT_SYSTEM.md
related_entities: []
related_components:
  - MobileAppShell
related_events: []
owner: Product Architecture
---

# Responsive System

## Why

The reviewed Figma design is mobile-only — every screen is a fixed ~375–428px frame. This document is honest about that rather than inventing a full desktop/tablet breakpoint system the design doesn't actually have yet.

## What

The current, minimal responsive behavior: mobile-first, with wider viewports letterboxed rather than given a distinct layout.

## Rules

- V1 has exactly one designed layout: mobile. `MobileAppShell` is `max-w-md` (28rem/448px) and centers itself (`mx-auto`) on any viewport wider than that — this is letterboxing, not a responsive redesign.
- No component in `packages/ui`/`packages/mobile`/`packages/blocks` has a tablet- or desktop-specific variant. None should be added speculatively.
- `apps/showcase`'s component gallery page (not a product screen) is the one exception — it uses a wider `max-w-5xl` layout because it's a documentation/preview surface, not part of the product itself. This distinction must not blur: product screens stay mobile-shell-shaped; the gallery does not need to.

## Dependencies

- `LAYOUT_SYSTEM.md`

## Relationships

None yet — there is no tablet/desktop design to relate to.

## Constraints

- Do not add a `md:`/`lg:` responsive variant to a product component without a real design decision behind it. An untested guess at "how this should look wider" is worse than the current honest letterboxing.

## Acceptance

Any product screen renders correctly (centered, unstretched, no broken layout) from 320px up through arbitrarily wide viewports, using letterboxing alone — that is the current bar, not a responsive redesign.

## Future Scope

If Viratdhara ships a tablet or desktop web experience, this document needs a real breakpoint system designed first — not retrofitted onto the mobile components after the fact. That work has not started.
