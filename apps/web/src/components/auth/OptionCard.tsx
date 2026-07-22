import type { ReactNode } from "react"

import { cn } from "@dhara/utils"
import { GlassPanel } from "@/components/glass/GlassPanel"

export interface OptionCardProps {
  icon?: ReactNode
  title: string
  subtitle?: string
  active?: boolean
  onClick?: () => void
}

/**
 * apps/web's own selectable-list-row component, used for onboarding language/
 * format selection. Not a reuse of packages/mobile's MobileSegmentedListItem.
 */
export function OptionCard({ icon, title, subtitle, active, onClick }: OptionCardProps) {
  return (
    <GlassPanel
      tier={active ? "accent" : "base"}
      className={cn(
        "flex w-full cursor-pointer items-center gap-3 p-4 text-left transition-transform active:scale-[0.99]"
      )}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick?.()
      }}
    >
      {icon ? <span className="shrink-0 text-accent">{icon}</span> : null}
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-foreground">{title}</span>
        {subtitle ? <span className="block text-xs text-muted-foreground">{subtitle}</span> : null}
      </span>
    </GlassPanel>
  )
}
