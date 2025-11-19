import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Dev server configured to work on public preview hosts (e.g., *.modal.host)
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    strictPort: true,
    // Allow any external preview host (disables host checking)
    allowedHosts: true,
    // Enable CORS and HMR
    cors: true,
    hmr: true,
  }
})
