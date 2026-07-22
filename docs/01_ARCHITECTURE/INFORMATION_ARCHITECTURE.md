---
document_id: INFORMATION_ARCHITECTURE
title: Information Architecture
version: 1.0.0
status: active
priority: critical
depends_on:
  - PRODUCT_CONTEXT
  - DOMAIN_MODEL
related_documents:
  - NAVIGATION_MODEL.md
  - URL_STRUCTURE.md
  - FEATURE_REGISTRY.md
  - PERMISSION_MATRIX.md
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Information Architecture

## Why

Before any screen or route exists, the app needs one shared map of its structural areas and who owns each one — otherwise navigation, permissions, and feature ownership get decided independently per feature and drift apart.

## What

Viratdhara V1 has three structural areas. Every screen belongs to exactly one.

1. **Auth Area** — unauthenticated entry: splash, login, signup, onboarding (language/format selection).
2. **Main App** — the authenticated experience, available to every Account (User role): the bottom-tab surfaces (Home, Suno, Playing Now, Dekho, Shorts), Search, Settings, Sharing.
3. **Creator Studio** — available only to Accounts holding the Creator role: content publishing, analytics, profile management.

There is no separate Administrator-facing area defined in V1 screens; Administrator capabilities (moderation, category/ad management — see `PERMISSION_MATRIX.md`) are assumed to require tooling but no UI for them has been designed yet. This is a known gap, not a decision that Administrators have no interface.

## Rules

- A screen's structural area determines its default navigation chrome: Auth Area has no bottom nav; Main App always has the shared bottom nav (`NAVIGATION_MODEL.md`); Creator Studio has its own navigation, separate from Main App's bottom nav.
- Every feature in `FEATURE_REGISTRY.md` must declare which structural area(s) its screens belong to.
- Route ownership follows structural area: see `URL_STRUCTURE.md`.

## Dependencies

- `PRODUCT_CONTEXT.md` — the three user roles.
- `DOMAIN_MODEL.md` — Account/Role relationship.

## Relationships

| Structural Area | Navigation | Routes | Who |
| --- | --- | --- | --- |
| Auth Area | none (linear flow) | `URL_STRUCTURE.md` § Auth | Anyone, unauthenticated |
| Main App | Shared bottom nav, `NAVIGATION_MODEL.md` | `URL_STRUCTURE.md` § Main App | Every Account (User role) |
| Creator Studio | Own nav, not the shared bottom nav | `URL_STRUCTURE.md` § Creator Studio | Accounts with Creator role |

Feature-to-area mapping is authoritative in `FEATURE_REGISTRY.md`, not restated here.

## Constraints

- A screen cannot belong to more than one structural area. If a screen is needed in two areas, it is a shared component rendered in both, not a screen that "belongs to" both.
- No fourth structural area may be added without updating this document first.

## Acceptance

Any new screen can be placed into exactly one of the three structural areas before its route or navigation entry is decided.

## Future Scope

An Administrator-facing structural area (moderation queue, category management, ad management UI) is anticipated but not yet designed. It is out of scope until screens exist for it.
