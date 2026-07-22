---
document_id: CHANGELOG
title: Changelog
version: 1.0.0
status: active
priority: high
depends_on: []
related_documents:
  - PROJECT_INDEX.md
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Changelog

One entry per milestone/commit. Newest first.

## Commit 11 — Sharing Feature Knowledge Base

- Added the full 13-file feature knowledge base at `docs/03_FEATURES/Sharing/`.
- Specified native platform share (`navigator.share` + copy-link fallback) as the mechanism — no custom share sheet or short-link service.
- Flagged one open gap: whether an unauthenticated recipient can view shared Content or must log in first is unconfirmed.
- `FEATURE_REGISTRY.md` KB Status updated to `documented`.

## Commit 10 — Video Player Feature Knowledge Base

- Added the full 13-file feature knowledge base at `docs/03_FEATURES/VideoPlayer/`.
- Clarified this feature plays both Video and Audio Content types despite its name (carried over from the reviewed design's "Playing Now" tab).
- Flagged 3 open gaps: network-interruption handling, background audio playback, and content-removed-mid-playback behavior — none resolved by assumption.
- Noted the full-player transport controls (`apps/showcase/PlayerScreen.tsx`) need extraction into a registered component before this feature is implementation-complete.
- `FEATURE_REGISTRY.md` KB Status updated to `documented`.

## Commit 9 — Search Feature Knowledge Base

- Added the full 13-file feature knowledge base at `docs/03_FEATURES/Search/`.
- Defined a feature-local state machine (`idle`/`searching`/`results`/`no_results`/`error`) — not added to `STATE_REGISTRY.md` since it's not cross-feature.
- Flagged one open gap: query sanitization/length limits are unspecified — a security/backend concern, not resolved by assumption.
- `FEATURE_REGISTRY.md` KB Status updated to `documented`.

## Commit 8 — Content Categorization Feature Knowledge Base

- Added the full 13-file feature knowledge base at `docs/03_FEATURES/ContentCategorization/`.
- Flagged one open gap, deliberately not resolved: the V1 Category list itself is undefined in any source document. Structural UI/data work can proceed against mock data; final Category names are a pending product decision.
- `FEATURE_REGISTRY.md` KB Status updated to `documented` for this feature.

## Commit 7 — Master PRD + Web Design Foundation

- Added root `MASTER_PRD.md` — the single entry point for building `apps/web` (a new web app, distinct from `apps/showcase`), synthesizing product/architecture/design/feature scope. Maps the user's working feature names (Onboarding Aspects, Content Listing, Video Streaming Algorithm, Video Categorization, Studio dashboard for analytics, Ads Between video, etc.) to the existing `FEATURE_REGISTRY.md` canonical names — no renaming of existing docs, just an explicit mapping.
- `RESPONSIVE_SYSTEM.md` rewritten (v2.0.0): now carries two coexisting strategies — `packages/mobile`/`apps/showcase` stay letterboxed-mobile-only (unchanged), while `apps/web` gets a real 3-breakpoint system (Compact/Medium/Wide) with distinct navigation and grid layouts per breakpoint.
- Added `docs/02_DESIGN/SURFACE_SYSTEM.md` — the glass/depth visual language for `apps/web` (frosted translucent panels, background gradient blooms, 3 surface tiers), explicitly layered on the existing color tokens rather than introducing a new palette, and explicitly not applied to `packages/mobile`'s existing opaque surfaces.
- Decision recorded: `apps/web` does not reuse `packages/mobile` (phone-chrome shell) — it gets its own web-native layout/navigation components, reading the same `NAVIGATION_MODEL.md` route model.
- Next: rich, implementation-ready feature specs for the remaining 10 features, one feature per commit, per `MASTER_PRD.md`'s Feature Scope table.

## Commit 6 — Authentication Feature Knowledge Base

- Added the full 13-file feature knowledge base at `docs/03_FEATURES/Authentication/`, copied from `templates/FEATURE_TEMPLATE/` and filled in per `PROMPT_LIBRARY.md`'s "Start a new V1 feature's knowledge base" prompt.
- `FEATURE_REGISTRY.md` KB Status updated: Authentication is now `documented`, with 2 open gaps flagged rather than resolved by assumption: (1) `password_minimum` validation rule unspecified, (2) the reviewed design's "Booking" onboarding option needs a product decision (hide vs. repurpose) since booking is out of V1 scope.
- `AUTHENTICATION_API.md` is `draft`, matching `API_REGISTRY.md`'s own draft status pending backend architecture.
- First feature to move through the full template — confirms the template structure holds for a real feature without needing changes.

## Commit 5 — Design Foundation

- Added all 9 planned `docs/02_DESIGN` documents: `DESIGN_PHILOSOPHY.md`, `DESIGN_SYSTEM_RULES.md`, `LAYOUT_SYSTEM.md`, `RESPONSIVE_SYSTEM.md` (draft), `COMPONENT_LIBRARY.md`, `ACCESSIBILITY.md`, `TYPOGRAPHY.md`, `MOTION.md` (draft), `UX_PATTERNS.md`.
- Grounded in the actual built code (`apps/showcase/src/index.css` tokens, `packages/ui`/`packages/mobile` components) rather than re-describing the Figma design from scratch.
- `RESPONSIVE_SYSTEM.md` and `MOTION.md` are intentionally `draft` — the product has no designed tablet/desktop breakpoint system and no real motion token system yet; both documents say so directly rather than inventing one.
- `UX_PATTERNS.md`'s empty-state pattern directly addresses the literal `<Pooja Name>`/`<Merchandise>` placeholder text found during the original design review — future implementations must use `MobileEmptyState` instead.
- This completes Milestones 1–5 (Bootstrap, Product, Architecture, AI, Design). Milestone 6+ (one feature at a time, starting with Authentication) is next.

## Commit 4 — AI Foundation

- Added all 9 planned `docs/05_AI` documents: `AI_GLOBAL_RULES.md`, `AI_DESIGN_AGENT.md`, `AI_FRONTEND_AGENT.md`, `AI_BACKEND_AGENT.md`, `AI_DOCUMENTATION_AGENT.md`, `AI_TESTING_AGENT.md`, `AI_REVIEW_AGENT.md`, `AI_SECURITY_AGENT.md`, `PROMPT_LIBRARY.md`.
- `AI_GLOBAL_RULES.md` elaborates (does not duplicate) the root `AI_INSTRUCTIONS.md` read-order/never-invent rules with rationale; every per-agent document narrows it without contradicting it.
- `AI_DOCUMENTATION_AGENT.md` formalizes, as explicit rules, the process actually followed while building this repository (frontmatter schema, index/graph/changelog updated together, absorb-fully-then-delete for seed content, flag-don't-silently-resolve conflicts).
- Absorbed and removed the last 3 files in `Viratdhara_AI_Docs_Starter/` (`AI_GLOBAL_RULES.md`, `AI_INSTRUCTIONS.md`, `HANDOFF_TO_CLAUDE.md`). The starter folder is now fully absorbed and removed.

## Commit 3 — Architecture Foundation

- Added all 15 planned `docs/01_ARCHITECTURE` documents: `INFORMATION_ARCHITECTURE.md`, `DOMAIN_MODEL.md`, `CONTENT_ARCHITECTURE.md`, `NAVIGATION_MODEL.md`, `URL_STRUCTURE.md`, `FEATURE_REGISTRY.md`, `PERMISSION_MATRIX.md`, `DEPENDENCY_GRAPH.md`, `ENTITY_REGISTRY.md`, `COMPONENT_REGISTRY.md`, `EVENT_REGISTRY.md`, `STATE_REGISTRY.md`, `API_REGISTRY.md` (draft), `ERROR_REGISTRY.md` (draft), `VALIDATION_REGISTRY.md`.
- `FEATURE_REGISTRY.md` formalizes the 11 V1 features from `PRODUCT_CONTEXT.md`; booking/commerce excluded per Commit 2.1.
- `NAVIGATION_MODEL.md` fixes the nav-shell inconsistency found during the original design review (booking screens had no bottom nav; music screens did) — one shared model, both now moot since booking is descoped, but the model is the one all Main App screens use going forward.
- `COMPONENT_REGISTRY.md` is populated directly from the actual code in `packages/ui`, `packages/mobile`, `packages/blocks` — not invented. Flags that `TempleLiveCard`, `PanditCard`, `ProductCard`, `BookingSummaryCard` are future-scoped components sitting in code ahead of their feature being promoted, and that `apps/showcase`'s demo content should eventually be swapped to V1-appropriate examples.
- `API_REGISTRY.md` / `ERROR_REGISTRY.md` are intentionally `draft` — no backend architecture exists yet to finalize a contract against.
- Absorbed and removed `Viratdhara_AI_Docs_Starter/DOMAIN_MODEL.md`, `INFORMATION_ARCHITECTURE.md`, `CONTENT_ARCHITECTURE.md`, `PRODUCT_CONTEXT.md`, `PROJECT_INDEX.md`, `README.md` — all fully superseded. Only `AI_GLOBAL_RULES.md`, `AI_INSTRUCTIONS.md`, `HANDOFF_TO_CLAUDE.md` remain in the starter folder, pending Milestone 4.

## Commit 2.1 — V1 Scope Conflict Resolved

- Decision: temple/pandit booking and merchandise commerce are **not** V1. They are future/long-term scope, per `PRODUCT_VISION.md`.
- Confirmed the reviewed Figma design's booking/commerce screens (75 screens total, same content previously reviewed as a combined PDF export) map to the **Temples**, **Donations**, and a newly added **Merchandise / Spiritual Commerce** module under Long-Term Product Direction.
- `docs/03_FEATURES` must not gain a booking or commerce feature folder until one of these modules is promoted to `FEATURE_REGISTRY.md`.
- Closes the conflict flagged in Commit 2.

## Commit 2 — Product Foundation

- Added `docs/00_PRODUCT/PRODUCT_CONTEXT.md`, `PRODUCT_VISION.md`, `PRODUCT_PHILOSOPHY.md`, `SUCCESS_METRICS.md`, `GLOSSARY.md`.
- Source: the user-authored `PROJECT_CONTEXT.md` (root), split across these five single-responsibility documents per the "one document, one concept" rule, rather than kept as one large file.
- `docs/00_PRODUCT/README.md` and `PROJECT_INDEX.md` updated from `planned` to `active` for all five documents.
- `DOCUMENT_GRAPH.md` updated with real edges replacing the `(planned)` placeholder nodes for this category.
- Flagged, not resolved: the user's stated V1 scope excludes temple/pandit booking and merchandise (listed only under long-term direction in `PRODUCT_VISION.md`), while the reviewed Figma design is built substantially around those flows. Documentation is authoritative per `AI_INSTRUCTIONS.md`; this conflict needs an explicit decision before `03_FEATURES` content is written.
- `SUCCESS_METRICS.md` intentionally contains no quantitative KPIs — none were supplied, and none were invented.

## Commit 1 — Repository Bootstrap

- Added `README.md`, `AI_INSTRUCTIONS.md`, `CLAUDE.md`, `CURSOR.md`, `PROJECT_INDEX.md`, `DOCUMENT_GRAPH.md`, `CHANGELOG.md`.
- Added `docs/00_PRODUCT` through `docs/08_TESTING` and `docs/99_REFERENCE`, each with a scoped `README.md` listing its planned documents.
- Added `.ai/` with `README.md` and `schema/document-frontmatter.schema.json`.
- Added `templates/` with `DOCUMENT_TEMPLATE.md` and `FEATURE_TEMPLATE/` (13 files).
- No product, architecture, design, feature, or AI content documents exist yet — this commit is skeleton only.
