---
document_id: TEMPLATES
title: Templates
version: 1.0.0
status: active
priority: high
depends_on:
  - AI_INSTRUCTIONS.md
related_documents:
  - PROJECT_INDEX.md
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Templates

## Contents

| Path | Use |
| --- | --- |
| `DOCUMENT_TEMPLATE.md` | Base template for any standalone document under `docs/`. |
| `FEATURE_TEMPLATE/` | Base template for a new feature knowledge base under `docs/03_FEATURES/`. Copy the whole folder, replace `<Feature>` / `<FEATURE>` in every file, do not omit any file. |

## Rules

- Every new document starts from `DOCUMENT_TEMPLATE.md`. Every new feature starts from `FEATURE_TEMPLATE/`, copied in full.
- Templates are never filled in place. Copy first, then edit the copy.
