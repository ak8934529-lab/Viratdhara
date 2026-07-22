---
document_id: USERSETTINGS_SPEC
title: User Settings — Specification
version: 1.1.0
status: active
priority: medium
depends_on:
  - USERSETTINGS_README
related_documents: []
related_entities:
  - Account
related_components: []
related_events: []
owner: Product Architecture
---

# User Settings — Specification

## Why

The reviewed design shows a Settings hub with sub-screens but no explicit specification of what's stored vs. what's presentation.

## What

Four sub-surfaces under the Settings entry point.

## Rules

### Account

- Displays Account info (display name, email — read-only here; email/password change is Authentication's concern per `README.md` Constraints).

### Notifications

- Toggles for exactly 3 V1 notification categories (resolved, Commit 18):
  1. **New content from followed Creators** — a Content item is published by a Creator the Account follows (`Follow`, `DOMAIN_MODEL.md`).
  2. **Engagement on your activity** — replies/interactions related to the Account's own activity (Playlist, Follow-back, etc. as those concepts exist).
  3. **Product & platform announcements** — Viratdhara-initiated communication, not per-Content.
- Each toggle is independently persisted per Account. All three default to enabled.

### Downloads

- Lists downloaded Content for offline access, with a per-item remove action.
- **No storage limit is enforced in V1** (resolved, Commit 18) — no cap on count or size. No storage-usage indicator is required since there's no limit to show progress against. Revisit if real usage patterns make this a problem.
- Actual download/offline-playback mechanism is not specified here — this feature owns the management UI for downloads, not the offline-storage/sync implementation, which would be a Video Player or platform-level concern if built.

### Subscriptions

- **Deliberately deferred in full** (Commit 18, user decision) — no tier structure, pricing, or even a placeholder is specified. This sub-screen's scope is limited to whatever payment-integration scoping produces later; do not build a Buy/Upgrade flow against an invented tier structure.

## Dependencies

- `USERSETTINGS_README.md`

## Relationships

None beyond `Account`.

## Constraints

- No credential field (password, email) is editable directly in this feature's screens.

## Acceptance

Each of the four sub-screens presents accurate current Account state and persists changes correctly.

## Future Scope

Whether offline downloads are actually implemented (vs. just a management UI placeholder) is unconfirmed — see `EDGE_CASES.md`.
