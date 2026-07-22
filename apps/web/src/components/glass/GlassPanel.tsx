import type { ComponentProps } from "react"

import { cn } from "@dhara/utils"

export interface GlassPanelProps extends ComponentProps<"div"> {
  /** Surface tier per docs/02_DESIGN/SURFACE_SYSTEM.md. Default "base". */
  tier?: "base" | "raised" | "accent"
}

/**
 * The one place the 3 glass surface tiers are implemented. Screens compose
 * this rather than applying `surface-glass-*` utility classes directly.
 */
export function GlassPanel({ tier = "base", className, ...props }: GlassPanelProps) {
  return (
    <div
      className={cn(
        tier === "base" && "surface-glass-base",
        tier === "raised" && "surface-glass-raised",
        tier === "accent" && "surface-glass-accent",
        className
      )}
      {...props}
    />
  )
}
