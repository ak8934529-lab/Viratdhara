---
document_id: DESIGN_SYSTEM_RULES
title: Design System Rules
version: 1.1.0
status: active
priority: critical
depends_on:
  - DESIGN_PHILOSOPHY
related_documents:
  - COMPONENT_REGISTRY.md
  - COMPONENT_LIBRARY.md
  - SURFACE_SYSTEM.md
  - TYPOGRAPHY.md
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

### Tokens (baseline values — see `apps/showcase/src/index.css`)

This is the palette `packages/ui`, `packages/mobile`, and `packages/blocks` render against, via `apps/showcase`'s stylesheet.

| Token | Value | Use |
| --- | --- | --- |
| `--primary` | `#BE5339` (terracotta/maroon) | Primary actions, brand |
| `--accent` | `#D3932F` (gold) | Secondary emphasis, CTAs like "Buy Now" |
| `--background` | `#0D0D0D` | Base surface |
| `--card` | `#271611` | Card/elevated surface |
| `--destructive` | red (OKLCH) | Errors, live/urgent badges |
| `--radius` | `1rem` base; primary buttons use `rounded-full` explicitly | Pill CTA aesthetic — see `DESIGN_PHILOSOPHY.md` |

Tokens are CSS custom properties, mapped to Tailwind utilities via a `@theme inline` block — never hardcoded hex values inside a component's className.

### Tokens — `apps/web` range (see `apps/web/src/index.css`)

`apps/web` has its own stylesheet and its own token values. The brand hues are identical; what differs is the *range* the hues sit in — a deeper near-black base and a darker card tone, so the glass tiers (`SURFACE_SYSTEM.md`) and the generative poster artwork (`COMPONENT_LIBRARY.md`) have contrast to sit against.

| Token | Baseline | `apps/web` | Direction |
| --- | --- | --- | --- |
| `--primary` | `#be5339` | `#be5339` | unchanged |
| `--accent` | `#d3932f` | `#d3932f` | unchanged |
| `--ring` | `#d3932f` | `#d3932f` | unchanged |
| `--background` | `#0d0d0d` | `#08060a` | deepened |
| `--card` / `--popover` | `#271611` | `#1b0f0c` | deepened |
| `--accent-foreground` | `#271611` | `#1b0f0c` | tracks `--card` |
| `--secondary` | `oklch(0.24 0.02 40)` | `oklch(0.22 0.02 40)` | darkened |
| `--muted` | `oklch(0.24 0.02 40)` | `oklch(0.21 0.015 40)` | darkened |
| `--foreground` | `oklch(0.96 0.01 70)` | `oklch(0.97 0.01 70)` | brightened |
| `--muted-foreground` | `oklch(0.65 0.02 50)` | `oklch(0.68 0.02 55)` | brightened |

The two foreground tokens move *up* as the surfaces move *down* — the widened gap is what holds contrast on a darker base, per `ACCESSIBILITY.md`.

### Elevation ramp (`apps/web`)

One shadow ramp, so a card and a panel cannot invent their own depth. Applied via `shadow-[var(--shadow-*)]`, or by a glass tier that already carries one.

| Token | Use |
| --- | --- |
| `--shadow-sink` | Barely-raised base panels — the default glass tier |
| `--shadow-lift` | Content cards, accent panels, hover-resting state |
| `--shadow-float` | Raised chrome (mini player, bottom nav, modals) and card hover |
| `--shadow-cinema` | Full-bleed media surfaces (the player stage, Shorts viewport) |
| `--glow-accent` | Accent ring plus bloom, for a focused or active media surface |

A component that needs depth uses a ramp token. It does not write its own `box-shadow` value.

### Token scope boundary

`apps/web`'s token values live only in `apps/web/src/index.css`. `packages/mobile` and `apps/showcase` do not import that stylesheet, so a change to it cannot reach them. Two stylesheets holding two ranges of one palette is the deliberate arrangement, not drift: `MASTER_PRD.md` gives `apps/web` its own layout and surface layer, and `SURFACE_SYSTEM.md` already scopes the glass treatment the same way.

### Font

Inter Variable (`@fontsource-variable/inter`) — a deliberate choice, not an oversight. The reviewed Figma design's one bound typography variable was Roboto (Material 3 default); Inter was chosen instead to match the existing IQSandbox monorepo convention this design system was built alongside, since the Figma content's typography was generic M3 defaults, not a distinctive custom typeface worth preserving.

## Dependencies

- `DESIGN_PHILOSOPHY.md`

## Relationships

- `COMPONENT_REGISTRY.md` (`01_ARCHITECTURE`) — the existence/scope index for every component built to these rules.
- `COMPONENT_LIBRARY.md` — the design-facing catalog of variants/states.
- `SURFACE_SYSTEM.md` — the glass/depth treatment layered over these tokens in `apps/web`; consumes the elevation ramp above.
- `TYPOGRAPHY.md` — the type scale, including `apps/web`'s display steps.

## Constraints

- No component may hardcode a color, radius, or spacing value that has a corresponding token. Use the token.
- No new package layer may be introduced without updating this document.
- The brand hues (`--primary`, `--accent`, `--ring`) are the same in every stylesheet. A surface or foreground token may differ per app; a brand hue may not.
- A token added to `apps/web/src/index.css` is documented here before use, in the table for the layer it belongs to.

## Acceptance

Any component in `packages/ui`, `packages/mobile`, or `packages/blocks` can be checked against: correct layer, correct file/naming convention, tokens not hardcoded values, `cva` for variants.

Any `apps/web` component can be checked against: token not literal for color, ramp token not literal for shadow, brand hues matching the baseline.

## Future Scope

A `packages/patterns` or `packages/layouts` layer (present in the IQSandbox monorepo this was modeled on) does not exist yet here — added only if a real need for that additional layer emerges.
