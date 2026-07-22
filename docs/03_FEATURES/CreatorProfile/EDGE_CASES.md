---
document_id: CREATORPROFILE_EDGE_CASES
title: Creator Profile — Edge Cases
version: 1.1.0
status: active
priority: medium
depends_on:
  - CREATORPROFILE_SPEC
related_documents: []
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Creator Profile — Edge Cases

## Why

Self-follow and role changes are the two conditions that break a naive Follow implementation.

## What

Known edge cases and their resolution.

## Rules

### Viewing your own Creator profile

**Condition:** A Creator navigates to their own `/creator/:id`.
**Resolution:** No Follow button is shown (or it's disabled) — you cannot follow yourself, per `VALIDATIONS.md`. This is distinct from the Creator Studio management view; this is still the public profile layout, just without the Follow action.

### Followed Account loses Creator role — resolved

**Condition:** An Account being followed is no longer a Creator (role revoked — no Administrator tooling exists for this yet, but the data case is possible).
**Resolution:** Resolved (Commit 18, standard referential-integrity default): existing `Follow` relationships targeting that Account are deleted at the moment the Creator role is revoked. "Following a Creator" has no meaning once the target isn't a Creator.
**Rationale:** Data-integrity default, not a product-specific business decision — still not reachable until role-management tooling exists.

### Followed Account is deleted — resolved

**Condition:** A followed Creator's Account is deleted (no account-deletion flow exists yet — see `Authentication` Future Scope).
**Resolution:** Resolved (Commit 18): cascade-delete any `Follow` record referencing a deleted Account, on either side (follower or followed).
**Rationale:** Standard cascade-delete pattern for a relationship entity when either endpoint is removed — not reachable until an account-deletion feature exists.

## Dependencies

- `CREATORPROFILE_SPEC.md`

## Relationships

- `AUTHENTICATION_README.md` Future Scope — account deletion dependency.

## Constraints

- Both cascade-delete rules must be implemented in whatever feature actually performs role revocation / account deletion, once those features exist — this document specifies the rule, not where it executes.

## Acceptance

Self-follow is prevented at the UI level; the other two cases have a specified cascade-delete rule, not reachable in practice until role-management/account-deletion features exist.

## Future Scope

Implementation of these cascade rules is blocked on role-management and account-deletion features not yet built — the rule itself is no longer an open question.
