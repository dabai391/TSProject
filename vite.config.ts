import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
//自动导入 Element Plus 组件库
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: ["vue", "vue-router", "pinia", "vue-router", "pinia"],
      dts: "auto-imports.d.ts",
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
    }),
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: "sass", // 自动导入组件样式的同时使用 sass
        }),
      ],
      dts: "src/components.d.ts",
    }),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
      symbolId: "icon-[dir]-[name]",
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        // 自动注入公共 SCSS 变量和混合宏
        additionalData: `@use "@/style/_variables.scss" as *;`,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
})
