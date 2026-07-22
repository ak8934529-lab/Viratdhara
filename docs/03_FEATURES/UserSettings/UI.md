---
document_id: USERSETTINGS_UI
title: User Settings — UI
version: 1.0.0
status: active
priority: medium
depends_on:
  - USERSETTINGS_SPEC
  - NAVIGATION_MODEL
related_documents:
  - URL_STRUCTURE.md
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# User Settings — UI

## Why

The Settings entry point (avatar icon, top bar) and its 4 sub-screens are already routed in `URL_STRUCTURE.md` — this document ties the reviewed design's screens to those routes.

## What

Settings hub + 4 sub-screens.

## Rules

| Screen | Route (`URL_STRUCTURE.md`) |
| --- | --- |
| Settings hub | `/settings` |
| Subscriptions | `/settings/subscriptions` |
| Downloads | `/settings/downloads` |
| Notifications | `/settings/notifications` |

- Settings hub is a list of `MobileListItem` rows, one per sub-screen, entered via the top bar avatar (`NAVIGATION_MODEL.md`).
- Each sub-screen is a pushed/detail screen (back arrow, not a tab root).

## Dependencies

- `USERSETTINGS_SPEC.md`, `NAVIGATION_MODEL.md`

## Relationships

- `URL_STRUCTURE.md`

## Constraints

- No sub-screen is reachable except through the Settings hub — no direct deep-link entry point is specified as required (though the routes exist and could support one).

## Acceptance

Every route in the table above renders the correct sub-screen, reachable from the Settings hub.

## Future Scope

None.
