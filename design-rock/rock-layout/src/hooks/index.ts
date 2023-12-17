import { diKT } from '@rchitect-rock/ioc'
import { Beans as settingBeans } from '@rchitect-rock/settings'
import { Beans as stateBeans } from '@rchitect-rock/state'
import { Beans as routerBeans } from '@rchitect-rock/router'
import Beans from '#/../beankeys'

export const useRoute = () => diKT(routerBeans.RouteTable)
export const useRouteOperator = () => diKT(routerBeans.RouteOperator)
export const useUserState = () => diKT(Beans.UserState)
export const useAppState = () => diKT(stateBeans.AppState)
export const useMenuSettingManager = () => diKT(settingBeans.MenuSettingManager)
export const useHeaderSetting = () => diKT(settingBeans.AppConfigState).headerSetting
export const useHeaderSettingAction = () => diKT(settingBeans.AppConfigAction)
export const useSporadicSetting = () => diKT(settingBeans.AppConfigState).sporadicSetting
export const useContainerSetting = () => diKT(settingBeans.AppConfigState).containerSetting
