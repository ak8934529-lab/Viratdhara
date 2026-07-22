import { Compass, Disc3, Home, PlayCircle, Video } from "lucide-react"

import type { MobileNavItem } from "@dhara/mobile"

/**
 * One shared bottom-nav config for every screen. The source Figma file had this
 * bar only on the music screens and nothing on the booking flow — this fixes
 * that inconsistency with a single shell both flows use.
 */
export const NAV_ITEMS: MobileNavItem[] = [
  { id: "home", label: "Home", path: "/screens/home", icon: Home },
  { id: "suno", label: "Suno", path: "/screens/pandit-booking", icon: Compass },
  { id: "player", label: "Playing Now", path: "/screens/player", icon: PlayCircle },
  { id: "dekho", label: "Dekho", path: "/screens/login", icon: Video },
  { id: "shorts", label: "Shorts", path: "/screens/shorts", icon: Disc3 },
]
