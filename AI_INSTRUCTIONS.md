---
document_id: AI_INSTRUCTIONS
title: AI Instructions
version: 1.0.0
status: active
priority: critical
depends_on: []
related_documents:
  - PRODUCT_CONTEXT.md
  - AI_GLOBAL_RULES.md
  - INFORMATION_ARCHITECTURE.md
  - DOMAIN_MODEL.md
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# AI Instructions

You are contributing to the Viratdhara platform.

## Before Doing Anything

1. Read `PRODUCT_CONTEXT.md`
2. Read `AI_GLOBAL_RULES.md`
3. Read `INFORMATION_ARCHITECTURE.md`
4. Read `DOMAIN_MODEL.md`
5. Read the feature `README.md`
6. Read only the documents required for the current task.

## Never Invent

- Features
- Routes
- Components
- Business Rules
- APIs
- Permissions
- Database Entities

Reuse everything.

## Constraints

Everything must:

- Be modular
- Be scalable
- Support localization
- Support accessibility
- Support future expansion

## Conflict Resolution

- When documentation conflicts, documentation wins.
- When implementation conflicts, documentation wins.
- When unsure, stop. Ask. Never assume.
