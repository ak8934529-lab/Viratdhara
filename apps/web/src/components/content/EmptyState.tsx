import type { LucideIcon } from "lucide-react"
import type { ReactNode } from "react"

export interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description?: string
  action?: ReactNode
}

/**
 * The one empty-state treatment for apps/web — icon + title + optional
 * description/action, per docs/02_DESIGN/UX_PATTERNS.md ("Any screen state with
 * nothing to show yet uses `MobileEmptyState` (icon + title + optional
 * description/action)"). The web equivalent, since packages/mobile is not
 * reused in apps/web (RESPONSIVE_SYSTEM.md).
 *
 * UX_PATTERNS.md hard constraint: a screen may never reintroduce literal
 * placeholder text (e.g. `<Item Name>`) for a not-yet-populated state.
 */
export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 px-6 py-12 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-muted/40 text-muted-foreground">
        <Icon className="size-6" />
      </span>
      <p className="text-sm font-semibold text-foreground">{title}</p>
      {description ? <p className="max-w-[32ch] text-xs text-muted-foreground">{description}</p> : null}
      {action}
    </div>
  )
}
