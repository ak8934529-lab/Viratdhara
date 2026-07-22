---
document_id: CREATORPROFILE_CHANGELOG
title: Creator Profile — Changelog
version: 1.0.0
status: active
priority: low
depends_on:
  - CREATORPROFILE_README
related_documents: []
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Creator Profile — Changelog

| Date | Change | Document(s) |
| --- | --- | --- |
| 2026-07-22 | Initial feature knowledge base created (Milestone 12). Added the `Follow` entity to `DOMAIN_MODEL.md`/`ENTITY_REGISTRY.md` and a `Follow` API group to `API_REGISTRY.md` — a real gap between Milestone 2's product context and Milestone 3's domain model, found and fixed in this pass. Added `creator_followed`/`creator_unfollowed` to `EVENT_REGISTRY.md`. Flagged 2 open gaps: role-revocation cleanup, account-deletion cascade — both depend on features not yet built. | All 13 files + DOMAIN_MODEL.md, ENTITY_REGISTRY.md, API_REGISTRY.md, EVENT_REGISTRY.md |
