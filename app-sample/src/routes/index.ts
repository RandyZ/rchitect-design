import { Route } from "@rchitect-design/constants";
import { LayoutRoutes } from "@rchitect-rock/layouts";

const DashboardRoute: RouteRecordItem = {
  path: Route.BASIC_HOME_PATH,
  name: 'HomeDashBoard',
  component: LayoutRoutes.LAYOUT,
  meta: {
    title: '测试首页',
    key: 333,
    isBasic: true,
  },
  redirect: `${Route.BASIC_HOME_PATH}/index`,
  children: [
    {
      path: `${Route.BASIC_HOME_PATH}/index`,
      name: 'DashboardIndex',
      component: () => import('#/pages/dashboard.vue'),
      meta: {
        title: 'routes.dashboard.dashboard',
        icon: 'bx:bx-home',
      }
    }
  ]
};

export const RouteList: RouteRecordItem[] = [DashboardRoute];
