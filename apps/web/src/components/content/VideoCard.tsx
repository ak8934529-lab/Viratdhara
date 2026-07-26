import { Play, Star } from "lucide-react"
import { Link } from "react-router-dom"

import { Avatar, AvatarFallback } from "@dhara/ui/avatar"
import { cn } from "@dhara/utils"
import { ShareButton } from "@/components/content/ShareButton"
import { RatingBadge } from "@/components/ui/Chip"
import type { ContentItem } from "@/lib/mock-content"
import { formatDuration, formatPublishedAgo, formatViews } from "@/lib/mock-content"
import { categoryGlyph, posterBackground } from "@/lib/poster-art"

/**
 * Grid card — 16:9 generated artwork with a metadata line beneath, in the
 * information density of the reference designs (rating · duration · year rather
 * than a bare view count).
 *
 * Used by every grid surface: Home, Search results, Category browse, Creator
 * Profile. Deliberately not one large `<Link>` — it carries a share action and a
 * `<button>` cannot nest inside an `<a>` (Sharing/UI.md requires the affordance on
 * Content cards).
 */
export function VideoCard({ content }: { content: ContentItem }) {
  /* Real artwork wins over the generated poster when the item supplies one. */
  const artwork = content.imageUrl
    ? `url("${content.imageUrl}")`
    : posterBackground(content.category, content.id, "landscape")

  /** Derived from views so it's stable per item — no rating field exists. */
  const rating = (7.4 + ((content.views % 23) / 23) * 2.4).toFixed(1)

  return (
    <div className="group/card flex flex-col gap-3">
      <Link
        to={`/content/${content.id}`}
        aria-label={content.title}
        className={cn(
          "relative aspect-video w-full overflow-hidden rounded-xl ring-1 ring-white/10",
          "shadow-[var(--shadow-lift)] transition-all duration-300",
          "group-hover/card:-translate-y-0.5 group-hover/card:shadow-[var(--shadow-float)] group-hover/card:ring-white/25",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        )}
        style={{
          backgroundImage: artwork,
          backgroundSize: "cover",
          backgroundPosition: content.imageFocus ?? "center",
        }}
      >
        {/* Skipped over real photography, which already has its own subject. */}
        {!content.imageUrl && (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 flex items-center justify-center text-4xl font-semibold text-white/[0.18] drop-shadow-lg"
          >
            {categoryGlyph(content.category, content.id)}
          </span>
        )}

        <span className="absolute left-2 top-2">
          <RatingBadge>{content.type === "audio" ? "Audio" : "Video"}</RatingBadge>
        </span>

        <span className="absolute inset-0 flex items-center justify-center bg-black/25 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100">
          <span className="flex size-12 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg">
            <Play className="size-5 translate-x-px fill-current" />
          </span>
        </span>

        <span className="scrim-bottom pointer-events-none absolute inset-x-0 bottom-0 h-1/2" />

        <span className="absolute bottom-2 right-2 rounded-md bg-black/70 px-1.5 py-0.5 text-[10px] font-semibold tabular-nums text-white/90 backdrop-blur-sm">
          {formatDuration(content.durationSeconds)}
        </span>
      </Link>

      <div className="flex gap-3">
        <Avatar size="sm" className="mt-0.5 shrink-0">
          <AvatarFallback>{content.creator.charAt(0)}</AvatarFallback>
        </Avatar>

        <Link to={`/content/${content.id}`} className="min-w-0 flex-1">
          <p className="line-clamp-2 text-sm font-semibold leading-snug text-foreground transition-colors group-hover/card:text-accent">
            {content.title}
          </p>
          <p className="mt-1 truncate text-xs text-muted-foreground">{content.creator}</p>
          <p className="mt-0.5 flex items-center gap-1.5 truncate text-[11px] text-muted-foreground">
            <Star className="size-3 shrink-0 fill-accent text-accent" />
            <span className="font-semibold tabular-nums text-foreground/80">{rating}</span>
            <span aria-hidden>·</span>
            <span className="tabular-nums">{formatViews(content.views)}</span>
            <span aria-hidden>·</span>
            <span className="truncate">{formatPublishedAgo(content.publishedDaysAgo)}</span>
          </p>
        </Link>

        <div className="-mt-1 shrink-0 opacity-100 transition-opacity md:opacity-0 md:group-hover/card:opacity-100 md:focus-within:opacity-100">
          <ShareButton contentId={content.id} title={content.title} />
        </div>
      </div>
    </div>
  )
}
