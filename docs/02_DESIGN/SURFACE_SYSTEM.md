---
document_id: SURFACE_SYSTEM
title: Surface System — Glass/Depth
version: 1.0.0
status: active
priority: high
depends_on:
  - DESIGN_SYSTEM_RULES
  - DESIGN_PHILOSOPHY
related_documents:
  - MASTER_PRD.md
  - RESPONSIVE_SYSTEM.md
  - COMPONENT_LIBRARY.md
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Surface System — Glass/Depth

## Why

`apps/web` (`MASTER_PRD.md`) needs a visual language more elevated than `packages/mobile`'s flat, opaque `surface-card`/`surface-tonal` utilities, while still using the same color tokens — not a new palette, a new *treatment* of the existing one.

## What

A layered, translucent "glass" surface language for `apps/web`: frosted panels over blurred background art, with depth communicated by blur/shadow/border rather than flat elevation.

## Rules

### Surface tiers

| Tier | Treatment | Use |
| --- | --- | --- |
| `surface-glass-base` | `bg-card/40`, `backdrop-blur-xl`, `border border-white/10` | Primary content panels (cards, list rows) |
| `surface-glass-raised` | `bg-card/60`, `backdrop-blur-2xl`, `border border-white/15`, `shadow-lg shadow-black/30` | Modals, popovers, the persistent sidebar at Wide breakpoint (`RESPONSIVE_SYSTEM.md`) |
| `surface-glass-accent` | `bg-primary/20` or `bg-accent/20`, `backdrop-blur-lg`, `border border-accent/30` | Emphasis panels (e.g. a featured/pinned content card) |

- All three tiers sit above a background layer, never directly on flat `--background` alone — the background itself carries soft gradient "bloom" shapes (radial gradients using `--primary`/`--accent` at low opacity) so the blur has something to diffuse.
- Text on a glass surface uses the same `--foreground`/`--muted-foreground` tokens as elsewhere (`DESIGN_SYSTEM_RULES.md`) — glass changes the surface, not the type color system (`TYPOGRAPHY.md`).
- Borders are always a translucent white (`border-white/10`–`/15`), not the opaque `--border` token used by `packages/mobile`'s flat surfaces — this is what gives a glass edge instead of a flat outline.

### Depth ordering (z-axis, back to front)

1. Background gradient bloom (fixed, behind everything)
2. Base content (`surface-glass-base`)
3. Raised/floating elements (`surface-glass-raised`) — sidebar, modals, popovers
4. Accent/featured panels (`surface-glass-accent`) — used sparingly, one per screen at most

## Dependencies

- `DESIGN_SYSTEM_RULES.md` — the color tokens this treatment layers on top of, unchanged.
- `DESIGN_PHILOSOPHY.md` — "calm, not overwhelming" still applies: blur and glow are structural, not decorative flourish.

## Relationships

- `RESPONSIVE_SYSTEM.md` — which surface tier applies to which layout element at which breakpoint.
- `COMPONENT_LIBRARY.md` — `apps/web`'s own component set (built in Milestone 8+) implements these tiers as reusable components, not ad hoc classNames per screen.

## Constraints

- This treatment applies to `apps/web` only. `packages/mobile`'s existing `surface-card`/`surface-tonal` utilities are not changed or replaced by this document.
- No more than one `surface-glass-accent` panel per screen — per `DESIGN_PHILOSOPHY.md`, accenting everything accents nothing and reads as visual noise, not "futuristic."
- Blur-heavy UI has real accessibility/performance cost (contrast, GPU cost on low-end devices) — every glass panel must still pass the contrast rules in `ACCESSIBILITY.md` against its actual rendered background, not just the token value in isolation.

## Acceptance

Any `apps/web` screen can be checked: every panel maps to one of the three tiers above, background bloom is present, and text contrast holds against the panel's actual translucent background.

## Future Scope

Exact blur radius / opacity values above are a starting point, to be validated visually once `apps/web` exists and can be viewed in-browser (Milestone 8+) — this document should be revised against real rendered screenshots, not just written once and assumed correct.
