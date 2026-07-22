import { Search } from "lucide-react"
import type { InputHTMLAttributes } from "react"

import { ICON_STROKE_WIDTH } from "@dhara/constants"
import { cn } from "@dhara/utils"

export interface MobileSearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

export function MobileSearchBar({ className, placeholder = "Search", ...props }: MobileSearchBarProps) {
  return (
    <div
      className={cn(
        "flex h-11 items-center gap-2 rounded-full bg-muted/40 px-4 text-muted-foreground",
        className
      )}
    >
      <Search className="size-4 shrink-0" strokeWidth={ICON_STROKE_WIDTH} aria-hidden />
      <input
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
        {...props}
      />
    </div>
  )
}
