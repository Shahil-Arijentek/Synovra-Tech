import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/", // 🔥 MUST be "/" for Vercel
  
  build: {
    // Optimize chunk sizes
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'gsap-vendor': ['gsap', 'gsap/ScrollTrigger'],
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          'mui-vendor': ['@mui/material', '@mui/x-charts']
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
