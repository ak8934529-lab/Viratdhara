import { Outlet, useLocation } from "react-router-dom"

import { cn } from "@dhara/utils"
import { BackgroundBloom } from "@/components/glass/BackgroundBloom"
import { SideNav } from "@/components/layout/SideNav"
import { BottomNav } from "@/components/layout/BottomNav"
import { MiniPlayer } from "@/components/layout/MiniPlayer"
import { TopBar } from "@/components/layout/TopBar"
import { NAV_ITEMS } from "@/lib/nav-items"
import { usePlayer } from "@/lib/player-context"

/**
 * Main App structural area shell (docs/01_ARCHITECTURE/INFORMATION_ARCHITECTURE.md).
 * Full-bleed desktop web layout (flush top bar + flush sidebar, no floating
 * "app card" chrome) — Compact falls back to BottomNav. Per
 * docs/02_DESIGN/RESPONSIVE_SYSTEM.md.
 *
 * The top bar is now present on every Main App screen without exception. Its one
 * former exception was the full "Playing Now" player, which used a minimize
 * control instead; that tab and route were removed, and playback moved into the
 * Content detail page, so the exception no longer exists.
 */
export function AppShell() {
  const { pathname } = useLocation()
  const { current: playing, playback } = usePlayer()
  const current = NAV_ITEMS.find((item) => (item.path === "/" ? pathname === "/" : pathname.startsWith(item.path)))

  /**
   * The mini player is fixed, so the scroll container has to reserve room for it
   * or the last row of content sits underneath. Reserved only while a session
   * exists, so pages don't carry dead space when nothing is playing.
   */
  const hasMiniPlayer =
    Boolean(playing) && playback !== "idle" && pathname !== `/content/${playing?.id}`

  return (
    <div className="min-h-svh">
      <BackgroundBloom />
      <TopBar title={current?.label ?? "Viratdhara"} />
      <div className="flex">
        <SideNav />
        <main
          className={cn(
            "min-w-0 flex-1 px-4 pt-5 md:px-6 lg:px-8",
            // Compact clears the floating bottom nav; wider viewports have none.
            "pb-24 md:pb-10",
            // Extra clearance for the fixed mini player when a session exists.
            hasMiniPlayer && "pb-40 md:pb-28"
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
