import axios from "axios"
import useUserStore from "@/store/User/UserStore"
import { ElMessage } from "element-plus"
import { useRouter } from "vue-router"
const router = useRouter()
const http = axios.create({
  baseURL: import.meta.env.VITE_SERVE + import.meta.env.VITE_APP_BASE_API,
  timeout: 15000,
})
// 配置请求拦截器
http.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    const userStore = useUserStore()
    const token = userStore.userInfo.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)
// 配置响应拦截器
http.interceptors.response.use(
  (response) => {
    // 对响应数据状态码为200的处理，返回数据
    if (response.data.code >= 200 && response.data.code < 300) {
      return response.data
    }
    return response
  },
  (error) => {
    //根据不同的状态码进行处理
    if (error.response.status === 401) {
      // 处理未授权错误
      ElMessage.error({
        type: "error",
        message: "未授权，请重新登录",
      })
      // 清除用户信息
      useUserStore().clearUserInfo()
      // 跳转到登录页
      router.push({ name: "login" })
    }
    return Promise.reject(error)
  },
)
// 导出 axios 实例
export default http
