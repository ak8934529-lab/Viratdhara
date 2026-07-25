import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRef } from "react"
import type { ReactNode } from "react"
import { Link } from "react-router-dom"

import { cn } from "@dhara/utils"

export interface SectionHeaderProps {
  title: string
  /** Optional eyebrow above the title, e.g. "Continue" or a date marker. */
  eyebrow?: string
  /** "See all" target. Renders the pill link only when provided. */
  seeAllTo?: string
  seeAllLabel?: string
  children?: ReactNode
}

/**
 * Section heading — the web equivalent of `MobileSectionHeading`, with the
 * eyebrow + "See all" pill treatment from the reference designs.
 */
export function SectionHeader({
  title,
  eyebrow,
  seeAllTo,
  seeAllLabel = "See all",
  children,
}: SectionHeaderProps) {
  return (
    <div className="flex items-end justify-between gap-3">
      <div className="min-w-0">
        {eyebrow ? (
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">{eyebrow}</p>
        ) : null}
        <h2 className="truncate text-lg font-semibold tracking-tight text-foreground md:text-xl">{title}</h2>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        {children}
        {seeAllTo ? (
          <Link
            to={seeAllTo}
            className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:border-white/20 hover:text-foreground"
          >
            {seeAllLabel}
          </Link>
        ) : null}
      </div>
    </div>
  )
}

export interface CarouselRowProps extends SectionHeaderProps {
  children: ReactNode
  /** Gap between items. Poster rows sit tighter than landscape rows. */
  gap?: "tight" | "default"
}

/**
 * Horizontally-scrolling Content row with circular prev/next controls, per
 * docs/03_FEATURES/ContentDiscovery/UI.md ("`MobileSectionHeading` + a
 * horizontally-scrolling or grid Content-card row") and the arrow affordance from
 * the reference designs.
 *
 * Scroll-snap keeps items aligned after a drag or an arrow press. The arrows are
 * pointer-only — the row is natively scrollable and keyboard-reachable through its
 * links, so hiding them at Compact removes redundant controls rather than function.
 */
export function CarouselRow({ children, gap = "default", ...header }: CarouselRowProps) {
  const trackRef = useRef<HTMLDivElement>(null)

  function scrollBy(direction: 1 | -1) {
    const track = trackRef.current
    if (!track) return
    // Advance by ~80% of the visible width so a partial card stays as an affordance.
    track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: "smooth" })
  }

  return (
    <section className="flex flex-col gap-3">
      <SectionHeader {...header}>
        <div className="hidden items-center gap-1.5 md:flex">
          <CarouselArrow direction="prev" onClick={() => scrollBy(-1)} />
          <CarouselArrow direction="next" onClick={() => scrollBy(1)} />
        </div>
      </SectionHeader>

      <div
        ref={trackRef}
        className={cn(
          "scrollbar-none -mx-4 flex snap-x snap-mandatory overflow-x-auto px-4 pb-2 md:mx-0 md:px-0",
          gap === "tight" ? "gap-2.5 md:gap-3" : "gap-3 md:gap-4"
        )}
      >
        {children}
      </div>
    </section>
  )
}

function CarouselArrow({ direction, onClick }: { direction: "prev" | "next"; onClick: () => void }) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "prev" ? "Scroll left" : "Scroll right"}
      className="flex size-8 items-center justify-center rounded-full border border-white/12 bg-white/[0.05] text-muted-foreground backdrop-blur-md transition-all hover:border-white/25 hover:bg-white/[0.1] hover:text-foreground active:scale-95"
    >
      <Icon className="size-4" />
    </button>
  )
}
