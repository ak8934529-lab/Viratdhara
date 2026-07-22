import { Bell, Search } from "lucide-react"
import type { FormEvent } from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { Avatar, AvatarFallback } from "@dhara/ui/avatar"
import { Button } from "@dhara/ui/button"
import { BrandMark } from "@/components/layout/BrandMark"

export interface TopBarProps {
  title?: string
}

/**
 * Flush, full-width web top bar (logo + search + trailing icons), per
 * docs/01_ARCHITECTURE/NAVIGATION_MODEL.md. Present on every Main App screen.
 * Deliberately flush-edge-to-edge, not a floating card — this is what makes
 * apps/web read as a desktop web app rather than a mobile app in a frame.
 */
export function TopBar({ title }: TopBarProps) {
  const navigate = useNavigate()
  const [query, setQuery] = useState("")

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    navigate(query.trim() ? `/search?q=${encodeURIComponent(query.trim())}` : "/search")
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full shrink-0 items-center gap-3 border-b border-white/10 bg-background/75 px-4 backdrop-blur-xl md:gap-6 md:px-6">
      <Link to="/" className="shrink-0" aria-label="Viratdhara home">
        <BrandMark size="sm" />
      </Link>

      <form onSubmit={handleSubmit} className="mx-auto hidden w-full max-w-xl md:block">
        <div className="flex h-10 items-center gap-2 rounded-full border border-border/60 bg-input/40 px-4 focus-within:border-ring">
          <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Viratdhara"
            className="w-full min-w-0 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
        </div>
      </form>

      <p className="min-w-0 flex-1 truncate text-sm font-semibold text-muted-foreground md:hidden">{title}</p>

      <div className="flex shrink-0 items-center gap-1.5">
        <Button asChild variant="ghost" size="icon-sm" aria-label="Search" className="md:hidden">
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
