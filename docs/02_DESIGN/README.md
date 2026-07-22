---
document_id: DOCS_02_DESIGN
title: Design Documentation
version: 1.2.0
status: active
priority: high
depends_on:
  - DOCS_00_PRODUCT
  - DOCS_01_ARCHITECTURE
related_documents:
  - PROJECT_INDEX.md
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# 02_DESIGN

Design system rules. Describes constraints and rationale, not implementation. The implementation is `packages/ui`, `packages/mobile`, and `packages/blocks`.

## Documents

| Document | Status |
| --- | --- |
| `DESIGN_PHILOSOPHY.md` | active |
| `DESIGN_SYSTEM_RULES.md` | active |
| `LAYOUT_SYSTEM.md` | active |
| `RESPONSIVE_SYSTEM.md` | active (real breakpoint system for apps/web as of Milestone 7; packages/mobile stays letterboxed) |
| `SURFACE_SYSTEM.md` | active (glass/depth treatment for apps/web) |
| `COMPONENT_LIBRARY.md` | active |
| `ACCESSIBILITY.md` | active |
| `TYPOGRAPHY.md` | active |
| `MOTION.md` | draft (minimal motion implemented, no motion token system yet) |
| `UX_PATTERNS.md` | active |

## Rules

- `COMPONENT_LIBRARY.md` catalogs components; it does not redefine them. The component's own file in `packages/*` is the implementation source of truth.
- Every component listed here must also exist in `ENTITY_REGISTRY.md` / `COMPONENT_REGISTRY.md` under `01_ARCHITECTURE`.
