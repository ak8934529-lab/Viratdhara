import { cn } from "@dhara/utils"

export interface LiveBadgeProps {
  label?: string
  className?: string
}

/** Small "LIVE" pill shown over temple-live carousel thumbnails. */
export function LiveBadge({ label = "Live", className }: LiveBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-destructive px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-destructive-foreground",
        className
      )}
    >
      <span className="size-1.5 animate-pulse rounded-full bg-destructive-foreground" />
      {label}
    </span>
  )
}
