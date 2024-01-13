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