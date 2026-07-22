---
document_id: CONTENTCATEGORIZATION_EDGE_CASES
title: Content Categorization — Edge Cases
version: 1.1.0
status: active
priority: medium
depends_on:
  - CONTENTCATEGORIZATION_SPEC
related_documents: []
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Content Categorization — Edge Cases

## Why

An empty Category is the most likely first thing anyone hits testing this feature, before real Content volume exists.

## What

Known edge cases and their resolution.

## Rules

### The V1 Category list was undefined — now resolved with an explicit placeholder

**Condition:** No document specified the authoritative V1 Category list.
**Resolution:** Resolved (user decision, Commit 18): use the 5-item placeholder list in `CONTENT_ARCHITECTURE.md` ("V1 Category List (placeholder)") — Bhajans & Kirtan, Discourses & Satsang, Aarti & Rituals, Devotional Stories, Festival Specials. This is explicitly a placeholder, not a final content-taxonomy decision — it unblocks structural work (UI, tests, seed data) without claiming to be the launch-ready list.
**Rationale:** The user chose "placeholder starter set" over supplying a real list now, so structural work isn't blocked. Must still be replaced with a confirmed list before launch.

### Empty Category

**Condition:** A Category has zero published Content (e.g. brand new, or all its Content was moderated away).
**Resolution:** Use `MobileEmptyState` (`UX_PATTERNS.md`) — never blank space or a loading spinner stuck indefinitely.

### Category with only future-scope-adjacent Content

**Condition:** None currently possible, since booking/commerce Content doesn't exist in this data model (`PRODUCT_VISION.md` scope resolution) — noted so a future implementer doesn't need to design for it.
**Resolution:** N/A in V1.

## Dependencies

- `CONTENTCATEGORIZATION_SPEC.md`

## Relationships

- `UX_PATTERNS.md` — the empty-state pattern.

## Constraints

- The placeholder Category list is not final — it blocks final launch (a real list must replace it), but no longer blocks structural implementation or testing.

## Acceptance

Every edge case above has a stated resolution.

## Future Scope

Replacing the placeholder Category list with a confirmed, Administrator-authored one is the remaining open item for this feature.
