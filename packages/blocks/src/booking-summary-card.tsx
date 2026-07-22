import { Badge } from "@dhara/ui/badge"
import { Separator } from "@dhara/ui/separator"
import { cn } from "@dhara/utils"

export interface BookingSummaryRow {
  label: string
  value: string
}

export interface BookingSummaryCardProps {
  rows: BookingSummaryRow[]
  status?: string
  className?: string
}

/** "Booking Summary" card — ritual, date/time, address, samagri, dakshina, payment, status rows. */
export function BookingSummaryCard({ rows, status, className }: BookingSummaryCardProps) {
  return (
    <div className={cn("surface-card flex flex-col gap-3 p-4", className)}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-foreground">Booking Summary</p>
        {status ? <Badge variant="gold">{status}</Badge> : null}
      </div>
      <Separator />
      <dl className="flex flex-col gap-2">
        {rows.map((row) => (
          <div key={row.label} className="flex items-start justify-between gap-4 text-sm">
            <dt className="text-muted-foreground">{row.label}</dt>
            <dd className="text-right font-medium text-foreground">{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
