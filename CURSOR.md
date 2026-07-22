---
document_id: CURSOR
title: Cursor Instructions
version: 1.0.0
status: active
priority: critical
depends_on:
  - AI_INSTRUCTIONS.md
related_documents:
  - AI_INSTRUCTIONS.md
  - PROJECT_INDEX.md
  - DOCUMENT_GRAPH.md
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Cursor Instructions

`AI_INSTRUCTIONS.md` is canonical. Read it first. This document adds only Cursor-specific operational notes. It does not redefine any rule already stated there.

## Repository Shape

This repo has two halves:

- **Code**: `apps/`, `packages/` — pnpm workspace + Turborepo.
- **Product Brain**: `docs/`, `.ai/`, `templates/` — governed by `AI_INSTRUCTIONS.md`.

## Code Commands

```bash
pnpm install
pnpm build
pnpm lint
pnpm --filter showcase dev
```

## Commit Discipline

- One logical milestone per commit.
- Update `PROJECT_INDEX.md`, `DOCUMENT_GRAPH.md`, and `CHANGELOG.md` in the same commit as any new document.
