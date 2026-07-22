/**
 * Fixed background gradient bloom every glass panel sits above
 * (docs/02_DESIGN/SURFACE_SYSTEM.md depth ordering, step 1). Rendered once,
 * at the app root.
 */
export function BackgroundBloom() {
  return <div className="bg-bloom" aria-hidden />
}
