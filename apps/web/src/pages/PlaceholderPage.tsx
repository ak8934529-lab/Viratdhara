import { GlassPanel } from "@/components/glass/GlassPanel"

export interface PlaceholderPageProps {
  title: string
  note?: string
}

/** Stand-in for a feature not yet built in apps/web. Not a product screen. */
export function PlaceholderPage({ title, note }: PlaceholderPageProps) {
  return (
    <GlassPanel tier="base" className="flex min-h-[60vh] flex-col items-center justify-center gap-2 p-8 text-center">
      <p className="text-lg font-semibold">{title}</p>
      <p className="max-w-sm text-sm text-muted-foreground">
        {note ?? "This feature's screens haven't been built in apps/web yet."}
      </p>
    </GlassPanel>
  )
}
