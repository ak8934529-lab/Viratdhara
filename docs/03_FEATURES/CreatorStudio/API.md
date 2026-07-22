---
document_id: CREATORSTUDIO_API
title: Creator Studio — API
version: 1.0.0
status: draft
priority: medium
depends_on:
  - CREATORSTUDIO_SPEC
  - API_REGISTRY
related_documents:
  - API_REGISTRY.md
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Creator Studio — API

## Why

This feature shares the `Creator` API group with `Creator Profile` (`API_REGISTRY.md`) — "Publish/manage own Content, read own analytics."

## What

Operations this feature needs, within the `Creator` group.

## Rules

- This document inherits `API_REGISTRY.md`'s `draft` status.

## Operations (planned)

| Operation | Purpose |
| --- | --- |
| Create Content (draft) | New Content item owned by the authenticated Creator |
| Update Content | Edit metadata/media of own Content |
| Publish Content | `draft → published` transition |
| Remove Content | `published → removed_by_creator` transition |
| Get own analytics | Aggregate view/play/share counts for own Content |

## Dependencies

- `CREATORSTUDIO_SPEC.md`, `API_REGISTRY.md`

## Relationships

- `ERROR_REGISTRY.md` — `PERMISSION_DENIED` if attempted against Content not owned by the requester.

## Constraints

- Every operation enforces "own Content only" server-side (`AI_BACKEND_AGENT.md`), not just hidden in the UI.

## Acceptance

Once finalized, all five operations are part of the `Creator` group.

## Future Scope

None beyond `API_REGISTRY.md`'s own.
