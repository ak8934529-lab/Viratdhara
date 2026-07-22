import { Button } from "@dhara/ui/button"
import { cn } from "@dhara/utils"

export interface ProductCardProps {
  image: string
  name: string
  price: number
  onBuy?: () => void
  className?: string
}

/** Merchandise / pooja-samagri product tile: image, name, price, Buy Now CTA. */
export function ProductCard({ image, name, price, onBuy, className }: ProductCardProps) {
  return (
    <div className={cn("surface-card flex flex-col overflow-hidden", className)}>
      <div className="aspect-square w-full bg-cover bg-center" style={{ backgroundImage: `url(${image})` }} />
      <div className="flex flex-col gap-2 p-3">
        <div>
          <p className="truncate text-sm font-medium text-foreground">{name}</p>
          <p className="text-xs text-muted-foreground">₹ {price}</p>
        </div>
        <Button size="sm" variant="gold" onClick={onBuy}>
          Buy Now
        </Button>
      </div>
    </div>
  )
}
