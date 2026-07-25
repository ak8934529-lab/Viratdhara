import { useState } from "react"

import { Switch } from "@dhara/ui/switch"
import { GlassPanel } from "@/components/glass/GlassPanel"
import { SettingsRow } from "@/components/settings/SettingsRow"
import { PageHeader } from "@/components/ui/StatTile"

/**
 * Notifications (`/settings/notifications`) — a pushed screen.
 *
 * Exactly 3 fixed V1 categories, resolved in Commit 18 and recorded in
 * UserSettings/SPEC.md, EDGE_CASES.md, and VALIDATIONS.md
 * (`notification_toggle_valid`). Each is independently persisted per Account and
 * all three default to enabled.
 *
 * Deliberately NOT built, because none is specified: a fourth category,
 * per-Creator granularity, channel selection (push / email / in-app), quiet
 * hours, or a master on/off switch.
 */
const NOTIFICATION_CATEGORIES = [
  {
    id: "followed_creators",
    title: "New content from followed creators",
    subtitle: "When a creator you follow publishes something",
  },
  {
    id: "engagement",
    title: "Engagement on your activity",
    subtitle: "Replies and interactions related to your activity",
  },
  {
    id: "announcements",
    title: "Product & platform announcements",
    subtitle: "Updates from Viratdhara, not tied to specific content",
  },
]

export function NotificationsPage() {
  // All three default to enabled, per SPEC.md.
  const [enabled, setEnabled] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(NOTIFICATION_CATEGORIES.map((category) => [category.id, true]))
  )

  return (
    <div className="mx-auto flex max-w-[720px] flex-col gap-5">
      <PageHeader title="Notifications" backTo="/settings" backLabel="Back to settings" />

      <GlassPanel tier="base" className="divide-y divide-white/5 p-0">
        {NOTIFICATION_CATEGORIES.map((category) => (
          <SettingsRow
            key={category.id}
            title={category.title}
            subtitle={category.subtitle}
            trailing={
              <Switch
                checked={enabled[category.id]}
                onCheckedChange={(checked) =>
                  setEnabled((current) => ({ ...current, [category.id]: checked }))
                }
                aria-label={category.title}
              />
            }
          />
        ))}
      </GlassPanel>
    </div>
  )
}
