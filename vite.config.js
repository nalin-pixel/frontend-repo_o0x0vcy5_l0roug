import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configured to work on public preview hosts (e.g., *.modal.host)
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    strictPort: true,
    allowedHosts: true,
    cors: true,
    hmr: true,
  },
  preview: {
    port: 3000,
    host: true,
    strictPort: true,
    cors: true,
  }
})
