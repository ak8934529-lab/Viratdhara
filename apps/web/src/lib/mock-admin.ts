import { CONTENT_CATEGORIES, MOCK_CONTENT } from "@/lib/mock-content"
import type { ContentCategory, ContentItem } from "@/lib/mock-content"
import { MOCK_CREATORS } from "@/lib/mock-creator"
import type { ContentLifecycle } from "@/lib/mock-creator"

/**
 * ⚠️ BEYOND SPECIFICATION — read this before extending anything here.
 *
 * The Administrator role is named in PRODUCT_CONTEXT.md ("moderates content,
 * controls categories, reviews reports, manages advertisements, maintains
 * platform quality") but has NO specification anywhere in the repository:
 *
 * - URL_STRUCTURE.md states outright that administrator routes are NOT defined.
 * - FEATURE_REGISTRY.md's 11 V1 features contain no admin/moderation feature,
 *   so there is no knowledge base (SPEC/UI/COMPONENTS/STATES/...) to build from.
 * - MASTER_PRD.md's Feature Scope table has no admin entry.
 *
 * This module and the screens using it exist by explicit user direction ("Studio
 * dashboard for analytics — this is for creator profile and admin profile").
 * Every entity, metric, route, and screen here is INVENTED, not documented.
 *
 * Before this ships, per AI_INSTRUCTIONS.md and CLAUDE.md, an Administration
 * feature must be added to FEATURE_REGISTRY.md, its routes to URL_STRUCTURE.md,
 * and a knowledge base authored under docs/03_FEATURES/ — with PROJECT_INDEX.md,
 * DOCUMENT_GRAPH.md, and CHANGELOG.md updated in the same commit.
 *
 * The one part that IS documented: `published → removed_by_moderation` is an
 * Administrator-only transition (STATE_REGISTRY.md), it is irreversible from the
 * Creator side, and moderated Content must remain visible to its Creator rather
 * than silently disappearing. The moderation queue below is the only place that
 * transition may be triggered.
 */

/** Ads are excluded — the Advertisements feature is out of scope by user direction. */
export interface AdminModerationRow {
  content: ContentItem
  state: ContentLifecycle
  /** INVENTED: no report/flag entity exists in DOMAIN_MODEL.md or ENTITY_REGISTRY.md. */
  reportCount: number
  reportReason?: string
}

const REPORT_REASONS = [
  "Reported as misleading title",
  "Reported for audio quality",
  "Reported as duplicate upload",
  "Reported for incorrect category",
]

/** Queue seeded from published Content, plus the one already-moderated item. */
export const ADMIN_MODERATION_QUEUE: AdminModerationRow[] = MOCK_CONTENT.slice(0, 8).map((content, index) => ({
  content,
  state: index === 3 ? "removed_by_moderation" : "published",
  reportCount: index % 3 === 0 ? (index + 1) * 2 : 0,
  reportReason: index % 3 === 0 ? REPORT_REASONS[index % REPORT_REASONS.length] : undefined,
}))

/**
 * Platform-wide aggregates. Mirrors Creator Studio's approach — counts derived
 * from the same four existing events, just unscoped instead of per-Creator.
 * Deliberately counts only: no charts, no trends, no time-range selector, since
 * Creator Studio's own spec rules those out and there is no admin spec to say
 * otherwise.
 */
export interface AdminAnalytics {
  totalViews: number
  totalContent: number
  totalCreators: number
  publishedContent: number
  moderatedContent: number
  openReports: number
}

export const ADMIN_ANALYTICS: AdminAnalytics = {
  totalViews: MOCK_CONTENT.reduce((total, item) => total + item.views, 0),
  totalContent: MOCK_CONTENT.length,
  totalCreators: MOCK_CREATORS.length,
  publishedContent: ADMIN_MODERATION_QUEUE.filter((row) => row.state === "published").length,
  moderatedContent: ADMIN_MODERATION_QUEUE.filter((row) => row.state === "removed_by_moderation").length,
  openReports: ADMIN_MODERATION_QUEUE.filter((row) => row.reportCount > 0 && row.state === "published").length,
}

/** Per-Category totals, for the category-control screen. */
export interface AdminCategoryRow {
  category: ContentCategory
  itemCount: number
  totalViews: number
}

export const ADMIN_CATEGORIES: AdminCategoryRow[] = CONTENT_CATEGORIES.map((category) => {
  const items = MOCK_CONTENT.filter((item) => item.category === category)
  return {
    category,
    itemCount: items.length,
    totalViews: items.reduce((total, item) => total + item.views, 0),
  }
})
