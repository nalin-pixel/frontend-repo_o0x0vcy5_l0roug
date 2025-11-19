import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Simplified config to ensure dev server serves modules correctly on public preview hosts
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    strictPort: true,
    // Let Vite infer HMR settings from the public URL
    hmr: true,
    // Remove custom allowedHosts/watch toggles that could block module requests
    cors: true
  }
})
