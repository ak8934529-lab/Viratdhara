---
document_id: STATE_REGISTRY
title: State Registry
version: 1.0.0
status: active
priority: high
depends_on:
  - DOMAIN_MODEL
related_documents:
  - DOMAIN_MODEL.md
  - CONTENT_ARCHITECTURE.md
related_entities:
  - Content
  - Account
related_components: []
related_events:
  - content_played
  - content_paused
  - content_completed
owner: Product Architecture
---

# State Registry

## Why

"Publish state" is mentioned in `CONTENT_ARCHITECTURE.md` but not enumerated. Playback has visibly distinct states in the reviewed design (play/pause icon, buffering-implied progress bar). Without one registry, each feature would invent its own state names for the same machine.

## What

The state machines that exist in V1, cross-feature.

## Rules

- A state machine is defined once here. A feature's own `STATES.md` may only reference these machines and add feature-local states that don't already belong to one of these.
- Transitions are directional; a listed transition does not imply its reverse exists unless also listed.

## State Machines

### Content Lifecycle

```
draft ──(Creator publishes)──> published
published ──(Creator removes)──> removed_by_creator
published ──(Administrator moderates)──> removed_by_moderation
```

- `removed_by_creator` and `removed_by_moderation` are distinct terminal-ish states (an Administrator can still act on `removed_by_creator` content; a Creator cannot reverse `removed_by_moderation`).
- No "draft → removed" transition exists — a draft is discarded, not moderated.

### Playback

```
idle ──(content_played)──> playing
playing ──(content_paused)──> paused
paused ──(content_played)──> playing
playing ──(reaches end)──> content_completed ──> idle
```

- Buffering is a transient sub-state of `playing`, not a separate top-level state, in V1.

### Authentication Session

```
logged_out ──(account_logged_in / account_signed_up)──> logged_in
logged_in ──(explicit sign out)──> logged_out
```

## Dependencies

- `DOMAIN_MODEL.md` — Content, Account.

## Relationships

- `EVENT_REGISTRY.md` — the events that trigger the transitions above (`content_played`, `content_paused`, `account_logged_in`, `account_signed_up`).
- `CONTENT_ARCHITECTURE.md` — the Content lifecycle referenced there is defined here.

## Constraints

- No feature may introduce a new state for Content, Playback, or Authentication Session without updating this document — these three machines are shared, not feature-owned.

## Acceptance

A feature's `STATES.md` can be checked: any state name matching Content/Playback/Auth Session must match this registry exactly.

## Future Scope

Live Streaming (long-term scope) will need its own state machine distinct from the static Content Lifecycle above, since a live stream doesn't have a stable "published" asset in the same sense.
