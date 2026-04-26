import http from "@/util/http"
import type { ResUserList, UpdateUserInfoList, UserInfoList } from "./UserList.d"
//获取全部用户列表
export const getAllUserListApi = () => {
  return http<ResUserList>({
    url: "/users/init",
    method: "get",
  })
}
// 获取用户列表
export const getUserListApi = (params: { page?: number; pageSize?: number } = {}) => {
  return http<ResUserList>({
    url: "/users",
    method: "get",
    params: {
      page: params.page ?? 1,
      pageSize: params.pageSize ?? 20,
    },
  })
}
// 修改用户信息
export const updateUserListApi = (id: number, data: UpdateUserInfoList) => {
  return http<ResUserList>({
    url: `/users/${id}`,
    method: "put",
    data,
  })
}
// 删除用户
export const deleteUserListApi = (id: number) => {
  return http<ResUserList>({
    url: `/users/${id}`,
    method: "delete",
  })
}
//新增用户
export const addUserListApi = (data: UserInfoList) => {
  return http<ResUserList>({
    url: "/users",
    method: "post",
    data,
  })
}
// 新增批量删除接口
export const batchDeleteUsersApi = (ids: string[]) => {
  return http({
    url: "/users/batch-delete",
    method: "POST",
    data: { ids },
  })
}
