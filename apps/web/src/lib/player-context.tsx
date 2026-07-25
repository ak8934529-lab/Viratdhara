import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"
import type { ReactNode } from "react"

import { MOCK_CONTENT, getContentById } from "@/lib/mock-content"
import type { ContentItem } from "@/lib/mock-content"

/**
 * Playback state, mirroring STATE_REGISTRY.md's Playback machine:
 *   idle → playing → paused → playing, and playing → (completes) → idle
 * Buffering is deliberately NOT a top-level state — STATES.md calls it "a
 * transient sub-state of `playing`" in V1.
 */
export type PlaybackState = "idle" | "playing" | "paused"

interface PlayerContextValue {
  current: ContentItem | null
  playback: PlaybackState
  elapsedSeconds: number
  /** Transport toggles. Both are local UI state — no queue exists to shuffle. */
  shuffle: boolean
  repeat: boolean
  play: (id: string) => void
  /**
   * Makes an item the current session without starting playback. Used when a
   * Content page is opened: the item becomes current (so the mini player tracks
   * it) but nothing auto-plays, which browsers would block anyway without a
   * user gesture.
   */
  load: (id: string) => void
  togglePlay: () => void
  stop: () => void
  seek: (seconds: number) => void
  /** Reports the media element's own time back, without writing to it. */
  syncTime: (seconds: number) => void
  /** Playback reached the end: content_completed → idle, or repeat restarts. */
  handleEnded: () => void
  next: () => void
  previous: () => void
  toggleShuffle: () => void
  toggleRepeat: () => void
  /** Registers the media element so playback state can drive it. */
  setMediaElement: (element: HTMLMediaElement | null) => void
}

const PlayerContext = createContext<PlayerContextValue | null>(null)

/**
 * DEMO-ONLY playback state. No real media session, queue, or autoplay-next
 * exists — VideoPlayer/SPEC.md states "Autoplay-next and playback queue are not
 * specified", so none is implemented here.
 *
 * Seeded with a track already playing so the full player and mini player are
 * both reviewable without first having to start playback.
 */
export function PlayerProvider({ children }: { children: ReactNode }) {
  const [current, setCurrent] = useState<ContentItem | null>(MOCK_CONTENT[0] ?? null)
  const [playback, setPlayback] = useState<PlaybackState>("paused")
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const [shuffle, setShuffle] = useState(false)
  const [repeat, setRepeat] = useState(false)
  const mediaRef = useRef<HTMLMediaElement | null>(null)

  const setMediaElement = useCallback((element: HTMLMediaElement | null) => {
    mediaRef.current = element
  }, [])

  const play = useCallback((id: string) => {
    const item = getContentById(id)
    if (!item) return
    setCurrent(item)
    setElapsedSeconds(0)
    setPlayback("playing")
  }, [])

  const load = useCallback((id: string) => {
    const item = getContentById(id)
    if (!item) return
    setCurrent((existing) => {
      // Re-opening the item already loaded must not reset its position.
      if (existing?.id === item.id) return existing
      setElapsedSeconds(0)
      return item
    })
    setPlayback((state) => (state === "playing" ? state : "paused"))
  }, [])

  const togglePlay = useCallback(() => {
    setPlayback((state) => {
      if (state === "idle") return "playing"
      return state === "playing" ? "paused" : "playing"
    })
  }, [])

  /**
   * Track stepping. AUDIO_CONTENT is the ordered set the player walks — there is
   * no Playlist entity in play here, and VideoPlayer/SPEC.md states autoplay-next
   * and playback queue are "not specified", so this is simple adjacency over the
   * audio set rather than a real queue.
   */
  const step = useCallback(
    (direction: 1 | -1) => {
      setCurrent((item) => {
        if (!item) return item
        const pool = MOCK_CONTENT.filter((entry) => entry.type === item.type)
        const index = pool.findIndex((entry) => entry.id === item.id)
        if (index === -1) return item
        const nextIndex = shuffle
          ? Math.floor((index + direction + pool.length) % pool.length)
          : (index + direction + pool.length) % pool.length
        return pool[nextIndex]
      })
      setElapsedSeconds(0)
    },
    [shuffle]
  )

  const next = useCallback(() => step(1), [step])
  const previous = useCallback(() => step(-1), [step])
  const toggleShuffle = useCallback(() => setShuffle((value) => !value), [])
  const toggleRepeat = useCallback(() => setRepeat((value) => !value), [])

  /** Drive the registered media element from playback state. */
  useEffect(() => {
    const media = mediaRef.current
    if (!media) return

    if (playback === "playing") {
      // May reject if the browser blocks unpromoted autoplay — not an error state.
      void media.play().catch(() => undefined)
    } else {
      media.pause()
    }
  }, [playback, current])

  /**
   * VideoPlayer/UI.md: the mini player "never disappears due to navigation
   * alone — only an explicit stop or playback completion removes it."
   */
  const stop = useCallback(() => {
    setPlayback("idle")
    setCurrent(null)
    setElapsedSeconds(0)
  }, [])

  const seek = useCallback((seconds: number) => {
    setElapsedSeconds(seconds)
    if (mediaRef.current) mediaRef.current.currentTime = seconds
  }, [])

  const syncTime = useCallback((seconds: number) => setElapsedSeconds(seconds), [])

  /**
   * STATE_REGISTRY.md: playing ──(reaches end)──> content_completed ──> idle.
   * With repeat on, the session restarts instead of completing.
   */
  const handleEnded = useCallback(() => {
    if (repeat) {
      setElapsedSeconds(0)
      if (mediaRef.current) mediaRef.current.currentTime = 0
      setPlayback("playing")
      return
    }
    setPlayback("idle")
    setCurrent(null)
    setElapsedSeconds(0)
  }, [repeat])

  const value = useMemo(
    () => ({
      current,
      playback,
      elapsedSeconds,
      shuffle,
      repeat,
      play,
      load,
      togglePlay,
      stop,
      seek,
      syncTime,
      handleEnded,
      next,
      previous,
      toggleShuffle,
      toggleRepeat,
      setMediaElement,
    }),
    [
      current,
      playback,
      elapsedSeconds,
      shuffle,
      repeat,
      play,
      load,
      togglePlay,
      stop,
      seek,
      syncTime,
      handleEnded,
      next,
      previous,
      toggleShuffle,
      toggleRepeat,
      setMediaElement,
    ]
  )

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
}

export function usePlayer() {
  const ctx = useContext(PlayerContext)
  if (!ctx) throw new Error("usePlayer must be used within PlayerProvider")
  return ctx
}
