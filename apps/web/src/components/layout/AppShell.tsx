import { Outlet, useLocation } from "react-router-dom"

import { BackgroundBloom } from "@/components/glass/BackgroundBloom"
import { SideNav } from "@/components/layout/SideNav"
import { BottomNav } from "@/components/layout/BottomNav"
import { TopBar } from "@/components/layout/TopBar"
import { NAV_ITEMS } from "@/lib/nav-items"

/**
 * Main App structural area shell (docs/01_ARCHITECTURE/INFORMATION_ARCHITECTURE.md).
 * Full-bleed desktop web layout (flush top bar + flush sidebar, no floating
 * "app card" chrome) — Compact falls back to BottomNav. Per
 * docs/02_DESIGN/RESPONSIVE_SYSTEM.md.
 */
export function AppShell() {
  const { pathname } = useLocation()
  const current = NAV_ITEMS.find((item) => (item.path === "/" ? pathname === "/" : pathname.startsWith(item.path)))

  return (
    <div className="min-h-svh">
      <BackgroundBloom />
      <TopBar title={current?.label ?? "Viratdhara"} />
      <div className="flex">
        <SideNav />
        <main className="min-w-0 flex-1 px-4 pb-24 pt-5 md:px-6 md:pb-8 lg:px-8">
          <Outlet />
        </main>
      </div>
      <BottomNav />
    </div>
  )
}
