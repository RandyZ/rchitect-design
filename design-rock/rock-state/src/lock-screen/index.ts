import type { ServiceIdentifier } from '@rchitect-rock/ioc';
import type { ScreenLocker } from './locker'

export * from './locker'

/**
 * 应用级别配置的beans
 * 
 * @param packName 
 * @returns 
 */
export default (packName: string) => ({
  ScreenLockerState: Symbol.for(`${packName}/ScreenLocker.State`) as ServiceIdentifier<ScreenLocker.State>,
  ScreenLockerAction: Symbol.for(`${packName}/ScreenLocker.Actions`) as ServiceIdentifier<ScreenLocker.Actions>,
  ScreenLockerGetter: Symbol.for(`${packName}/ScreenLocker.Getters`) as ServiceIdentifier<ScreenLocker.Getters>,
})