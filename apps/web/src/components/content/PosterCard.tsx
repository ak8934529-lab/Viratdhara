import { Play } from "lucide-react"
import { Link } from "react-router-dom"

import { cn } from "@dhara/utils"
import { ShareButton } from "@/components/content/ShareButton"
import { RatingBadge } from "@/components/ui/Chip"
import type { ContentItem } from "@/lib/mock-content"
import { formatDuration } from "@/lib/mock-content"
import { categoryGlyph, posterBackground } from "@/lib/poster-art"

export interface PosterCardProps {
  content: ContentItem
  /**
   * "portrait"  — true 2:3 poster, the "MY LIST" treatment from the reference.
   * "landscape" — 16:9, for episode/section rows.
   */
  shape?: "portrait" | "landscape"
  size?: "sm" | "default" | "lg"
  /** Optional index badge, for the numbered rows in the reference designs. */
  rank?: number
}

const PORTRAIT_WIDTH = {
  sm: "w-[128px] sm:w-[136px]",
  default: "w-[152px] sm:w-[168px] xl:w-[184px]",
  lg: "w-[176px] sm:w-[196px] xl:w-[214px]",
}

const LANDSCAPE_WIDTH = {
  sm: "w-[240px] sm:w-[260px]",
  default: "w-[280px] sm:w-[320px] xl:w-[360px]",
  lg: "w-[320px] sm:w-[380px] xl:w-[420px]",
}

/**
 * Poster card — generated artwork, title beneath, hover lift and play overlay.
 *
 * Artwork comes from lib/poster-art.ts rather than a flat category gradient, so a
 * row of cards reads as a real catalogue. Text sits *below* the poster (not over
 * it) at portrait size, which is what keeps a dense poster row legible; the
 * landscape variant overlays the title since it has the width for it.
 *
 * The card is deliberately not one large `<Link>` — it carries a share action, and
 * a `<button>` may not nest inside an `<a>`. See Sharing/UI.md for why the share
 * affordance has to be present on Content cards.
 */
export function PosterCard({ content, shape = "portrait", size = "default", rank }: PosterCardProps) {
  const isPortrait = shape === "portrait"
  /* Real artwork wins over the generated poster when the item supplies one. */
  const artwork = content.imageUrl
    ? `url("${content.imageUrl}")`
    : posterBackground(content.category, content.id, isPortrait ? "portrait" : "landscape")

  return (
    <div
      className={cn(
        "group/card relative shrink-0 snap-start",
        isPortrait ? PORTRAIT_WIDTH[size] : LANDSCAPE_WIDTH[size]
      )}
    >
      <Link
        to={`/content/${content.id}`}
        aria-label={content.title}
        className={cn(
          "relative block w-full overflow-hidden rounded-xl ring-1 ring-white/10",
          "shadow-[var(--shadow-lift)] transition-all duration-300",
          "group-hover/card:-translate-y-1 group-hover/card:shadow-[var(--shadow-float)] group-hover/card:ring-white/25",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
          isPortrait ? "aspect-[2/3]" : "aspect-video"
        )}
        style={{
          backgroundImage: artwork,
          backgroundSize: "cover",
          backgroundPosition: content.imageFocus ?? "center",
        }}
      >
        {/* Devanagari accent — HTML text, so the page font stack applies. Skipped
            over real photography, which already has its own subject. */}
        {!content.imageUrl && (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-[18%] text-center text-3xl font-semibold text-white/25 drop-shadow-lg"
          >
            {categoryGlyph(content.category, content.id)}
          </span>
        )}

        {rank !== undefined ? (
          <span className="absolute left-2 top-2 text-2xl font-bold leading-none text-white/85 drop-shadow-lg tabular-nums">
            {String(rank).padStart(2, "0")}
          </span>
        ) : null}

        <span className="absolute right-2 top-2">
          <RatingBadge>{content.type === "audio" ? "Audio" : "Video"}</RatingBadge>
        </span>

        {/* Play affordance on hover. */}
        <span className="absolute inset-0 flex items-center justify-center bg-black/25 opacity-0 backdrop-blur-[1px] transition-opacity duration-300 group-hover/card:opacity-100">
          <span className="flex size-11 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg">
            <Play className="size-5 translate-x-px fill-current" />
          </span>
        </span>

        <span className="scrim-bottom pointer-events-none absolute inset-x-0 bottom-0 h-1/3" />

        <span className="absolute bottom-2 right-2 rounded-md bg-black/65 px-1.5 py-0.5 text-[10px] font-semibold tabular-nums text-white/90 backdrop-blur-sm">
          {formatDuration(content.durationSeconds)}
        </span>

        {!isPortrait ? (
          <span className="absolute inset-x-0 bottom-0 p-3">
            <span className="line-clamp-2 block text-sm font-semibold leading-snug text-white drop-shadow">
              {content.title}
            </span>
            <span className="mt-0.5 block truncate text-[11px] text-white/70">{content.creator}</span>
          </span>
        ) : null}
      </Link>

      {isPortrait ? (
        <div className="mt-2.5 flex items-start gap-1.5">
          <Link to={`/content/${content.id}`} className="min-w-0 flex-1">
            <p className="line-clamp-2 text-[13px] font-semibold leading-snug text-foreground">{content.title}</p>
            <p className="mt-0.5 truncate text-[11px] text-muted-foreground">{content.creator}</p>
          </Link>
          <div className="-mt-1 shrink-0 opacity-100 transition-opacity md:opacity-0 md:group-hover/card:opacity-100 md:focus-within:opacity-100">
            <ShareButton contentId={content.id} title={content.title} />
          </div>
        </div>
      ) : (
        <div className="absolute right-1.5 top-1.5 opacity-100 transition-opacity md:opacity-0 md:group-hover/card:opacity-100 md:focus-within:opacity-100">
          <ShareButton contentId={content.id} title={content.title} />
        </div>
      )}
    </div>
  )
}
