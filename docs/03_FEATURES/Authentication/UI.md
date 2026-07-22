---
document_id: AUTHENTICATION_UI
title: Authentication — UI
version: 1.0.0
status: active
priority: high
depends_on:
  - AUTHENTICATION_SPEC
  - NAVIGATION_MODEL
  - LAYOUT_SYSTEM
related_documents:
  - URL_STRUCTURE.md
  - INFORMATION_ARCHITECTURE.md
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Authentication — UI

## Why

Auth Area screens (`INFORMATION_ARCHITECTURE.md`) have different chrome rules than Main App screens — no bottom nav, a linear (not tab-based) flow — and need that stated once for this feature rather than re-derived per screen.

## What

The screens this feature owns and their route mapping.

## Rules

| Screen | Route (`URL_STRUCTURE.md`) | Notes |
| --- | --- | --- |
| Splash | `/` (unauthenticated) | Brand mark, "Begin your Dhara" CTA. |
| Get Started | (part of splash flow) | Social continue buttons + "Get Started" CTA + "New here? Create your Dhara Account". |
| Login | `/login` | Email/password fields, remember-me, social continue row. |
| Signup | `/signup` | Not fully detailed in the reviewed design beyond the social-first "Get Started" path; email/password signup form follows the same field set as Login. |
| Onboarding — Language | `/onboarding/language` | `MobileSegmentedListItem`-style option list (Hindi, English, Punjabi, etc.). |
| Onboarding — Format | `/onboarding/format` | Options: "Suno Dekho", "Live Darshan", "Booking" — see `EDGE_CASES.md` re: the Booking option. |

## Dependencies

- `AUTHENTICATION_SPEC.md`, `NAVIGATION_MODEL.md`, `LAYOUT_SYSTEM.md`

## Relationships

- All screens use `MobileAppShell` / `MobileMain` / `PageScroll` (`LAYOUT_SYSTEM.md`) with no `MobileTopBar`/`MobileBottomNav` — Auth Area has no persistent chrome (`INFORMATION_ARCHITECTURE.md`).
- `apps/showcase/src/pages/screens/LoginScreen.tsx` is an existing recreation of the Login screen, built during Milestone 5-era design-system work — it should be treated as a reference implementation to reconcile against once this feature is actually implemented, not a second source of truth alongside this document.

## Constraints

- No screen in this feature renders a bottom nav or top bar with a back arrow into Main App — the Auth Area flow is linear (splash → login/signup → onboarding → Main App), not a pushed/detail navigation pattern.

## Acceptance

Every screen in the table above exists as a route in `URL_STRUCTURE.md` and uses only the Auth Area layout pattern.

## Future Scope

A dedicated Signup screen distinct from Login's field layout has not been fully designed in the reviewed Figma file — only the social-first "Get Started" path is detailed. This is a known design gap.
