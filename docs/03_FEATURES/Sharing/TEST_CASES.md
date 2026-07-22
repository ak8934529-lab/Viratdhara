---
document_id: SHARING_TEST_CASES
title: Sharing — Test Cases
version: 1.0.0
status: active
priority: low
depends_on:
  - SHARING_SPEC
  - SHARING_EDGE_CASES
related_documents: []
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Sharing — Test Cases

## Why

Each case traces to `SPEC.md` or `EDGE_CASES.md`.

## What

Test cases for this feature.

## Test Cases

| # | Case | Traces To | Expected |
| --- | --- | --- | --- |
| 1 | Share a published Content item | `SPEC.md` | Native share sheet opens with a working link, `content_shared` fires |
| 2 | Open a share link to published Content | `SPEC.md` | Resolves to the Content detail screen |
| 3 | Open a share link to removed/moderated Content | `EDGE_CASES.md` | "Not available" state shown, not a raw error |

## Dependencies

- `SHARING_SPEC.md`, `SHARING_EDGE_CASES.md`

## Relationships

None beyond the above.

## Constraints

- Unauthenticated-recipient test case deferred until that gap (`EDGE_CASES.md`) is resolved.

## Acceptance

All 3 cases pass.

## Future Scope

Unauthenticated-recipient case pending product decision.
