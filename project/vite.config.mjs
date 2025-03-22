import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import history from 'connect-history-api-fallback'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": "http://localhost:3000",
      "/auth": "http://localhost:3000",
      "/share": "http://localhost:3000",
    },
    configureServer: (server) => {
      server.middlewares.use(
        history({
          // Optionally add options here, e.g., verbose: true
        })
      )
    }
  }
})
