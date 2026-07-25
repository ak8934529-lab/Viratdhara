import { SkipForward } from "lucide-react"
import { useEffect, useState } from "react"

import { Badge } from "@dhara/ui/badge"
import { Button } from "@dhara/ui/button"

/**
 * Pre-roll ad interstitial. The new container component
 * Advertisements/COMPONENTS.md calls for ("A new ad-interstitial container (not
 * yet built/registered)"), composed from existing primitives — `Badge` for the
 * label, `Button` for the skip control — rather than a new package. Registered
 * in COMPONENT_REGISTRY.md when this lands.
 *
 * Spec'd behaviour:
 * - Renders in the same area a Video Player session would occupy, immediately
 *   before playback. At Wide it "still occupies the primary content area, not a
 *   secondary panel — a full interstitial regardless of viewport" (UI.md).
 * - A visible "Ad" label and a skip control are present AT ALL TIMES the ad is
 *   shown (UI.md). Hard constraint: "No ad renders without a visible 'Ad' label
 *   — never disguised as Content."
 * - The skip control becomes *usable* after 5 seconds (SPEC.md, EDGE_CASES.md
 *   resolved default — explicitly tunable, not fixed law).
 *
 * FLAGGED: the countdown *visual* is explicitly undefined. UI.md still reads
 * "(countdown or immediate, per unconfirmed EDGE_CASES.md rule)" and its Future
 * Scope says "Exact skip-timing UI is pending EDGE_CASES.md's open decision".
 * EDGE_CASES.md v1.1.0 resolved the 5s timing but not the rendering. The
 * "Skip in Ns" treatment below is therefore an inference; what is spec-backed is
 * only that the control is visible from t=0 and usable at 5s.
 *
 * Also undefined and therefore absent: ad media format/aspect, advertiser name,
 * and any CTA/click target (`ad_clicked` exists as an event with no described UI).
 */
const SKIP_AVAILABLE_AFTER_SECONDS = 5

export interface AdInterstitialProps {
  /** Called when the viewer skips — the Video Player session then begins. */
  onSkip: () => void
}

export function AdInterstitial({ onSkip }: AdInterstitialProps) {
  const [secondsLeft, setSecondsLeft] = useState(SKIP_AVAILABLE_AFTER_SECONDS)

  useEffect(() => {
    if (secondsLeft <= 0) return
    const timer = window.setTimeout(() => setSecondsLeft((value) => value - 1), 1000)
    return () => window.clearTimeout(timer)
  }, [secondsLeft])

  const canSkip = secondsLeft <= 0

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-neutral-900">
      {/* Placeholder ad surface — no ad media format is specified. */}
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-sm text-neutral-400">Advertisement</p>
      </div>

      {/* Required at all times the ad is shown, never disguised as Content. */}
      <div className="absolute left-3 top-3">
        <Badge variant="live">Ad</Badge>
      </div>

      {/* Skip control — visible from t=0, usable from 5s. */}
      <div className="absolute bottom-3 right-3">
        <Button size="sm" variant={canSkip ? "gold" : "outline"} disabled={!canSkip} onClick={onSkip} className="gap-1.5">
          {canSkip ? (
            <>
              Skip ad <SkipForward className="size-4" />
            </>
          ) : (
            `Skip in ${secondsLeft}s`
          )}
        </Button>
      </div>
    </div>
  )
}
