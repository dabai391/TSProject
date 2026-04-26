<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px" class="aside">
        <Aside @sendMessage="handleMessage" @sendChildMessage="handleChildMessage" />
      </el-aside>
      <el-container>
        <el-header class="header">
          <Header />
        </el-header>
        <el-main class="main">
          <template v-if="curItem?.component">
            <component :is="curItem?.component" />
          </template>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import Aside from "@/views/home/components/Aside.vue"
import Header from "@/views/home/components/Header.vue"
import Home from "@/views/home/components/main/Home.vue"
import UserList from "@/views/home/components/main/UserList.vue"
import DataScreen from "@/views/home/components/main/DataScreen.vue"
import AddUser from "@/views/home/components/main/AddUser.vue"
import { ref } from "vue"
const asideItems = ref([
  { id: 1, name: "首页", component: Home },
  {
    id: 2,
    name: "用户管理",
    children: [
      { id: 21, name: "用户列表", component: UserList },
      { id: 22, name: "新增用户", component: AddUser },
    ],
  },
  { id: 3, name: "数据大屏", component: DataScreen },
])
const curItem = ref(asideItems.value[1]?.children?.[0])
const handleMessage = (id: number) => {
  const found = asideItems.value.find((item) => item.id === id)
  // console.log(found)
  if (found) {
    curItem.value = found as typeof curItem.value
  }
}
const handleChildMessage = (id: number) => {
  const foundChild = asideItems.value
    .filter((item) => item.children)
    .map((item) => item.children)
    .flat()
    .find((item) => item?.id === id)
  // console.log(foundChild)
  if (foundChild) {
    curItem.value = foundChild as typeof curItem.value
  }
}
</script>

<style scoped lang="scss">
.common-layout {
  height: 100vh;
}

.aside {
  height: 100vh;
  // 固定在左侧
  position: sticky;
  top: 0;
}

.header {
  background-color: #fff;
  height: 60px;
  // 固定在顶部
  position: sticky;
  top: 0;
}

.main {
  background-color: #f5f7fa;
}

.el-main {
  padding: 10px !important;
}
</style>
