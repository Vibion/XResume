<template>
  <el-card>
    <el-row :gutter="20" class="header">
      <el-col :span="3">
        <el-select v-model="value" class="m-2" placeholder="选择公司" size="large">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-col>
      <!-- 搜索按钮 -->
      <el-col :span="3">
        <el-button type="primary" :icon="Search" @click="initAdminConsultRecordByName">搜索
        </el-button>
      </el-col>
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
  </el-card>
</template>
<script setup>
import { ref } from 'vue'
import { Search, Edit, Setting, Delete } from '@element-plus/icons-vue'
import { option } from "./ResumeTableoptions"
import { findAllResume } from "@/api/sys/admin"
const value = ref('')
const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]

// 总页的数量
const total = ref(0)
const queryForm = ref({
  // sname: '',
  pageNum: 0,
  pageSize: 15
})
const queryFormByName = ref({
  name: '',
  pageNum: 0,
  pageSize: 15
})
const tableData = ref([{ 'id': 1 }])

const initAllResume = async () => {
  const res = await findAllResume(queryForm.value)
  console.log('请求所有简历之后的返回信息')
  tableData.value = res.list
  console.log(res)
  total.value = res.total
}
initAllResume()
// 分页器的配置
const handleSizeChange = (pageSize) => {
  // queryForm.value.pageNo = 1
  // queryFormByName.value.pageNo = 1
  queryForm.value.pageSize = pageSize
  // queryFormByName.value.pageSize = pageSize
  initAllResume()
  // initAdminConsultRecord()
}
const handleCurrentChange = (pageNum) => {
  queryForm.value.pageNum = pageNum
  initAllResume()
  // queryFormByName.value.pageNum = pageNum
  // initAdminConsultRecord()
}

// 具体信息对话框配置信息
const dialogVisible = ref(false)
const detial = ref('')
const checkFullInfo = (row) => {
  dialogVisible.value = true
  detial.value = row
}
</script>
