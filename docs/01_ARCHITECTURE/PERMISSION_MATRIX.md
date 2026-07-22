---
document_id: PERMISSION_MATRIX
title: Permission Matrix
version: 1.0.0
status: active
priority: critical
depends_on:
  - DOMAIN_MODEL
  - FEATURE_REGISTRY
related_documents:
  - DOMAIN_MODEL.md
  - FEATURE_REGISTRY.md
related_entities:
  - Account
related_components: []
related_events: []
owner: Product Architecture
---

# Permission Matrix

## Why

"Creator manages videos, views analytics" (`PRODUCT_CONTEXT.md`) is a product-level description, not an enforceable permission rule. This document is the one place a permission check can be verified against.

## What

What each Account role may do, per V1 feature.

## Rules

- An Account may hold more than one role simultaneously (e.g. a Creator is also a User). Permissions are additive, not exclusive.
- A capability not listed here as allowed is denied by default.

## Matrix

| Capability | User | Creator | Administrator |
| --- | --- | --- | --- |
| Consume Content (watch/listen) | ✅ | ✅ | ✅ |
| Search | ✅ | ✅ | ✅ |
| Create/manage Playlists | ✅ | ✅ | ✅ |
| Share Content | ✅ | ✅ | ✅ |
| Manage own account settings | ✅ | ✅ | ✅ |
| Publish Content | ❌ | ✅ (own only) | ❌ |
| Edit/remove own Content | ❌ | ✅ (own only) | ❌ |
| View own Content analytics | ❌ | ✅ (own only) | ❌ |
| Edit/remove any Content (moderation) | ❌ | ❌ | ✅ |
| Manage Categories | ❌ | ❌ | ✅ |
| Manage Advertisements | ❌ | ❌ | ✅ |
| Review reports | ❌ | ❌ | ✅ |

## Dependencies

- `DOMAIN_MODEL.md` — Account/Role definition.
- `FEATURE_REGISTRY.md` — the features these capabilities belong to.

## Relationships

- Each feature's own `SPEC.md` must reference this matrix for its permission rules rather than restating them.

## Constraints

- No feature document may grant a capability not listed here. If a feature needs a new capability, add it here first.
- "own only" scoping (Creator capabilities) must be enforced at the data layer, not just hidden in the UI — this is a rule for `04_BACKEND`, not a UI-only concern.

## Acceptance

Any capability check in any feature can be answered by looking up this table; no feature should need its own separate permission logic description.

## Future Scope

No Administrator-facing UI exists yet (`INFORMATION_ARCHITECTURE.md` Future Scope) — Administrator capabilities above are defined but not yet backed by any designed screen.
