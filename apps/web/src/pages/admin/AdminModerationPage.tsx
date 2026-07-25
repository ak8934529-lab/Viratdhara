import { ShieldCheck } from "lucide-react"
import { useState } from "react"

import { Badge } from "@dhara/ui/badge"
import { Button } from "@dhara/ui/button"
import { cn } from "@dhara/utils"
import { CATEGORY_GRADIENT } from "@/components/content/category-visuals"
import { EmptyState } from "@/components/content/EmptyState"
import { GlassPanel } from "@/components/glass/GlassPanel"
import { formatDuration } from "@/lib/mock-content"
import { ADMIN_MODERATION_QUEUE } from "@/lib/mock-admin"

/**
 * Administration → Moderation (`/admin/moderation`).
 *
 * This screen is the ONLY place `published → removed_by_moderation` may be
 * triggered. That much IS documented (STATE_REGISTRY.md; CreatorStudio/STATES.md:
 * "This feature never triggers published → removed_by_moderation — that
 * transition belongs exclusively to an Administrator"), and it is the reason an
 * admin surface has to exist at all.
 *
 * Two documented consequences, both honoured here:
 * - Moderation removal is irreversible from the Creator side — a moderated item
 *   shows in Creator Studio as read-only with no action available.
 * - Moderated Content stays visible to its Creator rather than silently
 *   disappearing.
 *
 * ⚠️ Everything else is BEYOND SPECIFICATION — see lib/mock-admin.ts. In
 * particular, the report/flag concept has no entity in DOMAIN_MODEL.md or
 * ENTITY_REGISTRY.md, so report counts and reasons here are invented. Whether an
 * Administrator can *reinstate* moderated Content is likewise undefined; this
 * screen allows it, which is a guess, not a documented rule.
 */
export function AdminModerationPage() {
  const [rows, setRows] = useState(ADMIN_MODERATION_QUEUE)

  function moderate(id: string) {
    setRows((current) =>
      current.map((row) =>
        row.content.id === id ? { ...row, state: "removed_by_moderation" as const } : row
      )
    )
  }

  /** INVENTED: no document says whether reinstatement is permitted. */
  function reinstate(id: string) {
    setRows((current) =>
      current.map((row) => (row.content.id === id ? { ...row, state: "published" as const } : row))
    )
  }

  const flagged = rows.filter((row) => row.reportCount > 0 && row.state === "published")

  if (rows.length === 0) {
    return <EmptyState icon={ShieldCheck} title="Nothing to review" description="The moderation queue is empty." />
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-xl font-semibold leading-tight text-foreground">Moderation</h1>
        <p className="mt-1 text-xs text-muted-foreground">
          {flagged.length > 0
            ? `${flagged.length} item${flagged.length === 1 ? "" : "s"} with open reports.`
            : "No open reports."}{" "}
          Removing content here is not reversible by its creator.
        </p>
      </div>

      <GlassPanel tier="base" className="divide-y divide-white/5 p-0">
        {rows.map(({ content, state, reportCount, reportReason }) => {
          const isModerated = state === "removed_by_moderation"

          return (
            <div key={content.id} className={cn("flex items-center gap-3 p-3 md:gap-4 md:p-4", isModerated && "opacity-70")}>
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
                  {content.creator} · {content.category} · {formatDuration(content.durationSeconds)}
                </p>
                <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                  {isModerated ? <Badge variant="live">Removed by moderation</Badge> : null}
                  {reportCount > 0 && !isModerated ? (
                    <Badge variant="outline">
                      {reportCount} report{reportCount === 1 ? "" : "s"}
                    </Badge>
                  ) : null}
                  {reportReason && !isModerated ? (
                    <span className="text-[11px] text-muted-foreground">{reportReason}</span>
                  ) : null}
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-1.5">
                {isModerated ? (
                  <Button size="sm" variant="outline" onClick={() => reinstate(content.id)}>
                    Reinstate
                  </Button>
                ) : (
                  <Button size="sm" variant="destructive" onClick={() => moderate(content.id)}>
                    Remove
                  </Button>
                )}
              </div>
            </div>
          )
        })}
      </GlassPanel>
    </div>
  )
}
