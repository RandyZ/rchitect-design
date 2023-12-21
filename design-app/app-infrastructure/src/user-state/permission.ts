import type { Permission } from '@rchitect-rock/state'
import { defineStore } from "pinia";
import { ref, unref } from 'vue-demi';
import type { Menu } from "@rchitect-design/types";
import { diKT } from "@rchitect-rock/ioc";
import { Beans as layoutBeans, LayoutRoutes } from "@rchitect-rock/layouts";
import { PageEnum, PermissionModeEnum } from '@rchitect-design/constants';
import { MenuPaths } from "@rchitect-rock/router";
import { Beans as stateBeans } from "@rchitect-rock/state";
import { useRoutesTable } from "@rchitect-rock/hooks";
import { filterTree } from "@rchitect-rock/tools";
import { Beans as appAccountBeans } from "@rchitect-app/account";

export type PermissionStateStore = ReturnType<typeof usePermissionStore>;

const useUserState = () => diKT(layoutBeans.UserState);
const usePermission = () => diKT(stateBeans.PermissionState);
const accountRepository = () => diKT(appAccountBeans.Repository);

export const usePermissionStore = defineStore('PermissionStateStore', () => {
  const state:Permission.State = {
    permCodeList: ref([]),
    permissionMode: ref(PermissionModeEnum.ROLE),
    isDynamicAddedRoute: ref(false),
    lastBuildMenuTime: ref(0),
    backMenuList: ref([]),
    frontMenuList: ref([]),
  }

  const actions:Permission.Action = {
    setPermCodeList(codeList:string[]) {
      state.permCodeList.value = codeList;
    },

    setBackMenuList(list:Menu[]) {
      state.backMenuList.value = list;
      list?.length > 0 && this.setLastBuildMenuTime();
    },

    setFrontMenuList(list:Menu[]) {
      state.frontMenuList.value = list;
    },

    setLastBuildMenuTime() {
      state.lastBuildMenuTime.value = new Date().getTime();
    },

    setDynamicAddedRoute(added:boolean) {
      state.isDynamicAddedRoute.value = added;
    },
    resetState():void {
      state.isDynamicAddedRoute.value = false;
      state.permCodeList.value = [];
      state.backMenuList.value = [];
      state.lastBuildMenuTime.value = 0;
    },
    async changePermissionCode() {
      const codeList = await accountRepository().getPermCode();
      this.setPermCodeList(codeList);
    },
    async buildRoutesAction():Promise<RouteRecordItem[]> {
      // TODO: 从后端获取菜单
      // const { t } = useI18n()
      const userStore = useUserState();

      let routes:RouteRecordItem[] = [];
      const roleList = unref(userStore.roles) || []
      const permissionMode = unref(usePermission().permissionMode);

      const routeFilter = (route:RouteRecordItem) => {
        const { meta } = route;
        const { roles } = meta || {};
        if (!roles) return true;
        return roleList.some((role) => roles.includes(role));
      };

      const routeRemoveIgnoreFilter = (route:RouteRecordItem) => {
        const { meta } = route;
        const { ignoreRoute } = meta || {};
        return !ignoreRoute;
      };

      /**
       * @description 根据设置的首页path，修正routes中的affix标记（固定首页）
       * */
      const patchHomeAffix = (routes:RouteRecordItem[]) => {
        if (!routes || routes.length === 0) return;
        let homePath:string = unref(userStore.userInfo)?.homePath || PageEnum.BASE_HOME;

        function patcher(routes:RouteRecordItem[], parentPath = '') {
          if (parentPath) parentPath = parentPath + '/';
          routes.forEach((route:RouteRecordItem) => {
            const { path, children, redirect } = route;
            const currentPath = path.startsWith('/') ? path : parentPath + path;
            if (currentPath === homePath) {
              if (redirect) {
                homePath = route.redirect! as string;
              } else {
                route.meta = Object.assign({}, route.meta, { affix: true });
                throw new Error('end');
              }
            }
            children && children.length > 0 && patcher(children, currentPath);
          });
        }

        try {
          patcher(routes);
        } catch (e) {
          // 已处理完毕跳出循环
        }
      };
      // 组合框架路由 与 本地路由
      const routeTable = useRoutesTable();
      switch (permissionMode) {
        case PermissionModeEnum.ROLE:
          routes = filterTree(routeTable.appRouteTable.routes, routeFilter);
          routes = routes.filter(routeFilter);
          // Convert multi-level routing to level 2 routing
          routes = LayoutRoutes.RoutesModel.flatMultiLevelRoutes(routes);
          break;
        case PermissionModeEnum.ROUTE_MAPPING:
          routes = filterTree(routeTable.appRouteTable.routes, routeFilter);
          routes = routes.filter(routeFilter);
          const menuList = MenuPaths.transformRouteToMenu(routes, true);
          routes = filterTree(routes, routeRemoveIgnoreFilter);
          routes = routes.filter(routeRemoveIgnoreFilter);
          menuList.sort((a, b) => {
            return (a.meta?.orderNo || 0) - (b.meta?.orderNo || 0);
          });

          this.setFrontMenuList(menuList as Menu[]);

          // Convert multi-level routing to level 2 routing
          routes = LayoutRoutes.RoutesModel.flatMultiLevelRoutes(routes);
          break;

        //  If you are sure that you do not need to do background dynamic permissions, please comment the entire judgment below
        case PermissionModeEnum.BACK:
          // const { createMessage } = useMessage()

          // createMessage.loading(t('sys.app.menuLoading'))

          // !Simulate to obtain permission codes from the background,
          // this function may only need to be executed once, and the actual project can be put at the right time by itself
          let routeList:RouteRecordItem[] = [];
          try {
            this.changePermissionCode();
            routeList = (await accountRepository().getMenuList()) as RouteRecordItem[];
          } catch (error) {
            console.error(error);
          }

          // Dynamically introduce components
          routeList = LayoutRoutes.RoutesModel.transformObjToRoute(routeList);

          //  Background routing to menu structure
          const backMenuList = MenuPaths.transformRouteToMenu(routeList);
          this.setBackMenuList(backMenuList as Menu[]);

          // remove meta.ignoreRoute item
          routeList = filterTree(routeList, routeRemoveIgnoreFilter);
          routeList = routeList.filter(routeRemoveIgnoreFilter);

          routeList = LayoutRoutes.RoutesModel.flatMultiLevelRoutes(routeList);
          routes = [ LayoutRoutes.PAGE_NOT_FOUND_ROUTE, ...routeList ];
          break;
      }
      patchHomeAffix(routes);
      console.debug('Routes after authorized', routes);
      return routes;
    },
  }
  return {
    ...state,
    ...actions
  };
})