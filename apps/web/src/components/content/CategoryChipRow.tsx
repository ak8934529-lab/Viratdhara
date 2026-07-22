import { cn } from "@dhara/utils"
import type { ContentCategory } from "@/lib/mock-content"

export interface CategoryChipRowProps {
  categories: ContentCategory[]
  active: ContentCategory | "All"
  onSelect: (category: ContentCategory | "All") => void
}

/**
 * Inline category filter row per docs/03_FEATURES/ContentCategorization/UI.md
 * ("Inline filter row" — non-exclusive-looking but single-select for V1 Home).
 */
export function CategoryChipRow({ categories, active, onSelect }: CategoryChipRowProps) {
  const options: (ContentCategory | "All")[] = ["All", ...categories]

  return (
    <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:px-0" role="tablist" aria-label="Filter by category">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          role="tab"
          aria-selected={active === option}
          onClick={() => onSelect(option)}
          className={cn(
            "shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors",
            active === option
              ? "border-accent bg-accent/20 text-foreground"
              : "border-border/60 bg-card/20 text-muted-foreground hover:text-foreground"
          )}
        >
          {option}
        </button>
      ))}
    </div>
  )
}
