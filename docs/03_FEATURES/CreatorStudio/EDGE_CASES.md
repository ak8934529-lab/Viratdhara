---
document_id: CREATORSTUDIO_EDGE_CASES
title: Creator Studio — Edge Cases
version: 1.0.0
status: active
priority: medium
depends_on:
  - CREATORSTUDIO_SPEC
related_documents: []
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Creator Studio — Edge Cases

## Why

A brand-new Creator with zero published Content, and an item that's been moderated away, are the two conditions most likely to break a naive implementation.

## What

Known edge cases and their resolution.

## Rules

### New Creator with no Content yet

**Condition:** A Creator's first visit to Studio home/analytics.
**Resolution:** `MobileEmptyState` prompting to create first Content — never a blank/broken analytics screen.

### Analytics for zero-activity Content

**Condition:** A published item with no views/plays yet.
**Resolution:** Shows zero counts explicitly, not an empty/missing state — zero is a valid, real value here, distinct from "no Content exists."

### Content removed by moderation

**Condition:** A Creator's item was moderated away (`removed_by_moderation`).
**Resolution:** Shown in Content management as visibly moderated (distinct from the Creator's own `removed_by_creator` items), read-only, per `STATES.md`.

### Publishing with missing required fields

**Condition:** Creator attempts to publish without a title or Category set.
**Resolution:** Blocked with `VALIDATION_FAILED`, per `VALIDATIONS.md` — publish action is disabled/rejected, not silently defaulted.

## Dependencies

- `CREATORSTUDIO_SPEC.md`

## Relationships

- `UX_PATTERNS.md`, `VALIDATIONS.md`, `STATES.md`

## Constraints

- Zero-activity analytics must never be confused with a missing/error analytics state.

## Acceptance

Each case above has a designed, correct treatment.

## Future Scope

None.
