import { Outlet, useLocation } from "react-router-dom"

import { BackgroundBloom } from "@/components/glass/BackgroundBloom"
import { SideNav } from "@/components/layout/SideNav"
import { BottomNav } from "@/components/layout/BottomNav"
import { TopBar } from "@/components/layout/TopBar"
import { NAV_ITEMS } from "@/lib/nav-items"

/**
 * Main App structural area shell (docs/01_ARCHITECTURE/INFORMATION_ARCHITECTURE.md).
 * Compact: BottomNav. Medium/Wide: SideNav. Per docs/02_DESIGN/RESPONSIVE_SYSTEM.md.
 */
export function AppShell() {
  const { pathname } = useLocation()
  const current = NAV_ITEMS.find((item) => (item.path === "/" ? pathname === "/" : pathname.startsWith(item.path)))

  return (
    <div className="mx-auto flex min-h-svh max-w-[1600px] gap-3 p-3">
      <BackgroundBloom />
      <SideNav />
      <div className="flex min-w-0 flex-1 flex-col pb-20 md:pb-0">
        <TopBar title={current?.label ?? "Viratdhara"} />
        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
      <BottomNav />
    </div>
  )
}
