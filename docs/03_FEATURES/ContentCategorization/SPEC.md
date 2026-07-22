---
document_id: CONTENTCATEGORIZATION_SPEC
title: Content Categorization — Specification
version: 1.1.0
status: active
priority: high
depends_on:
  - CONTENTCATEGORIZATION_README
related_documents:
  - CONTENT_ARCHITECTURE.md
related_entities:
  - Category
  - Tag
related_components: []
related_events: []
owner: Product Architecture
---

# Content Categorization — Specification

## Why

A user needs to narrow "all Content" down to what they actually want, without relying entirely on Search or Recommendation Engine.

## What

Browsing Content by Category, and Tag-based filtering within a Category.

## Rules

- Every Content item belongs to exactly one Category (`CONTENT_ARCHITECTURE.md`) — this feature never shows a Content item under a Category other than its assigned one.
- A Category browse view may further filter by Tag (many-to-many with Content) without changing the underlying Category scope.
- The V1 Category list is the **placeholder** set defined in `CONTENT_ARCHITECTURE.md` ("V1 Category List (placeholder)") — Bhajans & Kirtan, Discourses & Satsang, Aarti & Rituals, Devotional Stories, Festival Specials. Structural implementation (browse UI, tests, seed data) may proceed against this list; it is not yet confirmed as final and must be replaced with a real Administrator-authored taxonomy before launch.

## Dependencies

- `CONTENTCATEGORIZATION_README.md`

## Relationships

- `CONTENT_ARCHITECTURE.md` — Category/Tag definition and the placeholder list.

## Constraints

- No feature invents a Category name beyond the placeholder list without updating `CONTENT_ARCHITECTURE.md` first.

## Acceptance

A user can browse any of the 5 placeholder Categories and see only Content assigned to it.

## Future Scope

The placeholder Category list needs to be replaced by a confirmed, Administrator-authored list before launch — see `CONTENT_ARCHITECTURE.md` Future Scope.
