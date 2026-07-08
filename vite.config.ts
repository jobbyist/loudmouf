// @lovable.dev/vite-tanstack-config already handles most plugins
// Do NOT add duplicate core plugins (tanstackStart, viteReact, tailwindcss, etc.)
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" }, // Existing configuration
  },

  // Base path: Use '/' for custom domains (CNAME)
  base: '/',

  build: {
    outDir: 'dist',                    // Standard output for GitHub Pages / Vercel
    sourcemap: true,                   // Generate source maps (helpful for debugging production issues)
    minify: 'esbuild',                 // Explicitly enable minification (default is esbuild; can use 'terser' if preferred)

    // Production-only optimizations
    rollupOptions: {
      output: {
        // Manual chunking / asset handling (optional but useful for large apps)
        manualChunks: {
          vendor: ['react', 'react-dom'], // Example: separate React vendor chunk
        },
        // Asset file naming for better caching
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'assets/css/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },

    // Additional production settings
    target: 'es2022',                  // Modern target for better tree-shaking
    chunkSizeWarningLimit: 1000,       // Adjust warning threshold for large chunks
  },

  // Optional: Environment-specific config
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  },

  // Server config for local dev (custom domain not relevant here)
  server: {
    port: 5173,
    strictPort: true,
  },
});