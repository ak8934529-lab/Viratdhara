---
document_id: CREATORPROFILE_EDGE_CASES
title: Creator Profile — Edge Cases
version: 1.0.0
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

### Followed Account loses Creator role

**Condition:** An Account an Account was following is no longer a Creator (role revoked — no tooling exists for this yet, but the data case is possible).
**Resolution:** Not specified — whether existing `Follow` relationships are cleaned up automatically or become orphaned/hidden is an open decision.

### Following an Account that later becomes unavailable

**Condition:** A followed Creator's Account is deleted (no account-deletion flow exists yet — see `Authentication` Future Scope, but flagging the dependency here).
**Resolution:** Not specified — depends on an Authentication feature that doesn't exist yet.

## Dependencies

- `CREATORPROFILE_SPEC.md`

## Relationships

- `AUTHENTICATION_README.md` Future Scope — account deletion dependency.

## Constraints

- The role-revocation cleanup gap should be resolved before an Administrator role-management feature ships, not before this feature ships (it's not reachable without that feature existing).

## Acceptance

Self-follow is prevented at the UI level; the other two cases are explicitly flagged as depending on features that don't exist yet, not silently ignored.

## Future Scope

Both open items depend on features not yet built (role management, account deletion) — revisit when those are scoped.
