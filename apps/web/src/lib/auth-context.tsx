import { createContext, useCallback, useContext, useEffect, useState } from "react"
import type { ReactNode } from "react"

/**
 * DEMO-ONLY client-side session flag. AUTHENTICATION_API.md is still `draft`
 * — no real backend/session exists yet (docs/03_FEATURES/Authentication/API.md).
 * This lets the Auth Area → onboarding → Main App flow be built and demoed
 * end-to-end now; replace with real session handling once 04_BACKEND exists.
 * Never treat this as real authentication/security.
 */
const STORAGE_KEY = "viratdhara_demo_session"

interface AuthContextValue {
  isAuthenticated: boolean
  login: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem(STORAGE_KEY) === "true")

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(isAuthenticated))
  }, [isAuthenticated])

  const login = useCallback(() => setIsAuthenticated(true), [])
  const logout = useCallback(() => setIsAuthenticated(false), [])

  return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
