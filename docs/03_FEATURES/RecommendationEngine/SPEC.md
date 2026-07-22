---
document_id: RECOMMENDATIONENGINE_SPEC
title: Recommendation Engine — Specification
version: 1.0.0
status: active
priority: high
depends_on:
  - RECOMMENDATIONENGINE_README
related_documents:
  - DOMAIN_MODEL.md
related_entities:
  - Recommendation
related_components: []
related_events:
  - recommendation_served
  - recommendation_clicked
owner: Product Architecture
---

# Recommendation Engine — Specification

## Why

`DOMAIN_MODEL.md` defines the `Recommendation` entity's shape; this document specifies its generation/serving contract.

## What

Generating and serving personalized `Recommendation` records.

## Rules

- A `Recommendation` belongs to exactly one Account and references exactly one `published` Content item (`DOMAIN_MODEL.md`, `STATE_REGISTRY.md`).
- Recommendations are consumed by Content Discovery, not rendered by this feature directly (`README.md`).
- Serving a Recommendation to an Account (i.e. it becomes visible in Content Discovery's feed) emits `recommendation_served`; the Account acting on it emits `recommendation_clicked`.
- The ranking/selection logic producing which Content becomes a Recommendation for a given Account is **not specified** — this document defines the entity contract and events only.

## Dependencies

- `RECOMMENDATIONENGINE_README.md`, `DOMAIN_MODEL.md`

## Relationships

- `Content Discovery` — the consumer of this feature's output.

## Constraints

- No `Recommendation` ever references non-`published` Content.
- No specific algorithm is assumed or implemented as a placeholder "final" version — see `EDGE_CASES.md`.

## Acceptance

Recommendations served to any Account reference only `published` Content, and both events fire correctly.

## Future Scope

Ranking algorithm design is the primary open item — see `README.md` Future Scope.
