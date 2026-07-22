import type { LucideIcon } from "lucide-react"
import type { ButtonHTMLAttributes } from "react"

import { ICON_STROKE_WIDTH } from "@dhara/constants"
import { cn } from "@dhara/utils"

export interface MobileFabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon
  label?: string
  position?: "bottom" | "inline"
  className?: string
}

/** Floating action button — 56dp touch target, primary emphasis action. */
export function MobileFab({ icon: Icon, label, position = "bottom", className, ...props }: MobileFabProps) {
  const extended = Boolean(label)

  return (
    <button
      type="button"
      {...props}
      className={cn(
        "z-20 flex items-center justify-center gap-2.5 rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-transform active:scale-95",
        extended ? "h-14 px-5 text-sm font-semibold" : "size-14",
        position === "bottom" && "absolute bottom-5 right-4",
        className
      )}
    >
      <Icon className="size-6" strokeWidth={ICON_STROKE_WIDTH} aria-hidden />
      {label ? <span>{label}</span> : null}
    </button>
  )
}
