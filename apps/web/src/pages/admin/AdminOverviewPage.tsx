import { Eye, FileVideo, ShieldAlert, ShieldOff, UserRound } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { Link } from "react-router-dom"

import { GlassPanel } from "@/components/glass/GlassPanel"
import { ADMIN_ANALYTICS, ADMIN_CATEGORIES } from "@/lib/mock-admin"

/**
 * Administration → Overview (`/admin`). Platform-wide analytics.
 *
 * ⚠️ BEYOND SPECIFICATION — see lib/mock-admin.ts. No admin metric set is
 * defined anywhere; these tiles mirror Creator Studio's count-only approach
 * (unscoped rather than per-Creator) because that is the one documented
 * precedent for analytics in this repository.
 *
 * Deliberately no charts, trends, or time-range selector — Creator Studio's spec
 * rules those out as unspecified, and there is no admin spec to override it.
 */
function StatTile({
  icon: Icon,
  label,
  value,
  tone = "default",
}: {
  icon: LucideIcon
  label: string
  value: string
  tone?: "default" | "warning"
}) {
  return (
    <GlassPanel tier="base" className="flex flex-col gap-2 p-4">
      <span
        className={
          tone === "warning"
            ? "flex size-9 items-center justify-center rounded-full bg-destructive/20 text-destructive"
            : "flex size-9 items-center justify-center rounded-full bg-primary/20 text-primary"
        }
      >
        <Icon className="size-4" />
      </span>
      <p className="text-2xl font-semibold tabular-nums text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </GlassPanel>
  )
}

export function AdminOverviewPage() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-xl font-semibold leading-tight text-foreground">Platform overview</h1>
        <p className="mt-1 text-xs text-muted-foreground">
          Totals across all creators and content. Read-only.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-5">
        <StatTile icon={Eye} label="Total views" value={ADMIN_ANALYTICS.totalViews.toLocaleString()} />
        <StatTile icon={FileVideo} label="Content items" value={String(ADMIN_ANALYTICS.totalContent)} />
        <StatTile icon={UserRound} label="Creators" value={String(ADMIN_ANALYTICS.totalCreators)} />
        <StatTile
          icon={ShieldAlert}
          label="Open reports"
          value={String(ADMIN_ANALYTICS.openReports)}
          tone={ADMIN_ANALYTICS.openReports > 0 ? "warning" : "default"}
        />
        <StatTile
          icon={ShieldOff}
          label="Moderated"
          value={String(ADMIN_ANALYTICS.moderatedContent)}
          tone={ADMIN_ANALYTICS.moderatedContent > 0 ? "warning" : "default"}
        />
      </div>

      <GlassPanel tier="base" className="flex flex-col gap-3 p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-foreground">Content by category</p>
          <Link to="/admin/categories" className="text-xs font-semibold text-accent">
            Manage
          </Link>
        </div>

        <ul className="flex flex-col divide-y divide-white/5">
          {ADMIN_CATEGORIES.map((row) => (
            <li key={row.category} className="flex items-center justify-between gap-3 py-2.5">
              <span className="min-w-0 truncate text-sm text-foreground">{row.category}</span>
              <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                {row.itemCount} items · {row.totalViews.toLocaleString()} views
              </span>
            </li>
          ))}
        </ul>
      </GlassPanel>
    </div>
  )
}
