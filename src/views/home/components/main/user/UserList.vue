<template>
  <div class="user-list">
    <h4>用户列表</h4>
    <el-table
      :data="userList"
      style="width: 100%"
      :max-height="550"
      class="table"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" :selectable="selectable" width="55" />
      <el-table-column fixed prop="id" label="ID" width="230" align="center" />
      <el-table-column prop="name" label="Name" width="130" align="center" />
      <el-table-column prop="email" label="Email" width="250" />
      <el-table-column prop="role" label="Role" width="130" align="center" />
      <el-table-column prop="department" label="Department" width="150" align="center" />
      <el-table-column prop="phone" label="Phone" width="180" />
      <el-table-column fixed="right" label="Operations" min-width="100" align="center">
        <template #header>
          <el-input v-model="search" size="small" placeholder="搜索用户" />
        </template>
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-popconfirm
            class="box-item"
            title="确认删除吗？"
            placement="top-start"
            @confirm="handleDelete(Number(scope.row.id))"
          >
            <template #reference>
              <el-button size="small" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div class="demo-pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
      <el-dropdown>
        <span class="el-dropdown-link">
          批量操作
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>批量提交</el-dropdown-item>
            <el-dropdown-item @click="handleBatchDelete">批量删除</el-dropdown-item>
            <el-dropdown-item>新增用户</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <RightDrawer ref="rightDrawerRef" :user="EdutUser" @update-success="handleUpdateSuccess" />
  </div>
</template>

<script setup lang="ts">
import { batchDeleteUsersApi, deleteUserListApi, getUserListApi } from "@/apis/userlist/UserList"
import { onMounted, ref } from "vue"
import RightDrawer from "@/views/home/components/main/user/RightDrawer.vue"
import type { UserInfoList, UpdateUserInfoList } from "@/apis/userlist/UserList.d"
import { ElMessage, ElMessageBox } from "element-plus"
const selectable = (row: UpdateUserInfoList) => {
  if (row.role === "admin") {
    return false
  } else {
    return true
  }
}
const userList = ref<UserInfoList[]>([])
const currentPage = ref<number>(1)
const pageSize = ref<number>(20)
const total = ref<number>(0)
const search = ref<string>("")
const rightDrawerRef = ref<typeof RightDrawer>()
// 分页大小改变时，获取用户列表
const handleSizeChange = (val: number) => {
  pageSize.value = val
  getUserList()
}
// 页数改变时，获取用户列表
const handleCurrentChange = (val: number) => {
  currentPage.value = val
  getUserList()
}
// 获取用户列表
const getUserList = async () => {
  const res = await getUserListApi({
    page: currentPage.value,
    pageSize: pageSize.value,
  })
  userList.value = res.data.list as UserInfoList[]
  total.value = res.data.total
}
// 编辑用户
const EdutUser = ref<UserInfoList>()
const handleEdit = (row: UserInfoList) => {
  if (rightDrawerRef.value) {
    rightDrawerRef.value.drawer = true
    EdutUser.value = row
  }
}
// 更新成功后，获取用户列表
const handleUpdateSuccess = () => {
  getUserList()
}
// 删除用户
const handleDelete = async (id: number) => {
  await deleteUserListApi(id)
  getUserList()
  ElMessage.success("删除成功")
}
// 批量删除
const selectedIds = ref<string[]>([])
const handleSelectionChange = (val: UserInfoList[]) => {
  selectedIds.value = val.map((item) => item.id)
}
// 批量删除
const handleBatchDelete = async () => {
  if (selectedIds.value.length === 0) {
    ElMessage.warning("请选择要删除的用户")
    return
  }
  ElMessageBox.confirm("确认删除选中的用户吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      await batchDeleteUsersApi(selectedIds.value)
      getUserList()
      ElMessage.success("删除成功")
    })
    .catch(() => {
      ElMessage.info("已取消删除")
    })
}
onMounted(() => {
  getUserList()
})
</script>

<style scoped lang="scss">
.user-list {
  h4 {
    margin-top: 10px;
    margin-left: 10px;
  }

  .table {
    margin-left: 15px;
    margin-top: 10px;
  }

  .demo-pagination {
    margin-left: 15px;
    margin-top: 10px;
    display: flex;
    gap: 250px;
    align-items: center;
  }
}
</style>
