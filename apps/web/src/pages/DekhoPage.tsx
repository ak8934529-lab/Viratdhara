import { PosterCard } from "@/components/content/PosterCard"
import { SectionRow } from "@/components/content/SectionRow"
import { VIDEO_CONTENT, getContentByCategory } from "@/lib/mock-content"
import type { ContentItem } from "@/lib/mock-content"

/**
 * Dekho tab — Video Content only, excluding `format: short`, per
 * docs/03_FEATURES/ContentDiscovery/SPEC.md ("same composition pattern as Suno
 * scoped to Video") and TEST_CASES.md case 3. Sectioned feed: the shared
 * `SectionRow` pattern, not Shorts' full-screen treatment.
 *
 * Section composition follows the mobile design's Dekho screen (Festival Pooja
 * / Podcast / Television Shows). NOTE: those section names are *not* the 5
 * documented V1 Categories — CONTENT_ARCHITECTURE.md's placeholder list is
 * Bhajans & Kirtan / Discourses & Satsang / Aarti & Rituals / Devotional
 * Stories / Festival Specials. Rather than invent "Podcast" and "Television
 * Shows" as Categories (which would need CONTENT_ARCHITECTURE.md updated
 * first), sections here are built from the documented Categories plus the
 * Recommendation Engine row. The design's extra sections are a flagged gap.
 */

/** Only standard-format Video, per this tab's content rule. */
function videosIn(category: Parameters<typeof getContentByCategory>[0]): ContentItem[] {
  return getContentByCategory(category).filter((item) => item.type === "video" && item.format === "standard")
}

export function DekhoPage() {
  /**
   * Recommendation Engine output (RECOMMENDATIONENGINE_UI.md renders as "one or
   * more sections/rows … e.g. a 'Recommended for you' row"). The V1 placeholder
   * heuristic is Category-recency match falling back to global recency — here,
   * recency over the eligible Video set.
   */
  const recommended = [...VIDEO_CONTENT].sort((a, b) => a.publishedDaysAgo - b.publishedDaysAgo).slice(0, 8)

  const sections: { title: string; items: ContentItem[] }[] = [
    { title: "Recommended for you", items: recommended },
    { title: "Festival Specials", items: videosIn("Festival Specials") },
    { title: "Discourses & Satsang", items: videosIn("Discourses & Satsang") },
    { title: "Aarti & Rituals", items: videosIn("Aarti & Rituals") },
    { title: "Devotional Stories", items: videosIn("Devotional Stories") },
  ].filter((section) => section.items.length > 0)

  return (
    <div className="flex flex-col gap-7">
      {sections.map((section) => (
        <SectionRow key={section.title} title={section.title}>
          {section.items.map((item) => (
            <PosterCard key={item.id} content={item} shape="landscape" />
          ))}
        </SectionRow>
      ))}
    </div>
  )
}
