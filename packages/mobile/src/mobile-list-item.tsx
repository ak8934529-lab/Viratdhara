import type { ReactNode } from "react"
import { ChevronRight, type LucideIcon } from "lucide-react"

import { ICON_STROKE_WIDTH } from "@dhara/constants"
import { cn } from "@dhara/utils"

export interface MobileListItemProps {
  icon?: LucideIcon
  title: string
  subtitle?: string
  trailing?: ReactNode
  showChevron?: boolean
  onClick?: () => void
  className?: string
}

/** Single-line settings/downloads/history row: icon, title (+subtitle), trailing content. */
export function MobileListItem({
  icon: Icon,
  title,
  subtitle,
  trailing,
  showChevron = true,
  onClick,
  className,
}: MobileListItemProps) {
  const Comp = onClick ? "button" : "div"

  return (
    <Comp
      type={onClick ? "button" : undefined}
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors",
        onClick && "hover:bg-muted/40 active:bg-muted/60",
        className
      )}
    >
      {Icon ? (
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted/60 text-foreground">
          <Icon className="size-4.5" strokeWidth={ICON_STROKE_WIDTH} aria-hidden />
        </span>
      ) : null}
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium text-foreground">{title}</span>
        {subtitle ? (
          <span className="block truncate text-xs text-muted-foreground">{subtitle}</span>
        ) : null}
      </span>
      {trailing}
      {showChevron && !trailing ? (
        <ChevronRight className="size-4 shrink-0 text-muted-foreground" aria-hidden />
      ) : null}
    </Comp>
  )
}
