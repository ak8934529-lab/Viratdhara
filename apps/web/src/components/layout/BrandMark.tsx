import { cn } from "@dhara/utils"

export interface BrandMarkProps {
  size?: "sm" | "default" | "lg"
  className?: string
}

/**
 * "VIRATDHARA" wordmark — apps/web's own implementation, not packages/mobile's
 * MobileBrandMark.
 *
 * The supplied design file replaces the "D" with a circular emblem, so the mark
 * reads VIRAT◉HARA. That emblem is vector art in the design file rather than a
 * raster asset, so it is reconstructed here as an inline SVG — a gold ring with a
 * terracotta core, sized to the cap height of the surrounding letters. It is a
 * close reconstruction, not the exported original: swap in the real SVG when the
 * brand assets land.
 *
 * Letters are white with the emblem carrying the brand colour, per the design.
 */
export function BrandMark({ size = "default", className }: BrandMarkProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-semibold uppercase leading-none tracking-[0.2em] text-white",
        size === "sm" && "text-xs",
        size === "default" && "text-lg",
        size === "lg" && "text-2xl",
        className
      )}
    >
      {/* The emblem carries no text, so the visible letters alone would be
          announced as "Virathara". Hide them and name the mark explicitly. */}
      <span className="sr-only">Viratdhara</span>
      <span aria-hidden className="inline-flex items-center">
        Virat
        <BrandEmblem />
        hara
      </span>
    </span>
  )
}

/** The circular mark standing in for the "D". Scales with the current font size. */
function BrandEmblem() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      focusable="false"
      /* Nudged up slightly so the ring sits on the letters' optical centre line. */
      className="mx-[0.06em] size-[0.95em] translate-y-[-0.045em]"
    >
      <circle cx="12" cy="12" r="10.5" fill="none" stroke="var(--color-accent)" strokeWidth="2" />
      <circle cx="12" cy="12" r="5" fill="var(--color-primary)" />
    </svg>
  )
}
