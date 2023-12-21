import * as pack from './package.json';
import { AsyncIocModule, diKT } from '@rchitect-rock/ioc';
import { APP_CONTEXT, CommonModuleLibContext, install } from '@rchitect-rock/base-package';
import type { AppContext } from '@rchitect-rock/base-package';
import { InitRouter, RouteOperator, RoutesTable } from '#/.';
import { MenuState } from '#/model/MenuState';
import { Beans } from './beankeys';
import type { BeanKeys } from './beankeys';

export const Lib: CommonModuleLibContext<BeanKeys> = {
  install,
  name: pack.name,
  version: pack.version,
  types: Beans,
  module: new AsyncIocModule(async (bind) => {
    bind<MenuState>(Beans.MenuState).to(MenuState);
    bind<RouteOperator>(Beans.RouteOperator).to(RouteOperator);
    bind<RoutesTable>(Beans.RouteTable).toDynamicValue((context) => {
      const appContext = context.container.get<AppContext>(APP_CONTEXT);
      console.debug('All Routes List', appContext.basicRoutes, appContext.appRoutes);
      const ret = InitRouter(import.meta.env.VITE_PUBLIC_PATH, appContext.basicRoutes, appContext.appRoutes);
      console.groupEnd();
      return ret;
    });
  }),
  async onSetup(app) {
    const routeTable = await diKT(Beans.RouteTable);
    app.use(routeTable.router);
    routeTable.router.beforeEach((to, from, next) => {
      console.log('路由守卫：进入路由，增加Tabs', to, from);
      next()
    })
    await routeTable.router.isReady();
  },
};
