---
document_id: CLAUDE
title: Claude Code Instructions
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

# Claude Code Instructions

`AI_INSTRUCTIONS.md` is canonical. Read it first. This document adds only Claude-Code-specific operational notes. It does not redefine any rule already stated there.

## Repository Shape

This repo has two halves:

- **Code**: `apps/`, `packages/` — pnpm workspace + Turborepo.
- **Product Brain**: `docs/`, `.ai/`, `templates/` — governed by `AI_INSTRUCTIONS.md`.

Before writing or editing anything under `docs/`, `.ai/`, or `templates/`, resolve required reading per `AI_INSTRUCTIONS.md` step 1–6.

## Code Commands

```bash
pnpm install
pnpm build              # turbo build, all packages/apps
pnpm lint                # turbo lint, all packages/apps
pnpm --filter showcase dev
```

## Task Tracking

Use `TaskCreate` / `TaskUpdate` for multi-step documentation or feature work. One task per milestone/commit, matching the commit plan in `CHANGELOG.md`.

## Commit Discipline

- One logical milestone per commit.
- Never generate more than the current milestone's scope in a single commit.
- Update `PROJECT_INDEX.md`, `DOCUMENT_GRAPH.md`, and `CHANGELOG.md` in the same commit as any new document.
