---
document_id: AUTHENTICATION_README
title: Authentication — Overview
version: 1.0.0
status: active
priority: critical
depends_on:
  - PRODUCT_CONTEXT
  - FEATURE_REGISTRY
related_documents:
  - AUTHENTICATION_SPEC.md
  - DOMAIN_MODEL.md
related_entities:
  - Account
related_components:
  - MobileBrandMark
related_events:
  - account_signed_up
  - account_logged_in
owner: Product Architecture
---

# Authentication

## Why

Every other V1 feature (`FEATURE_REGISTRY.md`) depends on Authentication existing first — `DEPENDENCY_GRAPH.md` marks it as the one feature with no feature dependency of its own. Content Discovery, Recommendation Engine, Creator Studio, Creator Profile, and User Settings all require a known Account.

## What

Authentication owns: Account creation (signup), session establishment (login), session termination (logout), and the onboarding steps that follow first signup (language selection, content-format selection). It does not own Account settings beyond auth credentials — that's User Settings — and does not own Role assignment beyond the default User role every Account gets (Creator/Administrator role grants are an Administrator action, out of scope here and undocumented until `07_SECURITY`/an admin feature exists).

## Documents in This Feature

| Document | Purpose |
| --- | --- |
| `SPEC.md` | Functional specification: signup, login, session, onboarding |
| `UI.md` | Screens and layout rules |
| `COMPONENTS.md` | Components used |
| `API.md` | Auth API group detail |
| `DATABASE.md` | Account entity fields owned by this feature |
| `STATES.md` | Authentication Session state machine (references `STATE_REGISTRY.md`) |
| `VALIDATIONS.md` | Signup/login validation rules |
| `EVENTS.md` | `account_signed_up`, `account_logged_in` |
| `EDGE_CASES.md` | Social-auth collisions, undefined password policy, session expiry |
| `TEST_CASES.md` | Test cases traced to the above |
| `PROMPTS.md` | Canonical prompts for implementing this feature |
| `CHANGELOG.md` | History of changes to this feature's documentation |

## Dependencies

- `DOMAIN_MODEL.md` — the `Account` entity this feature creates and authenticates.
- `INFORMATION_ARCHITECTURE.md` — the Auth Area structural area this feature's screens belong to.

## Relationships

- Every other V1 feature depends on this one (`DEPENDENCY_GRAPH.md`).
- `NAVIGATION_MODEL.md` — Auth Area screens have no bottom nav, unlike Main App.

## Constraints

- This feature does not implement Creator or Administrator role assignment.
- This feature does not implement password reset flows yet — not present in the reviewed design, not assumed.

## Acceptance

An Account can be created, can log in, can log out, and completes onboarding (language + format selection) before reaching the Main App.

## Future Scope

Password reset, multi-factor authentication, and account deletion are not part of V1 — added only if a real requirement and design exist for them.
