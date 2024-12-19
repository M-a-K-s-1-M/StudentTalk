import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sass from 'sass'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  css: {
    preprocessorOptions: {
      scss: {
        implementation: sass,
      },
    },
  },

  server: {
    watch: {
      usePolling: true,
    },
    host: true,
    strictPort: true,
    port: 5173
  }
})
