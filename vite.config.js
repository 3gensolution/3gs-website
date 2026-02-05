import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // Enable tree shaking
    treeshake: true,
    // Chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'gsap-vendor': ['gsap'],
          'lenis-vendor': ['lenis'],
        },
      },
    },
    // Minification (using esbuild - faster and built-in)
    minify: 'esbuild',
    // Source maps for production debugging
    sourcemap: false,
    // Chunk size warning limit
    chunkSizeWarningLimit: 1000,
  },
  // CSS optimization
  css: {
    devSourcemap: true,
  },
  // Optimize deps
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'gsap', 'lenis'],
  },
})
