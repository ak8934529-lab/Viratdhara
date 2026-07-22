---
document_id: DEPENDENCY_GRAPH
title: Feature Dependency Graph
version: 1.0.0
status: active
priority: high
depends_on:
  - FEATURE_REGISTRY
related_documents:
  - FEATURE_REGISTRY.md
  - DOMAIN_MODEL.md
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Feature Dependency Graph

## Why

This is the *functional* dependency graph between features and entities — which feature cannot work without which other feature or entity existing first. It is distinct from `DOCUMENT_GRAPH.md` at the repository root, which tracks documentation relationships, not runtime/product dependencies. Do not conflate the two.

## What

Which V1 features depend on which other V1 features or core entities to function.

## Rules

- An edge `A → B` means A cannot be implemented or function correctly without B already existing.
- This graph must stay consistent with the "Depends On" column in `FEATURE_REGISTRY.md`; that column is the summary, this is the detail.
- Cycles are not allowed. If two features seem to need each other, one of them is actually two features, or the shared need belongs in `DOMAIN_MODEL.md` instead.

## Graph

```
Authentication
└── (no feature dependency — foundational)

Content Categorization
└── depends on: Content Architecture (Category, Tag entities)

Search
└── depends on: Content Architecture

Recommendation Engine
└── depends on: Content Architecture, Authentication (per-Account personalization)

Content Discovery
└── depends on: Content Architecture, Recommendation Engine, Content Categorization

Video Player
└── depends on: Content Architecture

Sharing
└── depends on: Content Architecture

Creator Studio
└── depends on: Authentication, Content Architecture

Creator Profile
└── depends on: Authentication

User Settings
└── depends on: Authentication

Advertisements
└── (no feature dependency — cross-cutting, reads Account for targeting eligibility only, no targeting logic defined yet)
```

## Dependencies

- `FEATURE_REGISTRY.md`

## Relationships

- `DOMAIN_MODEL.md` — the entities referenced as dependencies above (Content, Category, Tag, Account).

## Constraints

- A feature may not be marked "not started" complete in `FEATURE_REGISTRY.md` before every feature it depends on here is also complete or explicitly stubbed.

## Acceptance

Build/implementation order can be derived directly from this graph via topological sort: `Authentication` and `Content Architecture` (not a feature, but a prerequisite architecture doc) first, then `Content Categorization`/`Search`/`Video Player`/`Sharing`/`Creator Profile`/`User Settings`/`Advertisements`, then `Recommendation Engine`, then `Content Discovery`, then `Creator Studio`.

## Future Scope

Long-term modules will add edges once promoted — e.g. a future `Temples` feature would likely depend on `Authentication` and introduce new entities not yet in `DOMAIN_MODEL.md`.
