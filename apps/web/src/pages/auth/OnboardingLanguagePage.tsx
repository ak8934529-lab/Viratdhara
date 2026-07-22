import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { Button } from "@dhara/ui/button"
import { AuthLayout } from "@/components/auth/AuthLayout"
import { BrandMark } from "@/components/layout/BrandMark"

const LANGUAGES = ["Hindi", "English", "Punjabi", "Tamil", "Telugu", "Marathi", "Gujarati", "Bengali", "Kannada"]

/** docs/03_FEATURES/Authentication/UI.md — Onboarding, language selection. */
export function OnboardingLanguagePage() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState("English")

  return (
    <AuthLayout>
      <div className="flex flex-col items-center gap-6 text-center">
        <BrandMark />
        <h1 className="text-xl font-semibold">Select the Language of Your Devotion</h1>

        <div className="grid w-full grid-cols-3 gap-2">
          {LANGUAGES.map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => setSelected(lang)}
              className={
                lang === selected
                  ? "rounded-xl border border-accent bg-accent/20 px-2 py-2.5 text-xs font-semibold text-foreground"
                  : "rounded-xl border border-border/60 px-2 py-2.5 text-xs font-medium text-muted-foreground"
              }
            >
              {lang}
            </button>
          ))}
        </div>

        <Button size="lg" className="w-full" onClick={() => navigate("/onboarding/format")}>
          Continue
        </Button>
      </div>
    </AuthLayout>
  )
}
