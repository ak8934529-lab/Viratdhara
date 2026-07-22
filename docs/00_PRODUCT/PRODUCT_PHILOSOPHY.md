---
document_id: PRODUCT_PHILOSOPHY
title: Product Philosophy
version: 1.0.0
status: active
priority: high
depends_on:
  - PRODUCT_CONTEXT
related_documents:
  - PRODUCT_CONTEXT.md
  - PRODUCT_VISION.md
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Product Philosophy

## Why

"Trust and calm over engagement" is not self-enforcing. Every feature decision (notification design, recommendation aggressiveness, ad placement, infinite scroll vs. bounded lists) can trend toward engagement-maximization by default unless a stated principle blocks it.

## What

Viratdhara is not driven by engagement for the sake of engagement.

## Rules

### The product prioritizes

- Trust
- Authenticity
- Simplicity
- Accessibility
- Long-term value

### Over

- Endless scrolling
- Clickbait
- Artificial engagement
- Addictive design

The experience should feel calm, not overwhelming.

### Product Principles

Every feature must satisfy all five:

**Simplicity** — interfaces remain clean; avoid unnecessary complexity.

**Consistency** — design patterns are reused; components remain consistent; navigation is predictable. Enforced structurally by `DESIGN_SYSTEM_RULES.md` and `COMPONENT_REGISTRY.md` (`02_DESIGN`, `01_ARCHITECTURE`, planned).

**Accessibility** — keyboard navigation, screen readers, localization, and varying screen sizes are supported by default, not retrofitted. See `ACCESSIBILITY.md` (`02_DESIGN`, planned).

**Scalability** — every architecture decision supports future expansion per `PRODUCT_VISION.md`. Never build for only today's requirements.

**AI First** — documentation is written primarily for AI agents to understand product context, relationships, business rules, and dependencies without asking additional questions. This principle governs the documentation system itself; see `AI_INSTRUCTIONS.md`.

## Dependencies

- `PRODUCT_CONTEXT.md`

## Relationships

- Design-level enforcement of Simplicity/Consistency/Accessibility lives in `02_DESIGN`.
- Documentation-level enforcement of AI First lives in `AI_INSTRUCTIONS.md` and `05_AI`.

## Constraints

- A feature that increases engagement metrics at the cost of Trust, Authenticity, Simplicity, Accessibility, or Long-term value does not satisfy this philosophy, regardless of its metric impact.
- No feature ships with a design pattern this document lists as deprioritized (endless scroll, clickbait, artificial engagement, addictive design) without an explicit, separately documented exception.

## Acceptance

A feature specification can be checked against the five principles and the deprioritized-pattern list to determine whether it is consistent with product philosophy before implementation begins.

## Future Scope

None. This document defines a standing principle set, not a roadmap.
