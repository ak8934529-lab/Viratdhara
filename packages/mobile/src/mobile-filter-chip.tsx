import { cn } from "@dhara/utils"

export interface MobileFilterChipProps {
  label: string
  active?: boolean
  onClick?: () => void
  className?: string
}

/** Single pill toggle — "Offline Pandit / Online Pandit / Live Tracking", "Popular", etc. */
export function MobileFilterChip({ label, active = false, onClick, className }: MobileFilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "shrink-0 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
        active
          ? "border-transparent bg-primary text-primary-foreground"
          : "border-border/70 bg-transparent text-muted-foreground hover:bg-muted/40",
        className
      )}
    >
      {label}
    </button>
  )
}
