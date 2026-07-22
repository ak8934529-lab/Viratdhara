---
document_id: AI_BACKEND_AGENT
title: AI Backend Agent Rules
version: 1.0.0
status: active
priority: high
depends_on:
  - AI_GLOBAL_RULES
related_documents:
  - DOMAIN_MODEL.md
  - ENTITY_REGISTRY.md
  - API_REGISTRY.md
  - ERROR_REGISTRY.md
  - VALIDATION_REGISTRY.md
  - PERMISSION_MATRIX.md
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# AI Backend Agent Rules

## Why

`04_BACKEND` currently has no architecture decided. The first backend work in this repository will effectively found that architecture — it must be built to match the entities, permissions, and API groups already defined in `01_ARCHITECTURE`, not invent a parallel model.

## What

Rules specific to an agent doing backend/data-layer work, narrowing `AI_GLOBAL_RULES.md`.

## Rules

- Data models implement `DOMAIN_MODEL.md` / `ENTITY_REGISTRY.md` exactly. A new field on an existing entity is added to `DOMAIN_MODEL.md` first if it changes the entity's core shape; feature-owned extensions are documented in that feature's own `DATABASE.md`.
- Every endpoint belongs to an API group in `API_REGISTRY.md`. Since that registry is currently `draft` (groups only, no finalized contract), the first backend agent to pick a transport/protocol must update `API_REGISTRY.md`'s status to `active` and add real endpoint detail as part of that same change — not leave the registry stale while implementation moves ahead of it.
- Every permission check enforces `PERMISSION_MATRIX.md` at the data layer, not only in the UI — a Creator's "own only" scoping (editing their own Content) must be enforced server-side.
- Error responses use codes from `ERROR_REGISTRY.md` only.
- Input validation implements `VALIDATION_REGISTRY.md` rules exactly, including the unresolved `password_minimum` gap — this agent does not invent a specific password policy to fill that gap; it flags it for a product/security decision.

## Dependencies

- `AI_GLOBAL_RULES.md`

## Relationships

- `DOMAIN_MODEL.md`, `ENTITY_REGISTRY.md`, `API_REGISTRY.md`, `ERROR_REGISTRY.md`, `VALIDATION_REGISTRY.md`, `PERMISSION_MATRIX.md`

## Constraints

- This agent does not decide product-level security policy (e.g. password complexity rules) — see `07_SECURITY`, currently empty. It implements what's decided there once it exists, and flags gaps rather than filling them by assumption.

## Acceptance

Any endpoint this agent builds maps to exactly one `API_REGISTRY.md` group, one or more `ERROR_REGISTRY.md` codes, and enforces `PERMISSION_MATRIX.md` server-side.

## Future Scope

This document gains more concrete rules once `04_BACKEND` has an actual architecture decision (transport, framework, hosting) to reference.
