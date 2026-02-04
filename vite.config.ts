import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/",
  
  build: {
    sourcemap: false,
    
    // Optimize chunk sizes
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'gsap-vendor': ['gsap', 'gsap/ScrollTrigger'],
          'mui-vendor': ['@mui/x-charts', '@emotion/react', '@emotion/styled']
        }
      },
      input: {
        main: './index.html'
      }
    },
    // Optimize minification
    minify: 'esbuild', // Use esbuild for faster builds
    // Copy service worker to dist
    copyPublicDir: true
  },
  
  // Optimize asset handling for webp frames
  assetsInclude: ['**/*.webp', '**/*.mp4', '**/*.webm'],
  
  // Optimize dependencies
  optimizeDeps: {
    include: ['gsap', 'gsap/ScrollTrigger', 'react', 'react-dom']
  }
});
