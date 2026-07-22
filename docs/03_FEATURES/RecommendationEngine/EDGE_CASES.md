---
document_id: RECOMMENDATIONENGINE_EDGE_CASES
title: Recommendation Engine — Edge Cases
version: 1.1.0
status: active
priority: high
depends_on:
  - RECOMMENDATIONENGINE_SPEC
related_documents: []
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Recommendation Engine — Edge Cases

## Why

Personalization inherently fails on a brand-new Account with no history — the "cold start" problem — and the algorithm itself is undefined, both worth naming explicitly.

## What

Known edge cases and their resolution.

## Rules

### Ranking algorithm — resolved with an explicit V1 placeholder heuristic

**Condition:** No document specified how Content is selected/ranked into Recommendations for a given Account.
**Resolution:** Resolved (Commit 18) with a deliberately simple, clearly-labeled **placeholder heuristic** — explicitly not a real recommendation system:

1. If the Account has playback/view history: recommend the most-recently-published `published` Content whose Category matches a Category the Account has previously viewed/played, ordered by publish recency.
2. If the Account has no history ("cold start") or step 1 yields fewer than a usable minimum: fall back to the most-recently-published `published` Content across all Categories, ordered by publish recency.

**Rationale:** This is a real, implementable, deterministic rule — not a business decision requiring product input, and not a genuine ML/collaborative-filtering system either. It exists so `apps/web` can be built and demoed end-to-end without an open dependency on a data-science project. It is explicitly temporary.

### Insufficient Content volume

**Condition:** Too few `published` Content items exist to generate meaningful personalized recommendations.
**Resolution:** Same fallback as cold start (step 2 above) — most-recently-published Content across all Categories.

## Dependencies

- `RECOMMENDATIONENGINE_SPEC.md`

## Relationships

None beyond the above.

## Constraints

- The placeholder heuristic must be labeled as a placeholder everywhere it's referenced (code comments, this document) — it must never be presented as real personalization to stakeholders or users.
- Replacing it with a real ranking system (collaborative filtering, ML-based, etc.) is a substantial follow-on project, not a documentation change — this resolution unblocks structural/demo work, it does not close the real data-science work.

## Acceptance

Cold-start and low-volume cases both resolve to the same deterministic fallback; the primary case uses the Category-recency heuristic. No case is left unhandled.

## Future Scope

Replacing the placeholder heuristic with a real recommendation system is a substantial, separate engineering effort — likely warranting its own dedicated scoping pass, not a quick follow-up.
