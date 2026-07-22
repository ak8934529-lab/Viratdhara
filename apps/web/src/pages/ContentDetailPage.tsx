import { ThumbsUp, UserPlus } from "lucide-react"
import { Navigate, useParams } from "react-router-dom"

import { Avatar, AvatarFallback } from "@dhara/ui/avatar"
import { Button } from "@dhara/ui/button"
import { VideoCard } from "@/components/content/VideoCard"
import { formatViews, getContentById, MOCK_CONTENT } from "@/lib/mock-content"

/**
 * Content detail / watch page (`/content/:id`, docs/01_ARCHITECTURE/URL_STRUCTURE.md).
 * Player surface per docs/03_FEATURES/VideoPlayer/UI.md, adapted for on-demand
 * video (real <video> playback) rather than the persistent "Playing Now" tab.
 * Video files are public-domain sample films — placeholder media only.
 */
export function ContentDetailPage() {
  const { id } = useParams<{ id: string }>()
  const content = id ? getContentById(id) : undefined

  if (!content) return <Navigate to="/" replace />

  const upNext = MOCK_CONTENT.filter((item) => item.category === content.category && item.id !== content.id).slice(
    0,
    6
  )

  return (
    <div className="mx-auto flex max-w-[1800px] flex-col gap-6 xl:flex-row">
      <div className="min-w-0 flex-1">
        <div className="overflow-hidden rounded-xl bg-black">
          {/* eslint-disable-next-line jsx-a11y/media-has-caption -- placeholder demo media, no captions available */}
          <video key={content.id} src={content.videoUrl} controls autoPlay className="aspect-video w-full" />
        </div>

        <h1 className="mt-4 text-lg font-semibold text-foreground md:text-xl">{content.title}</h1>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>{content.creator.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold text-foreground">{content.creator}</p>
              <p className="text-xs text-muted-foreground">{content.category}</p>
            </div>
            <Button size="sm" variant="gold" className="ml-2 gap-1.5">
              <UserPlus className="size-4" /> Follow
            </Button>
          </div>
          <Button size="sm" variant="outline" className="gap-1.5">
            <ThumbsUp className="size-4" /> Like
          </Button>
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
