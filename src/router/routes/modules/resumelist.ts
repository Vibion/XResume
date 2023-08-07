import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const resumelist: AppRouteModule = {
  path: '/resumelist',
  name: 'resumelist',
  component: LAYOUT,
  redirect: '/resumelist/index',
  meta: {
    hideChildrenInMenu: true,
    orderNo: 10,
    icon: 'ion:menu-outline',
    title: '简历列表',
  },
  children: [
    {
      path: 'index',
      name: 'resumeListdetail',
      component: () => import('/@/views/demo/table/ResumeTable.vue'),
      meta: {
        // affix: true,
        title: '简历列表',
      },
    }
  ],
};

export default resumelist;
