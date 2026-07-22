---
document_id: DOCS_01_ARCHITECTURE
title: Architecture Documentation
version: 1.0.0
status: planned
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
| `INFORMATION_ARCHITECTURE.md` | planned |
| `DOMAIN_MODEL.md` | planned |
| `CONTENT_ARCHITECTURE.md` | planned |
| `NAVIGATION_MODEL.md` | planned |
| `URL_STRUCTURE.md` | planned |
| `FEATURE_REGISTRY.md` | planned |
| `PERMISSION_MATRIX.md` | planned |
| `DEPENDENCY_GRAPH.md` | planned |
| `ENTITY_REGISTRY.md` | planned |
| `COMPONENT_REGISTRY.md` | planned |
| `EVENT_REGISTRY.md` | planned |
| `STATE_REGISTRY.md` | planned |
| `API_REGISTRY.md` | planned |
| `ERROR_REGISTRY.md` | planned |
| `VALIDATION_REGISTRY.md` | planned |

## Rules

- Entities are defined once, in `ENTITY_REGISTRY.md`. No feature document may redefine an entity.
- Navigation is defined once, in `NAVIGATION_MODEL.md`. No feature document may redefine navigation.
- Permissions are defined once, in `PERMISSION_MATRIX.md`. No feature document may redefine a permission.
- Every new component, event, state, API, error, or validation rule must be added to its registry, not only described in a feature folder.
