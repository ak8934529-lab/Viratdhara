---
document_id: RECOMMENDATIONENGINE_README
title: Recommendation Engine — Overview
version: 1.0.0
status: active
priority: high
depends_on:
  - CONTENT_ARCHITECTURE
  - AUTHENTICATION_README
  - FEATURE_REGISTRY
related_documents:
  - RECOMMENDATIONENGINE_SPEC.md
  - DOMAIN_MODEL.md
related_entities:
  - Recommendation
  - Content
  - Account
related_components: []
related_events:
  - recommendation_served
  - recommendation_clicked
owner: Product Architecture
---

# Recommendation Engine

## Why

Referred to as "Video Streaming Algorithm" in this pass's working feature list — the name is broader than the actual mechanism: this feature decides *what* Content to surface per Account, not the video streaming/delivery mechanism itself (bitrate, CDN, protocol — those are `Video Player`/`04_BACKEND` concerns).

## What

This feature owns generating `Recommendation` records (`DOMAIN_MODEL.md`) — a per-Account, personalized association pointing at Content — and is one of the inputs Content Discovery composes into its home feed.

## Documents in This Feature

| Document | Purpose |
| --- | --- |
| `SPEC.md` | Functional specification |
| `UI.md` | How recommendations surface (composed into Content Discovery, not a standalone screen) |
| `COMPONENTS.md` | Shares Content Discovery's card components |
| `API.md` | Read per-Account Recommendation |
| `DATABASE.md` | `Recommendation` entity detail |
| `STATES.md` | None owned |
| `VALIDATIONS.md` | None owned |
| `EVENTS.md` | `recommendation_served`, `recommendation_clicked` |
| `EDGE_CASES.md` | New Account with no history, ranking algorithm undefined |
| `TEST_CASES.md` | Test cases traced to the above |
| `PROMPTS.md` | Canonical prompts for implementing this feature |
| `CHANGELOG.md` | History of changes to this feature's documentation |

## Dependencies

- `CONTENT_ARCHITECTURE.md`, `AUTHENTICATION_README.md` (per-Account personalization requires a known Account, per `DEPENDENCY_GRAPH.md`).

## Relationships

- `Content Discovery` depends on this feature (`DEPENDENCY_GRAPH.md`) to compose its feed.

## Constraints

- This feature does not render its own screen — it's a data/ranking service consumed by Content Discovery's UI.
- The actual ranking/personalization algorithm is not specified — see `EDGE_CASES.md`. This document defines the entity/event contract, not the algorithm.

## Acceptance

An authenticated Account receives `Recommendation` records pointing at `published` Content; interacting with one fires `recommendation_clicked`.

## Future Scope

The actual ranking algorithm (collaborative filtering, content-based, hybrid, etc.) is unspecified — a real product/data-science decision, not one this document can responsibly invent.
