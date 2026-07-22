import type { ReactNode } from "react"

import { cn } from "@dhara/utils"

export interface MobileActionBarProps {
  children: ReactNode
  className?: string
}

/** Sticky bottom CTA bar for detail screens — "Buy Now", "Book Pandit Ji", "Track Live Location". */
export function MobileActionBar({ children, className }: MobileActionBarProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 border-t border-border/50 bg-background/95 px-4 py-3 pb-[env(safe-area-inset-bottom)] backdrop-blur-md",
        className
      )}
    >
      {children}
    </div>
  )
}
