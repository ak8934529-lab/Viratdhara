---
document_id: SHARING_EDGE_CASES
title: Sharing — Edge Cases
version: 1.1.0
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

### Recipient is unauthenticated — resolved

**Condition:** A shared link is opened by someone without a Viratdhara Account (or not currently `logged_in`).
**Resolution:** Resolved (Commit 18), consistent with existing architecture rather than a new rule: the recipient is routed to the Auth Area (Login/Signup) first, per `INFORMATION_ARCHITECTURE.md`'s existing Auth Area vs. Main App split — no exception is carved out for share links. After successful authentication, the recipient is deep-linked forward to the shared Content item (`/content/:id`) rather than dropped at the Home tab.
**Rationale:** This isn't a new business decision — `INFORMATION_ARCHITECTURE.md` already establishes that Main App content requires a `logged_in` session. Applying that consistently to share links (rather than carving out a public-viewing exception) is the smaller, more consistent change.

## Dependencies

- `SHARING_SPEC.md`

## Relationships

- `STATE_REGISTRY.md`, `INFORMATION_ARCHITECTURE.md`

## Constraints

- No Content is ever viewable via share link without authentication — no exception path is introduced.

## Acceptance

A removed-Content link never shows a broken/raw error state. An unauthenticated recipient reaches the shared Content immediately after logging in.

## Future Scope

A public/pre-authentication preview of shared Content (e.g. an Open Graph card) is not specified — out of scope for this pass.
