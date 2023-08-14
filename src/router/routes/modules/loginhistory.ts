import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const loginhistory: AppRouteModule = {
  path: '/loginhistory',
  name: 'loginhistory',
  component: LAYOUT,
  redirect: '/loginhistory/index',
  meta: {
    hideChildrenInMenu: true,
    orderNo: 13,
    icon: 'ic:baseline-history',
    title: '登录历史',
  },
  children: [
    {
      path: 'index',
      name: 'loginhistoryDetail',
      component: () => import('/@/views/demo/table/LoginHistory.vue'),
      meta: {
        // affix: true,
        title: '登录历史',
      },
    }
  ],
};

export default loginhistory;
