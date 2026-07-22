import { cn } from "@dhara/utils"
import { MobileFilterChip } from "./mobile-filter-chip"

export interface MobileChipRowProps {
  options: string[]
  value: string
  onChange: (value: string) => void
  className?: string
}

/** Horizontally scrolling row of MobileFilterChip — category/tab filters above a list. */
export function MobileChipRow({ options, value, onChange, className }: MobileChipRowProps) {
  return (
    <div className={cn("scrollbar-hide flex gap-2 overflow-x-auto", className)}>
      {options.map((option) => (
        <MobileFilterChip key={option} label={option} active={option === value} onClick={() => onChange(option)} />
      ))}
    </div>
  )
}
