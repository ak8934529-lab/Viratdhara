import { ChevronLeft, ChevronRight, Play, Plus } from "lucide-react"
import { useRef } from "react"
import { Link } from "react-router-dom"

import { Button } from "@dhara/ui/button"
import { cn } from "@dhara/utils"
import { ShareButton } from "@/components/content/ShareButton"
import { Chip } from "@/components/ui/Chip"
import type { ContentItem } from "@/lib/mock-content"
import { formatPublishedAgo } from "@/lib/mock-content"
import { categoryGlyph, posterBackground } from "@/lib/poster-art"

export interface CinematicHeroProps {
  content: ContentItem
  /** Small label above the title, e.g. "Featured Today" or "Now streaming". */
  eyebrow?: string
  /** Compact heroes suit secondary tabs; "full" is the Home treatment. */
  size?: "compact" | "full"
  /** Rendered as a numbered portrait filmstrip on the right at desktop widths. */
  related?: ContentItem[]
  /** 1-based slot index shown as a large decorative number beside the title. */
  slotNumber?: number
}

/**
 * Full-bleed cinematic hero, built to the supplied design file.
 *
 * Two zones at desktop: a copy block on the left (slot number, title,
 * description, metadata, actions) and a horizontally scrollable filmstrip of
 * numbered portrait cards on the right, with the arrow controls sitting between
 * them. The strip is deliberately clipped at the viewport edge so the next card
 * is half-visible — that is what signals it scrolls.
 *
 * Backdrop artwork prefers the item's real `imageUrl` and falls back to the
 * generated poster art, so items without a supplied asset still render as
 * artwork rather than as a flat panel.
 *
 * Legibility is carried by two stacked scrims (left-to-right, then bottom-up):
 * ACCESSIBILITY.md requires contrast against the *actual rendered* background,
 * and a photographic backdrop is far less predictable than a token colour.
 */
export function CinematicHero({ content, eyebrow, size = "full", related, slotNumber }: CinematicHeroProps) {
  const stripRef = useRef<HTMLDivElement>(null)
  const hasFilmstrip = related && related.length > 0

  /** Scroll the filmstrip by roughly one card. */
  function scrollStrip(direction: -1 | 1) {
    const strip = stripRef.current
    if (!strip) return
    strip.scrollBy({ left: direction * (strip.clientWidth * 0.4), behavior: "smooth" })
  }

  return (
    <section
      className={cn(
        // `flex` so the content block stretches to the section's full height and
        // can bottom-align its children — a percentage min-height would resolve
        // against an auto-height parent and collapse.
        "relative flex overflow-hidden",
        // Bleed past the shell's padding so the artwork reaches the viewport edge
        // and butts directly against the top bar.
        "-mx-4 -mt-5 md:-mx-6 lg:-mx-8",
        size === "full" ? "min-h-[clamp(440px,56vh,620px)]" : "min-h-[clamp(320px,40vh,440px)]"
      )}
    >
      {content.imageUrl ? (
        <img
          src={content.imageUrl}
          alt=""
          aria-hidden
          className="absolute inset-0 size-full object-cover"
          style={{ objectPosition: content.imageFocus ?? "center" }}
        />
      ) : (
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage: posterBackground(content.category, `${content.id}-hero`, "landscape"),
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}

      <div aria-hidden className="scrim-left absolute inset-0" />
      {/*
        Photographic backdrops need a deeper bottom ramp than the shared
        `scrim-bottom` provides: the copy block sits over whatever the photo
        happens to put there, which can be a bright highlight.
      */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/90 via-black/45 to-transparent"
      />
      <div aria-hidden className="texture-grain absolute inset-0 opacity-[0.045]" />

      {/* Devanagari watermark — only for generated backdrops; a photograph
          already carries its own focal subject. */}
      {!content.imageUrl && (
        <span
          aria-hidden
          className="pointer-events-none absolute -right-2 bottom-0 select-none text-[clamp(6rem,18vw,14rem)] font-semibold leading-none text-white/[0.06]"
        >
          {categoryGlyph(content.category, content.id)}
        </span>
      )}

      <div className="relative flex w-full items-end gap-5 p-5 pt-16 md:p-8 md:pt-20 lg:p-10">
        {/* Copy block */}
        <div className={cn("flex min-w-0 flex-col gap-3.5", hasFilmstrip && "md:max-w-[52%] xl:max-w-[46%]")}>
          {eyebrow ? <p className="text-xs font-semibold text-accent">{eyebrow}</p> : null}

          <div className="flex items-start gap-3 md:gap-4">
            {slotNumber !== undefined && (
              <span
                aria-hidden
                className="shrink-0 font-bold leading-[0.85] tabular-nums text-white/25 text-[clamp(2.25rem,5vw,4rem)]"
              >
                {String(slotNumber).padStart(2, "0")}
              </span>
            )}
            <div className="flex min-w-0 flex-col gap-2">
              <h1
                className={cn(
                  "font-semibold text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)]",
                  size === "full"
                    ? "text-[clamp(1.75rem,4.4vw,3.25rem)] leading-[1.04] tracking-[-0.025em]"
                    : "text-[clamp(1.5rem,3.4vw,2.5rem)] leading-[1.06] tracking-[-0.02em]"
                )}
              >
                {content.title}
              </h1>
              {size === "full" ? (
                <p className="max-w-[52ch] text-sm leading-relaxed text-white/70">{content.description}</p>
              ) : null}
            </div>
          </div>

          {/* Metadata line */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-white/70">
            <span className="font-semibold text-white/95">{content.creator}</span>
            <span aria-hidden className="text-white/30">
              •
            </span>
            <span>{formatPublishedAgo(content.publishedDaysAgo)}</span>
            <Chip tone="meta">{content.category}</Chip>
          </div>

          <div className="mt-1 flex flex-wrap items-center gap-2.5">
            <Button asChild className="min-w-[124px] gap-2">
              <Link to={`/content/${content.id}`}>
                <Play className="size-4 fill-current" /> Play
              </Link>
            </Button>

            <Button
              variant="outline"
              size="icon"
              aria-label="Add to playlist"
              className="border-white/25 bg-white/[0.06] text-white backdrop-blur-md hover:border-white/45 hover:bg-white/[0.12]"
            >
              <Plus className="size-5" />
            </Button>

            <div className="text-white">
              <ShareButton contentId={content.id} title={content.title} />
            </div>
          </div>
        </div>

        {hasFilmstrip && (
          <>
            {/* Strip controls sit between the copy and the cards, per the design. */}
            <div className="mb-1 hidden shrink-0 items-center gap-2 lg:flex">
              <StripArrow label="Previous" onClick={() => scrollStrip(-1)}>
                <ChevronLeft className="size-4" />
              </StripArrow>
              <StripArrow label="Next" onClick={() => scrollStrip(1)}>
                <ChevronRight className="size-4" />
              </StripArrow>
            </div>

            {/* Filmstrip. Negative right margin lets the last card clip against the
                viewport edge, which is the affordance that it scrolls. */}
            <div
              ref={stripRef}
              className="scrollbar-none -mr-5 hidden min-w-0 flex-1 gap-3 overflow-x-auto scroll-smooth md:flex md:-mr-8 lg:-mr-10"
            >
              {related.map((item, index) => (
                <Link
                  key={item.id}
                  to={`/content/${item.id}`}
                  className="group/card flex shrink-0 flex-col gap-2"
                  aria-label={item.title}
                >
                  <span aria-hidden className="text-[11px] font-medium tabular-nums text-white/45">
                    {String((slotNumber ?? 0) + index + 1).padStart(2, "0")}
                  </span>
                  <span className="relative block h-[clamp(150px,26vh,250px)] w-[clamp(96px,10vw,142px)] overflow-hidden rounded-lg ring-1 ring-white/10 transition-all duration-200 group-hover/card:ring-white/40">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt=""
                        aria-hidden
                        className="size-full object-cover"
                        style={{ objectPosition: item.imageFocus ?? "center" }}
                      />
                    ) : (
                      <span
                        aria-hidden
                        className="block size-full"
                        style={{
                          backgroundImage: posterBackground(item.category, `${item.id}-strip`),
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                    )}
                  </span>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

/** One circular filmstrip scroll control. */
function StripArrow({
  label,
  onClick,
  children,
}: {
  label: string
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="flex size-9 items-center justify-center rounded-full border border-white/25 text-white/85 transition-colors hover:border-white/50 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      {children}
    </button>
  )
}
