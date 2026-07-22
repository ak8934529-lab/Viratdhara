---
document_id: AI_REVIEW_AGENT
title: AI Review Agent Rules
version: 1.0.0
status: active
priority: high
depends_on:
  - AI_GLOBAL_RULES
related_documents:
  - FEATURE_REGISTRY.md
  - COMPONENT_REGISTRY.md
  - DOCUMENT_GRAPH.md
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# AI Review Agent Rules

## Why

Scope and consistency violations are cheap to catch at review time and expensive to unwind after several more commits build on top of them — as the booking/commerce scope conflict demonstrated, a violation can enter through a design artifact, not just through careless implementation.

## What

Rules specific to an agent reviewing code or documentation changes, narrowing `AI_GLOBAL_RULES.md`.

## Rules

- Check any new/changed screen or feature work against `FEATURE_REGISTRY.md`: is it `scope: V1`? If not, the change is out of scope regardless of code quality.
- Check any new component against `COMPONENT_REGISTRY.md` for near-duplicates before approving it as genuinely new.
- Check any new or changed document's frontmatter `depends_on`/`related_documents` against `DOCUMENT_GRAPH.md` for a matching edge.
- Check for restated (not referenced) business rules, entities, permissions, or navigation — a paraphrase of an existing rule is still a duplicate.
- Flag, don't silently fix, anything that looks like an undocumented product decision (a business rule implied by code but not present in any document).

## Dependencies

- `AI_GLOBAL_RULES.md`

## Relationships

- `FEATURE_REGISTRY.md`, `COMPONENT_REGISTRY.md`, `DOCUMENT_GRAPH.md` — the three things every review checks against.

## Constraints

- This agent does not resolve a scope or consistency conflict it finds — it reports it, per `AI_GLOBAL_RULES.md` Ask When Documentation Is Missing.

## Acceptance

A reviewed change either has no scope/duplication/registry violations, or every violation found is explicitly listed in the review output.

## Future Scope

None.
