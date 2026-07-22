import type { ReactNode } from "react"

import { cn } from "@dhara/utils"

export interface MobileMainProps {
  children: ReactNode
  className?: string
}

/** Scrollable content area between the top bar and bottom nav. */
export function MobileMain({ children, className }: MobileMainProps) {
  return (
    <main className={cn("relative min-h-0 flex-1 overflow-y-auto overscroll-contain", className)}>
      {children}
    </main>
  )
}
