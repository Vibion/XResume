import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const user: AppRouteModule = {
  path: '/user',
  name: 'user',
  component: LAYOUT,
  redirect: '/user/index',
  meta: {
    hideChildrenInMenu: true,
    orderNo: 12,
    icon: 'material-symbols:remember-me',
    title: '成员列表',
  },
  children: [
    {
      path: 'index',
      name: 'userDetail',
      component: () => import('/@/views/demo/table/UserTable.vue'),
      meta: {
        // affix: true,
        title: '成员列表',
      },
    }
  ],
};

export default user;
