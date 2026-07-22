import type { ReactNode } from "react"

import { cn } from "@dhara/utils"

export interface MobilePageBodyProps {
  children: ReactNode
  className?: string
}

/** Lighter-weight alternative to PageScroll — no default padding, just a gap stack. */
export function MobilePageBody({ children, className }: MobilePageBodyProps) {
  return <div className={cn("flex flex-col gap-4", className)}>{children}</div>
}
