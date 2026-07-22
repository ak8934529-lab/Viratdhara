---
document_id: LAYOUT_SYSTEM
title: Layout System
version: 1.0.0
status: active
priority: high
depends_on:
  - DESIGN_SYSTEM_RULES
related_documents:
  - DESIGN_SYSTEM_RULES.md
  - NAVIGATION_MODEL.md
related_entities: []
related_components:
  - MobileAppShell
  - MobileMain
  - PageScroll
  - MobileDetailPage
  - MobileTabShell
related_events: []
owner: Product Architecture
---

# Layout System

## Why

Every screen needs to compose the same handful of layout primitives (shell, scroll area, content padding) consistently, or spacing and scroll behavior drift screen to screen.

## What

The layout primitive hierarchy every Main App screen is built from.

## Rules

### Shell hierarchy (outer to inner)

```
MobileAppShell          — fixed-height (h-svh), max-w-md, overflow hidden, centers the app on wide viewports
└── MobileTopBar         — sticky header (present per NAVIGATION_MODEL.md)
└── MobileMain           — the one scrollable region; everything else on screen is fixed
    └── PageScroll        — gap-5, px-4, pt-4, pb-8 content wrapper (default screen padding)
└── MobileBottomNav / MobileActionBar — sticky footer (bottom nav for tab roots, action bar for detail screens with a CTA)
```

- Exactly one scrollable element per screen: `MobileMain`. Nothing above or below it in the hierarchy scrolls independently.
- `html`, `body`, and `#root` are `height: 100%; overflow: hidden` globally — this is why `MobileMain` must exist; without it a screen has no way to scroll at all.

### Screen shape variants

- **Tab-root screen** — `MobileTabShell` (top bar with no back-arrow + bottom nav).
- **Pushed/detail screen** — `MobileDetailPage` (back-arrow top bar, optional `MobileActionBar` footer for a sticky CTA like "Book"/"Buy Now"/"Save").

### Spacing scale (as used in code)

- `gap-2` / `gap-3` — tight groupings (icon + label, chip rows).
- `gap-4` / `gap-5` — section-level spacing (`PageScroll`'s default gap).
- `px-4` — standard horizontal screen padding.
- `pb-8` — bottom scroll padding, so content isn't flush against the bottom nav.

## Dependencies

- `DESIGN_SYSTEM_RULES.md`

## Relationships

- `NAVIGATION_MODEL.md` — the top bar / bottom nav that bookends this hierarchy.

## Constraints

- No screen renders content outside `MobileMain` that needs to scroll. If it needs to scroll, it goes inside `MobileMain`.
- No screen skips `MobileAppShell` — every screen is either a tab-root or a pushed screen, both of which start from it (`MobileTabShell` / `MobileDetailPage` both wrap it internally).

## Acceptance

Any screen's markup can be traced to exactly one of the two Screen Shape Variants above, with no ad hoc third pattern.

## Future Scope

`RESPONSIVE_SYSTEM.md` covers what happens to this shell hierarchy on viewports wider than a phone.
