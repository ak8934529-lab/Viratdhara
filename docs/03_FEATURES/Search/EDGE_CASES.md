---
document_id: SEARCH_EDGE_CASES
title: Search — Edge Cases
version: 1.1.0
status: active
priority: medium
depends_on:
  - SEARCH_SPEC
related_documents: []
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Search — Edge Cases

## Why

Search input is the most unpredictable user input surface in this feature set (free text vs. everywhere else's fixed choices).

## What

Known edge cases and their resolution.

## Rules

### Empty/whitespace-only query

**Condition:** User submits with no real text.
**Resolution:** No-op per `VALIDATIONS.md` — no request, no state change.

### Zero matches

**Condition:** Query is well-formed but matches no `published` Content.
**Resolution:** `no_results` state, `MobileEmptyState` with query-specific text ("No results for '…'").

### Query matches only non-published Content

**Condition:** A query matches a Content item's title, but that item is `removed_by_creator`/`removed_by_moderation`.
**Resolution:** Treated identically to zero matches — non-published Content is invisible to Search, per `SPEC.md`.

### Special characters / very long query — resolved

**Condition:** Query contains symbols, emoji, or is unusually long.
**Resolution:** Resolved (Commit 18): query is truncated to 200 characters client-side before submission; emoji/symbols are permitted as literal text in the match (no special handling needed since matching is substring-based, not query-language parsing); the server-side implementation must use parameterized queries — free-text search input is never concatenated into a query string. This last point is a baseline engineering requirement (SQL/NoSQL injection prevention), not a product decision, so it is stated as a hard constraint rather than a "gap."

## Dependencies

- `SEARCH_SPEC.md`

## Relationships

- `UX_PATTERNS.md` — empty-state pattern.

## Constraints

- Search queries are never used to construct a query string via concatenation, in any implementation, on any backend.

## Acceptance

Every case above has a resolution.

## Future Scope

None currently open for this feature.
