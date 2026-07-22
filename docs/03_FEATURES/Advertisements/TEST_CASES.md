---
document_id: ADVERTISEMENTS_TEST_CASES
title: Advertisements — Test Cases
version: 1.0.0
status: active
priority: medium
depends_on:
  - ADVERTISEMENTS_SPEC
  - ADVERTISEMENTS_EDGE_CASES
related_documents: []
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Advertisements — Test Cases

## Why

Each case traces to `SPEC.md`, `STATES.md`, or `EDGE_CASES.md`.

## What

Test cases for this feature.

## Test Cases

| # | Case | Traces To | Expected |
| --- | --- | --- | --- |
| 1 | Ad available before Video Player session | `SPEC.md` | Ad shown, `ad_impression` fires, then Content plays |
| 2 | No ad available | `EDGE_CASES.md` | Content plays immediately, no impression fires, no block |
| 3 | Ad fails to load | `EDGE_CASES.md` | Same as case 2 — no block |
| 4 | Skip the ad | `STATES.md` | Ad dismissed, Content playback begins |
| 5 | Tap/click the ad | `SPEC.md` | `ad_clicked` fires |

## Dependencies

- `ADVERTISEMENTS_SPEC.md`, `ADVERTISEMENTS_EDGE_CASES.md`

## Relationships

None beyond the above.

## Constraints

- Placement-frequency and skip-timing-specific cases deferred until those gaps are resolved.

## Acceptance

All 5 cases pass.

## Future Scope

Additional cases pending `EDGE_CASES.md`'s open items.
