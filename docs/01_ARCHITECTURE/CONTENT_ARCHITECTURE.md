---
document_id: CONTENT_ARCHITECTURE
title: Content Architecture
version: 1.0.0
status: active
priority: critical
depends_on:
  - DOMAIN_MODEL
related_documents:
  - DOMAIN_MODEL.md
  - ENTITY_REGISTRY.md
  - STATE_REGISTRY.md
related_entities:
  - Content
  - Category
  - Tag
related_components: []
related_events: []
owner: Product Architecture
---

# Content Architecture

## Why

Everything in Viratdhara revolves around Content. Discovery, Search, Recommendation, Sharing, and Creator Studio all read or write Content — they need one shared definition of what Content is, how it's typed, how it moves through its lifecycle, and how it becomes discoverable.

## What

The structural rules for the `Content` entity: type, ownership, lifecycle, metadata, and discoverability. Relationships to other entities are defined in `DOMAIN_MODEL.md`; this document defines Content's own internal rules.

## Rules

### Content Type

V1 supports two Content types:

- **Video** — corresponds to the `Dekho` navigation surface.
- **Audio** — corresponds to the `Suno` navigation surface (devotional music, bhajans, spoken content).

`Shorts` is a presentation format (short-form vertical video), not a separate Content type — a Shorts item is a `Video` with a `format: short` attribute.

### Ownership

- Every Content item has exactly one owning Creator, set at creation and immutable.
- Only the owning Creator (or an Administrator, for moderation) may modify or remove a Content item.

### Metadata (minimum required)

- Title
- Content type (`Video` | `Audio`)
- Category (exactly one, from the fixed Category list an Administrator maintains)
- Tags (zero or more)
- Duration
- Publish state — see `STATE_REGISTRY.md`

### Discoverability

Content becomes discoverable through exactly these paths — no other path exists in V1:

1. **Content Discovery** feed (home surfaces, editorially/algorithmically surfaced)
2. **Search** (query match against title/tags/category)
3. **Recommendation Engine** (personalized, per-Account)
4. **Category browse** (Content Categorization feature)
5. **Sharing** (a direct link to a specific Content item, sent by another Account)

### Moderation

- An Administrator may move any Content item to a removed/hidden state regardless of Creator intent. This overrides Creator control but does not delete the underlying record — see `STATE_REGISTRY.md` for the distinction between "removed by creator" and "removed by moderation."

## Dependencies

- `DOMAIN_MODEL.md` — entity shape and relationships.

## Relationships

- `STATE_REGISTRY.md` — the Content lifecycle state machine.
- `ENTITY_REGISTRY.md` — Category, Tag as related entities.
- Feature-level detail for each discoverability path lives in that feature's own `docs/03_FEATURES/<Feature>/SPEC.md` (Content Discovery, Search, Recommendation Engine, Content Categorization, Sharing).

## Constraints

- Content must belong to exactly one Category. Multi-category Content is not supported in V1.
- A Content item's type (`Video`/`Audio`) is set at creation and does not change.
- No discoverability path other than the five listed above may be introduced without updating this document.

## Acceptance

A new Content-related feature can be checked against this document to confirm its discoverability mechanism is one of the five listed paths, or that this document has been updated to add a sixth.

## Future Scope

Additional Content types (Article, Book, Course, per `PRODUCT_VISION.md`) are not modeled in V1. Live Streaming content (also long-term scope) will need its own lifecycle distinct from the publish/moderate model above, since it is real-time rather than a static asset.
