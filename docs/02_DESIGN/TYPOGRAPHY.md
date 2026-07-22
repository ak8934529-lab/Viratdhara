---
document_id: TYPOGRAPHY
title: Typography
version: 1.0.0
status: active
priority: medium
depends_on:
  - DESIGN_SYSTEM_RULES
related_documents:
  - DESIGN_SYSTEM_RULES.md
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

Inter Variable, one family for the entire product — no secondary display typeface. See `DESIGN_SYSTEM_RULES.md` for why Inter was chosen over the Figma source's Roboto/M3 defaults.

### Scale (as used in code)

| Utility | Size | Use |
| --- | --- | --- |
| `text-app-title` | 17px, semibold, tight tracking | Top bar screen title |
| `text-detail-title` | `text-xl`, semibold, tight leading | Detail/pushed-screen heading |
| `text-lg` | Section headings (e.g. gallery section titles, card titles) |
| `text-sm` | Default body/label size — buttons, list item titles, most UI text |
| `text-xs` | Secondary/caption text — subtitles, muted metadata, chip labels |
| `text-[11px]` | Smallest — nav tab labels, timestamps |

### Weight

- `font-semibold` for titles and active/emphasized states (active bottom-nav label).
- `font-medium` for default list-item titles and inactive nav labels.
- No `font-bold` usage beyond what `font-semibold` already covers — avoid an unnecessary third weight tier.

## Dependencies

- `DESIGN_SYSTEM_RULES.md`

## Relationships

None beyond the design-system token source.

## Constraints

- No screen introduces a one-off font size outside this scale without adding it here first.
- No second typeface is introduced without updating `DESIGN_SYSTEM_RULES.md`'s Font Stack section first.

## Acceptance

Any text element in the product can be mapped to exactly one row in the Scale table above.

## Future Scope

Devanagari/other Indic script rendering has not been evaluated for Inter Variable's coverage — relevant once localization (`ACCESSIBILITY.md` Future Scope) becomes real work.
