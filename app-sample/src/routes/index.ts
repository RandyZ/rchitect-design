import { Route } from "@rchitect-design/constants";
import { LayoutRoutes } from "@rchitect-rock/layouts";
import { $t } from "@rchitect-rock/locale";

const DashboardRoute:RouteRecordItem = {
  path: Route.BASIC_HOME_PATH,
  name: Route.PAGE_DASHBOARD_NAME,
  component: LayoutRoutes.LAYOUT,
  meta: {
    title: '测试首页',
  },
  redirect: `${ Route.BASIC_HOME_PATH }/index`,
  children: [
    {
      path: `${ Route.BASIC_HOME_PATH }/index`,
      name: 'DashboardIndex',
      component: () => import('#/pages/dashboard.vue'),
      meta: {
        title: 'routes.dashboard.dashboard',
        icon: 'bx:bx-home',
      }
    },
    {
      path: `${ Route.BASIC_HOME_PATH }/second`,
      name: 'DashboardSecond',
      component: () => import('#/pages/page2.vue'),
      meta: {
        title: $t('routes.dashboard.about'),
        icon: 'bx:bx-home',
      }
    }
  ]
};

export const RouteList:RouteRecordItem[] = [ DashboardRoute ];
