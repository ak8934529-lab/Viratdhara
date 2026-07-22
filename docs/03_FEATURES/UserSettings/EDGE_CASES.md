---
document_id: USERSETTINGS_EDGE_CASES
title: User Settings — Edge Cases
version: 1.1.0
status: active
priority: medium
depends_on:
  - USERSETTINGS_SPEC
related_documents: []
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# User Settings — Edge Cases

## Why

Notifications and Downloads had unconfirmed data models; Subscriptions remains an intentional exception, deferred rather than resolved.

## What

Known edge cases and their resolution.

## Rules

### Notification category list — resolved

**Condition:** `SPEC.md` requires toggles "per category" but no document specified which categories.
**Resolution:** Resolved (user decision, Commit 18): 3 categories — new content from followed Creators, engagement on your activity, product & platform announcements. See `SPEC.md`, `VALIDATIONS.md`.

### Downloads storage limit — resolved

**Condition:** A user attempts to download Content; whether a storage limit exists was unconfirmed.
**Resolution:** Resolved (user decision, Commit 18): **no limit in V1.** Revisit only if real usage patterns make this a problem.

### Subscription state beyond free/paid — deliberately still open

**Condition:** Whether there are multiple paid tiers, trial periods, or just a binary free/paid state.
**Resolution:** **Deliberately deferred** (user decision, Commit 18) — not resolved even with a placeholder. Do not build a Subscriptions UI against an assumed tier structure; this sub-screen waits for real payment-integration scoping.

## Dependencies

- `USERSETTINGS_SPEC.md`

## Relationships

None beyond the above.

## Constraints

- The Subscriptions gap may not be resolved by an implementation guess — it is deferred by explicit choice, not oversight.

## Acceptance

Notifications and Downloads have no open gaps. Subscriptions remains open by design.

## Future Scope

Subscription tier structure, once payment integration is scoped.
