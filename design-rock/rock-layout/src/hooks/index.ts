import { diKT } from '@rchitect-rock/ioc'
import { Beans as settingBeans } from '@rchitect-rock/settings'
import { Beans as stateBeans } from '@rchitect-rock/state'
import { Beans as routerBeans } from '@rchitect-rock/router'
import Beans from '#/../beankeys'
import type { User } from "#/state";

export const useRoute = () => diKT(routerBeans.RouteTable)
export const useRouteOperator = () => diKT(routerBeans.RouteOperator)
export const useUserState = ():User.State => diKT(Beans.UserState)
export const useUserAction = ():User.Action => diKT(Beans.UserAction)
export const useUserGetter = ():User.Getter => diKT(Beans.UserGetter)
export const useAppLockState = () => diKT(Beans.AppLockState)
export const useAppLockActions = () => diKT(Beans.AppLockActions)
/**
 * 获取运行时配置
 * @deprecated 已废弃，逐步分解到其他模块
 */
export const useAppRunTimeConfigOptions = () => diKT(stateBeans.AppRunTimeConfigOptions)
export const useAppState = () => diKT(stateBeans.AppState)
export const useAppStateActions = () => diKT(stateBeans.AppStateActions)
export const useAppMenuState = () => diKT(stateBeans.AppMenuState)
export const useAppSettingAction = () => diKT(settingBeans.AppSettingAction)
export const useAppSettingState = () => diKT(settingBeans.AppSettingState)
export const useAppConfigState = () => diKT(settingBeans.AppConfigState)
export const useMenuSetting = () => diKT(settingBeans.MenuSettingManager)
export const useMenuSettingManager = () => diKT(settingBeans.MenuSettingManager)
export const useHeaderSetting = () => diKT(settingBeans.AppConfigState).headerSetting
export const useHeaderSettingAction = () => diKT(settingBeans.AppConfigAction)
export const useSporadicSetting = () => diKT(settingBeans.AppConfigState).sporadicSetting
export const useContainerSetting = () => diKT(settingBeans.AppConfigState).containerSetting
export const useHeaderSettingManager = () => diKT(settingBeans.MenuSettingManager)



