import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base:'./',
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://www.hpa.gov.tw/wf',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  }
})
