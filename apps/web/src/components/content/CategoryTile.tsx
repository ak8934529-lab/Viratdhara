import { Link } from "react-router-dom"

import { cn } from "@dhara/utils"
import { CATEGORY_GRADIENT } from "@/components/content/category-visuals"
import { categorySlug } from "@/lib/category-slug"
import type { ContentCategory } from "@/lib/mock-content"

/**
 * Browse tile — a Category entry point rendered as a filled colour block with
 * the name set top-left and an offset thumbnail bottom-right, matching the
 * mobile Search design's "Your Top Genres" / "Browse All" grids.
 *
 * The design labels these tiles with genre names (Lofi bhajan, Sleep music,
 * Meditation music). Those are NOT the documented V1 Categories, and
 * CONTENT_ARCHITECTURE.md forbids inventing Category names beyond its
 * placeholder list, so these tiles use the 5 documented Categories instead.
 * The design's genre taxonomy is a flagged, unresolved gap.
 */
export function CategoryTile({ category }: { category: ContentCategory }) {
  return (
    <Link
      to={`/category/${categorySlug(category)}`}
      className={cn(
        "group relative flex h-24 overflow-hidden rounded-xl border border-white/10",
        "bg-gradient-to-br transition-transform hover:scale-[1.015]",
        CATEGORY_GRADIENT[category]
      )}
    >
      <p className="relative z-10 max-w-[62%] p-3 text-sm font-semibold leading-snug text-white drop-shadow">
        {category}
      </p>

      {/* Offset thumbnail block, as in the design's tiles. */}
      <span
        aria-hidden
        className="absolute -bottom-2 -right-2 size-16 rotate-[18deg] rounded-md border border-white/20 bg-background/30 backdrop-blur-sm"
      />
    </Link>
  )
}
