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
