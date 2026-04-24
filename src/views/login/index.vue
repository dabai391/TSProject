<template>
  <div class="login">
    <div class="login-content">
      <h2>欢迎登录</h2>
      <el-form type="form" :model="form" :rules="rules" ref="formRef">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名" />
        </el-form-item>
        <!-- 密码两字之间有空格，使密码输入框居中 -->
        <el-form-item label="密&nbsp; &nbsp;  码" prop="password">
          <el-input v-model="form.password" placeholder="请输入密码" type="password" />
        </el-form-item>
        <div class="login-buttons">
          <el-button type="primary" @click="submitForm">登录</el-button>
          <el-button type="primary" @click="resetForm">取消</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { ElMessage } from "element-plus"
import { useRouter } from "vue-router"
import { loginApi } from "@/apis/login/Login"
import useUserStore from "@/store/User/UserStore"
import type UserInfoType from "@/store/User/User"
const router = useRouter()
const userStore = useUserStore()
const form = ref({
  username: "",
  password: "",
})

const rules = ref({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
})
const formRef = ref()
const submitForm = async () => {
  await formRef.value.validate()
  const res = (await loginApi(form.value)) as unknown as UserInfoType
  userStore.setUserInfo(res)
  router.push({ name: "home" })
  ElMessage.success("登录成功")
}
const resetForm = () => {
  formRef.value.resetFields()
}
</script>

<style scoped lang="scss">
.login {
  width: 100%;
  height: 100vh;
  background: url("@/assets/images/background1.png") no-repeat center center fixed;
  .login-content {
    width: 400px;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
    position: absolute;
    top: 50%;
    left: 70%;
    transform: translate(-50%, -50%);

    h2 {
      text-align: center;
      margin-bottom: 20px;
    }

    .login-buttons {
      @include flex-center;
      margin-top: 20px;
      margin-bottom: 10px;
    }
  }
}
</style>
