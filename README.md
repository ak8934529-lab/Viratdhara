---
document_id: README
title: Viratdhara Repository
version: 1.0.0
status: active
priority: critical
depends_on: []
related_documents:
  - AI_INSTRUCTIONS.md
  - PROJECT_INDEX.md
  - DOCUMENT_GRAPH.md
  - CLAUDE.md
  - CURSOR.md
  - CHANGELOG.md
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Viratdhara

This repository contains two things:

1. **Code** — the Viratdhara design system and apps (`apps/`, `packages/`).
2. **Product Brain** — an AI-native knowledge base (`docs/`, `.ai/`, `templates/`) that is the single source of truth for product, architecture, design, feature, backend, AI, analytics, security, and testing decisions.

## For AI Agents

Read `AI_INSTRUCTIONS.md` before doing anything. It is the mandatory entry point for every AI agent (Claude Code, Cursor, GPT, Codex, Gemini, Copilot) working in this repository.

- `PROJECT_INDEX.md` — index of every document in the repository.
- `DOCUMENT_GRAPH.md` — dependency and relationship graph between documents.
- `CLAUDE.md` — Claude Code specific instructions.
- `CURSOR.md` — Cursor specific instructions.
- `CHANGELOG.md` — one entry per milestone/commit.

## Code

| Path | Description |
| --- | --- |
| `apps/showcase` | Component gallery + recreated screens for the design system |
| `packages/ui` | Foundational primitives (button, card, input, avatar, switch, badge, separator) |
| `packages/mobile` | Mobile chrome/shell components (top bar, bottom nav, FAB, etc.) |
| `packages/blocks` | Viratdhara-domain composed components |
| `packages/utils` | Shared `cn()` helper |
| `packages/constants` | Shared constants |

Run `pnpm install`, then `pnpm --filter showcase dev`.

## Product Brain

| Path | Description |
| --- | --- |
| `docs/00_PRODUCT` | Product context, vision, philosophy, success metrics, glossary |
| `docs/01_ARCHITECTURE` | Information architecture, domain model, registries |
| `docs/02_DESIGN` | Design system rules, layout, responsive, accessibility, motion |
| `docs/03_FEATURES` | One self-contained knowledge base per feature |
| `docs/04_BACKEND` | Backend architecture and services |
| `docs/05_AI` | AI agent rules, per-agent instructions, prompt library |
| `docs/06_ANALYTICS` | Analytics and metrics definitions |
| `docs/07_SECURITY` | Security rules and constraints |
| `docs/08_TESTING` | Testing strategy and standards |
| `docs/99_REFERENCE` | Reference material that doesn't fit another category |
| `.ai` | Machine-readable schemas and registries |
| `templates` | Canonical templates for new documents and new feature folders |

## Rules

- Never duplicate a business rule, entity, navigation definition, or permission. Reference the existing document instead.
- Every document begins with the frontmatter schema defined in `templates/DOCUMENT_TEMPLATE.md`.
- The knowledge base is built one milestone per commit. See `CHANGELOG.md` for progress.
