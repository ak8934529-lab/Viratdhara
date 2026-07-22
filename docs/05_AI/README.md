---
document_id: DOCS_05_AI
title: AI Documentation
version: 1.1.0
status: active
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
| `AI_GLOBAL_RULES.md` | active |
| `AI_DESIGN_AGENT.md` | active |
| `AI_FRONTEND_AGENT.md` | active |
| `AI_BACKEND_AGENT.md` | active |
| `AI_DOCUMENTATION_AGENT.md` | active |
| `AI_TESTING_AGENT.md` | active |
| `AI_REVIEW_AGENT.md` | active |
| `AI_SECURITY_AGENT.md` | active |
| `PROMPT_LIBRARY.md` | active |

## Rules

- `AI_GLOBAL_RULES.md` is read before any per-agent document.
- A per-agent document may narrow global rules for its domain; it may not override them.

## Contributor Roles

Preserved here from the source product-context document. This is an org-chart concern (who does what), distinct from the behavioral rules in `AI_GLOBAL_RULES.md`, so it stays here rather than being merged into that document.

| Contributor | Role | Responsible for |
| --- | --- | --- |
| ChatGPT | Chief Product Architect | Business, architecture, product strategy, documentation strategy, knowledge design |
| Claude Code | Repository Builder | Documentation, repository maintenance, cross-referencing, technical writing, documentation consistency |
| Cursor | Implementation | Frontend, backend, refactoring, code generation, testing |
