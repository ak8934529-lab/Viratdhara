import type { ReactNode } from "react"
import { useLocation } from "react-router-dom"

import { MobileAppShell } from "./mobile-app-shell"
import { MobileTopBar } from "./mobile-top-bar"
import { MobileMain } from "./mobile-main"
import { MobileBottomNav } from "./mobile-bottom-nav"
import type { MobileHeaderResolver, MobileNavItem } from "./types"

export interface MobileTabShellProps {
  navItems: MobileNavItem[]
  resolveHeader?: MobileHeaderResolver
  trailing?: ReactNode
  children: ReactNode
}

/** Full tab-page shell: top bar (header resolved from the route) + scroll area + bottom nav. */
export function MobileTabShell({ navItems, resolveHeader, trailing, children }: MobileTabShellProps) {
  const { pathname } = useLocation()
  const header = resolveHeader?.(pathname)
  const activeId = navItems.find((item) => (item.end ?? item.path === "/") ? pathname === item.path : pathname.startsWith(item.path))?.id

  return (
    <MobileAppShell>
      {header ? <MobileTopBar title={header.title} subtitle={header.subtitle} trailing={trailing} /> : null}
      <MobileMain>{children}</MobileMain>
      <MobileBottomNav items={navItems} activeId={activeId} />
    </MobileAppShell>
  )
}
