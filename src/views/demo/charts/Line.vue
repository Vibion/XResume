<template>
  <div ref="chartRef" :style="{ height, width }"></div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref, Ref, onMounted } from 'vue';

import { useECharts } from '/@/hooks/web/useECharts';
import { getLineData } from './data';
import { dataAnalysisApi } from '/@/api/sys/admin';


const educationType = ref([])
const educationValue = ref([])
const dataAnalysis = async () => {
  const res = await dataAnalysisApi()
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
    const chartRef = ref<HTMLDivElement | null>(null);
    const { setOptions, echarts } = useECharts(chartRef as Ref<HTMLDivElement>);
    const { barData, lineData, category } = getLineData;
    onMounted(() => {
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
    return { chartRef };
  },
});
</script>
