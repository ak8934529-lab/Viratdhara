---
document_id: CREATORSTUDIO_TEST_CASES
title: Creator Studio — Test Cases
version: 1.0.0
status: active
priority: medium
depends_on:
  - CREATORSTUDIO_SPEC
  - CREATORSTUDIO_EDGE_CASES
related_documents: []
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Creator Studio — Test Cases

## Why

Each case traces to `SPEC.md`, `VALIDATIONS.md`, or `EDGE_CASES.md`.

## What

Test cases for this feature.

## Test Cases

| # | Case | Traces To | Expected |
| --- | --- | --- | --- |
| 1 | Create Content with required fields | `SPEC.md` | Saved as `draft` |
| 2 | Publish valid draft Content | `SPEC.md`, `STATES.md` | `draft → published`, `creator_content_published` fires |
| 3 | Attempt to publish without title/Category | `VALIDATIONS.md` | Blocked, `VALIDATION_FAILED` |
| 4 | Remove own published Content | `STATES.md` | `published → removed_by_creator` |
| 5 | Attempt to edit another Creator's Content | `SPEC.md` Constraints | `PERMISSION_DENIED` |
| 6 | View analytics for zero-activity Content | `EDGE_CASES.md` | Shows explicit zero counts, not an empty state |
| 7 | View a moderation-removed item in Content management | `EDGE_CASES.md` | Shown read-only, visibly distinct from creator-removed items |

## Dependencies

- `CREATORSTUDIO_SPEC.md`, `CREATORSTUDIO_EDGE_CASES.md`

## Relationships

None beyond the above.

## Constraints

None beyond tracing every case to a rule.

## Acceptance

All 7 cases pass.

## Future Scope

None.
