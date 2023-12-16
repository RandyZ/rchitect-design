import type { RouteParams } from '@rchitect-rock/router';
import * as ModuleRoute from './modules/route';
import type { Menu, MenuModule } from '@rchitect-design/types';
export interface MenuModel {
  getAllParentPath<T = Recordable<any>>(treeData: T[], path: string): string[];
  transformMenuModule(menuModule: MenuModule): Menu;
  transformRouteToMenu(
    routeModList: RouteRecordItem[],
    routerMapping?: boolean
  ): RouteRecordItem[];
  configureDynamicParamsMenu(menu: Menu, params: RouteParams): void;
}
export interface RoutesModel {
  /**
   * Turn background objects into routing objects
   * @param routeList
   */
  transformObjToRoute<T = RouteRecordItem>(routeList: RouteRecordItem[]): T[];
  /**
   * Convert multi-level routing to level 2 routing
   * @param routeModules
   */
  flatMultiLevelRoutes(routeModules: RouteRecordItem[]): RouteRecordItem[];
}
export const RoutesModel = ModuleRoute as RoutesModel;
export {
  // 基础布局
  LAYOUT,
  // 父级布局
  PARENT_LAYOUT,
  // 基础路由集合
  BasicRoutes,
  // 基础路由-根路由
  ROOT_ROUTE,
  // 基础路由-重定向路由
  REDIRECT_ROUTE,
  // 基础路由-异常页路由
  PAGE_NOT_FOUND_ROUTE,
} from './modules/basic';
