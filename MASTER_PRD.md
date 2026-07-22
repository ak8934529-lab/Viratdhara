---
document_id: MASTER_PRD
title: Master PRD — Viratdhara Web App
version: 1.0.0
status: active
priority: critical
depends_on:
  - PRODUCT_CONTEXT
  - FEATURE_REGISTRY
  - DESIGN_SYSTEM_RULES
related_documents:
  - AI_INSTRUCTIONS.md
  - PRODUCT_VISION.md
  - INFORMATION_ARCHITECTURE.md
  - RESPONSIVE_SYSTEM.md
  - SURFACE_SYSTEM.md
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Master PRD — Viratdhara Web App

## Why

Building `apps/web` requires synthesizing product intent (`00_PRODUCT`), architecture (`01_ARCHITECTURE`), design rules (`02_DESIGN`), and per-feature specs (`03_FEATURES`) into one entry point. Without this, an implementing agent has to assemble the picture itself from ~90 documents before writing the first line of code. This document is that assembly — it does not restate any rule, it points to where each rule lives.

## What

`apps/web` is a new web application (distinct from `apps/showcase`, which remains the component gallery/reference surface) implementing the 11 V1 features for real, wide-viewport web use — not a centered mobile shell in a browser.

### Product identity

Viratdhara: a trusted, calm digital ecosystem for devotional and spiritual content. Full definition: `PRODUCT_CONTEXT.md`, `PRODUCT_VISION.md`, `PRODUCT_PHILOSOPHY.md`. V1 scope excludes temple/pandit booking and merchandise commerce — `PRODUCT_VISION.md` Resolved Scope Note.

### Visual direction

Glass/depth: frosted, translucent panels layered over blurred background art, soft shadows creating a sense of physical depth between surfaces — a deliberate departure from `packages/mobile`'s opaque `surface-card`/`surface-tonal` treatment, built as `apps/web`'s own layer on top of the same color tokens. Full definition: `SURFACE_SYSTEM.md`.

### Layout target

Real responsive web — not a letterboxed mobile shell. Sidebar/top navigation instead of a bottom tab bar on wide viewports, multi-column grids for content listing, etc. Full definition: `RESPONSIVE_SYSTEM.md`.

### Feature scope (11 features, this development pass)

| Working name (this pass) | Canonical name (`FEATURE_REGISTRY.md`) | KB Status |
| --- | --- | --- |
| Onboarding Aspects | Authentication (onboarding is part of this feature) | documented — see `docs/03_FEATURES/Authentication/` |
| Content Listing | Content Discovery | to be authored |
| Search | Search | to be authored |
| Video Streaming Algorithm | Recommendation Engine | to be authored |
| Video Player | Video Player | to be authored |
| Video Categorization | Content Categorization | to be authored |
| Share | Sharing | to be authored |
| Studio dashboard for analytics | Creator Studio | to be authored |
| Creator Profile | Creator Profile | to be authored |
| User Settings | User Settings | to be authored |
| Ads Between video | Advertisements (narrowed to interstitial/between-video placement for this pass) | to be authored |

No feature outside this table and `FEATURE_REGISTRY.md`'s existing 11 is in scope for `apps/web`.

## Rules

- This document does not redefine anything — every claim above links to its source document. If this document and a source document disagree, the source document wins; this document gets corrected.
- `apps/web` reuses `packages/ui` (primitives, tokens), `packages/utils`, `packages/constants` directly. It does **not** reuse `packages/mobile` (phone-chrome shell) — a new web-specific layout/navigation layer is built for `apps/web` instead. See `RESPONSIVE_SYSTEM.md` and `SURFACE_SYSTEM.md`.
- `packages/blocks` components tagged `future` in `COMPONENT_REGISTRY.md` (`TempleLiveCard`, `PanditCard`, `ProductCard`, `BookingSummaryCard`) are not used in `apps/web` — they support out-of-scope features.
- Every feature above gets the full 13-file knowledge base under `docs/03_FEATURES/<CanonicalName>/`, built from `templates/FEATURE_TEMPLATE/`, one feature per commit, matching the process already used for Authentication (Commit 6).

## Dependencies

- `PRODUCT_CONTEXT.md`, `FEATURE_REGISTRY.md`, `DESIGN_SYSTEM_RULES.md`

## Relationships

- `AI_INSTRUCTIONS.md` — read this document only after the required-reading order there; this document does not replace step 1–5.
- `RESPONSIVE_SYSTEM.md` — the web layout/breakpoint strategy this PRD's "Layout target" points to.
- `SURFACE_SYSTEM.md` — the glass/depth visual language this PRD's "Visual direction" points to.
- `DEPENDENCY_GRAPH.md` — the build order for the 11 features (`Authentication` and Content Architecture first, `Recommendation Engine`/`Content Discovery` last per the existing topological sort).

## Constraints

- `apps/web` is web-only in this pass. It is not a shared codebase with a future native mobile app — see `PRODUCT_VISION.md` for platform ambiguity already flagged.
- No feature's rich spec may introduce scope beyond what's in the Feature Scope table above without a recorded decision (`CHANGELOG.md`), per the Commit 2.1 precedent.

## Acceptance

An AI agent given only this document, `AI_INSTRUCTIONS.md`, and the documents it links to can determine: what to build, in what order, using which components/tokens, and where the visual/layout rules live — without needing to ask.

## Future Scope

- A native mobile app (using `packages/mobile`, already built) is a separate, later effort — not this pass.
- Booking/merchandise features remain future scope per `PRODUCT_VISION.md` and are not reconsidered by this PRD.
