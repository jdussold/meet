import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/meet/",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      includeAssets: ["favicon.ico", "meet-app-192.png", "meet-app-512.png"],
      manifest: {
        name: "Meet",
        short_name: "Meet",
        start_url: ".",
        display: "standalone",
        theme_color: "#0bbe35",
        background_color: "#ffffff",
        icons: [
          {
            src: "favicon.ico",
            sizes: "64x64 32x32 24x24 16x16",
            type: "image/x-icon",
            purpose: "any maskable",
          },
          {
            src: "meet-app-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "meet-app-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,json}"],
        navigateFallback: "/meet/index.html",
      },
    }),
  ],
  server: { port: 3000, open: true },
  build: { outDir: "dist", sourcemap: true },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setupTests.js"],
    css: false,
  },
});
