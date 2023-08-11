import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const IFrame = () => import('/@/views/sys/iframe/FrameBlank.vue');

const iframe: AppRouteModule = {
  path: '/frame',
  name: 'Frame',
  component: LAYOUT,
  redirect: '/frame/doc',
  meta: {
    hideChildrenInMenu:true,
    orderNo: 15,
    icon: 'ion:tv-outline',
    title: "接口文档",
  },

  children: [
    {
      path: 'doc',
      name: 'Doc',
      component: IFrame,
      meta: {
        frameSrc: 'https://console-docs.apipost.cn/preview/e876f7f983bef185/c36744ff6f07beb9',
        title: t('routes.demo.iframe.doc'),
      },
    },
    // {
    //   path: 'antv',
    //   name: 'Antv',
    //   component: IFrame,
    //   meta: {
    //     frameSrc: '',
    //     title: t('routes.demo.iframe.antv'),
    //   },
    // },
    // {
    //   path: 'https://doc.vvbin.cn/',
    //   name: 'DocExternal',
    //   component: IFrame,
    //   meta: {
    //     title: t('routes.demo.iframe.docExternal'),
    //   },
    // },
  ],
};

export default iframe;
