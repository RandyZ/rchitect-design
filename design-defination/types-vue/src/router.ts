import type { RouteRecordRaw, RouteComponent, RouteMeta } from 'vue-router'

export type Lazy<T> = () => Promise<T>

/**
 * 路由组件定义
 */
export type RchitectRouteComponent = RouteComponent | Lazy<RouteComponent>;

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
