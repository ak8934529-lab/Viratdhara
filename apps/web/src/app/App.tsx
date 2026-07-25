import { RouterProvider } from "react-router-dom"

import { AuthProvider } from "@/lib/auth-context"
import { PlayerProvider } from "@/lib/player-context"
import { router } from "./router"

export function App() {
  return (
    <AuthProvider>
      <PlayerProvider>
        <RouterProvider router={router} />
      </PlayerProvider>
    </AuthProvider>
  )
}

export default App
