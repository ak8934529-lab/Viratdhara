import type { ReactNode } from "react"

import { cn } from "@dhara/utils"

export interface SectionRowProps {
  title: string
  /**
   * Optional trailing slot, mirroring `MobileSectionHeading`'s `action` prop.
   * No document specifies what belongs here, so callers pass it explicitly
   * rather than this component inventing a default "See all".
   */
  action?: ReactNode
  /**
   * "scroll" — horizontally-scrolling row (the mobile design's treatment for
   * Suno/Dekho sections). "grid" — responsive grid. `ContentDiscovery/UI.md`
   * permits both: "a horizontally-scrolling or grid Content-card row".
   */
  layout?: "scroll" | "grid"
  children: ReactNode
  className?: string
}

/**
 * Section heading + Content-card row — the one layout pattern shared by the
 * Home/Suno/Dekho feeds, per docs/03_FEATURES/ContentDiscovery/UI.md
 * ("Sections within a feed use `MobileSectionHeading` + a horizontally-scrolling
 * or grid Content-card row"). The web equivalent of `MobileSectionHeading`,
 * since `packages/mobile` is not reused in `apps/web` (RESPONSIVE_SYSTEM.md).
 *
 * Scroll rows bleed to the viewport edge at Compact (negative margin + padding)
 * so cards run under the screen edge as they do in the mobile design.
 */
export function SectionRow({ title, action, layout = "scroll", children, className }: SectionRowProps) {
  return (
    <section className={cn("flex flex-col gap-3", className)}>
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base font-semibold text-foreground md:text-lg">{title}</h2>
        {action}
      </div>

      {layout === "scroll" ? (
        <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1 md:mx-0 md:gap-4 md:px-0">{children}</div>
      ) : (
        <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{children}</div>
      )}
    </section>
  )
}
