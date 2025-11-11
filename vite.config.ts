import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React libs
          react: ['react', 'react-dom'],
          // Animation
          motion: ['framer-motion'],
          // Three.js and ecosystem
          three: ['three'],
          r3f: ['@react-three/fiber', '@react-three/drei'],
          // Maps (removed react-map-gl as it is unused to avoid resolution issues)
          mapbox: ['mapbox-gl'],
          // Icons
          icons: ['lucide-react'],
        },
      },
    },
    // Relax size warnings a bit due to 3D libs while keeping an eye on actual sizes
    chunkSizeWarningLimit: 1200,
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
