import SvgIcon from "@/components/SvgIcon.vue"
import type { App, Component } from "vue"
const components: { [name: string]: Component } = { SvgIcon }
export const componentSvgIcon = {
  install(app: App) {
    Object.keys(components).forEach((key: string) => {
      app.component(key, components[key])
    })
  },
}
