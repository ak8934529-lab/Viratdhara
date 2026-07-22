---
document_id: ADVERTISEMENTS_TEST_CASES
title: Advertisements — Test Cases
version: 1.1.0
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
| 4 | Attempt to skip before 5 seconds | `EDGE_CASES.md` resolved | Skip control not yet available |
| 5 | Skip the ad at/after 5 seconds | `STATES.md` | Ad dismissed, Content playback begins |
| 6 | Tap/click the ad | `SPEC.md` | `ad_clicked` fires |
| 7 | Second Video Player session in the same visit | `SPEC.md` resolved (one ad per session) | A new ad is shown again (not skipped due to "already seen one this visit") |

## Dependencies

- `ADVERTISEMENTS_SPEC.md`, `ADVERTISEMENTS_EDGE_CASES.md`

## Relationships

None beyond the above.

## Constraints

None — all cases now test resolved default behavior.

## Acceptance

All 7 cases pass.

## Future Scope

Cases should be revisited if placement frequency or skip timing defaults are tuned later.
