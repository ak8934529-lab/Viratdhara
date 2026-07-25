import { DownloadCloud, Trash2 } from "lucide-react"
import { useState } from "react"

import { Button } from "@dhara/ui/button"
import { EmptyState } from "@/components/content/EmptyState"
import { GlassPanel } from "@/components/glass/GlassPanel"
import { SettingsRow } from "@/components/settings/SettingsRow"
import { PageHeader } from "@/components/ui/StatTile"
import { MOCK_CONTENT, formatDuration } from "@/lib/mock-content"

/**
 * Downloads (`/settings/downloads`) — a pushed screen listing downloaded Content
 * with a per-item remove action, per UserSettings/SPEC.md.
 *
 * Deliberately NO storage-usage indicator, meter, quota warning, or
 * "X of Y GB used" label: SPEC.md resolved (Commit 18) that "no storage limit is
 * enforced in V1 — no cap on count or size. No storage-usage indicator is
 * required since there's no limit to show progress against."
 *
 * FLAGGED: the remove control's form is unspecified (trailing icon button vs.
 * swipe vs. overflow menu), and no confirmation-dialog pattern exists yet
 * (UX_PATTERNS.md Future Scope) — so removal here is immediate, unconfirmed.
 * Row metadata (title + duration) is likewise a minimal inference.
 *
 * SPEC.md scope note: this feature owns the management UI for downloads, not the
 * offline-storage/sync mechanism — nothing is actually downloaded here.
 */
export function DownloadsPage() {
  const [items, setItems] = useState(() => MOCK_CONTENT.slice(0, 4))

  return (
    <div className="mx-auto flex max-w-[720px] flex-col gap-5">
      <PageHeader title="Downloads" backTo="/settings" backLabel="Back to settings" />

      {items.length > 0 ? (
        <GlassPanel tier="base" className="divide-y divide-white/5 p-0">
          {items.map((item) => (
            <SettingsRow
              key={item.id}
              title={item.title}
              subtitle={`${item.creator} · ${formatDuration(item.durationSeconds)}`}
              trailing={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label={`Remove ${item.title} from downloads`}
                  onClick={() => setItems((current) => current.filter((entry) => entry.id !== item.id))}
                >
                  <Trash2 className="size-4" />
                </Button>
              }
            />
          ))}
        </GlassPanel>
      ) : (
        <EmptyState
          icon={DownloadCloud}
          title="No downloads yet"
          description="Content you download for offline listening will appear here."
        />
      )}
    </div>
  )
}
