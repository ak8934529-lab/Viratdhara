import { Bookmark, Heart, MoreHorizontal, Play } from "lucide-react"
import { useState } from "react"

import { cn } from "@dhara/utils"
import { ShareButton } from "@/components/content/ShareButton"
import { SHORTS_CONTENT, formatCompactCount } from "@/lib/mock-content"
import type { ContentItem } from "@/lib/mock-content"
import { categoryGlyph, posterBackground } from "@/lib/poster-art"

/**
 * Shorts tab — `format: short` Video only, in a single-column, full-height,
 * one-item-at-a-time vertical feed, per docs/03_FEATURES/ContentDiscovery/UI.md
 * ("a distinct single-column, full-screen-per-item vertical feed, not the
 * section/row pattern of the other three") and "stays single-item-at-a-time
 * regardless of breakpoint".
 *
 * The nav chrome deliberately stays visible: NAVIGATION_MODEL.md forbids any
 * Main App screen omitting both the top bar and bottom nav, so "full-screen"
 * means the full *content area*, not a chrome-less viewport. The feed is its own
 * scroll container with scroll-snap so each short settles into place.
 *
 * The overlay action rail (Like + count, Save, Share, More) comes from the
 * mobile Shorts design — ContentDiscovery/COMPONENTS.md leaves the "Shorts
 * full-screen item renderer" undefined, so the design is the source here.
 * Once settled this component is registered in COMPONENT_REGISTRY.md.
 */

function RailAction({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: typeof Heart
  label: string
  active?: boolean
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center gap-1 text-[11px] font-medium text-foreground/90"
    >
      <span className="flex size-10 items-center justify-center rounded-full bg-background/40 backdrop-blur-md">
        <Icon className={cn("size-5", active && "fill-primary text-primary")} />
      </span>
      {label}
    </button>
  )
}

function ShortItem({ content }: { content: ContentItem }) {
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)

  const likes = content.views + (liked ? 1 : 0)

  return (
    <div className="flex h-full snap-start snap-always items-center justify-center py-1">
      <div
        className={cn(
          "relative h-full w-full max-w-[min(100%,26rem)] overflow-hidden rounded-2xl",
          "ring-1 ring-white/15 shadow-[var(--shadow-cinema)]"
        )}
        style={{
          backgroundImage: posterBackground(content.category, content.id, "portrait"),
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Placeholder frame — no vertical sample media exists, so the generated
            portrait artwork stands in for the clip itself. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-[14%] text-center text-5xl font-semibold text-white/20"
        >
          {categoryGlyph(content.category, content.id)}
        </span>

        <div className="absolute inset-0 flex items-center justify-center">
          <span className="flex size-16 items-center justify-center rounded-full border border-white/50 bg-black/25 backdrop-blur-sm transition-transform hover:scale-105">
            <Play className="size-7 translate-x-0.5 fill-white text-white" />
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent pt-16" />

        {/* Action rail — right edge, vertically stacked, per the mobile design. */}
        <div className="absolute bottom-4 right-3 flex flex-col items-center gap-4">
          <RailAction
            icon={Heart}
            label={formatCompactCount(likes)}
            active={liked}
            onClick={() => setLiked((v) => !v)}
          />
          <RailAction icon={Bookmark} label="Save" active={saved} onClick={() => setSaved((v) => !v)} />
          <ShareButton contentId={content.id} title={content.title} variant="labelled" />
          <RailAction icon={MoreHorizontal} label="More" />
        </div>

        {/* Creator + title, clear of the rail. */}
        <div className="absolute bottom-5 left-4 right-20">
          <p className="text-xs font-semibold text-white/80">{content.creator}</p>
          <p className="mt-1 line-clamp-2 text-sm font-semibold leading-snug text-white drop-shadow">
            {content.title}
          </p>
        </div>
      </div>
    </div>
  )
}

export function ShortsPage() {
  if (SHORTS_CONTENT.length === 0) {
    return (
      <p className="py-16 text-center text-sm text-muted-foreground">No short-format content yet.</p>
    )
  }

  return (
    <div
      className={cn(
        "-mt-1 snap-y snap-mandatory overflow-y-auto",
        // Content area minus the shell's own chrome: top bar + main padding at
        // each breakpoint. Keeps exactly one short in view at a time.
        "h-[calc(100svh-12.5rem)] md:h-[calc(100svh-7.5rem)]"
      )}
    >
      {SHORTS_CONTENT.map((item) => (
        <ShortItem key={item.id} content={item} />
      ))}
    </div>
  )
}
