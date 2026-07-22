---
document_id: ADVERTISEMENTS_CHANGELOG
title: Advertisements — Changelog
version: 1.1.0
status: active
priority: low
depends_on:
  - ADVERTISEMENTS_README
related_documents: []
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Advertisements — Changelog

| Date | Change | Document(s) |
| --- | --- | --- |
| 2026-07-23 | Resolved both open gaps with tunable starting defaults (Commit 18): one ad per Video Player session; skip available after 5 seconds. Explicitly noted as monetization-tuning parameters to revisit with real data, not fixed law. | `SPEC.md`, `STATES.md`, `EDGE_CASES.md`, `TEST_CASES.md` |
| 2026-07-22 | Initial feature knowledge base created (Milestone 14), scoped to "Ads Between video" (pre-roll on Video Player sessions) per `MASTER_PRD.md`, narrower than `FEATURE_REGISTRY.md`'s general Advertisements entry. Flagged 2 open gaps: placement frequency, skip timing. | All 13 files |
