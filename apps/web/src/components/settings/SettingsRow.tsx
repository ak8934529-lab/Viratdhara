import { ChevronRight } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import type { ReactNode } from "react"
import { Link } from "react-router-dom"

import { cn } from "@dhara/utils"

export interface SettingsRowProps {
  icon?: LucideIcon
  title: string
  subtitle?: string
  /** Navigation target. Omit for a display-only or toggle row. */
  to?: string
  /** Trailing control (e.g. a Switch). When present, the chevron is suppressed. */
  trailing?: ReactNode
}

/**
 * Settings list row — the web equivalent of `MobileListItem`, whose behaviour it
 * mirrors deliberately: the chevron renders only when `trailing` is absent, so a
 * toggle row is a row with `trailing` and a navigation row is a row with a
 * chevron. Used by the Settings hub and its sub-screens
 * (docs/03_FEATURES/UserSettings/UI.md).
 */
export function SettingsRow({ icon: Icon, title, subtitle, to, trailing }: SettingsRowProps) {
  const body = (
    <>
      {Icon ? (
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted/40 text-muted-foreground">
          <Icon className="size-4" />
        </span>
      ) : null}

      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium text-foreground">{title}</span>
        {subtitle ? <span className="mt-0.5 block text-xs text-muted-foreground">{subtitle}</span> : null}
      </span>

      {trailing ?? <ChevronRight className="size-4 shrink-0 text-muted-foreground" />}
    </>
  )

  const className = cn("flex w-full items-center gap-3 p-3 text-left md:p-4")

  if (to) {
    return (
      <Link to={to} className={cn(className, "transition-colors hover:bg-white/5")}>
        {body}
      </Link>
    )
  }

  return <div className={className}>{body}</div>
}
