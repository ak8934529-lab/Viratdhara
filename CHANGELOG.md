---
document_id: CHANGELOG
title: Changelog
version: 1.3.0
status: active
priority: high
depends_on: []
related_documents:
  - PROJECT_INDEX.md
related_entities: []
related_components: []
related_events: []
owner: Product Architecture
---

# Changelog

One entry per milestone/commit. Newest first.

> Milestones 19–21 were code-only passes on `apps/web` and were not logged here. This entry resumes the log because it records unresolved documentation conflicts that must not live only in code comments.

## Milestone 25 — Playing Now removed; Content detail becomes the single playback surface, and that surface becomes video-only

A structural navigation change in `apps/web`, made on **explicit product direction**, plus the documentation realignment it required. The bottom nav is now **4 tabs — Home, Suno, Dekho, Shorts**. The "Playing Now" tab, its `/playing-now` route, and `PlayingNowPage` are gone. `/content/:id` is now the single playback surface for both Content types: opening it calls `load(id)` so the item becomes the current session without auto-playing, and the docked mini player opens it rather than a separate full-player screen.

**This contradicted three governing documents. All three were updated rather than left to drift:**

- `NAVIGATION_MODEL.md` (v1.1.0) specified 5 fixed tabs including Playing Now at position 3, stated that the bottom nav "must never contain more or fewer than 5 tabs", and specified that Playing Now was active whenever a player session existed. It also carried this repository's one top-bar exception: present on every Main App screen *except* the full Playing Now view, which used a minimize control rather than a back arrow on the grounds that a tab root is not a pushed screen. Now: 4 tabs in fixed order, no tab driven by playback state, and the top bar present on every Main App screen with no exception. The constraint that no Main App screen may omit both top bar and bottom nav is unchanged. The document records in its own Constraints that this replaced a 5-tab model by product direction.
- `URL_STRUCTURE.md` (v1.1.0) defined `/playing-now` as a Main App route. That row is removed; no route replaces it, because playback no longer has a route of its own. `/content/:id` is now documented as the playback surface, not merely a detail screen.
- `VideoPlayer/UI.md` (v1.1.0) specified the full player as a tab root at `/playing-now` with a minimize control. The full player is now composed inside `/content/:id` via `PlaybackStage`, and **there is no minimize control** — it is reached from a Content card or the mini player, so it is a pushed screen with the normal back-arrow chrome. Everything else the document already specified is unchanged and was deliberately preserved: transport order (shuffle, previous, play/pause, next, repeat), elapsed/**remaining** on the seek bar, the lyrics/detail panel "where applicable", the mini player's contents (artwork thumbnail, title, creator, play/pause, skip), and the optional Wide-breakpoint up-next panel.

**Audio had no working surface outside the removed tab.** Video Content already rendered on `/content/:id`; Audio did not — its artwork, seek bar, transport row, and lyrics panel existed only on the Playing Now screen. Removing that tab without absorbing it would have left one of the two documented Content types with no playback UI at all. `PlaybackStage` (`components/content/PlaybackStage.tsx`) therefore had to take on both Content types. It first did so as two presentations — a native `<video>` for Video, square artwork plus seek bar, transport row, and lyrics panel for Audio. **That two-layout arrangement no longer exists; see the video-only decision below, which supersedes it.**

**`PlaybackStage` is the component `VideoPlayer/COMPONENTS.md` (v1.1.0) had specified only as "to be extracted".** That document expected a named `PlayerTransportControls` registered before the feature could be called implementation-complete; the extraction is realised inside `PlaybackStage`, which owns the seek bar and transport row. They are internal to it and not separately registered — if a second surface ever needs the transport row alone, that is when it gets extracted.

**Removed**: `pages/PlayingNowPage.tsx` and `components/content/CategoryChipRow.tsx`. `CategoryChipRow` was **orphaned** — composed by no screen, superseded by `Chip`, and recorded in Milestone 24 as needing to be either adopted or removed. It was removed. Both are now in `COMPONENT_REGISTRY.md`'s Removed Components section (v1.2.0) with their reasons, which also drops the Playing Now screen from the surface lists of `Chip`, `ListRowCard`, `EmptyState`, and `ShareButton`, registers `PlaybackStage`, and corrects `TopBar`'s and `MiniPlayer`'s surface conditions.

**Also in the code, documented in the affected surfaces**: the top bar now renders on every Main App screen (`AppShell`), and `SideNav` lost its `hasTopBar` prop, which existed only to accommodate the removed exception. The mini player is suppressed on the loaded item's own `/content/:id` page, where `PlaybackStage` supersedes it — recorded in `VideoPlayer/UI.md` as an explicit narrow exception to the rule that the mini player "never disappears due to navigation alone", since that rule is otherwise unchanged and still governs.

**The playback surface is now video-only, by explicit product direction.** `PlaybackStage` renders **one 16:9 `<video>` element for both Content types**. The separate audio layout described above — square artwork, its own seek bar, the transport row, the lyrics panel — was removed in favour of a single player shape, rather than one feature maintaining two presentations that drift apart. **Mitigation for Audio**: an audio item has nothing to draw in a video element, so its generated artwork (`lib/poster-art.ts`) is supplied as the element's `poster`, and it presents as a poster frame rather than a black rectangle. That mitigation is what makes a video-shaped surface acceptable for Audio at all, so it is a requirement of the decision, not an implementation detail. **The transport row survives the collapse** and sits below the player (shuffle, previous, play/pause, next, repeat, add-to-playlist, elapsed/remaining): native video controls cover play/pause and seeking but not track stepping, so previous/next, shuffle, and repeat have no native equivalent. Recorded in `VideoPlayer/UI.md` (v1.2.0).

**The lyrics/detail panel is now specified but unrendered — recorded, not withdrawn.** It belonged to the removed audio layout, so nothing renders it today, while `VideoPlayer/UI.md` still requires it "where applicable". Rather than quietly drop a standing requirement to make the documents agree with the code, `UI.md` carries it as an explicit **open item**: the requirement stands and has no home, and closing it needs a product decision — a panel that works for both Content types on the one video surface, or an explicit decision to drop lyrics from V1. Per `AI_DOCUMENTATION_AGENT.md`, the conflict is recorded rather than resolved by an agent picking a side.

**Follow-up pass: the six documents flagged above are now corrected.** The original pass listed them as still naming the removed tab and outside its scope. All six now match `NAVIGATION_MODEL.md`:

- `INFORMATION_ARCHITECTURE.md` (v1.1.0) — its Main App bottom-tab surfaces were "Home, Suno, Playing Now, Dekho, Shorts". Now the 4 tabs, plus Content detail named as the playback surface that is not a tab. This document is `NAVIGATION_MODEL.md`'s `depends_on` parent, so it was the most damaging of the six: a child document contradicting the parent it depends on.
- `RESPONSIVE_SYSTEM.md` (v2.1.0) — the Compact row's "mirrors `NAVIGATION_MODEL.md`'s 5 tabs" is now 4. Nothing else in the breakpoint model was affected; the count was the whole error.
- `VideoPlayer/README.md` (v1.1.0) — no longer claims the feature owns "the full 'Playing Now' screen", nor that Playing Now is a bottom-nav tab active whenever a session exists. It now owns the playback surface composed inside `/content/:id` plus the docked mini player, and its Relationships state plainly that no tab belongs to this feature and none is playback-driven. **Deliberately kept**: the point that the feature plays both Video and Audio despite its name — now extended to note both play through one video-shaped surface.
- `VideoPlayer/STATES.md` (v1.1.0) — "the 'Playing Now' tab is active whenever state is `playing`/`paused`" now governs the **mini player's visibility** instead, which is what the Playback machine actually drives; tab activity follows the route alone. **The state machine itself is untouched** — idle → playing → paused, seeking as a position update, buffering as a transient sub-state of `playing` — because none of it was wrong.
- `ContentDiscovery/README.md` (v1.1.0) — "4 of the 5 bottom-nav tabs … 'Playing Now' belongs to Video Player" is now the plain ownership statement that **all 4 tabs belong to Content Discovery**, with Video Player reached by hand-off from a Content card or the mini player rather than sharing the tab bar.
- `VideoPlayer/PROMPTS.md` (v1.1.0) — the prompt "Implement the full 'Playing Now' screen" would have instructed an agent to build a removed screen. It is retargeted at composing `PlaybackStage` inside `/content/:id`, states outright that no playback screen or route is to be created, and carries the video-only shape so an agent does not reintroduce an audio layout. Its Why no longer claims the transport controls are unregistered, which `COMPONENTS.md` v1.1.0 had already made false.

**Two further documents the video-only decision made wrong, both now corrected:**

- `VideoPlayer/COMPONENTS.md` (v1.2.0) had described `PlaybackStage` as rendering "square artwork plus the full transport row for Audio Content", listed it as "Video and Audio both" in the two-layout sense, and claimed in its Constraints that the component "owns the seek bar and the transport row". All three are corrected: one 16:9 `<video>` for both Content types with artwork as the `poster` frame, and **seeking is not this component's to own** — the native video controls handle play/pause and seeking, so what `PlaybackStage` owns is the poster frame and the transport row (track stepping, shuffle, repeat, add-to-playlist), which exists precisely because the native controls cover none of it.
- `VideoPlayer/CHANGELOG.md` (v1.2.0) had **no Milestone 25 row at all** — a gap left by the original pass, which `AI_DOCUMENTATION_AGENT.md` requires be closed in the same commit as the change. It now records the tab and route removal, playback composed inside `/content/:id`, the video-only surface with artwork as poster, and both open items below. It also closes the transport-controls extraction task that its 2026-07-23 row had left open, which `PlaybackStage` had in fact already satisfied.

**A second contradiction the video-only decision creates, OPEN and needing a product decision**: `VideoPlayer/EDGE_CASES.md` resolved app-backgrounding by Content type — **Audio continues playing in the background, Video pauses and does not auto-resume**. That resolution assumed two playback presentations. With one `<video>` element for both types, the distinction can no longer follow from the element and must be driven by the Content type flag against platform behaviour that generally pauses backgrounded video. Background listening is described there as core to the "Suno" experience, so this is not a cosmetic mismatch. **Flagged, not resolved**: whether the rule still holds is a product decision, and `EDGE_CASES.md` was deliberately left untouched rather than have an agent settle it. It is recorded as open in `VideoPlayer/CHANGELOG.md`, where its outcome belongs once decided.

**Conflicts carried forward, both still OPEN:**

- **Home as a Panchang dashboard vs. Home as a content feed.** Unchanged by this pass. The designs specify a Panchang dashboard; `ContentDiscovery/SPEC.md` specifies Recommendation Engine output. Home remains the content feed per the recorded user decision that documentation wins, and Panchang remains a candidate 12th feature requiring `FEATURE_REGISTRY.md` + `CONTENT_ARCHITECTURE.md` updates before it could be built.
- **Genre vs. `Tag` vs. `Category`.** Unchanged by this pass. The designs label rows and tiles with genre names that are not the 5 documented placeholder Categories, and `CONTENT_ARCHITECTURE.md` forbids inventing Category names beyond that list. Removing `CategoryChipRow` did not touch this — the row it implemented was structural, not taxonomic, and `Chip`-based filter rows still key on documented Categories and Tags.

No document was added or removed, and no document's status changed, so `PROJECT_INDEX.md` and `DOCUMENT_GRAPH.md` are unchanged. No `depends_on` or `related_documents` edge changed; the frontmatter changes in this pass are `version` bumps plus `related_components` additions, which the graph does not project.

## Milestone 24 — Design system overhaul (apps/web)

A reference-driven visual rebuild of `apps/web`. Every screen previously opened into a flat grid of gradient blocks; the pass replaces that with generated artwork, a cinematic hero treatment, and a reworked surface language. **Documentation-side changes only in this entry's scope** — the code landed alongside it, and the five documents below now describe what `apps/web` actually renders.

**Tokens** (`DESIGN_SYSTEM_RULES.md` v1.1.0) — `--background` deepened `#0d0d0d` → `#08060a`, `--card`/`--popover` `#271611` → `#1b0f0c`, `--secondary` and `--muted` darkened, `--foreground` and `--muted-foreground` brightened. The surfaces move down as the foregrounds move up; the widened gap is what holds contrast on a darker base. **The brand hues are unchanged** — `--primary: #be5339` and `--accent: #d3932f` are byte-identical to the baseline, as is `--ring`. A new elevation ramp (`--shadow-sink`, `-lift`, `-float`, `-cinema`) plus `--glow-accent` replaces per-component `box-shadow` values.

**Surfaces** (`SURFACE_SYSTEM.md` v1.1.0) — the three glass tiers keep their names, uses, and the one-`surface-glass-accent`-panel-per-screen constraint. What changed: all three now use `--radius-xl` (20px) rather than `--radius-lg`, all three add `saturate()` to the backdrop filter (blur alone greys a panel out over artwork), and each now carries a shadow from the elevation ramp instead of inventing its own. New utilities documented: `surface-sheen` / `surface-sheen-line` (top inner highlight — defined, no adopting panel yet), `texture-grain`, `scrim-bottom`, `scrim-left`, `scrollbar-none`.

**Typography** (`TYPOGRAPHY.md` v1.1.0) — a display scale above the existing one, reserved for cinematic hero titles and nothing else: `--text-display-sm` (1.875rem), `--text-display` (2.75rem), `--text-display-lg` (4rem), `--text-display-xl` (5.25rem), each shipping its own tightened line-height and negative letter-spacing. Also recorded plainly at last: `text-app-title` and `text-detail-title` are `packages/mobile` utilities and **do not resolve in `apps/web`** — a component using either renders at inherited size with no error.

**Generative poster artwork** (`COMPONENT_LIBRARY.md` v1.1.0) — `lib/poster-art.ts` replaces the flat per-Category gradients with a deterministic SVG poster per Content item, seeded from the Content id so the same item renders identically on every surface. Deliberately geometry-only with **no `<text>` inside the SVG**: a data-URI SVG cannot use the page's webfonts, so Devanagari set there would risk tofu; the Devanagari accents are HTML overlays in the card components instead. Five Category motifs (mandala, arch, rays, bloom, rangoli) with three palette variants each — one palette per Category made a carousel row of same-category items read as a broken repeat rather than a catalogue.

**New primitives**, all now catalogued: `Chip`, `RatingBadge`, `CarouselRow`, `SectionHeader`, `StatTile`, `PageHeader`, `CinematicHero`, `ListRowCard`. Each exists because the markup it replaces had already been hand-rolled on three or more screens and had drifted between them.

**Removed**: `components/content/SectionRow.tsx` (superseded by `CarouselRow`) and `components/content/category-visuals.ts` (superseded by `lib/poster-art.ts`). Both are recorded in `COMPONENT_REGISTRY.md`'s new Removed Components section rather than deleted from the record.

**The component registry backlog is cleared** (`COMPONENT_REGISTRY.md` v1.1.0). Outstanding since Milestone 22 and restated as outstanding in Milestone 23, the registry had only ever been populated from `packages/*`. Every `apps/web` component is now registered — layout/chrome, surface, UI primitives, Content, and feature-specific — each with its scope, the surfaces that compose it, and its file path.

**`packages/mobile` and `apps/showcase` are untouched.** They do not import `apps/web/src/index.css`, so no token, tier, utility, or type-scale change in this pass can reach them. `apps/showcase/src/index.css` still holds `--background: #0d0d0d` and `--card: #271611`. Two stylesheets carrying two ranges of one palette is the arrangement `MASTER_PRD.md` and `SURFACE_SYSTEM.md` already describe, not drift.

**Conflicts from Milestone 22 that remain OPEN and were not resolved by this pass:**

- **Home as a Panchang dashboard vs. Home as a content feed.** Still open. The designs specify a Panchang dashboard; `ContentDiscovery/SPEC.md` specifies Recommendation Engine output. Home remains the content feed per the recorded user decision that documentation wins, and Panchang remains a candidate 12th feature requiring `FEATURE_REGISTRY.md` + `CONTENT_ARCHITECTURE.md` updates before it could be built. This visual pass changed how Home *looks*; it did not touch what Home *is*.
- **Genre vs. `Tag` vs. `Category`.** Still open. The designs label rows and tiles with genre names (Lofi bhajan, Sleep music, Meditation music, Festival Pooja, Podcast, Television Shows) that are not the 5 documented placeholder Categories, and `CONTENT_ARCHITECTURE.md` forbids inventing Category names beyond that list. The generative artwork keys on the 5 documented Categories, and `CategoryTile` still carries an in-code note that the design's genre taxonomy is unreconciled. Adding motifs for a genre taxonomy would have meant inventing the taxonomy first.

**Also still outstanding**, unchanged by this pass: `AdminShell` and the `/admin/*` routes remain entirely beyond specification (registered as `unspecified` scope, not V1); Creator Studio's Upload button still has no documented route; `/playlist/:id` is still unimplemented; there is no role gating on the admin entry point. Newly recorded: `CategoryChipRow` is now composed by no screen and must be either adopted or removed, and `apps/web`'s PascalCase, two-components-per-file convention conflicts with `DESIGN_SYSTEM_RULES.md`'s one-component-per-file kebab-case rule, which may need explicit scoping to `packages/*`.

`PROJECT_INDEX.md`'s Totals were corrected in the same pass: Active 197 → 198 and Planned 6 → 5. No document was added or removed; the Total of 217 was already correct.

## Milestone 23 — Administration area + close out Milestone 22's partials

**Scope changes by user direction**: the Recommendation Engine ("Video Streaming Algorithm") and Advertisements ("Ads Between video") are both **out of scope** and were not worked on further. The Studio analytics dashboard was directed to serve **both Creator and Administrator** profiles.

**⚠️ New Administration area — entirely beyond specification.** Added `/admin`, `/admin/moderation`, `/admin/categories` with their own shell (`AdminShell`), mirroring Creator Studio's structure. This is built on explicit user direction and is **not documented anywhere**:

- `URL_STRUCTURE.md` states outright that administrator routes are **not defined**.
- `FEATURE_REGISTRY.md`'s 11 V1 features contain **no admin/moderation feature**, so there is no knowledge base to build from.
- `INFORMATION_ARCHITECTURE.md` defines three structural areas (Auth Area, Main App, Creator Studio) — there is no Administration area.
- `DOMAIN_MODEL.md` / `ENTITY_REGISTRY.md` define **no report/flag entity**, so the moderation queue's report counts and reasons are invented.

**Before this ships**, an Administration feature must be added to `FEATURE_REGISTRY.md`, its routes to `URL_STRUCTURE.md`, and a knowledge base authored under `docs/03_FEATURES/` — with `PROJECT_INDEX.md`, `DOCUMENT_GRAPH.md`, and `CHANGELOG.md` updated in the same commit. The unspecified status is surfaced in the product itself via an "Unspecified scope" badge in the admin header, not just in code comments.

The one part that **is** documented and drove this area's existence: `published → removed_by_moderation` is an Administrator-only, Creator-irreversible transition (`STATE_REGISTRY.md`). The moderation queue is now the only place it can be triggered, and the Creator-side consequence (read-only moderated rows) was already in place. Whether an Administrator may *reinstate* moderated Content is **undefined** — this implementation allows it, which is a guess.

Category control is deliberately **read-only**: `CONTENT_ARCHITECTURE.md` marks the 5-category V1 list a placeholder that "must be replaced with a confirmed list before launch", and is the authoritative source. Making it editable in-product would let it drift from the document, so the screen states the placeholder status instead.

**Milestone 22 partials closed:**

- **Share placement (was a spec violation)** — `Sharing/UI.md` requires the affordance on "any Content card's overflow/action area" across Content Discovery, Search results, and Category browse; it was on none of them. `VideoCard` and `PosterCard` now carry it. Both were restructured so the share button is a *sibling* of the card's links rather than a descendant — a `<button>` inside an `<a>` is invalid HTML. Verified: 0 nested interactive elements across all card surfaces.
- **Creator Studio actions** — Publish / Remove / Republish now perform the documented transitions (`draft → published`, `published → removed_by_creator`). Guarded both ways so nothing can enter or leave `removed_by_moderation` from the Creator side.
- **Audio playback** — the player rendered artwork with no media element, so Audio produced no sound. Now plays for real via an `<audio>` element driven by playback state, with working seek, `timeupdate` sync, and end-of-track handling (`content_completed → idle`, or restart when repeat is on).
- **Player transport** — previous/next now step tracks, shuffle and repeat toggle with visible pressed state, and the mini player's skip works. Download remains omitted (`VideoPlayer/README.md`: offline playback "not specified").

Still outstanding: the new components remain unregistered in `COMPONENT_REGISTRY.md`; Creator Studio's Upload button still has no documented route; `/playlist/:id` is still unimplemented; there is no role gating on the admin entry point because the demo session has no role model.

## Milestone 22 — Web screens for the remaining V1 features (design pass)

Built `apps/web` screens for every V1 feature that was still a `PlaceholderPage`, in the priority order of `MASTER_PRD.md`'s Feature Scope table. **Design-only**: no backend, no real session, no media pipeline — all screens read placeholder data from `lib/mock-content.ts` / `lib/mock-creator.ts`.

**Screens added**: `/suno`, `/dekho`, `/shorts`, `/search`, `/playing-now`, `/category/:id`, `/creator/:id`, `/settings` + `/settings/{notifications,downloads,subscriptions}`, and the Creator Studio area (`/creator-studio`, `/creator-studio/content`, `/creator-studio/analytics`). Every route in `URL_STRUCTURE.md` is now implemented except `/playlist/:id`.

**Source**: 31 mobile design screens supplied by the user (`Designs/`, gitignored) plus the feature knowledge bases. The designs resolved several previously-undefined specs — most usefully the **Shorts overlay rail** (Like + count, Save, Share, More), which `ContentDiscovery/COMPONENTS.md` had left entirely open, and the **Video-vs-Audio player presentation** (landscape 16:9 surface for Video, square artwork for Audio), which `VideoPlayer/UI.md` never distinguished.

**Design-vs-documentation conflicts — flagged, not silently resolved** (per `AI_INSTRUCTIONS.md`: documentation wins; when unsure, ask):

- **Home is designed as a Panchang dashboard** (greeting, auspicious/inauspicious timings, Rahu Kaal, sunrise/sunset, आज का पंचांग) but `ContentDiscovery/SPEC.md` says Home is "composed entirely of Recommendation Engine output". Panchang is **not one of the 11 V1 features** and appears nowhere in `FEATURE_REGISTRY.md`. **Resolved by user decision: documentation wins** — Home stays the content feed; Panchang is deferred as a candidate 12th feature and would require `FEATURE_REGISTRY.md` + `CONTENT_ARCHITECTURE.md` updates before it could be built.
- **Dekho's designed sections** are Festival Pooja / Podcast / Television Shows; **Suno's chip row** is Lofi bhajan / On drive / Sleep music / Meditation music. Neither set matches the 5 placeholder Categories, and `CONTENT_ARCHITECTURE.md` forbids inventing Category names beyond that list. Built from the documented Categories instead; Suno's chip row filters on **Tags** (which the doc does define) rather than an invented genre taxonomy. **Reconciling genre vs. Tag vs. Category is still open.**
- **Player deviations**: the seek bar shows elapsed/**remaining** per `VideoPlayer/UI.md`, not the design's total duration. The design's **Download** control is omitted — `VideoPlayer/README.md` states offline/download is "not specified". A **share** control was added, which the design lacks but `Sharing/UI.md` requires. A **minimize** control was added, which the design lacks but `NAVIGATION_MODEL.md` requires.
- **`UserSettings/COMPONENTS.md` lists a "Subscription upgrade CTA"**, contradicting the deliberate full deferral of Subscriptions recorded in that feature's `SPEC.md` and `EDGE_CASES.md`. The deferral wins (later and more specific) — the screen renders an unavailable state with no tier, pricing, or billing UI.
- **The Settings hub's Account row has no route.** `UserSettings/TEST_CASES.md` requires the row; `URL_STRUCTURE.md` defines no `/settings/account`. Account info is rendered inline as read-only display rather than inventing a route.
- **Creator Studio's internal navigation and its Studio-home composition are undefined.** `NAVIGATION_MODEL.md` says the nav is "owned by the Creator Studio feature" without specifying its form, and `CreatorStudio/UI.md` gives Studio home a route and nothing else. Both are inferences, flagged in-code.
- **No create/upload route exists** for Creator Studio, yet `SPEC.md` requires the behaviour and `COMPONENTS.md` says "Content creation is a form". The Upload button currently has nowhere documented to go.

**Deliberate absences** (each would have been invented UI): no charts, sparklines, trend arrows, or time-range selector in Studio analytics; no banner, bio, or stats row on Creator Profile; no storage meter in Downloads; no ad-failure or ad-retry UI; no share toast; no search autocomplete, suggestions, or history.

**New components**: `SectionRow`, `PosterCard`, `CategoryTile`, `EmptyState`, `ShareButton`, `MiniPlayer`, `StudioShell`, `SettingsRow`, `AdInterstitial`, and the Shorts item renderer. These need registering in `COMPONENT_REGISTRY.md` — **not done in this commit**, and outstanding.

## Commit 18 — Gap Resolution Pass

Resolved nearly every open gap flagged across Commits 6–17, split into two categories per `AI_GLOBAL_RULES.md`'s never-invent principle:

**Business/content decisions — required user input, obtained this commit:**
- V1 Content Categories: explicit 5-item **placeholder** (Bhajans & Kirtan, Discourses & Satsang, Aarti & Rituals, Devotional Stories, Festival Specials) — not a final taxonomy, but unblocks all structural work. (`CONTENT_ARCHITECTURE.md`, `ContentCategorization/*`)
- Subscription tiers: **deliberately deferred**, by explicit choice — not even a placeholder structure. (`UserSettings/*`)
- Notification categories: 3 fixed categories (new content from followed Creators, engagement on your activity, product & platform announcements). (`UserSettings/*`)
- Downloads storage limit: **none for V1**. (`UserSettings/*`)

**Technical defaults — resolved directly, each cited/labeled as a default rather than silently assumed:**
- `password_minimum`: NIST 800-63B-based (8–128 chars, no forced composition, breach-list check). (`VALIDATION_REGISTRY.md`, `Authentication/*`)
- "Booking" onboarding option: hidden entirely for V1. (`Authentication/*`)
- Session expiry: silent refresh, then forced re-login on failure. (`Authentication/*`)
- Search query sanitization: 200-char client truncation, parameterized queries required server-side. (`Search/*`)
- Video Player: stall-indicator + backoff-retry on network loss; Audio continues in background, Video pauses; moderated Content finishes its current session but blocks new ones. (`VideoPlayer/*`)
- Sharing: unauthenticated recipients are routed through the existing Auth Area (no new exception), then deep-linked to the shared Content. (`Sharing/*`)
- Creator Profile: `Follow` records cascade-delete on Account deletion or Creator-role revocation. (`CreatorProfile/*`)
- Advertisements: one ad per Video Player session, skip available at 5 seconds — both explicitly tunable, not fixed law. (`Advertisements/*`)
- **Recommendation Engine: the ranking algorithm gap (the single largest open item in the repository) resolved with an explicit V1 placeholder heuristic** — Category-recency match, falling back to global recency for cold-start/low-volume — clearly labeled as temporary, not a real recommendation system. (`RecommendationEngine/*`)
- Content Discovery: Home's featured section and the Recommendation-fallback question both resolve automatically as a consequence of the above — Home uses Recommendation Engine's output directly, which now always returns something. (`ContentDiscovery/*`)

**Only one gap remains open by deliberate choice**: User Settings' subscription tier structure, deferred pending real payment-integration scoping.

Every affected feature's `SPEC.md`/`EDGE_CASES.md`/`VALIDATIONS.md`/`TEST_CASES.md`/`CHANGELOG.md` was updated in this commit; `FEATURE_REGISTRY.md` KB Status column reflects the resolution per feature.

## Commit 17 — Creator Studio Feature Knowledge Base (All 11 V1 Features Complete)

- Added the full 13-file feature knowledge base at `docs/03_FEATURES/CreatorStudio/` — the 11th and final V1 feature from `MASTER_PRD.md`'s Feature Scope table.
- Established the boundary with `Creator Profile`: this feature is private management/analytics (own Content only, enforced server-side); `Creator Profile` is the public-facing counterpart.
- No major open gaps for this feature — unlike several others (Recommendation Engine's algorithm, Content Categorization's category list), Creator Studio's scope was fully specifiable from registries already in place.
- `docs/03_FEATURES/README.md` updated: all 11 features now `documented`. "Documented" means a complete, specific 13-file knowledge base exists — not that every feature is free of open questions. Each feature's own `EDGE_CASES.md` and `FEATURE_REGISTRY.md`'s KB Status column are the record of what's still open, feature by feature.
- **Repository stands at 217 documents** (197 active, 14 draft — mostly API/Error registries pending `04_BACKEND` architecture — 6 planned).
- **Open items carried forward, not resolved in this pass**: password_minimum policy (Authentication), the "Booking" onboarding option (Authentication), V1 Category list (Content Categorization), query sanitization limits (Search), network/backgrounding/mid-playback-removal behavior (Video Player), unauthenticated share-recipient behavior (Sharing), Follow cleanup on role/account changes (Creator Profile), notification categories/storage limits/subscription tiers (User Settings), ad placement frequency/skip timing (Advertisements), the ranking algorithm itself (Recommendation Engine), and Recommendation-fallback/Home-curation behavior (Content Discovery).

## Commit 16 — Content Discovery Feature Knowledge Base

- Added the full 13-file feature knowledge base at `docs/03_FEATURES/ContentDiscovery/`, covering Home/Suno/Dekho/Shorts.
- Clarified Home's composition is narrower than what was visually reviewed in the Figma design — the temple-live carousel is out of scope per the V1 booking exclusion (Commit 2.1).
- Flagged 2 open gaps: Recommendation-fallback behavior when Recommendation Engine has nothing to serve, and Home's featured-content source.
- Noted `apps/showcase`'s `QuickActionTile` demo content should be updated to real V1 subject matter once this feature's categories/sections are finalized (previously flagged in `COMPONENT_REGISTRY.md`, Milestone 3).
- `FEATURE_REGISTRY.md` KB Status updated to `documented`.

## Commit 15 — Recommendation Engine Feature Knowledge Base

- Added the full 13-file feature knowledge base at `docs/03_FEATURES/RecommendationEngine/`.
- Clarified this feature decides *what* Content to surface per Account, not video streaming/delivery mechanics — despite "Video Streaming Algorithm" being this pass's working name for it.
- Flagged the ranking/personalization algorithm as entirely undefined — the single largest open item across all features documented so far. Only the entity/API/event contract is specified; no algorithm is invented or assumed.
- `FEATURE_REGISTRY.md` KB Status updated to `documented`.

## Commit 14 — Advertisements Feature Knowledge Base

- Added the full 13-file feature knowledge base at `docs/03_FEATURES/Advertisements/`.
- Scoped this pass to "Ads Between video" (pre-roll on Video Player sessions) per `MASTER_PRD.md`'s narrower working name — narrower than `FEATURE_REGISTRY.md`'s general Advertisements entry, which is noted, not silently reinterpreted.
- Hard constraint established: ad unavailability/load-failure must never block Content playback.
- Flagged 2 open gaps: placement frequency, skip timing.
- `FEATURE_REGISTRY.md` KB Status updated to `documented`.

## Commit 13 — User Settings Feature Knowledge Base

- Added the full 13-file feature knowledge base at `docs/03_FEATURES/UserSettings/`.
- Established the boundary with Authentication explicitly: this feature owns notification/downloads/subscription state; credential fields (email, password) stay with Authentication even though reached via the same Settings entry point in the reviewed design.
- Flagged 3 open gaps: notification category list, downloads storage limit, subscription tier structure — none invented.
- `FEATURE_REGISTRY.md` KB Status updated to `documented`.

## Commit 12 — Creator Profile Feature Knowledge Base

- Added the full 13-file feature knowledge base at `docs/03_FEATURES/CreatorProfile/`.
- **Real cross-milestone gap found and fixed**: `PRODUCT_CONTEXT.md` (Commit 2) stated Creators "interact with followers," but `DOMAIN_MODEL.md` (Commit 3) never modeled a Follow relationship. Added `Follow` to `DOMAIN_MODEL.md` and `ENTITY_REGISTRY.md`, a `Follow` API group to `API_REGISTRY.md`, and `creator_followed`/`creator_unfollowed` to `EVENT_REGISTRY.md` — all in this same commit, per `AI_DOCUMENTATION_AGENT.md`'s rule against partial registry updates.
- Flagged 2 open gaps: Follow cleanup on Creator-role revocation, and cascade behavior on account deletion — both depend on features (role management, account deletion) that don't exist yet.
- `FEATURE_REGISTRY.md` KB Status updated to `documented`.

## Commit 11 — Sharing Feature Knowledge Base

- Added the full 13-file feature knowledge base at `docs/03_FEATURES/Sharing/`.
- Specified native platform share (`navigator.share` + copy-link fallback) as the mechanism — no custom share sheet or short-link service.
- Flagged one open gap: whether an unauthenticated recipient can view shared Content or must log in first is unconfirmed.
- `FEATURE_REGISTRY.md` KB Status updated to `documented`.

## Commit 10 — Video Player Feature Knowledge Base

- Added the full 13-file feature knowledge base at `docs/03_FEATURES/VideoPlayer/`.
- Clarified this feature plays both Video and Audio Content types despite its name (carried over from the reviewed design's "Playing Now" tab).
- Flagged 3 open gaps: network-interruption handling, background audio playback, and content-removed-mid-playback behavior — none resolved by assumption.
- Noted the full-player transport controls (`apps/showcase/PlayerScreen.tsx`) need extraction into a registered component before this feature is implementation-complete.
- `FEATURE_REGISTRY.md` KB Status updated to `documented`.

## Commit 9 — Search Feature Knowledge Base

- Added the full 13-file feature knowledge base at `docs/03_FEATURES/Search/`.
- Defined a feature-local state machine (`idle`/`searching`/`results`/`no_results`/`error`) — not added to `STATE_REGISTRY.md` since it's not cross-feature.
- Flagged one open gap: query sanitization/length limits are unspecified — a security/backend concern, not resolved by assumption.
- `FEATURE_REGISTRY.md` KB Status updated to `documented`.

## Commit 8 — Content Categorization Feature Knowledge Base

- Added the full 13-file feature knowledge base at `docs/03_FEATURES/ContentCategorization/`.
- Flagged one open gap, deliberately not resolved: the V1 Category list itself is undefined in any source document. Structural UI/data work can proceed against mock data; final Category names are a pending product decision.
- `FEATURE_REGISTRY.md` KB Status updated to `documented` for this feature.

## Commit 7 — Master PRD + Web Design Foundation

- Added root `MASTER_PRD.md` — the single entry point for building `apps/web` (a new web app, distinct from `apps/showcase`), synthesizing product/architecture/design/feature scope. Maps the user's working feature names (Onboarding Aspects, Content Listing, Video Streaming Algorithm, Video Categorization, Studio dashboard for analytics, Ads Between video, etc.) to the existing `FEATURE_REGISTRY.md` canonical names — no renaming of existing docs, just an explicit mapping.
- `RESPONSIVE_SYSTEM.md` rewritten (v2.0.0): now carries two coexisting strategies — `packages/mobile`/`apps/showcase` stay letterboxed-mobile-only (unchanged), while `apps/web` gets a real 3-breakpoint system (Compact/Medium/Wide) with distinct navigation and grid layouts per breakpoint.
- Added `docs/02_DESIGN/SURFACE_SYSTEM.md` — the glass/depth visual language for `apps/web` (frosted translucent panels, background gradient blooms, 3 surface tiers), explicitly layered on the existing color tokens rather than introducing a new palette, and explicitly not applied to `packages/mobile`'s existing opaque surfaces.
- Decision recorded: `apps/web` does not reuse `packages/mobile` (phone-chrome shell) — it gets its own web-native layout/navigation components, reading the same `NAVIGATION_MODEL.md` route model.
- Next: rich, implementation-ready feature specs for the remaining 10 features, one feature per commit, per `MASTER_PRD.md`'s Feature Scope table.

## Commit 6 — Authentication Feature Knowledge Base

- Added the full 13-file feature knowledge base at `docs/03_FEATURES/Authentication/`, copied from `templates/FEATURE_TEMPLATE/` and filled in per `PROMPT_LIBRARY.md`'s "Start a new V1 feature's knowledge base" prompt.
- `FEATURE_REGISTRY.md` KB Status updated: Authentication is now `documented`, with 2 open gaps flagged rather than resolved by assumption: (1) `password_minimum` validation rule unspecified, (2) the reviewed design's "Booking" onboarding option needs a product decision (hide vs. repurpose) since booking is out of V1 scope.
- `AUTHENTICATION_API.md` is `draft`, matching `API_REGISTRY.md`'s own draft status pending backend architecture.
- First feature to move through the full template — confirms the template structure holds for a real feature without needing changes.

## Commit 5 — Design Foundation

- Added all 9 planned `docs/02_DESIGN` documents: `DESIGN_PHILOSOPHY.md`, `DESIGN_SYSTEM_RULES.md`, `LAYOUT_SYSTEM.md`, `RESPONSIVE_SYSTEM.md` (draft), `COMPONENT_LIBRARY.md`, `ACCESSIBILITY.md`, `TYPOGRAPHY.md`, `MOTION.md` (draft), `UX_PATTERNS.md`.
- Grounded in the actual built code (`apps/showcase/src/index.css` tokens, `packages/ui`/`packages/mobile` components) rather than re-describing the Figma design from scratch.
- `RESPONSIVE_SYSTEM.md` and `MOTION.md` are intentionally `draft` — the product has no designed tablet/desktop breakpoint system and no real motion token system yet; both documents say so directly rather than inventing one.
- `UX_PATTERNS.md`'s empty-state pattern directly addresses the literal `<Pooja Name>`/`<Merchandise>` placeholder text found during the original design review — future implementations must use `MobileEmptyState` instead.
- This completes Milestones 1–5 (Bootstrap, Product, Architecture, AI, Design). Milestone 6+ (one feature at a time, starting with Authentication) is next.

## Commit 4 — AI Foundation

- Added all 9 planned `docs/05_AI` documents: `AI_GLOBAL_RULES.md`, `AI_DESIGN_AGENT.md`, `AI_FRONTEND_AGENT.md`, `AI_BACKEND_AGENT.md`, `AI_DOCUMENTATION_AGENT.md`, `AI_TESTING_AGENT.md`, `AI_REVIEW_AGENT.md`, `AI_SECURITY_AGENT.md`, `PROMPT_LIBRARY.md`.
- `AI_GLOBAL_RULES.md` elaborates (does not duplicate) the root `AI_INSTRUCTIONS.md` read-order/never-invent rules with rationale; every per-agent document narrows it without contradicting it.
- `AI_DOCUMENTATION_AGENT.md` formalizes, as explicit rules, the process actually followed while building this repository (frontmatter schema, index/graph/changelog updated together, absorb-fully-then-delete for seed content, flag-don't-silently-resolve conflicts).
- Absorbed and removed the last 3 files in `Viratdhara_AI_Docs_Starter/` (`AI_GLOBAL_RULES.md`, `AI_INSTRUCTIONS.md`, `HANDOFF_TO_CLAUDE.md`). The starter folder is now fully absorbed and removed.

## Commit 3 — Architecture Foundation

- Added all 15 planned `docs/01_ARCHITECTURE` documents: `INFORMATION_ARCHITECTURE.md`, `DOMAIN_MODEL.md`, `CONTENT_ARCHITECTURE.md`, `NAVIGATION_MODEL.md`, `URL_STRUCTURE.md`, `FEATURE_REGISTRY.md`, `PERMISSION_MATRIX.md`, `DEPENDENCY_GRAPH.md`, `ENTITY_REGISTRY.md`, `COMPONENT_REGISTRY.md`, `EVENT_REGISTRY.md`, `STATE_REGISTRY.md`, `API_REGISTRY.md` (draft), `ERROR_REGISTRY.md` (draft), `VALIDATION_REGISTRY.md`.
- `FEATURE_REGISTRY.md` formalizes the 11 V1 features from `PRODUCT_CONTEXT.md`; booking/commerce excluded per Commit 2.1.
- `NAVIGATION_MODEL.md` fixes the nav-shell inconsistency found during the original design review (booking screens had no bottom nav; music screens did) — one shared model, both now moot since booking is descoped, but the model is the one all Main App screens use going forward.
- `COMPONENT_REGISTRY.md` is populated directly from the actual code in `packages/ui`, `packages/mobile`, `packages/blocks` — not invented. Flags that `TempleLiveCard`, `PanditCard`, `ProductCard`, `BookingSummaryCard` are future-scoped components sitting in code ahead of their feature being promoted, and that `apps/showcase`'s demo content should eventually be swapped to V1-appropriate examples.
- `API_REGISTRY.md` / `ERROR_REGISTRY.md` are intentionally `draft` — no backend architecture exists yet to finalize a contract against.
- Absorbed and removed `Viratdhara_AI_Docs_Starter/DOMAIN_MODEL.md`, `INFORMATION_ARCHITECTURE.md`, `CONTENT_ARCHITECTURE.md`, `PRODUCT_CONTEXT.md`, `PROJECT_INDEX.md`, `README.md` — all fully superseded. Only `AI_GLOBAL_RULES.md`, `AI_INSTRUCTIONS.md`, `HANDOFF_TO_CLAUDE.md` remain in the starter folder, pending Milestone 4.

## Commit 2.1 — V1 Scope Conflict Resolved

- Decision: temple/pandit booking and merchandise commerce are **not** V1. They are future/long-term scope, per `PRODUCT_VISION.md`.
- Confirmed the reviewed Figma design's booking/commerce screens (75 screens total, same content previously reviewed as a combined PDF export) map to the **Temples**, **Donations**, and a newly added **Merchandise / Spiritual Commerce** module under Long-Term Product Direction.
- `docs/03_FEATURES` must not gain a booking or commerce feature folder until one of these modules is promoted to `FEATURE_REGISTRY.md`.
- Closes the conflict flagged in Commit 2.

## Commit 2 — Product Foundation

- Added `docs/00_PRODUCT/PRODUCT_CONTEXT.md`, `PRODUCT_VISION.md`, `PRODUCT_PHILOSOPHY.md`, `SUCCESS_METRICS.md`, `GLOSSARY.md`.
- Source: the user-authored `PROJECT_CONTEXT.md` (root), split across these five single-responsibility documents per the "one document, one concept" rule, rather than kept as one large file.
- `docs/00_PRODUCT/README.md` and `PROJECT_INDEX.md` updated from `planned` to `active` for all five documents.
- `DOCUMENT_GRAPH.md` updated with real edges replacing the `(planned)` placeholder nodes for this category.
- Flagged, not resolved: the user's stated V1 scope excludes temple/pandit booking and merchandise (listed only under long-term direction in `PRODUCT_VISION.md`), while the reviewed Figma design is built substantially around those flows. Documentation is authoritative per `AI_INSTRUCTIONS.md`; this conflict needs an explicit decision before `03_FEATURES` content is written.
- `SUCCESS_METRICS.md` intentionally contains no quantitative KPIs — none were supplied, and none were invented.

## Commit 1 — Repository Bootstrap

- Added `README.md`, `AI_INSTRUCTIONS.md`, `CLAUDE.md`, `CURSOR.md`, `PROJECT_INDEX.md`, `DOCUMENT_GRAPH.md`, `CHANGELOG.md`.
- Added `docs/00_PRODUCT` through `docs/08_TESTING` and `docs/99_REFERENCE`, each with a scoped `README.md` listing its planned documents.
- Added `.ai/` with `README.md` and `schema/document-frontmatter.schema.json`.
- Added `templates/` with `DOCUMENT_TEMPLATE.md` and `FEATURE_TEMPLATE/` (13 files).
- No product, architecture, design, feature, or AI content documents exist yet — this commit is skeleton only.
