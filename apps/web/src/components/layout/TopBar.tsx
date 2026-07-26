import { Bell, LayoutGrid, Menu, Search, ShieldAlert, SlidersHorizontal, Sparkles } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Link, NavLink } from "react-router-dom"

import { Avatar, AvatarFallback } from "@dhara/ui/avatar"
import { cn } from "@dhara/utils"
import { BrandMark } from "@/components/layout/BrandMark"
import { CURRENT_CREATOR } from "@/lib/mock-creator"
import { NAV_ITEMS } from "@/lib/nav-items"

export interface TopBarProps {
  title?: string
}

/**
 * Flush, full-width web top bar, per docs/01_ARCHITECTURE/NAVIGATION_MODEL.md.
 * Present on every Main App screen.
 *
 * Composition follows the supplied design file: wordmark plus a browse-everything
 * pill on the left, and an identity block plus icon controls on the right. The bar
 * carries a solid dark background and the hero begins beneath it — it does not
 * float over the artwork.
 *
 * The overflow menu is now the app's **only** navigation surface: the side rail
 * and the bottom bar were both removed by product direction, so the four tabs
 * (Home, Suno, Dekho, Shorts) live here alongside the secondary areas. Without
 * them in this menu there would be no way to change tabs at all.
 *
 * NOT carried over from the design's reference lineage: a city/region selector.
 * Viratdhara has no location concept in DOMAIN_MODEL.md and no locale switcher
 * state, so a region dropdown would be invented UI rather than a restyling.
 */
export function TopBar({ title }: TopBarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

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
    <header className="sticky top-0 z-40 flex h-16 w-full shrink-0 items-center gap-3 border-b border-white/[0.07] bg-[#0d0908] px-4 md:gap-5 md:px-6">
      <Link to="/" className="shrink-0" aria-label="Viratdhara home">
        <BrandMark size="sm" />
      </Link>

      {/* Browse-everything pill. Targets /search, whose idle state IS the
          browse-all surface — not a new route. */}
      <Link
        to="/search"
        className="hidden shrink-0 items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white/90 transition-colors hover:border-white/45 hover:bg-white/10 hover:text-white sm:inline-flex"
      >
        <LayoutGrid className="size-3.5" aria-hidden />
        Browse all
      </Link>

      <p className="min-w-0 flex-1 truncate text-sm font-semibold text-muted-foreground sm:hidden">{title}</p>
      <span className="hidden flex-1 sm:block" />

      <div className="flex shrink-0 items-center gap-0.5">
        {/* Identity block — avatar + two-line name, per the design. */}
        <Link
          to="/settings"
          className="mr-1 flex items-center gap-2.5 rounded-full py-1 pl-1 pr-2 transition-colors hover:bg-white/10"
          aria-label="Settings"
        >
          <Avatar size="sm">
            <AvatarFallback>{firstName.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="hidden leading-tight md:block">
            <span className="block text-[11px] font-semibold text-white">{firstName}</span>
            <span className="block text-[10px] text-white/55">{restName.join(" ")}</span>
          </span>
        </Link>

        <IconControl to="/search" label="Search">
          <Search className="size-[18px]" />
        </IconControl>

        <IconControl label="Notifications" badge>
          <Bell className="size-[18px]" />
        </IconControl>

        <div className="relative" ref={menuRef}>
          <IconControl label="Menu" expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
            <Menu className="size-[18px]" />
          </IconControl>

          {menuOpen ? (
            <div className="surface-glass-raised absolute right-0 top-12 z-50 w-60 overflow-hidden p-1.5" role="menu">
              {/* The four tabs — this menu is the only place they appear. */}
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.path}
                  end={item.path === "/"}
                  role="menuitem"
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary/20 text-primary"
                        : "text-foreground/90 hover:bg-white/10 hover:text-foreground"
                    )
                  }
                >
                  <item.icon className="size-4 shrink-0" aria-hidden />
                  {item.label}
                </NavLink>
              ))}

              <hr className="my-1.5 border-white/10" />

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
 * rather than the app's `Button` ghost variant, whose hover tone is tuned for
 * glass surfaces rather than for this near-black bar.
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
    "relative flex size-10 items-center justify-center rounded-full text-white/85 transition-colors",
    "hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
  )

  const content = (
    <>
      {children}
      {badge ? (
        <span
          aria-hidden
          className="absolute right-2.5 top-2.5 size-1.5 rounded-full bg-primary ring-2 ring-[#0d0908]"
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
    </Link>
  )
}
