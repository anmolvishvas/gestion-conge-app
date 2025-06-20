import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["lucide-react"],
  },
  server: {
    proxy: {
      "/api": {
        target: "https://localhost:8000",
        // target: "https://gestion-conge.devanmol.tech",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
