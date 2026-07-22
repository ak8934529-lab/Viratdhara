---
document_id: CONTENTCATEGORIZATION_README
title: Content Categorization — Overview
version: 1.0.0
status: active
priority: high
depends_on:
  - CONTENT_ARCHITECTURE
  - FEATURE_REGISTRY
related_documents:
  - CONTENTCATEGORIZATION_SPEC.md
  - DOMAIN_MODEL.md
related_entities:
  - Category
  - Tag
  - Content
related_components: []
related_events: []
owner: Product Architecture
---

# Content Categorization

## Why

Content Discovery, Search, and Recommendation Engine all depend on this feature (`DEPENDENCY_GRAPH.md`) — they need Content to already be organized into Category/Tag before they can filter, search, or personalize by it.

## What

This feature owns Category browsing (the user-facing side) and the Category/Tag data itself (the Administrator-facing management side is out of scope — see Constraints). It presents the fixed Category list and lets a user browse Content within one.

## Documents in This Feature

| Document | Purpose |
| --- | --- |
| `SPEC.md` | Functional specification |
| `UI.md` | Category browse screen, category chip/filter rows |
| `COMPONENTS.md` | `MobileChipRow`/`MobileFilterChip` and web equivalents |
| `API.md` | Category/Tag read operations |
| `DATABASE.md` | `Category`/`Tag` fields this feature reads |
| `STATES.md` | None — this feature has no state machine of its own |
| `VALIDATIONS.md` | None owned — Category/Tag creation validation belongs to the (not-yet-built) Administrator tooling |
| `EVENTS.md` | Category browse events |
| `EDGE_CASES.md` | Empty category, Category with only future-scope content |
| `TEST_CASES.md` | Test cases traced to the above |
| `PROMPTS.md` | Canonical prompts for implementing this feature |
| `CHANGELOG.md` | History of changes to this feature's documentation |

## Dependencies

- `CONTENT_ARCHITECTURE.md` — Category/Tag definition and the one-Category-per-Content rule.
- `DOMAIN_MODEL.md` — the entities this feature reads.

## Relationships

- `Content Discovery`, `Search`, `Recommendation Engine` all depend on this feature (`DEPENDENCY_GRAPH.md`).

## Constraints

- This feature does not create, edit, or delete Categories — that's an Administrator capability (`PERMISSION_MATRIX.md`) with no designed UI yet (`INFORMATION_ARCHITECTURE.md` Future Scope). This feature only reads and browses.
- No Category outside the fixed V1 list (`SPEC.md`) is introduced without an Administrator-tooling decision first.

## Acceptance

A user can browse Content filtered to any single Category, and Content is never shown under a Category it doesn't belong to.

## Future Scope

Administrator-side Category/Tag management is a future feature, not part of this one.
