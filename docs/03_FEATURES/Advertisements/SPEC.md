---
document_id: ADVERTISEMENTS_SPEC
title: Advertisements — Specification
version: 1.0.0
status: active
priority: medium
depends_on:
  - ADVERTISEMENTS_README
related_documents:
  - VIDEOPLAYER_SPEC.md
related_entities:
  - Advertisement
related_components: []
related_events:
  - ad_impression
  - ad_clicked
owner: Product Architecture
---

# Advertisements — Specification

## Why

`PRODUCT_PHILOSOPHY.md` prioritizes calm over aggressive engagement patterns — ad placement needs a stated, bounded mechanism rather than an open-ended "insert ads wherever."

## What

Interstitial ad placement around Video Player sessions.

## Rules

- An Advertisement may be shown before a Video Player session begins (pre-roll) — placement frequency (every session? every Nth session?) is unconfirmed, see `EDGE_CASES.md`.
- Showing an ad emits `ad_impression`; interacting with it emits `ad_clicked`.
- An ad never blocks access to Content indefinitely — a skip mechanism or bounded duration is required (`PRODUCT_PHILOSOPHY.md` calm principle), exact skip timing unconfirmed.
- Advertisements are never shown as, or mixed into, a Creator's Content list (`DOMAIN_MODEL.md` Advertisement definition) — the ad surface is visually and structurally distinct from Content.

## Dependencies

- `ADVERTISEMENTS_README.md`, `VIDEOPLAYER_SPEC.md`

## Relationships

- `Video Player` — the feature this placement is anchored to.

## Constraints

- No mid-roll (interrupting an in-progress Video Player session) placement is specified — only pre-roll.
- No targeting/personalization logic is specified — ad selection logic is a `04_BACKEND` concern, not decided here.

## Acceptance

An ad is shown before a Video Player session per the (unconfirmed) frequency rule, is skippable within a bounded time, and both events fire correctly.

## Future Scope

Placement frequency and skip timing are open product decisions — see `EDGE_CASES.md`.
