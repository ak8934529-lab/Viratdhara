---
document_id: API_REGISTRY
title: API Registry
version: 1.1.0
status: draft
priority: medium
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

# API Registry

## Why

`04_BACKEND` has no architecture decided yet (no transport, no framework, no hosting decision recorded anywhere). This registry exists so feature work can reference a stable set of API *groups* by name without waiting for backend architecture to be finalized, and without each feature inventing its own endpoint naming.

## What

The API groups V1 features will need, at the ownership/grouping level only. No endpoint paths, methods, or payload shapes are defined yet — that requires `04_BACKEND` architecture decisions this repository does not have.

## Rules

- This document does not commit to REST, GraphQL, or any specific protocol. "API group" below means "a cohesive set of operations," not a literal route prefix.
- No feature's `API.md` may claim a finalized contract until `04_BACKEND` has an architecture document this registry can point to.

## Groups (planned, contract not finalized)

| Group | Owning Feature | Covers |
| --- | --- | --- |
| Auth | Authentication | Sign up, log in, log out, session |
| Content | Content Discovery, Content Categorization, Video Player | Read Content, Category, Tag |
| Search | Search | Query Content |
| Recommendations | Recommendation Engine | Read per-Account Recommendation |
| Playlists | Content Discovery / User Settings | CRUD on Playlist |
| Sharing | Sharing | Generate/resolve share links |
| Creator | Creator Studio, Creator Profile | Publish/manage own Content, read own analytics |
| Settings | User Settings | Read/update Account settings |
| Ads | Advertisements | Serve/track Advertisement |
| Follow | Creator Profile | Create/remove the Account-to-Creator Follow relationship (added Milestone 12) |

## Dependencies

- `FEATURE_REGISTRY.md`

## Relationships

- `DOMAIN_MODEL.md` — the entities each group operates on.
- `ERROR_REGISTRY.md` — the error shapes these groups will return.

## Constraints

- No endpoint-level detail belongs here until `04_BACKEND` exists. Adding endpoint paths prematurely would be inventing an API, which `AI_INSTRUCTIONS.md` forbids.

## Acceptance

Once `04_BACKEND` architecture exists, each group above should map to a real API surface without needing to rename or regroup.

## Future Scope

This document's `status` moves from `draft` to `active` once `04_BACKEND` has at least one architecture document these groups can be verified against.
