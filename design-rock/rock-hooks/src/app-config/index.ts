import { diKT } from '@rchitect-rock/ioc'
import { Beans as settingBeans } from '@rchitect-rock/settings'

export const useAppSetting = () => diKT(settingBeans.AppSettingState)
export const useAppSettingAction = () => diKT(settingBeans.AppSettingAction)
export const useAppSettingGetter = () => diKT(settingBeans.AppConfigGetter)

export const useAppConfig = () => diKT(settingBeans.AppConfigState)
export const useAppConfigGetter = () => diKT(settingBeans.AppConfigGetter)
export const useAppConfigAction = () => diKT(settingBeans.AppConfigAction)

export const useGlobConfig = () => diKT(settingBeans.GlobConfig)
export const useMenuSetting = () => diKT(settingBeans.MenuSettingManager)

/**
 * 重置工程所有设置
 * @deprecated 请使用useAppConfigAction().resetProjectConfig()
 */
export function resetProjectSetting() {
  const settingStore = useAppConfigAction();
  settingStore.resetProjectConfig()
}