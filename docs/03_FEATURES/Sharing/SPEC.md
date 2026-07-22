---
document_id: SHARING_SPEC
title: Sharing — Specification
version: 1.1.0
status: active
priority: medium
depends_on:
  - SHARING_README
related_documents:
  - CONTENT_ARCHITECTURE.md
related_entities:
  - Content
related_components: []
related_events:
  - content_shared
owner: Product Architecture
---

# Sharing — Specification

## Why

`CONTENT_ARCHITECTURE.md` names Sharing as a discoverability path without specifying the mechanism — this document is that specification.

## What

Generating and resolving a shareable reference to a Content item.

## Rules

- A share action produces a URL pointing at the Content item's route (`/content/:id`, `URL_STRUCTURE.md`).
- The share mechanism is the platform's native share sheet (web: `navigator.share` with a URL/text fallback to copy-link) — this feature does not build a custom multi-platform share UI beyond that.
- Emits `content_shared` (`EVENT_REGISTRY.md`) when a share action is initiated (not necessarily completed — most native share sheets don't report completion reliably).
- A resolved share link that points at non-`published` Content shows the same "not available" treatment as any other broken/removed Content reference (`EDGE_CASES.md`), not a share-specific error.
- An unauthenticated recipient opening a share link is routed to Authentication first, then deep-linked to the Content after login (`EDGE_CASES.md`) — no pre-authentication viewing exception exists.

## Dependencies

- `SHARING_README.md`

## Relationships

- `CONTENT_ARCHITECTURE.md`, `URL_STRUCTURE.md`

## Constraints

- No account-to-account direct share (in-app messaging) is in scope — only link generation for external sharing.

## Acceptance

Initiating share on any Content item produces a working link to that item and fires `content_shared`.

## Future Scope

In-app direct sharing, and share-completion tracking (if the platform ever supports it reliably), are not specified.
