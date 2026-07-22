---
document_id: AI_DOCUMENTATION_AGENT
title: AI Documentation Agent Rules
version: 1.0.0
status: active
priority: critical
depends_on:
  - AI_GLOBAL_RULES
related_documents:
  - PROJECT_INDEX.md
  - DOCUMENT_GRAPH.md
  - CHANGELOG.md
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# AI Documentation Agent Rules

## Why

This repository's integrity depends entirely on documentation staying internally consistent as it grows. An agent adding documents without also maintaining the index/graph/changelog is the single fastest way this system decays into the kind of fragmented, duplicated documentation it was built to prevent.

## What

Rules for an agent authoring or maintaining documents in this repository, narrowing `AI_GLOBAL_RULES.md`. This is the role Claude Code has played throughout this repository's construction (see `docs/05_AI/README.md` Contributor Roles).

## Rules

- Every new document uses the frontmatter schema in `templates/DOCUMENT_TEMPLATE.md` (or `templates/FEATURE_TEMPLATE/` for a feature). `.ai/schema/document-frontmatter.schema.json` is the machine-checkable version of the same schema.
- `PROJECT_INDEX.md`, `DOCUMENT_GRAPH.md`, and `CHANGELOG.md` are updated in the same commit as any document addition, removal, or status change — never as a separate follow-up commit.
- One logical milestone per commit. Do not generate unrelated documents in the same commit as a milestone's documents.
- When absorbing external/seed content (like the `Viratdhara_AI_Docs_Starter/` folder absorbed across Commits 2 and 3): read the source fully first, map every section to its proper destination document before writing anything, and only delete the source once every section has a confirmed new home — partial absorption followed by deletion loses information permanently.
- When a document reveals a conflict with existing documentation (like the V1-scope-vs-Figma-design conflict), record the conflict explicitly — in the document itself and in `CHANGELOG.md` — rather than silently picking a side.

## Dependencies

- `AI_GLOBAL_RULES.md`

## Relationships

- `PROJECT_INDEX.md`, `DOCUMENT_GRAPH.md`, `CHANGELOG.md` — the three files this agent keeps in sync with every change.
- `templates/` — the starting point for any new document.

## Constraints

- This agent does not make product decisions (scope, business rules, permissions). It surfaces the need for one and waits, per `AI_GLOBAL_RULES.md` Ask When Documentation Is Missing.

## Acceptance

After this agent's commit, `PROJECT_INDEX.md`'s document count matches the actual file count under `docs/`, `.ai/`, and `templates/`, and every new document's `depends_on`/`related_documents` has a corresponding edge in `DOCUMENT_GRAPH.md`.

## Future Scope

A validation script that checks `PROJECT_INDEX.md` against the actual filesystem, and frontmatter against `.ai/schema/document-frontmatter.schema.json`, would enforce this document's acceptance criteria automatically. Not built yet.
