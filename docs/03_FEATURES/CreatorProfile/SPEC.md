---
document_id: CREATORPROFILE_SPEC
title: Creator Profile — Specification
version: 1.0.0
status: active
priority: medium
depends_on:
  - CREATORPROFILE_README
related_documents:
  - DOMAIN_MODEL.md
related_entities:
  - Follow
  - Content
related_components: []
related_events:
  - creator_followed
  - creator_unfollowed
owner: Product Architecture
---

# Creator Profile — Specification

## Why

`PRODUCT_CONTEXT.md` states Creators "interact with followers" — this document is where that becomes a real, checkable mechanism.

## What

Viewing a Creator's public profile and managing the Follow relationship.

## Rules

- A Creator Profile shows: the Creator's display info (from `Account`), their published Content (`published` state only, per `STATE_REGISTRY.md`), and a Follow/Unfollow action.
- Following requires an authenticated Account (`logged_in` session, `STATE_REGISTRY.md`) — an unauthenticated viewer sees the profile (Content is publicly viewable per Content's own discoverability rules) but is routed to Authentication before the Follow action completes.
- Following emits `creator_followed`; unfollowing emits `creator_unfollowed`.
- Follow is idempotent: following an already-followed Creator is a no-op, not an error.

## Dependencies

- `CREATORPROFILE_README.md`, `DOMAIN_MODEL.md`

## Relationships

- `STATE_REGISTRY.md` — Content Lifecycle governs what's shown on the profile.

## Constraints

- No Creator Profile ever shows non-`published` Content, including the Creator's own drafts (drafts are Creator Studio's concern, not visible here).
- A Creator cannot follow themselves — see `EDGE_CASES.md`.

## Acceptance

Viewing any Creator's profile shows only their published Content; the Follow action correctly toggles and persists.

## Future Scope

Follower/following list views are not specified — see `README.md` Future Scope.
