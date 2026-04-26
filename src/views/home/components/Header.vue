<template>
  <div class="container">
    <div class="header-left">
      <div><SvgIcon name="menu" fillcolor="#000" /></div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>
          <a href="/">用户管理</a>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="header-right">
      <div><SvgIcon name="changelanguage" fillcolor="#999" /></div>
      <div><SvgIcon name="changetheme" fillcolor="#999" /></div>
      <div><SvgIcon name="message" fillcolor="#999" /></div>
      <div><SvgIcon name="fullScreen" fillcolor="#999" /></div>
      <img :src="userStore.userInfo.avatar" alt="" mode="scaleToFill" />
      <div>{{ userStore.userInfo.username }}</div>
      <div><SvgIcon name="row" fillcolor="#999" width="15" height="15" /></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useUserStore from "@/store/User/UserStore"
const userStore = useUserStore()
</script>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  .header-left {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .header-right {
    display: flex;
    align-items: center;
    gap: 20px;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
}
</style>
