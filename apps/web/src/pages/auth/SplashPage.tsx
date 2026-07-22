import { Link } from "react-router-dom"

import { Button } from "@dhara/ui/button"
import { AuthLayout } from "@/components/auth/AuthLayout"
import { BrandMark } from "@/components/layout/BrandMark"

/** docs/03_FEATURES/Authentication/UI.md — Splash screen. */
export function SplashPage() {
  return (
    <AuthLayout>
      <div className="flex flex-col items-center gap-3 text-center">
        <BrandMark size="lg" />
        <p className="text-sm text-muted-foreground">Where Spirituality Flows</p>
        <p className="mt-2 text-xs text-muted-foreground">
          A sacred digital space to listen, learn, and live devotion daily.
        </p>
        <Button asChild size="lg" className="mt-6 w-full">
          <Link to="/signup">Begin your Dhara</Link>
        </Button>
      </div>
    </AuthLayout>
  )
}
