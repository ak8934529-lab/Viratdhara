import { Upload } from "lucide-react"
import { useState } from "react"

import { Badge } from "@dhara/ui/badge"
import { Button } from "@dhara/ui/button"
import { cn } from "@dhara/utils"
import { CATEGORY_GRADIENT } from "@/components/content/category-visuals"
import { EmptyState } from "@/components/content/EmptyState"
import { GlassPanel } from "@/components/glass/GlassPanel"
import { STUDIO_CONTENT, type ContentLifecycle } from "@/lib/mock-creator"
import { formatDuration } from "@/lib/mock-content"

/**
 * Creator Studio → Content management (`/creator-studio/content`).
 *
 * A list of rows (COMPONENTS.md names `MobileListItem` for these), taking
 * UI.md's Wide-breakpoint allowance for "a denser, more table-like row layout
 * than the consumer-facing card grids … still using SURFACE_SYSTEM.md's
 * glass/depth surface tiers".
 *
 * All four lifecycle states are rendered, per STATE_REGISTRY.md's Content
 * machine. Two hard rules from the specs:
 * - `removed_by_moderation` rows are READ-ONLY and visually distinct from the
 *   Creator's own `removed_by_creator` items. SPEC.md: "visible to the Creator
 *   as such (not silently disappeared) but cannot be un-removed."
 * - This feature never triggers `published → removed_by_moderation` — that
 *   transition belongs exclusively to an Administrator.
 *
 * FLAGGED: no document specifies this list's columns. Title / state / type /
 * category / duration below is derived from what DATABASE.md says this feature
 * writes. Sortable headers, bulk select, and pagination are NOT specified and
 * are deliberately absent.
 */
const STATE_LABEL: Record<ContentLifecycle, string> = {
  draft: "Draft",
  published: "Published",
  removed_by_creator: "Removed by you",
  removed_by_moderation: "Removed by moderation",
}

function StateBadge({ state }: { state: ContentLifecycle }) {
  if (state === "published") return <Badge variant="gold">{STATE_LABEL[state]}</Badge>
  if (state === "draft") return <Badge variant="secondary">{STATE_LABEL[state]}</Badge>
  // Moderation removal reads as a warning; the Creator's own removal is neutral.
  if (state === "removed_by_moderation") return <Badge variant="live">{STATE_LABEL[state]}</Badge>
  return <Badge variant="outline">{STATE_LABEL[state]}</Badge>
}

export function StudioContentPage() {
  const [rows, setRows] = useState(STUDIO_CONTENT)

  /**
   * The two transitions this feature owns, per STATES.md:
   *   draft ──(Creator publishes, fires creator_content_published)──> published
   *   published ──(Creator removes)──> removed_by_creator
   *
   * Hard constraint: this feature NEVER triggers published → removed_by_moderation
   * (Administrator-only), and no Creator-facing action moves Content out of
   * `removed_by_moderation`. Both guarded below.
   */
  function transition(id: string, next: ContentLifecycle) {
    setRows((current) =>
      current.map((row) => {
        if (row.content.id !== id) return row
        if (row.state === "removed_by_moderation") return row // irreversible from here
        if (next === "removed_by_moderation") return row // Administrator-only
        return { ...row, state: next }
      })
    )
  }

  if (rows.length === 0) {
    return (
      <EmptyState
        icon={Upload}
        title="No content yet"
        description="Your published and draft content will be listed here."
        action={
          <Button size="sm" variant="gold" className="mt-1">
            Create your first content
          </Button>
        }
      />
    )
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-xl font-semibold leading-tight text-foreground">Content</h1>
        {/*
          FLAGGED: no create/upload route exists in URL_STRUCTURE.md — Creator
          Studio defines only 3 routes. SPEC.md requires the behaviour ("A
          Creator creates Content in `draft` state") and COMPONENTS.md says
          "Content creation is a form", but no screen is specified. This button
          is therefore an entry point with nowhere documented to go.
        */}
        <Button size="sm" variant="gold" className="gap-1.5">
          <Upload className="size-4" /> Upload
        </Button>
      </div>

      <GlassPanel tier="base" className="divide-y divide-white/5 p-0">
        {rows.map(({ content, state }) => {
          const isModerated = state === "removed_by_moderation"

          return (
            <div
              key={content.id}
              className={cn(
                "flex items-center gap-3 p-3 md:gap-4 md:p-4",
                // Moderated rows read as inert, reinforcing their read-only status.
                isModerated && "opacity-70"
              )}
            >
              <span
                className={cn(
                  "hidden aspect-video w-24 shrink-0 rounded-lg bg-gradient-to-br md:block",
                  CATEGORY_GRADIENT[content.category]
                )}
                aria-hidden
              />

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">{content.title}</p>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                  {content.type === "audio" ? "Audio" : "Video"} · {content.category} ·{" "}
                  {formatDuration(content.durationSeconds)}
                </p>
                <div className="mt-1.5 md:hidden">
                  <StateBadge state={state} />
                </div>
              </div>

              <div className="hidden shrink-0 md:block">
                <StateBadge state={state} />
              </div>

              {/* Actions per lifecycle state. Moderated rows get none — the
                  Creator has no action available to reverse that transition. */}
              <div className="flex shrink-0 items-center gap-1.5">
                {state === "draft" ? (
                  <Button size="sm" variant="gold" onClick={() => transition(content.id, "published")}>
                    Publish
                  </Button>
                ) : null}
                {state === "published" ? (
                  <>
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => transition(content.id, "removed_by_creator")}
                    >
                      Remove
                    </Button>
                  </>
                ) : null}
                {/* The Creator's own removal is reversible by re-publishing;
                    moderation removal is not, and offers no action at all. */}
                {state === "removed_by_creator" ? (
                  <Button size="sm" variant="outline" onClick={() => transition(content.id, "published")}>
                    Republish
                  </Button>
                ) : null}
                {isModerated ? (
                  <span className="text-[11px] font-medium text-muted-foreground">Read-only</span>
                ) : null}
              </div>
            </div>
          )
        })}
      </GlassPanel>
    </div>
  )
}
