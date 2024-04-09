import * as path from "node:path";
import vue from "@vitejs/plugin-vue"
import { defineConfig } from "vite"

import tailwind from "tailwindcss"
import autoprefixer from "autoprefixer"

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  plugins: [vue()],
  base: './',
  // Add the code below to the vite.config.ts so your app can resolve paths without error
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})