import { Play, Plus, Star } from "lucide-react"
import { Link } from "react-router-dom"

import { Button } from "@dhara/ui/button"
import { cn } from "@dhara/utils"
import { ShareButton } from "@/components/content/ShareButton"
import { Chip, RatingBadge } from "@/components/ui/Chip"
import type { ContentItem } from "@/lib/mock-content"
import { formatDuration, formatPublishedAgo } from "@/lib/mock-content"
import { categoryGlyph, posterBackground } from "@/lib/poster-art"

export interface CinematicHeroProps {
  content: ContentItem
  /** Small label above the title, e.g. "Featured today" or "Now trending". */
  eyebrow?: string
  /** Compact heroes suit secondary tabs; "full" is the Home treatment. */
  size?: "compact" | "full"
}

/**
 * Full-bleed cinematic hero — generated backdrop artwork, layered scrims, display
 * title, metadata line, and a primary/secondary action row.
 *
 * This is the reference designs' defining element and apps/web had no equivalent:
 * every tab previously opened straight into a grid, which is why the pages read as
 * flat. The backdrop bleeds past the shell's own padding so it reaches the viewport
 * edge, while the copy stays within the content column.
 *
 * Legibility is carried by two stacked scrims (left-to-right, then bottom-up) so
 * the title holds contrast over any artwork — ACCESSIBILITY.md requires text
 * contrast against the *actual rendered* background, not the nominal token.
 */
export function CinematicHero({ content, eyebrow, size = "full" }: CinematicHeroProps) {
  const artwork = posterBackground(content.category, `${content.id}-hero`, "landscape")

  /** Derived from views so it's stable per item — no rating field exists. */
  const match = 82 + (content.views % 17)

  return (
    <section
      className={cn(
        "relative overflow-hidden",
        // Bleed past the shell's horizontal padding to reach the viewport edge.
        "-mx-4 md:-mx-6 lg:-mx-8",
        /*
         * Slide up behind the top bar. The bar is transparent until scrolled, so
         * the artwork runs to the very top of the viewport and the bar floats over
         * it — the reference's treatment. 5.25rem = the bar's 4rem plus the shell's
         * 1.25rem top padding.
         */
        "-mt-[5.25rem] md:rounded-b-2xl",
        size === "full" ? "min-h-[clamp(420px,58vh,620px)]" : "min-h-[clamp(320px,40vh,440px)]"
      )}
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ backgroundImage: artwork, backgroundSize: "cover", backgroundPosition: "center" }}
      />
      <div aria-hidden className="scrim-left absolute inset-0" />
      <div aria-hidden className="scrim-bottom absolute inset-x-0 bottom-0 h-2/3" />
      <div aria-hidden className="texture-grain absolute inset-0 opacity-[0.045]" />

      {/* Oversized Devanagari watermark — HTML text, so the page font applies. */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-2 bottom-0 select-none text-[clamp(6rem,18vw,14rem)] font-semibold leading-none text-white/[0.06]"
      >
        {categoryGlyph(content.category, content.id)}
      </span>

      <div className="relative flex h-full flex-col justify-end gap-4 p-5 md:p-8 lg:p-10">
        {eyebrow ? (
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-accent">{eyebrow}</p>
        ) : null}

        <h1
          className={cn(
            "max-w-[18ch] font-semibold text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)]",
            size === "full"
              ? "text-[clamp(1.75rem,5.5vw,4rem)] leading-[0.98] tracking-[-0.03em]"
              : "text-[clamp(1.5rem,4vw,2.75rem)] leading-[1] tracking-[-0.025em]"
          )}
        >
          {content.title}
        </h1>

        {/* Metadata line — match %, creator, duration, recency. */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-white/75">
          <RatingBadge tone="match">{match}% match</RatingBadge>
          <span className="font-semibold text-white/90">{content.creator}</span>
          <span aria-hidden className="text-white/30">
            •
          </span>
          <span className="flex items-center gap-1 tabular-nums">
            <Star className="size-3 fill-accent text-accent" />
            {formatDuration(content.durationSeconds)}
          </span>
          <span aria-hidden className="text-white/30">
            •
          </span>
          <span>{formatPublishedAgo(content.publishedDaysAgo)}</span>
          <Chip tone="meta">{content.category}</Chip>
        </div>

        {size === "full" ? (
          <p className="max-w-[52ch] text-sm leading-relaxed text-white/70">{content.description}</p>
        ) : null}

        <div className="flex flex-wrap items-center gap-2.5">
          <Button variant="gold" size="lg" asChild className="min-w-[140px] gap-2 tracking-[0.08em]">
            <Link to={`/content/${content.id}`}>
              <Play className="size-4 fill-current" /> PLAY
            </Link>
          </Button>

          <Button
            variant="outline"
            size="icon"
            aria-label="Add to playlist"
            className="border-white/25 bg-white/[0.06] backdrop-blur-md hover:border-white/45 hover:bg-white/[0.12]"
          >
            <Plus className="size-5" />
          </Button>

          <div className="text-white">
            <ShareButton contentId={content.id} title={content.title} />
          </div>
        </div>
      </div>
    </section>
  )
}
