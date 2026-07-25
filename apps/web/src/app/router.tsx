import type { ReactNode } from "react"
import { Navigate, createBrowserRouter } from "react-router-dom"

import { AppShell } from "@/components/layout/AppShell"
import { StudioShell } from "@/components/layout/StudioShell"
import { useAuth } from "@/lib/auth-context"
import { CategoryPage } from "@/pages/CategoryPage"
import { ContentDetailPage } from "@/pages/ContentDetailPage"
import { CreatorProfilePage } from "@/pages/CreatorProfilePage"
import { DekhoPage } from "@/pages/DekhoPage"
import { HomePage } from "@/pages/HomePage"
import { PlayingNowPage } from "@/pages/PlayingNowPage"
import { SearchPage } from "@/pages/SearchPage"
import { ShortsPage } from "@/pages/ShortsPage"
import { SunoPage } from "@/pages/SunoPage"
import { DownloadsPage } from "@/pages/settings/DownloadsPage"
import { NotificationsPage } from "@/pages/settings/NotificationsPage"
import { SettingsPage } from "@/pages/settings/SettingsPage"
import { SubscriptionsPage } from "@/pages/settings/SubscriptionsPage"
import { StudioAnalyticsPage } from "@/pages/studio/StudioAnalyticsPage"
import { StudioContentPage } from "@/pages/studio/StudioContentPage"
import { StudioHomePage } from "@/pages/studio/StudioHomePage"
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
      { index: true, element: <HomePage /> },
      { path: "suno", element: <SunoPage /> },
      { path: "playing-now", element: <PlayingNowPage /> },
      { path: "dekho", element: <DekhoPage /> },
      { path: "shorts", element: <ShortsPage /> },
      { path: "search", element: <SearchPage /> },
      { path: "content/:id", element: <ContentDetailPage /> },
      { path: "category/:id", element: <CategoryPage /> },
      { path: "creator/:id", element: <CreatorProfilePage /> },
      { path: "settings", element: <SettingsPage /> },
      { path: "settings/notifications", element: <NotificationsPage /> },
      { path: "settings/downloads", element: <DownloadsPage /> },
      { path: "settings/subscriptions", element: <SubscriptionsPage /> },
    ],
  },
  /**
   * Creator Studio — its own structural area with its own navigation, NOT nested
   * under AppShell, per NAVIGATION_MODEL.md ("Not the same navigation instance as
   * Main App") and INFORMATION_ARCHITECTURE.md.
   */
  {
    path: "/creator-studio",
    element: <StudioShell />,
    children: [
      { index: true, element: <StudioHomePage /> },
      { path: "content", element: <StudioContentPage /> },
      { path: "analytics", element: <StudioAnalyticsPage /> },
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
