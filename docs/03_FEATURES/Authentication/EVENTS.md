---
document_id: AUTHENTICATION_EVENTS
title: Authentication — Events
version: 1.0.0
status: active
priority: medium
depends_on:
  - AUTHENTICATION_SPEC
  - EVENT_REGISTRY
related_documents:
  - EVENT_REGISTRY.md
related_entities: []
related_components: []
related_events:
  - account_signed_up
  - account_logged_in
owner: Product Architecture
---

# Authentication — Events

## Why

This feature is the sole emitter of the two identity-lifecycle events every other feature's analytics may reference.

## What

Events this feature emits, both already defined in `EVENT_REGISTRY.md`.

## Rules

| Event | Emitted When |
| --- | --- |
| `account_signed_up` | A new Account completes signup (email/password or social). |
| `account_logged_in` | An existing Account completes login (email/password or social). |

- No new event name is introduced for logout, onboarding-step-completed, or auth-method-chosen without adding it to `EVENT_REGISTRY.md` first.

## Dependencies

- `AUTHENTICATION_SPEC.md`, `EVENT_REGISTRY.md`

## Relationships

- `STATES.md` — these events trigger the `logged_out → logged_in` transition.

## Constraints

- Neither event fires more than once per signup/login attempt, including on retry after a failed attempt.

## Acceptance

`account_signed_up` fires exactly once per new Account; `account_logged_in` fires exactly once per successful login.

## Future Scope

Onboarding-step completion events (language chosen, format chosen) are not yet in `EVENT_REGISTRY.md` — add them there first if analytics on onboarding drop-off becomes a need.
