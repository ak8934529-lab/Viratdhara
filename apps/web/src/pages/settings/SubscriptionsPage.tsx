import { ArrowLeft, CreditCard } from "lucide-react"
import { Link } from "react-router-dom"

import { Button } from "@dhara/ui/button"
import { EmptyState } from "@/components/content/EmptyState"

/**
 * Subscriptions (`/settings/subscriptions`) — a pushed screen that deliberately
 * has no subscription UI.
 *
 * This is NOT an oversight or an unfinished screen. UserSettings/SPEC.md:
 * "Deliberately deferred in full (Commit 18, user decision) — no tier structure,
 * pricing, or even a placeholder is specified. … do not build a Buy/Upgrade flow
 * against an invented tier structure."
 *
 * EDGE_CASES.md reinforces it: "Deliberately deferred … not resolved even with a
 * placeholder. Do not build a Subscriptions UI against an assumed tier
 * structure," with the Constraint that "the Subscriptions gap may not be resolved
 * by an implementation guess — it is deferred by explicit choice, not oversight."
 *
 * STATES.md adds that subscription status values are unconfirmed and must not be
 * introduced "as if they were final".
 *
 * So: no tier cards, no pricing table, no plan comparison, no billing history,
 * no payment-method row, and no upgrade CTA. Note this contradicts
 * UserSettings/COMPONENTS.md's lone "`Button` | Subscription upgrade CTA" entry —
 * that row conflicts with the deferral recorded in SPEC.md/EDGE_CASES.md, which
 * is both later and more specific, so the deferral wins. Flagged, not silently
 * resolved.
 */
export function SubscriptionsPage() {
  return (
    <div className="mx-auto flex max-w-[720px] flex-col gap-5">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon-sm" asChild aria-label="Back to settings">
          <Link to="/settings">
            <ArrowLeft className="size-5" />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold leading-tight text-foreground">Subscriptions</h1>
      </div>

      <EmptyState
        icon={CreditCard}
        title="Not available yet"
        description="Subscriptions aren't part of this release. This screen will fill in once plans are finalised."
      />
    </div>
  )
}
