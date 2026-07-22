---
document_id: AUTHENTICATION_EDGE_CASES
title: Authentication — Edge Cases
version: 1.0.0
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

Auth is the one feature where an unhandled edge case (a duplicate Account, a stuck onboarding option) blocks every downstream feature, since nothing else works without a valid session.

## What

Known edge cases and their resolution.

## Rules

### Social signup collides with an existing email/password Account

**Condition:** A user signs up via Google using an email that already has a password-based Account.
**Resolution:** Link the social identity to the existing Account rather than creating a duplicate (`VALIDATIONS.md`). The user can subsequently log in via either method.
**Rationale:** Prevents split identity/history for what is really one person.

### Onboarding format option includes "Booking"

**Condition:** The reviewed Figma design's onboarding format-selection screen includes a "Booking" option alongside "Suno Dekho" and "Live Darshan," carried over from the source design.
**Resolution:** The option may remain visible for design consistency with the reference, but must not route to any real booking flow — booking is out of V1 scope (`PRODUCT_VISION.md`). Selecting it should either be hidden entirely for V1 or fall back to the default content experience. This is flagged, not silently resolved — a product decision is needed on whether to hide it or repurpose it.
**Rationale:** Directly follows from the Commit 2.1 scope decision; an unresolved onboarding option pointing nowhere is worse than removing it.

### `password_minimum` has no specified rule

**Condition:** A signup/login form needs a client-side password rule to enforce, but `VALIDATION_REGISTRY.md` leaves this unspecified.
**Resolution:** Do not implement an assumed rule. Surface this as a blocking gap for product/security to resolve before signup validation is finalized.
**Rationale:** `AI_GLOBAL_RULES.md` — never invent a business rule to fill a gap.

### Session expires mid-use

**Condition:** A `logged_in` session becomes invalid while the user is active in the Main App (token expiry, revoked session).
**Resolution:** Not yet specified — no re-authentication flow (silent refresh vs. forced re-login) has been designed.
**Rationale:** Flagged as an open gap rather than assumed.

## Dependencies

- `AUTHENTICATION_SPEC.md`

## Relationships

- `VALIDATIONS.md`, `PRODUCT_VISION.md`

## Constraints

- No edge case above may be "resolved" by an implementation detail invented ad hoc during coding — the ones marked as gaps stay open until a product decision is recorded.

## Acceptance

Each edge case above has either a stated resolution or an explicitly flagged open gap — none are silently unhandled.

## Future Scope

The "Booking" onboarding option and session-expiry handling both need explicit product decisions before this feature is considered complete.
