---
document_id: CREATORSTUDIO_VALIDATIONS
title: Creator Studio — Validations
version: 1.0.0
status: active
priority: medium
depends_on:
  - CREATORSTUDIO_SPEC
  - VALIDATION_REGISTRY
related_documents:
  - VALIDATION_REGISTRY.md
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Creator Studio — Validations

## Why

Publishing is the moment Content becomes visible to everyone — worth enforcing its required fields strictly.

## What

Validation rules for Content creation/publishing.

## Rules

| Rule | Source | Condition |
| --- | --- | --- |
| `content_title_required` | `VALIDATION_REGISTRY.md` | Title non-empty (shared rule). |
| `content_category_required` | `VALIDATION_REGISTRY.md` | Exactly one Category set (shared rule). |
| `content_owner_immutable` (feature-owned) | — | Owning Creator cannot be changed after creation (`CONTENT_ARCHITECTURE.md`). |

## Dependencies

- `CREATORSTUDIO_SPEC.md`, `VALIDATION_REGISTRY.md`

## Relationships

- `ERROR_REGISTRY.md` — `VALIDATION_FAILED`.

## Constraints

- Publishing is blocked (not silently allowed with missing fields) until `content_title_required` and `content_category_required` both pass.

## Acceptance

No Content reaches `published` state without a title and exactly one Category.

## Future Scope

Media-file validation (format, duration limits) is not specified.
