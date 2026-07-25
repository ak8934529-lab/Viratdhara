import { Play } from "lucide-react"
import { Link } from "react-router-dom"

import { cn } from "@dhara/utils"
import type { ContentItem } from "@/lib/mock-content"
import { formatDuration } from "@/lib/mock-content"
import { posterBackground } from "@/lib/poster-art"

export interface ListRowCardProps {
  content: ContentItem
  /** Small line under the title — e.g. "New", a category, or a progress label. */
  eyebrow?: string
  /** 0–100. Renders a progress bar across the thumbnail when set. */
  progress?: number
  onPlay?: () => void
}

/**
 * Compact list row — landscape thumbnail, title, secondary line, circular play
 * button. The "Trending Now" / "Continue Watching" rail treatment from the
 * reference designs.
 *
 * Used for the player's up-next panel and any dense vertical list where the grid
 * card would be too heavy.
 */
export function ListRowCard({ content, eyebrow, progress, onPlay }: ListRowCardProps) {
  const artwork = posterBackground(content.category, content.id, "landscape")

  return (
    <div className="group/row flex items-center gap-3">
      <Link
        to={`/content/${content.id}`}
        aria-label={content.title}
        className={cn(
          "relative aspect-video w-[92px] shrink-0 overflow-hidden rounded-lg ring-1 ring-white/10",
          "transition-all duration-200 group-hover/row:ring-white/25"
        )}
        style={{ backgroundImage: artwork, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <span className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover/row:opacity-100">
          <Play className="size-4 fill-white text-white" />
        </span>

        {progress !== undefined ? (
          <span className="absolute inset-x-0 bottom-0 h-[3px] bg-white/20">
            <span
              className="block h-full bg-accent"
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
          </span>
        ) : (
          <span className="absolute bottom-1 right-1 rounded bg-black/70 px-1 text-[9px] font-semibold tabular-nums text-white/90">
            {formatDuration(content.durationSeconds)}
          </span>
        )}
      </Link>

      <Link to={`/content/${content.id}`} className="min-w-0 flex-1">
        <p className="line-clamp-2 text-[13px] font-semibold leading-snug text-foreground transition-colors group-hover/row:text-accent">
          {content.title}
        </p>
        <p className="mt-0.5 truncate text-[11px] text-muted-foreground">{eyebrow ?? content.creator}</p>
      </Link>

      {onPlay ? (
        <button
          type="button"
          onClick={onPlay}
          aria-label={`Play ${content.title}`}
          className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/[0.06] text-foreground backdrop-blur-md transition-all hover:border-accent/50 hover:bg-accent hover:text-accent-foreground active:scale-95"
        >
          <Play className="size-3.5 translate-x-px fill-current" />
        </button>
      ) : null}
    </div>
  )
}
