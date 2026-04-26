import type { UserInfoList } from "@/apis/userlist/UserList.d"
import { defineStore } from "pinia"
import { ref } from "vue"
const useUserListStore = defineStore("userList", () => {
  const userList = ref<UserInfoList[]>([])
  const total = ref<number>(0)
  return {
    userList,
    total,
  }
})
export default useUserListStore
