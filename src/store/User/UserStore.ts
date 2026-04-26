import { defineStore } from "pinia"
import { ref } from "vue"
import type UserInfoType from "./User.d"
const useUserStore = defineStore(
  "user",
  () => {
    const userInfo = ref<UserInfoType>({} as UserInfoType)
    const setUserInfo = (data: UserInfoType | { user: UserInfoType }) => {
      userInfo.value = (data as { user: UserInfoType }).user || (data as UserInfoType)
    }
    const clearUserInfo = () => {
      userInfo.value = {} as UserInfoType
    }
    return {
      userInfo,
      setUserInfo,
      clearUserInfo,
    }
  },
  {
    persist: true,
  },
)
export default useUserStore
