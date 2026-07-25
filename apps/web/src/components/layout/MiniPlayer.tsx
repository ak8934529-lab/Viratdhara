import { Pause, Play, SkipForward, X } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

import { Button } from "@dhara/ui/button"
import { cn } from "@dhara/utils"
import { posterBackground } from "@/lib/poster-art"
import { usePlayer } from "@/lib/player-context"

/**
 * Mini player — docked above the bottom nav at Compact, and above the viewport
 * edge at Medium/Wide. Contents per docs/03_FEATURES/VideoPlayer/UI.md:
 * "artwork thumbnail, title, artist/creator, play/pause, skip". Deliberately no
 * seek bar — UI.md's mini-player list doesn't include one.
 *
 * Tapping it opens `/content/:id` — the Content detail page is the single
 * playback surface now that the standalone "Playing Now" tab has been removed, so
 * the bar surfaces the full stage for whatever is loaded. It hides while already
 * on that item's page, where `PlaybackStage` supersedes it.
 *
 * UI.md constraint: it "never disappears due to navigation alone — only an
 * explicit stop or playback completion removes it." Hence the explicit close
 * control.
 *
 * FLAGGED: UI.md specifies the docked position for mobile only. Its Medium/Wide
 * placement is undefined; the mirrored bottom-docked position below is an
 * inference, chosen so it doesn't collide with the side nav.
 */
export function MiniPlayer() {
  const { pathname } = useLocation()
  const { current, playback, togglePlay, stop, next } = usePlayer()

  if (!current || playback === "idle") return null
  // Already on this item's own page — the full stage is on screen.
  if (pathname === `/content/${current.id}`) return null

  return (
    <div
      className={cn(
        "surface-glass-raised fixed z-30 flex items-center gap-3 p-2",
        // Compact: sits directly above the floating bottom nav (h-16 + bottom-3).
        "inset-x-3 bottom-[5.25rem] rounded-2xl",
        // Medium/Wide: clears the side nav rail rather than spanning under it.
        "md:bottom-3 md:left-[4.5rem] md:right-4 xl:left-[16rem]"
      )}
    >
      <Link to={`/content/${current.id}`} className="flex min-w-0 flex-1 items-center gap-3">
        <span
          className="size-10 shrink-0 rounded-lg ring-1 ring-white/10"
          style={{
            backgroundImage: posterBackground(current.category, current.id, "square"),
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          aria-hidden
        />
        <span className="min-w-0">
          <span className="block truncate text-sm font-medium text-foreground">{current.title}</span>
          <span className="block truncate text-xs text-muted-foreground">{current.creator}</span>
        </span>
      </Link>

      <div className="flex shrink-0 items-center gap-1">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={togglePlay}
          aria-label={playback === "playing" ? "Pause" : "Play"}
        >
          {playback === "playing" ? <Pause className="size-4" /> : <Play className="size-4 translate-x-px" />}
        </Button>
        <Button variant="ghost" size="icon-sm" aria-label="Skip" onClick={next}>
          <SkipForward className="size-4" />
        </Button>
        <Button variant="ghost" size="icon-sm" onClick={stop} aria-label="Stop playback">
          <X className="size-4" />
        </Button>
      </div>
    </div>
  )
}
