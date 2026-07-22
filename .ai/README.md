---
document_id: AI_LAYER
title: Machine-Readable Layer
version: 1.0.0
status: active
priority: high
depends_on:
  - AI_INSTRUCTIONS.md
related_documents:
  - PROJECT_INDEX.md
  - DOCUMENT_GRAPH.md
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# .ai

Machine-readable schemas and, eventually, generated registries. This is not read-order documentation — it is validation and tooling support for the human/AI-readable documents under `docs/`.

## Contents

| Path | Description |
| --- | --- |
| `schema/document-frontmatter.schema.json` | JSON Schema for the frontmatter block required on every markdown document. |

## Rules

- Files here are derived from or validate `docs/`; they never introduce a rule that does not already exist in a markdown document.
