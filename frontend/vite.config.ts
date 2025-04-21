import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    allowedHosts: ["chat-ai-app-tunnel-xsbpohc4.devinapps.com", "chat-ai-app-tunnel-og4jydby.devinapps.com", "chat-ai-app-tunnel-6mtjwxqd.devinapps.com", "chat-ai-app-tunnel-x8yxjqqj.devinapps.com", "chat-ai-app-tunnel-xoajfe5g.devinapps.com", "chat-ai-app-tunnel-azk4wody.devinapps.com", "chat-ai-app-tunnel-b2s3kv4a.devinapps.com"],
    host: "0.0.0.0",
    strictPort: true,
  },
})

