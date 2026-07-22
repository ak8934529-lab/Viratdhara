import type { LucideIcon } from "lucide-react"

import { MobileStatCard } from "@dhara/mobile"

export interface QuickActionTileProps {
  icon: LucideIcon
  title: string
  subtitle?: string
  onClick?: () => void
}

/** Home-screen 2-column grid tile — "Temple Live", "Events", "Pooja & Aarti", "Special Moments". */
export function QuickActionTile({ icon, title, subtitle, onClick }: QuickActionTileProps) {
  return <MobileStatCard icon={icon} title={title} subtitle={subtitle} onClick={onClick} />
}
