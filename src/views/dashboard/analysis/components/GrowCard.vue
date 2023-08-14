<template>
  <div class="md:flex">
    <template v-for="(item, index) in growCardList" :key="item.title">
      <Card size="small" :loading="loading" :title="item.title" class="md:w-1/4 w-full !md:mt-0"
        :class="{ '!md:mr-4': index + 1 < 4, '!mt-4': index > 0 }">
        <template #extra>
          <Tag :color="item.color">{{ item.action }}</Tag>
        </template>

        <div class="py-4 px-4 flex justify-between items-center">
          <CountTo prefix="$" :startVal="1" :endVal="item.value" class="text-2xl" />
          <Icon :icon="item.icon" :size="40" />
        </div>

        <div class="p-2 px-4 flex justify-between">
          <span>总{{ item.title }}</span>
          <CountTo prefix="$" :startVal="1" :endVal="item.total" />
        </div>
      </Card>
    </template>
  </div>
</template>
<script  setup>
import { CountTo } from '/@/components/CountTo/index';
import Icon from '@/components/Icon/Icon.vue';
import { Tag, Card } from 'ant-design-vue';
import { growCardList } from '../data';
import { findLoginSumAPI, findApiNumAPI, getStageNumberApi } from '/@/api/sys/admin'
import { ref } from 'vue'
import { useAdminStore } from '/@/store/modules/admin'


const adminStore = useAdminStore()
defineProps({
  loading: {
    type: Boolean,
  },
});
const loginSum = ref(0)
const findLoginSum = async () => {
  const res = await findLoginSumAPI()
  // console.log('res')
  const totalCount = res.reduce((sum, item) => sum + item.count, 0);
  // console.log(totalCount)
  growCardList[0].value = totalCount
  growCardList[0].total = totalCount
  const resumeExtra = await findApiNumAPI({ url: '/base/api/getApiType' })
  growCardList[1].value = resumeExtra
  growCardList[1].total = resumeExtra
  const personalImage = await findApiNumAPI({ url: '/base/user/companyToUser' })
  growCardList[2].value = personalImage
  growCardList[2].total = personalImage
  const postMatch = await findApiNumAPI({ url: '/base/user/noActive' })
  growCardList[3].value = postMatch
  growCardList[3].total = postMatch
  const timeList = await getStageNumberApi()
  const countArray = timeList.map(item => item.count);
  adminStore.setTimeList(countArray)
}
findLoginSum()

</script>
