import type { ReactNode } from "react"

import { cn } from "@dhara/utils"

export interface MobileTopBarProps {
  title?: string
  subtitle?: string
  leading?: ReactNode
  trailing?: ReactNode
  className?: string
}

/** Sticky top chrome: back-arrow/title on the left, search/bell/avatar slot on the right. */
export function MobileTopBar({ title, subtitle, leading, trailing, className }: MobileTopBarProps) {
  return (
    <header
      className={cn(
        "z-20 flex shrink-0 items-center gap-3 bg-background/90 px-4 pt-[env(safe-area-inset-top)] backdrop-blur-md",
        className
      )}
    >
      <div className="flex h-16 min-w-0 flex-1 items-center gap-3">
        {leading ? <div className="shrink-0">{leading}</div> : null}
        {title ? (
          <div className="min-w-0 flex-1 leading-tight">
            <p className="text-app-title truncate">{title}</p>
            {subtitle ? <p className="truncate text-[11px] text-muted-foreground">{subtitle}</p> : null}
          </div>
        ) : (
          <div className="min-w-0 flex-1" />
        )}
        {trailing ? <div className="flex shrink-0 items-center gap-1">{trailing}</div> : null}
      </div>
    </header>
  )
}
