---
document_id: COMPONENT_REGISTRY
title: Component Registry
version: 1.2.0
status: active
priority: high
depends_on: []
related_documents:
  - COMPONENT_LIBRARY.md
  - FEATURE_REGISTRY.md
  - SURFACE_SYSTEM.md
  - URL_STRUCTURE.md
related_entities: []
related_components:
  - Button
  - Badge
  - Card
  - Input
  - Avatar
  - Switch
  - Separator
  - MobileAppShell
  - MobileTopBar
  - MobileMain
  - MobileBottomNav
  - MobileTabShell
  - MobileDetailPage
  - MobileBrandMark
  - PageScroll
  - MobileFab
  - MobileListItem
  - MobileListCard
  - MobileStatCard
  - MobileSectionHeading
  - MobileFilterChip
  - MobileChipRow
  - MobileSegmentedControl
  - MobileSegmentedListItem
  - MobileSearchBar
  - MobileEmptyState
  - MobilePageBody
  - MobileActionBar
  - MobileTonalCard
  - LiveBadge
  - TempleLiveCard
  - QuickActionTile
  - PanditCard
  - ProductCard
  - BookingSummaryCard
  - PlayerBar
  - AppShell
  - TopBar
  - SideNav
  - BottomNav
  - MiniPlayer
  - BrandMark
  - StudioShell
  - AdminShell
  - GlassPanel
  - BackgroundBloom
  - Chip
  - RatingBadge
  - SectionHeader
  - CarouselRow
  - StatTile
  - PageHeader
  - CinematicHero
  - PosterCard
  - VideoCard
  - ListRowCard
  - CategoryTile
  - PlaybackStage
  - EmptyState
  - ShareButton
  - SettingsRow
  - AdInterstitial
  - AuthLayout
  - OptionCard
related_events: []
owner: Product Architecture
---

# Component Registry

## Why

Components already exist in code (`packages/ui`, `packages/mobile`, `packages/blocks`, and `apps/web`). This registry is the flat, authoritative index of them, so a feature document can say "uses `PanditCard`" and mean exactly one specific component, not a description that might not match what's implemented.

## What

Every component across the three code packages and `apps/web`, its source location, and whether the concept it represents is currently V1 scope.

## Rules

- This registry lists components by name and location. It does not restate their props/behavior — the component's own source file is the implementation source of truth.
- A component's V1/future scope tag reflects the *product concept* it was built for, not whether the code itself works. Future-scoped components remain in the codebase for later use.
- `apps/web` components are listed with the surfaces that compose them, because unlike the `packages/*` components — which exist as a library first and are demonstrated in `apps/showcase` — each `apps/web` component was built for specific screens, and its surface list is what makes a reuse violation visible.
- A component removed from the codebase is recorded in Removed Components rather than deleted from this document. A registry that silently forgets is how a superseded component gets reintroduced.

## Registry

### `packages/ui` (foundational primitives)

| Component | Scope |
| --- | --- |
| `Button` | V1 |
| `Badge` | V1 |
| `Card` | V1 |
| `Input` | V1 |
| `Avatar` | V1 |
| `Switch` | V1 |
| `Separator` | V1 |

### `packages/mobile` (chrome/shell)

| Component | Scope |
| --- | --- |
| `MobileAppShell` | V1 |
| `MobileTopBar` | V1 |
| `MobileMain` | V1 |
| `MobileBottomNav` | V1 — implements `NAVIGATION_MODEL.md` |
| `MobileTabShell` | V1 |
| `MobileDetailPage` | V1 |
| `MobileBrandMark` | V1 |
| `PageScroll` | V1 |
| `MobileFab` | V1 |
| `MobileListItem` | V1 |
| `MobileListCard` | V1 |
| `MobileStatCard` | V1 |
| `MobileSectionHeading` | V1 |
| `MobileFilterChip` | V1 |
| `MobileChipRow` | V1 |
| `MobileSegmentedControl` / `MobileSegmentedListItem` | V1 |
| `MobileSearchBar` | V1 |
| `MobileEmptyState` | V1 |
| `MobilePageBody` | V1 |
| `MobileActionBar` | V1 |
| `MobileTonalCard` | V1 (base surface for `packages/blocks` cards) |

### `packages/blocks` (domain-composed)

| Component | Scope | Note |
| --- | --- | --- |
| `LiveBadge` | future | Built for temple livestream content; generic enough to reuse if/when Live Streaming is promoted from `PRODUCT_VISION.md`. |
| `TempleLiveCard` | future | Temple/pandit booking concept — not V1. |
| `QuickActionTile` | V1 (component) | Thin wrapper over `MobileStatCard`; V1-usable for Content Discovery category tiles, but its current demo content (Temple Live, Pooja & Aarti) in `apps/showcase` is future-scope subject matter — implementation follow-up, not a documentation gap. |
| `PanditCard` | future | Pandit booking — not V1. |
| `ProductCard` | future | Merchandise/commerce — not V1. |
| `BookingSummaryCard` | future | Booking — not V1. |
| `PlayerBar` | V1 | Directly supports the Video Player feature — the docked mini player for Audio and Video playback. `apps/web` uses its own `MiniPlayer` rather than this component. |

### `apps/web` — layout and chrome

All paths relative to `apps/web/src/`.

| Component | Scope | Surfaces | File |
| --- | --- | --- | --- |
| `AppShell` | V1 | Every Main App route — the Main App structural area (`INFORMATION_ARCHITECTURE.md`) | `components/layout/AppShell.tsx` |
| `TopBar` | V1 | Every Main App screen, without exception (`NAVIGATION_MODEL.md`) | `components/layout/TopBar.tsx` |
| `SideNav` | V1 | Main App at Medium (icon rail) and Wide (expanded, labeled) breakpoints; hidden below `md` | `components/layout/SideNav.tsx` |
| `BottomNav` | V1 | Main App at Compact (< 768px) | `components/layout/BottomNav.tsx` |
| `MiniPlayer` | V1 | Every Main App screen whenever a playback session exists, except the loaded item's own `/content/:id` page where `PlaybackStage` supersedes it (`VideoPlayer/UI.md`) | `components/layout/MiniPlayer.tsx` |
| `BrandMark` | V1 | `TopBar`; all five Auth Area screens | `components/layout/BrandMark.tsx` |
| `StudioShell` | V1 | `/creator-studio`, `/creator-studio/content`, `/creator-studio/analytics` | `components/layout/StudioShell.tsx` |
| `AdminShell` | **unspecified** | `/admin`, `/admin/moderation`, `/admin/categories` | `components/layout/AdminShell.tsx` |
| `AuthLayout` | V1 | All five Auth Area screens — splash, login, signup, both onboarding steps | `components/auth/AuthLayout.tsx` |

`AdminShell` is scoped **unspecified**, not V1. `INFORMATION_ARCHITECTURE.md` defines three structural areas and none of them is Administration; `URL_STRUCTURE.md` defines no administrator routes; `FEATURE_REGISTRY.md` has no admin or moderation feature. It is registered here because it exists in code and this registry must not omit what exists — registration is not a scope decision. See `CHANGELOG.md` Milestone 23 for what must be documented before it ships.

None of these reuse their `packages/mobile` counterparts. `MASTER_PRD.md` gives `apps/web` its own layout layer, and `RESPONSIVE_SYSTEM.md` confirms `packages/mobile` is not consumed there — so `AppShell`/`TopBar`/`BottomNav`/`BrandMark` are parallel implementations of `MobileAppShell`/`MobileTopBar`/`MobileBottomNav`/`MobileBrandMark`, not wrappers over them. This duplication is deliberate and documented, not drift.

### `apps/web` — surface

| Component | Scope | Surfaces | File |
| --- | --- | --- | --- |
| `GlassPanel` | V1 | Search, Placeholder, Settings hub, Notifications, Downloads, all three Studio screens, all three Admin screens; composed internally by `StatTile` and `OptionCard` | `components/glass/GlassPanel.tsx` |
| `BackgroundBloom` | V1 | Rendered once per structural area — `AppShell`, `StudioShell`, `AdminShell`, `AuthLayout` | `components/glass/BackgroundBloom.tsx` |

`GlassPanel` is the only place `SURFACE_SYSTEM.md`'s three tiers are applied. `BackgroundBloom` is step 1 of that document's depth ordering.

### `apps/web` — UI primitives

| Component | Scope | Surfaces | File |
| --- | --- | --- | --- |
| `Chip` | V1 | Home, Suno, Category, Content Detail; `CinematicHero`'s metadata line | `components/ui/Chip.tsx` |
| `RatingBadge` | V1 | `CinematicHero`, `PosterCard`, `VideoCard` | `components/ui/Chip.tsx` |
| `SectionHeader` | V1 | Home, Suno, Search; composed internally by `CarouselRow` | `components/ui/CarouselRow.tsx` |
| `CarouselRow` | V1 | Home, Suno, Dekho | `components/ui/CarouselRow.tsx` |
| `StatTile` | V1 | Studio home, Studio analytics, Admin overview | `components/ui/StatTile.tsx` |
| `PageHeader` | V1 | Search, Category, Settings hub, Notifications, Downloads, Subscriptions, Studio home, Studio analytics, Admin overview | `components/ui/StatTile.tsx` |

Two components share `Chip.tsx` and two share `CarouselRow.tsx`, and two more share `StatTile.tsx`. This breaks `DESIGN_SYSTEM_RULES.md`'s one-component-per-file, kebab-case convention, which governs `packages/*`. Recorded here rather than silently accepted: `apps/web`'s files are PascalCase and co-locate a primitive with its closely-bound companion. Whether that rule should extend to `apps/web` or be scoped explicitly to `packages/*` is unresolved.

### `apps/web` — Content

| Component | Scope | Surfaces | File |
| --- | --- | --- | --- |
| `CinematicHero` | V1 | Home, Suno, Dekho | `components/content/CinematicHero.tsx` |
| `PosterCard` | V1 | Home, Suno, Dekho | `components/content/PosterCard.tsx` |
| `VideoCard` | V1 | Home, Search results, Category browse, Creator Profile | `components/content/VideoCard.tsx` |
| `ListRowCard` | V1 | Content Detail (related / up-next list) | `components/content/ListRowCard.tsx` |
| `CategoryTile` | V1 | Search (browse-all grid) | `components/content/CategoryTile.tsx` |
| `PlaybackStage` | V1 | Content Detail — the playback surface for both Content types (`VideoPlayer/UI.md`, `VideoPlayer/COMPONENTS.md`) | `components/content/PlaybackStage.tsx` |
| `EmptyState` | V1 | Search, Category, Creator Profile, Downloads, Subscriptions, all three Studio screens, Admin moderation | `components/content/EmptyState.tsx` |
| `ShareButton` | V1 | Content Detail, Shorts; `CinematicHero`, `PosterCard`, `VideoCard` | `components/content/ShareButton.tsx` |

`PlaybackStage` is the Video Player feature's player surface and the component `VideoPlayer/COMPONENTS.md` had specified only as "to be extracted". It branches on Content type — a native `<video>` element for Video, square artwork with the full transport row and lyrics panel for Audio — and registers either media element with the shared player context. It is the only place playback markup lives; no screen hand-rolls it.

The surface lists above no longer name a Playing Now screen. `Chip`, `ListRowCard`, `EmptyState`, and `ShareButton` were each recorded as composed by it; that screen was removed in Milestone 25 and the surfaces it contributed are now Content Detail's or gone.

### `apps/web` — feature-specific

| Component | Scope | Surfaces | File |
| --- | --- | --- | --- |
| `SettingsRow` | V1 | Settings hub, Notifications, Downloads | `components/settings/SettingsRow.tsx` |
| `AdInterstitial` | V1 | Content Detail (pre-roll) | `components/ads/AdInterstitial.tsx` |
| `OptionCard` | V1 | Onboarding format selection | `components/auth/OptionCard.tsx` |

`AdInterstitial` is the container `Advertisements/COMPONENTS.md` called for and is registered as the V1 that `FEATURE_REGISTRY.md` still records for that feature. `CHANGELOG.md` Milestone 23 notes a verbal direction that Advertisements is out of scope; that direction was never reflected in `FEATURE_REGISTRY.md`, so per `AI_INSTRUCTIONS.md` the documentation stands until it is updated. Unresolved.

`OptionCard` is used only by onboarding format selection. Onboarding language selection builds its own inline rows and should be moved onto `OptionCard` — an implementation follow-up, not a documentation gap.

## Removed Components

| Component | Removed in | Superseded by | Was at |
| --- | --- | --- | --- |
| `SectionRow` | Milestone 24 | `CarouselRow` — same purpose, plus a scroll-snapping track, arrow controls, and the `SectionHeader` eyebrow/see-all treatment | `apps/web/src/components/content/SectionRow.tsx` |
| `category-visuals.ts` | Milestone 24 | `apps/web/src/lib/poster-art.ts` — deterministic generated SVG artwork per Content item, replacing per-Category flat gradients | `apps/web/src/components/content/category-visuals.ts` |
| `PlayingNowPage` | Milestone 25 | `ContentDetailPage` + `PlaybackStage` — the "Playing Now" tab and its `/playing-now` route were removed by explicit product direction, and `/content/:id` became the single playback surface for both Content types. Removed as a screen, not merely superseded as markup: the bottom nav went from 5 tabs to 4 (`NAVIGATION_MODEL.md`) and the route no longer exists (`URL_STRUCTURE.md`). | `apps/web/src/pages/PlayingNowPage.tsx` |
| `CategoryChipRow` | Milestone 25 | `Chip` — removed as orphaned. It was registered at v1.1.0 as V1-scoped-but-unused with the note that it must be either adopted or removed; it was composed by no screen, `Chip` had already superseded its inline pill markup, and the filter rows on Home, Suno, and Category build from `Chip` directly. It was removed rather than adopted. The concept it implemented — `ContentCategorization/UI.md`'s inline filter row — is still V1 and is served by `Chip`. | `apps/web/src/components/content/CategoryChipRow.tsx` |

None of these is referenced by any surface. `category-visuals.ts` was a module rather than a component; it is recorded here because it was the source of every Content card's visual treatment, and its replacement is the substantive change (`COMPONENT_LIBRARY.md`, Generative Poster Artwork). `PlayingNowPage` was a page rather than a component; it is recorded here because removing it is a navigation-model change, and a registry that quietly dropped it would leave no trace of why three architecture documents changed at once.

`CategoryChipRow` is the first entry here removed for being orphaned rather than superseded in place, which is this section's rule working as intended: one milestone recorded it as unused, the next resolved it.

## Dependencies

None.

## Relationships

- `COMPONENT_LIBRARY.md` (`02_DESIGN`) catalogs these same components from a design-rules perspective (variants, states); this registry is the existence/scope index.
- `SURFACE_SYSTEM.md` (`02_DESIGN`) defines the tiers `GlassPanel` and `BackgroundBloom` implement.
- `URL_STRUCTURE.md` — the routes the surface columns above name.
- Feature `COMPONENTS.md` files reference this registry rather than re-describing a component.

## Constraints

- A feature marked V1 in `FEATURE_REGISTRY.md` may not reference a `future`-scoped component as its primary UI without flagging that as a gap here first.
- No component may be added to a feature's `COMPONENTS.md` without first existing in this registry.
- A component added to `apps/web` is registered in the same commit it lands. This registry fell three milestones behind (22 through 24), and every reuse violation those milestones introduced — duplicated pill markup, duplicated section headings, duplicated arrow-and-heading blocks — happened in the window where the registry could not be consulted.
- A component with no surface listed is either adopted or removed. It is not left registered as unused indefinitely.

## Acceptance

Every component referenced in any feature's `COMPONENTS.md` appears in this table with a matching name.

Every component file under `apps/web/src/components/` appears in exactly one `apps/web` table above, with a file path that resolves.

## Future Scope

`apps/showcase`'s demo screens currently use future-scoped block components (`TempleLiveCard`, `PanditCard`, `ProductCard`) as example content. Once V1 feature screens are actually built (Milestone 6+), the showcase demo content should be revisited to use V1-appropriate examples instead — this is a code-level follow-up, not a documentation blocker.

The `packages/*` and `apps/web` component sets now substantially overlap in concept (`MobileEmptyState` / `EmptyState`, `MobileSectionHeading` / `SectionHeader`, `MobileListItem` / `SettingsRow`, `MobileStatCard` / `StatTile`, `MobileFilterChip` / `Chip`). Whether that stays two parallel sets, or the shared concepts are lifted into `packages/ui` and consumed by both, is unresolved and would be a structural decision for `DESIGN_SYSTEM_RULES.md`'s package layering section.

Whether `apps/web` warrants its own `apps/web/COMPONENTS.md`-style catalog, rather than growing this registry indefinitely, becomes worth asking if the `apps/web` set grows much past its current size.
