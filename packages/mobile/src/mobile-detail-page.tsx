import type { ReactNode } from "react"
import { ChevronLeft } from "lucide-react"

import { ICON_STROKE_WIDTH } from "@dhara/constants"
import { MobileAppShell } from "./mobile-app-shell"
import { MobileTopBar } from "./mobile-top-bar"
import { MobileMain } from "./mobile-main"

export interface MobileDetailPageProps {
  title: string
  subtitle?: string
  onBack?: () => void
  trailing?: ReactNode
  footer?: ReactNode
  children: ReactNode
  className?: string
}

/** Non-tab "pushed" screen: back arrow + title, scroll area, optional sticky footer (e.g. Buy Now / Book Now CTA). */
export function MobileDetailPage({
  title,
  subtitle,
  onBack,
  trailing,
  footer,
  children,
  className,
}: MobileDetailPageProps) {
  return (
    <MobileAppShell>
      <MobileTopBar
        title={title}
        subtitle={subtitle}
        trailing={trailing}
        leading={
          onBack ? (
            <button
              type="button"
              onClick={onBack}
              aria-label="Go back"
              className="flex size-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted/60"
            >
              <ChevronLeft className="size-5" strokeWidth={ICON_STROKE_WIDTH} aria-hidden />
            </button>
          ) : undefined
        }
      />
      <MobileMain className={className}>{children}</MobileMain>
      {footer ? (
        <div className="shrink-0 border-t border-border/50 bg-background/95 px-4 py-3 pb-[env(safe-area-inset-bottom)] backdrop-blur-md">
          {footer}
        </div>
      ) : null}
    </MobileAppShell>
  )
}
