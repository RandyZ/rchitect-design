import nProgress from 'nprogress'
import { toRaw, unref } from 'vue-demi'
import type { Menu } from '@rchitect-design/types'
import { diKT } from '@rchitect-rock/ioc'
import { Beans } from '../beankeys';
import { RouteParams } from 'vue-router'
import { Beans as stateBeans } from '@rchitect-rock/state'
import { Beans as settingBeans } from '@rchitect-rock/settings'
import { AppContext } from "@rchitect-rock/base-package";

const LOADED_PAGE_POOL = new Map<string, boolean>()
const routeTable = () => diKT(Beans.RouteTable)
const menuState = () => diKT(Beans.MenuState)
const appConfigState = () => diKT(settingBeans.AppConfigState)
const permissionState = () => diKT(stateBeans.PermissionState)

/**
 * 创建基础路由守卫
 */
export function createBasicGuard(appContext:AppContext) {
  appContext.registerRouteGuards((to, from) => {
    const openNProgress = unref(appConfigState().transitionSetting).openNProgress
    console.log('父应用to', to)
    console.log('父应用from', from)
    if (!window.history.state.current) window.history.state.current = to.fullPath;
    if (!window.history.state.back) window.history.state.back = from.fullPath;
    // The page has already been loaded, it will be faster to open it again, you don’t need to do loading and other processing
    to.meta.loaded = !!LOADED_PAGE_POOL.get(to.path)
    // Display a progress bar at the top when switching pages
    // Only works when the page is loaded for the first time
    if (openNProgress && !to.meta.loaded) {
      nProgress.start()
    }
    return true
  }).registerRouteResolveGuards((to) => {
    // Indicates that the page has been loaded
    // When opening again, you can turn off some progress display interactions
    LOADED_PAGE_POOL.set(to.path, true)
    // console.log(to)
    // Close the page loading progress bar
    if (openNProgress && !to.meta.loaded) {
      nProgress.done()
    }
  })
}

// 路由守卫：进入路由，增加Tabs
export function createTabsGuard(func:Function) {
  routeTable().router.beforeEach(async (to, from) => {
    if (routeTable().whiteRouteTable.paths.includes(to.path)) return
    // Notify routing changes
    func(to)
  })
}


const menuParamRegex = /(?::)([\s\S]+?)((?=\/)|$)/g

/**
 * config menu with given params
 * @param menu
 * @param params
 */
export function configureDynamicParamsMenu(menu:Menu, params:RouteParams) {
  const { path, paramPath } = toRaw(menu)
  let realPath = paramPath ? paramPath : path
  const matchArr = realPath.match(menuParamRegex)

  matchArr?.forEach((it) => {
    const realIt = it.substr(1)
    if (params[realIt]) {
      realPath = realPath.replace(`:${ realIt }`, params[realIt] as string)
    }
  })
  // save original param path.
  if (!paramPath && matchArr && matchArr.length > 0) {
    menu.paramPath = path
  }
  menu.path = realPath
  // children
  menu.children?.forEach((item) => configureDynamicParamsMenu(item, params))
}

/**
 * 菜单参数守卫
 */
export function createParamMenuGuard(appContext:AppContext) {
  appContext.registerRouteGuards(async (to, _, next) => {
    // filter no name route
    if (!to.name) {
      next()
      return
    }

    // menu has been built.
    if (!permissionState().isDynamicAddedRoute.value) {
      next()
      return
    }
    let menus:Menu[] = []
    if (menuState().isBackMode()) {
      menus = permissionState().backMenuList.value
    } else if (menuState().isRouteMappingMode()) {
      menus = permissionState().frontMenuList.value
    }
    menus.forEach((item) => configureDynamicParamsMenu(item, to.params))
    next()
  })
}
