---
document_id: ADVERTISEMENTS_EDGE_CASES
title: Advertisements — Edge Cases
version: 1.0.0
status: active
priority: medium
depends_on:
  - ADVERTISEMENTS_SPEC
related_documents: []
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Advertisements — Edge Cases

## Why

An ad is a third-party-adjacent dependency (inventory, selection) that can fail or be unavailable in ways core Content never is — this must never block the actual product experience (playback).

## What

Known edge cases and their resolution.

## Rules

### No Advertisement available

**Condition:** Ad selection returns nothing.
**Resolution:** Skip straight to Video Player session start (`STATES.md` `skipped_unavailable`) — never a blocking error, never an empty ad-shaped placeholder.

### Advertisement fails to load

**Condition:** An ad was selected but fails to render/load.
**Resolution:** Same as no-ad-available — proceed to Content, do not block.

### Placement frequency

**Condition:** Whether every Video Player session shows an ad, or only some (e.g. every Nth session, time-based), is unconfirmed.
**Resolution:** Not resolved — open product decision.

### Skip timing

**Condition:** Whether the skip control appears immediately or after a countdown, and how long, is unconfirmed.
**Resolution:** Not resolved — open product decision, though `PRODUCT_PHILOSOPHY.md`'s calm principle argues against a long forced-view duration.

## Dependencies

- `ADVERTISEMENTS_SPEC.md`

## Relationships

- `PRODUCT_PHILOSOPHY.md`

## Constraints

- The two failure cases (no ad / load failure) must never block Content access — this is a hard constraint, not an open decision.
- Placement frequency and skip timing remain open decisions, not resolved by an implementation guess.

## Acceptance

Ad unavailability/failure never prevents playback; the two open decisions are visibly flagged, not silently assumed.

## Future Scope

Placement frequency and skip timing are the two items to resolve before this feature is launch-ready.
