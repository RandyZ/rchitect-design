import * as routesObject from './src/routes'
export type { RoutesModel } from './src/routes'
export const LayoutRoutes = {
  // 基础布局
  LAYOUT: routesObject.LAYOUT,
  // 父级布局
  PARENT_LAYOUT: routesObject.PARENT_LAYOUT,
  // 基础路由-根路由
  ROOT_ROUTE: routesObject.ROOT_ROUTE,
  // 基础路由-重定向路由
  REDIRECT_ROUTE: routesObject.REDIRECT_ROUTE,
  // 基础路由-异常页路由
  PAGE_NOT_FOUND_ROUTE: routesObject.PAGE_NOT_FOUND_ROUTE,
  // 路由操作对象
  RoutesModel: routesObject.RoutesModel,
}
export { default as Beans } from './beankeys';
export * from './src';
export * from './library'