---
document_id: VIDEOPLAYER_CHANGELOG
title: Video Player — Changelog
version: 1.2.0
status: active
priority: low
depends_on:
  - VIDEOPLAYER_README
related_documents: []
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Video Player — Changelog

| Date | Change | Document(s) |
| --- | --- | --- |
| 2026-07-26 | Milestone 25 — **the "Playing Now" tab and its `/playing-now` route were removed by explicit product direction**; playback is now composed inside `/content/:id` via `PlaybackStage`, which is not a route or tab of its own. No bottom-nav tab belongs to this feature and none is playback-driven; what keeps a session reachable is the docked mini player, whose visibility is what the Playback machine now governs (the state machine itself is unchanged). **The surface is video-only**: one 16:9 `<video>` element for both Content types, with an Audio item's generated artwork supplied as the `poster` frame — the separate square-artwork audio layout was removed in favour of a single player shape. The transport row (shuffle, previous, play/pause, next, repeat, add-to-playlist) sits below the player because native video controls cover play/pause and seeking but not track stepping; the transport-controls extraction left open on 2026-07-23 is closed by `PlaybackStage`, which owns that row and the poster frame but no seek bar. **Two items OPEN, neither settled here**: the lyrics/detail panel is still specified "where applicable" but belonged to the removed audio layout and is **not currently rendered anywhere**; and `EDGE_CASES.md`'s app-backgrounding resolution (Audio continues in the background, Video pauses) split behaviour by Content type on the assumption of two presentations, which one shared `<video>` element no longer expresses — whether that rule still holds is a product decision, deliberately not answered in this pass. See root `CHANGELOG.md` Milestone 25. | `UI.md`, `COMPONENTS.md`, `STATES.md`, `README.md`, `PROMPTS.md` |
| 2026-07-23 | Resolved all 3 open gaps (Commit 18): network interruption gets stall-indicator + backoff-retry; Audio continues in background, Video pauses; moderated Content finishes its current session but blocks new ones. The full-player transport-controls extraction (`COMPONENTS.md`) remains a separate, still-open implementation task. | `EDGE_CASES.md`, `TEST_CASES.md` |
| 2026-07-22 | Initial feature knowledge base created (Milestone 10). Flagged 3 open gaps: network-interruption handling, background audio playback, mid-playback content removal behavior. Noted the full-player transport controls need extraction into a registered component. | All 13 files |
