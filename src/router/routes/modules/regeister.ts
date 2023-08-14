import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const regester: AppRouteModule = {
  path: '/regester',
  name: 'regester',
  component: LAYOUT,
  redirect: '/regester/index',
  meta: {
    hideChildrenInMenu: true,
    orderNo: 11,
    icon: 'mdi:account-plus',
    title: '申请列表',
  },
  children: [
    {
      path: 'index',
      name: 'regesterDetail',
      component: () => import('/@/views/demo/table/RegesterTable.vue'),
      meta: {
        // affix: true,
        title: '申请列表',
      },
    }
  ],
};

export default regester;
