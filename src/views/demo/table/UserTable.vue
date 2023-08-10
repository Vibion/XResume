<template>
  <el-card>
    <el-row :gutter="20" class="header">
      <el-col :span="7">
        <!-- <el-input :placeholder="$t(`table.placeholder`)" clearable v-model="queryFormByName.name">
        </el-input> -->
      </el-col>
      <!-- 搜索按钮 -->
      <!-- <el-button type="primary" :icon="Search" @click="initAdminConsultRecordByName">{{ $t(`table.search`)
      }}</el-button> -->
    </el-row>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column fixed prop="id" label="申请号" width="150" />
      <el-table-column prop="username" label="用户名" width="170" />
      <el-table-column prop="phone" label="手机号" width="170" />
      <el-table-column prop="email" label="邮箱" width="220" />
      <el-table-column prop="company" label="公司" width="400" />
      <el-table-column prop="password" label="密码" width="220">
        <template #default="{ row }">
          <span v-if="showPassword">{{ row.password }} </span>
          <span v-else>{{ '•'.repeat(6) }}</span>
          <el-icon v-if="showPassword" :size="20" @click="showPassword = false"
            style="cursor: pointer; position: relative;top: 5px;left:5px">
            <View />
          </el-icon>
          <el-icon v-else :size="20" @click="wantView()" style="cursor: pointer; position: relative;top: 5px;left:5px">
            <Hide />
          </el-icon>

        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="{ row }">
          <el-button type="danger" :icon="Delete" @click="openDeleteDialog(row)" circle />
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-pagination v-model:current-page="queryForm.pageNum" v-model:page-size="queryForm.pageSize"
      :page-sizes="[2, 5, 10, 15]" layout="total, sizes, prev, pager, next, jumper" :total="total"
      @size-change="handleSizeChange" @current-change="handleCurrentChange" /> -->
    <el-dialog v-model="dialogDeleteVisible" title="是否删除" width="30%" :before-close="handleClose">
      <span>您确认定要删除用户{{ detial }}吗？</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogDeleteVisible = false">取消</el-button>
          <el-button type="primary" @click="sendDelete()">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="dialogView" title="请输入密码查看" width="30%" :before-close="handleClose">
      <el-input v-model="inputView" placeholder="请输入密码才能查看" />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogView = false">取消</el-button>
          <el-button type="primary" @click="sendView()">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </el-card>
</template>
<script setup>
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from '@element-plus/icons-vue'
import { ref } from 'vue'
import { findUser } from "@/api/sys/admin"
import { ElMessage } from 'element-plus'
import { login, deleteUser } from '/@/api/sys/admin';
import { useAdminStore } from '/@/store/modules/admin'

const adminStore = useAdminStore()
// 总页的数量
const total = ref(0)
const queryForm = ref({
  // sname: '',
  pageNum: 0,
  pageSize: 15
})


const tableData = ref([])
const initActivate = async () => {
  tableData.value = await findUser()

}
initActivate()
// 分页器的配置

// 具体信息对话框配置信息
const dialogDeleteVisible = ref(false)
const dialogView = ref(false)
const inputView = ref('')
const detial = ref('')
const userId = ref()

// 删除
const openDeleteDialog = (row) => {
  dialogDeleteVisible.value = true
  detial.value = row.username
  userId.value = row.id
}
const sendDelete = async () => {
  // alert('发送删除id' + detial.value)
  await deleteUser({
    id: userId.value
  })
  ElMessage({
    message: '删除成功！',
    type: 'success',
  })
  dialogDeleteVisible.value = false
  initActivate()
}

// 密码的显示与隐藏
const showPassword = ref(false)
const wantView = () => {
  dialogView.value = true
}
const sendView = async () => {
  console.log(adminStore.userInfo)
  const userInfo = await login({
    password: inputView.value,
    username: adminStore.userInfo.username,
    mode: 'none', //不要默认的错误提示
  });
  ElMessage({
    message: '验证成功',
    type: 'success',
  })
  dialogView.value = false
  showPassword.value = true
}
</script>
