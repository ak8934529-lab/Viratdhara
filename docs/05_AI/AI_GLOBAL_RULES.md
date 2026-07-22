---
document_id: AI_GLOBAL_RULES
title: AI Global Rules
version: 1.0.0
status: active
priority: critical
depends_on:
  - PRODUCT_CONTEXT
related_documents:
  - AI_INSTRUCTIONS.md
  - GLOSSARY.md
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# AI Global Rules

## Why

The root `AI_INSTRUCTIONS.md` tells an agent what order to read documents in. It does not fully elaborate *why* each rule exists or what counts as a violation. This document is that elaboration — the standing rulebook every per-agent document (`AI_DESIGN_AGENT.md`, `AI_FRONTEND_AGENT.md`, etc.) narrows but never overrides.

## What

The rules that apply to every AI agent working on Viratdhara, regardless of task.

## Rules

### Documentation is the source of truth

If code and documentation disagree, documentation wins — implementation must be changed to match, or documentation must be explicitly updated first, never silently overridden by code. See `AI_INSTRUCTIONS.md` Conflict Resolution.

### Never invent

An agent may not invent: entities, APIs, routes, components, business rules, permissions, database fields, or events. Every one of these has a registry (`01_ARCHITECTURE`) or a feature document. If the thing an agent needs doesn't exist in a registry, the agent adds it to the registry first — it does not use it informally and document it later.

### Reuse before creating

Before adding a new component, check `COMPONENT_REGISTRY.md`. Before adding a new entity, check `ENTITY_REGISTRY.md`. Before adding a new event, check `EVENT_REGISTRY.md`. This applies symmetrically across every registry in `01_ARCHITECTURE`.

### Ask when documentation is missing

A missing document, an unresolved conflict (like the V1-scope-vs-Figma-design conflict resolved in `CHANGELOG.md` Commit 2.1), or an ambiguous rule are all reasons to stop and ask — not reasons to guess plausibly and proceed. Never assume; recorded product decisions (like `SUCCESS_METRICS.md`'s deliberate absence of invented KPIs) exist precisely so agents don't fill gaps with plausible-sounding fabrication.

### One document, one concept

No agent authors a document that mixes concerns (e.g. a feature's UI and its database schema in one file). Use `templates/DOCUMENT_TEMPLATE.md` or `templates/FEATURE_TEMPLATE/` as the starting point for anything new.

### Never duplicate

If a rule, entity, permission, or navigation definition already exists in a registry or foundation document, reference it. Do not restate it, even in summarized form, in a new document.

## Dependencies

- `PRODUCT_CONTEXT.md`

## Relationships

- Every document under `05_AI` (`AI_DESIGN_AGENT.md` through `AI_SECURITY_AGENT.md`) narrows these rules for a specific responsibility; none may contradict them.
- `PROMPT_LIBRARY.md` operationalizes these rules as reusable prompt text.

## Constraints

- A per-agent document may add responsibility-specific detail. It may never state a rule that conflicts with this document.

## Acceptance

An agent's output (a document, a component, a commit) can be checked against these six rules before being considered complete.

## Future Scope

None — this is a standing rule set, not a roadmap.
