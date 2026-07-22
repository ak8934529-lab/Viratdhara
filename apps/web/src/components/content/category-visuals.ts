import type { ContentCategory } from "@/lib/mock-content"

/** Per-category placeholder thumbnail gradient — no real thumbnail assets exist yet. */
export const CATEGORY_GRADIENT: Record<ContentCategory, string> = {
  "Bhajans & Kirtan": "from-primary/70 via-primary/40 to-accent/30",
  "Discourses & Satsang": "from-accent/60 via-card to-primary/30",
  "Aarti & Rituals": "from-primary/60 via-accent/30 to-card",
  "Devotional Stories": "from-secondary via-primary/30 to-accent/20",
  "Festival Specials": "from-accent/70 via-primary/40 to-secondary",
}
