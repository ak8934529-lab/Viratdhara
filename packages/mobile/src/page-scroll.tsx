import type { ReactNode } from "react"

import { cn } from "@dhara/utils"

export interface PageScrollProps {
  children: ReactNode
  className?: string
}

/** Vertical padding + gap wrapper for page content inside MobileMain. */
export function PageScroll({ children, className }: PageScrollProps) {
  return <div className={cn("flex flex-col gap-5 px-4 pb-8 pt-4", className)}>{children}</div>
}
