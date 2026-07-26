import { Bell, ChevronDown, Menu, Search, ShieldAlert, SlidersHorizontal, Sparkles } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"

import { Avatar, AvatarFallback } from "@dhara/ui/avatar"
import { cn } from "@dhara/utils"
import { CURRENT_CREATOR } from "@/lib/mock-creator"

export interface TopBarProps {
  title?: string
}

/**
 * Flush, full-width web top bar, per docs/01_ARCHITECTURE/NAVIGATION_MODEL.md.
 * Present on every Main App screen.
 *
 * Composition follows the reviewed cinema-app reference: wordmark plus a
 * browse-everything pill on the left, and an identity block plus icon controls on
 * the right. It starts **transparent** so it floats over a screen's hero artwork,
 * and only takes on its glass background once the page is scrolled — an opaque bar
 * pinned over a full-bleed hero was what previously cut the hero in half.
 *
 * The trailing slot keeps exactly what NAVIGATION_MODEL.md specifies — search
 * icon, notification bell, avatar → Settings — with the avatar now carrying the
 * account name beside it. The inline search *input* was replaced by the search
 * *icon* that document actually calls for.
 *
 * The overflow menu links only to existing routes (Settings, Creator Studio,
 * Administration); it introduces no new destination. It matters most at Compact,
 * where the 4-tab bottom nav has no room for those secondary areas.
 *
 * NOT carried over from the reference: its city/region selector. Viratdhara has no
 * location concept in DOMAIN_MODEL.md and no locale switcher state, so a
 * region dropdown would have been invented UI rather than a restyling.
 */
export function TopBar({ title }: TopBarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  /** Dismiss the overflow menu on outside click or Escape. */
  useEffect(() => {
    if (!menuOpen) return

    function onPointerDown(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) setMenuOpen(false)
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false)
    }

    document.addEventListener("mousedown", onPointerDown)
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("mousedown", onPointerDown)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [menuOpen])

  const [firstName, ...restName] = CURRENT_CREATOR.displayName.split(" ")

  return (
    <header
      className={cn(
        "sticky top-0 z-40 flex h-16 w-full shrink-0 items-center gap-3 px-4 transition-colors duration-300 md:gap-5 md:px-6",
        scrolled
          ? "border-b border-white/10 bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <span className="flex-1" />

      <div className="flex shrink-0 items-center gap-1">
        {/* Identity block — avatar + name, per the reference's two-line treatment. */}
        <Link
          to="/settings"
          className="mr-1 flex items-center gap-2.5 rounded-full py-1 pl-1 pr-2 transition-colors hover:bg-white/10"
          aria-label="Settings"
        >
          <Avatar size="sm">
            <AvatarFallback>{firstName.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="hidden leading-tight lg:block">
            <span className="block text-[11px] font-semibold text-foreground">{firstName}</span>
            <span className="block text-[10px] text-muted-foreground">{restName.join(" ")}</span>
          </span>
        </Link>

        <IconControl to="/search" label="Search">
          <Search className="size-[18px]" />
        </IconControl>

        <IconControl label="Notifications" badge>
          <Bell className="size-[18px]" />
        </IconControl>

        <div className="relative" ref={menuRef}>
          <IconControl
            label="Menu"
            expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Menu className="size-[18px]" />
          </IconControl>

          {menuOpen ? (
            <div
              className="surface-glass-raised absolute right-0 top-11 z-50 w-56 overflow-hidden p-1.5"
              role="menu"
            >
              <MenuLink to="/settings" icon={SlidersHorizontal} onSelect={() => setMenuOpen(false)}>
                Settings
              </MenuLink>
              <MenuLink to="/creator-studio" icon={Sparkles} onSelect={() => setMenuOpen(false)}>
                Creator Studio
              </MenuLink>
              {/* Administration is beyond specification — see lib/mock-admin.ts. */}
              <MenuLink to="/admin" icon={ShieldAlert} onSelect={() => setMenuOpen(false)}>
                Administration
              </MenuLink>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  )
}

/**
 * One circular icon control in the trailing slot. Uses a translucent white wash
 * rather than the app's `Button` ghost variant, because the bar is transparent
 * over hero artwork before scroll and these must read against both states.
 */
function IconControl({
  label,
  to,
  badge,
  expanded,
  onClick,
  children,
}: {
  label: string
  to?: string
  badge?: boolean
  expanded?: boolean
  onClick?: () => void
  children: React.ReactNode
}) {
  const className = cn(
    "relative flex size-9 items-center justify-center rounded-full text-foreground/85 transition-colors",
    "hover:bg-white/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
  )

  const content = (
    <>
      {children}
      {badge ? (
        <span
          aria-hidden
          className="absolute right-2 top-2 size-1.5 rounded-full bg-destructive ring-2 ring-background"
        />
      ) : null}
    </>
  )

  if (to) {
    return (
      <Link to={to} aria-label={label} title={label} className={className}>
        {content}
      </Link>
    )
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      aria-expanded={expanded}
      className={className}
    >
      {content}
    </button>
  )
}

function MenuLink({
  to,
  icon: Icon,
  onSelect,
  children,
}: {
  to: string
  icon: typeof SlidersHorizontal
  onSelect: () => void
  children: React.ReactNode
}) {
  return (
    <Link
      to={to}
      role="menuitem"
      onClick={onSelect}
      className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground/90 transition-colors hover:bg-white/10 hover:text-foreground"
    >
      <Icon className="size-4 shrink-0 text-muted-foreground" aria-hidden />
      {children}
      <ChevronDown className="ml-auto size-3.5 -rotate-90 text-muted-foreground/60" aria-hidden />
    </Link>
  )
}
