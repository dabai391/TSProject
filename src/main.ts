import { createApp } from "vue"
// 引入公共样式
import "@/style/common.scss"
import App from "./App.vue"
// 引入 Element Plus 组件库,且语言为中文
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
import zhCn from "element-plus/es/locale/lang/zh-cn"
// 引入 SVG 图标组件
import "virtual:svg-icons-register"
// 引入自定义组件
import { componentSvgIcon } from "@/hook/component"
// 引入 Pinia 状态管理库
import { createPinia } from "pinia"
//pinia持久化插件
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"
// 引入路由
import router from "@/router"
// 引入 Element Plus 图标组件
import * as ElementPlusIconsVue from "@element-plus/icons-vue"
// 创建 Pinia 实例
const pinia = createPinia()
// 注册持久化插件
pinia.use(piniaPluginPersistedstate)
// 创建 Vue 实例
const app = createApp(App)
// 注册 Element Plus 组件库,且语言为中文
app.use(ElementPlus, {
  locale: zhCn,
})
// 注册自定义组件
app.use(componentSvgIcon)
// 注册 Pinia 实例
app.use(pinia)
// 注册路由
app.use(router)
// 注册 Element Plus 图标组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// 挂载应用到 #app 元素
app.mount("#app")
