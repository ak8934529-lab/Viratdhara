---
document_id: DOMAIN_MODEL
title: Domain Model
version: 1.0.0
status: active
priority: critical
depends_on:
  - PRODUCT_CONTEXT
related_documents:
  - ENTITY_REGISTRY.md
  - CONTENT_ARCHITECTURE.md
  - PERMISSION_MATRIX.md
related_entities:
  - User
  - Creator
  - Administrator
  - Content
  - Category
  - Tag
  - Playlist
  - Recommendation
  - Advertisement
related_components: []
related_events: []
owner: Product Architecture
---

# Domain Model

## Why

Every feature reads or writes the same handful of core entities. Without one relationship model, each feature would invent its own shape for "Content" or "User," and integration between features would require reconciling incompatible models after the fact.

## What

The core entities of Viratdhara V1 and how they relate to each other.

## Rules

- An entity is defined here once. `ENTITY_REGISTRY.md` lists entities for lookup; it does not redefine their relationships — this document is the relationship source of truth.
- A feature may extend an entity with feature-owned fields (documented in that feature's own `DATABASE.md`) but may not change an entity's identity, ownership, or core relationships defined here without updating this document first.
- Role (`User` / `Creator` / `Administrator`) is a role an Account holds, not three unrelated entities with separate identities — see Relationships.

## Entities

### Account

The authenticating identity. Every person using Viratdhara has exactly one Account.

- Holds one or more roles: `User`, `Creator`, `Administrator`.
- `User` role is implicit for every Account (everyone can consume content).
- `Creator` and `Administrator` are additive roles an Account may also hold.

### Content

The core unit of devotional media. Represents one video or one audio item.

- Owned by exactly one Creator (Account with Creator role).
- Belongs to exactly one primary Category.
- May have zero or more Tags.
- Has a lifecycle state — see `STATE_REGISTRY.md`.
- Is the subject of Recommendation, Playlist membership, and Sharing.

### Category

A fixed top-level grouping for Content (e.g. Devotional Music, Spiritual Videos — see `PRODUCT_VISION.md` long-term modules for the eventual full set; V1 categories are defined in `CONTENT_ARCHITECTURE.md`).

- Administrator-controlled. A Creator selects from existing categories; only an Administrator creates or removes a category.

### Tag

A free-form or curated label attached to Content for discoverability, distinct from Category (many per Content, no ownership hierarchy).

### Playlist

An ordered collection of Content, owned by exactly one Account.

- An Account may have many Playlists.
- A Playlist contains zero or more Content items; a Content item may appear on many Playlists.

### Recommendation

A generated, per-Account association pointing at Content, produced by the Recommendation Engine feature. Not user-authored.

- Belongs to exactly one Account.
- References Content; does not duplicate Content data.

### Advertisement

A unit shown to Accounts, owned/managed by an Administrator.

- Not owned by a Creator. Distinct from Content — an Advertisement is never mistaken for or mixed into a Creator's Content list.

## Dependencies

- `PRODUCT_CONTEXT.md` — defines the three role types at product level; this document formalizes them as Account roles.

## Relationships

```
Account (1) ──holds──> Role [User | Creator | Administrator]
Account (Creator) (1) ──owns──> (many) Content
Account (Administrator) (1) ──moderates──> Content
Account (Administrator) (1) ──manages──> Category, Advertisement
Account (1) ──owns──> (many) Playlist
Playlist (many) ──contains──> (many) Content
Content (many) ──belongs to──> (1) Category
Content (many) ──tagged with──> (many) Tag
Account (1) ──receives──> (many) Recommendation ──references──> (1) Content
Account (1) ──shown──> (many) Advertisement
```

## Constraints

- No entity outside this list may be treated as a first-class domain entity without adding it here first.
- `Advertisement` targeting logic is out of scope for this document — it belongs to the Advertisements feature's own `SPEC.md`, referencing this entity only for shape.

## Acceptance

Any feature's `DATABASE.md` can be checked against this model: it must reference these entities and relationships rather than redefining them.

## Future Scope

Entities implied by `PRODUCT_VISION.md` long-term modules (Event, Temple, Donation, Course, Article, Book) are not modeled yet. They are added here only when their module is promoted out of long-term vision — see `FEATURE_REGISTRY.md`.
