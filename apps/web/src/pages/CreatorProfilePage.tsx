import { ArrowLeft, VideoOff } from "lucide-react"
import { useState } from "react"
import { Link, Navigate, useParams } from "react-router-dom"

import { Avatar, AvatarFallback } from "@dhara/ui/avatar"
import { Button } from "@dhara/ui/button"
import { EmptyState } from "@/components/content/EmptyState"
import { VideoCard } from "@/components/content/VideoCard"
import { posterBackground } from "@/lib/poster-art"
import { useAuth } from "@/lib/auth-context"
import { CURRENT_CREATOR, getCreatorBySlug, getPublishedContentByCreator } from "@/lib/mock-creator"

/**
 * Public Creator Profile (`/creator/:id`) — a pushed/detail screen, per
 * docs/03_FEATURES/CreatorProfile/UI.md: "header (avatar, display name, Follow
 * button), then a Content grid of the Creator's published items."
 *
 * Deliberately absent, because nothing specifies them:
 * - NO banner / cover image — never mentioned in UI.md, SPEC.md, or DATABASE.md.
 * - NO bio — one passing README.md mention, no field backing it.
 * - NO stats row (followers / content count / total views). README.md Future
 *   Scope: "only the follow action and count, if any, are in scope, and even the
 *   count is not confirmed as a V1 requirement." README.md Constraints also puts
 *   view counts and follower-growth charts in Creator Studio, not here.
 * - NO content tabs or sort control — UI.md says "a Content grid", singular.
 *
 * Only `published` Content is shown, including on one's own profile — SPEC.md:
 * drafts are Creator Studio's concern and are never visible here.
 */
export function CreatorProfilePage() {
  const { id } = useParams<{ id: string }>()
  const { isAuthenticated } = useAuth()
  const creator = id ? getCreatorBySlug(id) : undefined
  const [following, setFollowing] = useState(false)

  if (!creator) return <Navigate to="/" replace />

  const items = getPublishedContentByCreator(creator.displayName)
  const isOwnProfile = creator.id === CURRENT_CREATOR.id

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-6">
      {/*
        Header. At Wide, UI.md permits it sitting alongside the grid rather than
        stacked above — kept stacked here, which the spec allows ("may").

        The banner uses generated artwork derived from the creator's own id. Note
        this is a *surface treatment*, not new content: UI.md specifies no banner,
        bio, or stats for this screen, and none is introduced — the header still
        carries exactly avatar + display name + Follow.
      */}
      <header
        className="relative -mx-4 -mt-5 overflow-hidden md:-mx-6 md:mt-0 md:rounded-2xl lg:-mx-8"
        style={{
          backgroundImage: posterBackground("Bhajans & Kirtan", creator.id, "landscape"),
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div aria-hidden className="scrim-bottom absolute inset-0" />
        <div aria-hidden className="absolute inset-0 bg-background/45" />

        <div className="relative flex flex-col gap-4 p-5 md:p-8">
          <Button
            variant="ghost"
            size="icon-sm"
            asChild
            aria-label="Back"
            className="-ml-1 w-fit text-white/80 hover:text-white"
          >
            <Link to="/">
              <ArrowLeft className="size-5" />
            </Link>
          </Button>

          <div className="flex flex-wrap items-center gap-4">
            <Avatar size="lg" className="ring-2 ring-white/25">
              <AvatarFallback>{creator.displayName.charAt(0)}</AvatarFallback>
            </Avatar>

            <div className="min-w-0 flex-1">
              <h1 className="truncate text-2xl font-semibold leading-tight tracking-tight text-white md:text-3xl">
                {creator.displayName}
              </h1>
              <p className="mt-1 text-xs text-white/65">
                {items.length} published item{items.length === 1 ? "" : "s"}
              </p>
            </div>

            <FollowButton
              isOwnProfile={isOwnProfile}
              isAuthenticated={isAuthenticated}
              following={following}
              onToggle={() => setFollowing((value) => !value)}
            />
          </div>
        </div>
      </header>

      {items.length > 0 ? (
        <div className="grid grid-cols-1 gap-x-5 gap-y-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => (
            <VideoCard key={item.id} content={item} />
          ))}
        </div>
      ) : (
        /*
          FLAGGED: CreatorProfile/EDGE_CASES.md does not cover a Creator with
          zero published Content (its three cases are self-follow, role
          revocation, account deletion). UX_PATTERNS.md's general empty-state
          rule governs by default; this copy is not spec'd.
        */
        <EmptyState
          icon={VideoOff}
          title="No published content yet"
          description="When this creator publishes something, it'll appear here."
        />
      )}
    </div>
  )
}

/**
 * Follow button — `Button` with state-driven variant/label per COMPONENTS.md
 * ("No new component is built for the Follow button"):
 *   not following → variant="default", label "Follow"
 *   following     → variant="outline",  label "Following"
 *
 * Two spec'd exceptions:
 * - Own profile: no Follow button at all (EDGE_CASES.md `no_self_follow`; the
 *   layout is otherwise still the public profile, just without the action).
 * - Unauthenticated: routes to Authentication rather than silently failing
 *   (VALIDATIONS.md `follow_requires_auth` → UNAUTHENTICATED).
 */
function FollowButton({
  isOwnProfile,
  isAuthenticated,
  following,
  onToggle,
}: {
  isOwnProfile: boolean
  isAuthenticated: boolean
  following: boolean
  onToggle: () => void
}) {
  if (isOwnProfile) return null

  if (!isAuthenticated) {
    return (
      <Button size="sm" variant="default" asChild>
        <Link to="/login">Follow</Link>
      </Button>
    )
  }

  return (
    <Button size="sm" variant={following ? "outline" : "default"} onClick={onToggle}>
      {following ? "Following" : "Follow"}
    </Button>
  )
}
