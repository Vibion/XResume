<template>
  <div ref="chartRef" :style="{ height, width }"></div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref, Ref, onMounted } from 'vue';

import { useECharts } from '/@/hooks/web/useECharts';
import { dataAnalysisApi } from '/@/api/sys/admin';

// const educationValue = ref([])
// const dataAnalysis = async () => {

//   // console.log(positionList.value)
// }
// dataAnalysis()

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
    const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);
    onMounted(async () => {
      const ageList = ref({})
      const ageListData = ref([])
      const workingHourList = ref({})
      const workingHourListData = ref([])
      const positionList = ref({})
      const positionListType = ref([])
      const positionListData = ref([])
      // 发起异步请求获取数据
      const res = await dataAnalysisApi()
      // console.log(res)
      ageList.value = res.ageList
      ageListData.value = Object.keys(ageList.value).map(key => ({
        value: ageList.value[key],
        name: key,
      }));
      workingHourList.value = res.workHoursList
      workingHourListData.value = Object.keys(workingHourList.value).map(key => ({
        value: workingHourList.value[key],
        name: key,
      }));
      positionList.value = res.positionList
      positionListType.value = Object.keys(res.positionList)
      positionListData.value = positionListType.value.map(key => res.positionList[key]);
      setOptions({
        backgroundColor: '#0f375f',
        title: [
          {
            text: '求职者年龄占比',
            left: '2%',
            top: '1%',
            textStyle: {
              color: '#fff',
              fontSize: 14,
            },
          },
          {
            text: '岗位匹配情况',
            left: '40%',
            top: '1%',
            textStyle: {
              color: '#fff',
              fontSize: 14,
            },
          },
          {
            text: '求职者工作时长占比',
            left: '2%',
            top: '50%',
            textStyle: {
              color: '#fff',
              fontSize: 14,
            },
          },
        ],
        grid: [{ left: '50%', top: '7%', width: '45%', height: '90%' }],
        tooltip: {
          formatter: '{b} ({c})',
        },
        xAxis: [
          {
            gridIndex: 0,
            axisTick: { show: false },
            axisLabel: { show: false },
            splitLine: { show: false },
            axisLine: { show: false },
          },
        ],
        yAxis: [
          {
            gridIndex: 0,
            interval: 0,
            data: positionListType.value,
            axisTick: { show: false },
            axisLabel: { show: true },
            splitLine: { show: false },
            axisLine: { show: true, lineStyle: { color: '#6173a3' } },
          },
        ],
        series: [
          {
            name: '求职者年龄占比',
            type: 'pie',
            radius: '30%',
            center: ['22%', '25%'],
            data: ageListData.value,
            labelLine: { show: false },
            label: {
              show: true,
              formatter: '{b} \n ({d}%)',
              color: '#B1B9D3',
            },
          },
          {
            name: '各级别投诉占比',
            type: 'pie',
            radius: '30%',
            center: ['22%', '75%'],
            labelLine: { show: false },
            data: workingHourListData.value,
            label: {
              show: true,
              formatter: '{b} \n ({d}%)',
              color: '#B1B9D3',
            },
          },
          {
            name: '投诉原因TOP10',
            type: 'bar',
            xAxisIndex: 0,
            yAxisIndex: 0,
            barWidth: '45%',
            itemStyle: { color: '#86c9f4' },
            label: { show: true, position: 'right', color: '#9EA7C4' },
            data: positionListData.value,
          },
        ],
      });
    });
    return { chartRef };
  },
});
</script>
