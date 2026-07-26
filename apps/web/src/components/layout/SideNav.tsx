import { NavLink } from "react-router-dom"

import { cn } from "@dhara/utils"
import { NAV_ITEMS } from "@/lib/nav-items"

/**
 * Medium (icon-rail) and Wide navigation, per
 * docs/02_DESIGN/RESPONSIVE_SYSTEM.md. Hidden below md (BottomNav takes over).
 * Always an icon-only rail — labels surface as tooltips on hover rather than
 * expanding the rail width, which keeps the content area wide at all breakpoints.
 */
export function SideNav() {
  return (
    <nav
      className="hidden"
      aria-label="Main navigation"
    >
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon
        return (
          <NavLink
            key={item.id}
            to={item.path}
            end={item.path === "/"}
            aria-label={item.label}
            className="group/nav relative flex w-full items-center justify-center rounded-xl px-2 py-2.5"
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

                {/* Tooltip — floats to the right of the icon on hover */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute left-full z-50 ml-2 whitespace-nowrap rounded-xl border border-white/10 bg-card px-3 py-1.5 text-sm font-medium text-foreground opacity-0 shadow-lg backdrop-blur-xl transition-opacity duration-150 group-hover/nav:opacity-100"
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
