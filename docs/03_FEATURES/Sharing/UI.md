---
document_id: SHARING_UI
title: Sharing — UI
version: 1.0.0
status: active
priority: low
depends_on:
  - SHARING_SPEC
  - RESPONSIVE_SYSTEM
related_documents: []
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Sharing — UI

## Why

The share action needs one consistent entry point across every Content-bearing surface, not a different icon/placement per screen.

## What

Entry point for this feature.

## Rules

- A share icon/button appears on: the Content detail area of Video Player's full player, and any Content card's overflow/action area in Content Discovery, Search results, and Category browse.
- Tapping it invokes the platform native share sheet per `SPEC.md` — this feature does not design a custom sheet UI for Compact; at Wide (`apps/web`, `RESPONSIVE_SYSTEM.md`), a fallback "copy link" affordance is shown since `navigator.share` support varies on desktop browsers.

## Dependencies

- `SHARING_SPEC.md`, `RESPONSIVE_SYSTEM.md`

## Relationships

None beyond the surfaces listed above.

## Constraints

- No screen invents its own share icon placement inconsistent with the others.

## Acceptance

The share affordance looks and behaves identically wherever it appears.

## Future Scope

A custom in-app share sheet (beyond native) is not designed.
