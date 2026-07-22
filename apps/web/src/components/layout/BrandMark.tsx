import { cn } from "@dhara/utils"

export interface BrandMarkProps {
  size?: "sm" | "default" | "lg"
  className?: string
}

/** "VIRATDHARA" wordmark — apps/web's own implementation, not packages/mobile's MobileBrandMark. */
export function BrandMark({ size = "default", className }: BrandMarkProps) {
  return (
    <span
      className={cn(
        "font-semibold uppercase tracking-[0.2em] text-accent",
        size === "sm" && "text-xs",
        size === "default" && "text-lg",
        size === "lg" && "text-2xl",
        className
      )}
    >
      Viratdhara
    </span>
  )
}
