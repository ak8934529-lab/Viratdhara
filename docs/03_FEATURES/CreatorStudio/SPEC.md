---
document_id: CREATORSTUDIO_SPEC
title: Creator Studio — Specification
version: 1.0.0
status: active
priority: high
depends_on:
  - CREATORSTUDIO_README
related_documents:
  - CONTENT_ARCHITECTURE.md
  - STATE_REGISTRY.md
related_entities:
  - Content
related_components: []
related_events:
  - creator_content_published
owner: Product Architecture
---

# Creator Studio — Specification

## Why

`PRODUCT_CONTEXT.md` states Creators "publish devotional content," "manage videos," and "view analytics" — this document is where those product-level statements become checkable behavior.

## What

Content management and analytics for the authenticated Creator's own Content.

## Rules

- A Creator creates Content in `draft` state (`STATE_REGISTRY.md` Content Lifecycle), sets required metadata (`CONTENT_ARCHITECTURE.md`: title, type, one Category, zero or more Tags), then publishes it — transitioning `draft → published` and emitting `creator_content_published`.
- A Creator may edit or remove (`published → removed_by_creator`) only Content they own (`DOMAIN_MODEL.md`).
- Analytics shown are read-only aggregates derived from existing events (`content_viewed`, `content_played`, `content_completed`, `content_shared`) scoped to the Creator's own Content — no new event is introduced for analytics purposes.
- An Administrator-moderated item (`removed_by_moderation`) is visible to the Creator as such (not silently disappeared) but cannot be un-removed by the Creator (`STATE_REGISTRY.md`).

## Dependencies

- `CREATORSTUDIO_README.md`, `CONTENT_ARCHITECTURE.md`, `STATE_REGISTRY.md`

## Relationships

- `EVENT_REGISTRY.md` — the events analytics are derived from.
- `PERMISSION_MATRIX.md` — the capability boundary this feature enforces.

## Constraints

- No Content owned by another Creator is ever readable/writable through this feature.
- No new analytics-specific event is invented — existing events are aggregated, not duplicated.

## Acceptance

A Creator's Content management and analytics screens reflect only their own Content and its real event-derived engagement.

## Future Scope

Advanced analytics (trends over time, audience demographics) are not specified.
