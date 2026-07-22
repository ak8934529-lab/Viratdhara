---
document_id: URL_STRUCTURE
title: URL Structure
version: 1.0.0
status: active
priority: high
depends_on:
  - INFORMATION_ARCHITECTURE
  - NAVIGATION_MODEL
related_documents:
  - INFORMATION_ARCHITECTURE.md
  - NAVIGATION_MODEL.md
  - FEATURE_REGISTRY.md
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# URL Structure

## Why

Routes get invented ad hoc per feature otherwise, producing inconsistent patterns (`/creator/123` vs `/creators/123` vs `/profile/creator/123`). One route table, owned centrally, prevents that.

## What

The route table for Viratdhara V1, grouped by structural area (`INFORMATION_ARCHITECTURE.md`).

## Rules

- Routes are kebab-case, lowercase.
- A dynamic segment is written `:id`.
- No feature may introduce a route outside its declared structural area without updating this document.

## Route Table

### Auth Area

| Route | Screen |
| --- | --- |
| `/` (unauthenticated) | Splash |
| `/login` | Login |
| `/signup` | Signup |
| `/onboarding/language` | Language selection |
| `/onboarding/format` | Content format selection |

### Main App

| Route | Screen | Nav Tab |
| --- | --- | --- |
| `/` (authenticated) | Home | Home |
| `/suno` | Audio discovery | Suno |
| `/playing-now` | Full player | Playing Now |
| `/dekho` | Video discovery | Dekho |
| `/shorts` | Shorts feed | Shorts |
| `/search` | Search | — (top bar entry) |
| `/content/:id` | Content detail | — (pushed) |
| `/category/:id` | Category browse | — (pushed) |
| `/playlist/:id` | Playlist detail | — (pushed) |
| `/settings` | Settings | — (top bar entry) |
| `/settings/subscriptions` | Subscriptions | — (pushed) |
| `/settings/downloads` | Downloads | — (pushed) |
| `/settings/notifications` | Notifications | — (pushed) |

### Creator Studio

| Route | Screen |
| --- | --- |
| `/creator-studio` | Creator Studio home |
| `/creator-studio/content` | Content management |
| `/creator-studio/analytics` | Analytics |
| `/creator/:id` | Public Creator Profile |

## Dependencies

- `INFORMATION_ARCHITECTURE.md`, `NAVIGATION_MODEL.md`

## Relationships

- Each route belongs to exactly one feature in `FEATURE_REGISTRY.md`; that feature's `UI.md` documents the screen itself.

## Constraints

- No route may be added here that doesn't also map to a feature in `FEATURE_REGISTRY.md`.
- Booking/commerce routes are explicitly not defined — see `PRODUCT_VISION.md` scope resolution.

## Acceptance

Every screen documented in any feature's `UI.md` has a corresponding row in this table.

## Future Scope

Administrator routes are not defined — see `INFORMATION_ARCHITECTURE.md` Future Scope. Routes for long-term modules (Events, Temples, Donations, Courses, etc.) are added only once those modules are promoted to `FEATURE_REGISTRY.md`.
