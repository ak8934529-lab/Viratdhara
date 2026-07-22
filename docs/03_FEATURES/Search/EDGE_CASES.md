---
document_id: SEARCH_EDGE_CASES
title: Search — Edge Cases
version: 1.0.0
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

### Special characters / very long query

**Condition:** Query contains symbols, emoji, or is unusually long.
**Resolution:** Not specified — no length cap or sanitization rule exists yet. Flagged as an open item for `04_BACKEND`/security review rather than assumed safe.

## Dependencies

- `SEARCH_SPEC.md`

## Relationships

- `UX_PATTERNS.md` — empty-state pattern.

## Constraints

- The special-character/length gap must be resolved before this feature is considered launch-ready — not silently left to whatever the underlying database driver happens to do.

## Acceptance

Every case above has a resolution or an explicitly flagged gap.

## Future Scope

Query sanitization/length limits — see `AI_SECURITY_AGENT.md` for the rule against assuming a "reasonable default" here.
