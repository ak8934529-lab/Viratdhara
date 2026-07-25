import {
  Maximize,
  Minimize,
  Pause,
  Play,
  Plus,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react"
import { useEffect, useRef, useState } from "react"

import { cn } from "@dhara/utils"
import type { ContentItem } from "@/lib/mock-content"
import { formatDuration } from "@/lib/mock-content"
import { usePlayer } from "@/lib/player-context"
import { posterSrc } from "@/lib/poster-art"

/**
 * The playback surface for a Content item, rendered inside the Content detail
 * page (`/content/:id`).
 *
 * **One video player, with the transport integrated into it.** The native
 * `controls` attribute is deliberately not used: it would put browser-chrome
 * play/seek/volume in one bar and this feature's own shuffle/previous/next/repeat
 * in a second bar below, which is two competing control surfaces for one session.
 * Everything is composed into a single overlay bar instead, so the player reads as
 * one control and matches the surface system rather than the browser's styling.
 *
 * **One surface for both Content types.** There is no separate audio layout —
 * the square-artwork stage was removed by product direction. Audio items supply
 * their generated artwork as the `poster` frame so they present as a real poster
 * rather than a black rectangle.
 *
 * This absorbed the former standalone "Playing Now" tab; that tab and its
 * `/playing-now` route were removed. The element registers with the player
 * context, so the docked mini player stays in sync rather than running a second
 * session.
 *
 * Transport order follows VideoPlayer/UI.md: shuffle, previous, play/pause, next,
 * repeat. The seek bar shows elapsed / **remaining**, per that document's wording,
 * not total duration. Download stays omitted — README.md states offline playback
 * is "not specified".
 */
export function PlaybackStage({ content }: { content: ContentItem }) {
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

  const shellRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [muted, setMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Only the loaded item drives the shared transport.
  const isCurrent = current?.id === content.id
  const elapsed = isCurrent ? elapsedSeconds : 0
  const remaining = Math.max(0, content.durationSeconds - elapsed)
  const progress = content.durationSeconds > 0 ? (elapsed / content.durationSeconds) * 100 : 0
  const isPlaying = isCurrent && playback === "playing"

  /** Track fullscreen changes from any source, including the Escape key. */
  useEffect(() => {
    function onChange() {
      setIsFullscreen(document.fullscreenElement === shellRef.current)
    }
    document.addEventListener("fullscreenchange", onChange)
    return () => document.removeEventListener("fullscreenchange", onChange)
  }, [])

  function toggleFullscreen() {
    if (document.fullscreenElement) {
      void document.exitFullscreen().catch(() => undefined)
      return
    }
    void shellRef.current?.requestFullscreen().catch(() => undefined)
  }

  function toggleMuted() {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setMuted(video.muted)
  }

  return (
    <div
      ref={shellRef}
      className="group/player relative overflow-hidden rounded-xl bg-black ring-1 ring-white/10 shadow-[var(--shadow-cinema)]"
    >
      <video
        key={content.id}
        ref={(element) => {
          videoRef.current = element
          setMediaElement(element)
        }}
        src={content.videoUrl}
        poster={posterSrc(content.category, content.id, "landscape")}
        className="aspect-video w-full"
        onTimeUpdate={(event) => syncTime(Math.floor(event.currentTarget.currentTime))}
        onEnded={handleEnded}
      >
        <track kind="captions" />
      </video>

      {/* Click-to-toggle over the frame, clear of the control bar. */}
      <button
        type="button"
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause" : "Play"}
        className="absolute inset-x-0 bottom-16 top-0 cursor-default"
      >
        {/* Centre play badge while paused, so a poster frame reads as playable. */}
        {!isPlaying ? (
          <span className="pointer-events-none absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent/90 text-accent-foreground shadow-[var(--glow-accent)] backdrop-blur-sm">
            <Play className="size-7 translate-x-0.5 fill-current" />
          </span>
        ) : null}
      </button>

      {/*
        Integrated control bar. Held visible while paused or on hover/focus so it
        never hides the only means of resuming, and so keyboard users can always
        reach it.
      */}
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 flex flex-col gap-1.5 px-3 pb-2.5 pt-10 transition-opacity duration-200",
          "bg-gradient-to-t from-black/90 via-black/60 to-transparent",
          isPlaying
            ? "opacity-0 group-hover/player:opacity-100 focus-within:opacity-100"
            : "opacity-100"
        )}
      >
        <input
          type="range"
          min={0}
          max={content.durationSeconds}
          value={elapsed}
          onChange={(event) => seek(Number(event.target.value))}
          aria-label="Seek"
          className="h-1.5 w-full cursor-pointer appearance-none rounded-full
            [&::-webkit-slider-thumb]:size-3 [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent
            [&::-webkit-slider-thumb]:shadow-md"
          style={{
            background: `linear-gradient(to right, var(--color-accent) ${progress}%, rgb(255 255 255 / 0.25) ${progress}%)`,
          }}
        />

        <div className="flex items-center gap-0.5">
          <PlayerControl label="Shuffle" active={shuffle} onClick={toggleShuffle}>
            <Shuffle className="size-4" />
          </PlayerControl>

          <PlayerControl label="Previous" onClick={previous}>
            <SkipBack className="size-4" />
          </PlayerControl>

          <PlayerControl label={isPlaying ? "Pause" : "Play"} onClick={togglePlay}>
            {isPlaying ? <Pause className="size-5" /> : <Play className="size-5 translate-x-px" />}
          </PlayerControl>

          <PlayerControl label="Next" onClick={next}>
            <SkipForward className="size-4" />
          </PlayerControl>

          <PlayerControl label="Repeat" active={repeat} onClick={toggleRepeat}>
            <Repeat className="size-4" />
          </PlayerControl>

          <PlayerControl label={muted ? "Unmute" : "Mute"} onClick={toggleMuted}>
            {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
          </PlayerControl>

          <span className="ml-1.5 shrink-0 text-[11px] font-medium tabular-nums text-white/80">
            {formatDuration(elapsed)}
            <span className="mx-1 text-white/35">/</span>
            <span className="text-white/60">-{formatDuration(remaining)}</span>
          </span>

          <span className="flex-1" />

          <PlayerControl label="Add to playlist">
            <Plus className="size-4" />
          </PlayerControl>

          <PlayerControl
            label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
            onClick={toggleFullscreen}
          >
            {isFullscreen ? <Minimize className="size-4" /> : <Maximize className="size-4" />}
          </PlayerControl>
        </div>
      </div>
    </div>
  )
}

/**
 * One control in the player's overlay bar. Uses white-on-scrim rather than the
 * app's `Button` ghost variant, because these sit over video rather than over a
 * glass surface and need to stay legible against arbitrary frames.
 */
function PlayerControl({
  label,
  active,
  onClick,
  children,
}: {
  label: string
  active?: boolean
  onClick?: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      title={label}
      className={cn(
        "flex size-9 shrink-0 items-center justify-center rounded-full transition-colors",
        "hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
        active ? "text-accent" : "text-white/90"
      )}
    >
      {children}
    </button>
  )
}
