import { MOCK_CONTENT } from "@/lib/mock-content"
import type { ContentItem } from "@/lib/mock-content"

/**
 * Placeholder Creator/Studio data. No 04_BACKEND exists yet, and
 * CREATORSTUDIO_API.md / CREATORPROFILE_API.md are both `draft`.
 */

/**
 * Content lifecycle, mirroring STATE_REGISTRY.md's Content machine:
 *   draft → published → removed_by_creator
 *   published → removed_by_moderation  (Administrator only — never the Creator)
 */
export type ContentLifecycle = "draft" | "published" | "removed_by_creator" | "removed_by_moderation"

export interface StudioContentRow {
  content: ContentItem
  state: ContentLifecycle
}

/** The signed-in Creator, for Studio and for the "own profile" profile case. */
export const CURRENT_CREATOR = {
  id: "ananya-devotional",
  displayName: "Ananya Devotional",
  email: "ananya@example.com",
}

export interface MockCreator {
  id: string
  displayName: string
}

export const MOCK_CREATORS: MockCreator[] = [
  { id: "ananya-devotional", displayName: "Ananya Devotional" },
  { id: "swami-anand-ashram", displayName: "Swami Anand Ashram" },
  { id: "kashi-temple-live", displayName: "Kashi Temple Live" },
  { id: "katha-kids", displayName: "Katha Kids" },
  { id: "nada-yoga-collective", displayName: "Nada Yoga Collective" },
]

export function creatorSlug(displayName: string): string {
  return displayName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
}

export function getCreatorBySlug(slug: string): MockCreator | undefined {
  return MOCK_CREATORS.find((creator) => creator.id === slug)
}

/**
 * A Creator's publicly visible Content — `published` only.
 * CREATORPROFILE_SPEC.md: no Creator Profile ever shows non-`published`
 * Content, including the Creator's own drafts.
 */
export function getPublishedContentByCreator(displayName: string): ContentItem[] {
  return MOCK_CONTENT.filter((item) => item.creator === displayName)
}

/**
 * The signed-in Creator's own Content across all lifecycle states — Studio
 * only. Includes one `removed_by_moderation` row so that state's read-only,
 * visually-distinct treatment is reviewable (CREATORSTUDIO_EDGE_CASES.md).
 */
export const STUDIO_CONTENT: StudioContentRow[] = (() => {
  const own = MOCK_CONTENT.filter((item) => item.creator === CURRENT_CREATOR.displayName)
  const states: ContentLifecycle[] = ["published", "published", "draft", "removed_by_moderation", "removed_by_creator"]
  return own.map((content, index) => ({ content, state: states[index % states.length] }))
})()

/**
 * Analytics aggregates. CREATORSTUDIO_SPEC.md: "read-only aggregates derived
 * from existing events (`content_viewed`, `content_played`, `content_completed`,
 * `content_shared`) scoped to the Creator's own Content — no new event is
 * introduced for analytics purposes."
 *
 * Deliberately counts only. SPEC.md Future Scope states "Advanced analytics
 * (trends over time, audience demographics) are not specified", and
 * COMPONENTS.md says a trend component is "not yet confirmed as needed" — so no
 * chart, sparkline, trend arrow, percentage delta, or time-range selector is
 * built here. Inventing one would go beyond spec.
 */
export interface StudioAnalytics {
  views: number
  plays: number
  completions: number
  shares: number
}

export const STUDIO_ANALYTICS: StudioAnalytics = (() => {
  const published = STUDIO_CONTENT.filter((row) => row.state === "published")
  const views = published.reduce((total, row) => total + row.content.views, 0)
  return {
    views,
    plays: Math.round(views * 0.62),
    completions: Math.round(views * 0.28),
    shares: Math.round(views * 0.04),
  }
})()
