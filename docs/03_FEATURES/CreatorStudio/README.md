---
document_id: CREATORSTUDIO_README
title: Creator Studio — Overview
version: 1.0.0
status: active
priority: high
depends_on:
  - AUTHENTICATION_README
  - CONTENT_ARCHITECTURE
  - FEATURE_REGISTRY
related_documents:
  - CREATORSTUDIO_SPEC.md
related_entities:
  - Content
  - Account
related_components: []
related_events:
  - creator_content_published
owner: Product Architecture
---

# Creator Studio

## Why

Referred to as "Studio dashboard for analytics" in this pass's working feature list. A Creator needs private tooling to manage their own Content and see their own performance — distinct from `Creator Profile`, which is what everyone else sees.

## What

This feature owns Content management (create/edit/publish/remove own Content) and analytics (views, plays, shares — read-only aggregates of events already defined in `EVENT_REGISTRY.md`) for the authenticated Creator's own Content only.

## Documents in This Feature

| Document | Purpose |
| --- | --- |
| `SPEC.md` | Functional specification |
| `UI.md` | Studio home, content management, analytics screens |
| `COMPONENTS.md` | Studio-specific components |
| `API.md` | Content CRUD (own), analytics read |
| `DATABASE.md` | `Content` fields this feature writes |
| `STATES.md` | References Content Lifecycle (`STATE_REGISTRY.md`) |
| `VALIDATIONS.md` | Content publishing validation |
| `EVENTS.md` | `creator_content_published` |
| `EDGE_CASES.md` | Publishing validation failures, analytics for zero-activity Content |
| `TEST_CASES.md` | Test cases traced to the above |
| `PROMPTS.md` | Canonical prompts for implementing this feature |
| `CHANGELOG.md` | History of changes to this feature's documentation |

## Dependencies

- `AUTHENTICATION_README.md` — requires `logged_in` session with Creator role (`PERMISSION_MATRIX.md`).
- `CONTENT_ARCHITECTURE.md` — the Content lifecycle this feature drives.

## Relationships

- `Creator Profile` — the public-facing counterpart; disjoint concerns on the same underlying Account/Content.
- `PERMISSION_MATRIX.md` — "Publish Content," "Edit/remove own Content," "View own Content analytics" (Creator-only capabilities).

## Constraints

- This feature never shows or allows editing another Creator's Content — every capability is scoped to "own only" (`PERMISSION_MATRIX.md`), enforced at the data layer, not just the UI.
- This feature does not implement platform-wide/aggregate analytics (that's an Administrator concern, no tooling designed yet) — only a Creator's own Content.

## Acceptance

A Creator can create, edit, publish, and remove their own Content, and view basic engagement analytics for it.

## Future Scope

Analytics depth (beyond basic view/play/share counts) is not specified.
