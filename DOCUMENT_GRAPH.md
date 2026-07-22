---
document_id: DOCUMENT_GRAPH
title: Document Graph
version: 1.0.0
status: active
priority: critical
depends_on: []
related_documents:
  - PROJECT_INDEX.md
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Document Graph

The dependency and relationship graph between every document in this repository. Derived from each document's `depends_on` and `related_documents` frontmatter fields — this file is a projection, not a separate source of truth. If this file and a document's frontmatter disagree, the frontmatter wins; fix this file.

## Rules

- An edge `A depends_on B` means A cannot be correctly understood or implemented without B.
- An edge `A related_documents B` means A references B but does not require B to be read first.
- Cycles in `depends_on` are not allowed.
- This file is updated in the same commit as any document whose `depends_on` or `related_documents` changes.

## Current Graph

```
AI_INSTRUCTIONS
├── related: PRODUCT_CONTEXT (planned)
├── related: AI_GLOBAL_RULES (planned)
├── related: INFORMATION_ARCHITECTURE (planned)
└── related: DOMAIN_MODEL (planned)

README
└── related: AI_INSTRUCTIONS, PROJECT_INDEX, DOCUMENT_GRAPH, CLAUDE, CURSOR, CHANGELOG

CLAUDE
└── depends_on: AI_INSTRUCTIONS

CURSOR
└── depends_on: AI_INSTRUCTIONS

TEMPLATES
└── depends_on: AI_INSTRUCTIONS

DOCS_00_PRODUCT
└── (root of the dependency graph — no depends_on)

DOCS_01_ARCHITECTURE
└── depends_on: DOCS_00_PRODUCT

DOCS_02_DESIGN
└── depends_on: DOCS_00_PRODUCT, DOCS_01_ARCHITECTURE

DOCS_03_FEATURES
└── depends_on: DOCS_00_PRODUCT, DOCS_01_ARCHITECTURE, DOCS_02_DESIGN

DOCS_04_BACKEND
└── depends_on: DOCS_00_PRODUCT, DOCS_01_ARCHITECTURE

DOCS_05_AI
└── depends_on: DOCS_00_PRODUCT, DOCS_01_ARCHITECTURE

DOCS_06_ANALYTICS
└── depends_on: DOCS_00_PRODUCT

DOCS_07_SECURITY
└── depends_on: DOCS_00_PRODUCT, DOCS_01_ARCHITECTURE

DOCS_08_TESTING
└── depends_on: DOCS_00_PRODUCT, DOCS_03_FEATURES

DOCS_99_REFERENCE
└── (no dependencies)

AI_LAYER
└── depends_on: AI_INSTRUCTIONS
```

## Notes

- Documents marked `(planned)` above do not yet exist. Their node is reserved because another active document already references them.
- Feature-level graphs live in each feature's own folder once created; they are not duplicated here. This file stops at the category level for `03_FEATURES` (see `DOCS_03_FEATURES`) until individual features exist.
