import { Link } from "react-router-dom"

import { Badge } from "@dhara/ui/badge"
import { Button } from "@dhara/ui/button"
import { cn } from "@dhara/utils"
import { CATEGORY_GRADIENT } from "@/components/content/category-visuals"
import { GlassPanel } from "@/components/glass/GlassPanel"
import { categorySlug } from "@/lib/category-slug"
import { ADMIN_CATEGORIES } from "@/lib/mock-admin"

/**
 * Administration → Categories (`/admin/categories`). "Controls categories" is one
 * of the Administrator duties named in PRODUCT_CONTEXT.md.
 *
 * ⚠️ BEYOND SPECIFICATION — see lib/mock-admin.ts. No category-management screen,
 * route, or operation is defined anywhere.
 *
 * One documented fact shapes this screen and is surfaced directly in it: the V1
 * Category list is a PLACEHOLDER. CONTENT_ARCHITECTURE.md marks it "placeholder,
 * not confirmed … It must be replaced with a confirmed list before launch, not
 * treated as final", and forbids any feature inventing a Category name beyond it.
 *
 * So add/rename/delete controls are deliberately NOT functional here: making the
 * placeholder taxonomy editable in the product would let it drift from
 * CONTENT_ARCHITECTURE.md, which is the authoritative source. Category changes
 * belong in that document first.
 */
export function AdminCategoriesPage() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-xl font-semibold leading-tight text-foreground">Categories</h1>
        <p className="mt-1 text-xs text-muted-foreground">
          Every content item belongs to exactly one category. Multi-category content isn&apos;t supported.
        </p>
      </div>

      {/* The placeholder status is stated in the product, not hidden in a comment. */}
      <GlassPanel tier="accent" className="flex flex-col gap-1.5 p-4">
        <p className="text-sm font-semibold text-foreground">This list is a placeholder</p>
        <p className="text-xs text-foreground/80">
          These five categories are provisional and must be replaced with a confirmed taxonomy before launch.
          They&apos;re defined in <code className="text-accent">CONTENT_ARCHITECTURE.md</code>, which is the source of
          truth — so they aren&apos;t editable here.
        </p>
      </GlassPanel>

      <GlassPanel tier="base" className="divide-y divide-white/5 p-0">
        {ADMIN_CATEGORIES.map(({ category, itemCount, totalViews }) => (
          <div key={category} className="flex items-center gap-3 p-3 md:gap-4 md:p-4">
            <span
              className={cn("size-10 shrink-0 rounded-lg bg-gradient-to-br", CATEGORY_GRADIENT[category])}
              aria-hidden
            />

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">{category}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {itemCount} item{itemCount === 1 ? "" : "s"} · {totalViews.toLocaleString()} views
              </p>
            </div>

            {itemCount === 0 ? (
              <Badge variant="outline" className="hidden md:inline-flex">
                Empty
              </Badge>
            ) : null}

            <Button size="sm" variant="outline" asChild>
              <Link to={`/category/${categorySlug(category)}`}>View</Link>
            </Button>
          </div>
        ))}
      </GlassPanel>
    </div>
  )
}
