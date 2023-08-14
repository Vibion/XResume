import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const apipost: AppRouteModule = {
  path: '/apipost',
  name: 'apipost',
  component: LAYOUT,
  redirect: '/apipost/index',
  meta: {
    hideChildrenInMenu: true,
    orderNo: 14,
    icon: 'ion:aperture-sharp',
    title: 'API调用记录',
  },
  children: [
    {
      path: 'index',
      name: 'apipostDetail',
      component: () => import('/@/views/demo/table/ApiPost.vue'),
      meta: {
        // affix: true,
        title: 'API调用记录',
      },
    }
  ],
};

export default apipost;
