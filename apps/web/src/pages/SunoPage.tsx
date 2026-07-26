import { useMemo, useState } from "react"

import { CinematicHero } from "@/components/content/CinematicHero"
import { PosterCard } from "@/components/content/PosterCard"
import { CarouselRow, SectionHeader } from "@/components/ui/CarouselRow"
import { Chip } from "@/components/ui/Chip"
import { categorySlug } from "@/lib/category-slug"
import { AUDIO_CONTENT, getContentByCategory } from "@/lib/mock-content"
import type { ContentCategory, ContentItem } from "@/lib/mock-content"

/**
 * Suno tab — Audio Content only, per docs/03_FEATURES/ContentDiscovery/SPEC.md:
 * "composed of Category-browsable sections (Content Categorization) plus
 * Recommendation Engine output scoped to Audio."
 *
 * Same sectioned carousel pattern as Dekho (UI.md: "one layout pattern, varied
 * only by which sections/Content-type each tab includes"), with portrait poster
 * cards for the playlist-style rows.
 *
 * FLAGGED — the mobile Suno design opens with a "Genre" chip row labelled
 * Lofi bhajan / On drive / Sleep music / Meditation music. Those are a genre
 * taxonomy, and no such concept exists in any document: CONTENT_ARCHITECTURE.md
 * defines 5 placeholder Categories and forbids inventing names beyond them. The
 * chip row below therefore filters on **Tags**, which that document does define
 * and which carry the design's labels in the placeholder dataset. Reconciling
 * "genre" vs. Tag vs. Category is an open product decision.
 */
const GENRE_TAGS = ["Lofi bhajan", "On drive", "Sleep music", "Meditation music"]

function audioIn(category: ContentCategory): ContentItem[] {
  return getContentByCategory(category).filter((item) => item.type === "audio")
}

export function SunoPage() {
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const filtered = useMemo(
    () => (activeTag ? AUDIO_CONTENT.filter((item) => item.tags.includes(activeTag)) : null),
    [activeTag]
  )

  const recent = useMemo(
    () => [...AUDIO_CONTENT].sort((a, b) => a.publishedDaysAgo - b.publishedDaysAgo),
    []
  )
  const trending = useMemo(() => [...AUDIO_CONTENT].sort((a, b) => b.views - a.views).slice(0, 10), [])
  const hero = recent[0]

  const sections: { title: string; eyebrow?: string; items: ContentItem[]; seeAllTo?: string }[] = [
    { title: "Trending bhajans", eyebrow: "Most played", items: trending },
    { title: "New releases", items: recent.slice(0, 10) },
    ...(["Bhajans & Kirtan", "Aarti & Rituals", "Discourses & Satsang"] as ContentCategory[]).map((category) => ({
      title: category,
      items: audioIn(category),
      seeAllTo: `/category/${categorySlug(category)}`,
    })),
  ].filter((section) => section.items.length > 0)

  return (
    <div className="flex flex-col gap-8">
      {hero ? (
        <CinematicHero
          content={hero}
          eyebrow="Listen now"
          size="compact"
          related={recent.slice(1, 4)}
          slotNumber={1}
        />
      ) : null}

      <div className="flex flex-col gap-3">
        <SectionHeader title="Genre" />
        <div
          className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:px-0"
          role="tablist"
          aria-label="Filter by genre"
        >
          {[null, ...GENRE_TAGS].map((tag) => (
            <Chip key={tag ?? "all"} active={activeTag === tag} onClick={() => setActiveTag(tag)}>
              {tag ?? "All"}
            </Chip>
          ))}
        </div>
      </div>

      {filtered ? (
        filtered.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
            {filtered.map((item) => (
              <PosterCard key={item.id} content={item} shape="portrait" size="sm" />
            ))}
          </div>
        ) : (
          <p className="py-12 text-center text-sm text-muted-foreground">Nothing in this genre yet.</p>
        )
      ) : (
        sections.map((section) => (
          <CarouselRow
            key={section.title}
            title={section.title}
            eyebrow={section.eyebrow}
            seeAllTo={section.seeAllTo}
            gap="tight"
          >
            {section.items.map((item) => (
              <PosterCard key={item.id} content={item} shape="portrait" />
            ))}
          </CarouselRow>
        ))
      )}
    </div>
  )
}
