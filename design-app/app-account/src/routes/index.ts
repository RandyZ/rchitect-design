import { t } from '@rchitect-rock/locale';

const LOGIN_ROUTE: RouteRecordItem = {
  path: '/login',
  name: 'Login',
  component: () => import('../pages/login.vue'),
  meta: {
    title: t('routes.basic.login'),
    whiteRoute: true,
    isBasic: true
  },
};

export const RouteList: RouteRecordItem[] = [LOGIN_ROUTE];

export { createAuthGuard } from './guard';
