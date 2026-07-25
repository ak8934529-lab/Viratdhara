import { ArrowUpRight } from "lucide-react"
import { Link } from "react-router-dom"

import { categorySlug } from "@/lib/category-slug"
import type { ContentCategory } from "@/lib/mock-content"
import { CATEGORY_GLYPH, posterBackground } from "@/lib/poster-art"

/**
 * Browse tile — a Category entry point rendered over its generated artwork, the
 * "Browse All" grid treatment from the mobile Search design.
 *
 * The design labels these tiles with genre names (Lofi bhajan, Sleep music,
 * Meditation music). Those are NOT the documented V1 Categories, and
 * CONTENT_ARCHITECTURE.md forbids inventing Category names beyond its placeholder
 * list, so these tiles use the 5 documented Categories instead. The design's genre
 * taxonomy remains a flagged, unresolved gap.
 */
export function CategoryTile({ category }: { category: ContentCategory }) {
  return (
    <Link
      to={`/category/${categorySlug(category)}`}
      className="group relative flex h-28 overflow-hidden rounded-xl ring-1 ring-white/10 shadow-[var(--shadow-lift)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-float)] hover:ring-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent md:h-32"
      style={{
        backgroundImage: posterBackground(category, `${category}-tile`, "landscape"),
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <span aria-hidden className="scrim-bottom absolute inset-0" />

      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-2 right-1 select-none text-5xl font-semibold leading-none text-white/[0.12] transition-transform duration-500 group-hover:scale-110 md:text-6xl"
      >
        {CATEGORY_GLYPH[category]}
      </span>

      <span className="relative flex w-full items-end justify-between gap-2 p-3.5">
        <span className="max-w-[76%] text-sm font-semibold leading-snug text-white drop-shadow md:text-[15px]">
          {category}
        </span>
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-white/80 backdrop-blur-md transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
          <ArrowUpRight className="size-3.5" />
        </span>
      </span>
    </Link>
  )
}
