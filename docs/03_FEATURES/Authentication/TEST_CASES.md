---
document_id: AUTHENTICATION_TEST_CASES
title: Authentication — Test Cases
version: 1.0.0
status: active
priority: medium
depends_on:
  - AUTHENTICATION_SPEC
  - AUTHENTICATION_VALIDATIONS
  - AUTHENTICATION_EDGE_CASES
related_documents: []
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Authentication — Test Cases

## Why

Every case below traces to a rule in `SPEC.md`, `VALIDATIONS.md`, or `EDGE_CASES.md` — none exist as speculative "just in case" coverage, per `AI_TESTING_AGENT.md`.

## What

Test cases for this feature.

## Test Cases

| # | Case | Traces To | Expected |
| --- | --- | --- | --- |
| 1 | Sign up with valid email + password | `SPEC.md` Signup | Account created, `account_signed_up` emitted, session `logged_in`, onboarding shown |
| 2 | Sign up with malformed email | `VALIDATIONS.md` `email_format` | `VALIDATION_FAILED` |
| 3 | Sign up with already-registered email | `VALIDATIONS.md` Email uniqueness | `CONFLICT` |
| 4 | Sign up via Google with email matching an existing password Account | `EDGE_CASES.md` Social collision | Links to existing Account, no duplicate created |
| 5 | Log in with correct credentials | `SPEC.md` Login | `account_logged_in` emitted, session `logged_in`, no onboarding shown |
| 6 | Log in with incorrect password | `SPEC.md` Login | `UNAUTHENTICATED`, session remains `logged_out` |
| 7 | Log out | `STATES.md` | Session transitions `logged_in → logged_out` |
| 8 | Select "Booking" onboarding option | `EDGE_CASES.md` Booking option | Does not route to a booking flow (exact behavior pending product decision — test should assert "does not crash / does not reach a booking screen," not a specific fallback until decided) |

## Dependencies

- `AUTHENTICATION_SPEC.md`, `AUTHENTICATION_VALIDATIONS.md`, `AUTHENTICATION_EDGE_CASES.md`

## Relationships

None beyond the above.

## Constraints

- Test case 8 cannot be finalized until the "Booking" onboarding option's product decision (`EDGE_CASES.md`) is made — it stays a placeholder assertion until then.

## Acceptance

All 8 cases pass before this feature is considered implementation-complete, with case 8 revisited once its open decision resolves.

## Future Scope

Password reset and MFA test cases are not listed — not in scope, per `README.md` Future Scope.
