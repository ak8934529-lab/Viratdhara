import { ArrowLeft, BarChart3, LayoutDashboard, ListVideo } from "lucide-react"
import { NavLink, Outlet, Link } from "react-router-dom"

import { Button } from "@dhara/ui/button"
import { cn } from "@dhara/utils"
import { BackgroundBloom } from "@/components/glass/BackgroundBloom"

/**
 * Creator Studio shell. INFORMATION_ARCHITECTURE.md makes this its own
 * structural area, and NAVIGATION_MODEL.md is explicit that it is "not the same
 * navigation instance as Main App" — so this deliberately does NOT render the
 * 5-tab bottom nav or the Main App top bar. It is entered from Settings/Profile
 * and exits back to the Main App.
 *
 * FLAGGED: NAVIGATION_MODEL.md says "its own internal navigation is owned by the
 * Creator Studio feature" without specifying its form, and CreatorStudio/UI.md
 * gives only the three routes. The horizontal tab strip below is therefore an
 * inference — what is spec-backed is that it covers exactly these 3 screens,
 * isn't the Main App nav, and offers an exit back to the Main App.
 */
const STUDIO_NAV = [
  { to: "/creator-studio", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/creator-studio/content", label: "Content", icon: ListVideo, end: false },
  { to: "/creator-studio/analytics", label: "Analytics", icon: BarChart3, end: false },
]

export function StudioShell() {
  return (
    <div className="min-h-svh">
      <BackgroundBloom />

      <header className="sticky top-0 z-30 border-b border-white/10 bg-background/75 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-3 px-4 md:px-6">
          {/* Exit back to the Main App. */}
          <Button variant="ghost" size="icon-sm" asChild aria-label="Exit Creator Studio">
            <Link to="/">
              <ArrowLeft className="size-5" />
            </Link>
          </Button>
          <p className="text-[17px] font-semibold tracking-tight text-foreground">Creator Studio</p>
        </div>

        <nav
          className="mx-auto -mb-px flex max-w-[1400px] gap-1 overflow-x-auto px-4 md:px-6"
          aria-label="Creator Studio navigation"
        >
          {STUDIO_NAV.map((item) => {
            const Icon = item.icon
            return (
              <NavLink key={item.to} to={item.to} end={item.end}>
                {({ isActive }) => (
                  <span
                    className={cn(
                      "flex shrink-0 items-center gap-2 border-b-2 px-3 py-2.5 text-sm transition-colors",
                      isActive
                        ? "border-accent font-semibold text-foreground"
                        : "border-transparent font-medium text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Icon className="size-4" aria-hidden />
                    {item.label}
                  </span>
                )}
              </NavLink>
            )
          })}
        </nav>
      </header>

      <main className="mx-auto max-w-[1400px] px-4 pb-12 pt-6 md:px-6">
        <Outlet />
      </main>
    </div>
  )
}
