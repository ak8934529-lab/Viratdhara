---
document_id: RECOMMENDATIONENGINE_API
title: Recommendation Engine — API
version: 1.0.0
status: draft
priority: medium
depends_on:
  - RECOMMENDATIONENGINE_SPEC
  - API_REGISTRY
related_documents:
  - API_REGISTRY.md
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Recommendation Engine — API

## Why

This feature owns the `Recommendations` API group (`API_REGISTRY.md`).

## What

Operations this group must support.

## Rules

- This document inherits `API_REGISTRY.md`'s `draft` status.

## Operations (planned)

| Operation | Purpose |
| --- | --- |
| Get Recommendations for Account | Return a ranked/selected list of `Recommendation` records for the current session |
| Report Recommendation served | Record `recommendation_served` |
| Report Recommendation clicked | Record `recommendation_clicked` |

## Dependencies

- `RECOMMENDATIONENGINE_SPEC.md`, `API_REGISTRY.md`

## Relationships

- `ERROR_REGISTRY.md`

## Constraints

- No ranking-algorithm parameter/detail is exposed in this contract — the algorithm itself is server-side and unspecified (`SPEC.md`).

## Acceptance

Once finalized, maps to the `Recommendations` group.

## Future Scope

Ranking algorithm is the primary open item, independent of this API contract.
