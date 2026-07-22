---
document_id: USERSETTINGS_SPEC
title: User Settings — Specification
version: 1.0.0
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

- Toggles for notification categories (exact category list not confirmed — see `EDGE_CASES.md`).
- Each toggle is independently persisted per Account.

### Downloads

- Lists downloaded Content for offline access, with per-item remove and a storage-usage indicator.
- Actual download/offline-playback mechanism is not specified here — this feature owns the management UI for downloads, not the offline-storage/sync implementation, which would be a Video Player or platform-level concern if built.

### Subscriptions

- Displays current subscription tier/status and a Buy/Upgrade action.
- Actual payment processing is out of scope (`README.md` Constraints) — this feature only presents subscription state and initiates a purchase flow that hands off to a payment provider.

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
