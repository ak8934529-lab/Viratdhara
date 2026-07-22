---
document_id: AUTHENTICATION_STATES
title: Authentication — States
version: 1.0.0
status: active
priority: high
depends_on:
  - AUTHENTICATION_SPEC
  - STATE_REGISTRY
related_documents:
  - STATE_REGISTRY.md
related_entities: []
related_components: []
related_events:
  - account_signed_up
  - account_logged_in
owner: Product Architecture
---

# Authentication — States

## Why

This feature is the sole owner of the Authentication Session state machine and the only feature that may trigger its transitions.

## What

This feature implements the Authentication Session machine defined in `STATE_REGISTRY.md` — reproduced here for this feature's context, not redefined.

## Rules

```
logged_out ──(account_logged_in / account_signed_up)──> logged_in
logged_in ──(explicit sign out)──> logged_out
```

- Every other feature reads this state (to gate access, e.g. Recommendation Engine requires `logged_in`) but only Authentication triggers its transitions.
- Onboarding (language/format selection) happens while already `logged_in` — it is not a third session state.

## Dependencies

- `AUTHENTICATION_SPEC.md`, `STATE_REGISTRY.md`

## Relationships

- `EVENT_REGISTRY.md` — `account_signed_up`, `account_logged_in` trigger the `logged_out → logged_in` transition.

## Constraints

- No other feature's document may define its own auth-session-like state. If a feature needs to know "is the user logged in," it reads this state; it does not invent a parallel one.

## Acceptance

Session state is `logged_in` immediately after successful signup or login, and only after successful signup or login.

## Future Scope

None beyond `STATE_REGISTRY.md`'s scope.
