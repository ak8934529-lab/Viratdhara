---
document_id: SHARING_API
title: Sharing — API
version: 1.0.0
status: draft
priority: low
depends_on:
  - SHARING_SPEC
  - API_REGISTRY
related_documents:
  - API_REGISTRY.md
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Sharing — API

## Why

This feature owns the `Sharing` API group (`API_REGISTRY.md`).

## What

Operations this group must support.

## Rules

- This document inherits `API_REGISTRY.md`'s `draft` status.

## Operations (planned)

| Operation | Purpose |
| --- | --- |
| Generate share link | Produce a URL for a given Content id (may just be the canonical `/content/:id` route — no separate short-link service is confirmed as needed) |
| Resolve share link | Standard route resolution to Content — likely not a distinct operation from the normal Content-detail read, listed here for completeness |

## Dependencies

- `SHARING_SPEC.md`, `API_REGISTRY.md`

## Relationships

- `ERROR_REGISTRY.md` — `NOT_FOUND` for a link to non-existent/removed Content.

## Constraints

- No short-link/URL-shortening service is assumed without a confirmed requirement.

## Acceptance

Once finalized, generating a share link requires no more than the Content id and the existing route structure.

## Future Scope

A dedicated short-link service is not specified as needed.
