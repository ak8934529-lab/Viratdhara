---
document_id: CONTENTDISCOVERY_TEST_CASES
title: Content Discovery — Test Cases
version: 1.1.0
status: active
priority: high
depends_on:
  - CONTENTDISCOVERY_SPEC
  - CONTENTDISCOVERY_EDGE_CASES
related_documents: []
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Content Discovery — Test Cases

## Why

Each case traces to `SPEC.md` or `EDGE_CASES.md`.

## What

Test cases for this feature.

## Test Cases

| # | Case | Traces To | Expected |
| --- | --- | --- | --- |
| 1 | Load Home | `SPEC.md` resolved | Shows Recommendation Engine output only (no separate editorial section), `published` Content only |
| 2 | Load Suno | `SPEC.md` | Audio Content only |
| 3 | Load Dekho | `SPEC.md` | Video Content only, excluding `format: short` |
| 4 | Load Shorts | `SPEC.md` | Video Content with `format: short` only, single-column feed |
| 5 | Open a Content item from any feed | `EVENTS.md` | `content_viewed` fires |
| 6 | Create a Playlist and add Content | `EVENTS.md` | `playlist_created` and `playlist_item_added` fire |
| 7 | A tab with zero matching Content platform-wide | `EDGE_CASES.md` | `MobileEmptyState` shown |
| 8 | Load Home for a new/cold-start Account | `EDGE_CASES.md` resolved | Recommendation Engine's fallback (global recency) populates the feed — never empty |

## Dependencies

- `CONTENTDISCOVERY_SPEC.md`, `CONTENTDISCOVERY_EDGE_CASES.md`

## Relationships

None beyond the above.

## Constraints

None — all cases now test resolved behavior.

## Acceptance

All 8 cases pass.

## Future Scope

None currently open for this feature.
