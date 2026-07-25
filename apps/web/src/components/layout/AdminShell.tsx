import { ArrowLeft, BarChart3, FolderTree, ShieldAlert } from "lucide-react"
import { Link, NavLink, Outlet } from "react-router-dom"

import { Badge } from "@dhara/ui/badge"
import { Button } from "@dhara/ui/button"
import { cn } from "@dhara/utils"
import { BackgroundBloom } from "@/components/glass/BackgroundBloom"

/**
 * Administration shell — a third structural area alongside Main App and Creator
 * Studio, with its own navigation and an exit back to the Main App.
 *
 * ⚠️ BEYOND SPECIFICATION. INFORMATION_ARCHITECTURE.md defines three structural
 * areas (Auth Area, Main App, Creator Studio) — there is no Administration area,
 * and URL_STRUCTURE.md explicitly does not define administrator routes. The
 * `/admin/*` routes below are invented. See lib/mock-admin.ts for the full
 * governance note and what must be documented before this ships.
 *
 * Structured deliberately as a parallel of StudioShell rather than a new pattern,
 * so that if an Administration feature is specified later, the two areas already
 * share one navigation shape.
 */
const ADMIN_NAV = [
  { to: "/admin", label: "Overview", icon: BarChart3, end: true },
  { to: "/admin/moderation", label: "Moderation", icon: ShieldAlert, end: false },
  { to: "/admin/categories", label: "Categories", icon: FolderTree, end: false },
]

export function AdminShell() {
  return (
    <div className="min-h-svh">
      <BackgroundBloom />

      <header className="sticky top-0 z-30 border-b border-white/10 bg-background/75 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-3 px-4 md:px-6">
          <Button variant="ghost" size="icon-sm" asChild aria-label="Exit administration">
            <Link to="/">
              <ArrowLeft className="size-5" />
            </Link>
          </Button>
          <p className="text-[17px] font-semibold tracking-tight text-foreground">Administration</p>
          {/* Makes the unspecified status visible in the product itself, not just
              in code comments — this area is not part of documented V1 scope. */}
          <Badge variant="outline" className="ml-1">
            Unspecified scope
          </Badge>
        </div>

        <nav
          className="mx-auto -mb-px flex max-w-[1400px] gap-1 overflow-x-auto px-4 md:px-6"
          aria-label="Administration navigation"
        >
          {ADMIN_NAV.map((item) => {
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
