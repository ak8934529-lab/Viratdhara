---
document_id: AUTHENTICATION_COMPONENTS
title: Authentication — Components
version: 1.0.0
status: active
priority: medium
depends_on:
  - AUTHENTICATION_UI
  - COMPONENT_REGISTRY
related_documents:
  - COMPONENT_REGISTRY.md
related_entities: []
related_components:
  - MobileBrandMark
  - MobileAppShell
  - MobileMain
  - PageScroll
  - MobileSegmentedControl
  - MobileSegmentedListItem
related_events: []
owner: Product Architecture
---

# Authentication — Components

## Why

Naming the exact components each screen composes prevents this feature's screens from drifting into one-off markup instead of the shared design system.

## What

Components used across this feature's screens, all existing and V1-scoped per `COMPONENT_REGISTRY.md`.

## Rules

| Component | Used On |
| --- | --- |
| `MobileAppShell`, `MobileMain`, `PageScroll` | Every screen (layout shell) |
| `MobileBrandMark` | Splash, Login, Signup |
| `Button` (`variant="outline"`, `size="icon"` for social icons; default for primary CTA) | Splash, Login, Signup |
| `Input` | Login, Signup |
| `Switch` | Login (remember-me) |
| `MobileSegmentedListItem` | Onboarding — Language, Onboarding — Format |

## Dependencies

- `AUTHENTICATION_UI.md`, `COMPONENT_REGISTRY.md`

## Relationships

- `COMPONENT_REGISTRY.md` — existence/scope confirmation for every component above; all are `V1`.

## Constraints

- No new component is introduced for this feature without first checking this table and `COMPONENT_REGISTRY.md` for an existing fit.

## Acceptance

Every screen in `UI.md` can be built from only the components listed here.

## Future Scope

A dedicated social-provider icon button variant (Google/Facebook/Apple with brand-correct icons) is not yet a named pattern — currently composed ad hoc from `Button` + `lucide-react` icons per `apps/showcase`'s `LoginScreen.tsx` reference.
