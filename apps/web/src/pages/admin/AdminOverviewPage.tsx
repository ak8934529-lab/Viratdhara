import { Eye, FileVideo, ShieldAlert, ShieldOff, UserRound } from "lucide-react"
import { Link } from "react-router-dom"

import { GlassPanel } from "@/components/glass/GlassPanel"
import { PageHeader, StatTile } from "@/components/ui/StatTile"
import { ADMIN_ANALYTICS, ADMIN_CATEGORIES } from "@/lib/mock-admin"
import { posterBackground } from "@/lib/poster-art"

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
export function AdminOverviewPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Platform overview" subtitle="Totals across all creators and content. Read-only." />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-5">
        <StatTile
          icon={Eye}
          label="Total views"
          value={ADMIN_ANALYTICS.totalViews.toLocaleString()}
          tone="accent"
        />
        <StatTile icon={FileVideo} label="Content items" value={String(ADMIN_ANALYTICS.totalContent)} />
        <StatTile icon={UserRound} label="Creators" value={String(ADMIN_ANALYTICS.totalCreators)} />
        <StatTile
          icon={ShieldAlert}
          label="Open reports"
          value={String(ADMIN_ANALYTICS.openReports)}
          tone={ADMIN_ANALYTICS.openReports > 0 ? "warn" : "default"}
        />
        <StatTile
          icon={ShieldOff}
          label="Moderated"
          value={String(ADMIN_ANALYTICS.moderatedContent)}
          tone={ADMIN_ANALYTICS.moderatedContent > 0 ? "warn" : "default"}
        />
      </div>

      <GlassPanel tier="base" className="flex flex-col gap-1 p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-foreground">Content by category</p>
          <Link
            to="/admin/categories"
            className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-muted-foreground transition-colors hover:border-white/20 hover:text-foreground"
          >
            Manage
          </Link>
        </div>

        <ul className="mt-2 flex flex-col divide-y divide-white/[0.06]">
          {ADMIN_CATEGORIES.map((row) => (
            <li key={row.category} className="flex items-center gap-3 py-3">
              <span
                aria-hidden
                className="size-9 shrink-0 rounded-lg ring-1 ring-white/10"
                style={{
                  backgroundImage: posterBackground(row.category, `${row.category}-swatch`, "square"),
                  backgroundSize: "cover",
                }}
              />
              <span className="min-w-0 flex-1 truncate text-sm text-foreground">{row.category}</span>
              <span className="shrink-0 text-xs font-semibold tabular-nums text-muted-foreground">
                {row.itemCount} items · {row.totalViews.toLocaleString()} views
              </span>
            </li>
          ))}
        </ul>
      </GlassPanel>
    </div>
  )
}
