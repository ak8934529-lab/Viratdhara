---
document_id: MOTION
title: Motion
version: 1.0.0
status: draft
priority: low
depends_on:
  - DESIGN_PHILOSOPHY
related_documents:
  - DESIGN_PHILOSOPHY.md
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Motion

## Why

Documenting real motion rules, not aspirational ones — the design system currently has minimal, functional motion only. This document says what exists rather than inventing an animation language nobody has built.

## What

The current, deliberately minimal motion rules.

## Rules

- **Functional motion only.** Every current transition serves a state change a user needs to perceive (button press feedback, active-tab indication), not decoration.
- `transition-colors` on interactive elements with hover/active states (buttons, chips, list items).
- `active:scale-95` on the FAB (`MobileFab`) for press feedback.
- `scale-105` on the active bottom-nav icon, `transition-transform` — a small, calm indicator, consistent with `DESIGN_PHILOSOPHY.md`'s "calm, not overwhelming."
- No page-transition animation system exists. No component uses `tw-animate-css`'s presets yet, despite the dependency being present.

## Dependencies

- `DESIGN_PHILOSOPHY.md`

## Relationships

None yet.

## Constraints

- New motion must serve a functional purpose (feedback, state indication) per `DESIGN_PHILOSOPHY.md`'s calm principle — not added for visual flourish alone.
- Motion duration/easing values are not yet standardized as tokens; a new transition should stay subtle (comparable to the existing `scale-95`/`scale-105` magnitude) until a real token system for this exists.

## Acceptance

Any new interactive element's motion can be justified as feedback for a specific state change, not decoration.

## Future Scope

`tw-animate-css` is installed but unused — a real motion/animation token system (durations, easings, entrance/exit patterns for sheets and dialogs) has not been designed. This document should be substantially rewritten once that work happens, not incrementally patched.
