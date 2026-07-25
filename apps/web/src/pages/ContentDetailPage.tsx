import { ThumbsUp, UserPlus } from "lucide-react"
import { useEffect, useState } from "react"
import { Link, Navigate, useParams } from "react-router-dom"

import { Avatar, AvatarFallback } from "@dhara/ui/avatar"
import { Button } from "@dhara/ui/button"
import { AdInterstitial } from "@/components/ads/AdInterstitial"
import { ListRowCard } from "@/components/content/ListRowCard"
import { PlaybackStage } from "@/components/content/PlaybackStage"
import { ShareButton } from "@/components/content/ShareButton"
import { Chip } from "@/components/ui/Chip"
import { formatViews, getContentById, MOCK_CONTENT } from "@/lib/mock-content"
import { creatorSlug } from "@/lib/mock-creator"
import { usePlayer } from "@/lib/player-context"

/**
 * Content detail / watch page (`/content/:id`, docs/01_ARCHITECTURE/URL_STRUCTURE.md).
 *
 * This is now the **single playback surface** for both Content types. The former
 * standalone "Playing Now" tab and its `/playing-now` route were removed by
 * product direction, and the docked mini player opens this page rather than a
 * separate full-player screen. Audio and Video therefore both render here, via
 * `PlaybackStage`.
 *
 * NOTE — this diverges from documentation and the divergence is deliberate, not an
 * oversight: NAVIGATION_MODEL.md specifies 5 fixed tabs including Playing Now
 * ("never more or fewer than 5"), URL_STRUCTURE.md defines `/playing-now`, and
 * VideoPlayer/UI.md specifies a full player there with a minimize control. Those
 * documents were updated in the same change so the repository stays coherent.
 *
 * Media files are public-domain sample films — placeholder media only.
 */
export function ContentDetailPage() {
  const { id } = useParams<{ id: string }>()
  const content = id ? getContentById(id) : undefined
  const { load } = usePlayer()

  /**
   * Opening a Content page makes it the current session so the mini player tracks
   * it. Deliberately does not auto-play — browsers block unpromoted autoplay, and
   * `load` preserves position when the already-loaded item is re-opened.
   */
  useEffect(() => {
    if (id) load(id)
  }, [id, load])

  /**
   * One pre-roll ad per Video Player session (Advertisements/EDGE_CASES.md V1
   * default — tunable, not fixed law). Dismissing it starts the Content session.
   *
   * Hard constraint (EDGE_CASES.md, stated three separate ways): an ad being
   * unavailable or failing to load must NEVER block Content playback, and must
   * never render "a blocking error" or "an empty ad-shaped placeholder". So
   * there is deliberately no ad-error state here — failure would simply set this
   * to false and hand off to the player.
   */
  const [showingAd, setShowingAd] = useState(true)

  if (!content) return <Navigate to="/" replace />

  const upNext = MOCK_CONTENT.filter((item) => item.category === content.category && item.id !== content.id).slice(
    0,
    6
  )

  return (
    <div className="mx-auto flex max-w-[1800px] flex-col gap-6 xl:flex-row">
      <div className="min-w-0 flex-1">
        {showingAd ? (
          <AdInterstitial onSkip={() => setShowingAd(false)} />
        ) : (
          <PlaybackStage content={content} />
        )}

        <h1 className="mt-5 text-xl font-semibold leading-tight tracking-tight text-foreground md:text-2xl">
          {content.title}
        </h1>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>{content.creator.charAt(0)}</AvatarFallback>
            </Avatar>
            {/* Creator byline → public Creator Profile, per CreatorProfile/UI.md
                ("reached from Content detail's Creator byline"). */}
            <Link to={`/creator/${creatorSlug(content.creator)}`} className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">{content.creator}</p>
              <p className="truncate text-xs text-muted-foreground">{content.category}</p>
            </Link>
            <Button size="sm" variant="gold" className="ml-2 gap-1.5">
              <UserPlus className="size-4" /> Follow
            </Button>
          </div>
          <div className="flex items-center gap-1.5">
            <Button size="sm" variant="outline" className="gap-1.5">
              <ThumbsUp className="size-4" /> Like
            </Button>
            {/* Share affordance — identical wherever it appears (Sharing/UI.md). */}
            <ShareButton contentId={content.id} title={content.title} />
          </div>
        </div>

        <div className="surface-glass-base mt-4 p-5">
          <div className="flex flex-wrap items-center gap-2">
            <Chip tone="meta">{content.category}</Chip>
            <Chip tone="meta">{content.type === "audio" ? "Audio" : "Video"}</Chip>
            <span className="text-xs font-semibold tabular-nums text-muted-foreground">
              {formatViews(content.views)}
            </span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-foreground/90">{content.description}</p>
        </div>
      </div>

      <div className="w-full xl:w-80 xl:shrink-0">
        <div className="surface-glass-base flex flex-col gap-4 p-4">
          <p className="text-sm font-semibold text-foreground">More like this</p>
          <div className="flex flex-col gap-3.5">
            {upNext.map((item) => (
              <ListRowCard key={item.id} content={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
