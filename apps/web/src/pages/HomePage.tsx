import { useMemo, useState } from "react"

import { CategoryChipRow } from "@/components/content/CategoryChipRow"
import { VideoCard } from "@/components/content/VideoCard"
import type { ContentCategory } from "@/lib/mock-content"
import { CONTENT_CATEGORIES, MOCK_CONTENT } from "@/lib/mock-content"

/**
 * Home tab — sectionless mixed feed, per docs/03_FEATURES/ContentDiscovery/UI.md.
 * Content is placeholder data (CONTENT_ARCHITECTURE.md's V1 category list is
 * itself a placeholder) until 04_BACKEND/Content API exists.
 */
export function HomePage() {
  const [active, setActive] = useState<ContentCategory | "All">("All")

  const filtered = useMemo(
    () => (active === "All" ? MOCK_CONTENT : MOCK_CONTENT.filter((item) => item.category === active)),
    [active]
  )

  return (
    <div className="flex flex-col gap-5">
      <CategoryChipRow categories={CONTENT_CATEGORIES} active={active} onSelect={setActive} />

      <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((item) => (
          <VideoCard key={item.id} content={item} />
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="py-12 text-center text-sm text-muted-foreground">No content in this category yet.</p>
      ) : null}
    </div>
  )
}
