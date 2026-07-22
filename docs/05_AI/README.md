---
document_id: DOCS_05_AI
title: AI Documentation
version: 1.0.0
status: planned
priority: critical
depends_on:
  - DOCS_00_PRODUCT
  - DOCS_01_ARCHITECTURE
related_documents:
  - PROJECT_INDEX.md
  - AI_INSTRUCTIONS.md
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# 05_AI

Rules for AI agents contributing to Viratdhara. `AI_GLOBAL_RULES.md` applies to every agent; the per-agent documents narrow scope for a specific responsibility and never contradict `AI_GLOBAL_RULES.md`.

## Documents

| Document | Status |
| --- | --- |
| `AI_GLOBAL_RULES.md` | planned |
| `AI_DESIGN_AGENT.md` | planned |
| `AI_FRONTEND_AGENT.md` | planned |
| `AI_BACKEND_AGENT.md` | planned |
| `AI_DOCUMENTATION_AGENT.md` | planned |
| `AI_TESTING_AGENT.md` | planned |
| `AI_REVIEW_AGENT.md` | planned |
| `AI_SECURITY_AGENT.md` | planned |
| `PROMPT_LIBRARY.md` | planned |

## Rules

- `AI_GLOBAL_RULES.md` is read before any per-agent document.
- A per-agent document may narrow global rules for its domain; it may not override them.

## Contributor Roles

Preserved here from the source product-context document pending full write-up in `AI_GLOBAL_RULES.md` (Milestone 4):

| Contributor | Role | Responsible for |
| --- | --- | --- |
| ChatGPT | Chief Product Architect | Business, architecture, product strategy, documentation strategy, knowledge design |
| Claude Code | Repository Builder | Documentation, repository maintenance, cross-referencing, technical writing, documentation consistency |
| Cursor | Implementation | Frontend, backend, refactoring, code generation, testing |
