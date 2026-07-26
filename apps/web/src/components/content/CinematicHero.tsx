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
  /** 3–4 items rendered as a portrait filmstrip on the right at desktop, Astral-style. */
  related?: ContentItem[]
  /** 1-based slot index shown as a large decorative number beside the title. */
  slotNumber?: number
}

/**
 * Full-bleed cinematic hero — generated backdrop artwork, layered scrims, display
 * title, metadata line, and a primary/secondary action row.
 *
 * On desktop the hero splits into two zones: a copy block on the left (constrained
 * to ~55 % of the width when a filmstrip is present) and a portrait-card filmstrip
 * on the right, directly inspired by the Astral cinema-app reference. The slot
 * number ("01", "02" …) anchors the title with a large decorative index, the same
 * way numbered entries anchor a programme guide.
 *
 * The backdrop bleeds past the shell's own padding to reach the viewport edge, and
 * slides up behind the transparent top bar so the bar floats over the artwork.
 * Legibility is carried by two stacked scrims (left-to-right, then bottom-up).
 */
export function CinematicHero({ content, eyebrow, size = "full", related, slotNumber }: CinematicHeroProps) {
  const artwork = posterBackground(content.category, `${content.id}-hero`, "landscape")
  const match = 82 + (content.views % 17)
  const hasFilmstrip = related && related.length > 0

  return (
    <section
      className={cn(
        "relative overflow-hidden",
        // Bleed past the shell's horizontal padding to reach the viewport edge.
        "-mx-4 md:-mx-6 lg:-mx-8",
        /*
         * Slide up behind the top bar. The bar is transparent until scrolled, so
         * the artwork runs to the very top of the viewport and the bar floats over
         * it. 5.25rem = the bar's 4rem plus the shell's 1.25rem top padding.
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

      {/* Right filmstrip — portrait cards floating over the right half, desktop only. */}
      {hasFilmstrip && (
        <div className="absolute bottom-8 right-0 hidden h-[64%] items-end gap-2 px-4 md:flex lg:gap-3 lg:px-8">
          {related.slice(0, 4).map((item, i) => (
            <Link
              key={item.id}
              to={`/content/${item.id}`}
              aria-label={item.title}
              className="group/card relative h-full w-[clamp(72px,6.5vw,110px)] shrink-0 overflow-hidden rounded-xl ring-1 ring-white/15 transition-all duration-200 hover:scale-[1.04] hover:ring-white/40"
            >
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  backgroundImage: posterBackground(item.category, `${item.id}-strip`),
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/25" />
              <span aria-hidden className="absolute left-2 top-2 text-[10px] font-bold tabular-nums text-white/40">
                {String((slotNumber ?? 0) + i + 2).padStart(2, "0")}
              </span>
              <p className="absolute bottom-2 left-2 right-2 line-clamp-2 text-[9px] font-semibold leading-tight text-white/90">
                {item.title}
              </p>
            </Link>
          ))}
        </div>
      )}

      {/* Copy block — constrained to left portion at desktop when filmstrip is present. */}
      <div
        className={cn(
          "relative flex h-full flex-col justify-end gap-4 p-5 md:p-8 lg:p-10",
          hasFilmstrip && "md:max-w-[55%] xl:max-w-[48%]"
        )}
      >
        {eyebrow ? (
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-accent">{eyebrow}</p>
        ) : null}

        {/* Slot number + title — inline two-column layout per the reference. */}
        <div className="flex items-start gap-3 md:gap-4">
          {slotNumber !== undefined && (
            <span
              aria-hidden
              className="mt-1 shrink-0 font-bold tabular-nums leading-none text-white/20 text-[clamp(2rem,4.5vw,3.75rem)]"
            >
              {String(slotNumber).padStart(2, "0")}
            </span>
          )}
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
        </div>

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
