import type { ServiceIdentifier } from '@rchitect-rock/ioc';
import { AppState } from './state';

export * from './state'

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
})