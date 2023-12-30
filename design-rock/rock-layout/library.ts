import type { Library } from '@rchitect-rock/base-package';
import { toPackage } from '@rchitect-rock/base-package';
// import type { ContextOptions } from './bridge';
import types from './beankeys';
import * as pack from './package.json';
import { AsyncIocModule, diKT } from '@rchitect-rock/ioc';
// import { MenuFunctions, MenuPaths } from '@rchitect-rock/router';
import { SearchContext } from "#/layouts/components/search/SearchContext";
// import { useMultipleTab } from "#/layouts/components/tabs/multipleTab";
// import { useLockStore } from "#/state/stores/lock";
import { MultipleTabOperator } from "#/layouts/types";
// import { useAppStore } from "#/state";
import { BasicRoutes, LAYOUT } from "./src/routes";
import { Lib as stateLib } from '@rchitect-rock/state';
import { Route } from "@rchitect-design/constants";
import { Beans as routerBeans } from "@rchitect-rock/router";
import { Redirect } from "#/pages";

import TestPage from "./src/pages/test-page.vue";

export const Lib: Library<typeof types> = toPackage({
  name: pack.name,
  version: pack.version,
  types,
  module: new AsyncIocModule(async (bind, unbind, isBound) => {
    console.debug(`【${pack.name}】 IocModule start load...`);
    // bind(types.ContextOptions).toDynamicValue((context) => {
    //   const support = context.container.get(types.ContextOptionsSupport);
    //   return {
    //     ...support,
    //     getMenus: MenuFunctions.getMenus,
    //     getCurrentParentPath: MenuFunctions.getCurrentParentPath,
    //     getAllParentPath: MenuPaths.getAllParentPath,
    //     stores: {
    //       useUserStore: () => context.container.get(types.UserStore),
    //     },
    //   } as ContextOptions;
    // });
    // bind(types.LockStore).toConstantValue(useLockStore())
    bind(types.SearchContext).to(SearchContext)
    // bind(types.MultipleTabStore).toConstantValue(useMultipleTab())
    bind(types.MultipleTabOperator).to(MultipleTabOperator)
    // bind(stateLib.types.AppStore).toConstantValue(useAppStore())
  }),
  routes: BasicRoutes,
  onSetup: async (app, appContext) => {
    console.debug(`【${pack.name}】 onSetup start load...`);
    const route = appContext.appRoutes.find(item => item.path === Route.BASIC_HOME_PATH);
    if (!route) {
      console.warn(`【${pack.name}】找不到路由【${Route.BASIC_HOME_PATH}】，请检查是否未设置首页路由如果！将会启用未知页替代首页`);
      // TODO 去掉临时逻辑
      const routesTable = diKT(routerBeans.RouteTable)
      routesTable.appendRoutes({
          path: Route.BASIC_HOME_PATH,
          component: TestPage,
          meta: {
            title: 'routes.dashboard.dashboard',
            icon: 'bx:bx-home',
          }
        }
      )
    }
  }
});
