---
document_id: SURFACE_SYSTEM
title: Surface System — Glass/Depth
version: 1.1.0
status: active
priority: high
depends_on:
  - DESIGN_SYSTEM_RULES
  - DESIGN_PHILOSOPHY
related_documents:
  - MASTER_PRD.md
  - RESPONSIVE_SYSTEM.md
  - COMPONENT_LIBRARY.md
  - COMPONENT_REGISTRY.md
related_entities: []
related_components:
  - GlassPanel
  - BackgroundBloom
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

Three tiers, defined once as `@utility` rules in `apps/web/src/index.css` and composed through the `GlassPanel` component rather than applied as raw classNames per screen.

| Tier | Fill | Backdrop filter | Border | Radius | Shadow | Use |
| --- | --- | --- | --- | --- | --- | --- |
| `surface-glass-base` | `--card` at 38% | `blur(28px) saturate(1.3)` | white 8% | `--radius-xl` | `--shadow-sink` | Primary content panels (cards, list rows, stat tiles) |
| `surface-glass-raised` | `--card` at 62% | `blur(44px) saturate(1.4)` | white 14% | `--radius-xl` | `--shadow-float` | Floating chrome — bottom nav, mini player — plus modals and popovers |
| `surface-glass-accent` | `--accent` at 18% | `blur(20px) saturate(1.2)` | `--accent` at 32% | `--radius-xl` | `--shadow-lift` | Emphasis panels (e.g. the player's now-playing panel) |

- Every tier carries a shadow from the elevation ramp in `DESIGN_SYSTEM_RULES.md`. A glass panel does not add its own `box-shadow` on top; if it needs more depth, it belongs in a higher tier.
- Every tier uses `--radius-xl` (20px), not `--radius-lg` (16px). One radius across all three is what makes a stack of panels read as one material.
- The backdrop filter is `blur()` *and* `saturate()`. Blur alone desaturates whatever shows through and the panel greys out over artwork; the saturate step is what keeps the bloom and the poster colour behind a panel alive.
- All three tiers sit above a background layer, never directly on flat `--background` alone — the background carries soft gradient bloom shapes (radial gradients using `--primary`/`--accent` at low opacity, the `.bg-bloom` fixed layer) so the blur has something to diffuse.
- Text on a glass surface uses the same `--foreground`/`--muted-foreground` tokens as elsewhere (`DESIGN_SYSTEM_RULES.md`) — glass changes the surface, not the type color system (`TYPOGRAPHY.md`).
- Borders are always a translucent white on the base and raised tiers, not the opaque `--border` token used by `packages/mobile`'s flat surfaces — this is what gives a glass edge instead of a flat outline. The accent tier borders in `--accent` instead, which is what marks it as the accent tier.

### Composable utilities

These are not tiers. Each is a single-purpose utility composed onto a tier, a media surface, or a scroll container. None of them establishes a surface on its own.

| Utility | Effect | Use |
| --- | --- | --- |
| `surface-sheen` | Positioning context (`relative`, `isolation: isolate`) for the sheen line | The panel that carries a top highlight |
| `surface-sheen-line` | 1px top inner highlight, white 22%, faded at both ends | Composed onto a glass tier — the light-catching top edge that reads as glass rather than as a flat translucent fill |
| `texture-grain` | Repeating monochrome fractal-noise tile | Over generated or media artwork, at very low opacity, to break gradient banding |
| `scrim-bottom` | Bottom-up black gradient, 92% → transparent | Legibility scrim behind text laid over artwork — poster cards, category tiles, hero lower third |
| `scrim-left` | Left-to-right black gradient, 90% → transparent | Legibility scrim for cinematic heroes, where the title sits in the left column over full-bleed artwork |
| `scrollbar-none` | Hides the scrollbar track without disabling scrolling | Horizontal carousel tracks and chip rows |

- The two scrims stack. A cinematic hero applies `scrim-left` across the full surface and `scrim-bottom` across the lower portion, because neither alone holds contrast across every generated palette.
- `scrollbar-none` hides the track only. The container remains natively scrollable and its contents remain keyboard-reachable — this is a visual affordance change, never a removal of function.
- `surface-sheen` / `surface-sheen-line` are defined but not yet composed onto any panel. They are documented here as available; a panel that adopts them is not introducing a new utility.

### Depth ordering (z-axis, back to front)

1. Background gradient bloom (`.bg-bloom`, fixed, behind everything)
2. Base content (`surface-glass-base`)
3. Raised/floating elements (`surface-glass-raised`) — bottom nav, mini player, modals, popovers
4. Accent/featured panels (`surface-glass-accent`) — used sparingly, one per screen at most

## Dependencies

- `DESIGN_SYSTEM_RULES.md` — the color tokens this treatment layers on top of, and the elevation ramp (`--shadow-sink` / `-lift` / `-float` / `-cinema`) each tier draws its shadow from.
- `DESIGN_PHILOSOPHY.md` — "calm, not overwhelming" still applies: blur and glow are structural, not decorative flourish.

## Relationships

- `RESPONSIVE_SYSTEM.md` — which surface tier applies to which layout element at which breakpoint.
- `COMPONENT_LIBRARY.md` — `apps/web`'s own component set implements these tiers as reusable components (`GlassPanel`), not ad hoc classNames per screen; its poster artwork is what the scrims and grain sit over.
- `COMPONENT_REGISTRY.md` (`01_ARCHITECTURE`) — where the components that carry these tiers are registered.

## Constraints

- This treatment applies to `apps/web` only. `packages/mobile`'s existing `surface-card`/`surface-tonal` utilities are not changed or replaced by this document.
- No more than one `surface-glass-accent` panel per screen — per `DESIGN_PHILOSOPHY.md`, accenting everything accents nothing and reads as visual noise, not "futuristic."
- Blur-heavy UI has real accessibility/performance cost (contrast, GPU cost on low-end devices) — every glass panel must still pass the contrast rules in `ACCESSIBILITY.md` against its actual rendered background, not just the token value in isolation.
- A screen composes `GlassPanel`. Applying a `surface-glass-*` utility directly is reserved for cases where the panel is not a `<div>` the component can produce.
- Text over artwork always carries a scrim. Generated poster artwork varies in palette per item (`COMPONENT_LIBRARY.md`), so contrast cannot be assumed from any single rendering.
- A new surface utility is added to the Composable Utilities table before use. A screen may not invent a one-off scrim, grain, or sheen.

## Acceptance

Any `apps/web` screen can be checked: every panel maps to one of the three tiers above, background bloom is present, every tier's radius and shadow come from the token set rather than a local value, and text contrast holds against the panel's actual translucent background.

Any text laid over artwork can be traced to a `scrim-bottom` or `scrim-left` layer beneath it.

## Future Scope

The blur, opacity, and shadow values above were revised against the rendered application rather than written once and assumed — they now describe what `apps/web` actually renders. They remain open to further revision against real screenshots as more screens are built.

`surface-sheen` / `surface-sheen-line` await a first adopting panel. Whether the sheen belongs on every raised tier by default, rather than being opted into, is undecided.
