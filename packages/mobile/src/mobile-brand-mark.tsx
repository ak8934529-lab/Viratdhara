import { cn } from "@dhara/utils"

export interface MobileBrandMarkProps {
  size?: "sm" | "default" | "lg"
  className?: string
}

/** "VIRATDHARA" wordmark used on splash/onboarding screens. */
export function MobileBrandMark({ size = "default", className }: MobileBrandMarkProps) {
  return (
    <span
      className={cn(
        "font-semibold uppercase tracking-[0.2em] text-accent",
        size === "sm" && "text-sm",
        size === "default" && "text-lg",
        size === "lg" && "text-2xl",
        className
      )}
    >
      Viratdhara
    </span>
  )
}
