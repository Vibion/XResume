<template>
  <el-select v-model="value" class="m-2" placeholder="选择公司" size="large">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </el-select>
  <div ref="chartRef" :style="{ height, width }"></div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref, Ref, onMounted, watch } from 'vue';

import { useECharts } from '/@/hooks/web/useECharts';
import { getLineData } from './data';
import { dataAnalysisApi, findAllCompanyAPI } from '/@/api/sys/admin';
import { useAdminStore } from '/@/store/modules/admin'

const adminStore = useAdminStore()
// 选择器配置
const educationType = ref([])
const educationValue = ref([])
const dataAnalysis = async () => {
  const res = await dataAnalysisApi({ company: adminStore.currentCompany })
  console.log(res)
  const customOrder = ["无", "小学", "初中", "高中", "中专", "大专", "本科", "硕士", "博士"];
  const sortedData = customOrder.map(key => ({
    key,
    value: res.educationList[key] || 0,
  }));
  // console.log(sortedData)
  educationType.value = sortedData.map(item => item.key)
  educationValue.value = sortedData.map(item => item.value)
}
dataAnalysis()
export default defineComponent({
  props: {
    width: {
      type: String as PropType<string>,
      default: '100%',
    },
    height: {
      type: String as PropType<string>,
      default: 'calc(100vh - 78px)',
    },
  },
  setup() {
    const value = ref('') as { value: string };
    const options = ref([]) as { value: any[] };
    const chartRef = ref<HTMLDivElement | null>(null);
    const { setOptions, echarts } = useECharts(chartRef as Ref<HTMLDivElement>);
    const { barData, lineData, category } = getLineData;
    // 查询所有公司
    const findAllCompany = async () => {
      const list = await findAllCompanyAPI()
      const optionsList = list.map((item, index) => {
        const option = {
          value: item,
          label: item,
        };
        return option;
      });;
      options.value = optionsList
      value.value = options.value[0].label
      adminStore.currentCompany = options.value[0].value
      // initAllResume(options.value[0].value)
      console.log('value' + value.value)
    }

    onMounted(() => {
      findAllCompany()
      setOptions({
        backgroundColor: '#0f375f',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            label: {
              show: true,
              backgroundColor: '#333',
            },
          },
        },
        legend: {
          data: ['学历', 'bar'],
          textStyle: {
            color: '#ccc',
          },
        },
        xAxis: {
          data: educationType.value,
          axisLine: {
            lineStyle: {
              color: '#ccc',
            },
          },
        },
        yAxis: {
          splitLine: { show: false },
          axisLine: {
            lineStyle: {
              color: '#ccc',
            },
          },
        },
        series: [
          {
            name: '学历',
            type: 'line',
            smooth: true,
            showAllSymbol: 'auto',
            symbol: 'emptyCircle',
            symbolSize: 15,
            data: educationValue.value,
          }
        ],
      });
    });
    watch(value, (newValue, oldValue) => {
      // console.log(`Value changed from ${oldValue} to ${newValue}`);
      adminStore.setCurrentCompany(newValue)
      dataAnalysis()
      setOptions({
        backgroundColor: '#0f375f',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            label: {
              show: true,
              backgroundColor: '#333',
            },
          },
        },
        legend: {
          data: ['学历', 'bar'],
          textStyle: {
            color: '#ccc',
          },
        },
        xAxis: {
          data: educationType.value,
          axisLine: {
            lineStyle: {
              color: '#ccc',
            },
          },
        },
        yAxis: {
          splitLine: { show: false },
          axisLine: {
            lineStyle: {
              color: '#ccc',
            },
          },
        },
        series: [
          {
            name: '学历',
            type: 'line',
            smooth: true,
            showAllSymbol: 'auto',
            symbol: 'emptyCircle',
            symbolSize: 15,
            data: educationValue.value,
          }
        ],
      });
      // initAllResume(adminStore.currentCompany)
    })
    return { chartRef, value, options };
  },
});
</script>
