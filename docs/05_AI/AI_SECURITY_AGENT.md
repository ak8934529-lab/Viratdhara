---
document_id: AI_SECURITY_AGENT
title: AI Security Agent Rules
version: 1.0.0
status: active
priority: critical
depends_on:
  - AI_GLOBAL_RULES
related_documents:
  - PERMISSION_MATRIX.md
  - VALIDATION_REGISTRY.md
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# AI Security Agent Rules

## Why

`docs/07_SECURITY` has no content yet, and `VALIDATION_REGISTRY.md` already has one open gap (`password_minimum`, condition unspecified). Security-relevant work in this repository is currently happening ahead of any dedicated security documentation — this agent's job is to prevent that gap from being quietly filled with assumptions.

## What

Rules specific to an agent handling authentication, authorization, or data-protection concerns, narrowing `AI_GLOBAL_RULES.md`.

## Rules

- Authorization checks implement `PERMISSION_MATRIX.md` exactly — no capability is granted or denied differently than that table states.
- Any security-relevant rule with no documented specification (e.g. password policy, session expiry, rate-limit thresholds) is flagged as a gap, not filled with an assumed "reasonable default," per `AI_GLOBAL_RULES.md` Ask When Documentation Is Missing.
- Multi-tenant/role isolation (Creator can only touch their own Content, per `PERMISSION_MATRIX.md`) is verified at the data layer, not assumed to be enforced by the UI alone.

## Dependencies

- `AI_GLOBAL_RULES.md`

## Relationships

- `PERMISSION_MATRIX.md`, `VALIDATION_REGISTRY.md`

## Constraints

- This agent does not set security policy unilaterally (e.g. picking a specific password complexity rule). It flags the gap and escalates for a product/security decision, then documents that decision in `VALIDATION_REGISTRY.md` / `07_SECURITY` once made.

## Acceptance

Every authorization check in reviewed code traces to a row in `PERMISSION_MATRIX.md`; every open security gap (like `password_minimum`) stays visibly open in documentation until resolved, never silently assumed.

## Future Scope

This document will gain concrete review checklists once `07_SECURITY` has its first real documents.
