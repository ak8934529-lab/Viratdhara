---
document_id: VIDEOPLAYER_TEST_CASES
title: Video Player — Test Cases
version: 1.0.0
status: active
priority: high
depends_on:
  - VIDEOPLAYER_SPEC
  - VIDEOPLAYER_EDGE_CASES
related_documents: []
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Video Player — Test Cases

## Why

Each case traces to `SPEC.md` or `STATES.md`.

## What

Test cases for this feature.

## Test Cases

| # | Case | Traces To | Expected |
| --- | --- | --- | --- |
| 1 | Start playback on a Content item | `SPEC.md` | State `idle → playing`, `content_played` fires, mini player appears |
| 2 | Pause, then resume | `SPEC.md` | `playing → paused → playing`; `content_played` does not re-fire on resume |
| 3 | Playback reaches the end | `STATES.md` | `content_completed` fires, state returns to `idle`, mini player disappears |
| 4 | Seek to a new position while playing | `SPEC.md` | Position updates, state remains `playing` |
| 5 | Start a second item while one is playing | `SPEC.md` | First item stops; only the second plays |
| 6 | Navigate between Main App tabs while playing | `README.md` | Mini player persists, playback uninterrupted |

## Dependencies

- `VIDEOPLAYER_SPEC.md`, `VIDEOPLAYER_EDGE_CASES.md`

## Relationships

None beyond the above.

## Constraints

- Test cases for the 3 open edge-case gaps (network loss, backgrounding, mid-playback removal) are deferred until those product decisions are made.

## Acceptance

All 6 cases pass.

## Future Scope

Additional cases pending `EDGE_CASES.md`'s open items.
