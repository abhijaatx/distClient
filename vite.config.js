import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true, // Forces the app to fail if 5173 is already in use
    // Allows the server to be accessible externally
    host: true,

    // This resolves the "Host is not allowed" error
    // 'true' allows all hosts, which is ideal for changing ngrok URLs
    allowedHosts: true,

    hmr: {
      // Essential for ngrok: ensures the HMR connection 
      // uses the tunnel's secure WebSocket (wss)
      clientPort: 443,
      protocol: 'wss',
      overlay: false
    },

    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})