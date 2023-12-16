import type{ ServiceIdentifier } from '@rchitect-rock/ioc';
import type{ AppSetting } from './app-setting'
import type{ AppConfig } from './app-config'

export * from './app-setting'
export * from './app-config'

/**
 * 应用级别配置的beans
 * 
 * @param packName 
 * @returns 
 */
export default (packName: string) => ({
  AppSettingState: Symbol.for(`${packName}/AppSetting.State`) as ServiceIdentifier<AppSetting.State>,
  AppSettingGetter: Symbol.for(`${packName}/AppSetting.Getter`) as ServiceIdentifier<AppSetting.Getter>,
  AppSettingAction: Symbol.for(`${packName}/AppSetting.Action`) as ServiceIdentifier<AppSetting.Action>,
  AppConfigState: Symbol.for(`${packName}/AppConfig.State`) as ServiceIdentifier<AppConfig.State>,
  AppConfigGetter: Symbol.for(`${packName}/AppConfig.Getter`) as ServiceIdentifier<AppConfig.Getter>,
  AppConfigAction: Symbol.for(`${packName}/AppConfig.Action`) as ServiceIdentifier<AppConfig.Action>,
})
