---
document_id: EVENT_REGISTRY
title: Event Registry
version: 1.0.0
status: active
priority: medium
depends_on:
  - DOMAIN_MODEL
  - FEATURE_REGISTRY
related_documents:
  - FEATURE_REGISTRY.md
  - SUCCESS_METRICS.md
related_entities: []
related_components: []
related_events:
  - account_signed_up
  - account_logged_in
  - content_viewed
  - content_played
  - content_paused
  - content_completed
  - content_shared
  - content_searched
  - playlist_created
  - playlist_item_added
  - recommendation_served
  - recommendation_clicked
  - creator_content_published
  - ad_impression
  - ad_clicked
owner: Product Architecture
---

# Event Registry

## Why

Multiple features emit events that overlap in meaning (Sharing and Content Discovery both care about "was this content shared"). One registry prevents each feature from inventing its own event name for the same underlying occurrence.

## What

The authoritative list of domain/analytics events in V1. An event not listed here does not officially exist, even if a feature's `EVENTS.md` describes similar behavior.

## Rules

- An event name is `snake_case`, past tense, `<subject>_<verb>`.
- A feature that emits an event must reference it here, not redefine its name or shape in the feature's own `EVENTS.md`.
- No event here has a consuming metric yet — see `SUCCESS_METRICS.md`, which explicitly has no quantitative KPIs defined. Events are tracked in advance of metrics needing them.

## Registry

| Event | Emitted By | Meaning |
| --- | --- | --- |
| `account_signed_up` | Authentication | A new Account was created. |
| `account_logged_in` | Authentication | An existing Account authenticated. |
| `content_viewed` | Content Discovery, Search, Recommendation Engine | A Content item was opened/rendered for an Account. |
| `content_played` | Video Player | Playback started for a Content item. |
| `content_paused` | Video Player | Playback paused. |
| `content_completed` | Video Player | Playback reached its end. |
| `content_shared` | Sharing | An Account shared a Content item. |
| `content_searched` | Search | A search query was executed. |
| `playlist_created` | Content Discovery / User Settings | An Account created a Playlist. |
| `playlist_item_added` | Content Discovery | A Content item was added to a Playlist. |
| `recommendation_served` | Recommendation Engine | A Recommendation was shown to an Account. |
| `recommendation_clicked` | Recommendation Engine | An Account acted on a served Recommendation. |
| `creator_content_published` | Creator Studio | A Creator published a new Content item. |
| `ad_impression` | Advertisements | An Advertisement was shown to an Account. |
| `ad_clicked` | Advertisements | An Account interacted with an Advertisement. |

## Dependencies

- `DOMAIN_MODEL.md` — the entities these events reference.
- `FEATURE_REGISTRY.md` — the features listed as emitters.

## Relationships

- Each feature's own `EVENTS.md` narrows this list to the subset it emits/consumes; it does not add new event names.

## Constraints

- No event may be added without a listed emitting feature.
- Event payload shape is not defined here — that's `04_BACKEND` scope once it exists.

## Acceptance

Any event name appearing in a feature's `EVENTS.md` also appears in this table with the same spelling.

## Future Scope

Events for future/long-term modules are added only once those modules are promoted to `FEATURE_REGISTRY.md`.
