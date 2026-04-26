export interface ResUserList {
  total: number
  pageSize: number
  page: number
  list: UserInfoList[]
}
export interface UserInfoList {
  id: string
  name: string
  email: string
  role: string
  department: string
  phone: string
  status: number
  createTime: string
  avatar: string
}
export interface UpdateUserInfoList {
  name: string
  email: string
  role: string
  department: string
  phone: string
  status: number
}
