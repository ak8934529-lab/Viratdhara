---
document_id: RECOMMENDATIONENGINE_TEST_CASES
title: Recommendation Engine — Test Cases
version: 1.1.0
status: active
priority: medium
depends_on:
  - RECOMMENDATIONENGINE_SPEC
  - RECOMMENDATIONENGINE_EDGE_CASES
related_documents: []
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Recommendation Engine — Test Cases

## Why

Each case traces to `SPEC.md` or `EDGE_CASES.md`. Cases now cover the placeholder heuristic's actual behavior, not just the contract.

## What

Test cases for this feature.

## Test Cases

| # | Case | Traces To | Expected |
| --- | --- | --- | --- |
| 1 | Recommendation served to an Account | `SPEC.md` | References only `published` Content, `recommendation_served` fires |
| 2 | Account clicks a served Recommendation | `SPEC.md` | `recommendation_clicked` fires |
| 3 | Recommendation for non-published Content is never served | `SPEC.md` Constraints | No such Recommendation is ever returned |
| 4 | Account with view history in Category X | `EDGE_CASES.md` heuristic step 1 | Recommendations favor recently-published Content in Category X |
| 5 | New Account with no history (cold start) | `EDGE_CASES.md` heuristic step 2 | Recommendations fall back to most-recently-published Content across all Categories |
| 6 | Account with history, but insufficient matching Content volume | `EDGE_CASES.md` Insufficient volume | Falls back to the same global-recency behavior as case 5 |

## Dependencies

- `RECOMMENDATIONENGINE_SPEC.md`, `RECOMMENDATIONENGINE_EDGE_CASES.md`

## Relationships

None beyond the above.

## Constraints

- These cases test the placeholder heuristic's deterministic behavior, not "recommendation quality" — quality/relevance evaluation is meaningless until a real algorithm replaces it.

## Acceptance

All 6 cases pass.

## Future Scope

Real ranking-quality/relevance test cases once a real algorithm replaces the placeholder.
