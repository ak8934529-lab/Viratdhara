---
document_id: CREATORPROFILE_STATES
title: Creator Profile — States
version: 1.0.0
status: active
priority: medium
depends_on:
  - CREATORPROFILE_SPEC
related_documents:
  - STATE_REGISTRY.md
related_entities: []
related_components: []
related_events:
  - creator_followed
  - creator_unfollowed
owner: Product Architecture
---

# Creator Profile — States

## Why

The Follow button's two states (Follow / Following) are the entire state surface of this feature — simple, but worth naming so optimistic-UI logic has a clear target.

## What

A feature-local Follow state, not added to `STATE_REGISTRY.md` since it's a simple boolean, not a multi-step machine.

## Rules

```
not_following ──(creator_followed)──> following
following ──(creator_unfollowed)──> not_following
```

- This is per (Account, Creator) pair, not global.

## Dependencies

- `CREATORPROFILE_SPEC.md`

## Relationships

- `EVENT_REGISTRY.md` — the two events driving this transition.

## Constraints

- The UI reflects the optimistic state immediately on tap (`UI.md`) but must reconcile with the actual server result if the request fails.

## Acceptance

Follow state is `following` immediately after a successful follow, `not_following` immediately after a successful unfollow, and correctly reverts if either request fails.

## Future Scope

None.
