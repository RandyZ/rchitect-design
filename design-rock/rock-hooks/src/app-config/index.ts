import { diKT } from '@rchitect-rock/ioc'
import { Beans as settingBeans } from '@rchitect-rock/settings'

export const useAppSetting = () => diKT(settingBeans.AppSettingState)
export const useAppSettingAction = () => diKT(settingBeans.AppSettingAction)
export const useAppSettingGetter = () => diKT(settingBeans.AppConfigGetter)

export const useAppConfigState = () => diKT(settingBeans.AppConfigState)
export const useAppConfigGetter = () => diKT(settingBeans.AppConfigGetter)
export const useAppConfigAction = () => diKT(settingBeans.AppConfigAction)

/**
 * 重置工程所有设置
 * @deprecated 请使用useAppConfigAction().resetProjectConfig()
 */
export function resetProjectSetting() {
  const settingStore = useAppConfigAction();
  settingStore.resetProjectConfig()
}