---
document_id: ADVERTISEMENTS_EDGE_CASES
title: Advertisements — Edge Cases
version: 1.1.0
status: active
priority: medium
depends_on:
  - ADVERTISEMENTS_SPEC
related_documents: []
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Advertisements — Edge Cases

## Why

An ad is a third-party-adjacent dependency (inventory, selection) that can fail or be unavailable in ways core Content never is — this must never block the actual product experience (playback).

## What

Known edge cases and their resolution.

## Rules

### No Advertisement available

**Condition:** Ad selection returns nothing.
**Resolution:** Skip straight to Video Player session start (`STATES.md` `skipped_unavailable`) — never a blocking error, never an empty ad-shaped placeholder.

### Advertisement fails to load

**Condition:** An ad was selected but fails to render/load.
**Resolution:** Same as no-ad-available — proceed to Content, do not block.

### Placement frequency — resolved with a starting default

**Condition:** Whether every Video Player session shows an ad, or only some (e.g. every Nth session, time-based).
**Resolution:** Resolved (Commit 18): **one ad per Video Player session** (every session, pre-roll) as the V1 starting point — the simplest rule to implement and reason about.
**Rationale:** This is a monetization-tuning parameter, not a fixed product law — treat it as a starting default to be adjusted once real usage/revenue data exists, not a permanent decision. Flagged clearly as such rather than left unspecified, since "every session" is still a concrete, testable behavior.

### Skip timing — resolved with a starting default

**Condition:** Whether the skip control appears immediately or after a countdown, and how long.
**Resolution:** Resolved (Commit 18): **skip control becomes available after 5 seconds.**
**Rationale:** Consistent with `PRODUCT_PHILOSOPHY.md`'s calm principle (short forced view, not a long ad-gate); 5 seconds is a common, unaggressive industry default. Same caveat as placement frequency — a tunable starting point, not fixed forever.

## Dependencies

- `ADVERTISEMENTS_SPEC.md`

## Relationships

- `PRODUCT_PHILOSOPHY.md`

## Constraints

- The two failure cases (no ad / load failure) must never block Content access — this is a hard constraint.
- Placement frequency and skip timing are tunable parameters, not hardcoded product law — an eventual Administrator ad-config tool (not yet built) should be able to adjust both without a documentation/code change.

## Acceptance

Ad unavailability/failure never prevents playback; placement is one-per-session and skip is available at 5 seconds, both as adjustable defaults.

## Future Scope

Both defaults should be revisited with real usage/revenue data once the feature is live — see Constraints re: eventual configurability.
