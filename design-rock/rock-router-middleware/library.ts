import * as pack from './package.json';
import { AsyncIocModule, diKT } from '@rchitect-rock/ioc';
import { APP_CONTEXT, CommonModuleLibContext, install } from '@rchitect-rock/base-package';
import type { AppContext } from '@rchitect-rock/base-package';
import { InitRouter, RouteOperator, RoutesTable } from '#/.';
import { MenuState } from '#/model/MenuState';
import { Beans } from './beankeys';
import type { BeanKeys } from './beankeys';
import isEmpty from 'lodash-es/isEmpty';

export const Lib:CommonModuleLibContext<BeanKeys> = {
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
  async onSetup(app, appContext) {
    const routeTable = diKT(Beans.RouteTable);
    const router = routeTable.router;
    app.use(router);
    router.beforeEach((to, from, next) => {
      console.log('路由守卫：进入路由，增加Tabs', to, from);
      next()
    })
    const { beforeEach, beforeResolve, afterEach } = appContext.routeHooks
    if(!isEmpty(beforeEach)) {
      beforeEach.forEach((hook) => {
        router.beforeEach(hook)
      })
    }
    if(!isEmpty(beforeResolve)) {
      beforeResolve.forEach((hook) => {
        router.beforeResolve(hook)
      })
    }
    if(!isEmpty(afterEach)) {
      afterEach.forEach((hook) => {
        router.afterEach(hook)
      })
    }
    await router.isReady();
  },
};
