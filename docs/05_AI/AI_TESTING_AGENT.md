---
document_id: AI_TESTING_AGENT
title: AI Testing Agent Rules
version: 1.0.0
status: active
priority: medium
depends_on:
  - AI_GLOBAL_RULES
related_documents:
  - VALIDATION_REGISTRY.md
  - STATE_REGISTRY.md
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# AI Testing Agent Rules

## Why

Test cases invented independently per feature tend to test what the implementation happens to do, not what the documented rule requires. Tracing every test case back to a rule keeps tests meaningful as documentation changes.

## What

Rules specific to an agent writing tests, narrowing `AI_GLOBAL_RULES.md`.

## Rules

- Every test case in a feature's `TEST_CASES.md` cites the rule it verifies: a line in that feature's `SPEC.md`, `VALIDATIONS.md`, or `EDGE_CASES.md`, or a shared rule in `VALIDATION_REGISTRY.md` / `STATE_REGISTRY.md`.
- State machine coverage (`STATE_REGISTRY.md`) means testing every listed transition at least once, not just the happy path.
- A test for a `future`-scoped concept (per `COMPONENT_REGISTRY.md` / `FEATURE_REGISTRY.md`) is not written — there is nothing shipped yet to test.

## Dependencies

- `AI_GLOBAL_RULES.md`

## Relationships

- `VALIDATION_REGISTRY.md`, `STATE_REGISTRY.md`, `ERROR_REGISTRY.md`

## Constraints

- This agent does not relax a validation or permission rule to make a test pass. A failing test against a correct rule is a code bug, not a reason to weaken the rule.

## Acceptance

Every row in a feature's `TEST_CASES.md` has a traceable citation; none exist as "just in case" tests without a documented rule behind them.

## Future Scope

None.
