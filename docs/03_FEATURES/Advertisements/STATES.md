---
document_id: ADVERTISEMENTS_STATES
title: Advertisements — States
version: 1.0.0
status: active
priority: low
depends_on:
  - ADVERTISEMENTS_SPEC
related_documents:
  - STATE_REGISTRY.md
related_entities: []
related_components: []
related_events:
  - ad_impression
owner: Product Architecture
---

# Advertisements — States

## Why

The ad presentation has a small, feature-local lifecycle worth naming for implementation clarity.

## What

A feature-local ad presentation state — not added to `STATE_REGISTRY.md` since it's not cross-feature.

## Rules

```
none ──(ad selected)──> loading
loading ──(ad ready)──> showing (fires ad_impression)
loading ──(no ad available / load failure)──> skipped_unavailable
showing ──(skip tapped or duration elapsed)──> dismissed
dismissed/skipped_unavailable ──> Video Player session begins (STATE_REGISTRY.md Playback: idle → playing)
```

## Dependencies

- `ADVERTISEMENTS_SPEC.md`

## Relationships

- `STATE_REGISTRY.md` — Playback begins immediately after this machine reaches its terminal states.

## Constraints

- `skipped_unavailable` never blocks the Video Player session from starting — an ad failure/absence must not prevent Content playback.

## Acceptance

Every state above has correct handling; a failed/unavailable ad never blocks playback.

## Future Scope

None.
