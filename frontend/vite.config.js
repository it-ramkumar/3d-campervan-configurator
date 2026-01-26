import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

export default defineConfig({
  plugins: [
    react(),
    cssInjectedByJsPlugin(), // ✅ CSS ko HTML mein inline kar dega taake LCP fast ho
  ],
  define: {
    global: 'window',
  },
  build: {
    // Agar aapka CSS size 21KB hai, to ye usay bundle ka hissa bana dega
    cssCodeSplit: false,
  }
})