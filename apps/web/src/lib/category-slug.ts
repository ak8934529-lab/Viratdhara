import type { ContentCategory } from "@/lib/mock-content"

/**
 * Category ↔ URL slug mapping for `/category/:id`. URL_STRUCTURE.md requires
 * routes be kebab-case and lowercase, so "Bhajans & Kirtan" becomes
 * "bhajans-and-kirtan".
 */
export function categorySlug(category: ContentCategory): string {
  return category
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

export function categoryFromSlug(slug: string, categories: ContentCategory[]): ContentCategory | undefined {
  return categories.find((category) => categorySlug(category) === slug)
}
