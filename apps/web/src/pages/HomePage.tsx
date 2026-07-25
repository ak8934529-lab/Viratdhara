import { useMemo, useState } from "react"

import { CinematicHero } from "@/components/content/CinematicHero"
import { PosterCard } from "@/components/content/PosterCard"
import { VideoCard } from "@/components/content/VideoCard"
import { CarouselRow, SectionHeader } from "@/components/ui/CarouselRow"
import { Chip } from "@/components/ui/Chip"
import { categorySlug } from "@/lib/category-slug"
import type { ContentCategory, ContentItem } from "@/lib/mock-content"
import { CONTENT_CATEGORIES, MOCK_CONTENT } from "@/lib/mock-content"

/**
 * Home tab — mixed-Content feed, per docs/03_FEATURES/ContentDiscovery/UI.md.
 * SPEC.md has Home "composed entirely of Recommendation Engine output", so there
 * is no separate editorial featured source: the hero is simply the top-ranked
 * item of that same output.
 *
 * Content is placeholder data (CONTENT_ARCHITECTURE.md's V1 category list is
 * itself a placeholder) until 04_BACKEND/Content API exists.
 *
 * Note: the Panchang dashboard in the supplied mobile design is deliberately not
 * built here — Panchang is not one of the 11 V1 features and appears nowhere in
 * FEATURE_REGISTRY.md. Deferred by explicit decision; see CHANGELOG.md.
 */
export function HomePage() {
  const [active, setActive] = useState<ContentCategory | "All">("All")

  const filtered = useMemo(
    () => (active === "All" ? MOCK_CONTENT : MOCK_CONTENT.filter((item) => item.category === active)),
    [active]
  )

  /** Recency stands in for ranking — the V1 placeholder heuristic's fallback. */
  const ranked = useMemo(
    () => [...MOCK_CONTENT].sort((a, b) => a.publishedDaysAgo - b.publishedDaysAgo),
    []
  )

  const hero = ranked[0]
  const continueWatching = ranked.slice(1, 9)
  const trending = useMemo(() => [...MOCK_CONTENT].sort((a, b) => b.views - a.views).slice(0, 10), [])

  const showRows = active === "All"

  return (
    <div className="flex flex-col gap-8">
      {hero ? <CinematicHero content={hero} eyebrow="Featured today" /> : null}

      <div
        className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:px-0"
        role="tablist"
        aria-label="Filter by category"
      >
        {(["All", ...CONTENT_CATEGORIES] as (ContentCategory | "All")[]).map((option) => (
          <Chip key={option} active={active === option} onClick={() => setActive(option)}>
            {option}
          </Chip>
        ))}
      </div>

      {showRows ? (
        <>
          <CarouselRow title="Continue your dhara" gap="tight">
            {continueWatching.map((item: ContentItem) => (
              <PosterCard key={item.id} content={item} shape="portrait" />
            ))}
          </CarouselRow>

          <CarouselRow title="Trending now" eyebrow="Most played" gap="tight">
            {trending.map((item: ContentItem, index) => (
              <PosterCard key={item.id} content={item} shape="portrait" rank={index + 1} />
            ))}
          </CarouselRow>
        </>
      ) : null}

      <section className="flex flex-col gap-4">
        <SectionHeader
          title={active === "All" ? "Everything for you" : active}
          seeAllTo={active === "All" ? undefined : `/category/${categorySlug(active)}`}
        />

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-5 gap-y-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((item) => (
              <VideoCard key={item.id} content={item} />
            ))}
          </div>
        ) : (
          <p className="py-12 text-center text-sm text-muted-foreground">No content in this category yet.</p>
        )}
      </section>
    </div>
  )
}
