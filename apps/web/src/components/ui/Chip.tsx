import type { ComponentProps, ReactNode } from "react"

import { cn } from "@dhara/utils"

export interface ChipProps extends Omit<ComponentProps<"button">, "children"> {
  children: ReactNode
  active?: boolean
  /**
   * "filter" — selectable pill (category/genre/tag rows).
   * "meta"   — non-interactive descriptor (genre labels on a hero).
   * "time"   — compact tabular pill (session times, durations).
   */
  tone?: "filter" | "meta" | "time"
  as?: "button" | "span"
}

/**
 * The single pill primitive for every chip row in apps/web — category filters,
 * genre labels, tag rows, time slots.
 *
 * Previously each screen hand-rolled its own `rounded-full border px-3.5 py-1.5`
 * markup (Home, Suno, Category all had near-duplicates that had already drifted),
 * which is exactly what DESIGN_SYSTEM_RULES.md's reuse principle exists to stop.
 */
export function Chip({ children, active, tone = "filter", as = "button", className, ...props }: ChipProps) {
  const shared = cn(
    "inline-flex shrink-0 items-center gap-1.5 rounded-full font-semibold transition-all duration-200",
    tone === "time" ? "px-3 py-1 text-[11px] tabular-nums" : "px-3.5 py-1.5 text-xs",
    className
  )

  if (as === "span" || tone === "meta") {
    return (
      <span
        className={cn(
          shared,
          "border border-white/12 bg-white/[0.06] text-foreground/85 backdrop-blur-sm"
        )}
      >
        {children}
      </span>
    )
  }

  return (
    <button
      type="button"
      aria-pressed={active}
      className={cn(
        shared,
        active
          ? "border border-accent/50 bg-accent text-accent-foreground shadow-[0_4px_14px_-4px_color-mix(in_oklch,var(--accent)_60%,transparent)]"
          : "border border-white/10 bg-white/[0.04] text-muted-foreground hover:border-white/20 hover:bg-white/[0.09] hover:text-foreground"
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export interface RatingBadgeProps {
  children: ReactNode
  tone?: "neutral" | "match" | "warn"
}

/**
 * Small metadata badge for card corners and hero meta lines — certification
 * ("U/A 13+"), a match percentage, or a rating. The "match" tone is the green
 * percentage treatment from the reference designs.
 */
export function RatingBadge({ children, tone = "neutral" }: RatingBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide backdrop-blur-md",
        tone === "neutral" && "bg-black/55 text-white/90 ring-1 ring-white/15",
        tone === "match" && "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-400/30",
        tone === "warn" && "bg-destructive/20 text-destructive ring-1 ring-destructive/35"
      )}
    >
      {children}
    </span>
  )
}
