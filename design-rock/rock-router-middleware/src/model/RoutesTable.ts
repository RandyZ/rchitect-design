import { Router, createRouter, createWebHistory } from 'vue-router';

export class RouteTableRecord {
  routes:RouteRecordItem[] = [];
  names:string[] = [];
  paths:string[] = [];

  reset() {
    this.routes.length = 0;
    this.names.length = 0;
    this.paths.length = 0;
  }

  record(route:RouteRecordItem) {
    this.routes.push(route);
    this.names.push(route.name);
    this.paths.push(route.path);
  }
}

/**
 * 静态路由表
 */
export class RoutesTable {
  router:Router;
  /**
   * 白名单路由
   */
  whiteRouteTable:RouteTableRecord;
  /**
   * 基础路由
   */
  basicRouteTable:RouteTableRecord;
  /**
   * 已注册路由
   */
  appRouteTable:RouteTableRecord;

  constructor(
    path:string,
    basicRoutes:RouteRecordItem[],
    appRoutes:RouteRecordItem[] = []
  ) {
    this.whiteRouteTable = new RouteTableRecord();
    this.basicRouteTable = new RouteTableRecord();
    this.appRouteTable = new RouteTableRecord();
    this.setup([ ...basicRoutes, ...appRoutes ]);
    console.info('RoutesTable', this);
    this.router = createRouter({
      history: createWebHistory(path),
      routes: this.basicRouteTable.routes,
      strict: true,
      scrollBehavior: () => ({ left: 0, top: 0 }),
    });
  }

  /**
   * 重置路由表
   */
  resetAll():void {
    this.whiteRouteTable.reset();
    this.basicRouteTable.reset();
    this.appRouteTable.reset();
    this.resetRouter();
  }

  /**
   * 添加路由
   *
   * @param routes 路由记录项数组
   * @returns 无返回值
   */
  appendRoutes(...routes:RouteRecordItem[]):void {
    const newRoutes = this._setup(routes);
    newRoutes.forEach((route) => {
      this.router.addRoute(route)
    })
  }

  /**
   * 设置路由表
   * @param routeRecords list of route records
   * @param reset 是否重置路由表
   */
  setup(routeRecords:RouteRecordItem[], reset = false):void {
    this._setup(routeRecords, reset);
  }

  /**
   * 设置路由表
   *
   * @param routeRecords list of route records
   * @param reset 是否重置路由表 default: false
   * @param _init 是否初始化应用路由记录 default: true
   * @returns 嵌套结构铺平的路由记录
   */
  private _setup(
    routeRecords:RouteRecordItem[],
    reset = false,
    _init = true
  ):RouteRecordItem[] {
    if (reset) {
      this.resetAll();
    }
    const flatRouteRecords = [] as RouteRecordItem[];
    routeRecords.forEach((item) => {
      if (item.meta?.isBasic) {
        this.basicRouteTable.record(item);
        flatRouteRecords.push(item);
      } else if (_init) {
        this.appRouteTable.record(item);
        flatRouteRecords.push(item);
      }
      if (item.meta?.whiteRoute) {
        this.whiteRouteTable.record(item);
      }
      if (item?.children?.length) {
        const _innerRet = this._setup(item.children, false, false);
        flatRouteRecords.push(..._innerRet);
      }
    });
    return flatRouteRecords;
  }

  resetRouter():void {
    this.router.getRoutes().forEach((route) => {
      const { name } = route;
      if (name && !this.basicRouteTable.names.includes(name as string)) {
        this.router.hasRoute(name) && this.router.removeRoute(name);
      }
    });
  }
}
