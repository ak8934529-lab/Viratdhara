---
document_id: ADVERTISEMENTS_README
title: Advertisements — Overview
version: 1.0.0
status: active
priority: medium
depends_on:
  - PRODUCT_CONTEXT
  - FEATURE_REGISTRY
related_documents:
  - ADVERTISEMENTS_SPEC.md
related_entities:
  - Advertisement
related_components: []
related_events:
  - ad_impression
  - ad_clicked
owner: Product Architecture
---

# Advertisements

## Why

`MASTER_PRD.md` narrows this pass's scope to "Ads Between video" specifically — interstitial placement around Video Player sessions — not every possible ad placement across the app.

## What

This feature owns serving and tracking Advertisement units at one placement: between/around Video Player sessions. It reads `Advertisement` (`DOMAIN_MODEL.md`); Administrator-side ad creation/management has no designed UI (`INFORMATION_ARCHITECTURE.md` Future Scope).

## Documents in This Feature

| Document | Purpose |
| --- | --- |
| `SPEC.md` | Functional specification |
| `UI.md` | Interstitial ad placement |
| `COMPONENTS.md` | Ad unit rendering |
| `API.md` | Serve/track Advertisement |
| `DATABASE.md` | Read-only relationship to `Advertisement` |
| `STATES.md` | Ad presentation state |
| `VALIDATIONS.md` | None owned |
| `EVENTS.md` | `ad_impression`, `ad_clicked` |
| `EDGE_CASES.md` | No ad available, ad fails to load, skip behavior |
| `TEST_CASES.md` | Test cases traced to the above |
| `PROMPTS.md` | Canonical prompts for implementing this feature |
| `CHANGELOG.md` | History of changes to this feature's documentation |

## Dependencies

- `DOMAIN_MODEL.md` — the `Advertisement` entity.

## Relationships

- `Video Player` — this feature's placement is anchored to Video Player sessions (`SPEC.md`).

## Constraints

- Other placements implied by `FEATURE_REGISTRY.md`'s broader "Advertisements" scope (e.g. banner ads in Content Discovery feeds) are explicitly out of scope for this pass — only the between-video placement is specified here, per `MASTER_PRD.md`.
- No ad-targeting/personalization logic is specified — see `EDGE_CASES.md`.

## Acceptance

An Advertisement is served between Video Player sessions, with impression/click tracked.

## Future Scope

Additional placements (feed banners, etc.) and targeting logic are not specified in this pass.
