import type { ContentCategory } from "@/lib/mock-content"

/**
 * Generative poster artwork.
 *
 * No real thumbnail assets exist (CONTENT_ARCHITECTURE.md — no 04_BACKEND media
 * pipeline yet), and flat gradient blocks read as *missing images* rather than as
 * design. This module produces a distinct, deterministic SVG poster per Content
 * item so every card carries real artwork.
 *
 * Deliberately geometry-only — no <text> in the SVG. An SVG referenced through a
 * data URI in a CSS background or <img> cannot rely on the page's webfonts, so
 * Devanagari set here would risk rendering as tofu boxes on systems without a
 * matching font. Devanagari accents are therefore composed as real HTML text in
 * the card components, where the page's own font stack applies.
 *
 * Self-contained: no external hosts, so this survives the strict CSP that applies
 * to published artifacts and needs no network at runtime.
 */

interface PosterPalette {
  base: string
  mid: string
  accent: string
}

type MotifKind = "mandala" | "rays" | "arch" | "rangoli" | "bloom"

/**
 * Each Category gets a motif (its structural identity) and several palette
 * variants (its colour range). Variants matter: with one palette per Category a
 * carousel row of same-category items renders as near-identical tiles, which reads
 * as a broken repeat rather than a catalogue. Real poster walls vary.
 *
 * The UI chrome stays terracotta/gold regardless — DESIGN_SYSTEM_RULES.md's brand
 * colours govern buttons, chips, and accents. Artwork is imagery, not chrome, so it
 * carries a wider range in the same way a streaming service's UI stays one colour
 * while its posters do not.
 */
const CATEGORY_ART: Record<ContentCategory, { motif: MotifKind; palettes: PosterPalette[] }> = {
  "Bhajans & Kirtan": {
    motif: "mandala",
    /*
     * Widest variant set of any Category, deliberately: Bhajans dominates the
     * Suno tab, so with only warm-gold variants a full row rendered as one
     * repeated tile. The spread reaches into rose, jade, and night-blue while
     * keeping a warm metallic accent, which is what holds the set together.
     */
    palettes: [
      { base: "#2a0f0a", mid: "#8a3218", accent: "#f0b53f" },
      { base: "#1a1207", mid: "#6b5216", accent: "#f7d774" },
      { base: "#24120c", mid: "#9c4a1c", accent: "#ffc857" },
      { base: "#1d0a14", mid: "#7a2247", accent: "#f5b9a0" },
      { base: "#0a1614", mid: "#1e5148", accent: "#e8c46a" },
      { base: "#0c1020", mid: "#2a3564", accent: "#e6c078" },
    ],
  },
  "Discourses & Satsang": {
    motif: "arch",
    // Cooler, quieter — a deliberate contrast to the hot Aarti embers.
    palettes: [
      { base: "#08131a", mid: "#1d4a52", accent: "#8fd4c4" },
      { base: "#0d1424", mid: "#2b3a6b", accent: "#a8b6f0" },
      { base: "#101a12", mid: "#2d5340", accent: "#9fd8a8" },
    ],
  },
  "Aarti & Rituals": {
    motif: "rays",
    palettes: [
      { base: "#2b0a06", mid: "#b53c14", accent: "#ffc02e" },
      { base: "#26060a", mid: "#c0341f", accent: "#ff9c3a" },
      { base: "#1d0d05", mid: "#8f4a10", accent: "#ffd166" },
      { base: "#140f1e", mid: "#4a3a86", accent: "#ffcf7a" },
      { base: "#0d1512", mid: "#2f5c3a", accent: "#ffd98a" },
    ],
  },
  "Devotional Stories": {
    motif: "bloom",
    palettes: [
      { base: "#160a1e", mid: "#4e2470", accent: "#d9a7f0" },
      { base: "#1c0a16", mid: "#6b2748", accent: "#f0a0b4" },
      { base: "#0f0c1f", mid: "#38357a", accent: "#b3aef5" },
    ],
  },
  "Festival Specials": {
    motif: "rangoli",
    palettes: [
      { base: "#260a14", mid: "#a82550", accent: "#ffd35c" },
      { base: "#1f0a1c", mid: "#8c2478", accent: "#ffb0e0" },
      { base: "#2a1206", mid: "#c25c14", accent: "#ffe08a" },
    ],
  },
}

/**
 * Devanagari accents, varied per item rather than fixed per Category — a row of
 * same-category cards otherwise repeats one glyph five times.
 */
const GLYPH_POOL: Record<ContentCategory, string[]> = {
  "Bhajans & Kirtan": ["ॐ", "राम", "हरि", "जय"],
  "Discourses & Satsang": ["श्री", "ज्ञान", "सत्य", "गीता"],
  "Aarti & Rituals": ["दीप", "आरती", "ॐ", "पूजा"],
  "Devotional Stories": ["कथा", "लीला", "गाथा", "श्री"],
  "Festival Specials": ["उत्सव", "दिवाली", "पर्व", "रंग"],
}

/** Stable 32-bit hash so a given id always yields the same poster. */
function hash(input: string): number {
  let value = 2166136261
  for (let index = 0; index < input.length; index += 1) {
    value ^= input.charCodeAt(index)
    value = Math.imul(value, 16777619)
  }
  return Math.abs(value)
}

/** Deterministic pseudo-random sequence seeded from the hash. */
function sequence(seed: number) {
  let state = seed || 1
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296
    return state / 4294967296
  }
}

function mandala(rand: () => number, accent: string): string {
  const petals = 12 + Math.floor(rand() * 8)
  const rings = [0.9, 0.66, 0.44, 0.24]
  let out = ""

  for (const [ringIndex, scale] of rings.entries()) {
    const radius = 300 * scale
    const opacity = (0.16 - ringIndex * 0.025).toFixed(3)
    out += `<circle cx="300" cy="300" r="${radius.toFixed(1)}" fill="none" stroke="${accent}" stroke-opacity="${opacity}" stroke-width="${(1.6 - ringIndex * 0.2).toFixed(2)}"/>`
  }

  // Petal ring — ellipses rotated around the centre.
  for (let index = 0; index < petals; index += 1) {
    const angle = (360 / petals) * index
    out += `<ellipse cx="300" cy="120" rx="26" ry="86" fill="${accent}" fill-opacity="0.07" transform="rotate(${angle.toFixed(1)} 300 300)"/>`
  }

  // Inner tick marks.
  for (let index = 0; index < petals * 2; index += 1) {
    const angle = (360 / (petals * 2)) * index
    out += `<rect x="299" y="46" width="2" height="22" fill="${accent}" fill-opacity="0.22" transform="rotate(${angle.toFixed(1)} 300 300)"/>`
  }

  return out
}

function rays(rand: () => number, accent: string): string {
  const count = 26 + Math.floor(rand() * 14)
  let out = `<circle cx="300" cy="330" r="58" fill="${accent}" fill-opacity="0.18"/>`
  out += `<circle cx="300" cy="330" r="94" fill="none" stroke="${accent}" stroke-opacity="0.16" stroke-width="1.4"/>`

  for (let index = 0; index < count; index += 1) {
    const angle = (360 / count) * index
    const length = 210 + rand() * 150
    out += `<polygon points="296,300 304,300 ${300 + rand() * 4} ,${330 - length}" fill="${accent}" fill-opacity="${(0.05 + rand() * 0.05).toFixed(3)}" transform="rotate(${angle.toFixed(1)} 300 330)"/>`
  }

  return out
}

function arch(rand: () => number, accent: string): string {
  // Temple silhouette: a central arch flanked by pillars and a finial.
  const archTop = 210 + rand() * 40
  let out = `<path d="M170 620 L170 ${archTop + 90} Q300 ${archTop - 130} 430 ${archTop + 90} L430 620 Z" fill="${accent}" fill-opacity="0.08"/>`
  out += `<path d="M170 620 L170 ${archTop + 90} Q300 ${archTop - 130} 430 ${archTop + 90} L430 620" fill="none" stroke="${accent}" stroke-opacity="0.22" stroke-width="1.6"/>`

  for (const x of [122, 452]) {
    out += `<rect x="${x}" y="${archTop + 40}" width="26" height="${580 - archTop}" fill="${accent}" fill-opacity="0.09"/>`
    out += `<rect x="${x - 8}" y="${archTop + 26}" width="42" height="16" fill="${accent}" fill-opacity="0.14"/>`
  }

  // Finial.
  out += `<circle cx="300" cy="${archTop - 152}" r="12" fill="${accent}" fill-opacity="0.3"/>`
  out += `<path d="M300 ${archTop - 138} L288 ${archTop - 104} L312 ${archTop - 104} Z" fill="${accent}" fill-opacity="0.22"/>`

  // Horizon steps.
  for (let index = 0; index < 3; index += 1) {
    out += `<rect x="${96 - index * 18}" y="${600 + index * 14}" width="${408 + index * 36}" height="10" fill="${accent}" fill-opacity="${(0.1 - index * 0.025).toFixed(3)}"/>`
  }

  return out
}

function rangoli(rand: () => number, accent: string): string {
  const arms = 8 + Math.floor(rand() * 5) * 2
  let out = ""

  for (const scale of [1, 0.72, 0.46]) {
    for (let index = 0; index < arms; index += 1) {
      const angle = (360 / arms) * index
      const distance = 240 * scale
      const radius = 10 * scale + 3
      out += `<circle cx="300" cy="${(300 - distance).toFixed(1)}" r="${radius.toFixed(1)}" fill="${accent}" fill-opacity="${(0.3 * scale).toFixed(3)}" transform="rotate(${angle.toFixed(1)} 300 300)"/>`
    }
  }

  // Connecting diamonds.
  for (let index = 0; index < arms; index += 1) {
    const angle = (360 / arms) * index
    out += `<path d="M300 160 L322 300 L300 440 L278 300 Z" fill="${accent}" fill-opacity="0.05" transform="rotate(${angle.toFixed(1)} 300 300)"/>`
  }

  out += `<circle cx="300" cy="300" r="34" fill="${accent}" fill-opacity="0.22"/>`
  return out
}

function bloom(rand: () => number, accent: string): string {
  const layers = 5 + Math.floor(rand() * 3)
  let out = ""

  for (let layer = 0; layer < layers; layer += 1) {
    const petals = 6 + layer * 2
    const radius = 70 + layer * 46
    for (let index = 0; index < petals; index += 1) {
      const angle = (360 / petals) * index + layer * 11
      out += `<path d="M300 ${300 - radius} Q${300 + radius * 0.42} ${300 - radius * 0.42} 300 300 Q${300 - radius * 0.42} ${300 - radius * 0.42} 300 ${300 - radius} Z" fill="${accent}" fill-opacity="${(0.075 - layer * 0.008).toFixed(3)}" transform="rotate(${angle.toFixed(1)} 300 300)"/>`
    }
  }

  out += `<circle cx="300" cy="300" r="26" fill="${accent}" fill-opacity="0.26"/>`
  return out
}

const MOTIFS: Record<MotifKind, (rand: () => number, accent: string) => string> = {
  mandala,
  rays,
  arch,
  rangoli,
  bloom,
}

export type PosterShape = "portrait" | "landscape" | "square"

const DIMENSIONS: Record<PosterShape, { width: number; height: number }> = {
  portrait: { width: 600, height: 900 },
  landscape: { width: 960, height: 540 },
  square: { width: 600, height: 600 },
}

/**
 * Builds the poster SVG for one item. `seed` is normally the Content id, so the
 * same item always renders the same artwork across every surface it appears on.
 */
function buildSvg(category: ContentCategory, seed: string, shape: PosterShape): string {
  const art = CATEGORY_ART[category]
  const seedHash = hash(seed)
  const palette = art.palettes[seedHash % art.palettes.length]
  const { width, height } = DIMENSIONS[shape]
  const rand = sequence(seedHash)

  // Vary the light source per item so a row of same-category cards still differs.
  const glowX = 26 + rand() * 48
  const glowY = 16 + rand() * 40
  const rotation = -12 + rand() * 24
  const motif = MOTIFS[art.motif](rand, palette.accent)
  const id = seedHash.toString(36)

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" preserveAspectRatio="xMidYMid slice">
<defs>
<linearGradient id="g${id}" x1="0" y1="0" x2="0.35" y2="1">
<stop offset="0" stop-color="${palette.mid}"/>
<stop offset="0.55" stop-color="${palette.base}"/>
<stop offset="1" stop-color="#080605"/>
</linearGradient>
<radialGradient id="h${id}" cx="${glowX}%" cy="${glowY}%" r="72%">
<stop offset="0" stop-color="${palette.accent}" stop-opacity="0.42"/>
<stop offset="0.45" stop-color="${palette.mid}" stop-opacity="0.18"/>
<stop offset="1" stop-color="${palette.base}" stop-opacity="0"/>
</radialGradient>
<radialGradient id="v${id}" cx="50%" cy="45%" r="78%">
<stop offset="0.5" stop-color="#000" stop-opacity="0"/>
<stop offset="1" stop-color="#000" stop-opacity="0.62"/>
</radialGradient>
<filter id="n${id}" x="0" y="0" width="100%" height="100%">
<feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch"/>
<feColorMatrix type="saturate" values="0"/>
</filter>
</defs>
<rect width="${width}" height="${height}" fill="url(#g${id})"/>
<rect width="${width}" height="${height}" fill="url(#h${id})"/>
<g transform="translate(${(width - 600) / 2} ${(height - 600) / 2}) rotate(${rotation.toFixed(1)} 300 300)">${motif}</g>
<rect width="${width}" height="${height}" fill="url(#v${id})"/>
<rect width="${width}" height="${height}" filter="url(#n${id})" opacity="0.055"/>
</svg>`
}

/** CSS `url(...)` value for use as a background-image. */
export function posterBackground(category: ContentCategory, seed: string, shape: PosterShape = "portrait"): string {
  const svg = buildSvg(category, seed, shape).replace(/\n/g, "")
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`
}

/** Bare data URI, for `<img src>` where a real image element is wanted. */
export function posterSrc(category: ContentCategory, seed: string, shape: PosterShape = "portrait"): string {
  const svg = buildSvg(category, seed, shape).replace(/\n/g, "")
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

/**
 * Devanagari accent for one item, rendered as HTML text by the card components
 * (never inside the SVG) so the page's own font stack applies. Varies per item
 * within its Category so rows don't repeat a single glyph.
 */
export function categoryGlyph(category: ContentCategory, seed: string): string {
  const pool = GLYPH_POOL[category]
  return pool[hash(seed) % pool.length]
}

/**
 * Category-level glyph, for surfaces representing the Category itself (browse
 * banners, tiles, swatches) rather than an individual item.
 */
export const CATEGORY_GLYPH: Record<ContentCategory, string> = {
  "Bhajans & Kirtan": "ॐ",
  "Discourses & Satsang": "श्री",
  "Aarti & Rituals": "दीप",
  "Devotional Stories": "कथा",
  "Festival Specials": "उत्सव",
}
