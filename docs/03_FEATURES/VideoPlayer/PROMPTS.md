---
document_id: VIDEOPLAYER_PROMPTS
title: Video Player — Prompts
version: 1.0.0
status: active
priority: low
depends_on:
  - VIDEOPLAYER_README
related_documents:
  - PROMPT_LIBRARY.md
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Video Player — Prompts

## Why

The full-player transport controls are the one piece of this feature not yet a registered component — worth a standing prompt to extract it properly rather than leave it ad hoc.

## What

Feature-specific prompts.

## Prompts

### Implement the full "Playing Now" screen

> Extract transport controls, seek bar, and artwork panel into a named, reusable component and register it in `COMPONENT_REGISTRY.md` — do not leave it as one-off screen markup, per `COMPONENTS.md`. Implement the Playback state machine exactly as in `STATES.md`; do not re-fire `content_played` on resume from pause.

### Resolve an open edge case before shipping

> Network interruption, background audio, and mid-playback content removal (`EDGE_CASES.md`) each need a product decision before this feature ships — surface them, don't implement a guessed default.

## Dependencies

- `VIDEOPLAYER_README.md`, `PROMPT_LIBRARY.md`

## Relationships

- `PROMPT_LIBRARY.md`

## Constraints

None beyond the above.

## Acceptance

An agent given this document extracts a real component rather than duplicating player markup per screen.

## Future Scope

None.
