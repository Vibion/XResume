<template>
  <div class="full-screen-card">
    <el-row :gutter="25" style="width: 100%;">
      <el-col :span="4">
        <el-card style="position: relative; top:5px; left:5px; height:100%">
          <el-table ref="singleTableRef" :data="companyData" highlight-current-row style="width: 100%;"
            :cell-style="companyCellStyle" @current-change="handleCompanyCurrentChange" @cell-click="companyCellClick">
            <!-- <el-table-column type="index" width="50" /> -->
            <el-table-column prop="item" label="公司列表" width="200" />
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="20">
        <el-card style="position: relative; top:5px; height:100%">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column fixed prop="id" label="申请号" width="150" />
            <el-table-column prop="username" label="用户名" width="120" />
            <el-table-column prop="phone" label="手机号" width="150" />
            <el-table-column prop="email" label="邮箱" width="150" />
            <el-table-column prop="company" label="公司" width="250" />
            <el-table-column prop="password" label="密码" width="220">
              <template #default="{ row }">
                <span v-if="showPassword">{{ row.password }} </span>
                <span v-else>{{ '•'.repeat(6) }}</span>
                <el-icon v-if="showPassword" :size="20" @click="showPassword = false"
                  style="cursor: pointer; position: relative;top: 5px;left:5px">
                  <View />
                </el-icon>
                <el-icon v-else :size="20" @click="wantView()"
                  style="cursor: pointer; position: relative;top: 5px;left:5px">
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
          <el-pagination v-model:current-page="queryForm.pageNum" v-model:page-size="queryForm.pageSize"
            :page-sizes="[2, 5, 10, 15]" layout="total, sizes, prev, pager, next, jumper" :total="total"
            @size-change="handleSizeChange" @current-change="handleCurrentChange" />
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
      </el-col>
    </el-row>
  </div>
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
// import { findUser } from "@/api/sys/admin"
import { ElMessage } from 'element-plus'
import { login, deleteUser, findAllCompanyAPI, findUser } from '/@/api/sys/admin';
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
// initActivate()
// 分页器的配置
const handleSizeChange = (pageSize) => {
  companyUserForm.value.pageSize = pageSize
  findCompanyRegister(adminStore.currentCompany)
}
const handleCurrentChange = (pageNum) => {
  companyUserForm.value.pageNum = pageNum
  findCompanyRegister(adminStore.currentCompany)
}

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
  findCompanyRegister(adminStore.currentCompany)
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

// 可选择公司列表
const companyData = ref([])
const singleTableRef = ref()
const currentCompanyRow = ref()
const handleCompanyCurrentChange = (val) => {
  currentCompanyRow.value = val
}
// 鼠标移动到公司上变小手
const companyCellStyle = (data) => {
  // alert(data)
  if (data.column.label === '公司列表') {
    return { cursor: 'pointer' }
  }
}
// 点击公司进行申请人员的跳转
const companyCellClick = (row, column, cell, event) => {
  adminStore.setCurrentCompany(row.item)
  findCompanyRegister(row.item)
}
// 查询各个公司人员
const findAllCompany = async () => {
  const list = await findAllCompanyAPI()
  companyData.value = list.map((item => ({ item })))
  findCompanyRegister(companyData.value[0].item)
}
findAllCompany()
const companyUserForm = ref({
  company: '',
  pageNum: 1,
  pageSize: 12
})
const findCompanyRegister = async (name) => {
  companyUserForm.value.company = name
  console.log(companyUserForm.value)
  const res = await findUser(companyUserForm.value)
  tableData.value = res.list
  total.value = res.total
}
</script>
<style>
.full-screen-card {
  height: 85vh;
  /* 设置高度为视窗高度 */
  display: flex;
  /* 使用弹性盒子布局 */
  justify-content: center;
  /* 水平居中 */
  /* align-items: center; */
  /* 垂直居中 */
}
</style>