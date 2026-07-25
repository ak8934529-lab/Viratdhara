import { ArrowUpRight, ExternalLink, Eye, ListVideo, Share2, Upload } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { Link } from "react-router-dom"

import { Button } from "@dhara/ui/button"
import { EmptyState } from "@/components/content/EmptyState"
import { GlassPanel } from "@/components/glass/GlassPanel"
import { CURRENT_CREATOR, STUDIO_ANALYTICS, STUDIO_CONTENT, creatorSlug } from "@/lib/mock-creator"

/**
 * Creator Studio → home (`/creator-studio`).
 *
 * FLAGGED — this screen's contents are almost entirely undefined.
 * CreatorStudio/UI.md gives it a route and nothing else: no section list, no
 * widget list, no summary tiles, no "recent content" list. The ONLY spec-backed
 * state is the zero-content case (EDGE_CASES.md: "A Creator's first visit to
 * Studio home/analytics → `MobileEmptyState` prompting to create first Content
 * — never a blank/broken analytics screen").
 *
 * The populated composition below (summary tiles + recent content + quick
 * links) is therefore assembled by inference from the Analytics and Content
 * management specs, per the user's decision to extrapolate the design language
 * where designs are absent. It is not specified, and is flagged as such.
 */
function SummaryTile({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <GlassPanel tier="base" className="flex items-center gap-3 p-4">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
        <Icon className="size-5" />
      </span>
      <div className="min-w-0">
        <p className="text-lg font-semibold tabular-nums leading-tight text-foreground">{value}</p>
        <p className="truncate text-xs text-muted-foreground">{label}</p>
      </div>
    </GlassPanel>
  )
}

export function StudioHomePage() {
  const published = STUDIO_CONTENT.filter((row) => row.state === "published")
  const drafts = STUDIO_CONTENT.filter((row) => row.state === "draft")

  if (STUDIO_CONTENT.length === 0) {
    return (
      <EmptyState
        icon={Upload}
        title="Let's publish your first content"
        description="Once you publish, your content and its performance will show up here."
        action={
          <Button size="sm" variant="gold" className="mt-1">
            Create content
          </Button>
        }
      />
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold leading-tight text-foreground">
            {CURRENT_CREATOR.displayName}
          </h1>
          <p className="mt-1 text-xs text-muted-foreground">
            {published.length} published · {drafts.length} draft
          </p>
        </div>

        {/* Preview link to the public-facing counterpart, per CreatorProfile/UI.md
            ("reached from … Creator Studio's own preview link"). */}
        <Button size="sm" variant="outline" asChild className="gap-1.5">
          <Link to={`/creator/${creatorSlug(CURRENT_CREATOR.displayName)}`}>
            <ExternalLink className="size-4" /> View public profile
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <SummaryTile icon={Eye} label="Total views" value={STUDIO_ANALYTICS.views.toLocaleString()} />
        <SummaryTile icon={Share2} label="Total shares" value={STUDIO_ANALYTICS.shares.toLocaleString()} />
        <SummaryTile icon={ListVideo} label="Published items" value={String(published.length)} />
      </div>

      <GlassPanel tier="base" className="flex flex-col gap-3 p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-foreground">Recent content</p>
          <Link
            to="/creator-studio/content"
            className="flex items-center gap-1 text-xs font-semibold text-accent"
          >
            Manage <ArrowUpRight className="size-3.5" />
          </Link>
        </div>

        <ul className="flex flex-col divide-y divide-white/5">
          {STUDIO_CONTENT.slice(0, 4).map(({ content }) => (
            <li key={content.id} className="flex items-center justify-between gap-3 py-2.5">
              <span className="min-w-0 truncate text-sm text-foreground">{content.title}</span>
              <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                {content.views.toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      </GlassPanel>
    </div>
  )
}
