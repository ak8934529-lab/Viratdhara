---
document_id: CREATORPROFILE_TEST_CASES
title: Creator Profile — Test Cases
version: 1.0.0
status: active
priority: medium
depends_on:
  - CREATORPROFILE_SPEC
  - CREATORPROFILE_EDGE_CASES
related_documents: []
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Creator Profile — Test Cases

## Why

Each case traces to `SPEC.md`, `VALIDATIONS.md`, or `EDGE_CASES.md`.

## What

Test cases for this feature.

## Test Cases

| # | Case | Traces To | Expected |
| --- | --- | --- | --- |
| 1 | View a Creator's profile | `SPEC.md` | Shows only their `published` Content |
| 2 | Follow a Creator (authenticated) | `SPEC.md` | `creator_followed` fires, state `following` |
| 3 | Follow the same Creator again | `SPEC.md` Idempotent | No-op, no duplicate `Follow`, no duplicate event |
| 4 | Unfollow a Creator | `SPEC.md` | `creator_unfollowed` fires, state `not_following` |
| 5 | Attempt to follow while unauthenticated | `VALIDATIONS.md` | Routed to Authentication, no `Follow` created |
| 6 | View own profile as the Creator | `EDGE_CASES.md` Self-follow | No Follow button shown |

## Dependencies

- `CREATORPROFILE_SPEC.md`, `CREATORPROFILE_EDGE_CASES.md`

## Relationships

None beyond the above.

## Constraints

- Role-revocation and account-deletion cases deferred per `EDGE_CASES.md`.

## Acceptance

All 6 cases pass.

## Future Scope

None beyond `EDGE_CASES.md`'s deferred items.
