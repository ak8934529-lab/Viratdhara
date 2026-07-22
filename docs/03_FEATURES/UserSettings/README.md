---
document_id: USERSETTINGS_README
title: User Settings — Overview
version: 1.0.0
status: active
priority: medium
depends_on:
  - AUTHENTICATION_README
  - FEATURE_REGISTRY
related_documents:
  - USERSETTINGS_SPEC.md
related_entities:
  - Account
related_components: []
related_events: []
owner: Product Architecture
---

# User Settings

## Why

An Account's non-credential settings (notification preferences, subscription status, downloads, account info display) need one owner distinct from Authentication, which owns only the credential/session surface.

## What

This feature owns the Settings screen and its sub-screens: Account info (read/edit display info), Notifications preferences, Downloads management, Subscriptions. The reviewed Figma design shows all four as distinct sub-screens under one Settings entry point.

## Documents in This Feature

| Document | Purpose |
| --- | --- |
| `SPEC.md` | Functional specification |
| `UI.md` | Settings screen and its 4 sub-screens |
| `COMPONENTS.md` | `MobileListItem`-based settings rows |
| `API.md` | Read/update Account settings |
| `DATABASE.md` | Account fields this feature owns |
| `STATES.md` | None owned |
| `VALIDATIONS.md` | Settings field validation |
| `EVENTS.md` | Settings-change events |
| `EDGE_CASES.md` | Subscription state edge cases, downloads storage limits |
| `TEST_CASES.md` | Test cases traced to the above |
| `PROMPTS.md` | Canonical prompts for implementing this feature |
| `CHANGELOG.md` | History of changes to this feature's documentation |

## Dependencies

- `AUTHENTICATION_README.md` — this feature requires a `logged_in` session for everything it does.

## Relationships

- `PERMISSION_MATRIX.md` — "Manage own account settings" capability, already listed there for all three roles.

## Constraints

- This feature does not own credential changes (password/email change, social-provider linking) — that remains Authentication's concern, even though it's reached via the Settings entry point in the reviewed design. If credential-change screens are built, they belong in `Authentication`'s KB, cross-referenced from here.
- This feature does not implement actual payment processing for Subscriptions — see `EDGE_CASES.md`.

## Acceptance

An Account can view and update their notification preferences, manage downloads, and view subscription status.

## Future Scope

Actual payment/billing integration for Subscriptions is not specified.
