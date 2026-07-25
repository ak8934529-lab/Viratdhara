import { AlertTriangle, Search as SearchIcon, SearchX } from "lucide-react"
import { useEffect, useMemo, useRef, useState } from "react"
import { useSearchParams } from "react-router-dom"

import { Button } from "@dhara/ui/button"
import { CategoryTile } from "@/components/content/CategoryTile"
import { EmptyState } from "@/components/content/EmptyState"
import { VideoCard } from "@/components/content/VideoCard"
import { GlassPanel } from "@/components/glass/GlassPanel"
import { SectionHeader } from "@/components/ui/CarouselRow"
import { PageHeader } from "@/components/ui/StatTile"
import { CONTENT_CATEGORIES, MOCK_CONTENT } from "@/lib/mock-content"
import type { ContentItem } from "@/lib/mock-content"

/**
 * Search (`/search`) — a pushed/detail screen (back arrow, not a tab root) per
 * docs/03_FEATURES/Search/UI.md.
 *
 * Implements all 5 states from Search/STATES.md, each visually distinct:
 *   idle → searching → results | no_results | error
 * STATES.md constraint: `no_results` and `error` are never collapsed into one
 * generic "nothing to show" treatment — the former is an empty state, the
 * latter an error message.
 *
 * Query rules from SPEC.md/VALIDATIONS.md: executes on explicit submission (not
 * as-you-type); case-insensitive substring match on title, Tags, or Category
 * name; empty/whitespace submit is a silent no-op (no request, no error);
 * queries truncate to 200 chars silently with no counter or validation message.
 */
type SearchState = "idle" | "searching" | "results" | "no_results" | "error"

const QUERY_MAX_LENGTH = 200

function matches(item: ContentItem, query: string): boolean {
  const q = query.toLowerCase()
  return (
    item.title.toLowerCase().includes(q) ||
    item.category.toLowerCase().includes(q) ||
    item.tags.some((tag) => tag.toLowerCase().includes(q))
  )
}

export function SearchPage() {
  const [searchParams] = useSearchParams()
  const initialQuery = searchParams.get("q") ?? ""

  const [input, setInput] = useState(initialQuery)
  const [submitted, setSubmitted] = useState(initialQuery)
  // A `?q=` arrival from the top bar lands mid-query rather than idle.
  const [state, setState] = useState<SearchState>(initialQuery.trim() ? "searching" : "idle")
  const inputRef = useRef<HTMLInputElement>(null)

  /**
   * UI.md constraint: "The search input itself is always visible/focused on
   * entering /search — not a secondary action after landing on the screen."
   */
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const results = useMemo(
    () => (submitted ? MOCK_CONTENT.filter((item) => matches(item, submitted)) : []),
    [submitted]
  )

  function runSearch(raw: string) {
    const query = raw.trim().slice(0, QUERY_MAX_LENGTH)

    // `query_non_empty`: submission is a no-op, not a VALIDATION_FAILED error.
    if (!query) return

    setSubmitted(query)
    setState("searching")
  }

  /**
   * Resolves `searching` into one of the three terminal states. The delay only
   * exists so the `searching` state is observable — no backend exists yet
   * (API.md is draft), so this is placeholder timing, not real I/O.
   */
  useEffect(() => {
    if (state !== "searching") return

    const timer = window.setTimeout(() => {
      // Demo-only: a query of "error" exercises the `error` state, which is
      // otherwise unreachable without a real API that can fail.
      if (submitted.trim().toLowerCase() === "error") {
        setState("error")
        return
      }
      setState(MOCK_CONTENT.some((item) => matches(item, submitted)) ? "results" : "no_results")
    }, 600)

    return () => window.clearTimeout(timer)
  }, [state, submitted])

  return (
    <div className="mx-auto flex max-w-[1100px] flex-col gap-6">
      {/* Pushed-screen chrome: back arrow, per UI.md. */}
      <PageHeader title="Search" backTo="/" />

      <form
        onSubmit={(event) => {
          event.preventDefault()
          runSearch(input)
        }}
        role="search"
      >
        {/* Bright pill input, echoing the mobile Search design's high-contrast field
            while staying on the glass surface system. */}
        <div className="flex items-center gap-3 rounded-full bg-white/95 px-5 py-3.5 shadow-[var(--shadow-float)] ring-1 ring-white/20 transition-shadow focus-within:shadow-[var(--glow-accent)]">
          <SearchIcon className="size-5 shrink-0 text-primary" />
          <input
            ref={inputRef}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            maxLength={QUERY_MAX_LENGTH}
            placeholder="Bhajans, discourses, creators &amp; more"
            aria-label="Search Viratdhara"
            className="w-full bg-transparent text-sm font-medium text-neutral-900 outline-none placeholder:font-normal placeholder:text-neutral-500"
          />
        </div>
      </form>

      {state === "idle" ? <IdleState /> : null}
      {state === "searching" ? <SearchingState /> : null}
      {state === "results" ? <ResultsState results={results} /> : null}
      {state === "no_results" ? <NoResultsState query={submitted} /> : null}
      {state === "error" ? <ErrorState onRetry={() => runSearch(submitted)} /> : null}
    </div>
  )
}

/**
 * `idle` — nothing submitted yet. Deliberately NOT a suggestions/history
 * surface: Search/SPEC.md states autocomplete, typo-tolerance, and search
 * history are "not specified", and README.md says they're added "only with a
 * real design for them". What remains is the Category browse grid the mobile
 * design shows here, which is Content Categorization surfacing, not history.
 */
function IdleState() {
  return (
    <section className="flex flex-col gap-4">
      <SectionHeader title="Browse all" eyebrow="Explore" />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
        {CONTENT_CATEGORIES.map((category) => (
          <CategoryTile key={category} category={category} />
        ))}
      </div>
    </section>
  )
}

/**
 * `searching` — mid-query. Appearance is unspecified; a skeleton grid is used
 * rather than a spinner, since ContentCategorization/EDGE_CASES.md's only
 * guidance is "never blank space or a loading spinner stuck indefinitely".
 */
function SearchingState() {
  return (
    <div
      className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3"
      role="status"
      aria-label="Searching"
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="flex flex-col gap-3">
          <div className="aspect-video w-full animate-pulse rounded-xl bg-muted/40" />
          <div className="flex gap-3">
            <div className="size-9 shrink-0 animate-pulse rounded-full bg-muted/40" />
            <div className="flex w-full flex-col gap-2">
              <div className="h-3 w-4/5 animate-pulse rounded bg-muted/40" />
              <div className="h-3 w-2/5 animate-pulse rounded bg-muted/40" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

/** `results` — Content grid matching Category browse layout: 1 / 2 / 3+ columns. */
function ResultsState({ results }: { results: ContentItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
      {results.map((item) => (
        <VideoCard key={item.id} content={item} />
      ))}
    </div>
  )
}

/**
 * `no_results` — empty state with query-specific copy, per Search/EDGE_CASES.md
 * ("`MobileEmptyState` with query-specific text"). Never blank space.
 */
function NoResultsState({ query }: { query: string }) {
  return (
    <EmptyState
      icon={SearchX}
      title={`No results for "${query}"`}
      description="Try a different spelling, or browse by category instead."
    />
  )
}

/**
 * `error` — an error message, deliberately distinct from `no_results`.
 * Copy is not specified in any document (ERROR_REGISTRY.md is draft and carries
 * codes only, no user-facing strings), so this wording is a flagged inference.
 * The Retry action is likewise not specified for Search.
 */
function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <GlassPanel tier="base" className="flex flex-col items-center gap-3 px-6 py-10 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-destructive/15 text-destructive ring-1 ring-destructive/25">
        <AlertTriangle className="size-6" />
      </span>
      <p className="text-sm font-semibold text-foreground">Search is unavailable right now</p>
      <p className="max-w-[34ch] text-xs text-muted-foreground">
        Something went wrong on our side. Your query wasn&apos;t lost — try again.
      </p>
      <Button size="sm" variant="outline" onClick={onRetry}>
        Retry
      </Button>
    </GlassPanel>
  )
}
