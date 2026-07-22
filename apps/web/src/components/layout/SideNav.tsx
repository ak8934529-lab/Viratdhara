import { NavLink } from "react-router-dom"

import { cn } from "@dhara/utils"
import { NAV_ITEMS } from "@/lib/nav-items"

/**
 * Medium (icon-rail) and Wide (expanded, labeled) breakpoint navigation, per
 * docs/02_DESIGN/RESPONSIVE_SYSTEM.md. Hidden below md (BottomNav takes over).
 * Flush against the left edge (border-right, no floating card/margin) so the
 * desktop layout reads as a web app, not a mobile app centered in a frame.
 */
export function SideNav() {
  return (
    <nav
      className="sticky top-16 hidden h-[calc(100svh-4rem)] w-16 shrink-0 flex-col items-center gap-1 overflow-y-auto border-r border-white/10 bg-card/15 py-4 backdrop-blur-xl md:flex xl:w-60 xl:items-stretch xl:px-3"
      aria-label="Main navigation"
    >
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon
        return (
          <NavLink
            key={item.id}
            to={item.path}
            end={item.path === "/"}
            className="flex w-full items-center justify-center gap-3 rounded-xl px-2 py-2.5 xl:justify-start xl:px-3"
          >
            {({ isActive }) => (
              <>
                <span
                  className={cn(
                    "flex size-9 items-center justify-center rounded-full transition-colors",
                    isActive ? "bg-primary/25 text-primary" : "text-muted-foreground"
                  )}
                >
                  <Icon className="size-5" aria-hidden />
                </span>
                <span
                  className={cn(
                    "hidden truncate text-sm xl:block",
                    isActive ? "font-semibold text-foreground" : "font-medium text-muted-foreground"
                  )}
                >
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        )
      })}
    </nav>
  )
}
