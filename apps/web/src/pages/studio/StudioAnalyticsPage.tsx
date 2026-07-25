import { CheckCircle2, Eye, PlayCircle, Share2, Upload } from "lucide-react"

import { GlassPanel } from "@/components/glass/GlassPanel"
import { EmptyState } from "@/components/content/EmptyState"
import { PageHeader, StatTile } from "@/components/ui/StatTile"
import { STUDIO_ANALYTICS, STUDIO_CONTENT } from "@/lib/mock-creator"

/**
 * Creator Studio → Analytics (`/creator-studio/analytics`).
 *
 * Deliberately plain count tiles. CREATORSTUDIO_SPEC.md derives these from four
 * existing events — `content_viewed`, `content_played`, `content_completed`,
 * `content_shared` — and its Future Scope states "Advanced analytics (trends
 * over time, audience demographics) are not specified". COMPONENTS.md adds that
 * a trend component is "not yet confirmed as needed". So there is deliberately
 * NO chart, sparkline, trend arrow, percentage delta, or time-range selector
 * here — every one of those would be invented UI.
 *
 * NOTE: the `completions` tile has weaker backing than the other three —
 * SPEC.md and EVENTS.md list four events, but README.md and API.md describe
 * only "views, plays, shares". Flagged rather than silently resolved.
 */
export function StudioAnalyticsPage() {
  /**
   * EDGE_CASES.md: a Creator's first visit with no Content at all gets an empty
   * state prompting creation — "never a blank/broken analytics screen".
   */
  if (STUDIO_CONTENT.length === 0) {
    return (
      <EmptyState
        icon={Upload}
        title="No analytics yet"
        description="Publish your first piece of content and its numbers will appear here."
      />
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {/*
        EDGE_CASES.md: zero activity shows zero counts explicitly, never an
        empty/missing state — "zero is a valid, real value here, distinct from
        'no Content exists'."
      */}
      <PageHeader title="Analytics" subtitle="Totals across your published content. Read-only." />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatTile icon={Eye} label="Views" value={STUDIO_ANALYTICS.views.toLocaleString()} tone="accent" />
        <StatTile icon={PlayCircle} label="Plays" value={STUDIO_ANALYTICS.plays.toLocaleString()} />
        <StatTile icon={CheckCircle2} label="Completions" value={STUDIO_ANALYTICS.completions.toLocaleString()} />
        <StatTile icon={Share2} label="Shares" value={STUDIO_ANALYTICS.shares.toLocaleString()} />
      </div>

      <GlassPanel tier="base" className="flex flex-col gap-1 p-5">
        <p className="text-sm font-semibold text-foreground">Per-item totals</p>
        <ul className="mt-2 flex flex-col divide-y divide-white/[0.06]">
          {STUDIO_CONTENT.filter((row) => row.state === "published").map((row) => (
            <li key={row.content.id} className="flex items-center justify-between gap-3 py-3">
              <span className="min-w-0 truncate text-sm text-foreground">{row.content.title}</span>
              <span className="shrink-0 text-xs font-semibold tabular-nums text-muted-foreground">
                {row.content.views.toLocaleString()} views
              </span>
            </li>
          ))}
        </ul>
      </GlassPanel>
    </div>
  )
}
