---
document_id: SHARING_README
title: Sharing — Overview
version: 1.0.0
status: active
priority: medium
depends_on:
  - CONTENT_ARCHITECTURE
  - FEATURE_REGISTRY
related_documents:
  - SHARING_SPEC.md
related_entities:
  - Content
related_components: []
related_events:
  - content_shared
owner: Product Architecture
---

# Sharing

## Why

`CONTENT_ARCHITECTURE.md` names Sharing as one of five discoverability paths — a Content item shared by one Account becomes reachable by another who may not otherwise have found it.

## What

This feature owns generating a shareable reference to a Content item and resolving that reference back to the Content item when opened.

## Documents in This Feature

| Document | Purpose |
| --- | --- |
| `SPEC.md` | Functional specification |
| `UI.md` | Share entry point and share sheet |
| `COMPONENTS.md` | Share button/sheet components |
| `API.md` | Share-link generation/resolution |
| `DATABASE.md` | Read-only relationship to `Content` |
| `STATES.md` | None owned |
| `VALIDATIONS.md` | Share-link resolution validation |
| `EVENTS.md` | `content_shared` |
| `EDGE_CASES.md` | Shared link to removed/moderated Content, unauthenticated recipient |
| `TEST_CASES.md` | Test cases traced to the above |
| `PROMPTS.md` | Canonical prompts for implementing this feature |
| `CHANGELOG.md` | History of changes to this feature's documentation |

## Dependencies

- `CONTENT_ARCHITECTURE.md`

## Relationships

- Every Content-bearing screen (Content Discovery, Search, Video Player, Content Categorization) surfaces this feature's share action.

## Constraints

- This feature does not track social-graph/relationship data (who shared to whom) — it only generates/resolves links and emits an event.

## Acceptance

A shared link, opened by any recipient (authenticated or not, per `EDGE_CASES.md`), resolves to the correct Content item if it's still `published`.

## Future Scope

In-app messaging/direct-share-to-user (as opposed to generating a link for external sharing) is not specified.
