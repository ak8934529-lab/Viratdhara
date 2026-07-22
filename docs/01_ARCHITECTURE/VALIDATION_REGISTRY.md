---
document_id: VALIDATION_REGISTRY
title: Validation Registry
version: 1.0.0
status: active
priority: medium
depends_on:
  - DOMAIN_MODEL
related_documents:
  - ERROR_REGISTRY.md
  - DOMAIN_MODEL.md
related_entities:
  - Account
  - Content
related_components: []
related_events: []
owner: Product Architecture
---

# Validation Registry

## Why

Email format, password rules, and content title limits are the kind of rule that gets redefined slightly differently in every feature that touches them unless there's one place they're defined.

## What

Validation rules shared across more than one feature. Rules used by only one feature belong in that feature's own `VALIDATIONS.md`, not here.

## Rules

- A rule is promoted here the first time a second feature needs the identical rule.
- Each rule is atomic: one condition, one failure code from `ERROR_REGISTRY.md`.

## Registry

| Rule | Applies To | Condition | Failure Code |
| --- | --- | --- | --- |
| `email_format` | Account (Authentication) | Must be a syntactically valid email address. | `VALIDATION_FAILED` |
| `password_minimum` | Account (Authentication) | Minimum length and complexity — exact rule not yet specified by product; placeholder until defined. | `VALIDATION_FAILED` |
| `content_title_required` | Content (Creator Studio) | Title must be non-empty. | `VALIDATION_FAILED` |
| `content_category_required` | Content (Creator Studio) | Exactly one Category must be set, per `CONTENT_ARCHITECTURE.md`. | `VALIDATION_FAILED` |
| `playlist_name_required` | Playlist (Content Discovery, User Settings) | Name must be non-empty. | `VALIDATION_FAILED` |

## Dependencies

- `DOMAIN_MODEL.md`

## Relationships

- `ERROR_REGISTRY.md` — the failure code every rule above produces.

## Constraints

- No feature may implement a stricter or looser version of a rule listed here. If a feature needs different behavior, that means the rule doesn't actually apply to it and shouldn't be referenced.

## Acceptance

Any two features that both validate email format, password rules, content title, category presence, or playlist name reference the same row here rather than each defining their own.

## Future Scope

`password_minimum`'s exact condition is unspecified pending a product/security decision — see `07_SECURITY` once it has content. This is a known gap, not an assumption to fill in.
