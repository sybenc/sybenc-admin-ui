import * as path from "node:path";
import vue from "@vitejs/plugin-vue"
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
import {defineConfig} from "vite"
import tailwind from "tailwindcss"
import autoprefixer from "autoprefixer"

export default defineConfig({
    css: {
        postcss: {
            plugins: [tailwind(), autoprefixer()],
        },
    },
    plugins: [
        vue(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),],
    base: './',
    // Add the code below to the vite.config.ts so your app can resolve paths without error
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
})