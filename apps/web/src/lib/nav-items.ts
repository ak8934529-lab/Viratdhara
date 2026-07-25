import { Compass, Disc3, Home, Video } from "lucide-react"
import type { LucideIcon } from "lucide-react"

/**
 * The Main App tabs, per docs/01_ARCHITECTURE/NAVIGATION_MODEL.md — fixed order.
 *
 * **4 tabs, not 5.** The "Playing Now" tab was removed by product direction: the
 * docked mini player now opens `/content/:id`, which is the single playback
 * surface for both Content types, so a separate full-player tab was redundant.
 *
 * This deliberately diverges from NAVIGATION_MODEL.md's original "never more or
 * fewer than 5 tabs" rule and from URL_STRUCTURE.md's `/playing-now` row. Both
 * documents were updated in the same change rather than left to drift.
 */
export interface NavItem {
  id: string
  label: string
  path: string
  icon: LucideIcon
}

export const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Home", path: "/", icon: Home },
  { id: "suno", label: "Suno", path: "/suno", icon: Compass },
  { id: "dekho", label: "Dekho", path: "/dekho", icon: Video },
  { id: "shorts", label: "Shorts", path: "/shorts", icon: Disc3 },
]
