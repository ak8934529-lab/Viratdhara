---
document_id: SEARCH_STATES
title: Search — States
version: 1.0.0
status: active
priority: medium
depends_on:
  - SEARCH_SPEC
related_documents:
  - STATE_REGISTRY.md
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Search — States

## Why

The results screen has visibly distinct states (nothing entered yet, mid-query, results, no-results, failure) that need one name each so implementation and copy (empty-state text, error text) stay consistent.

## What

A feature-local state machine, not shared cross-feature — not a `STATE_REGISTRY.md` entry, per that registry's scope being cross-feature machines only (Content Lifecycle, Playback, Auth Session).

## Rules

```
idle ──(query submitted)──> searching
searching ──(results found)──> results
searching ──(zero matches)──> no_results
searching ──(request fails)──> error
results/no_results/error ──(new query submitted)──> searching
```

## Dependencies

- `SEARCH_SPEC.md`

## Relationships

- `STATE_REGISTRY.md` — referenced for the pattern/format only; this machine is not added there since it's feature-local.

## Constraints

- `no_results` and `error` are visually distinct states (`UX_PATTERNS.md` empty state vs. an error message) — never collapsed into one generic "nothing to show" treatment.

## Acceptance

Every state above has a distinct, designed UI treatment before this feature is considered complete.

## Future Scope

None.
