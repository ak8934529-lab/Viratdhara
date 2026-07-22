---
document_id: CREATORPROFILE_README
title: Creator Profile — Overview
version: 1.0.0
status: active
priority: medium
depends_on:
  - AUTHENTICATION_README
  - FEATURE_REGISTRY
related_documents:
  - CREATORPROFILE_SPEC.md
  - DOMAIN_MODEL.md
related_entities:
  - Account
  - Follow
  - Content
related_components: []
related_events:
  - creator_followed
  - creator_unfollowed
owner: Product Architecture
---

# Creator Profile

## Why

A Creator's identity needs a public-facing surface distinct from their private management tooling (Creator Studio) — one is what a User sees, the other is what the Creator sees about themselves.

## What

This feature owns the public Creator Profile screen (bio, published Content list, follow action) and the Follow relationship (`DOMAIN_MODEL.md`, added this milestone). It does not own Creator-facing analytics or content management — that's Creator Studio.

## Documents in This Feature

| Document | Purpose |
| --- | --- |
| `SPEC.md` | Functional specification |
| `UI.md` | Public profile screen |
| `COMPONENTS.md` | Profile header, follow button, content grid |
| `API.md` | Profile read + follow/unfollow operations |
| `DATABASE.md` | `Follow` entity detail |
| `STATES.md` | Follow state (followed/not-followed) |
| `VALIDATIONS.md` | Follow action constraints |
| `EVENTS.md` | `creator_followed`, `creator_unfollowed` |
| `EDGE_CASES.md` | Following a since-demoted Creator, self-follow |
| `TEST_CASES.md` | Test cases traced to the above |
| `PROMPTS.md` | Canonical prompts for implementing this feature |
| `CHANGELOG.md` | History of changes to this feature's documentation |

## Dependencies

- `AUTHENTICATION_README.md` — a Follow action requires a logged-in Account.
- `DOMAIN_MODEL.md` — the `Follow` entity this feature introduced.

## Relationships

- `Creator Studio` — the private-facing counterpart to this feature; they read/write disjoint concerns on the same underlying Account.
- Route `/creator/:id` (`URL_STRUCTURE.md`).

## Constraints

- This feature does not expose Creator analytics (view counts, follower growth charts) — that's Creator Studio's `SPEC.md`.
- Self-follow (a Creator following their own profile) is addressed in `EDGE_CASES.md`, not left ambiguous.

## Acceptance

A User can view any Creator's public profile and follow/unfollow them; the Follow state persists across sessions.

## Future Scope

Follower/following lists (viewing who follows a Creator) are not specified — only the follow action and count, if any, are in scope, and even the count is not confirmed as a V1 requirement.
