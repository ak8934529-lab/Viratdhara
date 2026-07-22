---
document_id: DOCS_02_DESIGN
title: Design Documentation
version: 1.0.0
status: planned
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
| `DESIGN_PHILOSOPHY.md` | planned |
| `DESIGN_SYSTEM_RULES.md` | planned |
| `LAYOUT_SYSTEM.md` | planned |
| `RESPONSIVE_SYSTEM.md` | planned |
| `COMPONENT_LIBRARY.md` | planned |
| `ACCESSIBILITY.md` | planned |
| `TYPOGRAPHY.md` | planned |
| `MOTION.md` | planned |
| `UX_PATTERNS.md` | planned |

## Rules

- `COMPONENT_LIBRARY.md` catalogs components; it does not redefine them. The component's own file in `packages/*` is the implementation source of truth.
- Every component listed here must also exist in `ENTITY_REGISTRY.md` / `COMPONENT_REGISTRY.md` under `01_ARCHITECTURE`.
