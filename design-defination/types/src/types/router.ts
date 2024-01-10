import type { RouteRecordRaw, RouteComponent, RouteMeta, NavigationGuardWithThis, NavigationHookAfter } from 'vue-router'

export type Lazy<T> = () => Promise<T>

/**
 * 路由组件定义
 */
export type RchitectRouteComponent = RouteComponent | Lazy<RouteComponent>;

/**
 * 路由守卫定义
 */
export type NavigationHook = NavigationGuardWithThis<undefined>
/**
 * 路由后置守卫定义
 */
export type NavigationAfterHook = NavigationHookAfter

/**
 * 路由的配置记录
 */
export type RouteRecordItem = RouteRecordRaw & {
  path: string
  name: string
  meta: RouteMeta
  icon?: string
  children?: RouteRecordItem[]
  component?: RchitectRouteComponent
}

export interface RouteRecord {
  path: string
  component: string
  meta: any
  name?: string
  alias?: string | string[]
  redirect?: string
  caseSensitive?: boolean
  children?: RouteRecord[]
}
