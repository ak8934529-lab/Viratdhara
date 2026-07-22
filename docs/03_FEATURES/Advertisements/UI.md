---
document_id: ADVERTISEMENTS_UI
title: Advertisements — UI
version: 1.0.0
status: active
priority: low
depends_on:
  - ADVERTISEMENTS_SPEC
  - RESPONSIVE_SYSTEM
related_documents: []
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Advertisements — UI

## Why

The ad surface must be visually distinct from Content per `DOMAIN_MODEL.md`, and needs a consistent skip-control placement.

## What

The interstitial ad presentation.

## Rules

- Renders in the same full-screen area a Video Player session would occupy, immediately before playback.
- A visible "Ad" label and skip control (countdown or immediate, per unconfirmed `EDGE_CASES.md` rule) are present at all times the ad is shown.
- At Wide breakpoint (`RESPONSIVE_SYSTEM.md`), the ad still occupies the primary content area, not a secondary panel — it's a full interstitial regardless of viewport.

## Dependencies

- `ADVERTISEMENTS_SPEC.md`, `RESPONSIVE_SYSTEM.md`

## Relationships

None beyond Video Player's screen area.

## Constraints

- No ad renders without a visible "Ad" label — never disguised as Content.

## Acceptance

The ad interstitial is visually unmistakable as an ad, with a visible skip affordance.

## Future Scope

Exact skip-timing UI is pending `EDGE_CASES.md`'s open decision.
