import { Play } from "lucide-react"
import { Link } from "react-router-dom"

import { Avatar, AvatarFallback } from "@dhara/ui/avatar"
import { cn } from "@dhara/utils"
import { CATEGORY_GRADIENT } from "@/components/content/category-visuals"
import type { ContentItem } from "@/lib/mock-content"
import { formatDuration, formatPublishedAgo, formatViews } from "@/lib/mock-content"

/** A single feed video card — thumbnail + creator + title + meta, YouTube-style. */
export function VideoCard({ content }: { content: ContentItem }) {
  return (
    <Link to={`/content/${content.id}`} className="group flex flex-col gap-3">
      <div
        className={cn(
          "relative aspect-video w-full overflow-hidden rounded-xl bg-gradient-to-br",
          CATEGORY_GRADIENT[content.category]
        )}
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
          <span className="flex size-12 items-center justify-center rounded-full bg-background/60 backdrop-blur-sm">
            <Play className="size-5 translate-x-0.5 fill-foreground text-foreground" />
          </span>
        </div>
        <span className="absolute bottom-2 right-2 rounded-md bg-background/80 px-1.5 py-0.5 text-[11px] font-medium text-foreground">
          {formatDuration(content.durationSeconds)}
        </span>
      </div>

      <div className="flex gap-3">
        <Avatar size="sm" className="mt-0.5 shrink-0">
          <AvatarFallback>{content.creator.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="line-clamp-2 text-sm font-semibold leading-snug text-foreground">{content.title}</p>
          <p className="mt-1 truncate text-xs text-muted-foreground">{content.creator}</p>
          <p className="truncate text-xs text-muted-foreground">
            {formatViews(content.views)} · {formatPublishedAgo(content.publishedDaysAgo)}
          </p>
        </div>
      </div>
    </Link>
  )
}
