<template>
  <div class="right-drawer">
    <el-drawer v-model="drawer" resizable title="编辑用户">
      <el-form type="form" :model="form" :rules="rules" ref="formRef">
        <el-form-item label="用户姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="角&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;色" prop="role">
          <el-input v-model="form.role" placeholder="请输入角色" />
        </el-form-item>
        <el-form-item label="所属部门" prop="department">
          <el-input v-model="form.department" placeholder="请输入部门" />
        </el-form-item>
        <el-form-item label="手&nbsp;&nbsp;机&nbsp;&nbsp;号" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号" />
        </el-form-item>
      </el-form>
      <div class="login-buttons">
        <button @click="submitForm">提交</button>
        <button @click="resetForm" class="reset">取消</button>
      </div>
    </el-drawer>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue"
import type { UserInfoList, UpdateUserInfoList } from "@/apis/userlist/UserList.d"
import { updateUserListApi } from "@/apis/userlist/UserList"
import { ElMessage } from "element-plus"
const formRef = ref()
const drawer = ref(false)
const emit = defineEmits(["update-success"])
const props = defineProps({
  user: {
    type: Object,
    default: () => {},
  },
})
const form = ref<UserInfoList>({
  id: "",
  name: "",
  email: "",
  role: "",
  department: "",
  phone: "",
  status: 0,
  createTime: "",
  avatar: "",
})
const rules = ref({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
  role: [{ required: true, message: "请输入角色", trigger: "blur" }],
  department: [{ required: true, message: "请输入部门", trigger: "blur" }],
  phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
})
watch(
  () => props.user,
  (newVal) => {
    if (newVal) {
      form.value = { ...newVal } as UserInfoList
    }
  },
  {
    immediate: true,
  },
)
const submitForm = async () => {
  await updateUserListApi(Number(form.value.id), form.value as UpdateUserInfoList)
  ElMessage.success("更新成功")
  emit("update-success")
  drawer.value = false
}
const resetForm = () => {
  formRef.value.resetFields()
}
defineExpose({ drawer })
</script>
<style scoped lang="scss">
.login-buttons {
  margin-top: 260px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  button {
    width: 80%;
    height: 40px;
    margin-bottom: 20px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    background-color: #409eff;
    color: #fff;
  }

  .reset {
    background-color: #767373;
  }
}
</style>
