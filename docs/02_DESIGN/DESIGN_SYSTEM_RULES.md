---
document_id: DESIGN_SYSTEM_RULES
title: Design System Rules
version: 1.0.0
status: active
priority: critical
depends_on:
  - DESIGN_PHILOSOPHY
related_documents:
  - COMPONENT_REGISTRY.md
  - COMPONENT_LIBRARY.md
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Design System Rules

## Why

The design system (`packages/ui`, `packages/mobile`, `packages/blocks`) already exists in code. This document is the rulebook it was built to, so future components stay consistent with it rather than each reinventing radius, spacing, or naming conventions.

## What

The structural and token rules governing the Viratdhara design system.

## Rules

### Stack

React 19 + Tailwind CSS v4 (CSS-first, no `tailwind.config.js`) + `class-variance-authority` (cva) for variants + Radix UI primitives + a `cn()` helper (`@dhara/utils`). No CSS-in-JS, no styled-components.

### Package layering

- `packages/ui` — foundational primitives. No dependency on `packages/mobile` or `packages/blocks`.
- `packages/mobile` — chrome/shell components. May depend on `packages/ui`-level utilities (`@dhara/utils`, `@dhara/constants`) but not on `packages/ui` components themselves.
- `packages/blocks` — domain-composed components. May depend on both `packages/ui` and `packages/mobile`.
- A package may only import from a strictly lower layer. `packages/blocks` never imports from another `packages/blocks` sibling.

### File and naming conventions

- One component per file, kebab-case filename (`mobile-top-bar.tsx`), no atomic-design folders (no `atoms/`, `molecules/`).
- Component export name is PascalCase and matches the concept, not the filename literally (`mobile-top-bar.tsx` exports `MobileTopBar`).
- Every styled element's classes are composed through `cn()`, never string-concatenated manually.
- Variants (visual options like `variant="outline"`) use `cva`, never inline conditional className logic.

### Tokens (current values — see `apps/showcase/src/index.css`)

| Token | Value | Use |
| --- | --- | --- |
| `--primary` | `#BE5339` (terracotta/maroon) | Primary actions, brand |
| `--accent` | `#D3932F` (gold) | Secondary emphasis, CTAs like "Buy Now" |
| `--background` | `#0D0D0D` | Base surface |
| `--card` | `#271611` | Card/elevated surface |
| `--destructive` | red (OKLCH) | Errors, live/urgent badges |
| `--radius` | `1rem` base; primary buttons use `rounded-full` explicitly | Pill CTA aesthetic — see `DESIGN_PHILOSOPHY.md` |

Tokens are CSS custom properties, mapped to Tailwind utilities via a `@theme inline` block — never hardcoded hex values inside a component's className.

### Font

Inter Variable (`@fontsource-variable/inter`) — a deliberate choice, not an oversight. The reviewed Figma design's one bound typography variable was Roboto (Material 3 default); Inter was chosen instead to match the existing IQSandbox monorepo convention this design system was built alongside, since the Figma content's typography was generic M3 defaults, not a distinctive custom typeface worth preserving.

## Dependencies

- `DESIGN_PHILOSOPHY.md`

## Relationships

- `COMPONENT_REGISTRY.md` (`01_ARCHITECTURE`) — the existence/scope index for every component built to these rules.
- `COMPONENT_LIBRARY.md` — the design-facing catalog of variants/states.

## Constraints

- No component may hardcode a color, radius, or spacing value that has a corresponding token. Use the token.
- No new package layer may be introduced without updating this document.

## Acceptance

Any component in `packages/ui`, `packages/mobile`, or `packages/blocks` can be checked against: correct layer, correct file/naming convention, tokens not hardcoded values, `cva` for variants.

## Future Scope

A `packages/patterns` or `packages/layouts` layer (present in the IQSandbox monorepo this was modeled on) does not exist yet here — added only if a real need for that additional layer emerges.
