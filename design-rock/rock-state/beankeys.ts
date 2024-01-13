import * as pack from './package.json';
import type {
  AppMenu, AppSidebar, AppState, Permission
} from './src/index';
import type { ServiceIdentifier } from "@rchitect-rock/ioc";
import type { AppRuntimeConfigOptions, SidebarConfigOptions } from "@rchitect-design/types";
import type { HeaderState } from "#/app/header-state";

const appBeans = {
  AppState: Symbol.for(`${ pack.name }/Auth.State`) as ServiceIdentifier<AppState.State>,
  AppStateActions: Symbol.for(`${ pack.name }/AppState.Action`) as ServiceIdentifier<AppState.Action>,
  AppStateGetters: Symbol.for(`${ pack.name }/AppState.Getter`) as ServiceIdentifier<AppState.Getter>,

  AppMenuState: Symbol.for(`${ pack.name }/AppMenu.State`) as ServiceIdentifier<AppMenu.State>,
  AppMenuGetters: Symbol.for(`${ pack.name }/AppMenu.Getters`) as ServiceIdentifier<AppMenu.Getters>,

  AppSidebarState: Symbol.for(`${ pack.name }/SidebarConfigOptions`) as ServiceIdentifier<SidebarConfigOptions>,
  AppSidebarGetters: Symbol.for(`${ pack.name }/AppSidebar.Getters`) as ServiceIdentifier<AppSidebar.Getters>,
}
const permissionBeans = {
  PermissionState: Symbol.for(`${ pack.name }/Permission.Data`) as ServiceIdentifier<Permission.Data>,
  PermissionStateActions: Symbol.for(`${ pack.name }/Permission.Actions`) as ServiceIdentifier<Permission.Actions>,
}

export default {
  ...appBeans,
  ...permissionBeans,
  HeaderState: Symbol.for(`${ pack.name }/HeaderState.Data`) as ServiceIdentifier<HeaderState.Data>,
  /**
   * 应用运行时设置
   */
  AppRuntimeConfigOptions: Symbol.for(`${ pack.name }/AppRuntimeConfigOptions`) as ServiceIdentifier<AppRuntimeConfigOptions>
};