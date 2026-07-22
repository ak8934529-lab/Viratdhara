import type { ReactNode } from "react"

import { cn } from "@dhara/utils"

export interface MobileAppShellProps {
  children: ReactNode
  className?: string
}

/** Outer full-height shell: fixed viewport, no body scroll, children stack vertically. */
export function MobileAppShell({ children, className }: MobileAppShellProps) {
  return <div className={cn("mobile-shell mx-auto max-w-md", className)}>{children}</div>
}
