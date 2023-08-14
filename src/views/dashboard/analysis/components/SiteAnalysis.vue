<template>
  <Card :tab-list="tabListTitle" v-bind="$attrs" :active-tab-key="activeKey" @tab-change="onTabChange">
    <VisitAnalysis />
  </Card>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { Card } from 'ant-design-vue';
import VisitAnalysis from './VisitAnalysis.vue';
// import VisitAnalysisBar from './VisitAnalysisBar.vue';

const activeKey = ref('tab1');

const tabListTitle = [
  {
    key: 'tab1',
    tab: '访问量趋势',
  },
];

function onTabChange(key) {
  activeKey.value = key;
}
</script>
