import { ArrowLeft, FolderOpen } from "lucide-react"
import { useMemo, useState } from "react"
import { Link, Navigate, useParams } from "react-router-dom"

import { Button } from "@dhara/ui/button"
import { cn } from "@dhara/utils"
import { EmptyState } from "@/components/content/EmptyState"
import { categoryFromSlug } from "@/lib/category-slug"
import { VideoCard } from "@/components/content/VideoCard"
import { CONTENT_CATEGORIES, getContentByCategory } from "@/lib/mock-content"

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
    <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon-sm" asChild aria-label="Back">
          <Link to="/">
            <ArrowLeft className="size-5" />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold leading-tight text-foreground">{category}</h1>
      </div>

      {/* Optional Tag filter row — same chip pattern as the inline Category row. */}
      {tags.length > 0 ? (
        <div
          className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:px-0"
          role="tablist"
          aria-label="Filter by tag"
        >
          {[null, ...tags].map((tag) => (
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
      ) : null}

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
