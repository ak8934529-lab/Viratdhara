import { Compass, Disc3, Home, PlayCircle, Video } from "lucide-react"
import type { LucideIcon } from "lucide-react"

/** The 5 Main App tabs, per docs/01_ARCHITECTURE/NAVIGATION_MODEL.md — fixed order. */
export interface NavItem {
  id: string
  label: string
  path: string
  icon: LucideIcon
}

export const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Home", path: "/", icon: Home },
  { id: "suno", label: "Suno", path: "/suno", icon: Compass },
  { id: "playing-now", label: "Playing Now", path: "/playing-now", icon: PlayCircle },
  { id: "dekho", label: "Dekho", path: "/dekho", icon: Video },
  { id: "shorts", label: "Shorts", path: "/shorts", icon: Disc3 },
]
