import { Outlet, useLocation } from "react-router-dom"

import { cn } from "@dhara/utils"
import { BackgroundBloom } from "@/components/glass/BackgroundBloom"
import { SideNav } from "@/components/layout/SideNav"
import { BottomNav } from "@/components/layout/BottomNav"
import { MiniPlayer } from "@/components/layout/MiniPlayer"
import { TopBar } from "@/components/layout/TopBar"
import { NAV_ITEMS } from "@/lib/nav-items"

/**
 * Main App structural area shell (docs/01_ARCHITECTURE/INFORMATION_ARCHITECTURE.md).
 * Full-bleed desktop web layout (flush top bar + flush sidebar, no floating
 * "app card" chrome) — Compact falls back to BottomNav. Per
 * docs/02_DESIGN/RESPONSIVE_SYSTEM.md.
 *
 * The top bar is present on every Main App screen EXCEPT the full Playing Now
 * player, per NAVIGATION_MODEL.md — that screen uses a minimize control instead.
 * The bottom nav always stays, so no screen ever omits both.
 */
export function AppShell() {
  const { pathname } = useLocation()
  const current = NAV_ITEMS.find((item) => (item.path === "/" ? pathname === "/" : pathname.startsWith(item.path)))

  const isFullPlayer = pathname === "/playing-now"

  return (
    <div className="min-h-svh">
      <BackgroundBloom />
      {!isFullPlayer ? <TopBar title={current?.label ?? "Viratdhara"} /> : null}
      <div className="flex">
        <SideNav hasTopBar={!isFullPlayer} />
        <main
          className={cn(
            "min-w-0 flex-1 px-4 pb-24 pt-5 md:px-6 md:pb-8 lg:px-8",
            // The full player has no top bar, so it keeps bottom clearance for
            // the nav at every breakpoint rather than the usual md:pb-8.
            isFullPlayer && "md:pb-24"
          )}
        >
          <Outlet />
        </main>
      </div>
      <MiniPlayer />
      <BottomNav />
    </div>
  )
}
