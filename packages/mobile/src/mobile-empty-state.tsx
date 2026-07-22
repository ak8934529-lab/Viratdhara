import type { LucideIcon } from "lucide-react"
import type { ReactNode } from "react"

import { ICON_STROKE_WIDTH } from "@dhara/constants"
import { cn } from "@dhara/utils"

export interface MobileEmptyStateProps {
  icon?: LucideIcon
  title: string
  description?: string
  action?: ReactNode
  className?: string
}

/**
 * Standard empty/placeholder state. The source Figma file left several screens
 * (Pooja Samagri, Temple Merchandise) with literal "<Pooja Name>" placeholder
 * text instead of a real empty state — this component is what should render
 * there instead once real data is unavailable/loading.
 */
export function MobileEmptyState({ icon: Icon, title, description, action, className }: MobileEmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center gap-3 px-6 py-12 text-center", className)}>
      {Icon ? (
        <span className="flex size-14 items-center justify-center rounded-full bg-muted/40 text-muted-foreground">
          <Icon className="size-6" strokeWidth={ICON_STROKE_WIDTH} aria-hidden />
        </span>
      ) : null}
      <p className="text-sm font-semibold text-foreground">{title}</p>
      {description ? <p className="max-w-[26ch] text-xs text-muted-foreground">{description}</p> : null}
      {action}
    </div>
  )
}
