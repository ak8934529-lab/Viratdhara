---
document_id: SHARING_EDGE_CASES
title: Sharing — Edge Cases
version: 1.0.0
status: active
priority: medium
depends_on:
  - SHARING_SPEC
related_documents: []
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Sharing — Edge Cases

## Why

A share link outlives the moment it was shared — by the time it's opened, the underlying Content may no longer be available.

## What

Known edge cases and their resolution.

## Rules

### Shared link points to removed/moderated Content

**Condition:** Content was `published` when shared, later transitions to `removed_by_creator`/`removed_by_moderation` (`STATE_REGISTRY.md`).
**Resolution:** The link resolves to a "content not available" state (`MobileEmptyState` or equivalent), never a raw 404/error page or a broken render.

### Recipient is unauthenticated

**Condition:** A shared link is opened by someone without a Viratdhara Account.
**Resolution:** Not specified — whether Content is viewable without login, or the recipient is routed through Authentication first, is an open product decision. `INFORMATION_ARCHITECTURE.md`'s Auth Area vs. Main App split implies login is required before Main App access, which would mean a logged-out recipient hits the Auth Area first — but this hasn't been explicitly confirmed for the share-link case specifically.

## Dependencies

- `SHARING_SPEC.md`

## Relationships

- `STATE_REGISTRY.md`, `INFORMATION_ARCHITECTURE.md`

## Constraints

- The unauthenticated-recipient gap should be resolved before this feature is considered launch-ready.

## Acceptance

A removed-Content link never shows a broken/raw error state. The unauthenticated case is explicitly flagged, not silently assumed either way.

## Future Scope

Confirm whether any Content is viewable pre-authentication via share link, or whether login is always required first.
