import { defineNitroConfig } from "nitropack/config";

export default defineNitroConfig({
  preset: "vercel",
  serveStatic: true,
  publicAssets: [
    {
      baseURL: "/",
      dir: "public",
      maxAge: 60 * 60 * 24 * 7
    }
  ]
});

