import type { LucideIcon } from "lucide-react"

export interface MobileNavItem {
  id: string
  label: string
  path: string
  icon: LucideIcon
  end?: boolean
}

export interface MobileHeaderContent {
  title: string
  subtitle?: string
}

export type MobileHeaderResolver = (pathname: string) => MobileHeaderContent
