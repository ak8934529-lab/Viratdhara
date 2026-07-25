import { ThumbsUp, UserPlus } from "lucide-react"
import { useState } from "react"
import { Link, Navigate, useParams } from "react-router-dom"

import { Avatar, AvatarFallback } from "@dhara/ui/avatar"
import { Button } from "@dhara/ui/button"
import { AdInterstitial } from "@/components/ads/AdInterstitial"
import { ShareButton } from "@/components/content/ShareButton"
import { VideoCard } from "@/components/content/VideoCard"
import { formatViews, getContentById, MOCK_CONTENT } from "@/lib/mock-content"
import { creatorSlug } from "@/lib/mock-creator"

/**
 * Content detail / watch page (`/content/:id`, docs/01_ARCHITECTURE/URL_STRUCTURE.md).
 * Player surface per docs/03_FEATURES/VideoPlayer/UI.md, adapted for on-demand
 * video (real <video> playback) rather than the persistent "Playing Now" tab.
 * Video files are public-domain sample films — placeholder media only.
 */
export function ContentDetailPage() {
  const { id } = useParams<{ id: string }>()
  const content = id ? getContentById(id) : undefined

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
          <div className="overflow-hidden rounded-xl bg-black">
            {/* eslint-disable-next-line jsx-a11y/media-has-caption -- placeholder demo media, no captions available */}
            <video key={content.id} src={content.videoUrl} controls autoPlay className="aspect-video w-full" />
          </div>
        )}

        <h1 className="mt-4 text-lg font-semibold text-foreground md:text-xl">{content.title}</h1>

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

        <div className="surface-glass-base mt-4 p-4">
          <p className="text-xs font-medium text-muted-foreground">
            {formatViews(content.views)} · Placeholder description
          </p>
          <p className="mt-2 text-sm text-foreground/90">{content.description}</p>
        </div>
      </div>

      <div className="flex w-full flex-col gap-3 xl:w-80 xl:shrink-0">
        <p className="text-sm font-semibold text-foreground">More like this</p>
        {upNext.map((item) => (
          <VideoCard key={item.id} content={item} />
        ))}
      </div>
    </div>
  )
}
