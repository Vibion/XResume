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
          <el-button type="primary" plain style="margin-top: 20px;" @click="clearCurrentCompany">查看全部</el-button>
        </el-card>
      </el-col>
      <el-col :span="20">
        <el-card style="position: relative; top:5px; height:100%">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column fixed prop="id" label="申请号" width="150" />
            <el-table-column prop="username" label="用户名" width="100" />
            <el-table-column prop="email" label="邮箱" width="120" />
            <el-table-column prop="company" label="公司" width="150" />
            <el-table-column prop="ip" label="ip地址" width="150" />
            <el-table-column prop="url" label="调用接口" width="250" />
            <el-table-column prop="apiTime" label="调用时间" width="250" />
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
import { ref, watch } from 'vue'
import { findUser } from "@/api/sys/admin"
import { ElMessage } from 'element-plus'
import { findAllLoginHistoryAPI, findAllCompanyAPI, findCompanyLoginHistoryAPI, findAllApipostAPI, findCompanyApipostAPI } from '/@/api/sys/admin';
import { useAdminStore } from '/@/store/modules/admin'

const adminStore = useAdminStore()
// 总页的数量
const total = ref(0)
const queryForm = ref({
  company: '',
  pageNum: 1,
  pageSize: 5
})


const tableData = ref([])
const initAllApipost = async () => {
  const res = await findAllApipostAPI(queryForm.value)
  total.value = res.total
  tableData.value = res.list
}
initAllApipost()
// 分页器的配置
const handleSizeChange = (pageSize) => {
  queryForm.value.company = adminStore.currentCompanyApi
  // console.log('adminStore.currentCompany' + adminStore.currentCompany)
  queryForm.value.pageSize = pageSize
  if (queryForm.value.company.length === 0) {
    initAllApipost()
  }
  else {
    findCompanyApipost(adminStore.currentCompanyApi)
    // tableData.value = res.list
    // total.value = res.total
  }
}
const handleCurrentChange = (pageNum) => {
  // debugger
  queryForm.value.company = adminStore.currentCompanyApi
  queryForm.value.pageNum = pageNum
  if (queryForm.value.company.length === 0) {
    initAllApipost()
  }
  else {
    findCompanyApipost(adminStore.currentCompanyApi)
    // tableData.value = res.list
    // total.value = res.total
  }
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
  // alert(row, column, cell, event)
  console.log(row.item)
  adminStore.setCurrentCompanyApi(row.item)
  findCompanyApipost(row.item)
}
// 查询各个公司人员
const findAllCompany = async () => {
  const list = await findAllCompanyAPI()
  companyData.value = list.map((item => ({ item })))
}
findAllCompany()
const findCompanyApipost = async (name) => {
  queryForm.value.company = name
  const res = await findCompanyApipostAPI(queryForm.value)
  tableData.value = res.list
  total.value = res.total
}
// 清除现有公司
const clearCurrentCompany = () => {
  adminStore.currentCompanyApi = ''
  queryForm.value.company = ''
  initAllApipost()
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