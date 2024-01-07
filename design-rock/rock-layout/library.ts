import type { Library } from '@rchitect-rock/base-package';
import { toPackage } from '@rchitect-rock/base-package';
import types from './beankeys';
import * as pack from './package.json';
import { AsyncIocModule } from '@rchitect-rock/ioc';
import { SearchContext } from "#/layouts/components/search/SearchContext";
import { MultipleTabOperator } from "#/layouts/types";
import { BasicRoutes } from "./src/routes";
import { Route } from "@rchitect-design/constants";


export const Lib:Library<typeof types> = toPackage({
  name: pack.name,
  version: pack.version,
  types,
  module: new AsyncIocModule(async (bind, unbind, isBound) => {
    console.debug(`【${ pack.name }】 IocModule start load...`);
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
    bind(types.SearchContext).to(SearchContext)
    // bind(types.MultipleTabStore).toConstantValue(useMultipleTab())
    bind(types.MultipleTabOperator).to(MultipleTabOperator)
    // bind(stateLib.types.AppStore).toConstantValue(useAppStore())
  }),
  routes: BasicRoutes,
  onSetup: async (app, appContext) => {
    console.debug(`【${ pack.name }】 onSetup start load...`);
    const route = appContext.appRoutes.find(item => item.path === Route.BASIC_HOME_PATH);
    if (!route) {
      console.warn(`【${ pack.name }】找不到路由【${ Route.BASIC_HOME_PATH }】，请检查是否未设置首页路由如果！将会启用未知页替代首页`);
    }
  }
});
