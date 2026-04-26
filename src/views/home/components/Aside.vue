<template>
  <div class="container">
    <el-menu class="aside-list">
      <template v-for="item in asideItems" :key="item.id">
        <el-menu-item
          v-if="!item.children"
          :index="String(item.id)"
          class="aside-item"
          @click="sendMessage(item.id)"
        >
          <template #title>
            {{ item.name }}
          </template>
        </el-menu-item>
        <el-sub-menu v-else :index="String(item.id)" class="aside-item">
          <template #title>
            {{ item.name }}
          </template>
          <el-menu-item-group class="subitem">
            <el-menu-item
              v-for="child in item.children"
              :key="child.id"
              :index="String(child.id)"
              @click="sendChildMessage($event, child.id)"
            >
              {{ child.name }}
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
const asideItems = ref([
  { id: 1, name: "首页" },
  {
    id: 2,
    name: "用户管理",
    children: [
      { id: 21, name: "用户列表" },
      { id: 22, name: "新增用户" },
    ],
  },
  { id: 3, name: "数据大屏" },
])
const emit = defineEmits(["sendMessage", "sendChildMessage"])
const sendMessage = (id: number) => {
  emit("sendMessage", id)
}
const sendChildMessage = (event: unknown, id: number) => {
  if (event instanceof Event && event.stopPropagation) {
    event.stopPropagation()
  }
  emit("sendChildMessage", id)
}
</script>

<style scoped lang="scss">
.container {
  width: 200px;
  height: 100vh;
  background: #545c64;
  overflow: hidden;

  .aside-list {
    list-style: none;
    padding: 0;
    border: none;
    background: transparent;
    margin-top: 40px;

    :deep(.el-sub-menu__title) {
      color: #bfcbd9;
      font-size: 18px;
      padding: 30px;

      &:hover {
        background: #646c74 !important;
      }
    }

    :deep(.el-sub-menu__icon-arrow) {
      color: #bfcbd9;
    }

    :deep(.el-menu) {
      background: #545c64;
    }

    :deep(.el-menu-item) {
      color: #bfcbd9;
      font-size: 18px;
      text-align: center;
      padding: 30px;

      &:hover {
        background: #646c74 !important;
      }
    }

    :deep(.el-menu-item-group .el-menu-item) {
      padding: 30px;
      font-size: 16px;

      &:hover {
        background: #646c74 !important;
      }
    }
  }
}
</style>
