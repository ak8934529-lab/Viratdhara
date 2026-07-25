import { Check, Link2, Share2 } from "lucide-react"
import { useState } from "react"

import { Button } from "@dhara/ui/button"

export interface ShareButtonProps {
  /** Content id — the shared URL is `/content/:id` per Sharing/SPEC.md. */
  contentId: string
  title: string
  /**
   * "icon" — the bare ghost icon button (`Sharing/COMPONENTS.md`: `Button`
   * variant="ghost" size="icon"). "labelled" — icon with a caption beneath,
   * as the Shorts overlay rail shows it in the mobile design.
   */
  variant?: "icon" | "labelled"
}

/**
 * The single share affordance, per docs/03_FEATURES/Sharing/UI.md. Looks and
 * behaves identically everywhere it appears — full player detail area and
 * Content-card action areas. No screen invents its own placement.
 *
 * Mechanism per SPEC.md: `navigator.share`, falling back to copy-link where
 * unsupported (common on desktop, hence UI.md's Wide-breakpoint note).
 * COMPONENTS.md: "No new component is built for the share icon itself" — this
 * is a thin wrapper over `Button`, not a new primitive.
 *
 * BEYOND SPEC (flagged): the transient "Copied" confirmation. Sharing/STATES.md
 * documents share as fire-and-forget with no states, and no toast/snackbar
 * pattern exists yet (UX_PATTERNS.md Future Scope). A copy action with zero
 * feedback is indistinguishable from a dead control, so a minimal inline
 * confirmation is used instead of inventing a toast system.
 */
export function ShareButton({ contentId, title, variant = "icon" }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)

  const canNativeShare = typeof navigator !== "undefined" && typeof navigator.share === "function"

  async function handleShare() {
    const url = `${window.location.origin}/content/${contentId}`

    if (canNativeShare) {
      try {
        await navigator.share({ title, url })
      } catch {
        // User dismissed the native sheet, or it failed — fire-and-forget, nothing to report.
      }
      return
    }

    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard unavailable (insecure context / denied permission) — no error UI is specified.
    }
  }

  const Icon = copied ? Check : canNativeShare ? Share2 : Link2
  const label = copied ? "Copied" : canNativeShare ? "Share" : "Copy link"

  if (variant === "labelled") {
    return (
      <button
        type="button"
        onClick={handleShare}
        className="flex flex-col items-center gap-1 text-[11px] font-medium text-foreground/90"
      >
        <span className="flex size-10 items-center justify-center rounded-full bg-background/40 backdrop-blur-md">
          <Icon className="size-5" />
        </span>
        {label}
      </button>
    )
  }

  return (
    <Button variant="ghost" size="icon" onClick={handleShare} aria-label={label} title={label}>
      <Icon className="size-5" />
    </Button>
  )
}
