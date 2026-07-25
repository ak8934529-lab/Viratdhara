import { ArrowLeft, Bell, CreditCard, Download, LayoutDashboard, LogOut, ShieldAlert, User } from "lucide-react"
import { Link } from "react-router-dom"

import { Button } from "@dhara/ui/button"
import { Separator } from "@dhara/ui/separator"
import { GlassPanel } from "@/components/glass/GlassPanel"
import { SettingsRow } from "@/components/settings/SettingsRow"
import { useAuth } from "@/lib/auth-context"
import { CURRENT_CREATOR, creatorSlug } from "@/lib/mock-creator"

/**
 * Settings hub (`/settings`) — reached from the top bar avatar, per
 * NAVIGATION_MODEL.md's trailing slot. Every sub-screen is a pushed screen, and
 * UI.md's constraint is that "no sub-screen is reachable except through the
 * Settings hub".
 *
 * Four rows, per UserSettings/TEST_CASES.md case 1: Account, Notifications,
 * Downloads, Subscriptions.
 *
 * FLAGGED — the Account row has no route. URL_STRUCTURE.md defines only
 * `/settings`, `/settings/subscriptions`, `/settings/downloads`, and
 * `/settings/notifications`; there is no `/settings/account`. Rather than invent
 * one, the Account info is rendered inline here as read-only display, which also
 * matches SPEC.md ("Displays Account info (display name, email — read-only
 * here)"). Credential changes belong to Authentication, not this feature.
 */
export function SettingsPage() {
  const { logout } = useAuth()

  return (
    <div className="mx-auto flex max-w-[720px] flex-col gap-5">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon-sm" asChild aria-label="Back">
          <Link to="/">
            <ArrowLeft className="size-5" />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold leading-tight text-foreground">Settings</h1>
      </div>

      {/* Account — read-only display. SPEC.md Constraints: "No credential field
          (password, email) is editable directly in this feature's screens." */}
      <GlassPanel tier="base" className="p-0">
        <SettingsRow icon={User} title={CURRENT_CREATOR.displayName} subtitle={CURRENT_CREATOR.email} />
        <Separator />
        <div className="px-3 pb-3 md:px-4 md:pb-4">
          <p className="text-[11px] text-muted-foreground">
            Email and password changes are handled during sign-in.
          </p>
        </div>
      </GlassPanel>

      <GlassPanel tier="base" className="divide-y divide-white/5 p-0">
        <SettingsRow
          icon={Bell}
          title="Notifications"
          subtitle="Choose what you're notified about"
          to="/settings/notifications"
        />
        <SettingsRow
          icon={Download}
          title="Downloads"
          subtitle="Manage your offline content"
          to="/settings/downloads"
        />
        <SettingsRow icon={CreditCard} title="Subscriptions" to="/settings/subscriptions" />
      </GlassPanel>

      {/* Creator Studio entry point — NAVIGATION_MODEL.md: Creator Studio is
          "entered from Settings/Profile (Creator role only)". */}
      <GlassPanel tier="base" className="p-0">
        <SettingsRow
          icon={LayoutDashboard}
          title="Creator Studio"
          subtitle="Manage your content and analytics"
          to="/creator-studio"
        />
        <Separator />
        <SettingsRow
          icon={User}
          title="Your public profile"
          to={`/creator/${creatorSlug(CURRENT_CREATOR.displayName)}`}
        />
      </GlassPanel>

      {/*
        ⚠️ BEYOND SPECIFICATION. No Administrator entry point is documented
        anywhere — PERMISSION_MATRIX.md defines the role but URL_STRUCTURE.md has
        no admin routes. Placed here by analogy with Creator Studio's documented
        "entered from Settings/Profile" entry. A real implementation must gate
        this on the Administrator role; there is no role check here because no
        role model exists in the demo session.
      */}
      <GlassPanel tier="base" className="p-0">
        <SettingsRow
          icon={ShieldAlert}
          title="Administration"
          subtitle="Moderation, categories, platform analytics"
          to="/admin"
        />
      </GlassPanel>

      <Button variant="outline" className="gap-2 self-start" onClick={logout}>
        <LogOut className="size-4" /> Sign out
      </Button>
    </div>
  )
}
