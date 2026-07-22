import { NavLink } from "react-router-dom"

import { cn } from "@dhara/utils"
import type { MobileNavItem } from "./types"

export interface MobileBottomNavProps {
  items: MobileNavItem[]
  activeId?: string
  ariaLabel?: string
  className?: string
}

/**
 * Shared bottom tab bar. The Figma source design had this on the music screens
 * only, with the booking flow missing a nav shell entirely — this component is
 * the one consistent shell both flows should use going forward.
 */
export function MobileBottomNav({
  items,
  activeId,
  ariaLabel = "Main navigation",
  className,
}: MobileBottomNavProps) {
  return (
    <nav
      className={cn(
        "z-20 flex h-[4.75rem] shrink-0 items-start justify-around border-t border-border/50 bg-card/95 pt-2 pb-[env(safe-area-inset-bottom)] backdrop-blur-md",
        className
      )}
      aria-label={ariaLabel}
    >
      {items.map((item) => {
        const Icon = item.icon
        const isActive = activeId === item.id

        return (
          <NavLink
            key={item.id}
            to={item.path}
            end={item.end ?? item.path === "/"}
            className="group flex min-w-0 flex-1 flex-col items-center gap-1"
          >
            {({ isActive: linkActive }) => {
              const active = linkActive || isActive
              return (
                <>
                  <span
                    className={cn(
                      "flex h-8 w-[4.25rem] items-center justify-center rounded-full transition-all",
                      active ? "bg-primary/20 text-primary" : "text-muted-foreground group-active:bg-muted/60"
                    )}
                  >
                    <Icon className={cn("size-5 transition-transform", active && "scale-105")} aria-hidden />
                  </span>
                  <span
                    className={cn(
                      "truncate text-[11px] transition-colors",
                      active ? "font-semibold text-foreground" : "font-medium text-muted-foreground"
                    )}
                  >
                    {item.label}
                  </span>
                </>
              )
            }}
          </NavLink>
        )
      })}
    </nav>
  )
}
