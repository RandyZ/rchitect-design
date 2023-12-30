import { Route } from '@rchitect-design/constants';
import { Exception, Redirect } from '../../pages';
import { BASIC_REDIRECT_PATH } from "@rchitect-design/constants/src/router";

const LAYOUT = () => import('../../layouts').then((m) => m.AppLayout);
const PARENT_LAYOUT = () => () => new Promise((resolve) => resolve({ name: 'ParentLayout' }))

const PAGE_NOT_FOUND_ROUTE: RouteRecordItem = {
  path: '/:pathMatch(.*)*',
  name: Route.PAGE_NOT_FOUND_NAME,
  component: LAYOUT,
  meta: {
    title: 'ErrorPage1',
    key: 333,
    isBasic: true,
  },
  children: [
    {
      path: '/:path(.*)*',
      name: Route.PAGE_NOT_FOUND_NAME,
      component: () => Exception,
      meta: {
        title: 'ErrorPage',
        key: 3333,
        isBasic: true,
      },
    },
  ],
};

// 404 on a page
const REDIRECT_ROUTE: RouteRecordItem = {
  path: Route.BASIC_REDIRECT_PATH,
  component: LAYOUT,
  name: 'RedirectTo',
  meta: {
    title: Route.PAGE_REDIRECT_NAME,
    hideBreadcrumb: true,
    hideMenu: true,
    isBasic: true,
  },
  children: [
    {
      path: '/redirect/:path(.*)',
      name: Route.PAGE_REDIRECT_NAME,
      component: Redirect,
      meta: {
        title: Route.PAGE_REDIRECT_NAME,
        hideBreadcrumb: true,
        isBasic: true,
      },
    },
  ],
};

const ROOT_ROUTE: RouteRecordItem = {
  path: '/',
  name: 'Root',
  redirect: Route.BASIC_HOME_PATH,
  meta: {
    title: 'Root',
    isBasic: true,
  },
};

export const BasicRoutes: RouteRecordItem[] = [
  // 根路由
  ROOT_ROUTE,
  // 重定向路由
  REDIRECT_ROUTE,
  // 异常页路由
  PAGE_NOT_FOUND_ROUTE,
];

export {
  // 基础布局
  LAYOUT,
  // 父级布局
  PARENT_LAYOUT,
  // 根路由
  ROOT_ROUTE,
  // 重定向路由
  REDIRECT_ROUTE,
  // 异常页路由
  PAGE_NOT_FOUND_ROUTE,
};
