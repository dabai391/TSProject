import { createRouter, createWebHistory } from "vue-router"
const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/home/index.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
    component: () => import("@/views/notfound/index.vue"),
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes: routes as import("vue-router").RouteRecordRaw[],
  scrollBehavior() {
    return {
      top: 0,
      left: 0,
    }
  },
})
export default router
