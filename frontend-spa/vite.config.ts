import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: process.env.VITE_API_BASE || 'http://localhost:3000',
        changeOrigin: true,
      },
      '/uploads': {
        target: process.env.VITE_API_BASE || 'http://localhost:3000',
        changeOrigin: true,
      },
      '/health': {
        target: process.env.VITE_API_BASE || 'http://localhost:3000',
        changeOrigin: true,
      },
      '/metrics': {
        target: process.env.VITE_API_BASE || 'http://localhost:3000',
        changeOrigin: true,
      },
      '/docs': {
        target: process.env.VITE_API_BASE || 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: '../frontend/dist',
    emptyOutDir: true,
  },
});
