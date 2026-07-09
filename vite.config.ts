import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import path from "path";

export default defineConfig({
  tanstackStart: {
    server: { 
      entry: "server",
      preset: "vercel"
    },
    client: {
      entry: "./src/start.ts"
    }
  },

  base: process.env.NODE_ENV === 'production' ? '/' : '/',

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  publicDir: "public",

  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg', '**/*.webp', '**/*.mp4', '**/*.webm'],
  build: {
    outDir: ".output/public",
    sourcemap: true,
    minify: "esbuild",
    target: "es2022",
    chunkSizeWarningLimit: 1000,
    emptyOutDir: true,
    assetsDir: "assets",
    assetsDir: "_assets",
    copyPublicDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          router: ["@tanstack/react-router", "@tanstack/react-start"],
        },
        assetFileNames: (assetInfo) => {
            return "_assets/css/[name]-[hash][extname]";
            return "assets/css/[name]-[hash][extname]";
          }
            return "_assets/images/[name]-[hash][extname]";
            return "assets/images/[name]-[hash][extname]";
          }
            return "_assets/videos/[name]-[hash][extname]";
            return "assets/videos/[name]-[hash][extname]";
          return "_assets/[name]-[hash][extname]";
          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },

  define: {
    "process.env.NODE_ENV": JSON.stringify(
      process.env.NODE_ENV || "development"
    ),
    "import.meta.env.BASE_URL": JSON.stringify(
      process.env.BASE_URL || "/"
    ),
  },

  server: {
    port: 5173,
    strictPort: true,
    fs: {
      allow: [".."],
    },
  },

  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "@tanstack/react-router",
      "@tanstack/react-start",
    ],
    exclude: ["@lovable.dev/vite-tanstack-config"],
  },

  ssr: {
    noExternal: ["@tanstack/react-start"],
  },
});