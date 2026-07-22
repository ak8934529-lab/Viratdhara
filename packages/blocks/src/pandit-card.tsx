import { MapPin, Star } from "lucide-react"

import { ICON_STROKE_WIDTH } from "@dhara/constants"
import { Avatar, AvatarFallback, AvatarImage } from "@dhara/ui/avatar"
import { Button } from "@dhara/ui/button"
import { cn } from "@dhara/utils"

export interface PanditCardProps {
  name: string
  avatarUrl?: string
  rating: number
  reviewCount: number
  distanceKm?: number
  languages: string
  specialties: string
  onBook?: () => void
  className?: string
}

/** Pandit list card — "Book My Pandit" flow: avatar, rating, specialties, Book Pandit Ji CTA. */
export function PanditCard({
  name,
  avatarUrl,
  rating,
  reviewCount,
  distanceKm,
  languages,
  specialties,
  onBook,
  className,
}: PanditCardProps) {
  return (
    <div className={cn("surface-card flex flex-col gap-3 p-4", className)}>
      <div className="flex items-start gap-3">
        <Avatar size="lg">
          {avatarUrl ? <AvatarImage src={avatarUrl} alt={name} /> : null}
          <AvatarFallback>{name.slice(0, 1)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-foreground">{name}</p>
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="size-3.5 fill-accent text-accent" aria-hidden />
            {rating.toFixed(1)} ({reviewCount} Review)
            {distanceKm ? (
              <>
                <span aria-hidden>·</span>
                <MapPin className="size-3.5" strokeWidth={ICON_STROKE_WIDTH} aria-hidden />
                {distanceKm} km
              </>
            ) : null}
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">{languages}</p>
        </div>
      </div>
      <p className="text-xs text-foreground/80">
        <span className="font-medium text-foreground">Specialities: </span>
        {specialties}
      </p>
      <Button onClick={onBook} className="w-full" variant="gold">
        Book Pandit Ji
      </Button>
    </div>
  )
}
