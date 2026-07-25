import { CinematicHero } from "@/components/content/CinematicHero"
import { PosterCard } from "@/components/content/PosterCard"
import { CarouselRow } from "@/components/ui/CarouselRow"
import { categorySlug } from "@/lib/category-slug"
import { VIDEO_CONTENT, getContentByCategory } from "@/lib/mock-content"
import type { ContentCategory, ContentItem } from "@/lib/mock-content"

/**
 * Dekho tab — Video Content only, excluding `format: short`, per
 * docs/03_FEATURES/ContentDiscovery/SPEC.md ("same composition pattern as Suno
 * scoped to Video") and TEST_CASES.md case 3. Sectioned feed of carousel rows —
 * not Shorts' full-screen treatment.
 *
 * Section composition follows the mobile design's Dekho screen structurally, but
 * NOT its section names: the design shows "Podcast" and "Television Shows", which
 * are not among the 5 documented V1 Categories, and CONTENT_ARCHITECTURE.md
 * forbids inventing Category names beyond its placeholder list. Sections here are
 * therefore built from the documented Categories plus the recency row. The
 * design's extra sections remain a flagged, unresolved gap.
 */
function videosIn(category: ContentCategory): ContentItem[] {
  return getContentByCategory(category).filter((item) => item.type === "video" && item.format === "standard")
}

export function DekhoPage() {
  /** Recency stands in for ranking — the V1 placeholder heuristic's fallback. */
  const recent = [...VIDEO_CONTENT].sort((a, b) => a.publishedDaysAgo - b.publishedDaysAgo)
  const hero = recent[0]
  const mostWatched = [...VIDEO_CONTENT].sort((a, b) => b.views - a.views).slice(0, 10)

  const sections: { title: string; eyebrow?: string; items: ContentItem[]; seeAllTo?: string }[] = [
    { title: "New this week", eyebrow: "Fresh", items: recent.slice(0, 10) },
    { title: "Most watched", items: mostWatched },
    ...(
      [
        "Festival Specials",
        "Discourses & Satsang",
        "Aarti & Rituals",
        "Devotional Stories",
      ] as ContentCategory[]
    ).map((category) => ({
      title: category,
      items: videosIn(category),
      seeAllTo: `/category/${categorySlug(category)}`,
    })),
  ].filter((section) => section.items.length > 0)

  return (
    <div className="flex flex-col gap-8">
      {hero ? <CinematicHero content={hero} eyebrow="Now streaming" /> : null}

      {sections.map((section) => (
        <CarouselRow
          key={section.title}
          title={section.title}
          eyebrow={section.eyebrow}
          seeAllTo={section.seeAllTo}
        >
          {section.items.map((item) => (
            <PosterCard key={item.id} content={item} shape="landscape" />
          ))}
        </CarouselRow>
      ))}
    </div>
  )
}
