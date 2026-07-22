import type { ReactNode } from "react"
import { Navigate, createBrowserRouter } from "react-router-dom"

import { AppShell } from "@/components/layout/AppShell"
import { useAuth } from "@/lib/auth-context"
import { PlaceholderPage } from "@/pages/PlaceholderPage"
import { LoginPage } from "@/pages/auth/LoginPage"
import { OnboardingFormatPage } from "@/pages/auth/OnboardingFormatPage"
import { OnboardingLanguagePage } from "@/pages/auth/OnboardingLanguagePage"
import { SignupPage } from "@/pages/auth/SignupPage"
import { SplashPage } from "@/pages/auth/SplashPage"

/** "/" is Splash (unauthenticated) or the Main App shell (authenticated) — same route, per URL_STRUCTURE.md. */
function RootRoute() {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <AppShell /> : <SplashPage />
}

/** Auth Area pages redirect to "/" once already authenticated. */
function GuestOnly({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <Navigate to="/" replace /> : <>{children}</>
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRoute />,
    children: [
      { index: true, element: <PlaceholderPage title="Home" note="Content Discovery not yet built in apps/web." /> },
      { path: "suno", element: <PlaceholderPage title="Suno" note="Content Discovery not yet built in apps/web." /> },
      {
        path: "playing-now",
        element: <PlaceholderPage title="Playing Now" note="Video Player not yet built in apps/web." />,
      },
      { path: "dekho", element: <PlaceholderPage title="Dekho" note="Content Discovery not yet built in apps/web." /> },
      { path: "shorts", element: <PlaceholderPage title="Shorts" note="Content Discovery not yet built in apps/web." /> },
      { path: "search", element: <PlaceholderPage title="Search" note="Search not yet built in apps/web." /> },
      { path: "settings", element: <PlaceholderPage title="Settings" note="User Settings not yet built in apps/web." /> },
    ],
  },
  { path: "/login", element: <GuestOnly><LoginPage /></GuestOnly> },
  { path: "/signup", element: <GuestOnly><SignupPage /></GuestOnly> },
  { path: "/onboarding/language", element: <OnboardingLanguagePage /> },
  { path: "/onboarding/format", element: <OnboardingFormatPage /> },
  {
    path: "*",
    element: (
      <div className="flex h-svh items-center justify-center p-8 text-sm text-muted-foreground">
        Page not found.
      </div>
    ),
  },
])
