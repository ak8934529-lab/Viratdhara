import { NavLink } from "react-router-dom"

import { cn } from "@dhara/utils"
import { NAV_ITEMS } from "@/lib/nav-items"

/**
 * Compact-breakpoint navigation (< 768px), per docs/02_DESIGN/RESPONSIVE_SYSTEM.md.
 * A fresh web-native implementation — does not reuse packages/mobile's
 * MobileBottomNav (docs/MASTER_PRD.md: apps/web gets its own layout layer).
 */
export function BottomNav() {
  return (
    <nav
      className="surface-glass-raised fixed inset-x-3 bottom-3 z-20 flex h-16 items-center justify-around rounded-2xl md:hidden"
      aria-label="Main navigation"
    >
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon
        return (
          <NavLink
            key={item.id}
            to={item.path}
            end={item.path === "/"}
            className="group flex min-w-0 flex-1 flex-col items-center gap-1"
          >
            {({ isActive }) => (
              <>
                <span
                  className={cn(
                    "flex size-8 items-center justify-center rounded-full transition-colors",
                    isActive ? "bg-primary/25 text-primary" : "text-muted-foreground"
                  )}
                >
                  <Icon className="size-5" aria-hidden />
                </span>
                <span
                  className={cn(
                    "truncate text-[10px] transition-colors",
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
