import type { ServiceIdentifier } from '@rchitect-rock/ioc';
import type { AppState } from './state';
import type { AppMenu } from "#/app/menu-state";
import type { SidebarConfigOptions } from "@rchitect-design/types";
import type { AppSidebar } from "#/app/sidebar-state";

export * from './state'
export * from './menu-state'
export * from './sidebar-state'

export interface AppRuntimesState {
  /**
   * 当前应用状态
   */
  state:AppState.State
  /**
   * 当前应用菜单状态
   */
  menu:AppMenu.State
}

/**
 * 应用级别配置的beans
 *
 * @param packName
 * @returns
 */
export default (packName:string) => ({
  AppRuntimes: Symbol.for(`${ packName }/AppRuntimes`) as ServiceIdentifier<AppRuntimes>,

  AppState: Symbol.for(`${ packName }/Auth.State`) as ServiceIdentifier<AppState.State>,
  AppStateActions: Symbol.for(`${ packName }/AppState.Action`) as ServiceIdentifier<AppState.Action>,
  AppStateGetters: Symbol.for(`${ packName }/AppState.Getter`) as ServiceIdentifier<AppState.Getter>,

  AppMenuState: Symbol.for(`${ packName }/AppMenu.State`) as ServiceIdentifier<AppMenu.State>,
  AppMenuGetters: Symbol.for(`${ packName }/AppMenu.Getters`) as ServiceIdentifier<AppMenu.Getters>,

  AppSidebarState: Symbol.for(`${ packName }/SidebarConfigOptions`) as ServiceIdentifier<SidebarConfigOptions>,
  AppSidebarGetters: Symbol.for(`${ packName }/AppSidebar.Getters`) as ServiceIdentifier<AppSidebar.Getters>
})