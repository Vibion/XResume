<template>
  <el-card>
    <el-row :gutter="20" class="header">
      <el-col :span="3">
        <el-select v-model="value" class="m-2" placeholder="选择公司" size="large">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-col>
      <!-- 搜索按钮 -->
      <!-- <el-col :span="3">
        <el-button type="primary" :icon="Search" @click="initAdminConsultRecordByName">搜索
        </el-button>
      </el-col> -->
    </el-row>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column :prop="item.prop" :label="item.label" v-for="(item, index) in option" :key="index"
        :width="item.width">
        <!-- <template #default="{ row }" v-if="item.prop === 'id'">
          {{ index }}
        </template> -->
        <template #default="{ row }" v-if="item.prop === 'base_info.education'">
          {{ row.base_info.education ? row.base_info.education : '小学' }}
        </template>
        <template #default="{ row }" v-if="item.prop === 'base_info.native_place'">
          {{ row.base_info.native_place ? row.base_info.native_place : '中国' }}
        </template>
        <template #default="{ row }" v-if="item.prop === 'base_info.political_outlook'">
          {{ row.base_info.political_outlook ? row.base_info.political_outlook : '无' }}
        </template>
        <template #default="{ row }" v-if="item.prop === 'base_info.email'">
          {{ row.base_info.email ? row.base_info.email : '无' }}
        </template>
        <template #default="{ row }" v-if="item.prop === 'base_info.phone'">
          {{ row.base_info.phone ? row.base_info.phone : '无' }}
        </template>
        <template #default="{ row }" v-if="item.prop === 'action'">
          <el-button type="success" size="small" :icon="Edit" @click="checkFullInfo(row)"></el-button>
          <el-button type="danger" size="small" :icon="Delete" @click="deleteResume(row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-model:current-page="queryForm.pageNum" v-model:page-size="queryForm.pageSize"
      :page-sizes="[2, 5, 10, 15]" layout="total, sizes, prev, pager, next, jumper" :total="total"
      @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    <el-dialog v-model="dialogVisible" title="简历具体信息" width="30%" :before-close="handleClose">
      <span>{{ detial }}</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="dialogDeleteVisible" title="是否删除" width="30%" :before-close="handleClose">
      <span>您确认定要删除用户{{ currentRow.base_info.name }}吗？</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogDeleteVisible = false">取消</el-button>
          <el-button type="primary" @click="sendDelete()">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </el-card>
</template>
<script setup>
import { ref, watch } from 'vue'
import { Search, Edit, Setting, Delete } from '@element-plus/icons-vue'
import { option } from "./ResumeTableoptions"
import { findAllResume, findAllCompanyAPI, deleteResumeApi } from "@/api/sys/admin"
import { useAdminStore } from '/@/store/modules/admin'
import { ElMessage } from 'element-plus'

const adminStore = useAdminStore()
const value = ref('')

const options = ref([])
const dialogDeleteVisible = ref(false)
// 总页的数量
const total = ref(0)
const queryForm = ref({
  // sname: '',
  company: '',
  pageNum: 0,
  pageSize: 15
})
const queryFormByName = ref({
  name: '',
  pageNum: 0,
  pageSize: 15
})
const tableData = ref([{ 'id': 1 }])
const initAllResume = async (company) => {
  queryForm.value.company = company
  const res = await findAllResume(queryForm.value)
  console.log('请求所有简历之后的返回信息')
  tableData.value = res.list
  console.log(res)
  total.value = res.total
}
// 分页器的配置
const handleSizeChange = (pageSize) => {
  queryForm.value.pageSize = pageSize
  initAllResume(adminStore.currentCompany)
}
const handleCurrentChange = (pageNum) => {
  queryForm.value.pageNum = pageNum
  initAllResume(adminStore.currentCompany)
}

// 具体信息对话框配置信息
const dialogVisible = ref(false)
const detial = ref('')
const checkFullInfo = (row) => {
  dialogVisible.value = true
  detial.value = row
}

// 查询所有公司
const findAllCompany = async () => {
  const list = await findAllCompanyAPI()
  const optionsList = list.map((item, index) => {
    const option = {
      value: item,
      label: item,
    };
    return option;
  });
  console.log("options");
  console.log(optionsList);
  options.value = optionsList
  value.value = options.value[0].label
  adminStore.currentCompany = options.value[0].value
  initAllResume(options.value[0].value)
}
findAllCompany()

watch(value, (newValue, oldValue) => {
  // console.log(`Value changed from ${oldValue} to ${newValue}`);
  adminStore.setCurrentCompany(newValue)
  initAllResume(adminStore.currentCompany)
})
// 删除简历id
const currentRow = ref()
const deleteResume = (row) => {
  dialogDeleteVisible.value = true
  currentRow.value = row
  // console.log(currentRow.value)
}
const sendDelete = async () => {
  const res = await deleteResumeApi({ id: currentRow.value.id })
  // console.log(res)
  if (res === '删除成功') {
    ElMessage({
      message: '删除成功',
      type: 'success',
    })
  } else {
    ElMessage.error('删除失败，请刷新重试')
  }
  dialogDeleteVisible.value = false
  initAllResume(adminStore.currentCompany)
}
</script>
