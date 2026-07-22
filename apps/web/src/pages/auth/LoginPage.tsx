import { useState } from "react"
import { Chrome, Facebook } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

import { Button } from "@dhara/ui/button"
import { Input } from "@dhara/ui/input"
import { Switch } from "@dhara/ui/switch"
import { AuthLayout } from "@/components/auth/AuthLayout"
import { BrandMark } from "@/components/layout/BrandMark"
import { useAuth } from "@/lib/auth-context"

/** docs/03_FEATURES/Authentication/UI.md + SPEC.md — Login. No onboarding repeat. */
export function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [remember, setRemember] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleLogin() {
    if (!email || !password) {
      setError("Enter your email and password.")
      return
    }
    setError(null)
    login()
    navigate("/")
  }

  return (
    <AuthLayout>
      <div className="flex flex-col items-center gap-6 text-center">
        <BrandMark />
        <h1 className="text-xl font-semibold">Login to your account</h1>

        <div className="flex w-full flex-col gap-3 text-left">
          <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error ? <p className="text-xs text-destructive">{error}</p> : null}
          <label className="flex items-center gap-2 text-xs text-muted-foreground">
            <Switch checked={remember} onCheckedChange={setRemember} /> Remember me
          </label>
        </div>

        <Button size="lg" className="w-full" onClick={handleLogin}>
          Login
        </Button>

        <div className="flex w-full items-center gap-3 text-xs text-muted-foreground">
          <span className="h-px flex-1 bg-border" /> or continue with{" "}
          <span className="h-px flex-1 bg-border" />
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" aria-label="Continue with Google" onClick={login}>
            <Chrome className="size-5" />
          </Button>
          <Button variant="outline" size="icon" aria-label="Continue with Facebook" onClick={login}>
            <Facebook className="size-5" />
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          New here?{" "}
          <Link to="/signup" className="font-medium text-accent">
            Create your Dhara Account
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}
