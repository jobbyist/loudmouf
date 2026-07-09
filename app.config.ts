import { defineConfig } from "@tanstack/react-start";
import nitroPreset from "@tanstack/react-start/nitro/vercel";

export default defineConfig({
  server: {
    preset: nitroPreset,
    static: true,
  },
  vite: {},
});

