---
document_id: AUTHENTICATION_CHANGELOG
title: Authentication — Changelog
version: 1.1.0
status: active
priority: low
depends_on:
  - AUTHENTICATION_README
related_documents: []
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Authentication — Changelog

History of changes to this feature's documentation. One entry per change, newest first.

| Date | Change | Document(s) |
| --- | --- | --- |
| 2026-07-23 | Resolved all open gaps (Commit 18): `password_minimum` set to NIST 800-63B-based default; "Booking" onboarding option hidden entirely for V1; session-expiry handling set to silent-refresh-then-re-login. | `SPEC.md`, `VALIDATIONS.md`, `EDGE_CASES.md`, `TEST_CASES.md`, `VALIDATION_REGISTRY.md` |
| 2026-07-22 | Initial feature knowledge base created (Milestone 6). Flagged two open gaps: `password_minimum` rule unspecified, "Booking" onboarding option needs a product decision. | All 13 files |
