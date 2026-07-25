---
document_id: TYPOGRAPHY
title: Typography
version: 1.1.0
status: active
priority: medium
depends_on:
  - DESIGN_SYSTEM_RULES
related_documents:
  - DESIGN_SYSTEM_RULES.md
  - SURFACE_SYSTEM.md
  - COMPONENT_LIBRARY.md
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Typography

## Why

Text is the majority of every screen's content. One type scale, consistently applied, keeps hierarchy (title vs. body vs. caption) readable and predictable across screens built at different times.

## What

The typeface and scale used across the design system.

## Rules

### Typeface

Inter Variable, one family for the entire product — no secondary display typeface. The display scale below is the same family at a larger size with tightened metrics, not a second face. See `DESIGN_SYSTEM_RULES.md` for why Inter was chosen over the Figma source's Roboto/M3 defaults.

### Display scale (`apps/web`, cinematic hero titles only)

Defined in `apps/web/src/index.css`. This scale sits **above** the general scale below, which tops out at `text-xl` and cannot carry a full-bleed hero. Each step ships a line-height and a letter-spacing with it, because type at this size needs both tightened; a display size used without its paired metrics reads as an oversized body heading.

| Utility | Size | Line height | Letter spacing |
| --- | --- | --- | --- |
| `text-display-sm` | 1.875rem | 1.05 | -0.02em |
| `text-display` | 2.75rem | 1 | -0.025em |
| `text-display-lg` | 4rem | 0.96 | -0.03em |
| `text-display-xl` | 5.25rem | 0.94 | -0.035em |

- Reserved for the title of a cinematic hero. No other element uses this scale — not a page title, not a section heading, not a stat value.
- The hero scales fluidly with a `clamp()` bounded by these steps rather than stepping between them at breakpoints, because a hero's height is viewport-relative and a stepped title jumps out of its scrim mid-resize. The steps define the range; the clamp moves within it.
- A display title always sits over a scrim (`SURFACE_SYSTEM.md`). At this size the text covers enough artwork that per-item contrast cannot be assumed.

### Scale (as used in code)

| Utility | Size | Use |
| --- | --- | --- |
| `text-app-title` | 17px, semibold, tight tracking | Top bar screen title — `packages/mobile` only, see caveat below |
| `text-detail-title` | `text-xl`, semibold, tight leading | Detail/pushed-screen heading — `packages/mobile` only, see caveat below |
| `text-2xl` | Dashboard stat values, page titles at wider breakpoints |
| `text-xl` | Page/detail headings |
| `text-lg` | Section headings (e.g. gallery section titles, card titles) |
| `text-sm` | Default body/label size — buttons, list item titles, most UI text |
| `text-xs` | Secondary/caption text — subtitles, muted metadata, chip labels |
| `text-[11px]` | Smallest — nav tab labels, timestamps |
| `text-[10px]` | Uppercase metadata badges (rating, certification, duration overlays) |

**Caveat — `text-app-title` and `text-detail-title` do not resolve in `apps/web`.** They are `packages/mobile` utilities, defined in that package's stylesheet, which `apps/web` does not import. An `apps/web` component using either class renders at inherited size with no error. `apps/web` headings therefore use `text-xl` / `text-2xl` with explicit weight and tracking instead. This is a known asymmetry between the two stylesheets, not a bug to be fixed by copying the utilities across.

### Weight

- `font-semibold` for titles and active/emphasized states (active bottom-nav label).
- `font-medium` for default list-item titles and inactive nav labels.
- No `font-bold` usage beyond what `font-semibold` already covers — avoid an unnecessary third weight tier.

## Dependencies

- `DESIGN_SYSTEM_RULES.md`

## Relationships

- `SURFACE_SYSTEM.md` — the scrims a display title depends on for legibility over artwork.
- `COMPONENT_LIBRARY.md` — `CinematicHero`, the only consumer of the display scale.

## Constraints

- No screen introduces a one-off font size outside this scale without adding it here first.
- No second typeface is introduced without updating `DESIGN_SYSTEM_RULES.md`'s Font Stack section first.
- The display scale is for cinematic hero titles. Any other use is a violation, not a judgment call.
- A display step is used with its paired line-height and letter-spacing, never the size alone.
- The two scales are not interchangeable: the display scale exists only in `apps/web`, and `text-app-title` / `text-detail-title` exist only in `packages/mobile`.

## Acceptance

Any text element in the product can be mapped to exactly one row in the Scale table above, or — if it is a cinematic hero title — to the Display Scale table.

Any `apps/web` component can be checked for use of `text-app-title` or `text-detail-title`, both of which would silently do nothing.

## Future Scope

Devanagari/other Indic script rendering has not been evaluated for Inter Variable's coverage — relevant once localization (`ACCESSIBILITY.md` Future Scope) becomes real work. This is now more than theoretical: `apps/web` renders Devanagari accents on Content cards and heroes (`COMPONENT_LIBRARY.md`), currently relying on the page's own font stack falling through to a system Devanagari face.

Whether the display scale should also apply to `packages/mobile` is undecided. Nothing there currently needs a title above `text-xl`.
