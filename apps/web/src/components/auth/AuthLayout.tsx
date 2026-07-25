import type { ReactNode } from "react"

import { BackgroundBloom } from "@/components/glass/BackgroundBloom"
import { GlassPanel } from "@/components/glass/GlassPanel"
import { posterBackground } from "@/lib/poster-art"

export interface AuthLayoutProps {
  children: ReactNode
  /**
   * Onboarding steps need a wider column than the credential forms. The Auth Area
   * is still a single centred column either way, per INFORMATION_ARCHITECTURE.md.
   */
  width?: "narrow" | "wide"
  /**
   * `false` drops the glass card, for screens that are their own composition
   * (Splash) rather than a form.
   */
  panelled?: boolean
}

/**
 * Auth Area shell — no top bar, no bottom/side nav, per
 * docs/01_ARCHITECTURE/INFORMATION_ARCHITECTURE.md ("Auth Area has no persistent
 * chrome"). A single centred column at every breakpoint.
 *
 * The generated artwork backdrop and glass card bring the Auth Area onto the same
 * surface system as the rest of apps/web (SURFACE_SYSTEM.md). Without it these
 * screens read as a different product from the Main App — the form floated on a
 * near-empty field while every other surface carried depth and artwork.
 */
export function AuthLayout({ children, width = "narrow", panelled = true }: AuthLayoutProps) {
  return (
    <div className="relative flex min-h-svh items-center justify-center overflow-hidden p-4">
      <BackgroundBloom />

      {/*
        Cinematic backdrop. Dimmed enough that the form's own contrast is
        unaffected (ACCESSIBILITY.md measures text against the actual rendered
        background) but not so far that the artwork stops reading as artwork.
      */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage: posterBackground("Aarti & Rituals", "auth-backdrop", "landscape"),
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div aria-hidden className="absolute inset-0 bg-background/55" />
      <div aria-hidden className="texture-grain absolute inset-0 opacity-[0.04]" />

      <div className={`relative w-full ${width === "wide" ? "max-w-lg" : "max-w-sm"}`}>
        {panelled ? (
          <GlassPanel tier="raised" className="p-6 md:p-8">
            {children}
          </GlassPanel>
        ) : (
          children
        )}
      </div>
    </div>
  )
}
