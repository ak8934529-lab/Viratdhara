import { NavLink } from "react-router-dom"

import { cn } from "@dhara/utils"
import { BrandMark } from "@/components/layout/BrandMark"
import { NAV_ITEMS } from "@/lib/nav-items"

/**
 * Medium (icon-rail) and Wide (expanded, labeled) breakpoint navigation, per
 * docs/02_DESIGN/RESPONSIVE_SYSTEM.md. Hidden below md (BottomNav takes over).
 * A fresh web-native implementation — packages/mobile is not reused here.
 */
export function SideNav() {
  return (
    <nav
      className="surface-glass-raised sticky top-3 z-20 hidden h-[calc(100svh-1.5rem)] w-[4.5rem] shrink-0 flex-col items-center gap-2 rounded-2xl py-4 md:flex xl:w-56 xl:items-stretch xl:px-3"
      aria-label="Main navigation"
    >
      <div className="mb-4 flex items-center justify-center xl:justify-start xl:px-2">
        <BrandMark size="sm" />
      </div>
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
