---
document_id: AUTHENTICATION_PROMPTS
title: Authentication — Prompts
version: 1.0.0
status: active
priority: low
depends_on:
  - AUTHENTICATION_README
related_documents:
  - PROMPT_LIBRARY.md
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Authentication — Prompts

## Why

Implementing Authentication touches nearly every registry in `01_ARCHITECTURE` at once (entities, states, events, validations, permissions) — a feature-specific prompt keeps an implementing agent from missing one.

## What

Canonical prompts specific to this feature. Generic repository-wide prompts (starting a feature KB, adding a component) live in `PROMPT_LIBRARY.md`, not here.

## Prompts

### Implement a screen from `UI.md`

> Build the screen using only components listed in `COMPONENTS.md`. Confirm it uses no bottom nav or back-arrow top bar — Auth Area screens are linear, per `NAVIGATION_MODEL.md`. Reconcile against `apps/showcase/src/pages/screens/LoginScreen.tsx` if the screen is Login.

### Implement signup/login validation

> Implement `email_format` from `VALIDATION_REGISTRY.md` exactly. Do not implement `password_minimum` with an assumed rule — flag it as an open gap per `EDGE_CASES.md` and stop there.

### Resolve the "Booking" onboarding option gap

> This requires a product decision, not an implementation guess. Surface the two options from `EDGE_CASES.md` (hide the option vs. repurpose it) and wait for a decision before writing the routing behavior.

## Dependencies

- `AUTHENTICATION_README.md`, `PROMPT_LIBRARY.md`

## Relationships

- `PROMPT_LIBRARY.md`

## Constraints

- A prompt here must not encode a resolution to an open gap (`password_minimum`, the Booking option) — those stay flagged, not quietly decided via a prompt.

## Acceptance

An agent given only this document and the rest of the feature's KB can implement Authentication's screens and validation without needing to ask where a component or rule comes from.

## Future Scope

Grows if password reset/MFA are added to scope.
