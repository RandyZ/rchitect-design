import type { ServiceIdentifier } from '@rchitect-rock/ioc';
import { AppState } from './state';
import { AppMenu } from "#/app/menu-state";

export * from './state'
export * from './menu-state'

/**
 * 应用级别配置的beans
 * 
 * @param packName 
 * @returns 
 */
export default (packName: string) => ({
  AppState: Symbol.for(`${packName}/Auth.State`) as ServiceIdentifier<AppState.State>,
  AppStateActions: Symbol.for(`${packName}/AppState.Action`) as ServiceIdentifier<AppState.Action>,
  AppStateGetters: Symbol.for(`${packName}/AppState.Getter`) as ServiceIdentifier<AppState.Getter>,

  AppMenuState: Symbol.for(`${packName}/AppMenu.State`) as ServiceIdentifier<AppMenu.State>,
  AppMenuGetters: Symbol.for(`${packName}/AppMenu.Getters`) as ServiceIdentifier<AppMenu.Getters>,
})