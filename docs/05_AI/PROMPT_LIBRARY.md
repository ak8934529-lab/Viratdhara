---
document_id: PROMPT_LIBRARY
title: Prompt Library
version: 1.0.0
status: active
priority: medium
depends_on:
  - AI_GLOBAL_RULES
related_documents:
  - templates/DOCUMENT_TEMPLATE.md
  - templates/FEATURE_TEMPLATE/README.md
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Prompt Library

## Why

Recurring requests to an AI agent working on this repository ("add a feature," "add a component," "resolve a scope conflict") get phrased differently every time otherwise, producing inconsistent process each time. Feature-specific prompts belong in that feature's own `PROMPTS.md`; this document holds only the generic, repository-wide ones.

## What

Canonical prompt text for recurring repository-wide tasks.

## Rules

- A prompt here is generic across features. A feature-specific prompt belongs in that feature's own `docs/03_FEATURES/<Feature>/PROMPTS.md`, referencing this library rather than duplicating it.

## Prompts

### Start a new V1 feature's knowledge base

> Copy `templates/FEATURE_TEMPLATE/` to `docs/03_FEATURES/<Feature>/`, replacing `<Feature>`/`<FEATURE>` in every file. Confirm the feature has a row in `FEATURE_REGISTRY.md` with `scope: V1` before starting — do not create the folder otherwise. Fill `README.md` and `SPEC.md` first; the remaining files may stay `draft` until their content is ready.

### Add a new component

> Check `COMPONENT_REGISTRY.md` first. If no existing component covers the need, add it to the appropriate package (`packages/ui`, `packages/mobile`, `packages/blocks`) following that package's existing file pattern, then add a row to `COMPONENT_REGISTRY.md` in the same change.

### Add a new entity

> Check `ENTITY_REGISTRY.md` first. If genuinely new, add it to `DOMAIN_MODEL.md`'s relationship model and `ENTITY_REGISTRY.md`'s table in the same change — never one without the other.

### Resolve a scope conflict

> When a design artifact, a stakeholder request, or existing code implies scope broader than `FEATURE_REGISTRY.md` states, do not silently build for the broader scope. State the conflict explicitly, propose the options, and wait for an explicit decision — then record the decision in `PRODUCT_VISION.md` or `FEATURE_REGISTRY.md` and `CHANGELOG.md`, per the Commit 2.1 precedent.

### Absorb an external/seed document into this repository

> Read the full source document before writing anything. Map every section to its correct destination document (one document, one concept — split a combined source across multiple destinations if needed). Only delete the source once every section has a confirmed new home. Record the absorption in `CHANGELOG.md`.

## Dependencies

- `AI_GLOBAL_RULES.md`

## Relationships

- `templates/DOCUMENT_TEMPLATE.md`, `templates/FEATURE_TEMPLATE/`

## Constraints

- A prompt added here must not encode a rule that contradicts `AI_GLOBAL_RULES.md` or any registry.

## Acceptance

A new contributor (human or AI) can find a ready-to-use prompt here for any of the five recurring task types above.

## Future Scope

Grows as new recurring task patterns emerge across Milestones 6+.
