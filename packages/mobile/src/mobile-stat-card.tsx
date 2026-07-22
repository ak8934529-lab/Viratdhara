import type { LucideIcon } from "lucide-react"

import { ICON_STROKE_WIDTH } from "@dhara/constants"
import { cn } from "@dhara/utils"

export interface MobileStatCardProps {
  icon: LucideIcon
  title: string
  subtitle?: string
  onClick?: () => void
  className?: string
}

/** 2-column grid tile — "Temple Live / Events / Pooja & Aarti / Special Moments" quick actions. */
export function MobileStatCard({ icon: Icon, title, subtitle, onClick, className }: MobileStatCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "surface-card flex flex-col items-start gap-2 p-4 text-left transition-transform active:scale-[0.98]",
        className
      )}
    >
      <span className="flex size-9 items-center justify-center rounded-full bg-primary/15 text-primary">
        <Icon className="size-4.5" strokeWidth={ICON_STROKE_WIDTH} aria-hidden />
      </span>
      <span className="text-sm font-semibold text-foreground">{title}</span>
      {subtitle ? <span className="text-xs text-muted-foreground">{subtitle}</span> : null}
    </button>
  )
}
