import { FolderOpen } from "lucide-react"
import { useMemo, useState } from "react"
import { Navigate, useParams } from "react-router-dom"

import { EmptyState } from "@/components/content/EmptyState"
import { Chip } from "@/components/ui/Chip"
import { PageHeader } from "@/components/ui/StatTile"
import { categoryFromSlug } from "@/lib/category-slug"
import { VideoCard } from "@/components/content/VideoCard"
import { CONTENT_CATEGORIES, getContentByCategory } from "@/lib/mock-content"
import { CATEGORY_GLYPH, posterBackground } from "@/lib/poster-art"

/**
 * Category browse (`/category/:id`) — a pushed/detail screen, per
 * docs/03_FEATURES/ContentCategorization/UI.md: "Content grid/list scoped to the
 * Category, with an optional Tag filter row". Grid density per that same doc:
 * Compact single column, Medium 2-column, Wide 3+.
 *
 * SPEC.md: every Content item belongs to exactly one Category, and this feature
 * never shows an item under a Category other than its assigned one. Tag
 * filtering narrows within the Category without changing that scope.
 */
export function CategoryPage() {
  const { id } = useParams<{ id: string }>()
  const category = id ? categoryFromSlug(id, CONTENT_CATEGORIES) : undefined
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const items = useMemo(() => (category ? getContentByCategory(category) : []), [category])

  // Tag row is scoped to tags actually present in this Category — no global
  // vocabulary exists in any document.
  const tags = useMemo(() => Array.from(new Set(items.flatMap((item) => item.tags))).sort(), [items])

  const filtered = activeTag ? items.filter((item) => item.tags.includes(activeTag)) : items

  if (!category) return <Navigate to="/" replace />

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-6">
      {/* Category banner — the same generated artwork the cards use, so a browse
          screen reads as part of the catalogue rather than a bare list. */}
      <div
        className="relative -mx-4 -mt-5 overflow-hidden md:-mx-6 md:mt-0 md:rounded-2xl lg:-mx-8"
        style={{
          backgroundImage: posterBackground(category, `${category}-banner`, "landscape"),
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div aria-hidden className="scrim-left absolute inset-0" />
        <span
          aria-hidden
          className="pointer-events-none absolute -right-1 bottom-0 select-none text-[clamp(4rem,12vw,9rem)] font-semibold leading-none text-white/[0.07]"
        >
          {CATEGORY_GLYPH[category]}
        </span>
        <div className="relative p-5 md:p-8">
          <PageHeader
            title={category}
            subtitle={`${items.length} item${items.length === 1 ? "" : "s"} in this category`}
            backTo="/"
          />
        </div>
      </div>

      {/* Optional Tag filter row — same chip primitive as every other filter row. */}
      {tags.length > 0 ? (
        <div
          className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:px-0"
          role="tablist"
          aria-label="Filter by tag"
        >
          {[null, ...tags].map((tag) => (
            <Chip key={tag ?? "all"} active={activeTag === tag} onClick={() => setActiveTag(tag)}>
              {tag ?? "All"}
            </Chip>
          ))}
        </div>
      ) : null}

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-x-5 gap-y-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((item) => (
            <VideoCard key={item.id} content={item} />
          ))}
        </div>
      ) : (
        /* Empty Category — EDGE_CASES.md: never blank space, never a stuck spinner. */
        <EmptyState
          icon={FolderOpen}
          title="Nothing here yet"
          description="No content in this category matches the selected tag."
        />
      )}
    </div>
  )
}
