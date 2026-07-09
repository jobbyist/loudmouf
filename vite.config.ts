// @lovable.dev/vite-tanstack-config already handles most plugins
// Do NOT add duplicate core plugins (tanstackStart, viteReact, tailwindcss, etc.)
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },

  // Base path: '/' for custom domain (app.loudmouf.co.za)
  base: '/',

  build: {
    outDir: 'dist',
    sourcemap: true,           // Enable source maps for debugging
    minify: 'esbuild',         // Fast and effective minification

    rollupOptions: {
      output: {
        // Separate vendor chunk for better caching
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
        // Better asset naming for caching
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'assets/css/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },

    target: 'es2022',
    chunkSizeWarningLimit: 1000,
  },

  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  },

  server: {
    port: 5173,
    strictPort: true,
  },
});