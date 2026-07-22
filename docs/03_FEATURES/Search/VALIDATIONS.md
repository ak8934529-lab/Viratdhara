---
document_id: SEARCH_VALIDATIONS
title: Search — Validations
version: 1.1.0
status: active
priority: low
depends_on:
  - SEARCH_SPEC
  - VALIDATION_REGISTRY
related_documents:
  - VALIDATION_REGISTRY.md
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Search — Validations

## Why

An empty or whitespace-only query is the one input condition worth a named rule.

## What

Validation rules for the search query input.

## Rules

| Rule | Condition | Failure Handling |
| --- | --- | --- |
| `query_non_empty` (feature-owned) | Query must contain at least one non-whitespace character. | Submission is a no-op (no request fires) rather than a `VALIDATION_FAILED` error — this is a UI-level guard, not a server round-trip failure. |
| `query_max_length` (feature-owned, resolved Commit 18) | Query is truncated to 200 characters client-side before submission. | No error — truncation is silent and automatic. |

## Dependencies

- `SEARCH_SPEC.md`, `VALIDATION_REGISTRY.md`

## Relationships

- `VALIDATION_REGISTRY.md` — no shared rule applies here; this one is feature-local since nothing else needs it (yet).

## Constraints

- No minimum query length beyond "non-empty" is imposed without a stated reason.

## Acceptance

Submitting an empty/whitespace query never triggers a search request or an error state.

## Future Scope

If a second feature needs `query_non_empty`, it's promoted to `VALIDATION_REGISTRY.md`, not duplicated.
