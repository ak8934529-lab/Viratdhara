import { Suspense, lazy } from "react"
import { createBrowserRouter } from "react-router-dom"

const GalleryPage = lazy(() => import("@/pages/GalleryPage").then((m) => ({ default: m.GalleryPage })))
const HomeScreen = lazy(() => import("@/pages/screens/HomeScreen").then((m) => ({ default: m.HomeScreen })))
const LoginScreen = lazy(() => import("@/pages/screens/LoginScreen").then((m) => ({ default: m.LoginScreen })))
const PanditBookingScreen = lazy(() =>
  import("@/pages/screens/PanditBookingScreen").then((m) => ({ default: m.PanditBookingScreen }))
)
const PlayerScreen = lazy(() => import("@/pages/screens/PlayerScreen").then((m) => ({ default: m.PlayerScreen })))

function withSuspense(node: React.ReactElement) {
  return <Suspense fallback={<div className="p-8 text-sm text-muted-foreground">Loading…</div>}>{node}</Suspense>
}

export const router = createBrowserRouter([
  { path: "/", element: withSuspense(<GalleryPage />) },
  { path: "/screens/home", element: withSuspense(<HomeScreen />) },
  { path: "/screens/login", element: withSuspense(<LoginScreen />) },
  { path: "/screens/pandit-booking", element: withSuspense(<PanditBookingScreen />) },
  { path: "/screens/player", element: withSuspense(<PlayerScreen />) },
  {
    path: "*",
    element: (
      <div className="flex h-full items-center justify-center p-8 text-sm text-muted-foreground">
        Screen not built yet in this pass.
      </div>
    ),
  },
])
