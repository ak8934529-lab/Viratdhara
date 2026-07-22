---
document_id: DOCS_01_ARCHITECTURE
title: Architecture Documentation
version: 1.1.0
status: active
priority: critical
depends_on:
  - DOCS_00_PRODUCT
related_documents:
  - PROJECT_INDEX.md
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# 01_ARCHITECTURE

System-level structure: information architecture, domain model, and the registries every feature must reference instead of redefining.

## Documents

| Document | Status |
| --- | --- |
| `INFORMATION_ARCHITECTURE.md` | active |
| `DOMAIN_MODEL.md` | active |
| `CONTENT_ARCHITECTURE.md` | active |
| `NAVIGATION_MODEL.md` | active |
| `URL_STRUCTURE.md` | active |
| `FEATURE_REGISTRY.md` | active |
| `PERMISSION_MATRIX.md` | active |
| `DEPENDENCY_GRAPH.md` | active |
| `ENTITY_REGISTRY.md` | active |
| `COMPONENT_REGISTRY.md` | active |
| `EVENT_REGISTRY.md` | active |
| `STATE_REGISTRY.md` | active |
| `API_REGISTRY.md` | draft (groups only, no contract until 04_BACKEND exists) |
| `ERROR_REGISTRY.md` | draft (same reason) |
| `VALIDATION_REGISTRY.md` | active |

## Rules

- Entities are defined once, in `ENTITY_REGISTRY.md`. No feature document may redefine an entity.
- Navigation is defined once, in `NAVIGATION_MODEL.md`. No feature document may redefine navigation.
- Permissions are defined once, in `PERMISSION_MATRIX.md`. No feature document may redefine a permission.
- Every new component, event, state, API, error, or validation rule must be added to its registry, not only described in a feature folder.
