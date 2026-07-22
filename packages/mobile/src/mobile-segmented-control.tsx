import type { ReactNode } from "react"

import { cn } from "@dhara/utils"

export interface MobileSegmentOption {
  value: string
  label: string
}

export interface MobileSegmentedControlProps {
  options: MobileSegmentOption[]
  value: string
  onChange: (value: string) => void
  className?: string
}

/** Equal-width segmented picker — language select, "Suno Dekho / Live Darshan / Booking" format select. */
export function MobileSegmentedControl({ options, value, onChange, className }: MobileSegmentedControlProps) {
  return (
    <div
      role="tablist"
      className={cn("grid gap-2 rounded-2xl bg-muted/30 p-1.5", className)}
      style={{ gridTemplateColumns: `repeat(${Math.min(options.length, 3)}, minmax(0, 1fr))` }}
    >
      {options.map((option) => {
        const active = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(option.value)}
            className={cn(
              "truncate rounded-xl px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

export interface MobileSegmentedListItemProps {
  icon?: ReactNode
  title: string
  subtitle?: string
  active?: boolean
  onClick?: () => void
}

/** Full-row variant used for the "Select the format for Darshan" style option list. */
export function MobileSegmentedListItem({ icon, title, subtitle, active, onClick }: MobileSegmentedListItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "surface-card flex w-full items-center gap-3 p-4 text-left transition-colors",
        active && "ring-2 ring-accent"
      )}
    >
      {icon ? <span className="shrink-0 text-accent">{icon}</span> : null}
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-foreground">{title}</span>
        {subtitle ? <span className="block text-xs text-muted-foreground">{subtitle}</span> : null}
      </span>
    </button>
  )
}
