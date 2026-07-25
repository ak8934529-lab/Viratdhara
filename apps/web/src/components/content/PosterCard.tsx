import { Link } from "react-router-dom"

import { cn } from "@dhara/utils"
import { CATEGORY_GRADIENT } from "@/components/content/category-visuals"
import { ShareButton } from "@/components/content/ShareButton"
import type { ContentItem } from "@/lib/mock-content"

export interface PosterCardProps {
  content: ContentItem
  /**
   * "landscape" — Dekho's wide section cards. "portrait" — Suno's taller
   * playlist cards. Both take the mobile design's treatment: image fills the
   * card, title overlaid at the bottom over a scrim, hairline light border.
   */
  shape?: "landscape" | "portrait"
  /** Optional bottom-right meta, e.g. Dekho's Podcast row showing "10 Episodes (2021)". */
  meta?: string
}

/**
 * Overlay-title Content card, matching the mobile design's Suno/Dekho section
 * rows (real imagery with the title set over it, rather than the metadata-below
 * treatment of `VideoCard`). Thumbnails are the per-category placeholder
 * gradients — no real thumbnail assets exist yet.
 *
 * Sized for a horizontally-scrolling row: a fixed width that lets the next card
 * peek in at Compact, widening at Medium/Wide per RESPONSIVE_SYSTEM.md.
 */
export function PosterCard({ content, shape = "landscape", meta }: PosterCardProps) {
  return (
    /* The share button sits outside the Link (a button may not nest in an anchor)
       while still reading as part of the card's action area, per Sharing/UI.md. */
    <div
      className={cn(
        "group relative shrink-0",
        shape === "landscape"
          ? "aspect-[16/10] w-[76vw] max-w-[340px] sm:w-[340px] xl:w-[380px]"
          : "aspect-[3/4] w-[42vw] max-w-[190px] sm:w-[190px] xl:w-[210px]"
      )}
    >
      <Link
        to={`/content/${content.id}`}
        aria-label={content.title}
        className={cn(
          "absolute inset-0 overflow-hidden rounded-xl border border-white/15",
          "bg-gradient-to-br transition-transform group-hover:scale-[1.015]",
          CATEGORY_GRADIENT[content.category]
        )}
      >
        {/* Scrim so the overlaid title stays legible against any thumbnail. */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3">
          <div className="min-w-0">
            <p className="line-clamp-2 text-sm font-semibold leading-snug text-white drop-shadow">{content.title}</p>
            <p className="mt-0.5 truncate text-[11px] text-white/70">{content.creator}</p>
          </div>
          {meta ? <span className="shrink-0 text-[11px] font-medium text-white/80">{meta}</span> : null}
        </div>
      </Link>

      <div className="absolute right-1 top-1 text-white opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100 md:focus-within:opacity-100">
        <ShareButton contentId={content.id} title={content.title} />
      </div>
    </div>
  )
}
