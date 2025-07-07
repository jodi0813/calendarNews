import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base:'./',
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://eunomics.net',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  }
})
