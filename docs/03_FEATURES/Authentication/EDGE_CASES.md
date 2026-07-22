---
document_id: AUTHENTICATION_EDGE_CASES
title: Authentication — Edge Cases
version: 1.1.0
status: active
priority: high
depends_on:
  - AUTHENTICATION_SPEC
related_documents:
  - VALIDATIONS.md
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Authentication — Edge Cases

## Why

Auth is the one feature where an unhandled edge case blocks every downstream feature, since nothing else works without a valid session.

## What

Known edge cases and their resolution.

## Rules

### Social signup collides with an existing email/password Account

**Condition:** A user signs up via Google using an email that already has a password-based Account.
**Resolution:** Link the social identity to the existing Account rather than creating a duplicate (`VALIDATIONS.md`). The user can subsequently log in via either method.
**Rationale:** Prevents split identity/history for what is really one person.

### Onboarding format option includes "Booking" — resolved

**Condition:** The reviewed Figma design's onboarding format-selection screen includes a "Booking" option alongside "Suno Dekho" and "Live Darshan," carried over from the source design.
**Resolution:** Resolved (Commit 18): **hide the "Booking" option entirely for V1.** Onboarding format selection presents only "Suno Dekho" and "Live Darshan."
**Rationale:** Booking is out of V1 scope (`PRODUCT_VISION.md`, Commit 2.1); a visible option pointing nowhere is worse than removing it, and repurposing it risks confusing users expecting booking functionality.

### `password_minimum` — resolved

**Condition:** A signup/login form needs a client-side password rule to enforce.
**Resolution:** Resolved (Commit 18): 8–128 characters, no forced composition rules, breach-list check if feasible. See `VALIDATION_REGISTRY.md`.
**Rationale:** NIST 800-63B-based default, cited explicitly rather than an arbitrary guess.

### Session expires mid-use — resolved with a default

**Condition:** A `logged_in` session becomes invalid while the user is active in the Main App (token expiry, revoked session).
**Resolution:** Resolved with a standard pattern (Commit 18): attempt a silent token refresh first; if refresh fails, transition to `logged_out` and route to the Auth Area's Login screen (not Signup), preserving the user's last location to return to after re-login if straightforward to implement.
**Rationale:** Standard session-management pattern, not a product-specific business decision — silent refresh minimizes disruption, forced re-login is the safe fallback.

## Dependencies

- `AUTHENTICATION_SPEC.md`

## Relationships

- `VALIDATIONS.md`, `PRODUCT_VISION.md`

## Constraints

- None of the four resolutions above are treated as beyond revision — they're reasonable defaults, not untouchable.

## Acceptance

Each edge case above has a stated resolution — no open gaps remain for this feature.

## Future Scope

None currently open for this feature.
