import type { ReactNode } from "react"

import { cn } from "@dhara/utils"

export interface MobileListCardProps {
  image?: ReactNode
  title: string
  subtitle?: string
  meta?: ReactNode
  trailing?: ReactNode
  onClick?: () => void
  className?: string
}

/** Horizontal row card with a leading thumbnail — track rows, download rows, order rows. */
export function MobileListCard({ image, title, subtitle, meta, trailing, onClick, className }: MobileListCardProps) {
  const Comp = onClick ? "button" : "div"

  return (
    <Comp
      type={onClick ? "button" : undefined}
      onClick={onClick}
      className={cn(
        "surface-card flex w-full items-center gap-3 p-2.5 text-left transition-colors",
        onClick && "hover:bg-muted/20 active:bg-muted/30",
        className
      )}
    >
      {image ? <div className="size-12 shrink-0 overflow-hidden rounded-lg bg-muted">{image}</div> : null}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-foreground">{title}</p>
        {subtitle ? <p className="truncate text-xs text-muted-foreground">{subtitle}</p> : null}
        {meta}
      </div>
      {trailing}
    </Comp>
  )
}
