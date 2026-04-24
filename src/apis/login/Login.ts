import http from "@/util/http"
interface LoginType {
  username: string
  password: string
}
export const loginApi = (data: LoginType) => {
  return http({
    url: "/login",
    method: "post",
    data,
  })
}
