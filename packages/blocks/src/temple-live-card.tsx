import { Eye } from "lucide-react"

import { ICON_STROKE_WIDTH } from "@dhara/constants"
import { cn } from "@dhara/utils"
import { LiveBadge } from "./live-badge"

export interface TempleLiveCardProps {
  image: string
  title: string
  viewers?: string
  live?: boolean
  onClick?: () => void
  className?: string
}

/** Featured carousel card — temple darshan stream with LIVE badge + viewer count. */
export function TempleLiveCard({ image, title, viewers, live = true, onClick, className }: TempleLiveCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "surface-card relative flex aspect-[4/5] w-full flex-col justify-end overflow-hidden bg-cover bg-center p-4 text-left",
        className
      )}
      style={{ backgroundImage: `linear-gradient(to top, rgb(0 0 0 / 0.75), rgb(0 0 0 / 0.05) 55%), url(${image})` }}
    >
      {live ? <LiveBadge className="absolute right-3 top-3" /> : null}
      <p className="text-sm font-semibold text-white">{title}</p>
      {viewers ? (
        <p className="mt-1 flex items-center gap-1 text-xs text-white/80">
          <Eye className="size-3.5" strokeWidth={ICON_STROKE_WIDTH} aria-hidden />
          {viewers} watching live
        </p>
      ) : null}
    </button>
  )
}
