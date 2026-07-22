import { Chrome, Facebook } from "lucide-react"
import { Link } from "react-router-dom"

import { Button } from "@dhara/ui/button"
import { Input } from "@dhara/ui/input"
import { Switch } from "@dhara/ui/switch"
import { MobileAppShell, MobileBrandMark, MobileMain, PageScroll } from "@dhara/mobile"

/** Recreation of the "Login to your account" onboarding screen. */
export function LoginScreen() {
  return (
    <MobileAppShell>
      <MobileMain>
        <PageScroll className="items-center gap-8 pt-16 text-center">
          <MobileBrandMark size="lg" />
          <p className="-mt-4 text-xs text-muted-foreground">Where Spirituality Flows</p>

          <div className="flex w-full flex-col gap-3 text-left">
            <h1 className="text-center text-xl font-semibold text-foreground">Login to your account</h1>
            <Input placeholder="Email" type="email" />
            <Input placeholder="Password" type="password" />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <label className="flex items-center gap-2">
                <Switch />
                Remember me
              </label>
              <Link to="#" className="text-accent">
                Forgot password?
              </Link>
            </div>
            <Button size="lg" className="mt-2 w-full">
              Login
            </Button>
          </div>

          <div className="flex w-full items-center gap-3 text-xs text-muted-foreground">
            <span className="h-px flex-1 bg-border" />
            or continue with
            <span className="h-px flex-1 bg-border" />
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" aria-label="Continue with Google">
              <Chrome className="size-5" />
            </Button>
            <Button variant="outline" size="icon" aria-label="Continue with Facebook">
              <Facebook className="size-5" />
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">
            New here? <span className="font-medium text-accent">Create your Dhara Account</span>
          </p>
        </PageScroll>
      </MobileMain>
    </MobileAppShell>
  )
}
