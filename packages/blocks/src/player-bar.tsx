import { Pause, Play, SkipForward } from "lucide-react"

import { ICON_STROKE_WIDTH } from "@dhara/constants"
import { cn } from "@dhara/utils"

export interface PlayerBarProps {
  artwork: string
  title: string
  artist: string
  isPlaying?: boolean
  onTogglePlay?: () => void
  onSkip?: () => void
  onClick?: () => void
  className?: string
}

/** Mini now-playing bar, docked above the bottom nav on music screens. */
export function PlayerBar({
  artwork,
  title,
  artist,
  isPlaying = true,
  onTogglePlay,
  onSkip,
  onClick,
  className,
}: PlayerBarProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 border-t border-border/50 bg-card/95 px-3 py-2 backdrop-blur-md",
        className
      )}
    >
      <button
        type="button"
        onClick={onClick}
        className="flex min-w-0 flex-1 items-center gap-3 text-left"
      >
        <div
          className="size-10 shrink-0 rounded-lg bg-cover bg-center"
          style={{ backgroundImage: `url(${artwork})` }}
        />
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-foreground">{title}</p>
          <p className="truncate text-xs text-muted-foreground">{artist}</p>
        </div>
      </button>
      <button
        type="button"
        onClick={onTogglePlay}
        aria-label={isPlaying ? "Pause" : "Play"}
        className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"
      >
        {isPlaying ? (
          <Pause className="size-4" strokeWidth={ICON_STROKE_WIDTH} aria-hidden />
        ) : (
          <Play className="size-4" strokeWidth={ICON_STROKE_WIDTH} aria-hidden />
        )}
      </button>
      <button
        type="button"
        onClick={onSkip}
        aria-label="Skip"
        className="flex size-9 shrink-0 items-center justify-center rounded-full text-foreground"
      >
        <SkipForward className="size-4" strokeWidth={ICON_STROKE_WIDTH} aria-hidden />
      </button>
    </div>
  )
}
