import { useState } from "react"
import { Facebook, Chrome } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

import { Button } from "@dhara/ui/button"
import { Input } from "@dhara/ui/input"
import { AuthLayout } from "@/components/auth/AuthLayout"
import { BrandMark } from "@/components/layout/BrandMark"

/**
 * docs/03_FEATURES/Authentication/UI.md + SPEC.md — Signup.
 * password_minimum: 8-128 chars, per VALIDATION_REGISTRY.md (Commit 18).
 */
export function SignupPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)

  function handleSignup() {
    if (!email.includes("@")) {
      setError("Enter a valid email address.")
      return
    }
    if (password.length < 8 || password.length > 128) {
      setError("Password must be 8–128 characters.")
      return
    }
    setError(null)
    // Not authenticated yet — onboarding (language/format) still needs to run;
    // OnboardingFormatPage's Continue is what actually calls login().
    navigate("/onboarding/language")
  }

  function handleSocialSignup() {
    // Demo only — no real social auth wired up (AUTHENTICATION_API.md is draft).
    navigate("/onboarding/language")
  }

  return (
    <AuthLayout>
      <div className="flex flex-col items-center gap-6 text-center">
        <BrandMark />
        <h1 className="text-xl font-semibold">Step into the Dhara</h1>

        <div className="flex w-full flex-col gap-2.5">
          <Button variant="outline" onClick={handleSocialSignup} className="w-full justify-center gap-2">
            <Chrome className="size-4.5" /> Continue with Google
          </Button>
          <Button variant="outline" onClick={handleSocialSignup} className="w-full justify-center gap-2">
            <Facebook className="size-4.5" /> Continue with Facebook
          </Button>
        </div>

        <div className="flex w-full items-center gap-3 text-xs text-muted-foreground">
          <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
        </div>

        <div className="flex w-full flex-col gap-3 text-left">
          <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error ? <p className="text-xs text-destructive">{error}</p> : null}
        </div>

        <Button size="lg" className="w-full" onClick={handleSignup}>
          Get Started
        </Button>

        <p className="text-xs text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-accent">
            Log in
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}
