import {
  ChevronDown,
  ListMusic,
  MonitorSpeaker,
  MoreVertical,
  Pause,
  Play,
  Plus,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
} from "lucide-react"
import { useNavigate } from "react-router-dom"

import { Button } from "@dhara/ui/button"
import { cn } from "@dhara/utils"
import { CATEGORY_GRADIENT } from "@/components/content/category-visuals"
import { EmptyState } from "@/components/content/EmptyState"
import { ShareButton } from "@/components/content/ShareButton"
import { VideoCard } from "@/components/content/VideoCard"
import { MOCK_CONTENT, formatDuration } from "@/lib/mock-content"
import type { ContentItem } from "@/lib/mock-content"
import { usePlayer } from "@/lib/player-context"

/**
 * Playing Now (`/playing-now`) — the full player, per
 * docs/03_FEATURES/VideoPlayer/UI.md. This is a tab root, NOT a pushed screen:
 * it carries a minimize control rather than a back arrow, and NAVIGATION_MODEL.md
 * makes it the one Main App screen with no top bar (AppShell handles that).
 *
 * Two presentations, per the mobile designs: Audio gets square artwork
 * (Playing Now.png), Video gets a landscape 16:9 surface (Playing Now-3.png).
 *
 * Deviations from the design, and why:
 * - The seek bar shows elapsed / **remaining**, per UI.md's explicit wording.
 *   The design shows total duration; documentation wins (AI_INSTRUCTIONS.md).
 * - The design's **Download** control is omitted: VideoPlayer/README.md states
 *   offline/download playback is "not specified", so building it would be
 *   inventing a feature. Add-to-playlist (+) is kept — SPEC.md does allow
 *   adding Content to a Playlist "from any feed".
 * - A **share** control is added, which the design lacks: Sharing/UI.md requires
 *   one "in the Content detail area of Video Player's full player".
 */
export function PlayingNowPage() {
  const navigate = useNavigate()
  const {
    current,
    playback,
    elapsedSeconds,
    shuffle,
    repeat,
    togglePlay,
    seek,
    syncTime,
    handleEnded,
    next,
    previous,
    toggleShuffle,
    toggleRepeat,
    setMediaElement,
  } = usePlayer()

  /**
   * `idle` with nothing loaded. No document specifies what this tab shows when
   * no session exists, so the general UX_PATTERNS.md empty-state rule applies.
   */
  if (!current || playback === "idle") {
    return (
      <EmptyState
        icon={ListMusic}
        title="Nothing playing right now"
        description="Pick something from Home, Suno, or Dekho and it'll appear here."
      />
    )
  }

  const remaining = Math.max(0, current.durationSeconds - elapsedSeconds)
  const progress = current.durationSeconds > 0 ? (elapsedSeconds / current.durationSeconds) * 100 : 0
  const isAudio = current.type === "audio"

  /** Wide-breakpoint secondary panel — optional per UI.md, not required below Wide. */
  const upNext = MOCK_CONTENT.filter((item) => item.category === current.category && item.id !== current.id).slice(0, 5)

  return (
    <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-6 xl:flex-row xl:gap-8">
      <div className="mx-auto flex min-w-0 w-full max-w-xl flex-col gap-5 xl:mx-0 xl:max-w-2xl">
        {/* Header: minimize (spec-required) + source label + overflow. */}
        <div className="flex items-center justify-between gap-3">
          <Button variant="ghost" size="icon-sm" aria-label="Minimize player" onClick={() => navigate(-1)}>
            <ChevronDown className="size-5" />
          </Button>

          <div className="min-w-0 text-center">
            <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">Playing from</p>
            <p className="truncate text-xs font-semibold text-accent">{current.category}</p>
          </div>

          <Button variant="ghost" size="icon-sm" aria-label="More options">
            <MoreVertical className="size-5" />
          </Button>
        </div>

        {/* Artwork (Audio) or video surface (Video). */}
        <div
          className={cn(
            "relative w-full overflow-hidden rounded-2xl bg-gradient-to-br shadow-lg shadow-black/40",
            CATEGORY_GRADIENT[current.category],
            isAudio ? "aspect-square" : "aspect-video"
          )}
        >
          {isAudio ? (
            <>
              {/* Real audio playback. Placeholder media is .mp4, whose audio track
                  plays fine through an <audio> element. */}
              <audio
                key={current.id}
                ref={setMediaElement}
                src={current.videoUrl}
                onTimeUpdate={(event) => syncTime(Math.floor(event.currentTarget.currentTime))}
                onEnded={handleEnded}
              />
              <button
                type="button"
                onClick={togglePlay}
                aria-label={playback === "playing" ? "Pause" : "Play"}
                className="absolute inset-0"
              />
            </>
          ) : (
            <video
              key={current.id}
              ref={setMediaElement}
              src={current.videoUrl}
              controls
              className="absolute inset-0 size-full"
              onTimeUpdate={(event) => syncTime(Math.floor(event.currentTarget.currentTime))}
              onEnded={handleEnded}
            >
              <track kind="captions" />
            </video>
          )}
        </div>

        {/* Metadata + secondary actions. */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h1 className="truncate text-xl font-semibold leading-tight text-foreground md:text-2xl">
              {current.title}
            </h1>
            <p className="mt-1 truncate text-sm font-semibold text-muted-foreground">{current.creator}</p>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <Button variant="ghost" size="icon-sm" aria-label="Play on another device">
              <MonitorSpeaker className="size-5" />
            </Button>
            <ShareButton contentId={current.id} title={current.title} />
          </div>
        </div>

        {/* Seek bar with elapsed / remaining, per UI.md. */}
        <div className="flex flex-col gap-2">
          <input
            type="range"
            min={0}
            max={current.durationSeconds}
            value={elapsedSeconds}
            onChange={(event) => seek(Number(event.target.value))}
            aria-label="Seek"
            className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-muted accent-primary
              [&::-webkit-slider-thumb]:size-3.5 [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
            style={{
              background: `linear-gradient(to right, var(--color-primary) ${progress}%, var(--color-muted) ${progress}%)`,
            }}
          />
          <div className="flex justify-between text-[11px] tabular-nums text-muted-foreground">
            <span>{formatDuration(elapsedSeconds)}</span>
            <span>-{formatDuration(remaining)}</span>
          </div>
        </div>

        {/* Transport row — order per UI.md: shuffle, previous, play/pause, next, repeat. */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Shuffle"
            aria-pressed={shuffle}
            onClick={toggleShuffle}
            className={shuffle ? "text-accent" : undefined}
          >
            <Shuffle className="size-4" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Previous" onClick={previous}>
            <SkipBack className="size-6" />
          </Button>

          <button
            type="button"
            onClick={togglePlay}
            aria-label={playback === "playing" ? "Pause" : "Play"}
            className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform active:scale-95"
          >
            {playback === "playing" ? <Pause className="size-6" /> : <Play className="size-6 translate-x-0.5" />}
          </button>

          <Button variant="ghost" size="icon" aria-label="Next" onClick={next}>
            <SkipForward className="size-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Repeat"
            aria-pressed={repeat}
            onClick={toggleRepeat}
            className={repeat ? "text-accent" : undefined}
          >
            <Repeat className="size-4" />
          </Button>
          <Button variant="ghost" size="icon-sm" aria-label="Add to playlist">
            <Plus className="size-4" />
          </Button>
        </div>

        {/* Lyrics / detail panel — "where applicable" per UI.md, so Audio only. */}
        {isAudio ? <LyricsPanel /> : null}
      </div>

      {/* Wide-only up-next panel. Queue management is explicitly out of V1 scope,
          so these are static rows with no reorder/remove controls. */}
      {upNext.length > 0 ? (
        <aside className="hidden w-80 shrink-0 flex-col gap-3 xl:flex">
          <p className="text-sm font-semibold text-foreground">Up next</p>
          {upNext.map((item: ContentItem) => (
            <VideoCard key={item.id} content={item} />
          ))}
        </aside>
      ) : null}
    </div>
  )
}

/**
 * Lyrics panel. The design fills this with a solid terracotta card; apps/web
 * uses the glass surface system instead (SURFACE_SYSTEM.md — packages/mobile's
 * opaque `surface-card` is not used here), taking the single per-screen
 * `surface-glass-accent` allowance that UI.md nominates for this player.
 */
function LyricsPanel() {
  return (
    <section className="flex flex-col gap-2">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Lyrics</p>
      <div className="surface-glass-accent relative max-h-44 overflow-hidden p-4">
        <p className="text-sm leading-relaxed text-foreground/90">
          जय हनुमान ज्ञान गुन सागर। जय कपीस तिहुं लोक उजागर।।
          <br />
          राम दूत अतुलित बल धामा। अंजनि-पुत्र पवनसुत नामा।।
          <br />
          महाबीर बिक्रम बजरंगी। कुमति निवार सुमति के संगी।।
        </p>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-background/80 to-transparent" />
      </div>
    </section>
  )
}
