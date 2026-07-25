import { createContext, useCallback, useContext, useMemo, useState } from "react"
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
  /** Elapsed seconds — design-only, does not advance on its own. */
  elapsedSeconds: number
  play: (id: string) => void
  togglePlay: () => void
  stop: () => void
  seek: (seconds: number) => void
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

  const play = useCallback((id: string) => {
    const item = getContentById(id)
    if (!item) return
    setCurrent(item)
    setElapsedSeconds(0)
    setPlayback("playing")
  }, [])

  const togglePlay = useCallback(() => {
    setPlayback((state) => {
      if (state === "idle") return "playing"
      return state === "playing" ? "paused" : "playing"
    })
  }, [])

  /**
   * VideoPlayer/UI.md: the mini player "never disappears due to navigation
   * alone — only an explicit stop or playback completion removes it."
   */
  const stop = useCallback(() => {
    setPlayback("idle")
    setCurrent(null)
    setElapsedSeconds(0)
  }, [])

  const seek = useCallback((seconds: number) => setElapsedSeconds(seconds), [])

  const value = useMemo(
    () => ({ current, playback, elapsedSeconds, play, togglePlay, stop, seek }),
    [current, playback, elapsedSeconds, play, togglePlay, stop, seek]
  )

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
}

export function usePlayer() {
  const ctx = useContext(PlayerContext)
  if (!ctx) throw new Error("usePlayer must be used within PlayerProvider")
  return ctx
}
