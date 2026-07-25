import { useMemo, useState } from "react"

import { cn } from "@dhara/utils"
import { PosterCard } from "@/components/content/PosterCard"
import { SectionRow } from "@/components/content/SectionRow"
import { AUDIO_CONTENT, getContentByCategory } from "@/lib/mock-content"
import type { ContentItem } from "@/lib/mock-content"

/**
 * Suno tab — Audio Content only, per docs/03_FEATURES/ContentDiscovery/SPEC.md:
 * "composed of Category-browsable sections (Content Categorization) plus
 * Recommendation Engine output scoped to Audio."
 *
 * Same sectioned layout pattern as Dekho (UI.md: "one layout pattern, varied
 * only by which sections/Content-type each tab includes"), with the design's
 * taller portrait cards for playlist-style rows.
 *
 * FLAGGED — the mobile Suno design opens with a "Genre" chip row labelled
 * Lofi bhajan / On drive / Sleep music / Meditation music. Those are a genre
 * taxonomy, and no such concept exists in any document: CONTENT_ARCHITECTURE.md
 * defines 5 placeholder Categories and forbids inventing names beyond them. The
 * chip row below therefore filters on **Tags**, which CONTENT_ARCHITECTURE.md
 * does define ("Tags (zero or more)") and which happen to carry the design's
 * labels in the placeholder dataset. Reconciling "genre" vs. Tag vs. Category is
 * an open product decision, not something resolved here.
 *
 * Section titles other than "Recommended for you" are likewise not specified —
 * UI.md defers section ordering/curation entirely.
 */
const GENRE_TAGS = ["Lofi bhajan", "On drive", "Sleep music", "Meditation music"]

function audioIn(category: Parameters<typeof getContentByCategory>[0]): ContentItem[] {
  return getContentByCategory(category).filter((item) => item.type === "audio")
}

export function SunoPage() {
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const filtered = useMemo(
    () => (activeTag ? AUDIO_CONTENT.filter((item) => item.tags.includes(activeTag)) : null),
    [activeTag]
  )

  /** Recommendation Engine output scoped to Audio — recency, per the V1 heuristic. */
  const recommended = useMemo(
    () => [...AUDIO_CONTENT].sort((a, b) => a.publishedDaysAgo - b.publishedDaysAgo).slice(0, 8),
    []
  )

  const trending = useMemo(() => [...AUDIO_CONTENT].sort((a, b) => b.views - a.views).slice(0, 8), [])

  const sections: { title: string; items: ContentItem[] }[] = [
    { title: "Recommended for you", items: recommended },
    { title: "Trending bhajans", items: trending },
    { title: "Bhajans & Kirtan", items: audioIn("Bhajans & Kirtan") },
    { title: "Aarti & Rituals", items: audioIn("Aarti & Rituals") },
    { title: "Discourses & Satsang", items: audioIn("Discourses & Satsang") },
  ].filter((section) => section.items.length > 0)

  return (
    <div className="flex flex-col gap-6">
      {/* Genre-style chip row, driven by Tags — see the flag above. */}
      <div className="flex flex-col gap-2">
        <h2 className="text-base font-semibold text-foreground md:text-lg">Genre</h2>
        <div
          className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:px-0"
          role="tablist"
          aria-label="Filter by genre"
        >
          {[null, ...GENRE_TAGS].map((tag) => (
            <button
              key={tag ?? "all"}
              type="button"
              role="tab"
              aria-selected={activeTag === tag}
              onClick={() => setActiveTag(tag)}
              className={cn(
                "shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors",
                activeTag === tag
                  ? "border-accent bg-accent/20 text-foreground"
                  : "border-border/60 bg-card/20 text-muted-foreground hover:text-foreground"
              )}
            >
              {tag ?? "All"}
            </button>
          ))}
        </div>
      </div>

      {filtered ? (
        filtered.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {filtered.map((item) => (
              <PosterCard key={item.id} content={item} shape="portrait" />
            ))}
          </div>
        ) : (
          <p className="py-12 text-center text-sm text-muted-foreground">Nothing in this genre yet.</p>
        )
      ) : (
        sections.map((section) => (
          <SectionRow key={section.title} title={section.title}>
            {section.items.map((item) => (
              <PosterCard key={item.id} content={item} shape="portrait" />
            ))}
          </SectionRow>
        ))
      )}
    </div>
  )
}
