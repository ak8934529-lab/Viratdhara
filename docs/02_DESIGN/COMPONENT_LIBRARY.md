---
document_id: COMPONENT_LIBRARY
title: Component Library
version: 1.1.0
status: active
priority: high
depends_on:
  - DESIGN_SYSTEM_RULES
related_documents:
  - COMPONENT_REGISTRY.md
  - SURFACE_SYSTEM.md
  - TYPOGRAPHY.md
related_entities:
  - Content
  - Category
related_components:
  - Button
  - Badge
  - Card
  - Input
  - Avatar
  - Switch
  - Chip
  - RatingBadge
  - CarouselRow
  - SectionHeader
  - StatTile
  - PageHeader
  - CinematicHero
  - PosterCard
  - VideoCard
  - ListRowCard
  - CategoryTile
  - EmptyState
  - ShareButton
  - GlassPanel
related_events: []
owner: Product Architecture
---

# Component Library

## Why

`COMPONENT_REGISTRY.md` (`01_ARCHITECTURE`) answers "does this component exist and is it V1 scope." This document answers the design question instead: what variants and states does each component actually offer, so a screen is built with the right variant rather than a one-off override.

## What

Variant and state catalog for the `packages/ui` primitives and the `apps/web` primitives — the components every screen composes from.

## Rules

- A screen uses an existing variant. A one-off className override to fake a variant that doesn't exist yet means the variant is missing from the component — add it to the component (and this catalog), don't override around it.
- `apps/web` composes `packages/ui` primitives (`Button`, `Badge`, `Avatar`) but has its own layout, chrome, and Content-card components. It does not consume `packages/mobile` (`RESPONSIVE_SYSTEM.md`), so a `packages/mobile` component's existence does not satisfy an `apps/web` need.

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

## Catalog — `apps/web` primitives

### GlassPanel

Tiers: `base`, `raised`, `accent` — the three surfaces in `SURFACE_SYSTEM.md`, and the only place they are applied. Default `base`.

### Chip

Tones: `filter` (selectable pill, gold-filled when active, `aria-pressed` carries the state), `meta` (non-interactive descriptor, renders as a `<span>`), `time` (compact, tabular figures, for durations and session times).
Renders as `<button>` by default; `as="span"` forces the non-interactive form, as does `tone="meta"`.
One pill primitive for every chip row — category filters, genre labels, tag rows. Screens previously hand-rolled near-duplicate pill markup, which had already drifted between Home, Suno, and Category.

### RatingBadge

Tones: `neutral` (translucent black over artwork), `match` (green percentage treatment), `warn` (destructive-tinted).
Small uppercase metadata badge for card corners and hero meta lines. Not a variant of `Badge` — it is sized and weighted for placement over artwork, where `Badge` is sized for inline layout.

### SectionHeader

Slots: title, optional `eyebrow` (uppercase, gold, wide tracking), optional "See all" pill link, and a trailing `children` slot.
The web equivalent of `MobileSectionHeading`. Used standalone for grid sections and internally by `CarouselRow`.

### CarouselRow

Gaps: `tight` (poster rows), `default` (landscape rows).
Composes `SectionHeader` and adds a horizontally scrolling, scroll-snapping track with circular prev/next arrows. The arrows are pointer-only and hidden at Compact: the track is natively scrollable and its contents keyboard-reachable through their links, so hiding the arrows removes a redundant control, not a function. Track uses `scrollbar-none` (`SURFACE_SYSTEM.md`).

### StatTile

Tones: `default` (primary), `accent`, `warn` (destructive).
Icon, value, label on a `base` glass panel with a blurred corner bloom. Carries no trend arrow, sparkline, or delta — `CreatorStudio/SPEC.md` states trends over time are not specified, so adding one would be invented UI.

### PageHeader

Slots: title, optional subtitle, optional back arrow (`backTo` plus an accessible `backLabel`), trailing `children` action slot.
The heading block for pushed/detail and dashboard screens. Replaces near-identical arrow-plus-heading markup that Search, Category, Creator Profile, and the Settings screens each carried separately.

### CinematicHero

Sizes: `full` (the Home treatment), `compact` (secondary tabs). Optional `eyebrow`.
Full-bleed generated backdrop, stacked `scrim-left` + `scrim-bottom` scrims, `texture-grain`, an oversized Devanagari watermark, a display-scale title (`TYPOGRAPHY.md`), a metadata line, and a primary/secondary action row. The backdrop bleeds past the shell's padding to the viewport edge while the copy stays in the content column.

### PosterCard

Shapes: `portrait` (2:3), `landscape` (16:9). Sizes: `sm`, `default`, `lg`. Optional `rank` index badge.
At portrait size the title sits *below* the artwork, which is what keeps a dense poster row legible; the landscape variant overlays the title because it has the width for it. Hover lifts the card and raises it from `--shadow-lift` to `--shadow-float`.

### VideoCard

Single shape — 16:9 artwork with a metadata line beneath (rating · views · recency) and a creator avatar. The grid card for Home, Search results, Category browse, and Creator Profile.

### ListRowCard

Optional `eyebrow` secondary line, optional `progress` (0–100, renders a bar across the thumbnail), optional `onPlay` circular play control.
Compact horizontal row for dense vertical lists — the player's up-next panel and the detail page's related list.

### CategoryTile

Single style — a Category entry point over its generated artwork, with a `scrim-bottom`, the Category's Devanagari glyph, and a corner arrow affordance.

### EmptyState

Single style — icon, title, optional description and action. The one empty-state treatment for `apps/web`, per `UX_PATTERNS.md`. Hard constraint from that document: a screen may never reintroduce literal placeholder text (e.g. `<Item Name>`) for a not-yet-populated state.

### ShareButton

Variants: `icon` (bare ghost icon button), `labelled` (icon with a caption beneath, for the Shorts overlay rail).
A thin wrapper over `Button`, not a new primitive — `Sharing/COMPONENTS.md` states no new component is built for the share icon itself.

### Card shape note

`PosterCard`, `VideoCard`, and `ListRowCard` are deliberately not one large `<Link>`. Each carries a share action, and a `<button>` may not nest inside an `<a>`. The share control is a sibling of the card's links, not a descendant.

## Generative poster artwork

`apps/web` has no thumbnail assets — no media pipeline exists (`CONTENT_ARCHITECTURE.md`, and `docs/04_BACKEND` is still `planned`). Flat gradient blocks were previously used as a stand-in, and they read as *missing images* rather than as design. `apps/web/src/lib/poster-art.ts` replaces them with deterministic generated artwork: one distinct SVG poster per Content item, emitted as a data URI for use as a CSS background or an `<img src>`.

### Rules

- **Deterministic per item.** Artwork is seeded from the Content id through a stable 32-bit hash, so the same item renders identical artwork on every surface it appears on, across reloads and across sessions. Nothing is random at runtime.
- **Geometry only — no `<text>` inside the SVG.** An SVG referenced through a data URI cannot use the page's webfonts, so Devanagari set inside it would risk rendering as tofu on systems without a matching font. Devanagari accents are composed as real HTML text in the card components instead, where the page's own font stack applies.
- **Self-contained.** No external hosts, no network at runtime.
- **Three shapes**, matching the card surfaces that consume them: `portrait` (600×900), `landscape` (960×540), `square` (600×600).

### Motifs and palettes

One motif per Category — its structural identity — and three palette variants per motif — its colour range.

| Category | Motif | Form |
| --- | --- | --- |
| Bhajans & Kirtan | `mandala` | Concentric rings, a rotated petal ring, inner tick marks |
| Discourses & Satsang | `arch` | Temple silhouette — central arch, flanking pillars, finial, horizon steps |
| Aarti & Rituals | `rays` | Radiating light from a low centre, deliberately the hottest palette set |
| Devotional Stories | `bloom` | Layered petals opening outward |
| Festival Specials | `rangoli` | Radial arms of dots with connecting diamonds |

Three palettes per motif exist for a specific reason: with one palette per Category, a carousel row of same-category items renders as near-identical tiles, which reads as a broken repeat rather than a catalogue. Light-source position and motif rotation also vary per item, for the same reason.

The Devanagari glyph is likewise drawn from a per-Category pool and varied per item, so a row does not repeat one glyph. A separate `CATEGORY_GLYPH` map gives the single glyph for surfaces representing the Category itself (browse tiles, banners) rather than an individual item.

### Constraints

- Artwork palettes are wider than the brand palette, and that is intentional: artwork is imagery, not chrome. UI chrome — buttons, chips, accents, active states — stays terracotta/gold per `DESIGN_SYSTEM_RULES.md`, in the same way a streaming service's interface holds one colour while its posters do not.
- The Category list this module keys on is `CONTENT_ARCHITECTURE.md`'s placeholder list of 5. Adding a motif means a Category was added there first.
- Generated artwork is a stand-in for real media. It is not a decision that Content will never have real thumbnails.
- Any text over this artwork carries a scrim (`SURFACE_SYSTEM.md`), because the palette behind it varies per item.

## Dependencies

- `DESIGN_SYSTEM_RULES.md`

## Relationships

- `COMPONENT_REGISTRY.md` — existence and V1/future scope for these and every other component (`packages/mobile`, `packages/blocks`, `apps/web`).
- `SURFACE_SYSTEM.md` — the tiers `GlassPanel` implements and the scrim/grain utilities the card and hero components compose.
- `TYPOGRAPHY.md` — the display scale `CinematicHero` consumes.

## Constraints

- A new variant added to a component must be added here in the same change, not left for someone to discover by reading source.
- An `apps/web` screen composes the primitives above. Hand-rolling a pill, a section heading, an empty state, or a card is a reuse violation, not a shortcut — each of these components exists because that duplication had already happened and drifted.

## Acceptance

Any screen's use of `Button`/`Badge`/`Card`/`Input`/`Avatar`/`Switch` can be checked against a listed variant/size here.

Any `apps/web` screen's panels, chips, headings, cards, and empty states can be traced to a listed `apps/web` primitive and one of its listed variants.

Any Content card's artwork can be traced to `poster-art.ts` — no card carries a flat gradient, and no SVG contains text.

## Future Scope

`packages/mobile` and `packages/blocks` components will get their own variant catalogs here once they grow beyond single-style, mirroring this document's structure for `packages/ui`.

Generated artwork's relationship to real thumbnails is undefined: whether a real thumbnail replaces the generated poster entirely, or the generated poster remains the fallback for items without one, is a decision for whenever `docs/04_BACKEND` defines a media pipeline.
