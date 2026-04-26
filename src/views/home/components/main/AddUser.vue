<template>
  <div class="add-user">
    <h2>新增用户</h2>
    <el-form :model="form" :rules="rules" ref="formRef" label-width="120px">
      <el-form-item label="id" prop="id">
        <el-input v-model="form.id" placeholder="请输入id"></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="role">
        <el-input v-model="form.role" placeholder="请输入角色"></el-input>
      </el-form-item>
      <el-form-item label="所在部门" prop="department">
        <el-input v-model="form.department" placeholder="请输入部门"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-input v-model="form.status" placeholder="请输入状态"></el-input>
      </el-form-item>
      <el-form-item label="创建时间" prop="createTime">
        <el-time-picker v-model="form.createTime" placeholder="请选择创建时间" type="time" />
      </el-form-item>
      <el-form-item label="头像" prop="avatar">
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          action="https://mock.presstime.cn/mock/69ecdda1ff11b54472cfd557/api/upload/avatar"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <el-avatar :icon="UserFilled" :size="50" :src="form.avatar" />
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">新增</el-button>
        <el-button @click="resetForm">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue"
// 引入 UserFilled 图标组件
import { UserFilled } from "@element-plus/icons-vue"
import { ElMessage, ElForm } from "element-plus"
import type { FormItemRule } from "element-plus"
import { addUserListApi } from "@/apis/userlist/UserList"
import type { UserInfoList } from "@/apis/userlist/UserList.d"

const form = ref({
  id: "",
  username: "",
  email: "",
  role: "",
  department: "",
  phone: "",
  status: "",
  createTime: "",
  avatar: "",
})
const rules = ref({
  id: [{ required: true, message: "请输入id", trigger: "blur" }],
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  email: [
    { required: true, message: "请输入邮箱", trigger: "blur" },
    {
      validator: (
        _rule: FormItemRule,
        value: string,
        callback: (error?: Error | string) => void,
      ) => {
        if (!/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(value)) {
          callback(new Error("请输入正确的邮箱"))
        } else {
          callback()
        }
      },
      trigger: ["blur"],
    },
  ],
  role: [{ required: true, message: "请输入角色", trigger: "blur" }],
  department: [{ required: true, message: "请输入部门", trigger: "blur" }],
  phone: [
    { required: true, message: "请输入手机号", trigger: "blur" },
    {
      validator: (
        _rule: FormItemRule,
        value: string,
        callback: (error?: Error | string) => void,
      ) => {
        if (!/^1[3456789]\d{9}$/.test(value)) {
          callback(new Error("请输入正确的手机号"))
        } else {
          callback()
        }
      },
      trigger: ["blur"],
    },
  ],
  createTime: [{ required: true, message: "请输入创建时间", trigger: "blur" }],
  avatar: [{ required: true, message: "请输入头像", trigger: "blur" }],
})
const beforeAvatarUpload = (file: File) => {
  const isJPG = file.type === "image/jpeg"
  const isPNG = file.type === "image/png"
  if (!isJPG && !isPNG) {
    ElMessage.error("上传图片只能是 JPG/PNG 格式!")
    return false
  }
  const isLt2MB = file.size / 1024 / 1024 < 2
  if (!isLt2MB) {
    ElMessage.error("上传图片大小不能超过 2MB!")
    return false
  }
  return true
}
const handleAvatarSuccess = (res: { code: number; data: { url: string } }) => {
  if (res.code === 200) {
    ElMessage.success("上传头像成功!")
    form.value.avatar = res.data.url as string
  } else {
    ElMessage.error("上传头像失败!")
  }
}
const formRef = ref<InstanceType<typeof ElForm>>()
const submitForm = async () => {
  const valid = await formRef.value?.validate()
  if (valid) {
    await addUserListApi(form.value as unknown as UserInfoList)
    ElMessage.success("新增用户成功!")
  } else {
    ElMessage.error("新增用户失败!")
  }
  // 重置表单
  formRef.value?.resetFields()
}
const resetForm = () => {
  formRef.value?.resetFields()
}
</script>
<style scoped lang="scss">
.add-user {
  width: 100%;
  height: 100%;
  background: #f5f7fa;
}
</style>
