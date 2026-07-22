---
document_id: VIDEOPLAYER_EDGE_CASES
title: Video Player — Edge Cases
version: 1.1.0
status: active
priority: high
depends_on:
  - VIDEOPLAYER_SPEC
related_documents: []
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Video Player — Edge Cases

## Why

Playback is long-running and interruptible in ways a stateless screen isn't — network loss, app backgrounding, and content disappearing mid-session all need a stated behavior.

## What

Known edge cases and their resolution.

## Rules

### Network interruption during playback — resolved

**Condition:** Connectivity drops while `playing`.
**Resolution:** Resolved (Commit 18, standard pattern): show a stalled indicator, auto-retry with exponential backoff (e.g. 1s, 2s, 4s, capped) up to a bounded number of attempts; if retries are exhausted, transition to an explicit error state with a manual "Retry" action. Playback position is preserved across the interruption.
**Rationale:** Standard media-playback resilience pattern, not a Viratdhara-specific business decision.

### App backgrounded during audio playback — resolved

**Condition:** User backgrounds the app (or switches browser tab) while an Audio item plays.
**Resolution:** Resolved (Commit 18): **Audio continues playing in the background**; Video pauses when backgrounded and does not auto-resume on foreground (resumes only on explicit user action).
**Rationale:** Matches near-universal user expectation for audio/music apps (background listening is core to the "Suno" experience), while video pausing on background matches standard video-app behavior and avoids unexpected data/battery use for content the user isn't watching.

### Content removed/moderated mid-playback — resolved

**Condition:** A Content item transitions to `removed_by_creator`/`removed_by_moderation` (`STATE_REGISTRY.md`) while a user is actively playing it.
**Resolution:** Resolved (Commit 18): the current playback session is allowed to finish uninterrupted (not yanked away mid-listen/watch); the item becomes unavailable for any new playback session immediately after moderation/removal takes effect.
**Rationale:** Kinder UX than an abrupt mid-session stop; the removal's practical effect (no new plays) still takes hold immediately.

## Dependencies

- `VIDEOPLAYER_SPEC.md`

## Relationships

None beyond the above.

## Constraints

- All three resolutions above are defaults grounded in standard patterns/product-genre norms, not untouchable — revisit if real usage reveals a problem.

## Acceptance

Each edge case above has a stated resolution — no open gaps remain for this feature.

## Future Scope

None currently open for this feature.
