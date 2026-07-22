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

export interface ContentItem {
  id: string
  title: string
  creator: string
  category: ContentCategory
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
    durationSeconds: 1340,
    views: 33900,
    publishedDaysAgo: 11,
    description: "A concise discourse on Karma Yoga — the path of selfless action described in the Gita.",
    videoUrl: SAMPLE_VIDEOS[4],
  },
]

export function getContentById(id: string): ContentItem | undefined {
  return MOCK_CONTENT.find((item) => item.id === id)
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

export function formatPublishedAgo(daysAgo: number): string {
  if (daysAgo < 1) return "today"
  if (daysAgo === 1) return "1 day ago"
  if (daysAgo < 7) return `${daysAgo} days ago`
  if (daysAgo < 30) return `${Math.floor(daysAgo / 7)} week${Math.floor(daysAgo / 7) > 1 ? "s" : ""} ago`
  return `${Math.floor(daysAgo / 30)} month${Math.floor(daysAgo / 30) > 1 ? "s" : ""} ago`
}
