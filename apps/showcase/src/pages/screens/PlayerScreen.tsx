import { useState } from "react"
import { ChevronDown, Download, Heart, Pause, Play, Repeat, Shuffle, SkipBack, SkipForward } from "lucide-react"

import { MobileAppShell, MobileBottomNav, MobileMain, PageScroll } from "@dhara/mobile"

import { NAV_ITEMS } from "@/lib/nav-items"
import { placeholderImage } from "@/lib/placeholder-image"

const artwork = placeholderImage("#be5339", "#271611")

/** Recreation of the "Playing Now" music player screen — Hanuman Chalisa style. */
export function PlayerScreen() {
  const [isPlaying, setIsPlaying] = useState(true)

  return (
    <MobileAppShell>
      <MobileMain>
        <PageScroll className="gap-6 pt-6">
          <div className="flex items-center justify-between">
            <button type="button" aria-label="Minimize" className="flex size-9 items-center justify-center rounded-full text-muted-foreground hover:bg-muted/50">
              <ChevronDown className="size-5" />
            </button>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Playing from playlist</p>
            <span className="size-9" />
          </div>

          <div
            className="aspect-square w-full rounded-2xl bg-cover bg-center shadow-lg shadow-black/40"
            style={{ backgroundImage: `url(${artwork})` }}
          />

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-xl font-semibold text-foreground">Hanuman Chalisa</h1>
              <p className="text-sm text-muted-foreground">moody.</p>
            </div>
            <button type="button" aria-label="Like" className="mt-1 text-muted-foreground hover:text-accent">
              <Heart className="size-5" />
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div className="h-full w-1/3 rounded-full bg-primary" />
            </div>
            <div className="flex justify-between text-[11px] text-muted-foreground">
              <span>0:00</span>
              <span>2:43</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Shuffle className="size-4 text-muted-foreground" />
            <SkipBack className="size-6 text-foreground" />
            <button
              type="button"
              onClick={() => setIsPlaying((p) => !p)}
              aria-label={isPlaying ? "Pause" : "Play"}
              className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground"
            >
              {isPlaying ? <Pause className="size-6" /> : <Play className="size-6" />}
            </button>
            <SkipForward className="size-6 text-foreground" />
            <Repeat className="size-4 text-muted-foreground" />
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Lyrics</p>
            <div className="surface-card p-4 text-sm text-foreground/90">
              जय हनुमान ज्ञान गुन सागर। जय कपीस तिहुँ लोक उजागर।
              <br />
              राम दूत अतुलित बल धामा। अंजनि-पुत्र पवनसुत नामा।
            </div>
          </div>

          <button type="button" className="flex items-center gap-2 self-start text-xs text-muted-foreground">
            <Download className="size-4" /> Download
          </button>
        </PageScroll>
      </MobileMain>
      <MobileBottomNav items={NAV_ITEMS} activeId="player" />
    </MobileAppShell>
  )
}
