---
document_id: FEATURE_REGISTRY
title: Feature Registry
version: 1.1.0
status: active
priority: critical
depends_on:
  - PRODUCT_CONTEXT
  - INFORMATION_ARCHITECTURE
related_documents:
  - docs/03_FEATURES/README.md
  - PRODUCT_VISION.md
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Feature Registry

## Why

`docs/03_FEATURES/README.md` lists feature names; this document is the authoritative record of each feature's status, structural area, and dependencies — the thing `docs/03_FEATURES/README.md` and every feature's own `README.md` must stay consistent with.

## What

Every V1 feature, its structural area, and its knowledge-base status.

## Rules

- A feature is V1 only if listed here with `scope: V1`. Nothing else is V1, regardless of what exists in the Figma design file.
- A feature's knowledge base under `docs/03_FEATURES/<Feature>/` may only be started once it has a row here.

## Registry

| Feature | Scope | Structural Area | Depends On | KB Status |
| --- | --- | --- | --- | --- |
| Authentication | V1 | Auth Area | — | documented (2 open gaps: `password_minimum`, "Booking" onboarding option) |
| Content Discovery | V1 | Main App | Content Architecture, Recommendation Engine, Content Categorization | not started |
| Search | V1 | Main App | Content Architecture | not started |
| Recommendation Engine | V1 | Main App | Content Architecture, Authentication | not started |
| Video Player | V1 | Main App | Content Architecture | not started |
| Content Categorization | V1 | Main App | Content Architecture | not started |
| Sharing | V1 | Main App | Content Architecture | not started |
| Creator Studio | V1 | Creator Studio | Authentication, Content Architecture | not started |
| Creator Profile | V1 | Creator Studio + Main App (public view) | Authentication | not started |
| User Settings | V1 | Main App | Authentication | not started |
| Advertisements | V1 | Main App (cross-cutting placement) | — | not started |

## Dependencies

- `PRODUCT_CONTEXT.md` — the source list this registry formalizes.
- `INFORMATION_ARCHITECTURE.md` — structural area values used above.

## Relationships

- `docs/03_FEATURES/README.md` must list exactly these 11 features and no others as V1.
- `DEPENDENCY_GRAPH.md` expands the "Depends On" column above into a full functional graph.

## Constraints

- No feature row may be added without a corresponding decision recorded (as Commit 2.1 recorded the booking/commerce exclusion in `PRODUCT_VISION.md`).
- "KB Status" must be updated in the same commit that starts or completes a feature's documentation.

## Acceptance

`docs/03_FEATURES/README.md`'s feature list and this table's feature list are identical, always.

## Future Scope

Temples, Donations, Merchandise / Spiritual Commerce, and the other `PRODUCT_VISION.md` long-term modules gain a row here only when promoted out of long-term vision.
