---
document_id: CONTENTDISCOVERY_CHANGELOG
title: Content Discovery — Changelog
version: 1.1.0
status: active
priority: low
depends_on:
  - CONTENTDISCOVERY_README
related_documents: []
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Content Discovery — Changelog

| Date | Change | Document(s) |
| --- | --- | --- |
| 2026-07-23 | Resolved both open gaps (Commit 18), as a direct consequence of Recommendation Engine's placeholder heuristic resolution: Recommendation-fallback is automatic (the heuristic always returns something); Home's featured section uses Recommendation Engine output directly, no separate editorial curation in V1. | `SPEC.md`, `EDGE_CASES.md`, `TEST_CASES.md` |
| 2026-07-22 | Initial feature knowledge base created (Milestone 16). Clarified Home's temple-live carousel (as visually reviewed in Figma) is out of scope per the V1 booking exclusion — this feature's actual Home composition is narrower than what was originally designed. Flagged 2 open gaps: Recommendation-fallback behavior, Home's featured-content source. | All 13 files |
