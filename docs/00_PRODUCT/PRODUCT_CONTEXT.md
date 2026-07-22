---
document_id: PRODUCT_CONTEXT
title: Product Context
version: 1.0.0
status: active
priority: critical
depends_on: []
related_documents:
  - PRODUCT_VISION.md
  - PRODUCT_PHILOSOPHY.md
  - GLOSSARY.md
related_entities:
  - User
  - Creator
  - Administrator
related_components: []
related_events: []
owner: Product Architecture
---

# Product Context

## Why

Every AI agent and every document in this repository must share one understanding of what Viratdhara is before touching any feature, entity, or component. This document is that shared understanding. It is read first, per `AI_INSTRUCTIONS.md`.

## What

Viratdhara is a digital platform for discovering, consuming, and sharing Indian spiritual and devotional content. It is not a general-purpose video or music application with devotional content added on top — devotional content is the product, not a category within it.

### Mission

Use technology to make spiritual knowledge, devotional music, videos, and creator content accessible to everyone through a carefully designed digital experience.

### Long-Term Identity

The long-term direction is a FaithTech ecosystem, not a single application. See `PRODUCT_VISION.md` for the vision statement and the long-term module direction.

## Rules

- Devotional/spiritual content is the platform's core identity. No feature may be added that treats devotional content as incidental.
- "Current Scope" for any given point in time is defined once, in `FEATURE_REGISTRY.md` (`01_ARCHITECTURE`) and mirrored in `docs/03_FEATURES/README.md`. This document does not restate the feature list — it only asserts that a stated scope exists and must be treated as authoritative over any design artifact (Figma, mockup, or otherwise) that implies broader scope.
- Trust, authenticity, simplicity, accessibility, and long-term value take priority over engagement metrics. See `PRODUCT_PHILOSOPHY.md` for the full principle set.

## Dependencies

None. This is a root document in the dependency graph.

## Relationships

### Target Users

Viratdhara serves three user groups at product level. Their formal data entities, permissions, and relationships are defined once in `DOMAIN_MODEL.md` and `PERMISSION_MATRIX.md` (`01_ARCHITECTURE`, planned) — this section states intent only, not the entity model.

**User** — consumes devotional content: searches, browses, shares, creates playlists, manages preferences.

**Creator** — publishes devotional content: manages videos, views analytics, updates profile, interacts with followers.

**Administrator** — operates the platform: moderates content, controls categories, reviews reports, manages advertisements, maintains platform quality.

## Constraints

- Never restate the V1 feature list here. Reference `FEATURE_REGISTRY.md` / `docs/03_FEATURES/README.md`.
- Never restate user permissions here. Reference `PERMISSION_MATRIX.md` once it exists.

## Acceptance

An AI agent that has read only this document can correctly state what Viratdhara is, why it exists, and who its three user groups are, without needing to guess at scope or philosophy.

## Future Scope

Additional user groups (e.g. Pandit/Priest, Merchant) are not ruled out but are not part of the V1 target user set above. Adding one requires updating this section and `DOMAIN_MODEL.md` together, not one without the other.
