---
document_id: AUTHENTICATION_SPEC
title: Authentication — Specification
version: 1.1.0
status: active
priority: critical
depends_on:
  - AUTHENTICATION_README
related_documents:
  - PERMISSION_MATRIX.md
  - STATE_REGISTRY.md
related_entities:
  - Account
related_components: []
related_events:
  - account_signed_up
  - account_logged_in
owner: Product Architecture
---

# Authentication — Specification

## Why

Signup and login are the two paths that create the one thing every other feature depends on: an authenticated Account.

## What

Functional behavior for signup, login, session, and onboarding.

## Rules

### Signup

- An Account may be created via: email + password, or a social provider (Google, Facebook, Apple), per the reviewed design's "Continue with Google/Facebook/Apple" options.
- A new Account is granted the User role by default (`DOMAIN_MODEL.md` — Creator/Administrator are additive, granted separately, out of this feature's scope).
- Successful signup emits `account_signed_up` (`EVENT_REGISTRY.md`) and immediately transitions the session to `logged_in` (`STATE_REGISTRY.md`).
- Signup is followed by onboarding: language selection, then content-format selection — **"Suno Dekho" and "Live Darshan" only** (resolved, Commit 18: the reviewed design's third "Booking" option is hidden entirely for V1 — see `EDGE_CASES.md`).

### Login

- An existing Account authenticates via email + password or the same social providers used at signup.
- Successful login emits `account_logged_in` and transitions session to `logged_in`.
- Login does not repeat onboarding — onboarding is a one-time, post-signup flow only.

### Session

- Session state is exactly the two states in `STATE_REGISTRY.md`'s Authentication Session machine: `logged_out`, `logged_in`. No "guest"/partial-auth state exists in V1.
- Explicit logout transitions `logged_in` → `logged_out` and returns the user to the Auth Area.

## Dependencies

- `AUTHENTICATION_README.md`

## Relationships

- `PERMISSION_MATRIX.md` — the User role every new Account receives.
- `STATE_REGISTRY.md` — Authentication Session machine, referenced not redefined.
- `EVENT_REGISTRY.md` — `account_signed_up`, `account_logged_in`.

## Constraints

- No feature may treat "signed up" and "logged in" as the same event for analytics purposes — they are distinct, per `EVENT_REGISTRY.md`.
- No third auth method beyond email/password and the three named social providers is implemented without updating this document first.

## Acceptance

A new Account can complete signup → onboarding → Main App, and an existing Account can complete login → Main App, both ending in `logged_in` session state.

## Future Scope

Password reset and MFA are not specified — see `AUTHENTICATION_README.md` Future Scope.
