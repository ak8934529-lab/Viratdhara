import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  envDir: path.resolve(__dirname),
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@dhara/utils": path.resolve(__dirname, "../../packages/utils/src/index.ts"),
      "@dhara/constants": path.resolve(__dirname, "../../packages/constants/src/index.ts"),
      "@dhara/ui": path.resolve(__dirname, "../../packages/ui/src"),
    },
  },
  server: {
    port: Number(process.env.PORT) || 5191,
  },
})
