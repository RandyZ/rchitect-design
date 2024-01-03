import { App } from "vue-demi";
import { forEach, isEmpty, groupBy, keys } from 'lodash-es';
import {
  AsyncIocModule,
  IocContainerOptions,
  type ServiceIdentifier,
  contextContainer,
  AsyncIocModuleCallBack
} from "@rchitect-rock/ioc";
import type { RouteRecordItem, NavigationHook, NavigationAfterHook } from "@rchitect-design/types";

export const APP_CONTEXT:ServiceIdentifier<AppContext> = Symbol.for('WmqAppContext') as ServiceIdentifier<AppContext>;

type PriorityObserver = { pri:number, obs:(app:App) => Promise<void> };

type IocLoadedObserver = {
  preObservers:PriorityObserver[];
  loadedObservers:PriorityObserver[];
};

/**
 * 按序执行观察者
 *
 * @param app
 * @param observers
 */
const runObsOrdered = async (app:App, observers:PriorityObserver[]) => {
  const preObservers = groupBy(
    observers,
    (o:PriorityObserver) => o.pri
  );
  const sortedKeys:number[] = (keys(preObservers) as unknown as number[])
    .sort((a:number, b:number) => a - b);
  for (const key of sortedKeys) {
    await Promise.all(preObservers[key].map((o:PriorityObserver) => o.obs(app)))
  }
}


/**
 * App Context, used to store app configuration data.
 */
export class AppContext {
  iocOptions:IocContainerOptions;
  iocModules:AsyncIocModule[];
  basicRoutes:RouteRecordItem[];
  routeHooks:{
    beforeEach:NavigationHook[],
    beforeResolve:NavigationHook[],
    afterEach:NavigationAfterHook[],
  };
  appRoutes:RouteRecordItem[];
  loadedObservers:IocLoadedObserver = {
    preObservers: [],
    loadedObservers: []
  };

  [key:symbol]:any;

  constructor(iocOptions:IocContainerOptions) {
    this.iocOptions = iocOptions;
    this.basicRoutes = [];
    this.appRoutes = [];
    this.routeHooks = {
      beforeEach: [],
      beforeResolve: [],
      afterEach: []
    };
    this.iocModules = [ new AsyncIocModule(async (bind) => {
      bind(APP_CONTEXT).toConstantValue(this)
    }) ];
  }

  /**
   * 添加IocModule
   * @param moduleCallBack
   */
  addIocModule(moduleCallBack:AsyncIocModuleCallBack):AppContext {
    this.iocModules.push(new AsyncIocModule(moduleCallBack))
    return this;
  }

  getParamWith<T, K = ServiceIdentifier<T>>(key:K, def?:T):T | undefined {
    const data = this[key as symbol]
    if (data) {
      return data as T
    } else {
      return def;
    }
  }

  getParam<T, K = ServiceIdentifier<T>>(key:K):T {
    const data = this[key as symbol]
    if (data) {
      return data as T
    } else {
      throw new Error(`AppContext中缺少参数<${ key }>`)
    }
  }

  registerParam<T, K = ServiceIdentifier<T>>(key:K, data:T) {
    this[key as symbol] = data
  }

  /**
   * 路由的后置钩子
   *
   * @param guards
   */
  registerRouteGuards(...guards:NavigationHook[]) {
    (!isEmpty(guards)) && this.routeHooks.beforeEach.push(...guards)
    return this
  }

  /**
   * 路由的后置钩子
   *
   * @param guards
   */
  registerRouteResolveGuards(...guards:NavigationHook[]) {
    (!isEmpty(guards)) && this.routeHooks.beforeResolve.push(...guards)
    return this
  }

  /**
   * 路由的后置钩子
   *
   * @param hooks
   */
  registerRouteAfterHooks(...hooks:NavigationAfterHook[]) {
    (!isEmpty(hooks)) && this.routeHooks.afterEach.push(...hooks)
    return this
  }

  /**
   * 注册路由
   * @param routes
   */
  registerRoutes(routes:RouteRecordItem[]) {
    forEach(routes, (route:RouteRecordItem) => {
      if (route.meta?.isBasic) {
        this.basicRoutes.push(route)
      } else {
        this.appRoutes.push(route)
      }
    })
  }

  /**
   * 监听IocModule加载前
   * @param on
   * @param priority 不传递默认优先级为9999
   */
  onBeforeIocLoaded(on:(app:App) => Promise<void>, priority?:number) {
    if (priority) {
      this.loadedObservers.preObservers.push({ pri: priority, obs: on });
    } else {
      this.loadedObservers.preObservers.push({ pri: 9999, obs: on });
    }
  }

  /**
   * 监听IocModule加载完成
   * @param on
   * @param priority 不传递默认优先级为9999，传递负数则为预加载，传递正数则为加载完成后执行
   */
  onIocLoaded(on:(app:App) => Promise<void>, priority?:number) {
    if (priority) {
      this.loadedObservers.loadedObservers.push({ pri: priority, obs: on });
    } else {
      this.loadedObservers.loadedObservers.push({ pri: 9999, obs: on });
    }
  }


  async prepareIocModules(app:App) {
    if (!isEmpty(this.loadedObservers.preObservers)) {
      await runObsOrdered(app, this.loadedObservers.preObservers)
    }
    await contextContainer().loadAsync(...this.iocModules)
  }

  /**
   * 加载VueApp
   * @param app
   * @returns
   */
  async load(app:App):Promise<App> {
    await this.prepareIocModules(app)
    if (!isEmpty(this.loadedObservers.loadedObservers)) {
      await runObsOrdered(app, this.loadedObservers.loadedObservers)
    }
    return app
  }
}