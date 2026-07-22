---
document_id: GLOSSARY
title: Glossary
version: 1.0.0
status: active
priority: high
depends_on: []
related_documents:
  - PRODUCT_CONTEXT.md
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Glossary

## Why

Terms get redefined inconsistently across documents and features unless there is one place every document must defer to.

## What

Canonical definitions for terms used across this repository. No other document may redefine a term listed here; it may only reference it.

## Rules

- A term is added here the first time it is used in more than one document.
- A term's definition may only be changed here, never overridden locally in a feature or architecture document.

## Terms

| Term | Definition |
| --- | --- |
| **Viratdhara** | The product: a platform for discovering, consuming, and sharing Indian spiritual and devotional content. |
| **FaithTech** | The category/ecosystem Viratdhara belongs to — technology built specifically around faith and devotional practice, as opposed to general media technology that happens to host devotional content. |
| **Dhara** | The in-product name for a user's personal spiritual space/journey within Viratdhara (e.g. "Step into the Dhara," "your Dhara Account"). |
| **User** | The consumer role: searches, browses, shares, creates playlists, manages preferences. See `PRODUCT_CONTEXT.md`, `DOMAIN_MODEL.md` (planned). |
| **Creator** | The publisher role: manages devotional content, views analytics, updates profile, interacts with followers. See `PRODUCT_CONTEXT.md`, `DOMAIN_MODEL.md` (planned). |
| **Administrator** | The platform-operator role: moderates content, controls categories, reviews reports, manages advertisements. See `PRODUCT_CONTEXT.md`, `DOMAIN_MODEL.md` (planned). |
| **Feature** | A self-contained product capability with its own knowledge base under `docs/03_FEATURES/`. Registered in `FEATURE_REGISTRY.md` (planned). |
| **Entity** | A data object with its own identity and lifecycle, defined once in `ENTITY_REGISTRY.md` (planned) and `DOMAIN_MODEL.md` (planned). |
| **Registry** | A single document under `01_ARCHITECTURE` that is the one authoritative list for a given concern (entities, components, events, states, APIs, errors, validations, permissions). Anything not in its registry does not officially exist. |
| **Document Graph** | The dependency/relationship graph between all documents in this repository, projected in `DOCUMENT_GRAPH.md` from each document's frontmatter. |
| **Product Brain** | This repository's documentation system as a whole (`docs/`, `.ai/`, `templates/`) — the single source of truth for AI agents working on Viratdhara. |
| **V1 / Current Scope** | The feature set currently authoritative for implementation, listed in `FEATURE_REGISTRY.md` and `docs/03_FEATURES/README.md`. Anything not in V1 is vision/future scope only. |

## Dependencies

None. This is a reference document other documents point to, not one that depends on them.

## Relationships

Every document that uses one of the terms above should reference `GLOSSARY.md` in its frontmatter `related_documents` rather than re-explaining the term inline.

## Constraints

- No document may define a term that already exists here with a different meaning.
- Feature-specific jargon that is not used outside one feature's own folder does not belong here — it belongs in that feature's own `README.md`.

## Acceptance

Any term appearing in more than one document across the repository has exactly one definition, here.

## Future Scope

This glossary grows as new terms are introduced by Milestones 3+ (architecture, design, features, AI, backend).
