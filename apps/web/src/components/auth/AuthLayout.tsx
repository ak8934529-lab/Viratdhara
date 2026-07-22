import type { ReactNode } from "react"

import { BackgroundBloom } from "@/components/glass/BackgroundBloom"

/**
 * Auth Area shell — no top bar, no bottom/side nav, per
 * docs/01_ARCHITECTURE/INFORMATION_ARCHITECTURE.md ("Auth Area has no
 * persistent chrome"). A single centered column at every breakpoint.
 */
export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-svh items-center justify-center p-4">
      <BackgroundBloom />
      <div className="w-full max-w-sm">{children}</div>
    </div>
  )
}
