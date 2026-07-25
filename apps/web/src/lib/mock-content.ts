/**
 * Placeholder Content dataset — no 04_BACKEND/Content API exists yet
 * (docs/01_ARCHITECTURE/CONTENT_ARCHITECTURE.md). Video sources are public
 * Creative Commons sample films (Blender Foundation open movies) used only
 * as playable demo media; titles/creators/categories are Viratdhara-shaped
 * placeholder data, not real content.
 */
export type ContentCategory =
  | "Bhajans & Kirtan"
  | "Discourses & Satsang"
  | "Aarti & Rituals"
  | "Devotional Stories"
  | "Festival Specials"

/** `Video` | `Audio` per CONTENT_ARCHITECTURE.md — set at creation, immutable. */
export type ContentType = "video" | "audio"

/**
 * Presentation format, not a separate Content type — CONTENT_ARCHITECTURE.md:
 * "a Shorts item is a `Video` with a `format: short` attribute". Drives Shorts'
 * feed and Dekho's short-exclusion rule.
 */
export type ContentFormat = "standard" | "short"

export interface ContentItem {
  id: string
  title: string
  creator: string
  category: ContentCategory
  type: ContentType
  format: ContentFormat
  /**
   * Zero or more Tags (CONTENT_ARCHITECTURE.md minimum metadata). No Tag
   * vocabulary is defined in any document — this list is placeholder, exactly
   * as the V1 Category list is, and must not be treated as final.
   */
  tags: string[]
  durationSeconds: number
  views: number
  publishedDaysAgo: number
  description: string
  videoUrl: string
}

/** Verified-reachable public CC0/demo sample videos (the old gtv-videos-bucket is no longer public — returns 403). */
const SAMPLE_VIDEOS = [
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/friday.mp4",
  "https://vjs.zencdn.net/v/oceans.mp4",
  "https://www.w3schools.com/html/mov_bbb.mp4",
  "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4",
  "https://test-videos.co.uk/vids/sintel/mp4/h264/360/Sintel_360_10s_1MB.mp4",
  "https://test-videos.co.uk/vids/jellyfish/mp4/h264/360/Jellyfish_360_10s_1MB.mp4",
]

export const CONTENT_CATEGORIES: ContentCategory[] = [
  "Bhajans & Kirtan",
  "Discourses & Satsang",
  "Aarti & Rituals",
  "Devotional Stories",
  "Festival Specials",
]

export const MOCK_CONTENT: ContentItem[] = [
  {
    id: "1",
    title: "Hanuman Chalisa — Full Recitation with Meaning",
    creator: "Ananya Devotional",
    category: "Bhajans & Kirtan",
    type: "audio",
    format: "standard",
    tags: ["Chalisa", "Morning"],
    durationSeconds: 596,
    views: 128400,
    publishedDaysAgo: 2,
    description: "A soulful, complete recitation of the Hanuman Chalisa with on-screen meaning for daily devotion.",
    videoUrl: SAMPLE_VIDEOS[0],
  },
  {
    id: "2",
    title: "Shrimad Bhagavad Gita — Chapter 2 Discourse",
    creator: "Swami Anand Ashram",
    category: "Discourses & Satsang",
    type: "video",
    format: "standard",
    tags: ["Gita", "Philosophy"],
    durationSeconds: 1834,
    views: 54200,
    publishedDaysAgo: 5,
    description: "A guided discourse on Chapter 2 of the Bhagavad Gita, exploring the nature of the eternal soul.",
    videoUrl: SAMPLE_VIDEOS[1],
  },
  {
    id: "3",
    title: "Om Jai Jagdish Hare — Evening Aarti",
    creator: "Kashi Temple Live",
    category: "Aarti & Rituals",
    type: "audio",
    format: "standard",
    tags: ["Evening", "Aarti"],
    durationSeconds: 312,
    views: 342100,
    publishedDaysAgo: 1,
    description: "The traditional evening aarti performed live from the temple sanctum.",
    videoUrl: SAMPLE_VIDEOS[2],
  },
  {
    id: "4",
    title: "The Story of Dhruva — Unwavering Devotion",
    creator: "Katha Kids",
    category: "Devotional Stories",
    type: "video",
    format: "standard",
    tags: ["Kids", "Katha"],
    durationSeconds: 745,
    views: 89300,
    publishedDaysAgo: 9,
    description: "An animated retelling of young Dhruva's penance and his unwavering devotion.",
    videoUrl: SAMPLE_VIDEOS[3],
  },
  {
    id: "5",
    title: "Diwali Special — Lakshmi Puja Vidhi",
    creator: "Ananya Devotional",
    category: "Festival Specials",
    type: "video",
    format: "standard",
    tags: ["Diwali", "Vidhi"],
    durationSeconds: 1120,
    views: 210900,
    publishedDaysAgo: 14,
    description: "Step-by-step Lakshmi Puja vidhi for Diwali, with mantras and ritual explanation.",
    videoUrl: SAMPLE_VIDEOS[4],
  },
  {
    id: "6",
    title: "Shiv Tandav Stotram — Powerful Rendition",
    creator: "Nada Yoga Collective",
    category: "Bhajans & Kirtan",
    type: "audio",
    format: "standard",
    tags: ["Stotram", "Classical"],
    durationSeconds: 428,
    views: 176300,
    publishedDaysAgo: 3,
    description: "A powerful vocal rendition of the Shiv Tandav Stotram set to classical percussion.",
    videoUrl: SAMPLE_VIDEOS[5],
  },
  {
    id: "7",
    title: "Satsang: Finding Stillness in a Busy Mind",
    creator: "Swami Anand Ashram",
    category: "Discourses & Satsang",
    type: "video",
    format: "standard",
    tags: ["Satsang", "Meditation music"],
    durationSeconds: 2210,
    views: 41800,
    publishedDaysAgo: 7,
    description: "An evening satsang on cultivating stillness and presence amid daily distraction.",
    videoUrl: SAMPLE_VIDEOS[6],
  },
  {
    id: "8",
    title: "Morning Aarti — Ganga Ghat Live",
    creator: "Kashi Temple Live",
    category: "Aarti & Rituals",
    type: "video",
    format: "standard",
    tags: ["Morning", "Aarti"],
    durationSeconds: 501,
    views: 98700,
    publishedDaysAgo: 1,
    description: "Sunrise Ganga aarti broadcast live from the ghats of Varanasi.",
    videoUrl: SAMPLE_VIDEOS[0],
  },
  {
    id: "9",
    title: "The Churning of the Ocean — Samudra Manthan",
    creator: "Katha Kids",
    category: "Devotional Stories",
    type: "video",
    format: "standard",
    tags: ["Kids", "Katha"],
    durationSeconds: 890,
    views: 156200,
    publishedDaysAgo: 20,
    description: "The epic tale of Samudra Manthan, the churning of the cosmic ocean, retold for young viewers.",
    videoUrl: SAMPLE_VIDEOS[1],
  },
  {
    id: "10",
    title: "Navratri Special — Garba Night Highlights",
    creator: "Nada Yoga Collective",
    category: "Festival Specials",
    type: "video",
    format: "standard",
    tags: ["Navratri", "Garba"],
    durationSeconds: 645,
    views: 267400,
    publishedDaysAgo: 4,
    description: "Highlights from a Navratri garba night celebration, with devotional songs and dance.",
    videoUrl: SAMPLE_VIDEOS[2],
  },
  {
    id: "11",
    title: "Gayatri Mantra — 108 Times for Meditation",
    creator: "Nada Yoga Collective",
    category: "Bhajans & Kirtan",
    type: "audio",
    format: "standard",
    tags: ["Mantra", "Meditation music", "Sleep music"],
    durationSeconds: 1980,
    views: 412600,
    publishedDaysAgo: 30,
    description: "A continuous 108-repetition chant of the Gayatri Mantra for meditation and focus.",
    videoUrl: SAMPLE_VIDEOS[3],
  },
  {
    id: "12",
    title: "Understanding Karma Yoga — A Short Discourse",
    creator: "Swami Anand Ashram",
    category: "Discourses & Satsang",
    type: "audio",
    format: "standard",
    tags: ["Gita", "Philosophy"],
    durationSeconds: 1340,
    views: 33900,
    publishedDaysAgo: 11,
    description: "A concise discourse on Karma Yoga — the path of selfless action described in the Gita.",
    videoUrl: SAMPLE_VIDEOS[4],
  },
  {
    id: "13",
    title: "Lofi Bhajan Mix — Calm Mind Sessions",
    creator: "Nada Yoga Collective",
    category: "Bhajans & Kirtan",
    type: "audio",
    format: "standard",
    tags: ["Lofi bhajan", "On drive", "Sleep music"],
    durationSeconds: 3120,
    views: 521300,
    publishedDaysAgo: 6,
    description: "Chilled devotional beats for study, travel, and unwinding at the end of the day.",
    videoUrl: SAMPLE_VIDEOS[5],
  },
  {
    id: "14",
    title: "Shiv Bhajan Sandhya — Temple Recording",
    creator: "Kashi Temple Live",
    category: "Bhajans & Kirtan",
    type: "audio",
    format: "standard",
    tags: ["Evening", "Classical"],
    durationSeconds: 2740,
    views: 143800,
    publishedDaysAgo: 12,
    description: "An unedited evening bhajan sandhya recorded inside the temple hall.",
    videoUrl: SAMPLE_VIDEOS[6],
  },
  {
    id: "15",
    title: "Ram Naam Dhun — Continuous Chant",
    creator: "Ananya Devotional",
    category: "Bhajans & Kirtan",
    type: "audio",
    format: "standard",
    tags: ["Mantra", "Morning", "Meditation music"],
    durationSeconds: 4200,
    views: 298100,
    publishedDaysAgo: 17,
    description: "An unbroken Ram naam dhun for japa, walking meditation, or background devotion.",
    videoUrl: SAMPLE_VIDEOS[0],
  },
  // --- format: short (Shorts feed) ---
  // Note: sample media is landscape; no vertical CC0 clips are available here.
  // The renderer letterboxes them into the vertical frame — placeholder media only.
  {
    id: "16",
    title: "One line from the Gita that changes everything",
    creator: "Swami Anand Ashram",
    category: "Discourses & Satsang",
    type: "video",
    format: "short",
    tags: ["Gita", "Shorts"],
    durationSeconds: 42,
    views: 48200,
    publishedDaysAgo: 1,
    description: "A single verse, unpacked in under a minute.",
    videoUrl: SAMPLE_VIDEOS[1],
  },
  {
    id: "17",
    title: "Why we light the diya before dawn",
    creator: "Kashi Temple Live",
    category: "Aarti & Rituals",
    type: "video",
    format: "short",
    tags: ["Morning", "Shorts"],
    durationSeconds: 35,
    views: 91600,
    publishedDaysAgo: 2,
    description: "The meaning behind the pre-dawn lamp, in brief.",
    videoUrl: SAMPLE_VIDEOS[2],
  },
  {
    id: "18",
    title: "Hanuman ji's answer to fear",
    creator: "Katha Kids",
    category: "Devotional Stories",
    type: "video",
    format: "short",
    tags: ["Kids", "Shorts"],
    durationSeconds: 51,
    views: 167400,
    publishedDaysAgo: 3,
    description: "A short katha on courage for young listeners.",
    videoUrl: SAMPLE_VIDEOS[3],
  },
  {
    id: "19",
    title: "Diwali rangoli in 60 seconds",
    creator: "Ananya Devotional",
    category: "Festival Specials",
    type: "video",
    format: "short",
    tags: ["Diwali", "Shorts"],
    durationSeconds: 58,
    views: 233900,
    publishedDaysAgo: 5,
    description: "A quick rangoli pattern anyone can draw before the puja.",
    videoUrl: SAMPLE_VIDEOS[4],
  },
  {
    id: "20",
    title: "The tanpura note that opens every bhajan",
    creator: "Nada Yoga Collective",
    category: "Bhajans & Kirtan",
    type: "video",
    format: "short",
    tags: ["Classical", "Shorts"],
    durationSeconds: 29,
    views: 72800,
    publishedDaysAgo: 8,
    description: "Why the drone comes first.",
    videoUrl: SAMPLE_VIDEOS[5],
  },
]

/** Placeholder Tag vocabulary, derived from the mock set — no document defines one. */
export const CONTENT_TAGS: string[] = Array.from(
  new Set(MOCK_CONTENT.flatMap((item) => item.tags))
).sort()

export function getContentById(id: string): ContentItem | undefined {
  return MOCK_CONTENT.find((item) => item.id === id)
}

/** Dekho: Video Content only, excluding `format: short` (ContentDiscovery/TEST_CASES.md case 3). */
export const VIDEO_CONTENT: ContentItem[] = MOCK_CONTENT.filter(
  (item) => item.type === "video" && item.format === "standard"
)

/** Suno: Audio Content only. */
export const AUDIO_CONTENT: ContentItem[] = MOCK_CONTENT.filter((item) => item.type === "audio")

/** Shorts: Video Content with `format: short` only. */
export const SHORTS_CONTENT: ContentItem[] = MOCK_CONTENT.filter((item) => item.format === "short")

export function getContentByCategory(category: ContentCategory): ContentItem[] {
  return MOCK_CONTENT.filter((item) => item.category === category)
}

export function formatDuration(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  const mm = hours > 0 ? String(minutes).padStart(2, "0") : String(minutes)
  const ss = String(seconds).padStart(2, "0")
  return hours > 0 ? `${hours}:${mm}:${ss}` : `${mm}:${ss}`
}

export function formatViews(views: number): string {
  if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M views`
  if (views >= 1_000) return `${(views / 1_000).toFixed(1)}K views`
  return `${views} views`
}

/** Compact count for overlay rails (the Shorts design shows "48K", not "48.2K views"). */
export function formatCompactCount(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`
  if (value >= 1_000) return `${Math.round(value / 1_000)}K`
  return String(value)
}

export function formatPublishedAgo(daysAgo: number): string {
  if (daysAgo < 1) return "today"
  if (daysAgo === 1) return "1 day ago"
  if (daysAgo < 7) return `${daysAgo} days ago`
  if (daysAgo < 30) return `${Math.floor(daysAgo / 7)} week${Math.floor(daysAgo / 7) > 1 ? "s" : ""} ago`
  return `${Math.floor(daysAgo / 30)} month${Math.floor(daysAgo / 30) > 1 ? "s" : ""} ago`
}
