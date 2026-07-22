import { useState } from "react"
import { Radio, Video } from "lucide-react"
import { useNavigate } from "react-router-dom"

import { Button } from "@dhara/ui/button"
import { AuthLayout } from "@/components/auth/AuthLayout"
import { BrandMark } from "@/components/layout/BrandMark"
import { OptionCard } from "@/components/auth/OptionCard"
import { useAuth } from "@/lib/auth-context"

/**
 * docs/03_FEATURES/Authentication/UI.md — Onboarding, format selection.
 * Only 2 options: the reviewed design's third "Booking" option is hidden
 * for V1 (resolved, Commit 18 — docs/03_FEATURES/Authentication/EDGE_CASES.md).
 */
export function OnboardingFormatPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [selected, setSelected] = useState("suno-dekho")

  return (
    <AuthLayout>
      <div className="flex flex-col items-center gap-6 text-center">
        <BrandMark />
        <h1 className="text-xl font-semibold">Select the Format for Darshan</h1>

        <div className="flex w-full flex-col gap-3">
          <OptionCard
            icon={<Radio className="size-5" />}
            title="Suno Dekho"
            subtitle="Listen to or watch devotional content"
            active={selected === "suno-dekho"}
            onClick={() => setSelected("suno-dekho")}
          />
          <OptionCard
            icon={<Video className="size-5" />}
            title="Live Darshan"
            subtitle="View real-time streams of temples"
            active={selected === "live-darshan"}
            onClick={() => setSelected("live-darshan")}
          />
        </div>

        <Button
          size="lg"
          className="w-full"
          onClick={() => {
            login()
            navigate("/")
          }}
        >
          Continue
        </Button>
      </div>
    </AuthLayout>
  )
}
