import type { LucideIcon } from "lucide-react"
import type { ReactNode } from "react"
import { Link } from "react-router-dom"

import { Button } from "@dhara/ui/button"
import { cn } from "@dhara/utils"
import { GlassPanel } from "@/components/glass/GlassPanel"

export interface StatTileProps {
  icon: LucideIcon
  label: string
  value: string
  tone?: "default" | "accent" | "warn"
}

/**
 * Metric tile for the Creator Studio and Administration dashboards — the web
 * equivalent of `MobileStatCard`, which has no numeric value slot of its own
 * (CreatorStudio/COMPONENTS.md anticipates exactly this: "a dedicated analytics
 * component may be built if `MobileStatCard`'s shape doesn't fit").
 *
 * Deliberately carries no trend arrow, sparkline, or delta. CreatorStudio/SPEC.md
 * states trends over time are "not specified", so adding one would be invented UI.
 */
export function StatTile({ icon: Icon, label, value, tone = "default" }: StatTileProps) {
  return (
    <GlassPanel
      tier="base"
      className="group relative flex flex-col gap-3 overflow-hidden p-4 transition-colors hover:border-white/15"
    >
      {/* Corner bloom, so a row of tiles has depth rather than reading as flat boxes. */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute -right-6 -top-6 size-24 rounded-full blur-2xl transition-opacity",
          tone === "warn" ? "bg-destructive/20" : tone === "accent" ? "bg-accent/25" : "bg-primary/20"
        )}
      />

      <span
        className={cn(
          "relative flex size-9 items-center justify-center rounded-xl ring-1",
          tone === "warn"
            ? "bg-destructive/15 text-destructive ring-destructive/25"
            : tone === "accent"
              ? "bg-accent/15 text-accent ring-accent/25"
              : "bg-primary/15 text-primary ring-primary/25"
        )}
      >
        <Icon className="size-4" />
      </span>

      <div className="relative">
        <p className="text-2xl font-semibold leading-none tabular-nums tracking-tight text-foreground">{value}</p>
        <p className="mt-1.5 text-xs text-muted-foreground">{label}</p>
      </div>
    </GlassPanel>
  )
}

export interface PageHeaderProps {
  title: string
  subtitle?: string
  /** Back-arrow target. Pushed/detail screens pass this; tab roots don't. */
  backTo?: string
  /**
   * Accessible label for the back control. Defaults to "Back", but screens nested
   * more than one level deep should name their destination ("Back to settings") so
   * the label is meaningful out of context — ACCESSIBILITY.md requires controls be
   * distinguishable by their accessible name alone.
   */
  backLabel?: string
  children?: ReactNode
}

/**
 * Heading block for pushed/detail and dashboard screens — optional back arrow,
 * title, subtitle, and a trailing action slot.
 *
 * Replaces the near-identical arrow-plus-heading markup that Search, Category,
 * Creator Profile, and all four Settings screens each carried separately.
 */
export function PageHeader({ title, subtitle, backTo, backLabel = "Back", children }: PageHeaderProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {backTo ? (
        <Button variant="ghost" size="icon-sm" asChild aria-label={backLabel}>
          <Link to={backTo}>
            <BackArrow />
          </Link>
        </Button>
      ) : null}

      <div className="min-w-0 flex-1">
        <h1 className="truncate text-xl font-semibold leading-tight tracking-tight text-foreground md:text-2xl">
          {title}
        </h1>
        {subtitle ? <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p> : null}
      </div>

      {children ? <div className="flex shrink-0 items-center gap-2">{children}</div> : null}
    </div>
  )
}

function BackArrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5" aria-hidden>
      <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
