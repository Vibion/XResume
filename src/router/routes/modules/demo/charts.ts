import type { AppRouteModule } from '/@/router/types';

import { getParentLayout, LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const charts: AppRouteModule = {
  path: '/charts',
  name: 'Charts',
  component: LAYOUT,
  redirect: '/charts/echarts/map',
  meta: {
    orderNo: 14,
    icon: 'ion:bar-chart-outline',
    title: t('routes.demo.charts.charts'),
  },
  children: [
    // {
    //   path: 'map',
    //   name: 'Map',
    //   component: () => import('/@/views/demo/charts/Map.vue'),
    //   meta: {
    //     title: t('routes.demo.charts.map'),
    //   },
    // },
    {
      path: 'line',
      name: 'Line',
      component: () => import('/@/views/demo/charts/Line.vue'),
      meta: {
        title: t('routes.demo.charts.line'),
        icon:'carbon:math-curve'
      },
    },
    {
      path: 'pie',
      name: 'Pie',
      component: () => import('/@/views/demo/charts/Pie.vue'),
      meta: {
        title: t('routes.demo.charts.pie'),
        icon:'icon-park-solid:pie-two'
      },
    },
  ],
};

export default charts;
