import { Bell, Search } from "lucide-react"
import type { ReactNode } from "react"
import { Link } from "react-router-dom"

import { Avatar, AvatarFallback } from "@dhara/ui/avatar"
import { Button } from "@dhara/ui/button"

export interface TopBarProps {
  title?: string
  leading?: ReactNode
}

/**
 * Sticky top bar — search/notifications/avatar trailing slot, per
 * docs/01_ARCHITECTURE/NAVIGATION_MODEL.md. Present on every Main App screen.
 */
export function TopBar({ title, leading }: TopBarProps) {
  return (
    <header className="surface-glass-base sticky top-3 z-20 mb-4 flex h-14 shrink-0 items-center gap-3 rounded-2xl px-4">
      {leading}
      <p className="min-w-0 flex-1 truncate text-base font-semibold">{title}</p>
      <div className="flex shrink-0 items-center gap-1.5">
        <Button asChild variant="ghost" size="icon-sm" aria-label="Search">
          <Link to="/search">
            <Search className="size-4.5" />
          </Link>
        </Button>
        <Button variant="ghost" size="icon-sm" aria-label="Notifications">
          <Bell className="size-4.5" />
        </Button>
        <Button asChild variant="ghost" size="icon-sm" aria-label="Settings">
          <Link to="/settings">
            <Avatar size="sm">
              <AvatarFallback>V</AvatarFallback>
            </Avatar>
          </Link>
        </Button>
      </div>
    </header>
  )
}
