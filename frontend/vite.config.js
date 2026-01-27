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
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove all console.log/warn
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.warn'] // Extra safety
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          redux: ['redux', 'react-redux', 'redux-persist'],
        }
      }
    }}
})