import type { ReactNode } from "react"

import { cn } from "@dhara/utils"

export interface MobileTonalCardProps {
  children: ReactNode
  className?: string
}

/** Base surface for domain cards in @dhara/blocks — flat tonal fill, no ring. */
export function MobileTonalCard({ children, className }: MobileTonalCardProps) {
  return <div className={cn("surface-tonal overflow-hidden", className)}>{children}</div>
}
