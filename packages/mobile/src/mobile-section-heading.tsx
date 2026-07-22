import type { ReactNode } from "react"

import { cn } from "@dhara/utils"

export interface MobileSectionHeadingProps {
  title: string
  action?: ReactNode
  className?: string
}

export function MobileSectionHeading({ title, action, className }: MobileSectionHeadingProps) {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <h2 className="text-sm font-semibold text-foreground">{title}</h2>
      {action}
    </div>
  )
}
