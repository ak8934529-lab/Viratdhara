---
document_id: SEARCH_TEST_CASES
title: Search — Test Cases
version: 1.1.0
status: active
priority: medium
depends_on:
  - SEARCH_SPEC
  - SEARCH_EDGE_CASES
related_documents: []
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Search — Test Cases

## Why

Each case traces to `SPEC.md`, `STATES.md`, or `EDGE_CASES.md`.

## What

Test cases for this feature.

## Test Cases

| # | Case | Traces To | Expected |
| --- | --- | --- | --- |
| 1 | Query matching a published Content's title | `SPEC.md` | Item appears in results, `content_searched` fires |
| 2 | Query matching only a non-published Content's title | `SPEC.md`, `EDGE_CASES.md` | Zero results returned |
| 3 | Empty query submission | `VALIDATIONS.md` | No request fires, state stays `idle` |
| 4 | Query with zero matches | `EDGE_CASES.md` | `no_results` state, `MobileEmptyState` shown |
| 5 | Search request fails (network/server error) | `STATES.md` | `error` state shown, distinct from `no_results` |
| 6 | Query longer than 200 characters | `VALIDATIONS.md` `query_max_length` | Truncated to 200 chars before submission |
| 7 | Query containing emoji/symbols | `EDGE_CASES.md` | Treated as literal text, no special error |

## Dependencies

- `SEARCH_SPEC.md`, `SEARCH_EDGE_CASES.md`

## Relationships

None beyond the above.

## Constraints

None beyond tracing every case to a rule.

## Acceptance

All 7 cases pass.

## Future Scope

None currently open for this feature.
